import React, { useState, useEffect } from 'react';

import { useQuickViewStore } from './useQuickViewStore';
import { useCartStore } from '../../Page/Cart/CartStore';
import type { Color } from '../../Page/Home/Api';
import { BASE_URL } from '../../Config';

const QuickView: React.FC = () => {
  const { isOpen, selectedProduct, closeQuickView } = useQuickViewStore();
  const addToCart = useCartStore((state) => state.addToCart);

  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeImage, setActiveImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState(false);

  // Khởi tạo data khi có sản phẩm được chọn
  useEffect(() => {
    if (selectedProduct) {
      const defaultColor = selectedProduct.Color && selectedProduct.Color.length > 0 ? selectedProduct.Color[0] : null;
      setSelectedColor(defaultColor);
      setSelectedSize('');
      setQuantity(1);
      setIsAdded(false);

      if (defaultColor && defaultColor.album) {
        setActiveImage(defaultColor.album.split(',')[0]);
      } else {
        setActiveImage(selectedProduct.Post_Thumb || '');
      }
    }
  }, [selectedProduct]);

  if (!isOpen || !selectedProduct) return null;

  // Lấy danh sách album ảnh của màu đang chọn
  const albumImages = selectedColor && selectedColor.album ? selectedColor.album.split(',').filter(Boolean) : [];

  const handleColorChange = (color: Color) => {
    setSelectedColor(color);
    setSelectedSize('');
    if (color.album) {
      setActiveImage(color.album.split(',')[0]);
    }
  };

  const handleAddToCart = () => {
    if (!selectedColor) return alert('Vui lòng chọn màu!');
    if (!selectedSize) return alert('Vui lòng chọn size!');

    addToCart({
      id: selectedProduct.id,
      name: selectedProduct.Post_Title,
      price: selectedProduct.Price,
      image: activeImage,
      color: selectedColor.Name,
      size: selectedSize,
      quantity: quantity,
      maxQuantity: 10,
    });

    setIsAdded(true);
    
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-16 bg-black/60 backdrop-blur-sm transition-opacity">
      {/* Khối nền bao quanh click ra ngoài để đóng */}
      <div className="absolute inset-0" onClick={closeQuickView}></div>

      {/* Nội dung Modal chính */}
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Nút Đóng */}
        <button 
          onClick={closeQuickView}
          className="absolute top-16 right-16 w-32 h-32 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer z-20"
        >
          ✕
        </button>

        {/* Bên trái: Slide ảnh & Thumbs */}
        <div className="w-full md:w-1/2 p-24 flex gap-16 bg-gray-50">
          {/* Các ảnh Thumbs nhỏ lướt xem */}
          {albumImages.length > 0 && (
            <div className="flex flex-col gap-8 overflow-y-auto max-h-[400px] pr-4 scrollbar-thin">
              {albumImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-50 h-65 rounded border-2 overflow-hidden transition-all bg-white ${
                    activeImage === img ? 'border-[var(--main-bg)] shadow-sm' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img src={BASE_URL + img} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          )}

          {/* Ảnh Lớn Hiển Thị */}
          <div className="flex-1 flex items-center justify-center bg-white rounded-lg border border-gray-100 p-8 shadow-inner">
            <img
              src={BASE_URL + activeImage}
              alt={selectedProduct.Post_Title}
              className="max-h-[420px] w-full object-contain rounded-md"
            />
          </div>
        </div>

        {/* Bên phải: Thông tin sản phẩm */}
        <div className="w-full md:w-1/2 p-32 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800 tracking-wide pr-24 uppercase font-serif">
              {selectedProduct.Post_Title}
            </h2>
            <div className="flex items-center gap-16 mt-8 text-xs text-gray-500">
              <span>Lượt xem: <b>{selectedProduct.View}</b></span>
              <span>•</span>
              <span className="text-green-600 font-medium">Còn hàng</span>
            </div>

            {/* Khối Giá */}
            <div className="mt-16 flex items-baseline gap-12 bg-gray-50 p-12 rounded-lg">
              <span className="text-24 font-extrabold text-red-600">${selectedProduct.Price.toFixed(2)}</span>
              {selectedProduct.Listed_Price > 0 && (
                <span className="text-sm text-gray-400 line-through">${selectedProduct.Listed_Price.toFixed(2)}</span>
              )}
            </div>

            {/* Chọn Màu */}
            {selectedProduct.Color && selectedProduct.Color.length > 0 && (
              <div className="mt-20">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-600 block mb-8">Màu sắc:</span>
                <div className="flex gap-8">
                  {selectedProduct.Color.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => handleColorChange(color)}
                      className={`px-12 py-6 rounded-full border text-xs font-medium transition-all flex items-center gap-6 cursor-pointer ${
                        selectedColor?.id === color.id
                          ? 'border-[var(--main-bg)] bg-[var(--main-bg)] text-white shadow-md'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {color.Image && (
                        <span className="w-12 h-12 rounded-full border border-black/10 inline-block" style={{ backgroundImage: `url(${BASE_URL + color.Image})`, backgroundSize: 'cover' }} />
                      )}
                      {color.Name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chọn Size */}
            <div className="mt-20">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-600 block mb-8">Kích thước:</span>
              <div className="flex flex-wrap gap-8">
                {selectedColor?.Size && selectedColor.Size.length > 0 ? (
                  selectedColor.Size.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.Name)}
                      className={`min-w-[40px] text-center px-12 py-8 rounded font-semibold text-xs tracking-wide border transition-all cursor-pointer ${
                        selectedSize === size.Name
                          ? 'bg-black text-white border-black shadow-sm'
                          : 'bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {size.Name}
                    </button>
                  ))
                ) : (
                  <span className="text-xs text-gray-400 italic">Vui lòng chọn màu để xem size</span>
                )}
              </div>
            </div>

            {/* Điều chỉnh Số lượng Qty */}
            <div className="mt-20">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-600 block mb-8">Số lượng:</span>
              <div className="flex items-center w-max border border-gray-200 rounded overflow-hidden bg-gray-50">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-12 py-6 hover:bg-gray-200 text-gray-600 font-bold transition-colors">-</button>
                <input type="text" readOnly value={quantity} className="w-40 text-center text-xs font-bold bg-transparent text-gray-800 focus:outline-none" />
                <button onClick={() => setQuantity(q => q + 1)} className="px-12 py-6 hover:bg-gray-200 text-gray-600 font-bold transition-colors">+</button>
              </div>
            </div>
          </div>

          {/* Khối Button Hành động dưới cùng */}
          <div className="mt-32 pt-16 border-t border-gray-100 flex flex-col gap-12">
            <button
              onClick={handleAddToCart}
              disabled={!selectedColor || !selectedSize}
              className={`w-full py-14 rounded-lg text-14 font-bold tracking-wider uppercase shadow-md transition-all cursor-pointer ${
                isAdded
                  ? 'bg-green-600 text-white shadow-inner'
                  : 'bg-[var(--main-bg)] text-white hover:bg-[var(--main-button-hover)] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed'
              }`}
            >
              {isAdded ? '✓ Đã thêm vào túi hàng' : 'Thêm vào giỏ hàng'}
            </button>
            <a 
              href={`/product/${selectedProduct.Post_Name}`}
              className="text-center text-xs font-semibold text-gray-500 hover:text-black underline transition-colors"
            >
              Xem chi tiết sản phẩm
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default QuickView;