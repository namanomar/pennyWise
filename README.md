# Pennywise - Multi-User Budget Tracking Platform 🧾💰

Pennywise is a multi-user budget tracking platform built with TypeScript, Next.js, Drizzle ORM, PostgreSQL, Node.js, React.js, Shadcn UI, and Clerk.js. The platform allows users to track their expenses, set budgets, and monitor their financial goals in a collaborative and user-friendly environment.

## Features ✨

- **Multi-user support** 👥: Each user can create and manage their own budget and track expenses.
- **Budget tracking** 📊: Set monthly or yearly budgets and visualize how well you're staying on track.
- **Expense categorization** 🗂: Organize expenses into categories for better insights.
- **Real-time updates** ⏱: All data updates in real time using React and Next.js.
- **Responsive design** 📱💻: Built with Shadcn UI to provide a clean, responsive interface for desktop and mobile users.
- **PostgreSQL database** 🗄: All data is securely stored in a PostgreSQL database using Drizzle ORM.
- **Authentication with Clerk.js** 🔒: User authentication and management handled by Clerk.js, ensuring secure login and sign-up processes.

## Tech Stack 🛠️

- **Frontend:**
  - [Next.js](https://nextjs.org/) ⚛️: Server-side rendering and routing for React applications.
  - [React.js](https://reactjs.org/) 🌐: User interface framework.
  - [Shadcn UI](https://shadcn.dev/) 🎨: UI components for a responsive, modern design.
  - [Clerk.js](https://clerk.dev/) 🔐: Authentication and user management platform.
  - **TypeScript** 🟦: Strong typing and modern JavaScript features.

- **Backend:**
  - [Node.js](https://nodejs.org/) ⚙️: Backend runtime environment.
  - [Drizzle ORM](https://drizzle.team/) 🧑‍💻: Database ORM for PostgreSQL.
  - **PostgreSQL** 🐘: Robust and scalable relational database system.

## Installation 🚀

To set up and run the Pennywise platform locally, follow these steps:

1. **Clone the repository** 🌀:
   ```bash
   git clone https://github.com/your-username/pennywise.git
   cd pennywise
   ```
2. Install dependencies 📦:

```
npm install
```

3. Set up environment variables 🔑:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_frontend_api
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_DRIZZLE_DATABASE_URL= your database url

```
4. Run database migrations
```
npm run db:migrate

```
5. Start the development server ⚡
```
npm run dev

```

## Usage 💡
1. Sign up and log in 🔒: Authentication is handled by Clerk.js, allowing for secure and seamless user sign-up and login.
2. Create a budget 💵: Set up your budget by choosing categories and setting limits.
3. Track expenses 🧾: Add and categorize your expenses to keep track of your spending.
4. View insights 📊: Use the dashboard to see how well you're staying within your budget.
