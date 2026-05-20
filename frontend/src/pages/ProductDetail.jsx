import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopDataContext } from "../context/ShopContext";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from "../component/RelatedProduct.jsx";

function ProductDetail() {
  let { productId } = useParams();

  let { products, currency, addtoCart } =
    useContext(shopDataContext);

  let [productData, setProductData] = useState(false);

  const [image, setImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");

  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);

        setImage1(item.image1);
        setImage2(item.image2);
        setImage3(item.image3);
        setImage4(item.image4);

        setImage(item.image1);

        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="overflow-x-hidden">
      
      {/* MAIN SECTION */}

      <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col lg:flex-row items-center justify-center gap-8 px-4 py-8">

        {/* LEFT SIDE */}

        <div className="w-full lg:w-1/2 flex flex-col lg:flex-row items-center justify-center gap-5">

          {/* SMALL IMAGES */}

          <div className="w-full lg:w-[20%] flex lg:flex-col flex-wrap items-center justify-center gap-4">

            <div className="w-[60px] h-[60px] md:w-[90px] md:h-[100px] border border-[#80808049] rounded-md overflow-hidden bg-slate-300">
              <img
                src={image1}
                alt=""
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setImage(image1)}
              />
            </div>

            <div className="w-[60px] h-[60px] md:w-[90px] md:h-[100px] border border-[#80808049] rounded-md overflow-hidden bg-slate-300">
              <img
                src={image2}
                alt=""
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setImage(image2)}
              />
            </div>

            <div className="w-[60px] h-[60px] md:w-[90px] md:h-[100px] border border-[#80808049] rounded-md overflow-hidden bg-slate-300">
              <img
                src={image3}
                alt=""
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setImage(image3)}
              />
            </div>

            <div className="w-[60px] h-[60px] md:w-[90px] md:h-[100px] border border-[#80808049] rounded-md overflow-hidden bg-slate-300">
              <img
                src={image4}
                alt=""
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setImage(image4)}
              />
            </div>
          </div>

          {/* MAIN IMAGE */}

          <div className="w-full sm:w-[85%] lg:w-[65%] h-[350px] md:h-[500px] border border-[#80808049] rounded-md overflow-hidden">
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="w-full lg:w-1/2 flex flex-col gap-4 text-white px-2 md:px-5">

          {/* TITLE */}

          <h1 className="text-2xl md:text-4xl font-semibold break-words">
            {productData.name.toUpperCase()}
          </h1>

          {/* RATING */}

          <div className="flex items-center gap-1 flex-wrap">
            <FaStar className="text-[18px] md:text-[20px] fill-[#FFD700]" />
            <FaStar className="text-[18px] md:text-[20px] fill-[#FFD700]" />
            <FaStar className="text-[18px] md:text-[20px] fill-[#FFD700]" />
            <FaStar className="text-[18px] md:text-[20px] fill-[#FFD700]" />
            <FaStarHalfAlt className="text-[18px] md:text-[20px] fill-[#FFD700]" />

            <p className="text-sm md:text-lg font-semibold pl-1">
              (124)
            </p>
          </div>

          {/* PRICE */}

          <p className="text-2xl md:text-3xl font-semibold">
            {currency} {productData.price}
          </p>

          {/* DESCRIPTION */}

          <p className="w-full md:w-[80%] text-sm md:text-lg leading-relaxed">
            {productData.description} and Stylish,
            breathable cotton shirt with a modern slim fit.
            Easy to wash, super comfortable, and designed
            for effortless style.
          </p>

          {/* SIZE SECTION */}

          <div className="flex flex-col gap-3 my-3">

            <p className="text-xl md:text-2xl font-semibold">
              Select Size
            </p>

            <div className="flex flex-wrap gap-3">

              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  className={`border py-2 px-4 rounded-md transition-all duration-200 ${
                    item === size
                      ? "bg-black text-[#2f97f1]"
                      : "bg-slate-300 text-black"
                  }`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* BUTTON */}

            <button
              className="w-fit text-sm md:text-base active:bg-slate-500 cursor-pointer bg-[#495b61c9] py-3 px-6 rounded-2xl mt-2 border border-[#80808049] text-white shadow-md shadow-black"
              onClick={() => addtoCart(productData._id, size)}
            >
              Add To Cart
            </button>
          </div>

          {/* LINE */}

          <div className="w-full md:w-[90%] h-[1px] bg-slate-700"></div>

          {/* EXTRA INFO */}

          <div className="w-full md:w-[80%] text-sm md:text-base flex flex-col gap-1">
            <p>100% Original Product.</p>

            <p>
              Cash on delivery is available on this product.
            </p>

            <p>
              Easy return and exchange policy within 7 days.
            </p>
          </div>
        </div>
      </div>

      {/* DESCRIPTION SECTION */}

      <div className="w-full min-h-[70vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col items-start justify-start pb-10">

        {/* TABS */}

        <div className="flex flex-wrap px-4 mt-10 lg:ml-[80px] gap-2">

          <p className="border px-4 py-3 text-sm text-white whitespace-nowrap">
            Description
          </p>

          <p className="border px-4 py-3 text-sm text-white whitespace-nowrap">
            Reviews (124)
          </p>
        </div>

        {/* DESCRIPTION BOX */}

        <div className="w-[90%] md:w-[85%] lg:w-[80%] min-h-[150px] bg-[#3336397c] border text-white text-sm md:text-base lg:text-lg px-5 py-6 lg:ml-[100px] ml-[20px] mt-4 rounded-md">

          <p className="leading-relaxed">
            Upgrade your wardrobe with this stylish
            slim-fit cotton shirt, available now on
            OneCart. Crafted from breathable,
            high-quality fabric, it offers all-day
            comfort and effortless style. Easy to
            maintain and perfect for any setting,
            this shirt is a must-have essential for
            those who value both fashion and function.
          </p>
        </div>

        {/* RELATED PRODUCTS */}

        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
          currentProductId={productData._id}
        />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}

export default ProductDetail;
