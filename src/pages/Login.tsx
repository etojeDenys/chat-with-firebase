import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginUser, registerUser } from '../services/auth';
import { Link, useNavigate } from 'react-router-dom';
import { UserLoginForm, validationLoginSchema } from '../types/UserForm';

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserLoginForm>({
    resolver: zodResolver(validationLoginSchema)
  });
  const navigate = useNavigate();

  const onSubmit = async (user: UserLoginForm) => {
    try {
      await loginUser(user.email, user.password);

      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-amber-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 rounded-lg border-2 border-darkBlue px-5 py-10">
        <label className="flex gap-2">
          Email:
          <input
            className="grow rounded-md border border-darkBlue bg-transparent pl-2"
            type="email"
            {...register('email')}
          />
        </label>
        {errors.email && (
          <p className="mt-2 text-xs italic text-red-500">{errors.email?.message}</p>
        )}

        <label className="flex gap-2">
          Password:
          <input
            className="grow rounded-md border border-darkBlue bg-transparent pl-2"
            type="password"
            {...register('password')}
          />
        </label>
        {errors.password && (
          <p className="mt-2 text-xs italic text-red-500">{errors.password?.message}</p>
        )}

        <div className="flex items-center justify-end gap-2">
          <Link
            to="/register"
            className="text-sm font-thin underline transition hover:bg-transparent hover:no-underline">
            Go to Register
          </Link>
          <button className="border border-darkBlue bg-darkBlue px-4 py-2 font-bold text-white transition hover:bg-transparent hover:text-darkBlue">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
