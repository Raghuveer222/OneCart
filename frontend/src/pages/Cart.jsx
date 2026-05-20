import React, { useContext, useEffect, useState } from "react";
import Title from "../component/Title";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from "../component/CartTotal";

function Cart() {
  const { products, currency, cartItem, updateQuantity } =
    useContext(shopDataContext);

  const [cartData, setCartData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];

    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          });
        }
      }
    }

    setCartData(tempData);
  }, [cartItem]);

  return (
    <div className="w-full min-h-screen px-3 sm:px-5 py-5 overflow-x-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]">

      {/* TITLE */}

      <div className="w-full text-center mt-[80px] mb-10">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/* CART ITEMS */}

      <div className="w-full flex flex-col gap-5">

        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          if (!productData) return null;

          return (
            <div
              key={index}
              className="w-full border border-[#80808048] rounded-2xl bg-[#51808030] backdrop-blur-sm p-4 sm:p-5"
            >

              <div className="flex flex-col sm:flex-row gap-5">

                {/* IMAGE */}

                <div className="flex justify-center sm:justify-start">
                  <img
                    className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-xl object-cover border border-[#9ff9f952]"
                    src={productData.image1 || productData.image[0]}
                    alt={productData.name}
                  />
                </div>

                {/* DETAILS */}

                <div className="flex flex-col justify-between flex-1 gap-4">

                  {/* PRODUCT NAME */}

                  <p className="text-[20px] sm:text-[24px] md:text-[28px] text-[#f3f9fc] font-semibold leading-tight break-words">
                    {productData.name}
                  </p>

                  {/* PRICE + SIZE */}

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">

                    <p className="text-[18px] sm:text-[22px] text-[#aaf4e7] font-semibold">
                      {currency} {productData.price}
                    </p>

                    <p className="w-fit min-w-[45px] h-[40px] px-3 text-[15px] text-white bg-[#518080b4] rounded-md flex items-center justify-center border border-[#9ff9f9]">
                      Size : {item.size}
                    </p>
                  </div>

                  {/* QUANTITY + DELETE */}

                  <div className="flex flex-col xs:flex-row sm:flex-row items-start sm:items-center justify-between gap-4 w-full">

                    {/* QUANTITY */}

                    <div className="flex items-center gap-3 flex-wrap">

                      <p className="text-white text-[14px] sm:text-[17px] whitespace-nowrap">
                        Quantity:
                      </p>

                      <input
                        type="number"
                        min={1}
                        defaultValue={item.quantity}
                        className="w-[65px] sm:w-[90px] px-2 py-2 text-white text-[15px] sm:text-[18px] font-semibold bg-[#518080b4] border border-[#9ff9f9] rounded-md outline-none"
                        onChange={(e) =>
                          e.target.value === "" ||
                          e.target.value === "0"
                            ? null
                            : updateQuantity(
                                item._id,
                                item.size,
                                Number(e.target.value)
                              )
                        }
                      />
                    </div>

                    {/* DELETE BUTTON */}

                    <button
                      className="flex items-center justify-center w-[42px] h-[42px] rounded-full border border-[#9ff9f9] hover:bg-[#51808080] transition-all duration-200 shrink-0"
                      onClick={() =>
                        updateQuantity(item._id, item.size, 0)
                      }
                    >
                      <RiDeleteBin6Line className="text-[#9ff9f9] w-[20px] h-[20px]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CART TOTAL */}

      <div className="flex justify-center lg:justify-end mt-16">

        <div className="w-full sm:w-[450px]">

          <CartTotal />

          {/* CHECKOUT BUTTON */}

          <button
            className="w-full sm:w-auto text-[16px] sm:text-[18px] hover:bg-slate-500 transition-all duration-200 cursor-pointer bg-[#51808048] py-3 px-8 rounded-2xl text-white flex items-center justify-center gap-4 border border-[#80808049] mt-5"
            onClick={() => {
              if (cartData.length > 0) {
                navigate("/placeorder");
              } else {
                console.log("Your cart is empty!");
              }
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
