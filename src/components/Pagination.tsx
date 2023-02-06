import React, { useEffect } from 'react';
import { Pagination as MUIPagination } from '@mui/material';
import { useParameterContext } from '../context/dataContext';



const Pagination = () => {
    const { currentPage, setCurrentPage, totalNoOfPages, products } = useParameterContext();

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            {products.length > 0 && <MUIPagination count={totalNoOfPages} variant="outlined" shape='rounded' color='primary' page={currentPage} onChange={handlePageChange} />}
        </>
    );
};

export default Pagination;