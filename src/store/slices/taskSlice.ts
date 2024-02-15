import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { Task, TaskStatus } from '../../shared/types';

type TasksState = {
  tasks: Array<Task>;
  searchTerm: string;
  statusFilter: TaskStatus | 'all';
  fromDate: string | null;
  toDate: string | null;
};

const initialState: TasksState = {
  tasks: JSON.parse(localStorage.getItem('tasks')!) || [],
  searchTerm: '',
  statusFilter: 'all',
  fromDate: null,
  toDate: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },

    changeStatusFilter: (state, action: PayloadAction<TaskStatus | 'all'>) => {
      state.statusFilter = action.payload;
    },

    setFromDate: (state, action: PayloadAction<string | null>) => {
      state.fromDate = action.payload;
    },
    setToDate: (state, action: PayloadAction<string | null>) => {
      state.toDate = action.payload;
    },

    resetFilter: (state) => {
      state.searchTerm = '';
      state.statusFilter = 'all';
      state.fromDate = null;
      state.toDate = null;
    },

    addTask: {
      reducer: (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      },
      prepare: (task: Omit<Task, 'id' | 'createdAt' | 'status'>) => {
        return {
          payload: {
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            status: 'readyToGo' as TaskStatus,
            ...task,
          },
        };
      },
    },

    editTask: (
      state,
      action: PayloadAction<{ taskId: string; updatedTask: Partial<Task> }>,
    ) => {
      const { taskId, updatedTask } = action.payload;
      const existingTask = state.tasks.find((task) => task.id === taskId);

      if (existingTask) {
        Object.assign(existingTask, updatedTask);
      }

      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    changeStatus: (
      state,
      action: PayloadAction<{ id: string; status: TaskStatus }>,
    ) => {
      const { id, status } = action.payload;
      const taskToUpdate = state.tasks.find((task) => task.id === id);
      if (taskToUpdate) {
        taskToUpdate.status = status;
      }
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      const idToDelete = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== idToDelete);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
  },
});

export const tasksReducer = tasksSlice.reducer;
export const {
  changeStatus,
  deleteTask,
  addTask,
  editTask,
  setSearchTerm,
  changeStatusFilter,
  setFromDate,
  setToDate,
  resetFilter,
} = tasksSlice.actions;
