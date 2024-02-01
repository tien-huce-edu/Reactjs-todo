import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Todo } from 'src/types/type';

const initialTodo: { status: string; todos: Todo[] } = {
  status: 'idle',
  todos: [],
};

export const taskSlice = createSlice({
  name: 'todo',
  initialState: initialTodo,
  reducers: {
    setAllTodo: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
      state.todos[index] = action.payload;
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    changeStatus: (state, action: PayloadAction<number>) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload);
      state.todos[index].status = !state.todos[index].status;
    },
  },
});

export const { setAllTodo, addTodo, updateTodo, deleteTodo, changeStatus } = taskSlice.actions;
export default taskSlice.reducer;
