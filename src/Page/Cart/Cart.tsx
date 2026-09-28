import React from 'react';

import { BASE_URL } from '../../Config';
import { useCartStore } from './CartStore';

// SVG Icons
const ShoppingCartIcon = ({ className = "w-20 h-20" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const XIcon = ({ className = "w-16 h-16" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const MinusIcon = ({ className = "w-12 h-12" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
);

const PlusIcon = ({ className = "w-12 h-12" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);


const Cart: React.FC = () => {
  const { items,openCart, removeFromCart, updateQuantity, toggleCart,getTotalItems, getTotalPrice } = useCartStore();

  if (!openCart) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 bg-opacity-50 z-99"
        onClick={toggleCart}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-16 border-b">
          <div className="flex items-center gap-8">
            <ShoppingCartIcon className="w-20 h-20" />
            <h2 className="text-lg font-bold">Giỏ hàng ({getTotalItems()})</h2>
          </div>
          <button
            onClick={toggleCart}
            className="p-4 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XIcon className="w-16 h-16" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-16">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <ShoppingCartIcon className="w-48 h-48 mb-16" />
              <p className="text-lg">Giỏ hàng trống</p>
            </div>
          ) : (
            <div className="space-y-16">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.color}-${item.size}`}
                  className="flex gap-12 p-12 bg-gray-50 rounded-lg"
                >
                  {/* Image */}
                  <img
                    src={BASE_URL + item.image}
                    alt={item.name}
                    className="w-60 h-60 object-cover rounded"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold line-clamp-2">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-4">
                      Màu: {item.color} | Size: {item.size}
                    </p>
                    <p className="text-sm font-bold text-red-600 mt-4">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-8 mt-8">
                      <button
                        className="p-4 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                        onClick={() =>
                          updateQuantity(item.id, item.color, item.size, item.quantity - 1)
                        }
                      >
                        <MinusIcon className="w-12 h-12" />
                      </button>
                      <span className="text-sm font-medium w-24 text-center">
                        {item.quantity}
                      </span>
                      <button
                        className="p-4 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                        onClick={() =>
                          updateQuantity(item.id, item.color, item.size, item.quantity + 1)
                        }
                      >
                        <PlusIcon className="w-12 h-12" />
                      </button>
                    </div>
                  </div>

                  {/* Remove button */}
                  <button
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    onClick={() => removeFromCart(item.id, item.color, item.size)}
                  >
                    <XIcon className="w-16 h-16" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-16">
            <div className="flex justify-between items-center mb-12">
              <span className="text-sm font-medium">Tổng cộng:</span>
              <span className="text-lg font-bold text-red-600">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>
            <button className="w-full bg-[var(--main-bg)] text-white py-8 rounded-lg font-medium hover:bg-[var(--main-button-hover)] cursor-pointer transition-colors">
              Thanh toán
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;