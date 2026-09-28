import axios from 'axios';
import { BASE_URL } from '../Config';

// 1. Định nghĩa cấu trúc của từng Node item trong Menu đa cấp
export interface MenuItem {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
  image: string;
  children?: MenuItem[];
}

// 2. Interface ánh xạ 1-1 với JSON trả về từ API của bạn
export interface AppConfig {
  "Logo"?: string;
  "Số điện thoại"?: string;
  "Email (hệ thống gửi mail)"?: string;
  "menu": MenuItem[];
  "slide": string[];
  "Menu top"?: string;
  "Send to email"?: string;
  "Cate show home"?: string;
  "policy"?: string;
  "CUSTOMER SUPPORT"?: string;
  "Categories CUSTOMER SUPPORT"?: string;
  "CONTACT US"?: string;
  "CONTACT US Content"?: string;
  "Copyright"?: string;
  "Facebook"?: string;
  "Instagram"?: string;
  "Twitter"?: string;
  "Status popup"?: string;
  "Content popup"?: string;
  "Status form in popup"?: string;
  "Time show popup (1s = 1000)"?: string;
  "Address"?: string;
}

// 3. Hàm fetch API của React Query
export const fetchWebConfig = async (): Promise<AppConfig> => {
  const response = await axios.get<AppConfig>(BASE_URL+ 'api/getconfig');
  return response.data; // Trả về object phẳng đã xử lý từ Laravel
};