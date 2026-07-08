<?php

namespace App\Http\Controllers;

use App\Support\YandrixaStore;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class YandrixaController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('Yandrixa/Home', [
            'site' => YandrixaStore::siteProps(),
        ]);
    }

    public function section(string $slug): Response
    {
        return Inertia::render('Yandrixa/Section', [
            'site' => YandrixaStore::siteProps(),
            'slug' => $slug,
            'section' => YandrixaStore::publicSection($slug),
        ]);
    }

    public function landingPage(string $slug): Response|RedirectResponse
    {
        $landingPage = YandrixaStore::getPublishedLandingPageBySlug($slug);

        if (! $landingPage) {
            return redirect()->route('home');
        }

        return Inertia::render('Yandrixa/LandingPage', [
            'site' => YandrixaStore::siteProps(),
            'landingPage' => $landingPage,
        ]);
    }

    public function submitContact(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'fullName' => ['required', 'string', 'max:255'],
            'businessName' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phoneOrWhatsApp' => ['required', 'string', 'max:50'],
            'country' => ['required', 'string', 'max:100'],
            'serviceRequired' => ['required', 'string', 'max:255'],
            'projectStage' => ['required', 'string', 'max:255'],
            'budgetRange' => ['required', 'string', 'max:255'],
            'expectedTimeline' => ['required', 'string', 'max:255'],
            'preferredContactMethod' => ['required', 'string', 'max:255'],
            'existingWebsiteUrl' => ['nullable', 'string', 'max:255'],
            'projectDescription' => ['required', 'string', 'max:3000'],
        ]);

        YandrixaStore::appendEnquiry(array_merge($validated, [
            'id' => 'enquiry-'.round(microtime(true) * 1000),
            'type' => 'project-enquiry',
            'createdAt' => now()->toIso8601String(),
            'utmSource' => (string) $request->input('utmSource', ''),
            'utmMedium' => (string) $request->input('utmMedium', ''),
            'utmCampaign' => (string) $request->input('utmCampaign', ''),
            'referrerUrl' => (string) $request->input('referrerUrl', ''),
            'landingPageUrl' => (string) $request->input('landingPageUrl', ''),
        ]));

        return back()->with('success', 'Project enquiry submitted successfully.');
    }

    public function submitPartner(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'fullName' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'cityCountry' => ['required', 'string', 'max:255'],
            'profession' => ['required', 'string', 'max:255'],
            'experience' => ['required', 'string', 'max:2000'],
            'industries' => ['required', 'string', 'max:2000'],
            'leadMethods' => ['required', 'string', 'max:2000'],
            'expectedLeadsPerMonth' => ['required', 'string', 'max:255'],
            'profileUrl' => ['nullable', 'string', 'max:255'],
            'introduction' => ['required', 'string', 'max:3000'],
        ]);

        YandrixaStore::appendPartnerApplication(array_merge($validated, [
            'id' => 'partner-'.round(microtime(true) * 1000),
            'type' => 'marketing-partner',
            'createdAt' => now()->toIso8601String(),
            'utmSource' => (string) $request->input('utmSource', ''),
            'utmMedium' => (string) $request->input('utmMedium', ''),
            'utmCampaign' => (string) $request->input('utmCampaign', ''),
            'referrerUrl' => (string) $request->input('referrerUrl', ''),
            'landingPageUrl' => (string) $request->input('landingPageUrl', ''),
        ]));

        return back()->with('success', 'Marketing partner application submitted successfully.');
    }

    public function adminLogin(Request $request): Response|RedirectResponse
    {
        if ($request->session()->get('yandrixa_admin_authenticated')) {
            return redirect()->route('admin.dashboard');
        }

        return Inertia::render('Yandrixa/Admin/Login', [
            'site' => YandrixaStore::siteProps(),
            'defaults' => [
                'email' => YandrixaStore::adminEmail(),
                'password' => YandrixaStore::adminPassword(),
            ],
        ]);
    }

    public function adminAuthenticate(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (
            $validated['email'] !== YandrixaStore::adminEmail()
            || $validated['password'] !== YandrixaStore::adminPassword()
        ) {
            return back()->with('error', 'Invalid admin credentials.');
        }

        $request->session()->regenerate();
        $request->session()->put('yandrixa_admin_authenticated', true);
        $request->session()->put('yandrixa_admin_email', $validated['email']);

        return redirect()->route('admin.dashboard')->with('success', 'Signed in successfully.');
    }

    public function adminLogout(Request $request): RedirectResponse
    {
        $request->session()->forget(['yandrixa_admin_authenticated', 'yandrixa_admin_email']);
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login')->with('success', 'Signed out successfully.');
    }

    public function adminDashboard(): Response
    {
        $adminData = YandrixaStore::adminData();

        return Inertia::render('Yandrixa/Admin/Dashboard', [
            'site' => YandrixaStore::siteProps(),
            'summary' => [
                'contacts' => count(YandrixaStore::contactRecords()),
                'enquiries' => count($adminData['enquiries'] ?? []),
                'leads' => count(YandrixaStore::leadRecords()),
                'marketingPartners' => count($adminData['partnerApplications'] ?? []),
                'landingPages' => count($adminData['landingPages'] ?? []),
            ],
            'recentEnquiries' => array_slice($adminData['enquiries'] ?? [], 0, 5),
            'recentPartners' => array_slice($adminData['partnerApplications'] ?? [], 0, 5),
        ]);
    }

    public function adminModule(string $module): Response|RedirectResponse
    {
        if ($module === 'settings') {
            return redirect()->route('admin.settings');
        }

        $allowed = ['contacts', 'enquiries', 'leads', 'marketing-partners', 'landing-pages'];

        if (! in_array($module, $allowed, true)) {
            return redirect()->route('admin.dashboard')->with('error', 'Unknown module.');
        }

        return Inertia::render('Yandrixa/Admin/Module', [
            'site' => YandrixaStore::siteProps(),
            'module' => $module,
            'records' => YandrixaStore::getModuleRecords($module),
        ]);
    }

    public function adminRecord(string $module, string $id): Response|RedirectResponse
    {
        $record = YandrixaStore::findRecord($module, $id);

        if (! $record) {
            return redirect()->route('admin.module', ['module' => $module])->with('error', 'Record not found.');
        }

        return Inertia::render('Yandrixa/Admin/Record', [
            'site' => YandrixaStore::siteProps(),
            'module' => $module,
            'record' => $record,
        ]);
    }

    public function adminEdit(string $module, string $id): Response|RedirectResponse
    {
        $record = YandrixaStore::findRecord($module, $id);

        if (! $record) {
            return redirect()->route('admin.module', ['module' => $module])->with('error', 'Record not found.');
        }

        return Inertia::render('Yandrixa/Admin/EditRecord', [
            'site' => YandrixaStore::siteProps(),
            'module' => $module,
            'record' => $record,
        ]);
    }

    public function adminUpdate(Request $request, string $module, string $id): RedirectResponse
    {
        $record = YandrixaStore::findRecord($module, $id);

        if (! $record) {
            return redirect()->route('admin.module', ['module' => $module])->with('error', 'Record not found.');
        }

        $updated = YandrixaStore::updateRecord($module, $id, $this->validatedRecordPayload($request, $module));

        if (! $updated) {
            return back()->with('error', 'Record could not be updated.');
        }

        return redirect()->route('admin.record', ['module' => $module, 'id' => $id])->with('success', 'Record updated successfully.');
    }

    public function adminDelete(string $module, string $id): RedirectResponse
    {
        YandrixaStore::setDeletedState($module, $id, now()->toIso8601String());

        return back()->with('success', 'Record moved to deleted state.');
    }

    public function adminRestore(string $module, string $id): RedirectResponse
    {
        YandrixaStore::setDeletedState($module, $id, null);

        return back()->with('success', 'Record restored successfully.');
    }

    public function adminPermanentDelete(string $module, string $id): RedirectResponse
    {
        YandrixaStore::permanentlyDeleteRecord($module, $id);

        return redirect()->route('admin.module', ['module' => $module])->with('success', 'Record permanently deleted.');
    }

    public function adminSettings(): Response
    {
        return Inertia::render('Yandrixa/Admin/Settings', [
            'site' => YandrixaStore::siteProps(),
            'settings' => YandrixaStore::businessSettings(),
            'mode' => 'settings',
        ]);
    }

    public function adminProfile(): Response
    {
        return Inertia::render('Yandrixa/Admin/Settings', [
            'site' => YandrixaStore::siteProps(),
            'settings' => YandrixaStore::businessSettings(),
            'mode' => 'profile',
        ]);
    }

    public function adminUpdateSettings(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'branding.name' => ['required', 'string', 'max:255'],
            'branding.brand' => ['required', 'string', 'max:255'],
            'branding.subBrand' => ['required', 'string', 'max:255'],
            'branding.tagline' => ['required', 'string', 'max:255'],
            'branding.domain' => ['required', 'string', 'max:255'],
            'seo.siteUrl' => ['required', 'string', 'max:255'],
            'seo.defaultTitle' => ['required', 'string', 'max:255'],
            'seo.titleTemplate' => ['required', 'string', 'max:255'],
            'seo.siteDescription' => ['required', 'string', 'max:500'],
            'contact.email' => ['required', 'string', 'max:255'],
            'contact.phone' => ['required', 'string', 'max:255'],
            'contact.whatsapp' => ['required', 'string', 'max:255'],
            'contact.location' => ['required', 'string', 'max:255'],
            'social.linkedin' => ['nullable', 'string', 'max:255'],
            'social.instagram' => ['nullable', 'string', 'max:255'],
            'social.facebook' => ['nullable', 'string', 'max:255'],
            'social.twitter' => ['nullable', 'string', 'max:255'],
            'links.consultationUrl' => ['nullable', 'string', 'max:255'],
            'analytics.id' => ['nullable', 'string', 'max:255'],
            'analytics.enabled' => ['nullable', 'boolean'],
            'analytics.requiresConsent' => ['nullable', 'boolean'],
            'content.footerDescription' => ['required', 'string', 'max:1000'],
            'partnerProgram.headline' => ['required', 'string', 'max:255'],
            'partnerProgram.disclosure' => ['required', 'string', 'max:500'],
            'partnerProgram.commissionPercentage' => ['nullable', 'string', 'max:255'],
        ]);

        $validated['analytics']['enabled'] = $request->boolean('analytics.enabled');
        $validated['analytics']['requiresConsent'] = $request->boolean('analytics.requiresConsent');
        $validated['content']['trustPoints'] = preg_split('/\r\n|\r|\n/', (string) $request->input('content.trustPoints_text', '')) ?: [];

        YandrixaStore::writeBusinessSettings($validated);

        return back()->with('success', 'Settings updated successfully.');
    }

    protected function validatedRecordPayload(Request $request, string $module): array
    {
        if ($module === 'enquiries') {
            return $request->validate([
                'fullName' => ['required', 'string', 'max:255'],
                'businessName' => ['required', 'string', 'max:255'],
                'email' => ['required', 'email', 'max:255'],
                'phoneOrWhatsApp' => ['required', 'string', 'max:50'],
                'country' => ['required', 'string', 'max:100'],
                'serviceRequired' => ['required', 'string', 'max:255'],
                'projectStage' => ['required', 'string', 'max:255'],
                'budgetRange' => ['required', 'string', 'max:255'],
                'expectedTimeline' => ['required', 'string', 'max:255'],
                'preferredContactMethod' => ['required', 'string', 'max:255'],
                'existingWebsiteUrl' => ['nullable', 'string', 'max:255'],
                'projectDescription' => ['required', 'string', 'max:3000'],
            ]);
        }

        if ($module === 'marketing-partners') {
            return $request->validate([
                'fullName' => ['required', 'string', 'max:255'],
                'email' => ['required', 'email', 'max:255'],
                'phone' => ['required', 'string', 'max:50'],
                'cityCountry' => ['required', 'string', 'max:255'],
                'profession' => ['required', 'string', 'max:255'],
                'experience' => ['required', 'string', 'max:2000'],
                'industries' => ['required', 'string', 'max:2000'],
                'leadMethods' => ['required', 'string', 'max:2000'],
                'expectedLeadsPerMonth' => ['required', 'string', 'max:255'],
                'profileUrl' => ['nullable', 'string', 'max:255'],
                'introduction' => ['required', 'string', 'max:3000'],
            ]);
        }

        $validated = $request->validate([
            'slug' => ['required', 'string', 'max:255'],
            'status' => ['required', 'string', 'max:50'],
            'title' => ['required', 'string', 'max:255'],
            'eyebrow' => ['required', 'string', 'max:255'],
            'summary' => ['required', 'string', 'max:1000'],
            'primaryCtaLabel' => ['required', 'string', 'max:255'],
            'primaryCtaHref' => ['required', 'string', 'max:255'],
            'secondaryCtaLabel' => ['required', 'string', 'max:255'],
            'secondaryCtaHref' => ['required', 'string', 'max:255'],
            'bodyTitle' => ['required', 'string', 'max:255'],
            'bodyContent' => ['required', 'string', 'max:3000'],
        ]);

        $validated['heroPoints'] = preg_split('/\r\n|\r|\n/', (string) $request->input('heroPoints_text', '')) ?: [];

        return $validated;
    }
}
