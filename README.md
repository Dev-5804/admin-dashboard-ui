# SaaS Admin Dashboard – Next.js + TypeScript

A modern, responsive Admin Dashboard built with Next.js, TypeScript, and Tailwind CSS. This project demonstrates advanced frontend capabilities including complex state management, interactive data tables, and a polished UI architecture.

**[Live Demo](https://admin-dashboard-ui-nine.vercel.app/dashboard)**

## Features

- **Dashboard Layout**: Responsive Sidebar and Topbar navigation.
- **User Management**:
  - **Data Table**: View users with status indicators.
  - **CRUD Operations**: Add, Edit, and Delete users via modal forms.
  - **Search & Filter**: Real-time filtering by name or email.
- **Form Handling**: Client-side validation for robust data entry.
- **Theme Support**: Built-in Dark/Light mode toggle.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **Mock API**: Simulated backend interaction using Next.js API routes.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Dev-5804/admin-dashboard-ui.git
   cd admin-dashboard-ui
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Folder Structure

```
/app
  /dashboard      # Main dashboard pages
  /api            # Mock API routes
/components       # Reusable UI components (Sidebar, Table, Modal, etc.)
/lib              # Utility functions and types
/store            # Zustand state management stores
/styles           # Global styles and Tailwind configuration
```

## API Endpoints (Mock)

The project uses Next.js API routes to simulate a backend:

- `GET /api/users`: Fetch all users.
- `POST /api/users`: Create a new user.
- `PATCH /api/users`: Update an existing user.
- `DELETE /api/users`: Remove a user.

*Note: Data is stored in-memory and will reset on application restart.*

## License

This project is open source and available under the [MIT License](LICENSE).
