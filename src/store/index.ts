// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Создаем store
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Экспортируем store как default
export default store;

// Экспортируем тип RootState, чтобы использовать его в других файлах
export type RootState = ReturnType<typeof store.getState>;

// Экспортируем тип для dispatch
export type AppDispatch = typeof store.dispatch;
