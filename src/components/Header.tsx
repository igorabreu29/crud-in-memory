import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header className="w-full flex items-center justify-between gap-4 px-12 h-14 border-b">
      <h1 className="font-bold text-3xl">User application</h1>
      <nav className="flex items-center justify-center gap-4">
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/user/list'}>List</NavLink>
      </nav>
    </header>
  );
}
