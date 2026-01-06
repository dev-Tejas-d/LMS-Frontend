
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/LoginPage";
import Home from "./pages/Home";
import ExploreCourses from "./pages/course/exploreCourses.jsx";
import SignUp from "./pages/signUp";
import Layout from "./component/layout.jsx";
import CourseDetail from "./pages/courseDetail/courseDetail.jsx";
import CheckoutPage from "./pages/checkout/CheckoutPage.jsx";

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
      }
    ]
  }
 ])


  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}

export default App
