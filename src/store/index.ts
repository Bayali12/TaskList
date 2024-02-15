import { configureStore } from '@reduxjs/toolkit';

import { tasksReducer } from './slices/taskSlice';

const store = configureStore({
  reducer: {
    tasksReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
