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
import ProfileEditing from './pages/ProfileEditing/ProfileEditing';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import UserManagement from './pages/UserManagement/UserManagement';
import {
  Routes,
  Route,
} from "react-router-dom";

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

  return (
    <>
      <Routes>
        <Route path="/" element={
          <>
            <NavBar isUserLoggedIn={isUserLoggedIn}
              onUserLoginStatusChange={handleUserLoggedInChange}
            />
            <Home isUserLoggedIn={isUserLoggedIn}/>
          </>} 
        />
        <Route path="/sign-in" element={
          <>
            <NavBar isUserLoggedIn={isUserLoggedIn}
              onUserLoginStatusChange={handleUserLoggedInChange}
            />
            <SignIn isUserLoggedIn={isUserLoggedIn}
              onUserLoginStatusChange={handleUserLoggedInChange}
            />
          </>} 
        />
        <Route path="/register" element={
            <> 
              <NavBar 
                isUserLoggedIn={isUserLoggedIn}
                onUserLoginStatusChange={handleUserLoggedInChange}
              />
              <Register isUserLoggedIn={isUserLoggedIn}/>
            </>
          } 
        />
        <Route path="/forgot-password" element={
            <> 
              <NavBar 
                isUserLoggedIn={isUserLoggedIn}
                onUserLoginStatusChange={handleUserLoggedInChange}
              />
              <ForgotPassword isUserLoggedIn={isUserLoggedIn}/>
            </>
          } 
        />
        <Route path="/issues-overview" element={
            <> 
              <NavBar 
                isUserLoggedIn={isUserLoggedIn}
                onUserLoginStatusChange={handleUserLoggedInChange}
              />
              <IssuesOverview isUserLoggedIn={isUserLoggedIn}/>
            </>
          } 
        />
        <Route path="/edit-issue/:id" element={
          <> 
            <NavBar 
              isUserLoggedIn={isUserLoggedIn}
              onUserLoginStatusChange={handleUserLoggedInChange}
            />
            <EditIssue isUserLoggedIn={isUserLoggedIn}/>
          </>
          } 
        />
        <Route path="/issue-detail/:id" element={
            <> 
              <NavBar 
                isUserLoggedIn={isUserLoggedIn}
                onUserLoginStatusChange={handleUserLoggedInChange}
              />
              <IssueDetail isUserLoggedIn={isUserLoggedIn}/>
            </>
          } 
        />
        <Route path="/user-profile/:username" element={
          <> 
            <NavBar 
              isUserLoggedIn={isUserLoggedIn}
              onUserLoginStatusChange={handleUserLoggedInChange}
            />
            <UserProfile isUserLoggedIn={isUserLoggedIn}/>
          </>
          } 
        />
        <Route path="/profile-editing" element={
            <> 
              <NavBar 
                isUserLoggedIn={isUserLoggedIn}
                onUserLoginStatusChange={handleUserLoggedInChange}
              />
              <ProfileEditing isUserLoggedIn={isUserLoggedIn}/>
            </>
          } 
        />
          <Route path="/change-password" element={
            <> 
              <NavBar 
                isUserLoggedIn={isUserLoggedIn}
                onUserLoginStatusChange={handleUserLoggedInChange}
              />
              <ChangePassword isUserLoggedIn={isUserLoggedIn}/>
            </>
          } 
        />
          <Route path="/user-management" element={
            <> 
              <NavBar 
                isUserLoggedIn={isUserLoggedIn}
                onUserLoginStatusChange={handleUserLoggedInChange}
              />
              <UserManagement isUserLoggedIn={isUserLoggedIn}/>
            </>
          } 
        />
      </Routes>
    </>
  );
}

export default App;
