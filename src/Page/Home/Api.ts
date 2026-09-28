import { BASE_URL } from "../../Config";

// --- Khai báo các Interface cho Type Safety ---
export interface Size {
  id: number;
  Name: string;
}

export interface Color {
  id: number;
  Name: string;
  Ma_Mau: string;
  Image: string;
  album: string;
  Size: Size[];
}

export interface Product {
 
  Post_Content: import("react").JSX.Element;
  id: number;
  Post_Title: string;
  Post_Name: string;
  Post_Thumb: string;
  Price: number;
  Listed_Price: number;
  Sale: number;
  View: number;
  Short_Post_Content: string;
  Color: Color[];
}

export interface CategoryData {
  tieude: string;
  data: Product[];
}


/**
 * Lấy danh sách sản phẩm theo danh mục và lọc các danh mục cần thiết
 * @param allowedTitles Mảng các tiêu đề danh mục muốn lấy (VD: ['Clothing', 'Top'])
 */
export const getCategoriesAndProducts = async (allowedTitles?: string[]): Promise<CategoryData[]> => {
  const response = await fetch(BASE_URL+'api/getcateandproduct');
  if (!response.ok) throw new Error('Không thể tải dữ liệu');
  const data: CategoryData[] = await response.json();
  
  if (allowedTitles && allowedTitles.length > 0) {
    return data.filter((item) => allowedTitles.includes(item.tieude));
  }
  return data;
};