import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { instance } from 'src/API/https';
import { changeStatus } from 'src/redux/slices/tasksSlice';
import { ModalType, Todo } from 'src/types/type';

interface TodoTableProps {
  todosList: Todo[];
  openModal: (modalType: ModalType, data?: Todo) => any;
}

const TodoTable = ({ todosList, openModal }: TodoTableProps) => {
  const dispatch = useDispatch();
  const handleCheckboxChange = async (id) => {
    const putData = todosList.find((todo) => todo.id === id);
    dispatch(changeStatus(id));
    await instance.put(`tasks/${id}`, { putData, status: !putData?.status });
    toast.success('Task status updated successfully');
  };
  return (
    <>
      {todosList.map((todo) => (
        <tr className='bg-white ' key={todo.id}>
          <td className='px-6 py-4 whitespace-nowrap flex items-center justify-center'>
            <input
              type='checkbox'
              checked={todo.status}
              className='self-center'
              onClick={() => handleCheckboxChange(todo.id)}
            />
          </td>
          <td
            className={`px-6 py-4 whitespace-nowrap ${todo.status ? 'line-through' : 'no-underline'}`}
          >
            {todo.title}
          </td>
          <td
            className={`px-6 py-4 whitespace-nowrap ${todo.status ? 'line-through' : 'no-underline'}`}
          >
            {todo.dueDate}
          </td>
          <td
            className={`px-6 py-4 whitespace-nowrap ${todo.status ? 'line-through' : 'no-underline'}`}
          >
            {todo.note}
          </td>
          <td className='px-6 py-4 whitespace-nowrap flex justify-center'>
            <button
              className='text-white bg-blue-500 hover:bg-blue-600 transition rounded-md px-3 py-1'
              onClick={() => openModal('Edit', todo)}
            >
              Edit
            </button>
            <button
              className=' ml-1  text-white bg-red-500 hover:bg-red-600 transition rounded-md px-3 py-1'
              onClick={() => openModal('Delete', todo)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TodoTable;
