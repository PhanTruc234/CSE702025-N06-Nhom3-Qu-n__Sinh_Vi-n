import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { formatBigNumber } from "../../../utils/format-big-number";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { Link } from "react-router-dom";
import { product } from "../../../services/product";
import { setProduct } from "../../../store/features/productSlice";
export const Product = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.productSlice.produc);
  const totalPage = data.length;
  const [formSearch, setFormSearch] = useState({
    category: "",
    name: "",
    limit: 9,
    skip: 0,
  });
  const newCate = [...new Set(data.map((item) => item.category))];
  console.log(newCate, "newcate");
  const [page, setPage] = useState(1);
  const handlePage = (e, value) => {
    console.log(value, "pageeeeee");
    setPage(value);
    const skip = (value - 1) * 9;
    setFormSearch((prev) => ({
      ...prev,
      skip,
    }));
  };
  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const res = await product.renderProductByCate(formSearch);
        console.log(res.data, "resssssssssssssss");
        if (res.status === 200) {
          dispatch(setProduct(res.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataProduct();
  }, [formSearch]);
  const handleSearch = (e) => {
    console.log(e.target.value, "oyuiyoioiu");
    const { value } = e.target;
    setFormSearch((prev) => ({
      ...prev,
      name: value,
    }));
  };
  const handleSelect = (e) => {
    console.log(e.target, "utwrewet");
    const { value } = e.target;
    setFormSearch((prev) => ({
      ...prev,
      category: value,
    }));
  };
  const handleClickReset = () => {
    setFormSearch({
      category: "",
      name: "",
    });
  };
  return (
    <>
      <div>
        <img
          src="https://sonpm283.github.io/tailwindcss-ecom/images/img_product_list_banner.webp"
          className="w-full bg-center bg-transparent"
          alt=""
        />
      </div>
      <div className="container flex gap-6 mt-10 mb-10">
        <Link className="p-6">
          <form action="">
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              value={formSearch.name}
              className="mb-4"
              onChange={handleSearch}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="demo-simple-select-label">Mặc định</InputLabel>
              <Select
                onChange={handleSelect}
                label="Mặc định"
                value={formSearch.category}
              >
                <MenuItem value="">Mặc định</MenuItem>
                {newCate.map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
          <Button variant="outlined" onClick={handleClickReset} fullWidth>
            Reset
          </Button>
        </Link>
        <div className="w-full">
          <ul className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {data &&
              data.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/product/${item.name}`}
                    style={{ animationDelay: "0.1s" }}
                    className="text-center  p-[20px] relative group cursor-pointer animate-sideLeftBox lg:h-[760px] xl:h-auto"
                  >
                    <div className="relative">
                      {item.images.slice(0, 1).map((img, index) => (
                        <div key={index}>
                          <img
                            src={img.name}
                            key={index}
                            className="w-full object-cover h-[500px]"
                          />
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
                          Deatil
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <Box className="flex justify-center mt-4">
        <Stack spacing={2}>
          <Pagination
            count={
              totalPage < 10
                ? Math.ceil(totalPage / 9)
                : Math.ceil(totalPage / 9)
            }
            value={page}
            onChange={handlePage}
          />
        </Stack>
      </Box>
    </>
  );
};
