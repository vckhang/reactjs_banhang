import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchWebConfig } from '../Api/ConfigApi';
import { BASE_URL } from '../Config';

// 1. Import Swiper React components và styles chuẩn công nghiệp
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Slide: React.FC = () => {
  const { data: config, isLoading } = useQuery({
    queryKey: ['webConfig'],
    queryFn: fetchWebConfig,
  });

  const slideImages: string[] = config?.slide || [];

  if (isLoading) {
    return <div className="layout mx-auto h-[300px] bg-gray-100 flex items-center justify-center text-gray-400">Đang tải slide...</div>;
  }

  return (
    <div className="w-full bg-white pt-10 pb-40">
      <div className="layout mx-auto px-15">
        <div className="flex gap-20">
          
          {/* Khối trống bên trái giữ khoảng cách 240px */}
          <div className="w-[240px] flex-shrink-0 hidden md:block"></div>
          
          {/* Khối hiển thị Slider ảnh bằng Swiper */}
          <div className="flex-1 overflow-hidden rounded-4 border border-gray-100 shadow-sm">
            {slideImages.length > 0 ? (
              
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="w-full"
              >
                {slideImages.map((imageUrl, index) => (
                  <SwiperSlide key={index}>
                    <img 
                      src={imageUrl.startsWith('http') ? imageUrl : `${BASE_URL}${imageUrl}`} 
                      alt={`Banner Slide ${index + 1}`} 
                      className="w-full  object-cover h-[300px]"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

            ) : (
              <div className="w-full h-[450px] bg-gray-200 flex items-center justify-center text-gray-400">
                Không tìm thấy ảnh slide banner.
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Slide;