import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import { DialogProduct } from "./DialogProduct";
import {
  removeProduct,
  setEditProduct,
  setProduct,
} from "../../../store/features/productSlice";
import { product } from "../../../services/product";
import { useProductText } from "../../account/home/ProductContext";
export const ProductManagement = () => {
  const [form, setForm] = useState({
    name: "",
  });
  const dispatch = useDispatch();
  const dataProduct = useSelector((state) => state.productSlice.produc);
  const itemsPerPage = 4;
  const [page, setPage] = useState(1);
  const handlePage = (e, value) => {
    setPage(value);
    console.log(e);
  };
  const { productLength } = useProductText();
  const navigate = useNavigate();
  const handleEditProduct = (item) => {
    console.log(item, "kgkth");
    dispatch(setEditProduct(item));
    navigate("add");
  };
  const handleDelteProduct = async (item) => {
    const res = await product.deleteProduct(item);
    if (res.status === 200) {
      dispatch(removeProduct(res.data));
    }
  };
  const handleChangeText = (e) => {
    const { value } = e.target;
    setForm((prev) => ({
      ...prev,
      name: value,
    }));
  };
  const handleClickReset = () => {
    setForm((prev) => ({
      ...prev,
      name: "",
    }));
    setPage(1);
  };
  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const res = await product.renderProductByName(form);
        console.log(res.data, "resssssssssssssss");
        if (res.status === 200) {
          dispatch(setProduct(res.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataProduct();
  }, [form]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await product.renderProductPage(page, itemsPerPage);
        console.log(res.data);
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
    <div>
      <TableContainer>
        <div className="flex justify-end gap-3 pb-4 items-center">
          <TextField
            label="Tên Sản Phẩm"
            fullWidth
            required
            value={form.name}
            name="name"
            margin="normal"
            onChange={handleChangeText}
          />
          <Link to={"add"}>
            <Button variant="contained">Thêm</Button>
          </Link>
        </div>
        <Button variant="outlined" onClick={handleClickReset}>
          Reset
        </Button>
        <Divider />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="whitespace-nowrap p-3 text-base font-semibold text-text-sub">
                Tên danh mục
              </TableCell>
              <TableCell className="whitespace-nowrap p-3 text-base font-semibold text-text-sub">
                Hình ảnh
              </TableCell>
              <TableCell className="whitespace-nowrap p-3 text-base font-semibold text-text-sub">
                Thuộc tính
              </TableCell>
              <TableCell className="whitespace-nowrap p-3 text-base font-semibold text-text-sub">
                Giá
              </TableCell>
              <TableCell className="whitespace-nowrap p-3 text-base font-semibold text-text-sub">
                Số lượng
              </TableCell>
              <TableCell className="whitespace-nowrap p-3 text-base font-semibold text-text-sub">
                Mô tả
              </TableCell>
              <TableCell className="whitespace-nowrap p-3 text-base font-semibold text-text-sub">
                Thời gian tạo
              </TableCell>
              <TableCell className="whitespace-nowrap p-3 text-base font-semibold text-text-sub"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataProduct &&
              dataProduct.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      {item.images.slice(0, 1).map((img) => (
                        <img
                          key={img.id}
                          src={img.name}
                          className="w-[100px] object-cover"
                        />
                      ))}
                    </TableCell>
                    <TableCell>
                      {item.attribute.map((ele) => (
                        <div key={ele.id}>
                          {ele.title.toUpperCase()} :{" "}
                          {ele.element.map((key) => (
                            <div key={key.id}>{key.value}</div>
                          ))}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>
                      {item.price ? `$${Number(item.price).toFixed(2)}` : "-"}
                    </TableCell>
                    <TableCell>{item.quantity ? item.quantity : "-"}</TableCell>
                    <TableCell>
                      {item.description ? item.description : "-"}
                    </TableCell>
                    <TableCell>
                      {item.createdAt
                        ? dayjs(item.createdAt).format("DD/MM/YYYY HH:mm")
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleDelteProduct(item)}>
                        Xóa
                      </Button>
                      <Button onClick={() => handleEditProduct(item)}>
                        Sửa
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
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
  );
};
