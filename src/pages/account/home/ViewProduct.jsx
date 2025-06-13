import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";
import { useProductText } from "./ProductContext";
import { useEffect, useState } from "react";
import { product } from "../../../services/product";
import { setProduct } from "../../../store/features/productSlice";
import { Link } from "react-router-dom";
import { addCart } from "../../../store/features/cartSlice";
import { formatBigNumber } from "../../../utils/format-big-number";
export const ViewProduct = () => {
  const dataProduct = useSelector((state) => state.productSlice.produc);
  const dispatch = useDispatch();
  const itemsPerPage = 4;
  const [page, setPage] = useState(1);
  const { productLength } = useProductText();
  const [cartValue, setCartValue] = useState(null);
  const handlePage = (e, value) => {
    setPage(value);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await product.renderProductPage(page, itemsPerPage);
        if (res.status === 200) {
          dispatch(setProduct(res.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [page]);
  return (
    <section className="pt-16 pb-8 bg-grayxx">
      <div className="container">
        <div className="lg:flex justify-between items-end">
          <div>
            <h2 className="text-[30px] font-bold">Hàng Mới Về</h2>
            <p className="font-semibold mt-3">
              Trải nghiệm những sản phẩm tốt nhất tại cửa hàng của chúng tôi!
            </p>
          </div>
          <div>
            <Link
              to={"/product"}
              type="button"
              className="text-black border-[1px] border-black rounded-full px-7 py-2 font-bold hover:bg-black hover:text-white hover:transition-all hover:duration-500"
            >
              Xem Tất Cả
            </Link>
          </div>
        </div>
        <ul className="mt-8 lg:grid grid-cols-4 gap-4">
          {dataProduct &&
            dataProduct.map((item) => (
              <Link to={`/product/${item.name}`} key={item.id}>
                <li
                  key={item.id}
                  className="relative group cursor-pointer animate-sideLeftBox"
                  style={{ animationDelay: "0.1s" }}
                >
                  <span>
                    <div className="rounded-[20px] overflow-hidden">
                      {item.images.slice(0, 1).map((img) => (
                        <div className="relative" key={img.id}>
                          <img key={img.id} src={img.name} />
                          <span className="absolute top-5 left-5 bg-[#DD0000] inline-block p-2 rounded-[20px] text-white">
                            -{item.discout}%
                          </span>
                        </div>
                      ))}
                    </div>
                    <ul className="flex justify-center gap-[5px] mt-5">
                      <li>
                        <img
                          className="image size-[13px]"
                          src="/src/assets/ico_star_active.png"
                          alt=""
                        />
                      </li>
                      <li>
                        <img
                          className="image size-[13px]"
                          src="/src/assets/ico_star_active.png"
                          alt=""
                        />
                      </li>
                      <li>
                        <img
                          className="image size-[13px]"
                          src="/src/assets/ico_star_active.png"
                          alt=""
                        />
                      </li>
                      <li>
                        <img
                          className="image size-[13px]"
                          src="/src/assets/ico_star_active.png"
                          alt=""
                        />
                      </li>
                      <li>
                        <img
                          className="image size-[13px]"
                          src="/src/assets/ico_star_gray.png"
                          alt=""
                        />
                      </li>
                    </ul>
                    <ul className="absolute top-[150px] flex flex-col gap-2 left-5">
                      <li className="bg-white py-2 px-2 rounded-full translate-y-5 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                        <span>
                          <img
                            className="image size-5"
                            src="/src/assets/ico_heart.png"
                            alt=""
                          />
                        </span>
                      </li>
                      <li className="bg-white py-2 px-2 rounded-full translate-y-5 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all delay-100">
                        <span>
                          <img
                            className="image size-5"
                            src="/src/assets/ico_reload.png"
                            alt=""
                          />
                        </span>
                      </li>
                      <li className="bg-white py-2 px-2 rounded-full translate-y-5 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all delay-200">
                        <span>
                          <img
                            className="image size-5"
                            src="/src/assets/ico_search.png"
                            alt=""
                          />
                        </span>
                      </li>
                    </ul>
                    <div className="text-center relative z-10 mt-3">
                      <h3>{item.name}</h3>
                    </div>
                    <div className="text-center mt-2 relative h-5 overflow-hidden">
                      <div className="inline-flex flex-col absolute -bottom-5 group-hover:bottom-0 transition-all -translate-x-1/2">
                        <span className="text-[15px] font-bold">
                          <span className="mr-2 line-through text-[#666666]">
                            {formatBigNumber(item.price, true)}
                          </span>
                          <span>
                            {formatBigNumber(
                              (item.price * item.discout) / 100,
                              true
                            )}
                          </span>
                        </span>
                        <span className="tracking-widest text-xs uppercase relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black hover:after:w-full">
                          Chi tiết
                        </span>
                      </div>
                    </div>
                  </span>
                </li>
              </Link>
            ))}
        </ul>
        <Box className="flex justify-center mt-4">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(productLength / itemsPerPage)}
              page={page}
              onChange={handlePage}
            />
          </Stack>
        </Box>
      </div>
    </section>
  );
};
