import { Box, Button, Chip, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { product } from "../../../services/product";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  editProductNew,
  setEditProduct,
} from "../../../store/features/productSlice";
import { useNavigate } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
export const DialogProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const editProduct = useSelector((state) => state.productSlice.editProduct);
  console.log(editProduct);
  const [formProduct, setFormProduct] = useState({
    name: "",
    description: "",
    price: "",
    discout: 0,
    quantity: 1,
    category: "",
    images: [],
    attribute: [],
  });
  const [file, setFile] = useState([{ id: Date.now(), name: "" }]);
  const [attributeFile, setAttributeFile] = useState([]);
  const [attributeValues, setAttributeValues] = useState({});
  const [value, setValue] = useState("");
  const handleAddImage = () => {
    setFile([...file, { id: Date.now(), name: "" }]);
  };
  const handleChangeImage = (id, value) => {
    setFile((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name: value } : item))
    );
  };
  const handleRemoveImage = (item) => {
    setFile((prev) => prev.filter((ele) => ele.id !== item.id));
  };
  const handleChangeAttribute = (e) => {
    const { value } = e.target;
    setValue(value);
  };
  const handleAddAttribute = (e) => {
    e.preventDefault();
    if (value.trim() !== "") {
      setAttributeFile([
        ...attributeFile,
        { id: Date.now(), title: value, element: [] },
      ]);
    }
    setValue("");
  };
  const handleItemAttribute = (e, item) => {
    const { value } = e.target;
    setAttributeValues((prev) => ({
      ...prev,
      [item.id]: value,
    }));
  };
  const handleChangeText = (e) => {
    const { name, value } = e.target;
    setFormProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleKeyDownAttribute = (e, item) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const inputValue = attributeValues[item.id]?.trim();
      if (inputValue) {
        setAttributeFile((prev) =>
          prev.map((attr) =>
            attr.id === item.id
              ? {
                  ...attr,
                  element: [
                    ...attr.element,
                    { id: Date.now(), value: inputValue },
                  ],
                }
              : attr
          )
        );
        setAttributeValues((prev) => ({
          ...prev,
          [item.id]: "",
        }));
      }
    }
  };
  const handleRemoveAttribute = (item) => {
    setAttributeFile((prev) => prev.filter((ele) => ele.id !== item.id));
  };
  const handleDeleteElement = (k) => {
    setAttributeFile((prev) =>
      prev.map((item) => ({
        ...item,
        element: item.element.filter((ele) => ele.id !== k.id),
      }))
    );
  };
  useEffect(() => {
    if (editProduct) {
      setFormProduct({
        name: editProduct.name || "",
        description: editProduct.description || "",
        price: editProduct.price || "",
        discout: editProduct.discout || 0,
        quantity: editProduct.quantity || 1,
        category: editProduct.category || "",
        images: editProduct.images || [],
        attribute: editProduct.attribute || [],
        createdAt: editProduct.createdAt || new Date().toISOString(),
      });
      setFile(
        editProduct.images?.length > 0
          ? editProduct.images
          : [{ id: Date.now().toString(), name: "" }]
      );
      setAttributeFile(editProduct.attribute || []);
    } else {
      setFormProduct({
        name: "",
        description: "",
        price: "",
        discout: 0,
        quantity: 1,
        category: "",
        images: [],
        attribute: [],
      });
      setFile([{ id: Date.now(), name: "" }]);
      setAttributeFile([]);
      setLoading(false);
    }
  }, [editProduct]);
  console.log(formProduct, "formproductmmmm");
  useEffect(() => {
    setFormProduct((prev) => ({
      ...prev,
      images: file,
      attribute: attributeFile,
    }));
    setValue("");
  }, [file, attributeFile]);
  const handleSubmitProduct = async () => {
    setLoading(true);
    try {
      let res;
      if (editProduct) {
        res = await product.editProduct({
          ...formProduct,
          id: editProduct.id,
          createdAt: new Date().toISOString(),
        });
        if (res.status === 200) {
          dispatch(editProductNew(res.data));
        }
      } else {
        res = await product.fetchProduct({
          ...formProduct,
          createdAt: new Date().toISOString(),
        });
        if (res.status === 201) {
          dispatch(addProduct(res.data));
        }
      }
      dispatch(setEditProduct(null));
      setFormProduct({
        name: "",
        description: "",
        price: "",
        discout: 0,
        quantity: 1,
        category: "",
        images: [],
        attribute: [],
        createdAt: new Date().toISOString(),
      });
      setFile([{ id: Date.now().toString(), name: "" }]);
      setAttributeFile([]);
      setAttributeValues({});
      setValue("");
      navigate("/admin/product");
    } catch (error) {
      console.log("Lỗi khi lưu sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Box>
        <TextField
          label="Tên Sản Phẩm"
          fullWidth
          required
          name="name"
          value={formProduct.name}
          margin="normal"
          onChange={handleChangeText}
        />
        <TextField
          label="Mô tả"
          fullWidth
          required
          value={formProduct.description}
          name="description"
          margin="normal"
          size="medium"
          onChange={handleChangeText}
          rows={4}
        />
        <TextField
          label="Giá"
          fullWidth
          required
          name="price"
          value={formProduct.price}
          margin="normal"
          onChange={handleChangeText}
        />
        <TextField
          label="Phần trăm"
          fullWidth
          required
          name="discout"
          margin="normal"
          value={formProduct.discout}
          onChange={handleChangeText}
        />
        <TextField
          label="Số lượng"
          fullWidth
          required
          name="quantity"
          margin="normal"
          value={formProduct.quantity}
          onChange={handleChangeText}
        />
        <TextField
          label="Danh mục"
          fullWidth
          required
          name="category"
          onChange={handleChangeText}
          margin="normal"
          value={formProduct.category}
        />
        <p>Ảnh sản phẩm</p>
        {file.map((item, index) => (
          <div key={index} className="flex items-center">
            <TextField
              label={`Hình ảnh ${index + 1}`}
              fullWidth
              required
              name="images"
              value={item.name}
              margin="normal"
              onChange={(e) => handleChangeImage(item.id, e.target.value)}
            />
            <IconButton
              aria-label="delete"
              onClick={() => handleRemoveImage(item)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
        <Button onClick={handleAddImage} variant="outlined">
          Thêm ảnh
        </Button>
        <p>Thuộc tính</p>
        <form className="flex items-center gap-3" onSubmit={handleAddAttribute}>
          <TextField
            label="Tên thuộc tính(VD: color.."
            name="attribute"
            margin="normal"
            value={value}
            onChange={handleChangeAttribute}
          />
          <Button type="submit" variant="outlined">
            Thêm thuộc tính
          </Button>
        </form>
        <div>
          {attributeFile.map((item, index) => (
            <div key={item.id}>
              <span>{item.title}</span>
              <div className="flex items-center">
                <TextField
                  label={`Thêm ${item.title}`}
                  name={item.title}
                  margin="normal"
                  value={attributeValues[item.id]}
                  onChange={(e) => handleItemAttribute(e, item)}
                  onKeyDown={(e) => handleKeyDownAttribute(e, item)}
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => handleRemoveAttribute(item)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
        <div className="w-14 flex">
          {attributeFile.map((item) => (
            <div key={item.id}>
              {item.element.map((ele) => (
                <Chip
                  label={ele.value}
                  key={ele.id}
                  onDelete={() => handleDeleteElement(ele)}
                />
              ))}
            </div>
          ))}
        </div>
        <Button
          color="secondary"
          loading={loading}
          loadingPosition="start"
          fullWidth
          startIcon={<SaveIcon />}
          variant="contained"
          autoFocus
          onClick={handleSubmitProduct}
        >
          Save
        </Button>
      </Box>
    </div>
  );
};
