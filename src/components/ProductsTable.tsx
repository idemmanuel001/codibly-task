import { useState } from 'react';
import { useParameterContext, Product } from '../context/dataContext';
import { Box, Typography, TableContainer, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import ProductModal from './ProductModal';


const ProductsTable: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState({
        id: '',
        name: '',
        year: ''
    });
    const { error, products } = useParameterContext();


    const handleModalClick = (item: Product): void => {
        setOpenModal(true);
        setModalData(item);
    };


    return (
        <Box my={2} mx='auto' width='100%'>
            {/* consitionally rendering the error to the DOM */}
            {error ? <Typography variant='body1' textAlign='center' >{error}</Typography> : null}

            {/*Conditionally renders the array of products in a table */}
            {products && products.length ? (<TableContainer sx={{ my: 4, mx: 'auto' }}>
                <Table sx={{ width: '100%', minWidth: 500 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Year</TableCell>
                        </TableRow>
                    </TableHead>


                    <TableBody>

                        {/* Renders the product array */}
                        {products.map((product) => {
                            return <TableRow onClick={() => handleModalClick(product)} key={product.id} sx={{ background: `${product.color}` }}>
                                <TableCell> {product.id} </TableCell>
                                <TableCell> {product.name} </TableCell>
                                <TableCell> {product.year} </TableCell>
                            </TableRow>;
                        })}
                    </TableBody>
                </Table>

            </TableContainer>) : null}

            <ProductModal modalData={modalData} openModal={openModal} setOpenModal={setOpenModal} />
        </Box>
    );
};


export default ProductsTable;