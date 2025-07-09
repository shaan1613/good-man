# Joy - Next.js App with Clerk Authentication

This is a Next.js application with Clerk authentication integration using the App Router approach.

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables in `.env.local` (use `.env.example` as a template):

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
# Add other required environment variables
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- User authentication with Clerk
- Sign-in and sign-up pages
- Protected routes
- User profile page
- Dashboard for authenticated users
- Supabase integration
- Sentry error tracking

## Authentication Flow

- The application uses Clerk for authentication
- The middleware protects specified routes
- The `<ClerkProvider>` wraps the application in `app/layout.tsx`
- Sign-in and sign-up components are provided by Clerk
- Protected routes check for authentication using Clerk's `auth()` function

## Deployment to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to your Vercel account
3. Click "Add New" → "Project"
4. Import your repository
5. Configure environment variables from your `.env.local` file
6. Click "Deploy"

## Deployment to Netlify

1. Push your code to a Git repository
2. Log in to your Netlify account
3. Click "Add new site" → "Import an existing project"
4. Connect to your Git provider and select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add environment variables from your `.env.local` file
7. Click "Deploy site"

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [Sentry Documentation](https://docs.sentry.io/)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
