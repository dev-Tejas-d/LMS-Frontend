
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/LoginPage.jsx";
import Home from "./pages/Home";
import ExploreCourses from "./pages/course/exploreCourses.jsx";
import SignUp from "./pages/registration/signUp.jsx";
import Layout from "./component/layout.jsx";
import CourseDetail from "./pages/courseDetail/courseDetail.jsx";
import CheckoutPage from "./pages/checkout/CheckoutPage.jsx";
import Profile from "./pages/profile/Profile.jsx";
import UpdateProfile from "./pages/profile/UpdateProfile.jsx";

function App() {
 const routes =  createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"SignUp",
        element:<SignUp/>
      },
      {
        path:"courses",
        element:<ExploreCourses/>
      },
      {
        path:"courses/:id",
        element:<CourseDetail/>
      },
      {
        path:"course/Buy/:id",
        element:<CheckoutPage/>
      },
      {
        path:"profile",
        element:<Profile/>
      },
      {
        path:"updateProfile",
        element:<UpdateProfile/>
      }
    ]
  }
 ])


  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}

export default App
