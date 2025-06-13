import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { styled } from "@mui/material/styles";
import auth from "../../../services/auth";
import { Login } from "@mui/icons-material";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const generateRandomPassword = (length = 8) => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const AccountMangement = () => {
  const [account, setAccount] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const handleClose = () => {
    setOpen(false);
    setUsername("");
  };
  const handleSave = async () => {
    setLoading(true);
    const email = `${username}@gmail.com`;
    const password = generateRandomPassword();
    const role = "USER";
    const k = {
      name: username,
      email,
      password,
      role,
    };
    try {
      const res = await auth.authRegister(k);
      if (res.status === 201) {
        alert(`Tạo thành công:\nEmail: ${email}\nMật khẩu: ${password}`);
        setUsername("");
        fetchUsers();
        setOpen(false);
      }
    } catch (error) {
      console.error("Đăng ký thất bại:", error);
      alert("Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveUser = async (id) => {
    try {
      const res = await auth.removeUser(id);
      if (res.status === 200) {
        alert("Xóa thành công");
        fetchUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUsers = async () => {
    try {
      const res = await auth.renderUser();
      if (res.status === 200) {
        setAccount(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  console.log(account, "llllllll");
  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        style={{ margin: "16px 0" }}
      >
        Thêm tài khoản
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Thêm Tài Khoản
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
            label="Tên đăng nhập"
            fullWidth
            name="username"
            required
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={handleSave}
            disabled={loading || username.trim() === ""}
            startIcon={<SaveIcon />}
            variant="contained"
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="whitespace-nowrap p-3 text-base font-semibold text-text-sub">
              Tên đăng nhập
            </TableCell>
            <TableCell className="whitespace-nowrap p-3 text-base font-semibold text-text-sub">
              Email
            </TableCell>
            <TableCell className="whitespace-nowrap p-3 text-base font-semibold text-text-sub">
              Password
            </TableCell>
            <TableCell className="whitespace-nowrap p-3 text-base font-semibold text-text-sub">
              Role
            </TableCell>
            <TableCell className="whitespace-nowrap p-3 text-base font-semibold text-text-sub">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {account &&
            account.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.password}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>
                  <Button onClick={() => handleRemoveUser(item.id)}>Xóa</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};
