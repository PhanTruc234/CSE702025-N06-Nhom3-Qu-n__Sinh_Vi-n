import { useContext, useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { LayoutAccount } from "./layouts/LayoutAccount/LayoutAccount";
import { Home } from "./pages/account/home/Home";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { AdminRoute } from "./routers/AdminRoute";
import LayoutAdmin from "./layouts/LayoutAdmin/LayoutAdmin";
import { CategoryManagement } from "./pages/admin/CategotyManagement/CategoryManagement";
import { useDispatch } from "react-redux";
import category from "./services/category";
import { lengthCate, setCategories } from "./store/features/categorySlice";
import { ProductManagement } from "./pages/admin/ProductManagement/ProductManagement";
import { DialogProduct } from "./pages/admin/ProductManagement/DialogProduct";
import { product } from "./services/product";
import { setProduct } from "./store/features/productSlice";
import { useProductText } from "./pages/account/home/ProductContext";
import { DetailProduct } from "./pages/account/home/detail/DetailProduct";
import { NotFound } from "./pages/account/home/detail/NotFound";
import { CartProduct } from "./pages/account/home/cart/CartProduct";
import cart from "./services/cart";
import { setCart } from "./store/features/cartSlice";
import { Product } from "./pages/account/product/Product";
import { useCateText } from "./pages/account/home/CateContext";
import { Payment } from "./pages/account/home/cart/Payment";
import { About } from "./pages/account/about/About";
import { FormInfomation } from "./pages/account/info/FormInfomation";
import { AccountMangement } from "./pages/admin/accountMangement/AccountMangement";
function App() {
  const dispatch = useDispatch();
  const { setProductLength } = useProductText();
  const { setCategoryLength } = useCateText();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await category.renderCate();
        if (res.status === 200) {
          // dispatch(setCategories(res.data));
          setCategoryLength(res.data.length);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };
    const fetchProduct = async () => {
      try {
        const res = await product.renderProduct();
        if (res.status === 200) {
          // dispatch(setProduct(res.data));
          setProductLength(res.data.length);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };
    fetch();
    fetchProduct();
  }, [dispatch]);
  useEffect(() => {
    try {
      const render = async () => {
        const res = await cart.renderCart();
        if (res.status === 200) {
          dispatch(setCart(res.data));
        }
      };
      render();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutAccount />}>
          <Route path="" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:name" element={<DetailProduct />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<CartProduct />} />
          <Route path="/infomation" element={<FormInfomation />} />
          <Route path="/checkout" element={<Payment />} />
        </Route>
        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<LayoutAdmin />}>
            <Route path="" element={"Welcome Admin"} />
            <Route path="categories" element={<CategoryManagement />} />
            <Route path="product" element={<ProductManagement />} />
            <Route path="account" element={<AccountMangement />} />
            <Route path="product/add" element={<DialogProduct />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
