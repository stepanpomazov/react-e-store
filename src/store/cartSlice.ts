import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {  // Экспортируем тип CartItem
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;  // Увеличиваем количество, если товар уже в корзине
      } else {
        state.items.push(item); // Добавляем товар, если его нет в корзине
      }
    },
    deleteItemToCart: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      state.items = state.items.map((item) => {
        if (item.id === id && item.quantity > 1) {
          item.quantity -= 1; // Уменьшаем количество, если оно больше 1
        }
        return item;
      }).filter(item => item.quantity > 0);  // Удаляем товары с нулевым количеством
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      // Удаление товара полностью из корзины
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      // Очистить корзину
      state.items = [];
    }
  },
});

export const { addItemToCart, deleteItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
