import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

export const todoSelector = (state: RootState) => state.todo.todos;

export const todosSelect = createSelector(todoSelector, (todos) => todos);
