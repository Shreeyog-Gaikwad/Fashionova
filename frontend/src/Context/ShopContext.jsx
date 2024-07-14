import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart={};
    for (let index = 1; index < 300+1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) =>{
    
    const [all_products, setAll_Products] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((response) => response.json())
        .then((data) => setAll_Products(data));
    },[]);

    
    
    const addToCart = (itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId] + 1}));
    }

    const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId] - 1}));
    }

    const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
        if (cartItems[items] > 0) {
            let itemInfo = all_products.find((product) => product.id === Number(items));
            if (itemInfo) {
                totalAmount += itemInfo.new_price * cartItems[items];
            }
        }
    }
    return totalAmount;
    }

    const getTotalItems = () =>{
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    console.log(cartItems);

    const contextValue = {all_products, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalItems};

    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;