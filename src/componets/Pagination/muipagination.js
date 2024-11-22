import { Box } from "@mui/material";
import { Pagination } from "@mui/material";

export default function PaginationCompo({ countPage }) {
  return (
    <Box sx={{ pt: 3 }}>
      <Pagination
        count={countPage}
        variant="outlined"
        shape="rounded"
        color="primary"
      />
    </Box>
  );
}
