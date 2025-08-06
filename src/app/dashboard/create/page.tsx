'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navigation from '@/components/Navigation';
import TaskForm from '@/components/TaskForm';
import { TaskFormData } from '@/types';
import { dataStore } from '@/lib/dataStore';

export default function CreateTask() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleCreateTask = async (taskData: TaskFormData) => {
        setIsLoading(true);
        try {
            await dataStore.createTask(taskData);
            router.push('/dashboard');
        } catch (error) {
            console.error('Error creating task:', error);
            alert('Failed to create task. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        router.push('/dashboard');
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50">
                <Navigation />

                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        {/* Page Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900">Create New Task</h1>
                            <p className="mt-2 text-sm text-gray-600">
                                Fill out the form below to create a new task.
                            </p>
                        </div>

                        {/* Task Form */}
                        <TaskForm
                            onSubmit={handleCreateTask}
                            onCancel={handleCancel}
                            isLoading={isLoading}
                        />
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
