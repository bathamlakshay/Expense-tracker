import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Transactions from './pages/Transactions.jsx'
import AddTransaction from './pages/AddTransaction.jsx'
import Budget from './pages/Budget.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      { path: '/',
        element: <Dashboard/>
      },
      { path: '/transactions',
        element: <Transactions /> },
         { path: '/budget',
        element: <Budget/>
      },
      { path: '/add',
        element: <AddTransaction /> },
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
