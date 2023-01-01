import { Container } from '@mui/system'
import React,{useEffect, useState} from 'react'
import Axios from '../config/axios'
import { CartCard } from '../components/CartCard'
export const Cart = ({userData}) => {

    const [cart, setCart] = useState()

    const getCart = async() => {
        setCart(await Axios.getCart(userData.userId))
    }

    useEffect(()=>{
        getCart()
    })

    return (
        <div className='mt'>
            <Container>
                <CartCard products={cart?.cartData} cart={cart?.cart} userData={userData}/>
            </Container>
        </div>
    )
}
