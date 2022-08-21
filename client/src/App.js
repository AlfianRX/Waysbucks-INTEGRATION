import {React, useContext} from "react";
import { Routes, Route } from "react-router-dom";
import { API, setAuthToken } from './config/api';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { UserContext } from "./context/userContext";
import { Home, AddProductAdmin, AddTopingAdmin, Cart, DetailProduct, IncomeTransactionAdmin, Profile } from './pages'


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {

  const [state, dispatch] = useContext(UserContext)
  
  let navigate = useNavigate()

  useEffect(() => {
    // Redirect Auth
    if (state.isLogin == false) {
      navigate('/');
    } else {
      if (state.user.status == 'admin') {
        navigate('/income');
      } else if (state.user.status == 'customer') {
        navigate('/');
      }
    }
  }, [state]);

  //cek authh token

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      console.log(response);
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // Get user data
      let payload = response.data.data.user;
      console.log(payload);
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);

  return (
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/income" element={<IncomeTransactionAdmin />} />
          <Route path="/add-product" element={<AddProductAdmin />} />
          <Route path="/add-toping" element={<AddTopingAdmin />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/detail-product/:id" element={<DetailProduct />} />
          <Route path="/profile" element={<Profile />} />
      </Routes>
  );
}

export default App;
