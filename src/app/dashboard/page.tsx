'use client';

import React, { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navigation from '@/components/Navigation';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import { Task, TaskFormData } from '@/types';
import { dataStore } from '@/lib/dataStore';

export default function Dashboard() {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const refreshTasks = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleCreateTask = async (taskData: TaskFormData) => {
    setIsLoading(true);
    try {
      await dataStore.createTask(taskData);
      setShowCreateForm(false);
      refreshTasks();
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = async (taskData: TaskFormData) => {
    if (!editingTask) return;
    
    setIsLoading(true);
    try {
      await dataStore.updateTask(editingTask.id, taskData);
      setEditingTask(null);
      refreshTasks();
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      const success = dataStore.deleteTask(taskId);
      if (success) {
        refreshTasks();
      } else {
        alert('Failed to delete task. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setShowCreateForm(false);
  };

  const handleGenerateDemoData = () => {
    try {
      dataStore.generateDemoData();
      refreshTasks();
      alert('Demo data generated successfully!');
    } catch (error) {
      console.error('Error generating demo data:', error);
      alert('Failed to generate demo data.');
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Task Dashboard</h1>
              <p className="mt-2 text-sm text-gray-600">
                Manage your tasks efficiently with filtering, pagination, and CRUD operations.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowCreateForm(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create New Task
              </button>
              <button
                onClick={handleGenerateDemoData}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Generate Demo Data
              </button>
            </div>

            {/* Task Form Modal/Section */}
            {(showCreateForm || editingTask) && (
              <div className="mb-8">
                <TaskForm
                  task={editingTask || undefined}
                  onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                  onCancel={handleCancelEdit}
                  isLoading={isLoading}
                />
              </div>
            )}

            {/* Task List */}
            <TaskList
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              refreshTrigger={refreshTrigger}
            />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
