import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";
import { useProductText } from "./ProductContext";
export default function BasicPagination() {
  const { productLength } = useProductText();
  console.log(productLength, "productLenght");
  return (
    <Box className="flex justify-center mt-4">
      <Stack spacing={2}>
        <Pagination
          count={
            productLength < 5 ? productLength : Math.ceil(productLength / 5)
          }
        />
      </Stack>
    </Box>
  );
}
