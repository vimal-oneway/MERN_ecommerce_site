import './App.css';
import axios from './config/axios'
import React,{useState,useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {Navbar} from './components/Navbar'
import {Home} from './pages/Home'
import {Products} from "./pages/Products"
import { Login } from "./pages/Login";
import {Register} from "./pages/Register"
import {Verify} from './pages/Verify'
import {Logout} from './components/Logout'
import {Cart} from './pages/Cart'
import { ProductAdd } from './pages/ProductAdd';
import { Product } from './pages/Product';
import Messager from './components/Messager';
import Footer from './components/Footer';

const theme = createTheme({
  palette: {
    primary: {
      main:'#1876d2'
    },
    secondary: {
      main: '#457B9D',
    },
    info:{
      main:'#6b63ff'
    },
    warning:{
      main:'#ffffff'
    }
  },
});

function App() {
  const [userData,setUserData] = useState();
  const [showMessage, setShowMessage] = useState({message:'', success:false, isOpen:false});
  
  const getUser = async () => {
    setUserData(await axios.getUser());
  }

  const ShowMessage = (msg) =>{
    console.log("show msg",msg);
    setShowMessage(msg)
  }

  useEffect(()=>{
    getUser()
  },[])
 

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
          <Navbar userData={userData}/>
          <Routes>
            <Route index element={<Home userData={userData}/>}/>
            <Route path='/products' element={<Products userData={userData} ShowMessage={ShowMessage}/>}/>
            <Route path='/projects' element={<Products userData={userData} ShowMessage={ShowMessage}/>}/>
            <Route path='/contact' element={<Products userData={userData} ShowMessage={ShowMessage}/>}/>
            <Route path='/login' element={<Login userData={userData} ShowMessage={ShowMessage}/>}/>
            <Route path='/register' element={<Register userData={userData} ShowMessage={ShowMessage}/>}/>
            <Route path='/register/verify' element={<Verify userData={userData} ShowMessage={ShowMessage}/>}/>
            <Route path='/logout' element={<Logout userData={userData} ShowMessage={ShowMessage}/>}/>
            <Route path='/cart' element={<Cart userData={userData} ShowMessage={ShowMessage}/>}/>
            <Route path='/product/add' element={<ProductAdd userData={userData} ShowMessage={ShowMessage}/>}/>
            <Route path='/products/:id' element={<Product userData={userData} ShowMessage={ShowMessage}/>}/>
          </Routes>
         <Messager msg={showMessage}/>
        {location.pathname != '/login' && location.pathname != '/register' &&  <Footer/>}
      </BrowserRouter>
    </ThemeProvider>
  );
  
}

export default App;
