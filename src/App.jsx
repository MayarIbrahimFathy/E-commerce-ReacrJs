import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import Nav from './Component/Nav';
import Home from './Component/Home';
import About from './Component/About';
import NotFound from './Component/NotFound';
import Login from './Component/Form/Login';
import PrivateRoute from './Component/PrivateRoute';
import Cart from './Component/Cart';
import store from "./Component/ReduxToolKit/store";
import ProductDetails from './Component/ProductDetails';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer position="bottom-right" autoClose={3000} />
        <Nav />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
            <Route path='/details/:id' element={<ProductDetails />} />


          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App