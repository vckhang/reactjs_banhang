import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchWebConfig , type MenuItem} from '../Api/ConfigApi';
import Slide from './Slide';
import { useCartStore } from '../Page/Cart/CartStore';
import Cart from '../Page/Cart/Cart';
import { Link } from 'react-router-dom';
const Header: React.FC = () => {
    const { data: config, isLoading } = useQuery({
        queryKey: ['webConfig'],
        queryFn: fetchWebConfig,
    });
    const menuItems: MenuItem[] = config?.menu || [];
    const {  getTotalItems,toggleCart } = useCartStore();
    
  return (
    <header className="w-full font-sans bg-white ">
      {/* 1. TOPBAR (Thanh màu đỏ đô trên cùng) */}
      <div className="w-full bg-[#8A0022] text-white text-14 py-8 px-20">
        <div className="layout flex flex-col sm:flex-row justify-between items-center gap-10">
          
          {/* Số điện thoại bên trái */}
          <div className="flex items-center gap-8 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-16 h-16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.622s.577-1.213 1.5-2.216c.83-.9 1.956-1.4 3.097-1.4h.013c.516 0 1.02.134 1.464.388l2.673 1.545c.95.548 1.465 1.583 1.221 2.645l-.478 2.083c-.23 1.002.146 2.05.952 2.684l2.4 1.888m-11.332-9.59a10.515 10.515 0 0 0-5.5 5.5m5.5-5.5H2.25m3.328 11.16a10.515 10.515 0 0 1-5.5-5.5m5.5 5.5H12" />
            </svg>
            <span>{isLoading ? 'Loading...' : config?.["Số điện thoại"] || '090.64.74.034'}</span>
          </div>

          {/* Nhóm chức năng bên phải */}
          <div className="flex items-center gap-24">
            <div className="flex items-center gap-16 border-r border-white/20 pr-16">
              <a href="#faq" className="hover:text-gray-200 transition-colors">FAQ</a>
              <a href="#contact" className="hover:text-gray-200 transition-colors">Contact</a>
            </div>
            
            <div className="flex items-center gap-16">
              <div className="flex items-center gap-4">
                <a href="#login" className="hover:text-gray-200 transition-colors">Log in</a>
                <span>|</span>
                <a href="#register" className="hover:text-gray-200 transition-colors">Register</a>
              </div>
              
              {/* Icon Trái tim (Yêu thích) */}
              <a href="#wishlist" className="hover:text-gray-200 transition-colors mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-16 h-16 text-white">
                  <path d="M11.645 20.91l-.007-.003-.003-.001a11.54 11.54 0 01-3.836-2.504 12.112 12.112 0 01-3.237-4.321C3.605 12.19 3.5 10.966 3.5 9.75c0-2.83 2.165-5.055 4.814-5.055a4.87 4.87 0 013.84 1.933l.096.124.096-.124a4.87 4.87 0 013.84-1.933c2.65 0 4.814 2.225 4.814 5.055 0 1.217-.105 2.44-.105 2.44A12.112 12.112 0 0116.2 14.082a11.54 11.54 0 01-3.836 2.504l-.003.001-.007.003-.03.014-.03-.014z" />
                </svg>
              </a>

              {/* Icon Giỏ hàng kèm badge số 0 */}
              <a onClick={toggleCart} className="flex items-center gap-4 relative hover:text-gray-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-18 h-18">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                </svg>
                <span className="absolute -top-6 -right-8 bg-white text-[#8A0022] text-11 font-bold w-15 h-15 rounded-full flex items-center justify-center border border-[#8A0022]">
                  {getTotalItems()}
                </span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 2. MAIN HEADER (Logo, Thanh tìm kiếm, Mạng xã hội) */}
      <div className="w-full py-20 px-20">
        <div className="layout flex flex-col md:flex-row justify-between items-center gap-20">
          
          {/* Khối Logo bên trái */}
          <div className="text-center md:text-left">
            
            <h1 className="text-[36px] text-center font-serif tracking-[10px] text-[#8A0022] font-semibold leading-none">
              <Link to={'/'}>MILANA</Link>
            </h1>
            <p className="text-[9px] text- text-center uppercase tracking-[5px] text-gray-500 mt-5 font-mono">
              studio wear
            </p>
          </div>

          {/* Ô Tìm kiếm ở giữa */}
          <div className="w-full max-w-500 relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full border border-gray-300 rounded-full pl-20 pr-40 py-8 text-14 focus:outline-none focus:border-[#8A0022] focus:ring-1 focus:ring-[#8A0022] transition-all bg-gray-50/50"
            />
            <div className="absolute right-15 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-16 h-16">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.603 10.601z" />
              </svg>
            </div>
          </div>

          {/* Khối Mạng xã hội bên phải */}
          <div className="flex items-center gap-12">
            {/* Facebook Button */}
            <a href="#facebook" className="w-32 h-32 rounded-full bg-[#3b5998] flex items-center justify-center text-white shadow-sm hover:opacity-90 transition-opacity">
              <span className="font-extrabold text-18 leading-none -mt-2">f</span>
            </a>
            {/* Instagram Button */}
            <a href="#instagram" className="w-32 h-32 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white shadow-sm hover:opacity-90 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-16 h-16">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>

        </div>
      </div>
      {/* 1. THANH MENU ĐIỀU HƯỚNG CHÍNH */}
      <div className="w-full ">
        <div className="layout mx-auto flex items-center gap-15 ">
          
          {/* KHỐI NÚT CATEGORIES CỐ ĐỊNH HOẶC THẢ XUỐNG */}
          <div className="relative w-[240px] flex-shrink-0 z-50">
            <div className="bg-[#8A0022] text-white font-medium text-14 uppercase px-15 py-12 flex items-center gap-10 cursor-pointer">
              <svg className="w-18 h-18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
              <span>Categories</span>
            </div>

            {/* Danh sách Menu Cha (Cấp 1) hiển thị dọc bên trái */}
            <div className="absolute left-0 top-full w-full bg-white border border-gray-200 border-t-0 flex flex-col shadow-md">
              {isLoading ? (
                <div className="p-15 text-13 text-gray-400">Loading...</div>
              ) : (
                menuItems.map((item) => (
                  /* Thêm class group để khi hover vào Menu cha này thì bảng con ngay bên trong nó mới hiển thị */
                  <div
                    key={item.id}
                    className="group px-15 py-12 text-13 font-bold uppercase tracking-wide text-gray-800 hover:bg-[#FAF7F2] hover:text-[#8A0022] cursor-pointer transition-colors border-b border-gray-50 last:border-b-0"
                  >
                    <Link to={"/"+item.slug}>
                    {item.name}</Link>

                    {/* BẢNG MEGA MENU ĐỔ CON CẤP 2 VÀ CẤP 3 SANG BÊN PHẢI (Ẩn mặc định, hiện khi group-hover) */}
                    {item.children && item.children.length > 0 && (
                      <div className="hidden group-hover:grid absolute left-[100%] top-0 bg-white border border-gray-200 shadow-xl p-25 min-h-full w-[900px] grid-cols-4 gap-x-20 gap-y-30 text-gray-800 normal-case cursor-default">
                        {item.children.map((cap2) => (
                          <div key={cap2.id} className="flex flex-col gap-10">
                            {/* Danh mục Cấp 2 đóng vai trò là Tiêu Đề Cột (Chữ Đỏ In Hoa) */}
                            <h4 className="text-12 font-extrabold text-[#8A0022] uppercase tracking-wider pb-5 border-b border-gray-100">
                              {cap2.name}
                            </h4>
                            
                            {/* Danh mục Cấp 3 liệt kê dọc bên dưới danh mục cấp 2 tương ứng */}
                            <ul className="flex flex-col gap-8">
                              {cap2.children?.map((cap3) => (
                                <li key={cap3.id}>
                                  <Link to={"/"+cap3.slug} className="text-12 font-medium text-gray-600 hover:text-[#8A0022] transition-colors uppercase block">
                                  
                                    {cap3.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* CÁC NÚT BẤM CHÍNH SÁCH CHẠY NGANG (BÊN PHẢI NÚT CATEGORIES) */}
          <div className="flex items-center gap-10 overflow-x-auto py-10 no-scrollbar justify-between w-[calc(100%-240px)]">
            <a href="#shipping" className="border w-12/12 text-center border-gray-400 rounded-4 px-20 py-8 text-12 font-medium uppercase tracking-wider text-gray-800 hover:bg-gray-50 whitespace-nowrap">
              Shipping & Handling
            </a>
            <a href="#returns" className="border w-12/12 text-center border-gray-400 rounded-4 px-20 py-8 text-12 font-medium uppercase tracking-wider text-gray-800 hover:bg-gray-50 whitespace-nowrap">
              Returns Policy
            </a>
            <a href="#privacy" className="border w-12/12 text-center border-gray-400 rounded-4 px-20 py-8 text-12 font-medium uppercase tracking-wider text-gray-800 hover:bg-gray-50 whitespace-nowrap">
              Privacy Policy
            </a>
            <a href="#warranty" className="border w-12/12 text-center border-gray-400 rounded-4 px-20 py-8 text-12 font-medium uppercase tracking-wider text-gray-800 hover:bg-gray-50 whitespace-nowrap">
              Warranty Policy
            </a>
          </div>

        </div>
      </div>
      <Slide />
      <Cart />
    </header>
  );
};

export default Header;