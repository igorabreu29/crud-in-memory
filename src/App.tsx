import { BrowserRouter } from 'react-router-dom';
import { Router } from './Routes';
import { UsersContextProvider } from './context/UsersContext';

export default function App() {
  return (
    <BrowserRouter>
      <UsersContextProvider>
        <Router />
      </UsersContextProvider>
    </BrowserRouter>
  );
}
