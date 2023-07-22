import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import PageNav from "./components/PageNav";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

const HomePage = lazy(() => import("./pages/HomePage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const Page404 = lazy(() => import("./pages/Page404"));
const AppLayoutPage = lazy(() => import("./pages/AppLayoutPage"));
const Login = lazy(() => import("./pages/Login"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<SpinnerFullPage />}>
        <HomePage />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<SpinnerFullPage />}>
        <Page404 />
      </Suspense>
    ),
  },
  {
    path: "pricing",
    element: (
      <Suspense fallback={<SpinnerFullPage />}>
        <PricingPage />
      </Suspense>
    ),
  },
  {
    path: "product",
    element: (
      <Suspense fallback={<SpinnerFullPage />}>
        <ProductPage />
      </Suspense>
    ),
  },
  {
    path: "app",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<SpinnerFullPage />}>
          <AppLayoutPage />
        </Suspense>
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
    element: (
      <Suspense fallback={<SpinnerFullPage />}>
        <Login />
      </Suspense>
    ),
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
