import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDataType } from '../pages/Register';
import { UpdateUserDataType } from '../pages/Update';

interface UsersProps {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date | undefined;
}

interface UsersContextValues {
  users: UsersProps[];
  createUser: (data: CreateUserDataType) => void;
  deleteUser: (id: string) => void;
  updateUser: (ud: string, data: UpdateUserDataType) => void;
}

const UsersContext = createContext({} as UsersContextValues);

export function UsersContextProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<UsersProps[]>(() => {
    const userStorage = localStorage.getItem('@aplication: crud');

    if (userStorage) {
      return JSON.parse(userStorage);
    } else {
      return [];
    }
  });

  const createUser = useCallback(
    ({ name, email, password }: CreateUserDataType) => {
      const findUserByEmail = users.find((user) => user.email === email);

      if (findUserByEmail) {
        alert('Email already is used!');
        return;
      }

      const findUserByName = users.find((user) => user.name === name);

      if (findUserByName) {
        alert('User already exist!');
        return;
      }

      const createNewUser: UsersProps = {
        id: uuidv4(),
        name,
        email,
        password,
        createdAt: new Date(),
      };

      setUsers((state) => [...state, createNewUser]);
    },
    [users]
  );

  const deleteUser = useCallback(
    (id: string) => {
      const filterUserById = users.filter((user) => user.id !== id);
      setUsers(filterUserById);
    },
    [users]
  );

  const updateUser = useCallback(
    (id: string, data: UpdateUserDataType) => {
      const { name, email, password } = data;

      const userExist = users.findIndex((user) => user.id === id);

      if (userExist !== -1) {
        users[userExist].id = id;
        users[userExist].name = name;
        users[userExist].email = email;
        users[userExist].password = password;

        setUsers([...users]);

        return;
      }
    },
    [users]
  );

  useEffect(() => {
    localStorage.setItem('@aplication: crud', JSON.stringify(users));
  }, [users]);

  return (
    <UsersContext.Provider
      value={{ users, createUser, deleteUser, updateUser }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export const UsersContextValues = () => useContext(UsersContext);
