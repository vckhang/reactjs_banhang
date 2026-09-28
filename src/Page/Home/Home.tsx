import { useQuery } from '@tanstack/react-query';
import { getCategoriesAndProducts } from './Api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductCard from '../../Component/ProductCard';

// --- Component Home ---
export default function Home() {
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categoriesAndProducts', ['Clothing', 'Top']],
    queryFn: () => getCategoriesAndProducts(['Clothing', 'Top']),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <div className="p-32 text-center text-gray-500 font-medium">Đang tải sản phẩm...</div>;
  }

  if (error) {
    return <div className="p-32 text-center text-red-500 font-medium">Lỗi: {(error as Error).message}</div>;
  }

  return (
    <div className="layout mx-auto px-16 py-32">
      {categories?.map((category) => (
        <div key={category.tieude} className="mb-24">
          <h2 className="text-2xl font-bold uppercase tracking-wider text-gray-800 mb-24 pb-8 border-b-2 border-gray-200">
            {category.tieude}
          </h2>

          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={20}
            slidesPerView={2}
            navigation
            
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 24 },
            }}
          >
            {category.data.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
     
    </div>
  );
}