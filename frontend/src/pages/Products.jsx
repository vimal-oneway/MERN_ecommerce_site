import React,{useState, useEffect} from 'react';
import ProductCard from "../components/ProductCard"
import Axios from '../config/axios'
import { Container } from '@mui/system';
import { Pagination } from '@mui/material';

export const Products = ({userData, ShowMessage}) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const getProductsData = async(nextPage) =>{
    const res = await Axios.getAllProductData(nextPage||1);
    res.message && ShowMessage({message:res.message , success:res.success, isOpen:true});
    setProducts(res.products);
    setTotalPage(res.totalPage);
  }

  const handleChange = (event, value) => {
    setPage(value);
    getProductsData(value);
    window.scrollTo(0,0)
  }

  useEffect(()=>{
    getProductsData();
  },[])

  return (
   <div className='mt' id='top'>
      <Container>
        <ProductCard products={products} userData={userData}/>
        <div className="flex mt">
          <Pagination  count={totalPage} page={page} onChange={handleChange} color='secondary'/>
        </div>
      </Container>
    </div>
  );
}