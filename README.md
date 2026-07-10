# CourseNest — Full Stack TypeScript Submission

CourseNest is a production-ready learning marketplace built for the TypeScript full-stack project requirements. It demonstrates frontend development, backend route handlers, database management, JWT authentication, role-based authorization, API design, filtering, pagination, dashboard analytics, and polished UI/UX.

## Tech Stack

### Frontend
- Next.js 14 App Router
- React.js
- TypeScript
- Tailwind CSS
- Recharts
- Responsive UI with CSS animations and 3D card effects

### Backend
- Next.js Route Handlers as server-side API layer
- TypeScript
- MongoDB with Mongoose
- JWT authentication using HTTP-only cookies
- Role-based authorization for admin-only actions

## Main Features

- Full-width sticky responsive navbar
- Custom logo image in navbar/footer
- Hero section with animated 3D course slider
- 7+ meaningful landing sections
- Responsive course listing cards
- Skeleton loader while fetching catalog data
- Public course details page with image gallery, overview, specifications, reviews, and related items
- Explore page with search, category filter, level filter, rating filter, price filter, sorting, and pagination
- Login and registration with validation and error handling
- Demo credential auto-fill buttons
- Protected dashboard
- Admin-only Add Course page
- Admin-only Manage Courses page with view/delete actions
- About, Contact, Blog, Support, Privacy, and Terms pages
- Functional contact and newsletter API endpoints

## Demo Credentials

### Admin
Email: `admin@coursenest.dev`  
Password: `Admin@12345`

### Learner/User
Email: `learner@coursenest.dev`  
Password: `Learner@12345`

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

The app includes fallback in-memory data, so it can run locally even before MongoDB is connected. For final deployment and real backend/database testing, add MongoDB variables and run the seed script.

## Environment Variables

Use only the variables needed for this project. Firebase, ImgBB, Stripe, and a separate API base URL are not required because CourseNest uses MongoDB + JWT + Next.js Route Handlers in one deployment.

```env
NEXT_PUBLIC_APP_URL="https://your-coursenest-app.vercel.app"
CLIENT_URL="https://your-coursenest-app.vercel.app"
MONGODB_URI="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/coursenest?retryWrites=true&w=majority"
MONGODB_DB="coursenest"
JWT_SECRET="generate_a_new_long_random_secret_for_production"
COOKIE_SAMESITE="lax"
ADMIN_EMAIL="admin@coursenest.dev"
ADMIN_PASSWORD="Admin@12345"
ADMIN_NAME="CourseNest Admin"
NEXT_PUBLIC_DEMO_ADMIN_EMAIL="admin@coursenest.dev"
NEXT_PUBLIC_DEMO_ADMIN_PASSWORD="Admin@12345"
NEXT_PUBLIC_DEMO_USER_EMAIL="learner@coursenest.dev"
NEXT_PUBLIC_DEMO_USER_PASSWORD="Learner@12345"
```

## Seed Database

After adding a valid MongoDB URI:

```bash
npm run seed
```

This creates:
- 12 real course items
- 1 admin account
- 1 learner account

## Build Check

```bash
npm run lint
npm run build
npm start
```

The build script uses Next.js App Router compile mode so dynamic API routes and protected pages build reliably for deployment environments.

## Deployment Steps for Vercel

1. Push this folder to a GitHub repository.
2. Import the repository into Vercel.
3. Add the environment variables from `.env.production.example`.
4. Deploy.
5. Run `npm run seed` locally once using the same production MongoDB URI, or use Vercel CLI with the same environment variables.
6. Submit the live URL, GitHub repository link, and demo credentials.

## Required Submission Information

Live Website URL: `https://your-coursenest-app.vercel.app`  
GitHub Repository Link: `https://github.com/your-username/coursenest-fullstack-submission`

Admin Email: `admin@coursenest.dev`  
Admin Password: `Admin@12345`

User Email: `learner@coursenest.dev`  
User Password: `Learner@12345`

## Requirement Mapping

| Requirement | Implementation |
| --- | --- |
| React/Next.js + TypeScript | Next.js 14 App Router with TS |
| Tailwind CSS | Global design system and responsive UI |
| Chart library | Recharts dashboard chart |
| Server-side code | `app/api/**/route.ts` Route Handlers |
| Database | MongoDB + Mongoose models |
| Authentication | JWT + HTTP-only cookie |
| Authorization | Admin-only add/manage APIs and pages |
| Landing page | Hero + stats + features + categories + courses + analytics + testimonials + blog + FAQ + newsletter |
| Core cards | Image, title, description, meta, rating, price, detail button |
| Explore page | Search, 4 filters, sorting, pagination |
| Details page | Gallery, overview, specifications, reviews, related items |
| Protected add page | `/items/add` |
| Protected manage page | `/items/manage` |
| Extra pages | About, Contact, Blog, Support, Privacy, Terms |
| Responsive UX | Mobile, tablet, desktop layouts |


## NPM-safe install note
This package intentionally does not include package-lock.json so Windows/npm can create a clean lockfile from the public npm registry. If npm install fails, run:

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps --no-audit --no-fund
```

On Windows PowerShell use:

```powershell
npm cache clean --force
Remove-Item -Recurse -Force node_modules, package-lock.json -ErrorAction SilentlyContinue
npm install --legacy-peer-deps --no-audit --no-fund
```


## PostCSS ES module fix

This version uses `postcss.config.cjs` because the project has `"type": "module"`. This prevents the Windows error: `ReferenceError: module is not defined in ES module scope`.
