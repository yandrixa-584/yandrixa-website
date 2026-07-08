# Yandrixa Smart Solutions Website

Production-ready marketing website for Yandrixa Smart Solutions built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, React Hook Form, Zod, and Nodemailer.

## Project overview

The site is designed for two audiences:

- Potential clients looking for websites, software, APIs, e-commerce, automation, dashboards, and digital growth support
- Independent marketing partners applying for the commission-based partner program

The implementation includes:

- Responsive multi-page business website
- Dynamic service-detail pages generated from structured content
- Contact enquiry and partner application forms with client and server validation
- SMTP-ready API routes with safe fallback messaging when email is not configured
- SEO metadata, JSON-LD, sitemap, robots, Open Graph image, custom 404 page
- Accessibility-minded navigation, forms, focus states, and reduced-motion handling

## Technology stack

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- Framer Motion
- Lucide React
- React Hook Form
- Zod
- Nodemailer
- ESLint
- Prettier

## Installation

```bash
npm install
```

## Local development

```bash
npm run dev
```

Open `http://localhost:3000` unless Next chooses another free port during development.

## Admin login

The website now includes a file-backed superadmin panel.

- Login URL: `/admin/login`
- Default superadmin email: `superadmin@yandrixa.local`
- Default superadmin password: `Yandrixa@123`

Change these before production through environment variables:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

The admin panel updates the shared runtime settings file:

- `src/data/business-settings.json`

Changes made in the admin panel are reflected across the public site wherever those shared values are used.

## Environment variables

Copy `.env.example` to `.env.local` and update the values.

Required for production-ready contact delivery:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `SMTP_FROM`
- `CONTACT_RECIPIENT_EMAIL`
- `PARTNER_RECIPIENT_EMAIL`

Optional:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

## Update business information

You can now manage the main shared settings in two ways:

1. Through the admin dashboard at `/admin`
2. By editing the runtime JSON file directly:

- `src/data/business-settings.json`

These settings control:

- Business name
- Brand and sub-brand text
- Tagline
- Domain and site URL
- Main SEO description
- Email
- Phone number
- WhatsApp number
- Business location
- Social links
- Consultation link
- Footer description
- Trust-point microcopy
- Partner-program disclosure

If you change email, phone number, WhatsApp number, location, or other shared business details in the admin panel or `src/data/business-settings.json`, the change is reflected everywhere the site uses that setting.

Other editable content files are:

- `src/content/services.ts`
- `src/content/projects.ts`
- `src/content/faqs.ts`

## Update services

Service content is managed in `src/content/services.ts`.

Each service entry controls:

- Service slug
- Hero copy
- Summary and intro
- Problems solved
- Deliverables
- Technologies
- FAQ items
- Related services

The website automatically uses this data for:

- `/services`
- `/services/[slug]`
- Sitemap generation
- Service metadata

## Add project entries

Edit `src/content/projects.ts` to add or replace:

- Real client projects
- Internal products
- Concept demonstrations
- Capability examples

Be careful to label each entry honestly through the `status` field.

## Configure SMTP

The API routes are:

- `src/app/api/contact/route.ts`
- `src/app/api/partner/route.ts`

If SMTP is configured, submissions are emailed through Nodemailer.

If SMTP is not configured:

- Validation still runs
- The API returns a message explaining that delivery is not configured
- The site does not falsely pretend the email was delivered

## Configure WhatsApp

Set `NEXT_PUBLIC_WHATSAPP_NUMBER` to display the floating WhatsApp button and footer/contact links.

If no number is configured, WhatsApp UI is hidden automatically.

## Configure analytics

Analytics is optional.

To enable it:

1. Set `NEXT_PUBLIC_ANALYTICS_ID`
2. Set `NEXT_PUBLIC_ENABLE_ANALYTICS=true`

If analytics is disabled, no analytics script is loaded.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

Optional formatting:

```bash
npm run format
```

## Production build

```bash
npm run build
npm run start
```

## Deployment

### Vercel

1. Import the repository into Vercel
2. Add the environment variables from `.env.example`
3. Deploy
4. Update the domain to `yandrixa.in`

### Standard Node.js server

1. Run `npm install`
2. Run `npm run build`
3. Run `npm run start`
4. Reverse-proxy the app with Nginx or another web server
5. Configure HTTPS and environment variables

### Other Next.js-compatible hosting

Use any host that supports:

- Node.js 20+
- Next.js server output
- Environment variables
- SMTP outbound access if email submission should work

## Domain connection notes

For `yandrixa.in`:

- Point the domain to the hosting provider
- Set the final production value of `NEXT_PUBLIC_SITE_URL`
- Rebuild after finalizing analytics and contact settings if metadata changed

## Pre-launch checklist

- Replace all contact placeholders
- Configure official email addresses
- Configure WhatsApp number
- Add social links
- Add real logo assets
- Review service descriptions
- Replace or remove capability examples
- Add verified client projects
- Add only genuine testimonials
- Review partner-program terms
- Review privacy policy
- Review terms
- Configure SMTP
- Test contact form
- Test partner application form
- Configure analytics
- Verify sitemap
- Verify metadata
- Test all navigation links
- Test on mobile devices
- Run accessibility audit
- Run Lighthouse audit
- Test production build
- Connect `yandrixa.in` domain

## Notes before launch

- Legal content in `/privacy` and `/terms` should be reviewed by the business before production use.
- Placeholder contact fields are intentionally visible until real business details are configured.
- Capability examples should not be presented as verified client work unless replaced with real references.
