### Project: Admin Dashboard UI (PRD)

**Title:** SaaS Admin Dashboard – Next.js + TypeScript

**Purpose:**
Show skill in frontend logic, interactive components, state handling, and UI architecture beyond static sections.

---

## 1. Objective

Build a functional admin dashboard with:

* Data table
* CRUD-like form behavior
* Search / filtering interaction
* Authentication placeholder (UI only)

This demonstrates client-relevant capabilities not present in the landing page project.

---

## 2. Scope

### In Scope

* Dashboard layout (Sidebar + Topbar)
* Table view with actions and filtering
* Modal or side-panel form for add/edit item
* Form validation (client side)
* Reusable button, card, badge, input components
* Mock API using static JSON or in-memory list
* Dark/light theme toggle (preferred)

### Out of Scope

* Real authentication backend
* Database persistence
* Complex role-based access control
* External design systems

---

## 3. Features / Requirements

### 3.1 UI Structure (Pages/Components)

* `/dashboard` → Main internal page
* Sidebar with navigation links (Home, Users, Settings)
* Topbar with:

  * Search input
  * Theme toggle

### 3.2 Data Table

* Display a list of “Users”

  * Fields: Name, Email, Status (Active/Inactive)
* Table actions:

  * Edit (opens form)
  * Delete (with confirm)
* Search filter by name/email substring

### 3.3 Form Modal or Drawer

* Required fields:

  * Name
  * Email (validate format)
  * Status (radio or toggle)
* On submit:

  * Update in-memory list instantly
  * Show success confirmation

### 3.4 Component Requirements

* `Button`, `Input`, `Card`, `Badge`, `Modal/Drawer`, `Table`, `SearchBar`, `Toggle`
* Responsive for tablet + desktop (mobile optional but preferred)

---

## 4. API Requirements (Mock)

* Use `/app/api/users/route.ts` (GET + POST + PATCH + DELETE)
* Store in a simple array **in memory**
* Reset on page refresh (expected)

---

## 5. Tech Stack

* Next.js App Router
* TypeScript
* Tailwind CSS
* Zustand or Context API for state handling (preferred)
* Deployed on Vercel

---

## 6. Folder Structure

```
/app
  /dashboard
    page.tsx
  /api
    /users
      route.ts
/components
  Sidebar.tsx
  Topbar.tsx
  Table.tsx
  Modal.tsx
  Input.tsx
  Button.tsx
  Badge.tsx
/lib
  users.ts
/styles
  globals.css
```

---

## 7. Acceptance Criteria

| Requirement                             | Status |
| --------------------------------------- | :----: |
| Dashboard layout exists                 |    ☐   |
| Sidebar + Topbar functional             |    ☐   |
| Table renders mock data                 |    ☐   |
| Search filters table rows               |    ☐   |
| Edit/Add item modal works               |    ☐   |
| Validation blocks empty-field submit    |    ☐   |
| Light/Dark toggle                       |    ☐   |
| Fully responsive layout                 |    ☐   |
| no console errors                       |    ☐   |
| README includes live link + screenshots |    ☐   |

You will mark each checkbox as you implement.

---

## 8. Deliverables

1. Live Vercel deployment
2. Public GitHub repository
3. README containing:

   * Tech stack
   * Features list
   * Screenshots
   * Installation steps
4. Screenshots in Featured section later

---

## 9. Suggested Project Name

`admin-dashboard-template`
or
`saa-dashboard-nextjs`