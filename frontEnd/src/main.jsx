import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import About from "./pages/About.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserProfile from "./pages/UserProfile/UserProfile.jsx";
import SellerProfile from "./pages/SellerProfile.jsx";
import Products from "./pages/Products.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import Login from "./pages/login/Login.jsx";
import Product from "./pages/Product.jsx";
import Layout from "./components/Layout.jsx";
import Cart from "./pages/Cart/Cart.jsx";
// import { AuthProvider } from "./context/AuthProvider.jsx";
import createStore from "react-auth-kit/createStore";
// import { AuthProvider } from "react-auth-kit";
import AuthProvider from "react-auth-kit";
import WishList from "./pages/WishList.jsx";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <App /> },
      { path: "products", element: <Products /> },
      { path: "products/:productId", element: <Product /> },
      { path: "about", element: <About /> },
      {
        path: "userProfile",
        element: (
          <RequireAuth fallbackPath="/login">
            <UserProfile />
          </RequireAuth>
        ),
      },
      {
        path: "sellerProfile",
        element: (
          <RequireAuth fallbackPath="/login">
            <SellerProfile />
          </RequireAuth>
        ),
      },

      { path: "signup", element: <SignUp /> },
      { path: "login", element: <Login /> },
      { path: "cart", element: <Cart /> },
      {
        path: "wishlist",
        element: (
          <RequireAuth fallbackPath="/login">
            <WishList />
          </RequireAuth>
        ),
      },
    ],
  },
]);

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: false,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthProvider store={store}>
    <RouterProvider router={router} />
  </AuthProvider>
  // </React.StrictMode>
);
