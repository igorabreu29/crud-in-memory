import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { UsersContextValues } from '../context/UsersContext';

const createUserSchema = z.object({
  name: z.string().nonempty('The field name cannot be empty!'),
  email: z
    .string()
    .nonempty('The field email cannot be empty!')
    .email('Format invalid!'),
  password: z.string().min(6, 'The field password should have 6 characters'),
});

export type CreateUserDataType = z.infer<typeof createUserSchema>;

export function Register() {
  const { createUser } = UsersContextValues();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<CreateUserDataType>({
    resolver: zodResolver(createUserSchema),
  });

  function handleCreateUser({ name, email, password }: CreateUserDataType) {
    createUser({
      name,
      email,
      password,
    });

    reset();
  }

  return (
    <div className="h-[90vh] overflow-auto overflow-hidden-y flex items-center justify-center">
      <form
        className="flex items-center justify-center flex-col gap-3 p-4 bg-zinc-950 rounded w-[18rem]"
        onSubmit={handleSubmit(handleCreateUser)}
      >
        <div className="flex items-start justify-center flex-col w-full">
          <label htmlFor="name" className="text-gray-500 text-sm sm:text-base">
            Name:
          </label>
          <input
            type="text"
            autoComplete="off"
            placeholder="Type your name..."
            className="w-full h-12 sm:h-8 rounded bg-transparent outline-none text-gray-300 text-sm sm:text-base placeholder:text-gray-500"
            {...register('name')}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>
        <div className="flex items-start justify-center flex-col w-full">
          <label htmlFor="email" className="text-gray-500 text-sm sm:text-base">
            Email:
          </label>
          <input
            type="email"
            autoComplete="off"
            placeholder="Type your email..."
            className="w-full h-12 sm:h-8 rounded bg-transparent outline-none text-sm sm:text-base text-gray-300 placeholder:text-gray-500"
            {...register('email')}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div className="flex items-start justify-center flex-col w-full">
          <label
            htmlFor="password"
            className="text-gray-500 text-sm sm:text-base"
          >
            Password:
          </label>
          <input
            type="password"
            placeholder="Type your password..."
            className="w-full h-12 sm:h-8 rounded bg-transparent outline-none text-sm sm:text-base text-gray-300 placeholder:text-gray-500"
            {...register('password')}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="w-full h-8 bg-emerald-600 hover:bg-emerald-500 rounded"
        >
          Create User
        </button>
      </form>
    </div>
  );
}
