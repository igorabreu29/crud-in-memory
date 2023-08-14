import { UsersContextValues } from '../context/UsersContext';
import dayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br';
import { Link } from 'react-router-dom';
dayjs.locale(ptBr);

export function List() {
  const { users, deleteUser } = UsersContextValues();

  return (
    <div className="h-[90vh] overflow-auto overflow-hidden-y flex flex-col gap-2 items-center justify-center px-4">
      <h2 className="text-3xl font-bold">List Users</h2>
      <table className="max-w-[520px] sm:max-w-[820px] w-full border-separate">
        <thead>
          <tr>
            <th className="border border-emerald-500 hidden sm:table-cell">
              Name
            </th>
            <th className="border border-emerald-500 text-sm sm:text-base">
              Email
            </th>
            <th className="border border-emerald-500 text-sm sm:text-base">
              Password
            </th>
            <th className="border border-emerald-500 text-sm sm:text-base">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-emerald-500 text-center text-sm sm:text-base hidden sm:table-cell">
                {user.name}
              </td>
              <td className="border border-emerald-500 text-center text-sm sm:text-base">
                {user.email}
              </td>
              <td className="border border-emerald-500 text-center text-sm sm:text-base">
                {user.password}
              </td>
              <td className="border border-emerald-500 flex items-center justify-center flex-col">
                <Link
                  className="bg-blue-600 hover:bg-blue-500 w-full text-center text-sm sm:text-base"
                  to={`/user/update/${user.id}`}
                >
                  Update
                </Link>
                <button
                  className="bg-red-600 hover:bg-red-500 w-full text-sm sm:text-base"
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
