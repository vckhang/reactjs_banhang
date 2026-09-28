import './style.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Page/Home/Home';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import SingleProduct from './Single/Product/SingleProduct';
import ArchiveProduct from './Archive/Product/index';
import Header from './Component/Header';
import Footer from './Component/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
const AppLayout = () => (
  <>
    
    <Header />
    <Outlet /> 
    <Footer />
    <Toaster />
  </>
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // Bọc toàn bộ các trang con vào Layout chung
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ":Slug.html",
        element: <SingleProduct />,
      },
      {
        path: ":Slug",
        element: <ArchiveProduct />,
      },
    ],
  },
]);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Tắt tự động gọi lại API khi user chuyển tab (đỡ tốn tài nguyên)
      staleTime: 1000 * 60 * 10,   // Giữ dữ liệu "tươi" trong 10 phút, trong 10 phút này gọi lại trùng API sẽ lấy từ Cache luôn
    },
  },
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
