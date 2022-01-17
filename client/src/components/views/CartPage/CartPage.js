import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getCartItems, removeCartItem } from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';
import {Empty} from 'antd';

function CartPage(props) {

    const dispatch = useDispatch();
    const [Total, setTotal] = useState(0);
    const [ShowTotal, setShowTotal] = useState(false);

    useEffect(() => {

        // Redux User State cart 안에 상품이 들어 있는지 확인

        let cartItems = []

        if(props.user.userData && props.user.userData.cart) {
            if(props.user.userData.cart.length > 0){
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                })

                dispatch(getCartItems(cartItems, props.user.userData.cart ))
                .then(response => {calculateTotal(response.payload.product)})

            }
        }
        
    }, [props.user.userData])

    let calculateTotal = (product) => {
        let total = 0;
        product.map(item => {
            total += parseInt(item.price, 10) * item.quantity
            console.log('total ' ,total);
        })

        setTotal(total);
        setShowTotal(true);
    }

    let removeFromCart = (productId) => {

        dispatch(removeCartItem(productId))
            .then(response => {

                console.log(response);

                if(response.payload.productInfo.length <= 0){
                    setShowTotal(false);
                }

            })
    }

    return (
 
        <div style= {{ width:'85%', margin: '3rem auto'}}>
            <h1>My Cart</h1>
                <div>
                    <UserCardBlock products={props.user.cartDetail && props.user.cartDetail.product} removeItem={removeFromCart} />
                </div>

            {ShowTotal ?
                <div style={{ marginTop: '3rem'}}>
                    <h2> Total Amount: $ {Total} </h2>
                </div>
                :
                <>
                    <br />
                    <Empty description={false}/>
                </>
            }
            
        </div>        
    )
}

export default CartPage