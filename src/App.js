import logo from './logo.svg';
import './App.css';
import LoginForm from './login';
import RegisterForm from './register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './notfound';
import EventRegistration from './event_registration';
import UpcomingEvents from './upcoming-events';

function App() {

  const router = createBrowserRouter ([
    {
      path: "/",
      element: <LoginForm/>
    },
    {
      path: "/register",
      element: <RegisterForm/>
    },
    {
      path: "*",
      element: <NotFound/>
    },
    {
      path: "/event-registration",
      element: <EventRegistration/>
    },
    {
      path: "/upcoming-events",
      element: <UpcomingEvents/>
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
