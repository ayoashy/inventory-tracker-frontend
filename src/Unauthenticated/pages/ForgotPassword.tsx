import { FormEvent, useState } from 'react';
import { useForgetPasswordApi } from '../../data/hooks/auth';
import { message } from 'antd';
// import { useAuth } from '../../context/authContext';

const ForgotPassword = () => {
  const [recoverState, setRecoverState] = useState({
    email: '',
  });
  const { mutateAsync, isLoading } = useForgetPasswordApi();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await mutateAsync(recoverState);
      if (response) {
        await message.success('Reset password link sent to your email');
      }
    } catch (error: any) {
            await message.error(error.message || 'Unknown error');

    }
  };

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
              Recover your password
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
                  value={recoverState.email}
                  placeholder="email"
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  required
                  onChange={(e) => setRecoverState({ email: e.target.value })}
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'loading ' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default ForgotPassword;
