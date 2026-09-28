import { BASE_URL } from "../../Config";
import type { Product } from "../../Page/Home/Api";

export interface ProductDetailResponse {
  data: Product[];
}

export const SingleProductApi = async (postName: string): Promise<Product | null> => {
  try {
    const response = await fetch(`${BASE_URL}api/getproductdetail2/${postName}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result: ProductDetailResponse[] = await response.json();
    if (result && result.length > 0 && result[0].data && result[0].data.length > 0) {
      return result[0].data[0]; 
    }
    return null;
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
};