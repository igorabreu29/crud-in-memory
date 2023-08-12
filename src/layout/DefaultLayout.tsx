import { Header } from '../components/Header';

import { Outlet } from 'react-router-dom';

export function DefaultLayout() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white font-sans">
      <Header />
      <Outlet />
    </div>
  );
}
