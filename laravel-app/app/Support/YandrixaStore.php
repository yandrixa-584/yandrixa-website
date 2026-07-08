<?php

namespace App\Support;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class YandrixaStore
{
    public const DEFAULT_ADMIN_EMAIL = 'superadmin@yandrixa.local';

    public const DEFAULT_ADMIN_PASSWORD = 'Yandrixa@123';

    public static function adminEmail(): string
    {
        return trim((string) env('ADMIN_EMAIL', self::DEFAULT_ADMIN_EMAIL)) ?: self::DEFAULT_ADMIN_EMAIL;
    }

    public static function adminPassword(): string
    {
        return trim((string) env('ADMIN_PASSWORD', self::DEFAULT_ADMIN_PASSWORD)) ?: self::DEFAULT_ADMIN_PASSWORD;
    }

    public static function businessSettings(): array
    {
        return self::readJson(resource_path('data/business-settings.json'), [
            'branding' => [
                'name' => 'Yandrixa Smart Solutions',
                'brand' => 'Yandrixa',
                'subBrand' => 'Smart Solutions',
                'tagline' => 'Build. Grow. Scale.',
                'domain' => 'yandrixa.in',
            ],
            'seo' => [
                'siteUrl' => 'https://yandrixa.in',
                'defaultTitle' => 'Yandrixa Smart Solutions',
                'titleTemplate' => '%s | Yandrixa Smart Solutions',
                'siteDescription' => 'Digital solutions for modern businesses.',
            ],
            'contact' => [
                'email' => '',
                'phone' => '',
                'whatsapp' => '',
                'location' => '',
            ],
            'social' => [
                'linkedin' => '',
                'instagram' => '',
                'facebook' => '',
                'twitter' => '',
            ],
            'links' => [
                'consultationUrl' => '',
            ],
            'analytics' => [
                'id' => '',
                'enabled' => false,
                'requiresConsent' => false,
            ],
            'content' => [
                'footerDescription' => 'Yandrixa Smart Solutions builds practical websites, software, automation systems, and digital growth foundations.',
                'trustPoints' => ['Clear project communication', 'Custom business solutions', 'Scalable technology'],
            ],
            'partnerProgram' => [
                'headline' => 'Independent Marketing Partner Program',
                'disclosure' => 'Commission-based independent opportunity.',
                'commissionPercentage' => '',
            ],
        ]);
    }

    public static function writeBusinessSettings(array $settings): array
    {
        $normalized = $settings;
        $normalized['content']['trustPoints'] = array_values(array_filter(array_map(
            static fn ($item) => trim((string) $item),
            Arr::get($settings, 'content.trustPoints', [])
        )));

        self::writeJson(resource_path('data/business-settings.json'), $normalized);

        return $normalized;
    }

    public static function adminData(): array
    {
        return self::readJson(resource_path('data/admin-data.json'), [
            'enquiries' => [],
            'partnerApplications' => [],
            'landingPages' => [],
        ]);
    }

    public static function writeAdminData(array $data): array
    {
        self::writeJson(resource_path('data/admin-data.json'), $data);

        return $data;
    }

    public static function appendEnquiry(array $record): array
    {
        $data = self::adminData();
        array_unshift($data['enquiries'], self::normalizeRecord($record));
        self::writeAdminData($data);

        return $record;
    }

    public static function appendPartnerApplication(array $record): array
    {
        $data = self::adminData();
        array_unshift($data['partnerApplications'], self::normalizeRecord($record));
        self::writeAdminData($data);

        return $record;
    }

    public static function upsertLandingPage(array $record): array
    {
        $data = self::adminData();
        $collection = self::entityKey('landing-pages');
        $index = collect($data[$collection])->search(fn ($item) => ($item['id'] ?? null) === ($record['id'] ?? null));

        if ($index === false) {
            array_unshift($data[$collection], self::normalizeLandingPage($record));
        } else {
            $data[$collection][$index] = self::normalizeLandingPage($record);
        }

        self::writeAdminData($data);

        return $record;
    }

    public static function getModuleRecords(string $module): array
    {
        $data = self::adminData();

        return match ($module) {
            'enquiries' => array_values($data['enquiries'] ?? []),
            'marketing-partners' => array_values($data['partnerApplications'] ?? []),
            'landing-pages' => array_values($data['landingPages'] ?? []),
            'leads' => self::leadRecords(),
            'contacts' => self::contactRecords(),
            default => [],
        };
    }

    public static function leadRecords(): array
    {
        $qualifiedBudgets = [
            'INR 50,000 to 2,00,000',
            'INR 2,00,000 to 5,00,000',
            'Above INR 5,00,000',
        ];

        return array_values(array_map(function (array $record): array {
            $record['actionModule'] = 'enquiries';
            $record['sourceLabel'] = 'Project enquiry';

            return $record;
        }, array_filter(self::adminData()['enquiries'] ?? [], function (array $record) use ($qualifiedBudgets): bool {
            return in_array($record['budgetRange'] ?? '', $qualifiedBudgets, true);
        })));
    }

    public static function contactRecords(): array
    {
        $enquiries = array_map(function (array $record): array {
            return [
                'id' => $record['id'],
                'actionModule' => 'enquiries',
                'createdAt' => $record['createdAt'] ?? '',
                'updatedAt' => $record['updatedAt'] ?? ($record['createdAt'] ?? ''),
                'deletedAt' => $record['deletedAt'] ?? null,
                'name' => $record['fullName'] ?? '',
                'email' => $record['email'] ?? '',
                'phone' => $record['phoneOrWhatsApp'] ?? '',
                'source' => 'Project enquiry',
                'status' => ($record['deletedAt'] ?? null) ? 'Deleted' : 'Active',
                'company' => $record['businessName'] ?? '',
                'location' => $record['country'] ?? '',
            ];
        }, self::adminData()['enquiries'] ?? []);

        $partners = array_map(function (array $record): array {
            return [
                'id' => $record['id'],
                'actionModule' => 'marketing-partners',
                'createdAt' => $record['createdAt'] ?? '',
                'updatedAt' => $record['updatedAt'] ?? ($record['createdAt'] ?? ''),
                'deletedAt' => $record['deletedAt'] ?? null,
                'name' => $record['fullName'] ?? '',
                'email' => $record['email'] ?? '',
                'phone' => $record['phone'] ?? '',
                'source' => 'Marketing partner',
                'status' => ($record['deletedAt'] ?? null) ? 'Deleted' : 'Active',
                'company' => $record['profession'] ?? '',
                'location' => $record['cityCountry'] ?? '',
            ];
        }, self::adminData()['partnerApplications'] ?? []);

        $combined = array_merge($enquiries, $partners);

        usort($combined, fn (array $a, array $b) => strcmp($b['createdAt'] ?? '', $a['createdAt'] ?? ''));

        return $combined;
    }

    public static function findRecord(string $module, string $id): ?array
    {
        $entityKey = self::entityKey($module);

        if (! $entityKey) {
            return null;
        }

        foreach (self::adminData()[$entityKey] ?? [] as $record) {
            if (($record['id'] ?? null) === $id) {
                return $record;
            }
        }

        return null;
    }

    public static function updateRecord(string $module, string $id, array $attributes): ?array
    {
        $data = self::adminData();
        $entityKey = self::entityKey($module);

        if (! $entityKey) {
            return null;
        }

        foreach ($data[$entityKey] as $index => $record) {
            if (($record['id'] ?? null) !== $id) {
                continue;
            }

            $updated = array_merge($record, $attributes, [
                'id' => $id,
                'updatedAt' => now()->toIso8601String(),
            ]);

            $data[$entityKey][$index] = $module === 'landing-pages'
                ? self::normalizeLandingPage($updated)
                : self::normalizeRecord($updated);

            self::writeAdminData($data);

            return $data[$entityKey][$index];
        }

        return null;
    }

    public static function setDeletedState(string $module, string $id, ?string $deletedAt): ?array
    {
        return self::updateRecord($module, $id, ['deletedAt' => $deletedAt]);
    }

    public static function permanentlyDeleteRecord(string $module, string $id): bool
    {
        $data = self::adminData();
        $entityKey = self::entityKey($module);

        if (! $entityKey) {
            return false;
        }

        $before = count($data[$entityKey]);
        $data[$entityKey] = array_values(array_filter($data[$entityKey], fn (array $record) => ($record['id'] ?? null) !== $id));
        self::writeAdminData($data);

        return count($data[$entityKey]) !== $before;
    }

    public static function getPublishedLandingPageBySlug(string $slug): ?array
    {
        foreach (self::adminData()['landingPages'] ?? [] as $record) {
            if (($record['slug'] ?? null) === $slug && ($record['status'] ?? null) === 'published' && ! ($record['deletedAt'] ?? null)) {
                return $record;
            }
        }

        return null;
    }

    public static function siteProps(): array
    {
        $settings = self::businessSettings();
        $adminData = self::adminData();

        return [
            'branding' => $settings['branding'] ?? [],
            'seo' => $settings['seo'] ?? [],
            'contact' => $settings['contact'] ?? [],
            'social' => $settings['social'] ?? [],
            'content' => $settings['content'] ?? [],
            'partnerProgram' => $settings['partnerProgram'] ?? [],
            'navigation' => [
                ['label' => 'Home', 'href' => '/'],
                ['label' => 'Services', 'href' => '/services'],
                ['label' => 'Work', 'href' => '/work'],
                ['label' => 'About', 'href' => '/about'],
                ['label' => 'Partners', 'href' => '/partners'],
                ['label' => 'Contact', 'href' => '/contact'],
            ],
            'services' => self::serviceCards(),
            'projects' => self::projectCards(),
            'testimonials' => self::testimonials(),
            'stats' => [
                'enquiries' => count($adminData['enquiries'] ?? []),
                'partnerApplications' => count($adminData['partnerApplications'] ?? []),
                'landingPages' => count($adminData['landingPages'] ?? []),
            ],
        ];
    }

    public static function publicSection(string $slug): array
    {
        $sections = [
            'about' => [
                'eyebrow' => 'About Yandrixa',
                'title' => 'A practical technology partner for businesses that want to build, grow, and scale.',
                'description' => 'Yandrixa Smart Solutions helps businesses launch professional websites, build custom systems, streamline workflows, and create stronger digital growth foundations.',
                'points' => [
                    'Business-first discovery before implementation',
                    'Clear communication throughout delivery',
                    'Scalable architecture for future growth',
                    'Long-term support after launch',
                ],
            ],
            'services' => [
                'eyebrow' => 'Services',
                'title' => 'Digital solutions built around business goals, operations, and conversion.',
                'description' => 'From websites and software to API integrations, automation, and marketing support, Yandrixa covers the systems that help modern businesses operate better.',
                'points' => array_map(fn (array $service) => $service['name'], self::serviceCards()),
            ],
            'work' => [
                'eyebrow' => 'Selected work',
                'title' => 'Examples of the systems, platforms, and growth-focused solutions we build.',
                'description' => 'These examples reflect the type of product thinking, workflow clarity, and technical depth that Yandrixa brings to client projects.',
                'points' => array_map(fn (array $project) => $project['title'], self::projectCards()),
            ],
            'partners' => [
                'eyebrow' => 'Marketing partner program',
                'title' => 'Partner with Yandrixa to bring qualified business leads and grow together.',
                'description' => 'Independent marketers, consultants, and network-driven professionals can collaborate with Yandrixa on a commission-based basis.',
                'points' => [
                    'Flexible independent collaboration model',
                    'Suitable for marketers, consultants, and referral partners',
                    'Business website, software, and growth service offerings',
                    'Transparent lead-sharing and follow-up coordination',
                ],
            ],
            'contact' => [
                'eyebrow' => 'Project enquiry',
                'title' => 'Tell us what you want to build and we will help shape the right solution.',
                'description' => 'Share your business needs, timelines, and goals so Yandrixa can recommend a practical next step.',
                'points' => [
                    'Website projects',
                    'Custom web applications',
                    'Automation and AI workflows',
                    'Digital growth support',
                ],
            ],
            'privacy' => [
                'eyebrow' => 'Privacy',
                'title' => 'Privacy and data handling information.',
                'description' => 'Enquiry details submitted through this website are used only for project communication, service discussions, and business follow-up.',
                'points' => [
                    'Submitted information is used for response and follow-up',
                    'Basic campaign metadata may be stored for context',
                    'Admin records are managed internally by Yandrixa',
                ],
            ],
            'terms' => [
                'eyebrow' => 'Terms',
                'title' => 'Basic usage and service engagement terms.',
                'description' => 'Website content is informational, project scopes are finalized separately, and any delivery work starts only after discussion and mutual agreement.',
                'points' => [
                    'Service scope is finalized during discussion',
                    'Timelines depend on requirements and approvals',
                    'Project delivery may involve third-party tooling when needed',
                ],
            ],
        ];

        return $sections[$slug] ?? [
            'eyebrow' => Str::headline($slug),
            'title' => Str::headline($slug),
            'description' => '',
            'points' => [],
        ];
    }

    protected static function entityKey(string $module): ?string
    {
        return match ($module) {
            'enquiries' => 'enquiries',
            'marketing-partners' => 'partnerApplications',
            'landing-pages' => 'landingPages',
            default => null,
        };
    }

    protected static function normalizeRecord(array $record): array
    {
        return array_merge($record, [
            'updatedAt' => $record['updatedAt'] ?? ($record['createdAt'] ?? now()->toIso8601String()),
            'deletedAt' => $record['deletedAt'] ?? null,
        ]);
    }

    protected static function normalizeLandingPage(array $record): array
    {
        return array_merge(self::normalizeRecord($record), [
            'heroPoints' => array_values(array_filter(array_map('trim', $record['heroPoints'] ?? []))),
            'status' => ($record['status'] ?? 'draft') === 'published' ? 'published' : 'draft',
        ]);
    }

    protected static function readJson(string $path, array $fallback): array
    {
        if (! File::exists($path)) {
            self::writeJson($path, $fallback);

            return $fallback;
        }

        $decoded = json_decode(File::get($path), true);

        return is_array($decoded) ? $decoded : $fallback;
    }

    protected static function writeJson(string $path, array $data): void
    {
        File::ensureDirectoryExists(dirname($path));
        File::put($path, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES).PHP_EOL);
    }

    protected static function serviceCards(): array
    {
        return [
            ['name' => 'Website Development', 'description' => 'Professional responsive websites built for trust and enquiries.'],
            ['name' => 'Web Applications', 'description' => 'Custom systems, portals, and business platforms with role-based access.'],
            ['name' => 'API Development', 'description' => 'Reliable integrations and backend services that keep systems connected.'],
            ['name' => 'AI and Automation', 'description' => 'Workflow automation, chatbot flows, and lead handling improvements.'],
            ['name' => 'Dashboards', 'description' => 'Operational dashboards, internal tools, and reporting systems.'],
            ['name' => 'Digital Growth', 'description' => 'Campaign-ready landing pages and structured digital growth support.'],
        ];
    }

    protected static function projectCards(): array
    {
        return [
            ['title' => 'SaaS Management Platform', 'summary' => 'A multi-role business workspace for workflows, reporting, and customer operations.'],
            ['title' => 'Clinic Management System', 'summary' => 'Appointments, records, billing visibility, and staff coordination in one platform.'],
            ['title' => 'Logistics Operations Portal', 'summary' => 'Dispatch visibility, tracking updates, and internal reporting for operations teams.'],
            ['title' => 'AI Lead Automation', 'summary' => 'Lead qualification, routing rules, and faster sales follow-up.'],
        ];
    }

    protected static function testimonials(): array
    {
        return [
            ['name' => 'Aarav Mehta', 'role' => 'Founder', 'company' => 'Growing Startup', 'feedback' => 'The communication felt clear from the start, and the solution direction matched what a growing business would actually need.'],
            ['name' => 'Nisha Rao', 'role' => 'Operations Lead', 'company' => 'Operations Team', 'feedback' => 'The platform concept feels organized and practical. It gives a strong sense of how workflows, reporting, and support can come together.'],
            ['name' => 'Daniel Joseph', 'role' => 'Independent Consultant', 'company' => 'Advisory Practice', 'feedback' => 'The positioning is professional and easy to explain. It creates confidence without sounding inflated or unrealistic.'],
            ['name' => 'Priya Shah', 'role' => 'Business Owner', 'company' => 'Service Brand', 'feedback' => 'The layout feels modern, premium, and business-focused. The structure makes it easy to understand the services and next steps.'],
        ];
    }
}
