# Admin Dashboard UI

A modern, responsive Admin Dashboard built with Next.js 15, TypeScript, and Tailwind CSS v4. This project demonstrates a clean, professional UI with functional user management features.

![Dashboard Preview](https://placehold.co/1200x600/1a1a1a/ffffff?text=Admin+Dashboard+UI)

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15 (App Router), React 19, and TypeScript.
- **Clean UI Design**: Professional aesthetic using HSL color variables (no gradients) and Inter font.
- **Responsive Layout**: Fully responsive sidebar navigation and data tables that adapt to mobile devices.
- **Theme System**: Built-in Dark/Light mode toggle with persistence.
- **State Management**: Powered by Zustand for efficient global state handling.
- **Mock API**: In-memory mock API implementation for realistic CRUD operations.

### 👤 User Management
- **Data Table**: Display users with Name, Email, and Status.
- **CRUD Operations**: Add, Edit, and Delete users.
- **Search & Filter**: Real-time filtering by name or email.
- **Sorting**: Sortable columns (Name, Email, Status).
- **Pagination**: Client-side pagination for managing large lists.
- **Form Validation**: Client-side validation for user inputs.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Utilities**: `clsx`, `tailwind-merge`

## 📦 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dev-5804/admin-dashboard-ui.git
   cd admin-dashboard-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 📂 Project Structure

```
├── app/
│   ├── api/            # Mock API routes
│   ├── dashboard/      # Dashboard pages (Overview, Users, Settings)
│   ├── globals.css     # Global styles & Tailwind theme variables
│   └── layout.tsx      # Root layout
├── components/         # Reusable UI components (Button, Card, Modal, etc.)
├── lib/                # Utilities, Stores, and Contexts
└── public/             # Static assets
```

## 🎨 Customization

The project uses CSS variables for theming defined in `app/globals.css`. You can easily customize the color palette by modifying the HSL values for both light and dark modes.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
