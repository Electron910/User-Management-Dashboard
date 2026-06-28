# User Management Dashboard

## Overview
A responsive, feature-rich React web application designed for administrators to perform complete CRUD (Create, Read, Update, Delete) operations on user records. Built with Vite, React 19, and Axios, this dashboard interfaces with the mock **JSONPlaceholder** REST API to simulate real-world data handling, real-time search, dynamic filtering, lexicographical sorting, and state-aware pagination.

## Live Demo
[Deployed URL Here]

## Setup Instructions
To set up and run this project locally on your machine, follow these steps:

```bash
# 1. Clone the repository
git clone <repo-url>
cd user-management-dashboard

# 2. Install required dependencies
npm install

# 3. Configure environment variables
cp .env.example .env

# 4. Start the local Vite development server
npm run dev
```

## Running Tests
This project utilizes **Vitest** and **React Testing Library** for robust unit and component testing.
```bash
# Execute the test suite
npm run test
```

## Folder Structure
```
user-management-dashboard/
│
├── public/
│    └── favicon.ico
│
├── src/
│    ├── api/
│    │    └── userService.js          # Axios instance + all HTTP calls
│    │
│    ├── components/
│    │    ├── Header/
│    │    ├── SearchBar/
│    │    ├── FilterPopup/
│    │    ├── UserTable/
│    │    ├── UserRow/
│    │    ├── Pagination/
│    │    ├── UserForm/
│    │    ├── ConfirmDelete/
│    │    └── Toast/
│    │
│    ├── hooks/
│    │    └── useUsers.js             # Encapsulates all user data logic
│    │
│    ├── utils/
│    │    ├── validators.js           # Pure validation functions
│    │    ├── mappers.js              # API schema → app schema transformations
│    │    ├── helpers.js              # Sorting, filtering, pagination math
│    │    └── constants.js            # Shared constants (API_URL, DEPARTMENTS)
│    │
│    ├── tests/
│    │    ├── setup.js
│    │    ├── validators.test.js
│    │    ├── helpers.test.js
│    │    ├── mappers.test.js
│    │    ├── UserForm.test.jsx
│    │    ├── UserTable.test.jsx
│    │    └── Pagination.test.jsx
│    │
│    ├── styles/
│    │    └── globals.css             # CSS variables, reset, base typography
│    │
│    ├── App.jsx                      # Root layout and state container
│    └── main.jsx                     # Application entry point
│
├── .gitignore
├── .env.example
├── vite.config.js
└── README.md
```

## Libraries Used
- **axios** — Advanced HTTP client equipped with interceptors for clean error extraction and request management.
- **react-router-dom** — Multi-page client-side routing capabilities.
- **vitest** — Blazing fast unit test runner sharing Vite's native transformation pipeline.
- **@testing-library/react** — Robust component testing utilities simulating actual user interactions and accessibility markers.

## Engineering Assumptions
1. **Name Splitting Logic:** The JSONPlaceholder API returns a single `name` string property (e.g. `"Leanne Graham"`). To satisfy the explicit requirement for separate First Name and Last Name columns, we programmatically split the string at the first space. The first token becomes `firstName` (`"Leanne"`), and all subsequent tokens are joined to form `lastName` (`"Graham"`), successfully preserving multi-word surnames.
2. **Deterministic Department Assignment:** JSONPlaceholder does not supply a `department` property. To maintain stable, predictable department designations across repeated network fetches, we assign departments deterministically using the mathematical modulo operator against the user ID: `DEPARTMENTS[user.id % DEPARTMENTS.length]`.
3. **Simulated API Mutability:** Because JSONPlaceholder is a public testing backend, it simulates successful responses for `POST`, `PUT`, and `DELETE` requests (e.g. returning HTTP Status `201 Created`) but does not persist changes to the remote database. All state modifications are dynamically updated within the local React component state to ensure an instantly responsive user interface.

## Challenges Faced
- **Simulated ID Collisions:** When submitting multiple new users via `POST`, JSONPlaceholder consistently returns the same simulated ID (`11`). To prevent React key rendering errors and allow independent editing of newly created items, we implemented a custom fallback ID generator (`generateTempId`) combining timestamp and random strings for local state management.
- **Strict Focus Trapping & Accessibility:** Ensuring that open modal dialogs (User Form, Delete Confirmation) strictly trap keyboard focus (`Tab` / `Shift+Tab`) and respond to the `Escape` key required careful DOM ref tracking and native event listener lifecycle management.

## Future Improvements
- **Persistent Backend Integration:** Swap the mock API endpoint with a production database backend such as Supabase, PostgreSQL, or MongoDB.
- **Authentication & Authorization:** Implement secure JWT authentication and role-based access control (RBAC) to restrict CRUD actions to authorized administrator accounts.
- **Advanced Data Export:** Provide dedicated functionality to export filtered and sorted user lists directly to CSV or Excel formats.
- **Row Virtualization:** Integrate windowing libraries (such as `react-window`) to optimize DOM rendering performance when managing extremely large datasets (10,000+ records).
