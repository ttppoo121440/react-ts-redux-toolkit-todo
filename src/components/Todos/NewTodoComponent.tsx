import { newTodo } from '@/features/todos/todoSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

interface NewTodoComponentProps {
  onSetEditingIndex: (index: string | null) => void;
}

const NewTodoComponent = ({ onSetEditingIndex }: NewTodoComponentProps) => {
  const [text, setText] = useState<string>('');
  const dispatch = useDispatch();

  const addNewTodo = () => {
    if (!text) return;
    dispatch(
      newTodo({
        id: crypto.randomUUID(),
        text,
        completed: false,
      }),
    );
    setText('');
    if (onSetEditingIndex) onSetEditingIndex(null);
  };

  return (
    <div className="mb-4 flex">
      <input
        type="text"
        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="新增待辦事項..."
        value={text}
        onChange={(e) => setText(e.target.value.trim())}
      />
      <button
        type="button"
        className={`${
          !text ? 'cursor-not-allowed disabled:opacity-75' : ''
        } ml-2 flex-shrink-0 rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700`}
        onClick={() => addNewTodo()}
        disabled={!text}
      >
        新增
      </button>
    </div>
  );
};

export default NewTodoComponent;
