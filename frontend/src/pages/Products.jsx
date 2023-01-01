import React,{useState, useEffect} from 'react';
import ProductCard from "../components/ProductCard"
import Axios from '../config/axios'
import { Container } from '@mui/system';

export const Products = ({userData, ShowMessage}) => {
  const [products, setProducts] = useState([]);

  const getProductsData = async() =>{
    const res = await Axios.getAllProductData();
    res.message && ShowMessage({message:res.message , success:res.success, isOpen:true});
    setProducts(res.products);
  }

  useEffect(()=>{
    getProductsData();
  },[])

  return (
   <div className='mt'>
      <Container>
        <ProductCard products={products} userData={userData}/>
      </Container>
    </div>
  );
}