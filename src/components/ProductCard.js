import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    justifyContent: 'center'
};

export default function ProductCard(props) {
    const [open, setOpen] = React.useState(false);
    const [productImage, setProductImage] = React.useState('');

    const handleOpen = (id) => {


        let url = `http://52.26.193.201:3000/products/${id}/styles/`
        fetch(url)
            .then((response) => response.json())
            .then((res) => {
                console.log('test')
                console.log('photo:', res.results[0].photos[0].thumbnail_url)
                setProductImage(res.results[0].photos[0].thumbnail_url)
            })
            .catch((err) => {
                // setError("No Products Found");
            });
        setOpen(true)
    };
    const handleClose = () => setOpen(false);

    return (
        <Card>
            <CardActionArea>
                {/* <CardMedia
            component="img"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
            /> */}
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
                <Button onClick={e => { handleOpen(props.productInfo.id) }}>Open modal</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <CardMedia
                            component="img"
                            image={productImage}
                            alt="Some Model"
                        />
                    </Box>
                </Modal>
            </div>
        </Card>
    );
}