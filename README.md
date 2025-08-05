# Campus Assessment - Task Management System

A modern web application built with Next.js, TypeScript, and Tailwind CSS that demonstrates full-stack development capabilities through a comprehensive task management system.

## 🚀 Live Demo

**Deployed Application**: [Link will be provided after Vercel deployment]

**Demo Credentials**:
- Username: `demo`
- Password: `password123`

## ✨ Features Implemented

### Core Requirements ✅
- **Login Page**: Simple username/password authentication
- **CRUD Operations**: Complete Create, Read, Update, Delete for tasks
- **Form Field Types**: Text input, textarea, dropdowns (enums), boolean checkboxes
- **View Page**: Task list with filtering, pagination, and search

### Additional Features 🎯
- **Authentication Context**: Secure user session management
- **Data Persistence**: localStorage for client-side data storage
- **Responsive Design**: Mobile-friendly interface
- **Loading States**: Enhanced user experience during operations
- **Form Validation**: Client-side validation with error messages
- **Demo Data Generator**: Quick setup with sample tasks
- **Search Functionality**: Text search across task titles and descriptions
- **Multiple Filters**: Filter by status, priority, completion, and urgency
- **Configurable Pagination**: 5, 10, or 20 items per page

## 🛠 Technology Stack

- **Frontend**: Next.js 15 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for responsive design
- **State Management**: React Context + hooks
- **Data Storage**: localStorage (client-side persistence)
- **Icons & UI**: Custom components with Tailwind
- **Development**: ESLint, Prettier, Hot reload

## 📋 Task Schema

```typescript
interface Task {
  id: string;           // UUID
  title: string;        // Required, min 3 chars
  description: string;  // Required, min 10 chars
  status: TaskStatus;   // todo | in_progress | review | done
  priority: TaskPriority; // low | medium | high | critical
  isCompleted: boolean; // Completion flag
  isUrgent: boolean;    // Urgency flag
  createdAt: string;    // ISO timestamp
  updatedAt: string;    // ISO timestamp
  userId: string;       // User association
}
```

## 🏃‍♂️ Quick Start

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd campus-assessment
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Application**
   - Navigate to http://localhost:3000
   - Use demo credentials: `demo` / `password123`
   - Click "Generate Demo Data" for sample tasks

## 📖 User Guide

### Getting Started
1. **Login**: Use the demo account or the quick-fill button
2. **Create Tasks**: Click "Create New Task" or use the dedicated create page
3. **Manage Tasks**: Edit, delete, or update task status directly from the list
4. **Filter & Search**: Use the comprehensive filtering options to find specific tasks
5. **Navigate**: Use pagination controls to browse through tasks

### Form Fields Explained
- **Title**: Task name (required, minimum 3 characters)
- **Description**: Detailed task description (required, minimum 10 characters)
- **Status**: Current task state (Todo → In Progress → Review → Done)
- **Priority**: Task importance level (Low → Medium → High → Critical)
- **Completed**: Mark task as finished
- **Urgent**: Flag for urgent attention

### Filtering Options
- **Status Filter**: Show tasks by their current status
- **Priority Filter**: Display tasks by importance level
- **Completion Filter**: View completed or pending tasks
- **Urgency Filter**: Focus on urgent or regular tasks
- **Text Search**: Find tasks by title or description content

## 🧪 Testing

The application includes comprehensive test scenarios:

- **Positive Tests**: All happy path user flows
- **Negative Tests**: Error handling and validation
- **Edge Cases**: Boundary conditions and unusual inputs
- **Browser Compatibility**: Chrome, Firefox, Safari, Edge
- **Responsive Design**: Mobile, tablet, desktop viewports

See `TEST_PLAN.md` for detailed test cases.

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── dashboard/         # Protected dashboard pages
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home/login page
├── components/            # Reusable UI components
│   ├── LoginForm.tsx      # Authentication form
│   ├── TaskForm.tsx       # Create/edit task form
│   ├── TaskList.tsx       # Task display with filters
│   ├── Navigation.tsx     # App navigation
│   └── ProtectedRoute.tsx # Route protection
├── contexts/              # React contexts
│   └── AuthContext.tsx    # Authentication state
├── lib/                   # Utility libraries
│   └── dataStore.ts       # Data access layer
└── types/                 # TypeScript definitions
    └── index.ts           # Application types
```

## 📚 Documentation

- **[Schema Design](SCHEMA_DESIGN.md)**: Database schema and design decisions
- **[Module Structure](MODULE_STRUCTURE.md)**: Application architecture
- **[AI Prompts](AI_PROMPTS.md)**: Development process and AI assistance
- **[Test Plan](TEST_PLAN.md)**: Comprehensive testing strategy
- **[Reflection](REFLECTION.md)**: Improvements for future development
- **[Deployment Guide](DEPLOYMENT.md)**: How to deploy the application

## 🎯 Assignment Compliance

### Required Features ✅
- [x] **Login Page**: Username/password authentication
- [x] **CRUD Functionality**: Full task management
- [x] **Form Fields**: Text, dropdown, boolean inputs
- [x] **View Page**: List with filtering and pagination

### Field Types Implemented ✅
- [x] **Text Input**: Task title
- [x] **Textarea**: Task description  
- [x] **Dropdown (Enum)**: Status selection
- [x] **Dropdown (Enum)**: Priority selection
- [x] **Boolean Checkbox**: Completion status
- [x] **Boolean Checkbox**: Urgency flag

### View Page Requirements ✅
- [x] **Record Listing**: All tasks displayed in cards
- [x] **Basic Filtering**: Status, priority, completion, urgency
- [x] **Pagination**: 5/10/20 items per page with navigation
- [x] **Additional Features**: Search functionality

## 🚀 Deployment

Ready for deployment to Vercel with zero configuration:

```bash
# Deploy to Vercel
npm i -g vercel
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## 🔧 Development

### Build for Production
```bash
npm run build
npm start
```

### Linting and Type Checking
```bash
npm run lint
npx tsc --noEmit
```

### Code Quality
- TypeScript for type safety
- ESLint for code quality
- Consistent code formatting
- Component-based architecture

## 👨‍💻 Author

Built for Campus Assessment demonstrating:
- Modern React/Next.js development
- TypeScript proficiency
- UI/UX design skills
- Full-stack thinking
- Production-ready code practices

---

*This project was built as part of a campus assessment to demonstrate programming ability, logical thinking, and solution-building skills using modern web development tools.*
