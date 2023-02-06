import React, { useState, useContext } from 'react';
import { useParameterContext } from './context/dataContext';
import { Box, Stack, TextField, Typography } from '@mui/material';
import ProductsTable from './components/ProductsTable';
import Pagination from './components/Pagination';
//import { useHistory, useLocation } from "react-router-dom";


const App: React.FC = () => {
    const { filter, setFilter } = useParameterContext();

    // const history = useHistory();
    // const location = useLocation();

    // const queryParams = new URLSearchParams(location.search)
    // const handleFilter = (value: string) => {
    //     setInputValue(value);
    //     const filtered = products.filter(product => product.id === value);
    //     setFilteredProducts(filtered);
    //     const queryParams = new URLSearchParams();
    //     queryParams.set("id", value);
    //     history.push({
    //         search: queryParams.toString()
    //     });
    // };

    // const handlePageChange = (page: number) => {
    //     setCurrentPage(page);
    //     const queryParams = new URLSearchParams(location.search);
    //     queryParams.set("page", page.toString());
    //     history.push({
    //         search: queryParams.toString()
    //     });
    // };



    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>): void => {

        const rawValue = event.target.value;
        const numRegex = /^[0-9\b]+$/;

        if (rawValue === '' || numRegex.test(rawValue)) {
            event.preventDefault();
            const numValue = +rawValue;

            if (numValue > 0 && numValue < 12) {
                const stringvalue = numValue.toString();
                setFilter(stringvalue);
            } else {
                setFilter('');
            }

        }

    };

    return (

        <Box maxWidth="md" mx='auto' py={2} my={5} sx={{ background: '#eee' }}>
            <Stack direction='column' spacing={4} alignItems='center' justifyContent='center' >
                <Typography variant='h2' textAlign='center' > Products</Typography>
                <TextField
                    type='text'
                    id="filter"
                    label="filter by id"
                    helperText="Please enter a valid product id"
                    variant="outlined"
                    maxRows={1}
                    onChange={handleFilterChange}
                    value={filter}
                    sx={{ width: "100%", maxWidth: '255px' }}
                />

                <ProductsTable />
                <Pagination />
            </Stack>


        </Box>
    );
};


export default App;