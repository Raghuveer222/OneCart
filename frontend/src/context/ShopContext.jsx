import React, { createContext, useState, useContext } from "react";
import { AuthDataContext } from "./AuthContext";
import axios from "axios";
import { useEffect } from "react";
import { UserDataContext } from "./UserContext";

export const shopDataContext = createContext();

function ShopContext({ children }) {
  let [products, setProducts] = useState([]);
  let [search, setSearch] = useState("");
  let [showSearch, setShowSearch] = useState(false);
  let [cartItem, setCartItem] = useState({});
  let { serverUrl } = useContext(AuthDataContext);
  let { userData } = useContext(UserDataContext);
  let currency = "₹";
  let delivery_fee = 40;

  const getProducts = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/product/list`);
      setProducts(result.data.product);
      console.log("Products fetched:", result.data);
    } catch (error) {
      setProducts([]);
      console.error("Error fetching products:", error);
    }
  };

  const addtoCart = async (itemId, size) => {
    if (!size) {
      console.log("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItem); // Clone the product

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItem(cartData);
    console.log(cartData);

    if (userData) {
      try {
        await axios.post(
          `${serverUrl}/api/cart/add`,
          { itemId, size },
          { withCredentials: true },
        );
        console.log("Item added to cart successfully");
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const getUserCart = async () => {
    if (userData) {
      try {
        const result = await axios.post(`${serverUrl}/api/cart/get`, {
          withCredentials: true,
        });
        setCartItem(result.data.cartData);
        console.log("User cart fetched:", result.data.cartData);
      } catch (error) {
        setCartItem({});
        console.error("Error fetching cart data:", error);
      }
    } else {
      setCartItem({});
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity;
    setCartItem(cartData);

    if (userData) {
      try {
        await axios.post(
          serverUrl + "/api/cart/update",
          { itemId, size, quantity },
          { withCredentials: true },
        );
      } catch (error) {
        console.log(error);
        console.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalCount += cartItem[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += itemInfo.price * cartItem[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getUserCart();
  }, []);

  let value = {
    products,
    currency,
    delivery_fee,
    getProducts,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addtoCart,
    getCartCount,
    cartItem,
    setCartItem,
    updateQuantity,
    getCartAmount,
  };

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  );
}
export default ShopContext;
