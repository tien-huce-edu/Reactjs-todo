import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackgroundLogin from 'src/pages/Login/BackgroundLogin';

const Login = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if userinfo is empty
    if (userInfo.email === '' || userInfo.password === '') {
      toast.error('Please fill in all fields');
      return;
    }
    // check userinfo
    if (userInfo.email !== 'tienhg201@gmail.com' || userInfo.password !== '1') {
      toast.error('Email or password incorrect');

      return;
    }
    // if remember is checked
    if (userInfo.remember) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
    navigate('/');
  };

  return (
    <>
      <BackgroundLogin />
      <section className='relative'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Sign in to your account
              </h1>
              <form
                className='space-y-4 md:space-y-6'
                action='/'
                onSubmit={handleSubmit}
                noValidate
              >
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Your email
                  </label>
                  <input
                    onChange={handleInputChange}
                    type='email'
                    name='email'
                    id='email'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='name@company.com'
                  />
                </div>
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Password
                  </label>
                  <input
                    onChange={handleInputChange}
                    type='password'
                    name='password'
                    id='password'
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-start'>
                    <div className='flex items-center h-5'>
                      <input
                        onChange={handleInputChange}
                        id='remember'
                        name='remember'
                        aria-describedby='remember'
                        type='checkbox'
                        className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                      />
                    </div>
                    <div className='ml-3 text-sm'>
                      <label className='text-gray-500 dark:text-gray-300'>Remember me</label>
                    </div>
                  </div>
                  <a
                    href='#'
                    className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type='submit'
                  className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                >
                  Sign in
                </button>
                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                  Don’t have an account yet?{' '}
                  <a
                    href='#'
                    className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
