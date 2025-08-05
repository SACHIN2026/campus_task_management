# Module & Class Structure

## Architecture Overview
The application follows a modern React/Next.js architecture with TypeScript for type safety.

## Core Modules

### 1. Authentication Module
```
/src/contexts/AuthContext.tsx
- AuthProvider: React context for global auth state
- useAuth: Hook for accessing authentication functions
- Methods: login(), logout(), getCurrentUser(), isAuthenticated()
```

### 2. Data Access Layer
```
/src/lib/dataStore.ts
- DataStore class: Singleton for data management
- Storage: localStorage for persistence
- Methods: CRUD operations for tasks and users
- Features: Filtering, pagination, demo data generation
```

### 3. Type Definitions
```
/src/types/index.ts
- Interfaces: User, Task, TaskFilter, PaginationInfo
- Enums: TaskStatus, TaskPriority  
- Form Types: TaskFormData, AuthState
```

### 4. UI Components
```
/src/components/
├── LoginForm.tsx          - Authentication form
├── TaskForm.tsx           - Create/Edit task form  
├── TaskList.tsx           - Task display with filtering
├── Navigation.tsx         - App navigation bar
└── ProtectedRoute.tsx     - Route protection wrapper
```

### 5. Page Components  
```
/src/app/
├── page.tsx               - Login page (home)
├── layout.tsx             - Root layout with AuthProvider
└── dashboard/
    ├── page.tsx           - Main task dashboard
    └── create/page.tsx    - Dedicated create page
```

## Class Structure Details

### DataStore Class
```typescript
class DataStore {
  private tasks: Task[]
  private users: User[]
  private currentUser: User | null
  
  // Storage methods
  private loadFromStorage()
  private saveToStorage()
  
  // Authentication methods  
  login(username: string, password: string): User | null
  logout(): void
  getCurrentUser(): User | null
  isAuthenticated(): boolean
  
  // Task CRUD methods
  createTask(taskData): Task
  getTasks(filter?, page?, limit?): {tasks, pagination}
  getTaskById(id): Task | null
  updateTask(id, updates): Task | null 
  deleteTask(id): boolean
  
  // Utility methods
  generateDemoData(): void
}
```

### Component Structure
- **Functional Components**: All components use React hooks
- **TypeScript**: Strong typing for props and state
- **Custom Hooks**: useAuth for authentication logic
- **Context Pattern**: Global state management for auth
- **Protected Routes**: HOC pattern for route protection

## Design Patterns Used
1. **Singleton Pattern**: DataStore instance
2. **Context Pattern**: Authentication state
3. **Higher-Order Component**: ProtectedRoute wrapper  
4. **Repository Pattern**: DataStore abstracts data access
5. **Controlled Components**: All forms use controlled inputs
