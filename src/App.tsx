import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import PricingPage from "./pages/PricingPage";
import ProductPage from "./pages/ProductPage";
import Page404 from "./pages/Page404";
import PageNav from "./components/PageNav";
import AppLayoutPage from "./pages/AppLayoutPage";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <Page404 />,
  },
  {
    path: "pricing",
    element: <PricingPage />,
  },
  {
    path: "product",
    element: <ProductPage />,
  },
  {
    path: "app",
    element: (
      <ProtectedRoute>
        <AppLayoutPage />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate replace to="cities" /> },
      {
        path: "cities",
        element: <CityList />,
      },
      {
        path: "cities/:id",
        element: <City />,
      },
      {
        path: "countries",
        element: <CountryList />,
      },
      {
        path: "form",
        element: <Form />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "*",
    element: <PageNav />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <RouterProvider router={router} />
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
