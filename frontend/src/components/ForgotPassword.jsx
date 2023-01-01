import * as React from 'react';
import { TextField,Box, Button, Typography, Modal, Divider } from '@mui/material';

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

export default function ForgotPassword() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Forgot password</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Forgot password
          </Typography>
          <div className="mb-3"></div>
          <TextField id="outlined-basic" label="Email" variant="outlined" /> <br/>
          <div className="mb-3"></div>
          <Button variant='contained'>submit</Button>
          <div className="mb"></div>
          <Divider></Divider>
          <div className="mb-3"></div>
          <Typography id="modal-modal-description" variant="p" component="p">
            We'll send link to your email 
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}