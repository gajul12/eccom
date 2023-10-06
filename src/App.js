import logo from './logo.svg';
import React, { createContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Pages/Home/Home';
import Camera from './Components/Pages/Camera/Camera';
import Headphones from './Components/Pages/Headphones/Headphones';
import Laptop from './Components/Pages/Laptop/Laptop';
import Mobile from './Components/Pages/Mobile/Mobile';
import Monitor from './Components/Pages/Monitor/Monitor';
import Tablet from './Components/Pages/Tablet/Tablet';
import DetailsPage from './Components/Pages/Other/DetailsPage';
import Login from './Components/Pages/Login/Login';
import Signup from './Components/Pages/SignUp/Signup';
import Dashboard from './Components/Pages/Home/Dashboard';
import Addproduct from './Components/Pages/AddProduct/Addproduct';
import axios from 'axios';
import Cart from './Components/Pages/Cart/Cart';

const AppContext = createContext();

function App() {
  const [cartdata , setCartData] = useState([]);
  const [qCount ,setQCount] = useState(0);
  const [price, setPrice] = useState(0);
  const getCartData = async()=>{
    const loginDetails = JSON.parse(localStorage.getItem("UserInfo"));
    const dataCart = await axios("http://onlinetestapi.gerasim.in/api/Ecomm/GetCartProductsByCustomerId",{params: {id:loginDetails?.custId }})
    const dataCount = dataCart?.data?.data;     
    setCartData(dataCount);
    let sum = 0;
      let totalPrice = 0;
    dataCount.forEach(element => {
                sum += element.quantity;
                totalPrice += element.productPrice;
                setQCount(sum);
                setPrice(totalPrice);
         });
  }
  useEffect(()=>{
    getCartData();
  },[])
  return (
    <div>
      <AppContext.Provider value={{getCartData:getCartData,cartdata:cartdata,qCount,price}}>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Dashboard></Dashboard>}></Route>
          <Route path='/camera' element={<Camera></Camera>}></Route>
          <Route path='/headphones' element={<Headphones></Headphones> }></Route>
          <Route path='/laptop' element={<Laptop></Laptop>}></Route>
          <Route path='/mobile' element={ <Mobile></Mobile>}></Route>
          <Route path='/monitor' element={<Monitor></Monitor>}></Route>
          <Route path='/tablet' element={<Tablet></Tablet> }></Route>
          <Route path='/detailspage' element={<DetailsPage></DetailsPage>}> </Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/signup' element={<Signup></Signup>}></Route>
          <Route path='/addproduct' element={<Addproduct></Addproduct>}></Route>
          <Route path='/cart'element={<Cart></Cart>}></Route>
        </Routes>
      </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
export{AppContext}
