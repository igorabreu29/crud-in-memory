import { Route, Routes } from 'react-router-dom';
import { Register } from './pages/Register';
import { List } from './pages/List';
import { DefaultLayout } from './layout/DefaultLayout';
import { Update } from './pages/Update';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Register />} />
        <Route path="/user/list" element={<List />} />
        <Route path="/user/update/:id" element={<Update />} />
      </Route>
    </Routes>
  );
}
