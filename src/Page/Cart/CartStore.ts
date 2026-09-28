import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
  maxQuantity?: number; // Số lượng tồn kho tối đa (nếu có)
}

interface CartStore {
  items: CartItem[];
  openCart: boolean;
  toggleCart : () => void;
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: number, color: string, size: string) => void;
  updateQuantity: (id: number, color: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      openCart:false,
      toggleCart: () => { set({ openCart: !get().openCart });  },
      addToCart: (item) => {
        const { items } = get();
        const existingItem = items.find(
          (i) => i.id === item.id && i.color === item.color && i.size === item.size
        );

        if (existingItem) {
          // Nếu sản phẩm đã có trong giỏ, tăng số lượng
          const newQuantity = (existingItem.quantity || 0) + (item.quantity || 1);
          set({
            items: items.map((i) =>
              i.id === item.id && i.color === item.color && i.size === item.size
                ? { ...i, quantity: Math.min(newQuantity, i.maxQuantity || 999) }
                : i
            ),
          });
        } else {
          // Thêm mới sản phẩm
          set({
            items: [
              ...items,
              {
                ...item,
                quantity: item.quantity || 1,
              },
            ],
          });
        }
        if(!get().openCart) set({ openCart: !get().openCart });
      },

      removeFromCart: (id, color, size) => {
        set({
          items: get().items.filter(
            (i) => !(i.id === id && i.color === color && i.size === size)
          ),
        });
      },

      updateQuantity: (id, color, size, quantity) => {
        if (quantity <= 0) {
          // Nếu số lượng <= 0, xóa sản phẩm khỏi giỏ
          get().removeFromCart(id, color, size);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.id === id && i.color === color && i.size === size
              ? { ...i, quantity: Math.min(quantity, i.maxQuantity || 999) }
              : i
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage', // Tên key lưu trong localStorage
    }
  )
);