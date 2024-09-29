import React, { FormEvent, useState,  } from 'react';
import { useLoginApi } from '../../data/hooks/auth';
import { message } from 'antd';
import { Link } from 'react-router-dom';

type LoginState = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [loginState, setLoginState] = useState<LoginState>({
    email: '',
    password: '',
  });
  const [isDemom, setIsDemo] = useState<boolean>(false);

  const { mutateAsync, isLoading } = useLoginApi();




  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginState.password.length < 6) {
      return message.error('Password should be atleast 6 characters');
    }
    try {
      const response = await mutateAsync(loginState);

      if (response) {
        await message.success('Login successful!Navigating...');
      }
    } catch (error: any) {
      console.log(error.message);
      
      // setShowMessage(true);
      await message.error(error.message || "Unknown error");
    }
  };

  const handleLoginAsAdmin = async()=>{
    setLoginState({
      email: 'demo@admin.com',
      password: 'secret'
    });
    try {
            const response = await mutateAsync({
              email: 'demo@admin.com',
              password: 'secret',
            });
                  if (response) {
                    await message.success('Login successful!Navigating...');
                  }

    } catch (error: any) {
await message.error(error.message || 'Unknown error');

    }
  }
  const handleLoginAsSales = async()=>{
    setLoginState({
      email: 'demo@user.com',
      password: 'secret',
    });
    try {
            const response = await mutateAsync({
              email: 'demo@user.com',
              password: 'secret',
            });
                  if (response) {
                    await message.success('Login successful!Navigating...');
                  }

    } catch (error: any) {
await message.error(error.message || 'Unknown error');

    }
  }

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Pattern"
            src="invoice-pattern.png"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <a className="block text-blue-600" href="/">
              <span className="sr-only">Home</span>
              <svg
                className="h-8 sm:h-10"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 2C2 1.44772 2.44772 1 3 1H25C25.5523 1 26 1.44772 26 2V22C26 22.5523 25.5523 23 25 23H3C2.44772 23 2 22.5523 2 22V2Z"
                  fill="currentColor"
                />
                <path d="M3 2H25V22H3V2Z" fill="white" />
                <path
                  d="M5 4H23V5H5V4ZM5 8H23V9H5V8ZM5 12H23V13H5V12ZM5 16H23V17H5V16Z"
                  fill="currentColor"
                />
                <path
                  d="M6 7H8V9H6V7ZM10 7H12V9H10V7ZM14 7H16V9H14V7ZM18 7H20V9H18V7Z"
                  fill="currentColor"
                />
              </svg>
            </a>

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to Trackify
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Login to your account
            </p>

            <form
              className="mt-8 grid grid-cols-6 gap-6"
              onSubmit={handleSubmit}
            >
              <div className="col-span-6 ">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  email
                </label>

                <input
                  value={loginState.email}
                  placeholder="email"
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  required
                  onChange={(e) =>
                    setLoginState({ ...loginState, email: e.target.value })
                  }
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <input
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  onChange={(e) =>
                    setLoginState({ ...loginState, password: e.target.value })
                  }
                  value={loginState.password}
                  placeholder="password"
                  required
                />
              </div>
              <div className="col-span-6">
                <Link to={'/forget-password'} className="text-blue-500">
                  Forget Password?
                </Link>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                {!isDemom && (
                  <button
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 disabled:bg-[#c6c6c6] disabled:border-[#c6c6c6]"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? 'loading ' : 'Login'}
                  </button>
                )}
                {isDemom && (
                  <button
                    className="block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 disabled:bg-[#c6c6c6] disabled:border-[#c6c6c6] my-6"
                    onClick={handleLoginAsAdmin}
                    disabled={isLoading}
                  >
                    {isLoading ? 'loading' : 'Login as Admin'}
                  </button>
                )}
                {isDemom && (
                  <button
                    className="block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 disabled:bg-[#c6c6c6] disabled:border-[#c6c6c6]"
                    disabled={isLoading}
                    onClick={handleLoginAsSales}
                  >
                    {isLoading ? 'loading' : 'Login as Sales'}
                  </button>
                )}

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Don't have an account?
                  <Link to={'/register'} className="text-gray-700 underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
            <button
              className=" mt-8 block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 disabled:bg-[#c6c6c6] disabled:border-[#c6c6c6]"
              disabled={isLoading}
              onClick={() => setIsDemo(!isDemom)}
            >
              {isDemom ? 'login as a registered user' : 'login as a demo user'}
            </button>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Login;