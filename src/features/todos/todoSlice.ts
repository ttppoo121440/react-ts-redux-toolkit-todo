import { createSlice } from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const initialState: Todo[] = [
  {
    id: '1',
    text: '學習 React',
    completed: true,
  },
  {
    id: '2',
    text: '學習 Redux',
    completed: false,
  },
  {
    id: '3',
    text: '學習 TypeScript',
    completed: false,
  },
];

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    newTodo: (state, action) => {
      return [...state, { ...action.payload }];
    },
    removeTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload;
      return state.map((todo) =>
        todo.id === id ? { ...todo, text: text } : todo,
      );
    },
    completedTodo: (state, action) => {
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo,
      );
    },
  },
});

export const { newTodo, removeTodo, updateTodo, completedTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
