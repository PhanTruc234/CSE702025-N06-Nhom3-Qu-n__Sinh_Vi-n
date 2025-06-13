import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import BasicPagination from "./Pagination";
import category from "../../../services/category";
import { useProductText } from "./ProductContext";
import { Box } from "@mui/material";
import { setCart } from "../../../store/features/cartSlice";
import { useCateText } from "./CateContext";
import { setCategories } from "../../../store/features/categorySlice";
import { useState } from "react";
import { useEffect } from "react";

export const ViewCategory = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.categorySlice.cate);
  //   const categoryLength = data.length;

  const itemsPerPage = 3;
  const [page, setPage] = useState(1);
  const { categoryLength } = useCateText();
  console.log(categoryLength, "productLengthproductLength");
  const handlePage = (e, value) => {
    console.log(value, "flfbmkfbnfbf");
    setPage(value);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await category.renderCatePage(page, itemsPerPage);
        if (res.status === 200) {
          dispatch(setCategories(res.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [page]);
  return (
    <section className="mt-8 lg:mt-24">
      <div className="container relative">
        <div>
          <h2 className="text-[30px] font-bold">Các Danh Mục Sản Phẩm</h2>
        </div>
        <ul className="mt-10 md:grid grid-cols-3 gap-10 cursor-pointer">
          {data.map((item) => (
            <li
              key={item.id}
              className="relative overflow-hidden group rounded-[20px] animate-sideLeftBox"
            >
              <a href="#">
                <div>
                  <img
                    className="w-full block object-cover hover:scale-110 hover:duration-300 transition-all"
                    src={item.images}
                    alt={item.name}
                  />
                </div>
                <div>
                  <button
                    type="button"
                    className="bg-white text-black absolute -bottom-[100px] left-1/2 -translate-x-1/2 group-hover:bottom-[50px] transition-all hover:duration-500 h-9 px-7 rounded-full hover:bg-black hover:text-white font-semibold"
                  >
                    {item.name}
                  </button>
                </div>
              </a>
            </li>
          ))}
        </ul>
        <Box className="flex justify-center mt-4">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(categoryLength / 3)}
              page={page}
              onChange={handlePage}
            />
          </Stack>
        </Box>
      </div>
    </section>
  );
};
