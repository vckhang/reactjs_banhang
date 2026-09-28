import React from 'react';
import QuickView from './Quickview/QuickView';


const Footer: React.FC = () => {
  
  return (
    <footer className="w-full bg-black text-white font-sans py-50">
      {/* Khối chính của Footer */}
      <div className="layout py-50 ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-40 items-start">
          
          {/* Cột 1: Logo Thương hiệu */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-[36px] font-serif tracking-[10px] text-[#8A0022] font-semibold leading-none">
              MILANA
            </h2>
            <p className="text-[9px] uppercase tracking-[5px] text-gray-500 mt-10 font-mono">
              studio wear
            </p>
          </div>

          {/* Cột 2: Customer Support */}
          <div className="flex flex-col gap-15">
            <h3 className="text-16 font-bold tracking-1 uppercase">
              CUSTOMER SUPPORT
            </h3>
            <ul className="flex flex-col gap-10 text-13 text-gray-300 font-medium">
              <li><a href="#returns" className="hover:text-white transition-colors">RETURNS POLICY</a></li>
              <li><a href="#shipping" className="hover:text-white transition-colors">SHIPPING & HANDLING</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#warranty" className="hover:text-white transition-colors">Warranty Policy</a></li>
            </ul>
          </div>

          {/* Cột 3: Contact Us */}
          <div className="flex flex-col gap-15">
            <h3 className="text-16 font-bold tracking-1 uppercase">
              CONTACT US
            </h3>
            <div className="flex flex-col gap-10 text-13 text-gray-300 font-medium">
              <p>Đặt hàng trực tuyến hoặc gọi số</p>
              <p>Hotline: <span className="text-white">0906 474 034 (8h - 21h)</span></p>
              <p>Email: <a href="mailto:vckhang.it@gmail.com" className="text-white hover:underline">vckhang.it@gmail.com</a></p>
            </div>
          </div>

          {/* Cột 4: Liên kết mạng xã hội */}
          <div className="flex flex-col gap-15 items-center md:items-start">
            <h3 className="text-16 font-bold tracking-1 uppercase">
              LIÊN KẾT
            </h3>
            <div className="flex items-center gap-12">
              {/* Facebook Icon */}
              <a href="#facebook" className="w-32 h-32 rounded-full bg-[#3b5998] flex items-center justify-center text-white shadow-md hover:opacity-90 transition-opacity">
                <span className="font-extrabold text-18 leading-none -mt-2">f</span>
              </a>
              {/* Instagram Icon */}
              <a href="#instagram" className="w-32 h-32 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white shadow-md hover:opacity-90 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-16 h-16">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Thanh bản quyền phía dưới cùng */}
      <div className="w-full border-t border-gray-900 py-20 text-center text-13 text-gray-400">
        <div className="layout px-20">
          Copyright @ 2020 by Khang Vương. All rights reservered. Powered by Khang Vương
        </div>
      </div>
      <QuickView />
    </footer>
  );
};

export default Footer;