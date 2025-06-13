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
import DialogCategory from "./DialogCategory";
import { useDispatch, useSelector } from "react-redux";
import category from "../../../services/category";
import {
  addCategory,
  editCategory,
  removeCategory,
  setCategories,
} from "../../../store/features/categorySlice";
import dayjs from "dayjs";
import { useCateText } from "../../account/home/CateContext";
export const CategoryManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.categorySlice.cate);
  console.log(data, "kfbjf");
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
  const handleOpenCategory = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };
  const handleRemoveCategory = async (id) => {
    try {
      const res = await category.removeCate(id);
      console.log(res.data, "delete");
      if (res.status === 200) {
        console.log(res.data, "uouo");
        dispatch(removeCategory(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (item) => {
    setEdit(item);
    setIsOpen(true);
  };
  return (
    <div>
      <TableContainer>
        <div className="flex justify-end gap-3 pb-4">
          <Button variant="contained" onClick={handleOpenCategory}>
            Thêm
          </Button>
        </div>
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
                Mô tả
              </TableCell>
              <TableCell className="whitespace-nowrap p-3 text-base font-semibold text-text-sub">
                Thời gian tạo
              </TableCell>
              <TableCell className="whitespace-nowrap p-3 text-base font-semibold text-text-sub"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      {item.images ? (
                        <img src={item.images} width={100} />
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      {item.description ? item.description : "-"}
                    </TableCell>
                    <TableCell>
                      {item.createAt
                        ? dayjs(item.createAt).format("DD/MM/YYYY HH:mm")
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleRemoveCategory(item.id)}>
                        Xóa
                      </Button>
                      <Button onClick={() => handleEdit(item)}>Sửa</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <DialogCategory open={isOpen} onClose={onClose} edit={edit} />
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
  );
};
