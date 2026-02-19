# Student Course Selection and Scheduling System

React + Vite web application with role-based flows for Students and Admins.

## Tech Stack
- React (Functional Components + Hooks)
- React Router DOM
- Context API
- Tailwind CSS
- Mock JSON data (no backend)

## Features
- Role-based login (`student`, `admin`)
- Student course browsing, registration, conflict detection, schedule grid
- Admin course management (add, edit, delete)
- Global state via Context API
- Toast notifications and responsive sidebar layout

## Routes
- `/login`
- `/student/dashboard`
- `/student/courses`
- `/student/schedule`
- `/admin/dashboard`
- `/admin/manage-courses`

## Setup
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Conflict Logic
A registration is blocked when:
- same day, and
- `newStart < existingEnd`, and
- `newEnd > existingStart`

Implemented in `src/utils/checkTimeConflict.js`.
