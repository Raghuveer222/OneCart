import React from "react";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import Title from "../component/Title.jsx";
import { shopDataContext } from "../context/ShopContext";
import { useContext } from "react";
import { useEffect } from "react";
import Card from "../component/Card.jsx";

function Collections() {
  let [showFilter, setShowFilter] = useState(false);
  let { products, search, showSearch } = useContext(shopDataContext);
  let [filteredProduct, setFilteredProduct] = useState([]);
  let [category, setCategory] = useState([]);
  let [subCategory, setSubCategory] = useState([]);
  let [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = products.slice();

    if (showSearch && search.length > 0) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category),
      );
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory),
      );
    }

    setFilteredProduct(productCopy);
  };

  const sortProducts = (e) => {
    let fbCopy = filteredProduct.slice();

    switch (sortType) {
      case "low-high":
        setFilteredProduct(fbCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilteredProduct(fbCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  useEffect(() => {
    setFilteredProduct(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-start flex-col md:flex-row justify-start pt-[70px] overflow-x-hidden z-[2]">
      {/* FILTER SIDEBAR */}
      <div
        className={`md:w-[30vw] lg:w-[20vw] w-full md:min-h-[100vh] ${
          showFilter ? "max-h-[calc(100vh-70px)] overflow-y-auto" : "h-[8vh]"
        } p-[20px] border-r-[1px] border-gray-400 text-[#aaf5fa] lg:fixed`}
      >
        <p
          className="text-[25px] font-semibold flex gap-[5px] items-center justify-start cursor-pointer"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          FILTERS
          {!showFilter && <FaChevronRight className="text-[18px] md:hidden" />}
          {showFilter && <FaChevronDown className="text-[18px] md:hidden" />}
        </p>

        {/* CATEGORY */}
        <div
          className={`border-[2px] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${
            showFilter ? "" : "hidden md:block"
          }`}
        >
          <p className="text-[18px] text-[#f8fafa]">CATEGORIES</p>

          <div className="w-full flex items-start justify-center gap-[10px] flex-col mt-3">
            <p className="flex items-center gap-[10px] text-[16px] font-light">
              <input
                type="checkbox"
                value={"Men"}
                className="w-3"
                onChange={toggleCategory}
              />
              Men
            </p>

            <p className="flex items-center gap-[10px] text-[16px] font-light">
              <input
                type="checkbox"
                value={"Women"}
                className="w-3"
                onChange={toggleCategory}
              />
              Women
            </p>

            <p className="flex items-center gap-[10px] text-[16px] font-light">
              <input
                type="checkbox"
                value={"Kids"}
                className="w-3"
                onChange={toggleCategory}
              />
              Kids
            </p>
          </div>
        </div>

        {/* SUB CATEGORY */}
        <div
          className={`border-[2px] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${
            showFilter ? "" : "hidden md:block"
          }`}
        >
          <p className="text-[18px] text-[#f8fafa]">SUB-CATEGORIES</p>

          <div className="w-full flex items-start justify-center gap-[10px] flex-col mt-3">
            <p className="flex items-center gap-[10px] text-[16px] font-light">
              <input
                type="checkbox"
                value={"TopWear"}
                className="w-3"
                onChange={toggleSubCategory}
              />
              TopWear
            </p>

            <p className="flex items-center gap-[10px] text-[16px] font-light">
              <input
                type="checkbox"
                value={"BottomWear"}
                className="w-3"
                onChange={toggleSubCategory}
              />
              BottomWear
            </p>

            <p className="flex items-center gap-[10px] text-[16px] font-light">
              <input
                type="checkbox"
                value={"WinterWear"}
                className="w-3"
                onChange={toggleSubCategory}
              />
              WinterWear
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE CONTENT */}
      <div className="md:ml-[30vw] lg:ml-[20vw] flex-1 flex flex-col">
        {/* TITLE & SORT SELECTOR */}
        <div className="w-full p-[20px] flex flex-col lg:flex-row lg:items-center lg:justify-between lg:px-[50px] gap-[20px]">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="bg-slate-600 w-full md:w-[200px] h-[50px] px-[10px] text-[white] rounded-lg hover:border-[#46d1f7] border-[2px]"
          >
            <option value="relavent">Sort By: Relavent</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        {/* PRODUCT DISPLAY GRID */}
        <div className="w-full min-h-[70vh] flex items-center justify-center flex-wrap gap-[30px] pb-10">
          {filteredProduct.map((item, index) => (
            <Card
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collections;
