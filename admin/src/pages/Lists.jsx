import React, { useContext, useState, useEffect } from "react";
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Lists() {
  const [list, setList] = useState([]);
  const { serverUrl } = useContext(AuthContext);

  const fetchList = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/product/list`);
      // Correct property name based on your API response
      setList(result.data.product || []);
      console.log("Fetched products:", result.data);
    } catch (error) {
      console.error("Error fetching product list:", error);
      setList([]); // ensure list is empty on error
    }
  };

  const removeList = async (id) => {
    try {
      let result = await axios.delete(`${serverUrl}/api/product/remove/${id}`, {
        withCredentials: true,
      });
      if (result.data) {
        fetchList();
      } else {
        console.log("Failed to remove Product");
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  useEffect(() => {
    if (serverUrl) {
      fetchList();
    }
  }, [serverUrl]);

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white]">
      <Nav />
      <div className="w-[100%] h-[100%] flex items-center justify-start">
        <Sidebar />

        <div
          className="w-[82%] h-[100%] lg:ml-[320px] md:ml-[230px] mt-[70px] flex flex-col gap-[30px] overflow-x-hidden 
        py-[50px] ml-[100px]"
        >
          <div className="w-[400px] h-[50px] text-[28px] md:text-[40px] mb-[20px] text-white">
            All Listed Products
          </div>
          {list?.length > 0 ? (
            list.map((item, index) => (
              <div
                className="w-[90%] md:h-[120px] h-[90px] bg-slate-600 rounded-xl flex items-center justify-start gap-[5px] md:gap-[30px] p-[10px] md:px-[30px]"
                key={index}
              >
                <img
                  src={item.image1}
                  className="w-[30%] md:w-[120px] h-[90%] rounded-lg"
                  alt=""
                />

                <div className="w-[90%] h-[80%] flex flex-col items-start justify-center gap-[2px]">
                  <div className="w-[100%] md:text-[20px] text-[15px] text-[#bef0f3]">
                    {item.name}
                  </div>

                  <div className="md:text-[17px] text-[15px] text-[#bef3da]">
                    {item.category}
                  </div>

                  <div className="md:text-[17px] text-[15px] text-[#bef3da]">
                    &#8377;{item.price}
                  </div>
                </div>

                <div className="w-[10%] h-[100%] bg-transparent flex items-center justify-center">
                  <span
                    className="w-[35px] h-[30%] flex items-center justify-center rounded-md md:hover:bg-red-300 
                  md:hover:text-black cursor-pointer"
                    onClick={() => removeList(item._id)}
                  >
                    X
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-white text-lg">No products available.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Lists;
