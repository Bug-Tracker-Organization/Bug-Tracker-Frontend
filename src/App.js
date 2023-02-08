import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import NavBar from './components/NavBar/NavBar.js';
import Home from './pages/Home/Home.js';
import SignIn from './pages/SignIn/SignIn.js';
import Register from './pages/Register/Register.js';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.js';
import IssuesOverview from './pages/IssuesOverview/IssuesOverview';
import EditIssue from './pages/EditIssue/EditIssue';
import IssueDetail from './pages/IssueDetail/IssueDetail';
import UserProfile from './pages/UserProfile/UserProfile';
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
          <Home isUserLoggedIn={isUserLoggedIn}/> 
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
            isUserLoggedIn={isUserLoggedIn}
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
          <Register isUserLoggedIn={isUserLoggedIn}/>
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
          <ForgotPassword isUserLoggedIn={isUserLoggedIn}/>
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
          <IssuesOverview isUserLoggedIn={isUserLoggedIn}/>
        </>,
    },
    {
      path: "/edit-issue",
      element: 
        <> 
          <NavBar 
            isUserLoggedIn={isUserLoggedIn}
            onUserLoginStatusChange={handleUserLoggedInChange}
          />
          <EditIssue isUserLoggedIn={isUserLoggedIn}/>
        </>,
    },
    {
      path: "/issue-detail",
      element: 
        <> 
          <NavBar 
            isUserLoggedIn={isUserLoggedIn}
            onUserLoginStatusChange={handleUserLoggedInChange}
          />
          <IssueDetail isUserLoggedIn={isUserLoggedIn}/>
        </>,
    },
    {
      path: "/user-profile",
      element: 
        <> 
          <NavBar 
            isUserLoggedIn={isUserLoggedIn}
            onUserLoginStatusChange={handleUserLoggedInChange}
          />
          <UserProfile isUserLoggedIn={isUserLoggedIn}/>
        </>,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
