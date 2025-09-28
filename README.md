# user-list-management

A **React + Redux** based User Management System featuring **table and card views**, **search**, **pagination**, and **CRUD operations** with modals. Built for **learning, demo, or internal use**.

---

## 📝 Project Description

This project is a **single-page application (SPA)** developed using **React, Redux, and TypeScript**. It allows you to:

- **View users** in table or card layout.
- **Search users** by name or email.
- **Create, edit, and delete users** using modals.
- **Pagination** to navigate through user lists.
- **Skeleton loaders** while fetching data.
- **Protected routes** for authenticated access.
- Responsive layout for **desktop and mobile devices**.

It is ideal for **admin dashboards** or **internal management tools**.

---

## ⚙️ Features

1. **Authentication & Private Routes**  
   - Login system using `localStorage` token.  
   - `PrivateRoute` component to protect authenticated routes.

2. **User CRUD**  
   - Create, edit, delete users through modals.  
   - Confirmation modal before deletion.  

3. **UI Views**  
   - **Table view** (desktop) and **Card view** (mobile & grid).  
   - **Skeleton loaders** while data is loading.  

4. **Search & Pagination**  
   - Debounced search for user filtering.  
   - Pagination buttons for table and card view.

5. **State Management**  
   - **Redux Toolkit** for global state.  
   - `fetchAllUsers`, `deleteUserById` implemented in slices.

6. **Reusable Components**  
   - `UserTable`, `UserCardGrid`, `Skeleton`, `UserFormModal`, `ConfirmModal`.  
   - Flexible hooks like `useUserModal` for modal state management.

---

## 🛠️ Tech Stack

- **React 18 + TypeScript**  
- **Redux Toolkit** for state management  
- **React Router DOM v6** for routing  
- **Tailwind CSS** for styling  
- **PrimeReact** for theme & UI consistency  
- **Lucide-React** for icons  
- **Lodash** for debouncing search  

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/user-list-management.git
cd user-list-management
### 2. Install dependencies
```bash
npm install
```


