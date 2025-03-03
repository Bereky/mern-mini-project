import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router'
import { Toaster } from 'react-hot-toast'

import './index.css'
import App from './app/App'
import { store } from "./redux/app/store";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
    <Toaster
      toastId="default"
      position="top-right"
      reverseOrder={false}
      toastOptions={{ className: "text-sm", duration: 3000 }}
    />
  </Provider>
)
