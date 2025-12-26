import './style.css'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Settings from "./pages/Settings"

import ProtectedRoute from "./components/ProtectedRoute"
import { UserProvider } from './context/userContext'
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      
      <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </>
  )
)

const App = () => {
  return (
    <UserProvider>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <RouterProvider router={router} />
    </UserProvider>
  )
}

export default App