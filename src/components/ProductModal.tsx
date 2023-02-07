import { useState } from 'react';
import { Box, Modal, Button, TableContainer, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useParameterContext, Product } from '../context/dataContext';
import { isAbsolute } from 'path';
import { color } from '@mui/system';


interface ModalProps {
    modalData: Product;
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const boxStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    boxShadow: 24,
    border: '2px solid #fff',
    p: 3,
};

const closeBTNStyle = {
    position: 'absolute' as 'absolute',
    top: '5px',
    right: '5px',
    p: 0

};

const ProductModal: React.FC<ModalProps> = ({ modalData, openModal, setOpenModal }) => {
    const [closeModal, setCloseModal] = useState(true);
    const { products } = useParameterContext();

    const handleModalClose = (): void => {
        setOpenModal(false);
        setCloseModal(true);
    };


    return (
        <>
            <Modal
                open={openModal}
                onClose={handleModalClose}
            >
                {modalData && (
                    <Box sx={boxStyle} bgcolor={modalData.color} >
                        <Button onClick={handleModalClose} sx={closeBTNStyle} variant='contained' color='error'>X</Button>
                        <TableContainer >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>id</TableCell>
                                        <TableCell>name</TableCell>
                                        <TableCell>year</TableCell>
                                        <TableCell>color</TableCell>
                                        <TableCell>partone_value</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    <TableRow>
                                        <TableCell>{modalData.id}</TableCell>
                                        <TableCell>{modalData.name}</TableCell>
                                        <TableCell>{modalData.color}</TableCell>
                                        <TableCell>{modalData.year}</TableCell>
                                        <TableCell>{modalData.pantone_value}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                )}
            </Modal>
        </>
    );
};

export default ProductModal;