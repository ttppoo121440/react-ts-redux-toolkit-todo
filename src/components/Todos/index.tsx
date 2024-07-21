import {
  completedTodo,
  removeTodo,
  Todo,
  updateTodo,
} from '@/features/todos/todoSlice';
import { RootState } from '@/store';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoList from './TodoList';
import NewTodoComponent from './NewTodoComponent';

const Todos = () => {
  const [editingIndex, setEditingIndex] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>('');
  const todos = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();

  const deleteTodo = useCallback(
    (id: string): void => {
      dispatch(removeTodo(id));
    },
    [dispatch],
  );

  const editTodo = useCallback(
    (id: string): void => {
      setEditingText(todos.find((todo) => todo.id === id)!.text);
      setEditingIndex(id);
    },
    [todos],
  );

  const saveTodo = useCallback(
    (todo: Todo): void => {
      if (editingText.trim()) {
        dispatch(updateTodo({ id: todo.id, text: editingText.trim() }));
        setEditingIndex(null);
      }
    },
    [dispatch, editingText],
  );

  const toggleTodo = useCallback(
    (id: string): void => {
      dispatch(completedTodo(id));
    },
    [dispatch],
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">待辦事項</h1>
        <NewTodoComponent onSetEditingIndex={setEditingIndex} />
        <TodoList
          editingIndex={editingIndex}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          saveTodo={saveTodo}
          toggleTodo={toggleTodo}
          todos={todos}
          editingText={editingText}
          setEditingIndex={setEditingIndex}
          setEditingText={setEditingText}
        />
      </div>
    </div>
  );
};

export default Todos;
