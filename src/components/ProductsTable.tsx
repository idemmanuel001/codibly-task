import { useParameterContext } from '../context/dataContext';
import { Box, Typography, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';


const ProductsTable: React.FC = () => {

    const { error, products } = useParameterContext();

    return (
        <Box my={2} mx='auto' width='100%'>
            {/* consitionally rendering the error to the DOM */}
            {error ? <Typography variant='body1' textAlign='center' >{error}</Typography> : null}

            {/*Conditionally renders the array of products in a table */}
            {products && products.length ? (<TableContainer component={Paper} sx={{ my: 4, mx: 'auto' }}>
                <Table sx={{ width: '100%', minWidth: 500 }}>
                    <TableHead>
                        <TableRow sx={{ background: '#eee' }}>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Year</TableCell>
                        </TableRow>
                    </TableHead>


                    <TableBody>

                        {/* Renders the product array */}
                        {products.map((product) => {
                            return <TableRow key={product.id} sx={{ background: `${product.color}` }}>
                                <TableCell> {product.id} </TableCell>
                                <TableCell> {product.name} </TableCell>
                                <TableCell> {product.year} </TableCell>
                            </TableRow>;
                        })}
                    </TableBody>
                </Table>

            </TableContainer>) : null}
        </Box>
    );
};


export default ProductsTable;