// Data Access Layer - In-memory storage with localStorage persistence
import { v4 as uuidv4 } from 'uuid';
import { Task, User, TaskStatus, TaskPriority, TaskFilter, PaginationInfo } from '@/types';

// Default demo user
const DEFAULT_USER: User = {
    id: '1',
    username: 'demo',
    password: 'password123' // In real app, this would be hashed
};

class DataStore {
    private tasks: Task[] = [];
    private users: User[] = [DEFAULT_USER];
    private currentUser: User | null = null;

    constructor() {
        this.loadFromStorage();
    }

    // Storage management
    private loadFromStorage() {
        if (typeof window !== 'undefined') {
            const storedTasks = localStorage.getItem('campus_assessment_tasks');
            const storedUsers = localStorage.getItem('campus_assessment_users');
            const storedCurrentUser = localStorage.getItem('campus_assessment_current_user');

            if (storedTasks) {
                this.tasks = JSON.parse(storedTasks);
            }
            if (storedUsers) {
                this.users = JSON.parse(storedUsers);
            } else {
                // Ensure default user exists
                this.users = [DEFAULT_USER];
                this.saveToStorage();
            }
            if (storedCurrentUser) {
                this.currentUser = JSON.parse(storedCurrentUser);
            }
        }
    }

    private saveToStorage() {
        if (typeof window !== 'undefined') {
            localStorage.setItem('campus_assessment_tasks', JSON.stringify(this.tasks));
            localStorage.setItem('campus_assessment_users', JSON.stringify(this.users));
            localStorage.setItem('campus_assessment_current_user', JSON.stringify(this.currentUser));
        }
    }

    // Authentication methods
    login(username: string, password: string): User | null {
        const user = this.users.find(u => u.username === username && u.password === password);
        if (user) {
            this.currentUser = user;
            this.saveToStorage();
            return user;
        }
        return null;
    }

    logout() {
        this.currentUser = null;
        if (typeof window !== 'undefined') {
            localStorage.removeItem('campus_assessment_current_user');
        }
    }

    getCurrentUser(): User | null {
        return this.currentUser;
    }

    isAuthenticated(): boolean {
        return this.currentUser !== null;
    }

    // Task CRUD operations
    createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>): Task {
        if (!this.currentUser) {
            throw new Error('User must be authenticated');
        }

        const task: Task = {
            ...taskData,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            userId: this.currentUser.id
        };

        this.tasks.push(task);
        this.saveToStorage();
        return task;
    }

    getTasks(filter?: TaskFilter, page: number = 1, limit: number = 10): { tasks: Task[], pagination: PaginationInfo } {
        if (!this.currentUser) {
            throw new Error('User must be authenticated');
        }

        let filteredTasks = this.tasks.filter(task => task.userId === this.currentUser!.id);

        // Apply filters
        if (filter) {
            if (filter.status) {
                filteredTasks = filteredTasks.filter(task => task.status === filter.status);
            }
            if (filter.priority) {
                filteredTasks = filteredTasks.filter(task => task.priority === filter.priority);
            }
            if (filter.isCompleted !== undefined) {
                filteredTasks = filteredTasks.filter(task => task.isCompleted === filter.isCompleted);
            }
            if (filter.isUrgent !== undefined) {
                filteredTasks = filteredTasks.filter(task => task.isUrgent === filter.isUrgent);
            }
            if (filter.search) {
                const searchLower = filter.search.toLowerCase();
                filteredTasks = filteredTasks.filter(task =>
                    task.title.toLowerCase().includes(searchLower) ||
                    task.description.toLowerCase().includes(searchLower)
                );
            }
        }

        // Sort by updatedAt (newest first)
        filteredTasks.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

        // Apply pagination
        const total = filteredTasks.length;
        const totalPages = Math.ceil(total / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

        return {
            tasks: paginatedTasks,
            pagination: {
                page,
                limit,
                total,
                totalPages
            }
        };
    }

    getTaskById(id: string): Task | null {
        if (!this.currentUser) {
            throw new Error('User must be authenticated');
        }
        return this.tasks.find(task => task.id === id && task.userId === this.currentUser!.id) || null;
    }

    updateTask(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt' | 'userId'>>): Task | null {
        if (!this.currentUser) {
            throw new Error('User must be authenticated');
        }

        const taskIndex = this.tasks.findIndex(task => task.id === id && task.userId === this.currentUser!.id);
        if (taskIndex === -1) {
            return null;
        }

        this.tasks[taskIndex] = {
            ...this.tasks[taskIndex],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        this.saveToStorage();
        return this.tasks[taskIndex];
    }

    deleteTask(id: string): boolean {
        if (!this.currentUser) {
            throw new Error('User must be authenticated');
        }

        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => !(task.id === id && task.userId === this.currentUser!.id));

        if (this.tasks.length < initialLength) {
            this.saveToStorage();
            return true;
        }
        return false;
    }

    // Demo data generation
    generateDemoData() {
        if (!this.currentUser) {
            throw new Error('User must be authenticated');
        }

        const demoTasks: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>[] = [
            {
                title: 'Complete project documentation',
                description: 'Write comprehensive documentation for the new project including API specs and user guides',
                status: TaskStatus.IN_PROGRESS,
                priority: TaskPriority.HIGH,
                isCompleted: false,
                isUrgent: true
            },
            {
                title: 'Code review for authentication module',
                description: 'Review pull request #123 for the new authentication system',
                status: TaskStatus.REVIEW,
                priority: TaskPriority.MEDIUM,
                isCompleted: false,
                isUrgent: false
            },
            {
                title: 'Fix login page styling',
                description: 'Update CSS for better mobile responsiveness on login page',
                status: TaskStatus.TODO,
                priority: TaskPriority.LOW,
                isCompleted: false,
                isUrgent: false
            },
            {
                title: 'Setup CI/CD pipeline',
                description: 'Configure GitHub Actions for automated testing and deployment',
                status: TaskStatus.DONE,
                priority: TaskPriority.HIGH,
                isCompleted: true,
                isUrgent: false
            },
            {
                title: 'Database migration',
                description: 'Run migration scripts for the new user table schema',
                status: TaskStatus.TODO,
                priority: TaskPriority.CRITICAL,
                isCompleted: false,
                isUrgent: true
            }
        ];

        demoTasks.forEach(taskData => {
            this.createTask(taskData);
        });
    }
}

// Export singleton instance
export const dataStore = new DataStore();
