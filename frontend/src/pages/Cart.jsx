import { Container } from '@mui/system'
import React,{useEffect, useState} from 'react'
import { CartCard } from '../components/CartCard'
import { useDispatch , useSelector } from 'react-redux'
import { getCart } from '../actions/cartActions'

export const Cart = ({userData}) => {
    let dispatch = useDispatch();
    const { cart, loading } = useSelector( state => { return state?.cartState });
    // const [cart, setCart] = useState()

    // const getCart = async() => {
    //     setCart(await Axios.getCart(userData.userId))
    // }
    console.log(cart,"cart");

    useEffect(()=>{
        getCart(dispatch);
    },[])
    return (
        <div className='mt'>
            <Container>
                <CartCard cart={cart}/>
            </Container>
        </div>
    )
}
