# Campus Assessment - Task Management System

## Schema Design

### Task Object Schema
```typescript
interface Task {
  id: string;           // Unique identifier (UUID)
  title: string;        // Task title (required, min 3 chars)
  description: string;  // Task description (required, min 10 chars)
  status: TaskStatus;   // Enum: todo, in_progress, review, done
  priority: TaskPriority; // Enum: low, medium, high, critical
  isCompleted: boolean; // Completion status
  isUrgent: boolean;    // Urgency flag
  createdAt: string;    // ISO timestamp
  updatedAt: string;    // ISO timestamp
  userId: string;       // Owner reference
}
```

### Supporting Enums
```typescript
enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress', 
  REVIEW = 'review',
  DONE = 'done'
}

enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high', 
  CRITICAL = 'critical'
}
```

### User Schema
```typescript
interface User {
  id: string;
  username: string;
  password: string; // In production, would be hashed
}
```

## Justification for Schema Design

1. **Task ID**: UUID ensures uniqueness across distributed systems
2. **Status Enum**: Covers typical task workflow states
3. **Priority Enum**: Clear hierarchy from low to critical
4. **Boolean Flags**: Simple true/false for completion and urgency
5. **Timestamps**: Track creation and modification for audit trail
6. **User Association**: Links tasks to authenticated users
