import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const items = localStorage.getItem('login') !== null ? JSON.parse(localStorage.getItem('login')) : false;
    setIsUserLoggedIn(items);
  }, []);

  function handleUserLoggedInChange(userLoggedIn) {
    setIsUserLoggedIn(userLoggedIn);
    localStorage.setItem('login', JSON.stringify(userLoggedIn));
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
      element: 
        <> 
          <NavBar 
            isUserLoggedIn={isUserLoggedIn}
            onUserLoginStatusChange={handleUserLoggedInChange}
          />
          <SignIn 
            onUserLoginStatusChange={handleUserLoggedInChange}
          />
        </>,
    },
    {
      path: "/register",
      element: 
        <> 
          <NavBar 
            isUserLoggedIn={isUserLoggedIn}
            onUserLoginStatusChange={handleUserLoggedInChange}
          />
          <Register/>
        </>,
    },
    {
      path: "/forgot-password",
      element: 
        <> 
          <NavBar 
            isUserLoggedIn={isUserLoggedIn}
            onUserLoginStatusChange={handleUserLoggedInChange}
          />
          <ForgotPassword/>
        </>,
    },
    {
      path: "/issues-overview",
      element: 
        <> 
          <NavBar 
            isUserLoggedIn={isUserLoggedIn}
            onUserLoginStatusChange={handleUserLoggedInChange}
          />
          <IssuesOverview/>
        </>,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
