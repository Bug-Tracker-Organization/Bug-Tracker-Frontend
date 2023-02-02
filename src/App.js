import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import NavBar from './components/NavBar/NavBar.js';
import Home from './pages/Home/Home.js';
import SignIn from './pages/SignIn/SignIn.js';
import Register from './pages/Register/Register.js';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.js';
import IssuesOverview from './pages/IssuesOverview/IssuesOverview';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

function App() {
  
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  function handleUserLoggedInChange(userLoggedIn) {
    setIsUserLoggedIn(userLoggedIn);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: 
        <> 
          <NavBar 
            isUserLoggedIn={isUserLoggedIn}
            onUserLoginStatusChange={handleUserLoggedInChange}
          />
          <Home/> 
        </>,
    },
    {
      path: "/sign-in",
      element: <SignIn isUserLoggedIn={isUserLoggedIn}
        onUserLoginStatusChange={handleUserLoggedInChange}
      />,
    },
    {
      path: "/register",
      element: <Register isUserLoggedIn={isUserLoggedIn}/>,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword isUserLoggedIn={isUserLoggedIn}/>,
    },
    {
      path: "/issues-overview",
      element: <IssuesOverview isUserLoggedIn={isUserLoggedIn}/>,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
