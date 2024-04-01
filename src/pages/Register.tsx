import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerUser } from '../services/auth';
import { Link, useNavigate } from 'react-router-dom';
import { UserRegisterForm, validationRegisterSchema } from '../types/UserForm';

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserRegisterForm>({
    resolver: zodResolver(validationRegisterSchema)
  });
  const navigate = useNavigate();

  const onSubmit = async (user: UserRegisterForm) => {
    try {
      await registerUser({
        name: user.name,
        email: user.email,
        password: user.password,
        profilePhoto: user.profilePhoto
      });

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
          Name:
          <input
            className="grow rounded-md border border-darkBlue bg-transparent pl-2"
            type="text"
            {...register('name')}
          />
        </label>
        {errors.name && <p className="mt-2 text-xs italic text-red-500">{errors.name?.message}</p>}

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

        <label className="flex gap-2">
          Confirm Password:
          <input
            className="grow rounded-md border border-darkBlue bg-transparent pl-2"
            type="password"
            {...register('confirmPassword')}
          />
        </label>
        {errors.confirmPassword && (
          <p className="mt-2 text-xs italic text-red-500">{errors.confirmPassword?.message}</p>
        )}

        <label className="flex items-center justify-center gap-2 border border-darkBlue bg-darkBlue px-4 py-2 font-bold text-white transition hover:bg-transparent hover:text-darkBlue">
          Profile Photo
          <input
            className="hidden"
            type="file"
            {...register('profilePhoto')}
            accept="image/png, image/jpeg, image/jpg"
          />
        </label>

        <div className="flex items-center justify-end gap-2">
          <Link
            to="/login"
            className="text-sm font-thin underline transition hover:bg-transparent hover:no-underline">
            Go to Login
          </Link>
          <button className="border border-darkBlue bg-darkBlue px-4 py-2 font-bold text-white transition hover:bg-transparent hover:text-darkBlue">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
