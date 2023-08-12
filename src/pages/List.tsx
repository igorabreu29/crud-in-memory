import { UsersContextValues } from '../context/UsersContext';
import dayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br';
import { Link } from 'react-router-dom';
dayjs.locale(ptBr);

export function List() {
  const { users, deleteUser } = UsersContextValues();

  return (
    <div className="h-[90vh] overflow-auto overflow-hidden-y flex flex-col gap-2 items-center justify-center">
      <h2 className="text-3xl font-bold">List Users</h2>
      <table className="max-w-[820px] w-full border-separate">
        <thead>
          <tr>
            <th className="border border-emerald-500">Name</th>
            <th className="border border-emerald-500">Email</th>
            <th className="border border-emerald-500">Password</th>
            <th className="border border-emerald-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-emerald-500 text-center">
                {user.name}
              </td>
              <td className="border border-emerald-500 text-center">
                {user.email}
              </td>
              <td className="border border-emerald-500 text-center">
                {user.password}
              </td>
              <td className="border border-emerald-500 flex items-center justify-center flex-col">
                <Link
                  className="bg-blue-600 hover:bg-blue-500 w-full text-center"
                  to={`/user/update/${user.id}`}
                >
                  Update
                </Link>
                <button
                  className="bg-red-600 hover:bg-red-500 w-full"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
