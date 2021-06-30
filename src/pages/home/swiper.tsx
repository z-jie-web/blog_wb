
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"

import "./index.less";

// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

interface imgList<V> {
  [_: string]: V
}

interface ImgItem {
  src: string;
}

const imgList = [
  { src: 'https://cdn.pixabay.com/photo/2017/02/26/09/45/starry-sky-2099828__340.jpg' },
  { src: 'https://cdn.pixabay.com/photo/2017/07/18/11/07/starry-sky-2515489__340.jpg' },
  { src: 'https://cdn.pixabay.com/photo/2018/02/06/18/54/travel-3135436__340.jpg' },
  { src: 'https://cdn.pixabay.com/photo/2017/05/22/16/58/space-2334655__340.jpg' },
  { src: 'https://cdn.pixabay.com/photo/2016/01/20/14/51/earth-1151659__340.jpg' },
  { src: 'https://cdn.pixabay.com/photo/2020/06/13/17/50/milky-way-5295155__340.jpg' },
]

const Index = () => {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        // pagination={{
        //   "clickable": true
        // }}
        autoplay={{
          "delay": 2500,
          "disableOnInteraction": false
        }}
        navigation={true}
        className="mySwiper"
      >
        {imgList.map((item: ImgItem) =>
          <SwiperSlide key={item.src}>
            <img src={item.src} alt='' />
          </SwiperSlide>
        )}
      </Swiper>
    </>
  )
}

export default Index