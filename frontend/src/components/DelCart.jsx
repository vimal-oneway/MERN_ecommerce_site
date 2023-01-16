import * as React from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteProduct } from '../actions/cartActions';
import { useDispatch } from 'react-redux';
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

export const DelCart = ({productId}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick =async (event) =>{
    console.log(productId,"id");
    await deleteProduct(dispatch, productId);
  } 

  return (
    <Box sx={{marginTop:"-2.5px"}} >
      <Button variant='contained' onClick={handleOpen}><DeleteIcon/></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title"  component="h4" 
            sx={{
              fontFamily:'rubik',
              fontWeight:'600',
              fontSize:'1.5rem'
            }}
          >
            Delete product
          </Typography>
          <Typography id="modal-modal-description" component="p" mb={1}
            sx={{
              fontFamily:'karla',
              color:'text.secondary',
              fontWeight:'500',
            }}
          >
            Confirm to delete
          </Typography>
          <Button variant='outlined' sx={{marginRight:'12px'}} onClick={()=>{setOpen(false)}} >cancel</Button>
          <Button variant='contained' onClick={(e)=>{handleClick(e)}}>Delete</Button>
        </Box>
      </Modal>
    </Box>
  );
}