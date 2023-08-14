import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { List, House, UserList, X } from 'phosphor-react';

export function Header() {
  const [showNav, setShowNav] = useState(false);

  return (
    <header className="w-full flex items-center justify-between gap-4 px-4 sm:px-12 h-14 border-b">
      <h1 className="font-bold text-2xl sm:text-3xl">User application</h1>
      <nav className="items-center justify-center gap-2 sm:gap-4 hidden sm:flex">
        <NavLink to={'/'} className="text-base">
          Home
        </NavLink>
        <NavLink to={'/user/list'} className="text-base">
          List
        </NavLink>
      </nav>
      <button onClick={() => setShowNav(true)} className="sm:hidden">
        <List size={20} />
      </button>
      {showNav && (
        <nav
          className={`absolute top-0 left-0 h-[6rem] bg-zinc-950 w-full flex items-center justify-center flex-col sm:hidden`}
        >
          <button
            className="absolute right-4 top-3 text-red-500"
            onClick={() => setShowNav(false)}
          >
            <X size={20} />
          </button>
          <NavLink
            to={'/'}
            className="text-lg flex items-center justify-center gap-1"
          >
            <House size={20} />
            Home
          </NavLink>
          <NavLink
            to={'/user/list'}
            className="text-lg flex items-center justify-center gap-1"
          >
            <UserList size={20} />
            List
          </NavLink>
        </nav>
      )}
    </header>
  );
}
