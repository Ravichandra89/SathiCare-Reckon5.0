import './App.css';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Body from './Components/Body';
import Header from './Components/Header';
import HomePage from './Pages/HomePage';
import SignupPage from './Pages/SignupPage';
import TicketPage from './Pages/TicketPage';
import TicketDescription from './Pages/TicketDescription';

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/ticket',
    element: <TicketPage />,
  },
  {
    path: '/card',
    element: <TicketDescription />,
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={AppRouter} />
    </div>
  );
};

export default App;
