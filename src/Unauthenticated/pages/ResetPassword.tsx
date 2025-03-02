import { FormEvent, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResetPasswordApi } from '../../data/hooks/auth';
import { message } from 'antd';

const ResetPassword = () => {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useResetPasswordApi();
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await mutateAsync({ resetToken, password });
      await message.success('Password successfully changed!');
      navigate('/login'); // Redirect to login page after successful password reset
    } catch (error: any) {
      await message.error(error.message || "Unknown error");
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
            </a>

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to Inventory
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Change your password
            </p>

            <form
              className="mt-8 grid grid-cols-6 gap-6"
              onSubmit={handleSubmit}
            >
              <div className="col-span-6 ">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  password
                </label>

                <input
                  // value={password.password}
                  value={password}
                  placeholder="password"
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'loading ' : 'Change password'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default ResetPassword;
