import React, { useContext, useState } from "react";
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";
import upload from "../assets/uploadImage.jpg";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../component/Loading";

function Add() {
  let [image1, setImage1] = useState(false);
  let [image2, setImage2] = useState(false);
  let [image3, setImage3] = useState(false);
  let [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("TopWear");
  const [sizes, setSizes] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [loading, setLoading] = useState(false);

  let { serverUrl } = useContext(AuthContext);

  const handleAddProduct = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestSeller", bestSeller);

      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);

      let result = await axios.post(
        `${serverUrl}/api/product/addproduct`,
        formData,
        {
          withCredentials: true, // ✅ header remove kar diya
        },
      );

      console.log(result.data);
      toast.success("Product added successfully!");
      setLoading(false);

      if (result.data) {
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubCategory("TopWear");
        setSizes([]);
        setBestSeller(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to add product!");
    }
  };

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] overflow-x-hidden relative">
      <Nav />
      <Sidebar />

      <div className="w-[82%] h-[100%] flex items-center justify-start overflow-x-hidden absolute right-0">
        <form
          onSubmit={handleAddProduct}
          className="w-[100%] md:w-[90%] h-[100%] mt-[70px] flex flex-col gap-[30px] py-[60px] px-[30px] md:px-[60px]"
        >
          <div className="w-[400px] h-[50px] text-[25px] md:text-[40px] text-white">
            Add Product Page
          </div>

          {/* Upload Images */}
          <div className="w-[80%] h-[130px] flex items-start justify-center flex-col mt-[20px] gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Upload Images
            </p>

            <div className="w-[100%] h-[100%] flex items-center justify-start">
              {[image1, image2, image3, image4].map((img, index) => (
                <label
                  key={index}
                  className="w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]"
                >
                  <img
                    src={!img ? upload : URL.createObjectURL(img)}
                    alt=""
                    className="w-[80%] h-[80%] rounded-lg shadow-2xl border-[2px]"
                  />

                  {/* ✅ FIX: name attribute add kiya */}
                  <input
                    type="file"
                    name={`image${index + 1}`}
                    hidden
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (index === 0) setImage1(file);
                      if (index === 1) setImage2(file);
                      if (index === 2) setImage3(file);
                      if (index === 3) setImage4(file);
                    }}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Name */}
          <div className="w-[80%] h-[100px] flex flex-col gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Product Name
            </p>
            <input
              type="text"
              placeholder="Type here"
              className="w-[600px] max-w-[98%] h-[40px] rounded-lg border-[2px] bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>

          {/* Description */}
          <div className="w-[80%] flex flex-col gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Product Description
            </p>
            <textarea
              placeholder="Type here"
              className="w-[600px] max-w-[98%] h-[100px] rounded-lg border-[2px] bg-slate-600 px-[20px] py-[10px] text-[18px] placeholder:text-[#ffffffc2]"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />
          </div>

          {/* Category */}
          <div className="w-[80%] flex gap-[10px] flex-wrap">
            <div className="md:w-[30%] w-[100%] flex flex-col gap-[10px]">
              <p className="text-[20px] md:text-[25px] font-semibold">
                Product Category
              </p>
              <select
                className="bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg border-[2px]"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div className="md:w-[30%] w-[100%] flex flex-col gap-[10px]">
              <p className="text-[20px] md:text-[25px] font-semibold">
                Sub-Category
              </p>
              <select
                className="bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg border-[2px]"
                onChange={(e) => setSubCategory(e.target.value)}
                value={subCategory}
              >
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="WinterWear">WinterWear</option>
              </select>
            </div>
          </div>

          {/* Price */}
          <div className="w-[80%] flex flex-col gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Product Price
            </p>
            <input
              type="number"
              placeholder="₹ 2000"
              className="w-[600px] max-w-[98%] h-[40px] rounded-lg border-[2px] bg-slate-600 px-[20px] text-[18px]"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>

          {/* Sizes */}
          <div className="w-[80%] flex flex-col gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Product Size
            </p>

            <div className="flex gap-[15px] flex-wrap">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <div
                  key={size}
                  className={`px-[20px] py-[7px] rounded-lg bg-slate-600 border-[2px] cursor-pointer ${sizes.includes(size) ? "bg-green-200 text-black" : ""
                    }`}
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes(size)
                        ? prev.filter((item) => item !== size)
                        : [...prev, size],
                    )
                  }
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* Bestseller */}
          <div className="w-[80%] flex items-center gap-[10px] mt-[20px]">
            <input
              type="checkbox"
              className="w-[25px] h-[25px]"
              onChange={() => setBestSeller((prev) => !prev)}
              checked={bestSeller}
            />
            <label className="text-[18px] md:text-[22px] font-semibold">
              Add to BestSeller
            </label>
          </div>

          <button className="w-[140px] px-[20px] py-[20px] rounded-xl bg-[#65d8f7] text-black">
            {loading ? <Loading /> : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add;
