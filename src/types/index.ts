// Schema Design for Task Management System

export interface User {
    id: string;
    username: string;
    password: string; // In real app, this would be hashed
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    isCompleted: boolean;
    isUrgent: boolean;
    createdAt: string;
    updatedAt: string;
    userId: string;
}

export enum TaskStatus {
    TODO = 'todo',
    IN_PROGRESS = 'in_progress',
    REVIEW = 'review',
    DONE = 'done'
}

export enum TaskPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    CRITICAL = 'critical'
}

export interface TaskFilter {
    status?: TaskStatus;
    priority?: TaskPriority;
    isCompleted?: boolean;
    isUrgent?: boolean;
    search?: string;
}

export interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface TaskFormData {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    isCompleted: boolean;
    isUrgent: boolean;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}
