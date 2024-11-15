'use client'
import { base_Url_local, fetchData } from '@/app/api/Constant';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const CarDetail = () => {

    const [car,setCars]  = useState("");
    // const [userToken,setToken] = useState("");
    const id = useParams();
    console.log(id,"this is id");
    useEffect(()=>{
        fetchCars();
      },[])

    const getImageSrc = (imageBuffer) => {
      console.log(imageBuffer,"this is buffer")
      if (!imageBuffer) {
        return '/fallback-image.jpg'; // Return fallback image if no imageBuffer
      }
  
      if (typeof imageBuffer === 'string' && imageBuffer.startsWith('data:image')) {
        return imageBuffer; // Return if already a base64 string
      } else {
        // Convert binary buffer to base64
        const base64String = Buffer.from(imageBuffer).toString('base64');
        return `data:image/jpeg;base64,${base64String}`; // You can change the MIME type if it's not JPEG
      }
    };


    const fetchCars = async () => {
        // setLoading(true);
        try {
          const token = localStorage.getItem("user")
          const response = await fetchData(`${base_Url_local}get-cars?token=${token}&carID=${id.slug}`);
          console.log(response,"this is response");
          if (response && response.cars) {
            setCars(response.cars[0]);
          } else {
            console.log("No cars found");
          }
        } catch (error) {
          console.log("Error fetching cars:", error);
        } finally {
        //   setLoading(false);
        }
      };
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="p-8 bg-black min-h-screen text-white"
  >
    <h1 className="text-3xl font-bold mb-6">Car List</h1>
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
       <Swiper
        modules={[Navigation,  EffectCoverflow]}
        effect="coverflow"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        slidesPerView={1}
        centeredSlides
        loop={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 1,
            // spaceBetween: ,
            // pagination: {
            //   clickable: true,
            // },
          },
        }}
        navigation
        pagination={{ clickable: true }}
        className="h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px]"
      >
        {car?.images?.map((car,index) => (
          <SwiperSlide key={index}>
            <div
              className="relative flex items-center justify-center h-full w-full border shadow-xl rounded-xl cursor-pointer transition-transform duration-300 "
              // onClick={() => handleBrand(brand.name)}
            >
              <img
                src={getImageSrc(car)}
                alt={car.name}
                className="w-full h-full object-cover rounded-xl"
              />
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
            <div className="p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-white mb-2">{car?.title}</h2>
              <p className=" text-white mb-4">{car?.tags}</p>
              <p className="text-white">{car?.description}</p>
            </div>
    </motion.div>
  </motion.div>
  );
}

export default CarDetail