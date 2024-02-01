import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchAllTodo, instance } from 'src/API/https';
import ModalCommon from 'src/components/ModalCommon';
import TodoTable from 'src/components/TodoTable';
import useModal from 'src/hooks/useModal';
import { todosSelect } from 'src/redux/selector';
import { addTodo, deleteTodo, setAllTodo, updateTodo } from 'src/redux/slices/tasksSlice';

function App() {
  const { isModalOpen, modalType, openModal, closeModal, modalData } = useModal();
  const [input, setInput] = useState({
    title: '',
    dueDate: '',
    note: '',
  });

  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const dispatch = useDispatch();
  const todosList = useSelector(todosSelect);

  const submitModal = async () => {
    setModalLoading(true);
    if (modalType === 'Add') {
      const inputPush = JSON.parse(JSON.stringify(input));
      inputPush.id = Math.floor(Math.random() * 10000000);
      inputPush.status = false;
      const response = await instance.post('tasks', inputPush);
      dispatch(addTodo(response.data));
      toast.success('Task added successfully');
      closeModal();
    }

    if (modalType === 'Edit' && modalData) {
      const inputPush = {
        ...modalData,
        title: input.title ? input.title : modalData.title,
        dueDate: input.dueDate ? input.dueDate : modalData.dueDate,
        note: input.note ? input.note : modalData.note,
      };
      const response = await instance.put(`tasks/${modalData.id}`, inputPush);
      dispatch(updateTodo(response.data));
      toast.success('Task updated successfully');
      closeModal();
    }

    if (modalType === 'Delete' && modalData) {
      await instance.delete(`tasks/${modalData.id}`);
      dispatch(deleteTodo(modalData.id));
      toast.success('Task deleted successfully');
      closeModal();
    }
    setModalLoading(false);
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetchAllTodo();
      dispatch(setAllTodo(response));
    } catch (error) {
      toast.error('Error fetching tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <div className='w-full h-full flex flex-col items-center'>
      <h1 className='pt-20'>Todo List</h1>

      {isModalOpen && (
        <ModalCommon
          modalLoading={modalLoading}
          submitModal={submitModal}
          input={input}
          setInput={setInput}
          modalType={modalType}
          closeModal={closeModal}
          modalData={modalData}
        />
      )}

      <div className='w-3/4 h-full bg-white mt-5 rounded-md p-5 animation'>
        <div className='flex justify-between'>
          <button
            onClick={() => openModal('Add')}
            disabled={loading}
            className='disabled:cursor-not-allowed w-3/12 border-none text-white disabled:bg-gray-500 hover:bg-gray-500 hover:text-black transition rounded-md'
          >
            Add
          </button>
        </div>
        <div className='h-[500px] bg-gray-200 mt-5 rounded-md overflow-y-scroll'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead className='sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-t-md '>
              <tr className='text-center'>
                <th scope='col' className='px-6 py-3 w-1/12 rounded-tl-md'>
                  status
                </th>
                <th scope='col' className='px-6 py-3 w-3/12'>
                  To do name
                </th>
                <th scope='col' className='px-6 py-3 w-2/12'>
                  Due Date
                </th>
                <th scope='col' className='px-6 py-3'>
                  Note
                </th>
                <th scope='col' className='px-6 py-3 rounded-tr-md w-2/12'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className=''>
              {loading ? (
                <tr>
                  <td colSpan={5} className='text-center'>
                    Loading...
                  </td>
                </tr>
              ) : (
                <TodoTable todosList={todosList} openModal={openModal} />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
