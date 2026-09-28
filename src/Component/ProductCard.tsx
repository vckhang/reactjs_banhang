import React, { useState } from 'react';
import { useCartStore } from '../Page/Cart/CartStore';
import type { Color, Product } from '../Page/Home/Api';
import { useQuickViewStore } from './Quickview/useQuickViewStore';
import { BASE_URL } from '../Config';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState<Color | null>(
    product.Color && product.Color.length > 0 ? product.Color[0] : null
  );
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isAdded, setIsAdded] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);
  const openQuickView = useQuickViewStore((state) => state.openQuickView); // Khai báo hàm mở modal

  const getCurrentImage = (): string => {
    if (selectedColor && selectedColor.album) {
      const firstImage = selectedColor.album.split(',')[0];
      if (firstImage) return firstImage;
    }
    return product.Post_Thumb || 'https://via.placeholder.com/400x500?text=No+Image';
  };

  const currentImage = getCurrentImage();
  const sizes = selectedColor?.Size || [];

  const handleColorClick = (color: Color) => {
    setSelectedColor(color);
    setSelectedSize('');
    setIsAdded(false);
  };

  const handleSizeClick = (sizeName: string) => {
    setSelectedSize(sizeName);
    setIsAdded(false);
  };

  const handleAddToCart = () => {
    if (!selectedColor) {
    toast.error('Vui lòng chọn màu sắc', {
      duration: 2000,
      position: 'bottom-center',
      style: {
        background: '#EF4444',
        color: '#fff',
        padding: '12px 24px',
      },
    });
    return;
  }
  if (!selectedSize) {
    toast.error('Vui lòng chọn kích thước', {
      duration: 2000,
      position: 'bottom-center',
      style: {
        background: '#EF4444',
        color: '#fff',
        padding: '12px 24px',
      },
    });
    return;
  }

    addToCart({
      id: product.id,
      name: product.Post_Title,
      price: product.Price,
      image: currentImage,
      color: selectedColor.Name,
      size: selectedSize,
      maxQuantity: 10,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="group relative flex flex-col bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden h-full">
      {product.Sale > 0 && (
        <span className="absolute top-12 left-12 bg-red-500 text-white text-xs font-bold px-10 py-4 rounded z-10">
          -{product.Sale}%
        </span>
      )}

      {/* Vùng Ảnh + Nút QuickView khi Hover */}
      <div className="relative aspect-w-3 aspect-h-4 bg-gray-100 overflow-hidden group-hover:opacity-95 transition-all">
        <img
          src={BASE_URL + currentImage}
          alt={product.Post_Title}
          className="w-full h-[400px] object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Lớp overlay đen mờ nhẹ + Nút QuickView mượt mà */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={() => openQuickView(product)}
            className="translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white text-gray-900 font-medium text-13 tracking-wider uppercase px-20 py-10 rounded-full shadow-lg hover:bg-black hover:text-white cursor-pointer"
          >
            Quick View
          </button>
        </div>
      </div>

      <div className="p-16 flex flex-col flex-grow">
        <h3 className="text-sm font-semibold text-gray-700 min-h-[40px] line-clamp-2 hover:text-[var(--main-button-hover)]">
          <Link to={"/"+product.Post_Name+".html"}>{product.Post_Title}</Link>
         
        </h3>

        {/* Màu sắc */}
        {product.Color && product.Color.length > 0 && (
          <div className="flex items-center gap-8 mt-8">
            <span className="text-xs text-gray-500">Màu:</span>
            <div className="flex gap-6">
              {product.Color.map((color) => (
                <button
                  key={color.id}
                  className={`w-15 h-15 rounded-full border-2 transition-all ${
                    selectedColor?.id === color.id
                      ? 'border-[var(--main-bg)] text-white hover:border-[var(--main-button-hover)] cursor-pointer'
                      : 'border-gray-300 hover:border-gray-500'
                  }`}
                  style={{
                    backgroundImage: color.Image ? `url(${BASE_URL + color.Image})` : undefined,
                    backgroundColor: color.Image ? undefined : '#ccc',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  title={color.Name}
                  onClick={() => handleColorClick(color)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Size */}
        {sizes.length > 0 ? (
          <div className="flex items-center gap-8 mt-8">
            <span className="text-xs text-gray-500">Size:</span>
            <div className="flex flex-wrap gap-6">
              {sizes.map((size) => (
                <button
                  key={size.id}
                  className={`text-xs font-medium px-6 py-2 rounded transition-all ${
                    selectedSize === size.Name
                      ? 'bg-[var(--main-bg)] text-white hover:bg-[var(--main-button-hover)] cursor-pointer'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => handleSizeClick(size.Name)}
                >
                  {size.Name}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-8 mt-8">
            <span className="text-xs text-gray-500">Size:</span>
            <span className="text-xs text-gray-400">Không có size</span>
          </div>
        )}

        <p className="text-xs text-gray-400 mt-4">Lượt xem: {product.View}</p>
        <div className="mt-12 flex items-baseline gap-8">
          <span className="text-base font-bold text-red-600">${product.Price.toFixed(2)}</span>
          {product.Listed_Price > 0 && (
            <span className="text-sm text-gray-400 line-through">${product.Listed_Price.toFixed(2)}</span>
          )}
        </div>

        <button
          className={`mt-12 w-full py-8 px-16 rounded-lg font-medium transition-all ${
            isAdded
              ? 'bg-green-500 text-white'
              : 'bg-[var(--main-bg)] text-white hover:bg-[var(--main-button-hover)] cursor-pointer'
          }`}
          onClick={handleAddToCart}
          
        >
          {isAdded ? '✓ Đã thêm' : 'Thêm vào giỏ'}
        </button>
        
      </div>
    </div>
  );
};

export default ProductCard;