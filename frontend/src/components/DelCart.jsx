import * as React from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Axios from "../config/axios"
import DeleteIcon from '@mui/icons-material/Delete';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: window.innerWidth<=500?200:400,
  bgcolor: 'background.paper',
  border: '2px solid #A8DADC',
  boxShadow: 24,
  p: 4,
};

export const DelCart = ({userId, productId}) => {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick =async (event) =>{
    await Axios.delCart(userId, productId);
    window.location.reload()
  } 

  return (
    <div>
      <Button variant='outline' onClick={handleOpen}><DeleteIcon/></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            delete product from your cart
          </Typography>
          <div className="mb-3"></div>
          <Typography id="modal-modal-description" variant="p" component="p">
            Confirm to delete
          </Typography>
          <div className="mb-3"></div>
          <Button variant='contained' color='secondary' onClick={()=>{setOpen(false)}} >cancel</Button> {" "}
          <Button variant='contained' onClick={(e)=>{handleClick(e)}}>confirm</Button>
          <div className="mb"></div>
        </Box>
      </Modal>
    </div>
  );
}