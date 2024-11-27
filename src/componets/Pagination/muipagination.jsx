import { Box } from '@mui/material';
import { Pagination } from '@mui/material';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UpdatePageData } from '../redux/redux-file/CurrentPageData';

export default function PaginationCompo() {
  const dispatch = useDispatch();
  const allTableData = useSelector((state) => state.counterD.value); // Full table data
  const itemsPerPage = useSelector((state) => state.currentPage.itemsPerPage); // Items per page
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedData = allTableData.slice(startIndex, endIndex);
    dispatch(UpdatePageData(paginatedData));
  };

  return (
    <Box sx={{ pt: 3 }}>
      <Pagination
        count={Math.ceil(allTableData.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        color="primary"
      />
    </Box>
  );
}
