import ProductCard from './ProductCard'
import { useContext } from "react";
import AppContext from "../contexts/AppContext";
import Box from '@mui/material/Box';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function ProductList() {
    const { list } = useContext(AppContext);
    let mapedList = list.map((product, index) => {
        return (<ProductCard key={index} productInfo={product}/>)
    })
    return(
        <ImageList sx={{ width: 1, height: 1}} cols={3} rowHeight={164}>
            {mapedList}
        </ImageList>
    )
    
}