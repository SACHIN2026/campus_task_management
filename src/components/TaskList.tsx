'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Task, TaskFilter, TaskStatus, TaskPriority, PaginationInfo } from '@/types';
import { dataStore } from '@/lib/dataStore';

interface TaskListProps {
    onEditTask: (task: Task) => void;
    onDeleteTask: (taskId: string) => void;
    refreshTrigger?: number;
}

export default function TaskList({ onEditTask, onDeleteTask, refreshTrigger = 0 }: TaskListProps) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [pagination, setPagination] = useState<PaginationInfo>({
        page: 1,
        limit: 5,
        total: 0,
        totalPages: 0
    });
    const [filter, setFilter] = useState<TaskFilter>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const loadTasks = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = dataStore.getTasks(filter, pagination.page, pagination.limit);
            setTasks(result.tasks);
            setPagination(result.pagination);
        } catch (error) {
            console.error('Error loading tasks:', error);
        } finally {
            setIsLoading(false);
        }
    }, [filter, pagination.page, pagination.limit]);

    useEffect(() => {
        loadTasks();
    }, [filter, pagination.page, pagination.limit, refreshTrigger, loadTasks]);

    const handleFilterChange = (newFilter: Partial<TaskFilter>) => {
        setFilter(prev => ({ ...prev, ...newFilter }));
        setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
    };

    const handleSearch = () => {
        handleFilterChange({ search: searchTerm.trim() || undefined });
    };

    const handleSearchKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const clearFilters = () => {
        setFilter({});
        setSearchTerm('');
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    const handlePageChange = (newPage: number) => {
        setPagination(prev => ({ ...prev, page: newPage }));
    };

    const getPriorityColor = (priority: TaskPriority) => {
        switch (priority) {
            case TaskPriority.LOW:
                return 'bg-green-100 text-green-800';
            case TaskPriority.MEDIUM:
                return 'bg-yellow-100 text-yellow-800';
            case TaskPriority.HIGH:
                return 'bg-orange-100 text-orange-800';
            case TaskPriority.CRITICAL:
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusColor = (status: TaskStatus) => {
        switch (status) {
            case TaskStatus.TODO:
                return 'bg-gray-100 text-gray-800';
            case TaskStatus.IN_PROGRESS:
                return 'bg-blue-100 text-blue-800';
            case TaskStatus.REVIEW:
                return 'bg-purple-100 text-purple-800';
            case TaskStatus.DONE:
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatStatus = (status: TaskStatus) => {
        switch (status) {
            case TaskStatus.TODO:
                return 'To Do';
            case TaskStatus.IN_PROGRESS:
                return 'In Progress';
            case TaskStatus.REVIEW:
                return 'Review';
            case TaskStatus.DONE:
                return 'Done';
            default:
                return status;
        }
    };

    const formatPriority = (priority: TaskPriority) => {
        return priority.charAt(0).toUpperCase() + priority.slice(1);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <span className="ml-2 text-gray-600">Loading tasks...</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Filters Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Filters & Search</h3>

                {/* Search */}
                <div className="mb-6">
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-100">
                        <label htmlFor="search" className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                            <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Search Tasks
                        </label>
                        <div className="flex max-w-2xl">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    id="search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyPress={handleSearchKeyPress}
                                    placeholder="Search by title or description..."
                                    className="w-full px-4 py-3 pl-10 border-2 border-gray-300 rounded-l-lg focus:outline-none focus:ring-3 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500 text-base shadow-sm"
                                />
                                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <button
                                onClick={handleSearch}
                                className="px-6 py-3 bg-indigo-600 text-white border-2 border-indigo-600 rounded-r-lg hover:bg-indigo-700 hover:border-indigo-700 focus:outline-none focus:ring-3 focus:ring-indigo-500 transition-colors duration-200 font-medium text-base shadow-sm"
                            >
                                🔍 Search
                            </button>
                        </div>
                        {searchTerm && (
                            <div className="mt-2 flex items-center text-sm text-gray-600">
                                <span>Searching for: </span>
                                <span className="ml-1 px-2 py-1 bg-white rounded border text-gray-800 font-medium">&quot;{searchTerm}&quot;</span>
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        handleFilterChange({ search: undefined });
                                    }}
                                    className="ml-2 text-indigo-600 hover:text-indigo-800 underline"
                                >
                                    Clear search
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Filter Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Status Filter */}
                    <div>
                        <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            id="statusFilter"
                            value={filter.status || ''}
                            onChange={(e) => handleFilterChange({ status: e.target.value as TaskStatus || undefined })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900 appearance-none cursor-pointer"
                            style={{
                                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 0.7rem center',
                                backgroundSize: '1.5em 1.5em',
                                paddingRight: '2.5rem'
                            }}
                        >
                            <option value="" className="bg-white text-gray-900 py-2">All Statuses</option>
                            <option value={TaskStatus.TODO} className="bg-white text-gray-900 py-2">📝 To Do</option>
                            <option value={TaskStatus.IN_PROGRESS} className="bg-white text-gray-900 py-2">⚡ In Progress</option>
                            <option value={TaskStatus.REVIEW} className="bg-white text-gray-900 py-2">👀 Review</option>
                            <option value={TaskStatus.DONE} className="bg-white text-gray-900 py-2">✅ Done</option>
                        </select>
                    </div>

                    {/* Priority Filter */}
                    <div>
                        <label htmlFor="priorityFilter" className="block text-sm font-medium text-gray-700 mb-1">
                            Priority
                        </label>
                        <select
                            id="priorityFilter"
                            value={filter.priority || ''}
                            onChange={(e) => handleFilterChange({ priority: e.target.value as TaskPriority || undefined })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900 appearance-none cursor-pointer"
                            style={{
                                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 0.7rem center',
                                backgroundSize: '1.5em 1.5em',
                                paddingRight: '2.5rem'
                            }}
                        >
                            <option value="" className="bg-white text-gray-900 py-2">All Priorities</option>
                            <option value={TaskPriority.LOW} className="bg-white text-gray-900 py-2">🟢 Low</option>
                            <option value={TaskPriority.MEDIUM} className="bg-white text-gray-900 py-2">🟡 Medium</option>
                            <option value={TaskPriority.HIGH} className="bg-white text-gray-900 py-2">🟠 High</option>
                            <option value={TaskPriority.CRITICAL} className="bg-white text-gray-900 py-2">🔴 Critical</option>
                        </select>
                    </div>

                    {/* Completion Filter */}
                    <div>
                        <label htmlFor="completionFilter" className="block text-sm font-medium text-gray-700 mb-1">
                            Completion
                        </label>
                        <select
                            id="completionFilter"
                            value={filter.isCompleted === undefined ? '' : filter.isCompleted.toString()}
                            onChange={(e) => {
                                const value = e.target.value;
                                handleFilterChange({
                                    isCompleted: value === '' ? undefined : value === 'true'
                                });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900 appearance-none cursor-pointer"
                            style={{
                                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 0.7rem center',
                                backgroundSize: '1.5em 1.5em',
                                paddingRight: '2.5rem'
                            }}
                        >
                            <option value="" className="bg-white text-gray-900 py-2">All Tasks</option>
                            <option value="true" className="bg-white text-gray-900 py-2">✅ Completed</option>
                            <option value="false" className="bg-white text-gray-900 py-2">⏳ Not Completed</option>
                        </select>
                    </div>

                    {/* Urgency Filter */}
                    <div>
                        <label htmlFor="urgencyFilter" className="block text-sm font-medium text-gray-700 mb-1">
                            Urgency
                        </label>
                        <select
                            id="urgencyFilter"
                            value={filter.isUrgent === undefined ? '' : filter.isUrgent.toString()}
                            onChange={(e) => {
                                const value = e.target.value;
                                handleFilterChange({
                                    isUrgent: value === '' ? undefined : value === 'true'
                                });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900 appearance-none cursor-pointer"
                            style={{
                                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 0.7rem center',
                                backgroundSize: '1.5em 1.5em',
                                paddingRight: '2.5rem'
                            }}
                        >
                            <option value="" className="bg-white text-gray-900 py-2">All Tasks</option>
                            <option value="true" className="bg-white text-gray-900 py-2">🚨 Urgent</option>
                            <option value="false" className="bg-white text-gray-900 py-2">⏰ Not Urgent</option>
                        </select>
                    </div>
                </div>

                {/* Clear Filters */}
                <div className="mt-4">
                    <button
                        onClick={clearFilters}
                        className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Clear All Filters
                    </button>
                </div>
            </div>

            {/* Results Info */}
            <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                    Showing {tasks.length} of {pagination.total} tasks
                </p>
                <div className="flex items-center space-x-2">
                    <label htmlFor="pageSize" className="text-sm text-gray-600">
                        Items per page:
                    </label>
                    <select
                        id="pageSize"
                        value={pagination.limit}
                        onChange={(e) => setPagination(prev => ({ ...prev, limit: Number(e.target.value), page: 1 }))}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-900 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        style={{
                            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0.5rem center',
                            backgroundSize: '1em 1em',
                            paddingRight: '2rem'
                        }}
                    >
                        <option value={5} className="bg-white text-gray-900">5 items</option>
                        <option value={10} className="bg-white text-gray-900">10 items</option>
                        <option value={20} className="bg-white text-gray-900">20 items</option>
                    </select>
                </div>
            </div>

            {/* Task Cards */}
            <div className="space-y-4">
                {tasks.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No tasks found. Try adjusting your filters or create a new task.</p>
                    </div>
                ) : (
                    tasks.map((task) => (
                        <div key={task.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                                        {task.isUrgent && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                URGENT
                                            </span>
                                        )}
                                        {task.isCompleted && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                ✓ COMPLETED
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-600 mb-4">{task.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                                            {formatStatus(task.status)}
                                        </span>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                            {formatPriority(task.priority)} Priority
                                        </span>
                                    </div>
                                </div>
                                <div className="flex space-x-2 ml-4">
                                    <button
                                        onClick={() => onEditTask(task)}
                                        className="px-3 py-1 text-sm text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDeleteTask(task.id)}
                                        className="px-3 py-1 text-sm text-red-600 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div className="text-xs text-gray-500">
                                Created: {new Date(task.createdAt).toLocaleDateString()}
                                {task.updatedAt !== task.createdAt && (
                                    <span> • Updated: {new Date(task.updatedAt).toLocaleDateString()}</span>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2">
                    <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        className="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>

                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-2 text-sm rounded-md ${page === pagination.page
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.totalPages}
                        className="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
