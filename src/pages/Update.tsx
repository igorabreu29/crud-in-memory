import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useNavigate } from 'react-router-dom';
import { Eye, EyeSlash } from 'phosphor-react';
import { useState } from 'react';

import { UsersContextValues } from '../context/UsersContext';

const updateUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date | undefined;
}

export type UpdateUserDataType = z.infer<typeof updateUserSchema>;

export function Update() {
  const [alternateType, setAlternateType] = useState(false);
  const { users, updateUser } = UsersContextValues();
  const { id } = useParams();
  const navigate = useNavigate();

  const { handleSubmit, register, reset } = useForm<UpdateUserDataType>({
    resolver: zodResolver(updateUserSchema),
  });

  const user: UserProps | undefined = users.find((user) => user.id === id);

  function handleUpdateUser({ name, email, password }: UpdateUserDataType) {
    updateUser(id as string, {
      name,
      email,
      password,
    });

    reset();
    navigate('/user/list');
  }

  return (
    <div className="h-[90vh] overflow-auto overflow-hidden-y flex items-center justify-center flex-col gap-4">
      <h2 className="text-3xl font-bold">Update User</h2>
      <form
        onSubmit={handleSubmit(handleUpdateUser)}
        className="flex items-center justify-center flex-col gap-3 p-4 bg-blue-950 rounded w-[18rem]"
      >
        <div className="flex items-start justify-center flex-col w-full">
          <label htmlFor="name" className="text-gray-500">
            Name:
          </label>
          <input
            type="text"
            {...register('name')}
            defaultValue={user?.name}
            className="w-full h-8 rounded bg-transparent outline-none text-gray-300 placeholder:text-gray-500"
          />
        </div>
        <div className="flex items-start justify-center flex-col w-full">
          <label htmlFor="email" className="text-gray-500">
            Email:
          </label>
          <input
            type="email"
            {...register('email')}
            defaultValue={user?.email}
            className="w-full h-8 rounded bg-transparent outline-none text-gray-300 placeholder:text-gray-500"
          />
        </div>
        <div className="flex items-start justify-center flex-col w-full">
          <label htmlFor="password" className="text-gray-500">
            Password:
          </label>
          <div className="w-full flex items-center justify-start gap-1">
            <input
              type={alternateType ? 'text' : 'password'}
              {...register('password')}
              defaultValue={user?.password}
              className="w-full h-8 rounded bg-transparent outline-none text-gray-300 placeholder:text-gray-500"
            />
            <button
              type="button"
              onClick={() => setAlternateType(!alternateType)}
            >
              {!alternateType && (
                <Eye size={20} className="w-4 h-4 text-gray-400" />
              )}
              {alternateType && (
                <EyeSlash size={20} className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="h-8 w-full bg-blue-600 hover:bg-blue-500 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
}
