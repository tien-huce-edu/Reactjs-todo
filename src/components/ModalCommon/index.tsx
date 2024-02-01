import { Todo } from 'src/types/type';

interface ModalCommonProps {
  modalType: string | null;
  closeModal: () => void | null;
  modalData: Todo | null;
  input: any;
  setInput: (input: any) => void;
  submitModal: () => void;
  modalLoading: boolean;
}

const ModalCommon = ({
  modalLoading,
  modalType,
  closeModal,
  modalData,
  input,
  setInput,
  submitModal,
}: ModalCommonProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div className='z-50 fixed bg-black/50 w-full h-full flex flex-col items-center'>
      <div className='w-1/3 h-1/2 mt-60'>
        <div className='w-full bg-gray-800 rounded-md'>
          <div className='flex justify-between p-5 items-center divide-y-2'>
            <h1 className='text-xl'>{modalType} Task</h1>
            <div
              onClick={closeModal}
              className='text-white cursor-pointer hover:text-red-800 transition rounded-md px-3 py-1'
            >
              <svg
                className='w-6 h-6 text-white'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18 18 6m0 12L6 6'
                />
              </svg>
            </div>
          </div>
          {modalType === 'Delete' ? (
            <div className='flex flex-col items-center justify-center h-full'>
              <div className='mb-10 text-2xl'>
                <p>Do you want delete this task?</p>
              </div>
              <div className='mb-5'>
                <button
                  className='disabled:cursor-pointer text-white bg-red-500 hover:bg-red-600 transition rounded-md px-3 py-1 mx-3'
                  onClick={submitModal}
                  disabled={modalLoading}
                >
                  Confirm
                </button>
                <button
                  className='disabled:cursor-pointer text-white bg-blue-500 hover:bg-blue-600 transition rounded-md px-3 py-1 mx-3'
                  onClick={closeModal}
                  disabled={modalLoading}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center h-full'>
              <input
                type='text'
                name='title'
                onChange={handleChange}
                placeholder={modalData ? modalData.title : 'Title'}
                className='w-3/4 h-10 border-2 border-gray-300 rounded-md p-3 mb-5'
              />
              <input
                type='text'
                name='dueDate'
                onChange={handleChange}
                placeholder={modalData ? modalData.dueDate : 'Due Date'}
                className='w-3/4 h-10 border-2 border-gray-300 rounded-md p-3 mb-5'
              />
              <textarea
                name='note'
                onChange={handleChange}
                placeholder={modalData ? modalData.note : 'Note'}
                className='w-3/4 h-20 border-2 border-gray-300 rounded-md p-3 mb-5'
              ></textarea>
              <div className='mb-5'>
                <button
                  className='disabled:cursor-pointer text-white bg-green-500 hover:bg-green-600 transition rounded-md px-3 py-1 mx-3'
                  onClick={submitModal}
                  disabled={modalLoading}
                >
                  Confirm
                </button>
                <button
                  className='disabled:cursor-pointer text-white bg-blue-500 hover:bg-blue-600 transition rounded-md px-3 py-1 mx-3'
                  onClick={closeModal}
                  disabled={modalLoading}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalCommon;
