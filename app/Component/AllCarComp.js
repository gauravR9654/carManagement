import React, { useEffect, useState } from "react";
import {
  DeleteData,
  base_Url_local,
  fetchData,
  truncateText,
} from "../api/Constant";
import { DeleteIcon, Edit, Grid, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const CarList = () => {
  const [layout, setLayout] = useState("grid");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  // const [userToken,setToken] = useState()

  useEffect(() => {
    fetchCars();
  }, [searchTerm]);



  const fetchCars = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("user")
      const response = await fetchData(`${base_Url_local}get-cars?token=${token}&keyword=${searchTerm}`);
      if (response && response.cars) {
        setCars(response.cars);
      } else {
        console.log("No cars found");
      }
    } catch (error) {
      console.log("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("user")
      const response = await DeleteData(`${base_Url_local}delete-car?token=${token}&carID=${id}`);
      if (response) {
        console.log("Car deleted successfully");
        fetchCars(); // Refresh the car list after deletion
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) =>
    {
      router.push(`/addCars?edit=${id}`)
    }

  // Function to handle image display, convert buffer to base64 if needed
  const getImageSrc = (imageBuffer) => {
    if (!imageBuffer) {
      return "/fallback-image.jpg"; // Return fallback image if no imageBuffer
    }

    if (
      typeof imageBuffer === "string" &&
      imageBuffer.startsWith("data:image")
    ) {
      return imageBuffer; // Return if already a base64 string
    } else {
      // Convert binary buffer to base64
      const base64String = Buffer.from(imageBuffer).toString("base64");
      return `data:image/jpeg;base64,${base64String}`; // You can change the MIME type if it's not JPEG
    }
  };

  const handleRouterCreateCar = () => {
    router.push("/addCars");
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <>
      <div className="flex justify-between items-center m-10">
        <input
          type="text"
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
          placeholder="Search cars..."
          className="
            px-4 py-2 
            w-full max-w-xs
            border border-gray-300  text-black
            rounded-full 
            focus:outline-none focus:ring-2 focus:ring-blue-400
          "
        />
        <div>
          <button
            onClick={handleRouterCreateCar}
            className="
            ml-4
            px-6 py-3 
            bg-gradient-to-r from-red-500 to-purple-500 
            text-white font-semibold 
            rounded-full 
            shadow-lg 
            transform transition 
            hover:scale-105 hover:shadow-xl 
            active:scale-95 
            focus:outline-none focus:ring-4 focus:ring-blue-300
          "
          >
            Add Car
          </button>
          <button
            onClick={handleLogout}
            className="
            ml-4
            px-6 py-3 
            bg-gradient-to-r from-purple-500 to-red-500 
            text-white font-semibold 
            rounded-full 
            shadow-lg 
            transform transition 
            hover:scale-105 hover:shadow-xl 
            active:scale-95 
            focus:outline-none focus:ring-4 focus:ring-blue-300
          "
          >
            Log out
          </button>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-8  text-white"
      >
        <h1 className="text-3xl font-bold mb-6">Car List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {cars.map((car, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800 cursor-pointer rounded-lg shadow-md"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={getImageSrc(car.images[0])}
                    alt={car.title}
                    className="w-full h-full object-cover"
                    onClick={() => router.push(`/cars/${car._id}`)}
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3
                      className="text-2xl font-bold"
                      onClick={() => router.push(`/cars/${car._id}`)}
                    >
                      {car.title}
                    </h3>
                    <div className="flex gap-2">
                      <DeleteIcon
                        className="text-red-600 cursor-pointer"
                        onClick={() => handleDelete(car._id)}
                      />
                      <Edit className="text-green-600 cursor-pointer" 
                      onClick={() => handleEdit(car._id)}
                      />
                    </div>
                  </div>
                  <div onClick={() => router.push(`/cars/${car._id}`)}>
                    <p className="text-gray-300">
                      {truncateText(car.description, 100)}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 font-bold">
                      {/* {car.tags[0].map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-gray-700 text-white py-1 px-3 rounded-full"
                        >
                          {tag}
                        </span>
                      ))} */}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};

export default CarList;
