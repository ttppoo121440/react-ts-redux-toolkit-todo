import { Todo } from '@/features/todos/todoSlice';

interface TodoListProps {
  todos: Todo[];
  editingIndex: string | null;
  editingText: string;
  setEditingText: (text: string) => void;
  saveTodo: (todo: Todo) => void;
  setEditingIndex: (index: string | null) => void;
  toggleTodo: (id: string) => void;
  editTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoList = ({
  todos,
  editingIndex,
  editingText,
  setEditingText,
  saveTodo,
  setEditingIndex,
  toggleTodo,
  editTodo,
  deleteTodo,
}: TodoListProps) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`mb-2 flex items-center justify-between rounded-lg p-2 shadow ${
            todo.completed ? 'bg-green-100' : 'bg-gray-100'
          } transition duration-300`}
        >
          {editingIndex === todo.id ? (
            <div className="flex w-full items-center">
              <input
                type="text"
                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
              <button
                className="ml-2 flex-shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                onClick={() => saveTodo(todo)}
              >
                儲存
              </button>
              <button
                className="ml-2 flex-shrink-0 rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
                onClick={() => setEditingIndex(null)}
              >
                取消
              </button>
            </div>
          ) : (
            <>
              <span
                className={`cursor-pointer ${
                  todo.completed
                    ? 'text-gray-500 line-through'
                    : 'text-gray-800'
                }`}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
              <div className="flex items-center">
                <button
                  className="ml-2 flex-shrink-0 rounded-lg bg-yellow-500 px-2 py-1 text-white hover:bg-yellow-600"
                  onClick={() => editTodo(todo.id)}
                >
                  修改
                </button>
                <button
                  className="ml-2 flex-shrink-0 rounded-lg bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                  onClick={() => deleteTodo(todo.id)}
                >
                  刪除
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
