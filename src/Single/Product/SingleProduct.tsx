import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { BASE_URL } from '../../Config';
import type { Color, Product } from '../../Page/Home/Api';
import { useCartStore } from '../../Page/Cart/CartStore';
import { SingleProductApi } from './SingleProductApi';
import ProductCard from '../../Component/ProductCard';


const SingleProduct: React.FC = () => {
  const { Slug } = useParams<{ Slug: string }>();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeImage, setActiveImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const addToCart = useCartStore((state) => state.addToCart);

  // Fetch dữ liệu sản phẩm khi postName thay đổi
  useEffect(() => {
    const getProduct = async () => {
      if (!Slug) return;
      setLoading(true);
      const data = await SingleProductApi(Slug);
       console.log(data);
      if (data) {
       
        setProduct(data);
        // Thiết lập các thuộc tính mặc định ban đầu
        const defaultColor = data.Color && data.Color.length > 0 ? data.Color[0] : null;
        setSelectedColor(defaultColor);
        setSelectedSize('');
        setQuantity(1);
        setIsAdded(false);

        if (defaultColor && defaultColor.album) {
          setActiveImage(defaultColor.album.split(',')[0]);
        } else {
          setActiveImage(data.Post_Thumb ? data.Post_Thumb.split(',')[0] : '');
        }
      } else {
        setProduct(null);
      }
      setLoading(false);
    };

    getProduct();
  }, [Slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--main-bg)]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-16">
        <p className="text-gray-500 font-medium">Không tìm thấy sản phẩm yêu cầu.</p>
        <Link to="/" className="px-20 py-10 bg-black text-white rounded-md text-sm uppercase">Quay lại trang chủ</Link>
      </div>
    );
  }

  const albumImages = selectedColor && selectedColor.album ? selectedColor.album.split(',').filter(Boolean) : [];

  const handleColorChange = (color: Color) => {
    setSelectedColor(color);
    setSelectedSize('');
    if (color.album) {
      setActiveImage(color.album.split(',')[0]);
    }
  };

  const handleAddToCart = () => {
    if (!selectedColor) {
      toast.error('Vui lòng chọn màu sắc!');
      return;
    }
    if (!selectedSize) {
      toast.error('Vui lòng chọn kích thước!');
      return;
    }

    addToCart({
      id: product.id,
      name: product.Post_Title,
      price: product.Price,
      image: activeImage,
      color: selectedColor.Name,
      size: selectedSize,
      quantity: quantity,
      maxQuantity: 10,
    });

    setIsAdded(true);
    toast.success('Đã thêm vào giỏ hàng');
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-16 py-32 md:py-48">
      {/* Khối Chi Tiết Sản Phẩm Chính */}
      <div className="flex flex-col md:flex-row gap-32 lg:gap-48 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 p-16 md:p-32">
        
        {/* Bên trái: Album hình ảnh */}
        <div className="w-full md:w-1/2 flex gap-16">
          {albumImages.length > 0 && (
            <div className="flex flex-col gap-8 overflow-y-auto max-h-[500px] pr-4 scrollbar-thin">
              {albumImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-60 h-80 rounded border-2 overflow-hidden flex-shrink-0 transition-all bg-white ${
                    activeImage === img ? 'border-[var(--main-bg)] shadow-sm' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img src={BASE_URL + img} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          )}

          <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100 p-16 shadow-inner">
            <img
              src={BASE_URL + activeImage}
              alt={product.Post_Title}
              className="max-h-[500px] w-full object-contain rounded-md transition-all duration-300"
            />
          </div>
        </div>

        {/* Bên phải: Form thông tin & đặt hàng */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-wide uppercase font-serif">
              {product.Post_Title}
            </h1>
            
            <div className="flex items-center gap-16 mt-12 text-sm text-gray-500">
              <span>Lượt xem: <b>{product.View}</b></span>
              <span>•</span>
              <span className="text-green-600 font-medium">Tình trạng: Còn hàng</span>
            </div>

            {/* Khối hiển thị Giá tiền */}
            <div className="mt-20 flex items-baseline gap-16 bg-gray-50 p-16 rounded-lg">
              <span className="text-3xl font-extrabold text-red-600">${product.Price.toFixed(2)}</span>
              {product.Listed_Price > 0 && (
                <span className="text-base text-gray-400 line-through">${product.Listed_Price.toFixed(2)}</span>
              )}
              {product.Sale > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs font-bold px-8 py-4 rounded">
                  -{product.Sale}%
                </span>
              )}
            </div>

            {/* Khối Nội Dung Ngắn (Short Post Content) */}
            {product.Short_Post_Content && (
              <div className="mt-24 text-sm text-gray-600 leading-relaxed border-l-4 border-gray-200 pl-12 italic">
                {product.Short_Post_Content}
              </div>
            )}

            {/* Chọn Màu Sắc */}
            {product.Color && product.Color.length > 0 && (
              <div className="mt-24">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-600 block mb-8">Màu sắc:</span>
                <div className="flex flex-wrap gap-8">
                  {product.Color.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => handleColorChange(color)}
                      className={`px-16 py-8 rounded-full border text-xs font-medium transition-all flex items-center gap-8 cursor-pointer ${
                        selectedColor?.id === color.id
                          ? 'border-[var(--main-bg)] bg-[var(--main-bg)] text-white shadow-md'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {color.Image && (
                        <span className="w-16 h-16 rounded-full border border-black/10 inline-block" style={{ backgroundImage: `url(${BASE_URL + color.Image})`, backgroundSize: 'cover' }} />
                      )}
                      {color.Name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chọn Kích Thước (Size) */}
            <div className="mt-24">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-600 block mb-8">Kích thước:</span>
              <div className="flex flex-wrap gap-8">
                {selectedColor?.Size && selectedColor.Size.length > 0 ? (
                  selectedColor.Size.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.Name)}
                      className={`min-w-[48px] text-center px-12 py-10 rounded font-semibold text-xs tracking-wide border transition-all cursor-pointer ${
                        selectedSize === size.Name
                          ? 'bg-black text-white border-black shadow-sm'
                          : 'bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {size.Name}
                    </button>
                  ))
                ) : (
                  <span className="text-xs text-gray-400 italic">Vui lòng chọn màu để hiển thị danh sách size thích hợp</span>
                )}
              </div>
            </div>

            {/* Điều chỉnh số lượng mua */}
            <div className="mt-24">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-600 block mb-8">Số lượng:</span>
              <div className="flex items-center w-max border border-gray-200 rounded overflow-hidden bg-gray-50">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-16 py-8 hover:bg-gray-200 text-gray-600 font-bold transition-colors">-</button>
                <input type="text" readOnly value={quantity} className="w-48 text-center text-xs font-bold bg-transparent text-gray-800 focus:outline-none" />
                <button onClick={() => setQuantity(q => q + 1)} className="px-16 py-8 hover:bg-gray-200 text-gray-600 font-bold transition-colors">+</button>
              </div>
            </div>
          </div>

          {/* Nút hành động Add to cart */}
          <div className="mt-32 pt-24 border-t border-gray-100">
            <button
              onClick={handleAddToCart}
              disabled={!selectedColor || !selectedSize}
              className={`w-full py-16 rounded-lg text-sm font-bold tracking-wider uppercase shadow-md transition-all cursor-pointer ${
                isAdded
                  ? 'bg-green-600 text-white shadow-inner'
                  : 'bg-[var(--main-bg)] text-white hover:bg-[var(--main-button-hover)] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed'
              }`}
            >
              {isAdded ? '✓ Đã thêm vào túi hàng' : 'Thêm vào giỏ hàng'}
            </button>
          </div>

        </div>
      </div>

      {/* Khối Thông tin chi tiết sản phẩm bài viết (Post Content) */}
      {product.Post_Content && (
        <div className="mt-48 bg-white border border-gray-100 rounded-xl p-24 md:p-32 shadow-sm">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-200 pb-12 mb-24 text-gray-800 font-serif">
            Chi tiết sản phẩm
          </h2>
          <div 
            className="prose max-w-none text-sm text-gray-700 leading-relaxed gap-y-12 flex flex-col"
            dangerouslySetInnerHTML={{ __html: product.Post_Content }}
          />
        </div>
      )}

      {/* Khối Sản phẩm liên quan (Related Products) */}
        {product && 'relatedproducts' in product && (product as any).relatedproducts?.length > 0 && (
        <div className="mt-64 related-products-slider">
            <h2 className="text-xl font-bold uppercase tracking-wider text-gray-800 font-serif mb-24">
            Sản phẩm tương tự
            </h2>
            
            <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24} // Khoảng cách gap-24 giữa các sản phẩm
            slidesPerView={1}  // Mặc định trên mobile hiện 1 sản phẩm
            navigation={true}  // Hiện nút Next/Prev
          
            breakpoints={{
                // Khi màn hình >= 640px (sm)
                640: {
                slidesPerView: 2,
                },
                // Khi màn hình >= 768px (md)
                768: {
                slidesPerView: 3,
                },
                // Khi màn hình >= 1024px (lg)
                1024: {
                slidesPerView: 4,
                },
            }}
            className="pb-32" // Tạo khoảng trống bên dưới để không bị đè lên các chấm pagination
            >
            {(product as any).relatedproducts.map((relatedProd: any) => (
                <SwiperSlide key={relatedProd.id}>
                {/* Đảm bảo chiều cao full để các card đều nhau */}
                <div className="h-full pb-8"> 
                    <ProductCard product={relatedProd} />
                </div>
                </SwiperSlide>
            ))}
            </Swiper>
        </div>
        )}
    </div>
  );
};

export default SingleProduct;