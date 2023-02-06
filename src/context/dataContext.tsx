import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';


interface Product {
    id: string;
    name: string;
    year: string;
    color?: string;
    pantone_value?: string;
}


interface Parameters {
    perPage: number;
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    totalNoOfPages: number;
    setTotalNoOfPages: React.Dispatch<React.SetStateAction<number>>;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

//solves the error: (property children does not exist on ReactNode)
interface CartProviderProps {
    children?: React.ReactNode;
}


const ParametersContext = createContext<Parameters>({
    perPage: 0,
    currentPage: 1,
    setCurrentPage: (): void => { },
    totalNoOfPages: 3,
    setTotalNoOfPages: (): void => { },
    filter: '',
    setFilter: (): void => { },
    error: '',
    setError: (): void => { },
    products: [],
    setProducts: (): void => { },
});


const ContextProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [perPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNoOfPages, setTotalNoOfPages] = useState(3);
    const [filter, setFilter] = useState<string>('');
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>('');

    useEffect(() => {
        const API_url = `https://reqres.in/api/products?per_page=${perPage}${filter ? `&id=${filter}` : ''}&page=${currentPage}`;

        async function fetchData() {
            try {
                const response = await axios.get(API_url);

                if (response.status >= 200 && response.status < 300) {
                    setTotalNoOfPages(response.data.total_pages);
                    setProducts(response.data.data);

                    //set the filtered product data into an array because it returns a single object instaed of an array of objects
                    if (filter) {
                        setProducts([response.data.data]);
                    }

                } else {
                    throw new Error(response.data.message);
                }
            } catch (err: any) {
                setError(err.message);
            }
        }

        fetchData();
    }, [currentPage, filter, perPage, setProducts, setTotalNoOfPages, error, setError]);



    useEffect(() => {

        //Reflect the pagination and filter in the url
        const updateURL = (): void => {
            const queryParams = new URLSearchParams(window.location.search);
            queryParams.set("currentPage", currentPage.toString());

            if (filter !== '') {
                queryParams.set('filter', filter);
            }

            window.history.pushState({}, "", `${window.location.pathname}?${queryParams.toString()}`);
            console.log(window.location);
        };

        updateURL();
    }, [filter, currentPage]);



    return (
        <ParametersContext.Provider value={{ perPage, currentPage, setCurrentPage, totalNoOfPages, setTotalNoOfPages, filter, setFilter, error, setError, products, setProducts }}>
            {children}
        </ParametersContext.Provider>
    );
};

export default ContextProvider;

export const useParameterContext = () => useContext(ParametersContext);