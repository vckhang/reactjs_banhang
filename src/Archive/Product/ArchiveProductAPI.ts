import { BASE_URL } from '../../Config';

// --- Interfaces ---
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
  id: number;
  users_id: number;
  Post_Title: string;
  Post_Status: number;
  Post_Name: string;
  Post_Thumb: string;
  Price: number;
  Listed_Price: number;
  Sale: number;
  View: number;
  Short_Post_Content: string;
  Post_Content: import("react").JSX.Element;
  Post_Sizing: string;
  Post_Returns: string | null;
  Post_Shiping: string | null;
  Title: string | null;
  Desription: string | null;
  Keyword: string | null;
  Post_Type: string;
  lang: number;
  brands_id: number;
  created_at: string;
  updated_at: string;
  Color: Color[];

}
export interface FilterOption {
  id: number;
  name: string;
}
export interface CategoryDetailResponse {
  tieude: string;
  data: Product[];
  count: number;
  available_colors : FilterOption[];
  available_sizes : FilterOption[];
}

export interface FilterParams {
  id: string | number;
  from?: number;
  to?: number;
  color?: string;
  size?: string;
  start?: number;
  limit?: number;
}

/**
 * Lấy chi tiết danh mục với filter
 * @param params - Tham số filter
 * @returns Promise<CategoryDetailResponse>
 */
export const getCategoryDetail = async (params: FilterParams): Promise<CategoryDetailResponse> => {
  const {
    id,
    from,
    to,
    color,
    size,
    start = 0,
    limit = 5,
  } = params;

  // Xây dựng query string
  let queryParams = '';

  // Filter theo khoảng giá
  if (from !== undefined && to !== undefined && to > 0) {
    queryParams += `&price=${from},${to}`;
  }

  // Filter theo màu
  if (color !== undefined && color !== '') {
    queryParams += `&colors=${color}`;
  }

  // Filter theo size
  if (size !== undefined && size !== '') {
    queryParams += `&sizes=${size}`;
  }

  // Pagination
  queryParams += `&start=${start}&limit=${limit}`;

  // Tạo URL
  const url = `${BASE_URL}api/getcatedetail_by_name/${id}?a=b${queryParams}`;

  console.log('Fetching category detail:', url);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Không thể tải dữ liệu: ${response.status}`);
    }

    const [data]: CategoryDetailResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching category detail:', error);
    throw error;
  }
};

/**
 * Lấy sản phẩm theo danh mục với filter (trả về dạng raw)
 */
export const getCategoryDetailRaw = async (params: FilterParams): Promise<Response> => {
  const {
    id,
    from,
    to,
    color,
    size,
    start = 0,
    limit = 5,
  } = params;

  let queryParams = '';

  if (from !== undefined && to !== undefined && to > 0) {
    queryParams += `&price=${from},${to}`;
  }

  if (color !== undefined && color !== '') {
    queryParams += `&colors=${color}`;
  }

  if (size !== undefined && size !== '') {
    queryParams += `&sizes=${size}`;
  }

  queryParams += `&start=${start}&limit=${limit}`;

  const url = `${BASE_URL}getcatedetail/${id}?a=b${queryParams}`;
  //console.log('Fetching category detail (raw):', url);

  return fetch(url);
};

/**
 * Lấy tất cả sản phẩm của danh mục (không giới hạn)
 */
export const getAllProductsByCategory = async (id: string | number): Promise<Product[]> => {
  let allProducts: Product[] = [];
  let currentStart = 0;
  const limit = 50; // Lấy 50 sản phẩm mỗi lần
  let hasMore = true;

  try {
    while (hasMore) {
      const response = await getCategoryDetail({
        id,
        start: currentStart,
        limit,
      });

      if (response.data && response.data.length > 0) {
        allProducts = [...allProducts, ...response.data];
        currentStart += limit;

        // Nếu số lượng sản phẩm lấy được ít hơn limit, dừng vòng lặp
        if (response.data.length < limit) {
          hasMore = false;
        }
      } else {
        hasMore = false;
      }
    }

    return allProducts;
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw error;
  }
};



/**
 * Lấy khoảng giá của sản phẩm trong danh mục
 */
export const getPriceRange = async (id: string | number): Promise<{ min: number; max: number }> => {
  try {
    const response = await getCategoryDetail({
      id,
      limit: 1,
    });

    let min = Infinity;
    let max = -Infinity;

    if (response.data && response.data.length > 0) {
      response.data.forEach((product) => {
        const price = product.Price;
        if (price < min) min = price;
        if (price > max) max = price;
      });
    }

    return {
      min: min === Infinity ? 0 : min,
      max: max === -Infinity ? 0 : max,
    };
  } catch (error) {
    console.error('Error fetching price range:', error);
    return { min: 0, max: 0 };
  }
};

/**
 * Tạo URL filter cho category
 */
export const buildCategoryFilterUrl = (params: FilterParams): string => {
  const {
    id,
    from,
    to,
    color,
    size,
    start = 0,
    limit = 5,
  } = params;

  let queryParams = '';

  if (from !== undefined && to !== undefined && to > 0) {
    queryParams += `&price=${from},${to}`;
  }

  if (color !== undefined && color !== '') {
    queryParams += `&colors=${color}`;
  }

  if (size !== undefined && size !== '') {
    queryParams += `&sizes=${size}`;
  }

  queryParams += `&start=${start}&limit=${limit}`;

  return `${BASE_URL}getcatedetail/${id}?a=b${queryParams}`;
};

// --- Hook React Query ---
import { useQuery } from '@tanstack/react-query';

/**
 * Hook sử dụng React Query để lấy dữ liệu danh mục
 */
export const useCategoryDetail = (params: FilterParams, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['categoryDetail', params.id, params.from, params.to, params.color, params.size, params.start, params.limit],
    queryFn: () => getCategoryDetail(params),
    enabled: enabled && !!params.id,
    staleTime: 1000 * 60 * 5, // 5 phút
  });
};

/**
 * Hook lấy tất cả sản phẩm của danh mục
 */
export const useAllProductsByCategory = (id: string | number, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['allProducts', id],
    queryFn: () => getAllProductsByCategory(id),
    enabled: enabled && !!id,
    staleTime: 1000 * 60 * 10, // 10 phút
  });
};