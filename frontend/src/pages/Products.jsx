import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Axios from "../config/axios";
import { Container } from "@mui/system";
import { Grid, Pagination, Typography, Button, ButtonGroup, Divider} from "@mui/material";
import resultNotFoundSvg from "../assets/svg/no_results.svg";
import FilterDrawer from '../components/FilterDrawer'
import { getProducts } from "../actions/productsActions";
import {useDispatch} from 'react-redux';

export const Products = ({ userData, ShowMessage, ShowDrawer }) => {
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [count, setCount] = useState(0)

  const [page, setPage] = useState(1);
  const [priceQuery, setPriceQuery] = useState("")

  const getProductsData = async () => {
    const res = await Axios.getAllProductData(page, priceQuery);

    // res.message && ShowMessage({ message: res.message, success: res.success, isOpen: true });
    setProducts(res.products);
    setTotalPage(res.totalPage);
    setCount(res.count);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handlePriceBtn = (range, amount, clear) => {
    if(clear)
    {
      setPriceQuery("");
      return;
    }

    let price="";
    for(let i=0; i<range.length; i++)
    {
      price += `&price[${range[i]}]=${amount[i]}`;
    }
    console.log(price);
    setPriceQuery(price);
    setPage(1);
  };

  // useEffect(() => {
    
  //   getProductsData();
  //   window.scrollTo(0, 0);
  // }, [page, priceQuery]);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getProducts)
  },[])

  const buttons = [
    <Button key="1" onClick={()=>{handlePriceBtn(["lt"], [1000], false)}} >Under 1,000</Button>,
    <Button key="2" onClick={()=>{handlePriceBtn(["gt","lt"], [1000,10000], false)}}>1,000 - 10,000</Button>,
    <Button key="3" onClick={()=>{handlePriceBtn(["gt"], [10000], false)}}>above 10,000</Button>,
    <Button key="4" onClick={()=>{handlePriceBtn([],[], true)}}>clear</Button>,
  ];

  return (
    <div className="mt-10 mb-5" >
      <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={2}>
              {
              window.innerWidth < 550 
              ?
                // <Button variant="outlined" onClick={()=>{ShowDrawer(handlePriceBtn, "filter", true)}}>Filter</Button>
                <FilterDrawer handlePriceBtn={handlePriceBtn}/>
              :
                <>
                  <Typography sx={{fontWeight:'bold', fontFamily:'monospace', ml:'10px'}}>PRICE RANGE</Typography>
                  <ButtonGroup
                    orientation="vertical"
                    aria-label="vertical contained button group"
                    variant="text"
                  >
                    {buttons}
                  </ButtonGroup>
                </>
              }
            </Grid>
            <Divider orientation="vertical"   flexItem />
            <Grid item xs={12} sm={12} md={9}>
              {
              count >0 
                ? 
                  <ProductCard products={products} userData={userData} />
                :
                  <div className="flex-col">
                    <img src={resultNotFoundSvg} alt="no_results_foung" width={"50%"}/>
                    <div className="mb"></div>
                    <Typography component={'p'} sx={{fontWeight:'500',fontSize:"2rem", fontFamily:'monospace'}}>No results found</Typography>
                  </div>
              }
            </Grid>
          </Grid>
        <div className="flex mt-3">
         {  
            totalPage > 0 
            &&
            <Pagination
              count={totalPage}
              page={page}
              onChange={handleChange}
              color="secondary"
            />
          }
        </div>
      </Container>
    </div>
  );
};
