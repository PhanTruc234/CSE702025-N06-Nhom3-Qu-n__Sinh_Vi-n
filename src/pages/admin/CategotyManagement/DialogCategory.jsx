import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import category from "../../../services/category";
import { useDispatch } from "react-redux";
import SaveIcon from "@mui/icons-material/Save";
import {
  addCategory,
  editCategory,
} from "../../../store/features/categorySlice";
import { toast } from "react-toastify";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function DialogCategory({ open, onClose, edit }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [formCategory, setFormCategory] = React.useState({
    name: "",
    slug: "",
    description: "",
    images: "",
  });
  const handleClose = () => {
    onClose();
    setLoading(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormCategory({
      ...formCategory,
      [name]: value,
      createAt: new Date().toISOString(),
    });
  };
  const handleSubmit = async () => {
    setLoading(true);
    if (edit) {
      const res = await category.editCate({ ...formCategory, id: edit.id });
      console.log(res.data, "edit");
      if (res.status === 200) {
        dispatch(editCategory(res.data));
        toast.success("Sửa thành công");
        onClose();
      }
    } else {
      const res = await category.fetchCategory(formCategory);
      console.log(res, "categoryresss");
      if (res.status === 201) {
        dispatch(addCategory(res.data));
        toast.success("Thêm thành công");
        onClose();
      }
    }
    setFormCategory({
      name: "",
      slug: "",
      description: "",
      images: "",
    });
  };
  React.useEffect(() => {
    setLoading(false);
    if (edit) {
      setFormCategory({
        name: edit.name,
        slug: edit.slug,
        description: edit.description,
        images: edit.images,
      });
    } else {
      setFormCategory({
        name: "",
        slug: "",
        description: "",
        images: "",
      });
    }
  }, [edit]);
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Thêm Danh Mục
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <TextField
            label="Tên danh mục"
            fullWidth
            name="name"
            required
            margin="norm"
            value={formCategory.name}
            onChange={handleChange}
          />
          <TextField
            label="Slug"
            fullWidth
            name="slug"
            required
            margin="normal"
            value={formCategory.slug}
            onChange={handleChange}
          />
          <TextField
            label="Mô tả"
            fullWidth
            name="description"
            required
            margin="normal"
            value={formCategory.description}
            onChange={handleChange}
          />
          <TextField
            label="Link ảnh"
            fullWidth
            name="images"
            required
            margin="normal"
            value={formCategory.images}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            autoFocus
            onClick={handleSubmit}
          >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
