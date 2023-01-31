import logo from './logo.svg';
import './App.css';
import Home from './pages/Home/Home.js';
import SignUp from './pages/SignUp/SignUp.js';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/sign-up",
    element: <SignUp/>,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
