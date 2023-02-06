import { useParameterContext } from './context/dataContext';
import { Box, Stack, TextField, Typography } from '@mui/material';
import ProductsTable from './components/ProductsTable';
import Pagination from './components/Pagination';


const App: React.FC = () => {
    const { filter, setFilter } = useParameterContext();

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        const rawValue = event.target.value;
        const numRegex = /^[0-9\b]+$/;

        if (rawValue === '' || numRegex.test(rawValue)) {
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

        <Box maxWidth="md" mx='auto' py={5} my={5} sx={{ background: '#eee' }}>
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