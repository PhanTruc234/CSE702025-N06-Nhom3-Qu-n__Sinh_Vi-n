import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

export const FormInfomation = () => {
  const [formData, setFormData] = useState({
    hoTen: "",
    soDienThoai: "",
    diaChi: "",
  });
  const [edit, setEdit] = useState(false);
  const [k, setK] = useState(null);
  useEffect(() => {
    const savedInfo = JSON.parse(localStorage.getItem("info"));
    if (savedInfo) {
      setFormData(savedInfo);
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleEditInfo = () => {
    setEdit(true);
    const editInfo = JSON.parse(localStorage.getItem("info"));
    if (editInfo) {
      setFormData({
        hoTen: editInfo.hoTen,
        soDienThoai: editInfo.soDienThoai,
        diaChi: editInfo.diaChi,
      });
    } else {
      alert("Chưa có thông tin để sửa");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setEdit(false);
    console.log("Dữ liệu đã gửi:", formData);
    alert("Gửi thông tin thành công!");
    localStorage.setItem("info", JSON.stringify(formData));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Điền thông tin cá nhân
        </Typography>
        <Box
          component="form"
          noValidate
          required
          autoComplete="off"
          onSubmit={handleSubmit}
          disabled={!edit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Họ và tên"
            variant="outlined"
            name="hoTen"
            value={formData.hoTen}
            onChange={handleChange}
            required
            disabled={!edit}
          />
          <TextField
            label="Số điện thoại"
            variant="outlined"
            name="soDienThoai"
            value={formData.soDienThoai}
            onChange={handleChange}
            required
            disabled={!edit}
            inputProps={{ pattern: "[0-9]{10,11}" }}
            placeholder="Ví dụ: 0901234567"
          />
          <TextField
            label="Địa chỉ nhà"
            variant="outlined"
            name="diaChi"
            value={formData.diaChi}
            disabled={!edit}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            {edit ? "Cập nhật thông tin" : "Gửi thông tin"}
          </Button>
        </Box>
        <Button
          type="button"
          variant="contained"
          color="primary"
          fullWidth
          className="inline-block mt-2"
          onClick={handleEditInfo}
        >
          sửa
        </Button>
      </Paper>
    </Container>
  );
};
