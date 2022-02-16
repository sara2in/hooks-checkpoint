import * as React from 'react';
import { useReducer, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    p: 4,
    height: '50vh',
    display: 'inline-flex',
    justifyContent: 'center',
};

export default function ProductCard(props) {
    const [open, setOpen] = React.useState(false);
    const [endOfImg, setEndOfImg] = React.useState(0);
    const [productImage, setProductImage] = React.useState('');
    const [productThumbnail, setProductThumbnail] = React.useState('');

    const handleOpen = (id) => {
        photoCall(id)
        setOpen(true)
    };

    const handleClose = () => {
        state.count = 0
        setOpen(false)
    }

    function photoCall(id) {
        let url = `http://52.26.193.201:3000/products/${id}/styles/`
        fetch(url)
            .then((response) => response.json())
            .then((res) => {
                setProductThumbnail(res.results[0].photos[0].url)
                setEndOfImg(res.results[0].photos.length)
                setProductImage(res.results[0].photos[state.count].url)
            })
            .catch((err) => {
                // setError("No Products Found");
            });
    }

    const initialState = { count: 0 };

    function reducer(state, action) {
        switch (action.type) {
            case 'increment':
                if (state.count < endOfImg - 1) {
                    return { count: state.count + 1 };
                } else {
                    return { count: state.count };
                }
            case 'decrement':
                if (state.count > 0) {
                    return { count: state.count - 1 };
                } else {
                    return { count: state.count };
                }
            default:
                throw new Error();
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        photoCall(props.productInfo.id)
    }, [state.count])

    return (
        <Card>
            <CardActionArea sx={{ height: 1, flexDirection: 'column'  }} onClick={e => { handleOpen(props.productInfo.id) }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={productThumbnail ? productThumbnail : 'https://media.istockphoto.com/vectors/cross-sign-red-hand-drawn-brush-paint-x-letter-handwritten-crisscross-vector-id1276735653?k=20&m=1276735653&s=612x612&w=0&h=jMkY-27H5JC4Dt9Vlq4PurAJo9AFNQ9-sJPmLcixtlU='}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.productInfo.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.productInfo.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <ArrowBackIosNewIcon fontSize="large" sx={{ alignSelf: 'center' }} onClick={() => dispatch({ type: 'decrement' })} />
                        <CardMedia
                            component="img"
                            image={productImage ? productImage : 'https://media.istockphoto.com/vectors/cross-sign-red-hand-drawn-brush-paint-x-letter-handwritten-crisscross-vector-id1276735653?k=20&m=1276735653&s=612x612&w=0&h=jMkY-27H5JC4Dt9Vlq4PurAJo9AFNQ9-sJPmLcixtlU='}
                            alt="Some Model"
                        />
                        <ArrowForwardIosIcon fontSize="large" sx={{ alignSelf: 'center' }} onClick={() => dispatch({ type: 'increment' })} />
                    </Box>
                </Modal>
            </div>
        </Card>
    );
}