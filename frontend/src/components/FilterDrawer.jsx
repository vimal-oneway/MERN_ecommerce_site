import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';

export default function FilterDrawer({handlePriceBtn}) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const filterButtons = [
    <ListItem key={"1000"} disablePadding>
        <ListItemButton
        key="1"
        onClick={() => {
            handlePriceBtn(["lt"], [1000], false);
        }}
        >
            <ListItemText primary="Under 1,000" /> 
        </ListItemButton>
    </ListItem>,

    <ListItem key={"1000 to 10000"} disablePadding>
        <ListItemButton
        key="2"
        onClick={() => {
          handlePriceBtn(["gt", "lt"], [1000, 10000], false);
        }}
        >
            <ListItemText primary="1,000 - 10,000" /> 
        </ListItemButton>
    </ListItem>,

    <ListItem key={"above 10000"} disablePadding>
        <ListItemButton
        key="3"
        onClick={() => {
          handlePriceBtn(["gt"], [10000], false);
        }}
        >
            <ListItemText primary="above 10,000" /> 
        </ListItemButton>
    </ListItem>,

    <ListItem key={"clear"} disablePadding>
        <ListItemButton
        key="4"
        onClick={() => {
          handlePriceBtn([], [], true);
        }}
        >
            <ListItemText primary="clear" /> 
        </ListItemButton>
    </ListItem>,
  ];


  const list = (anchor) => (
    <Box
      sx={{ width: 'auto' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem key={"price range"}>
            <Typography
            sx={{
                fontWeight: "bold",
                fontFamily: "monospace",
            }}
            >
            PRICE RANGE
            </Typography>
        </ListItem>
        {filterButtons}
      </List>
      <Divider />
    </Box>
  );
  return (
    <div>
      {
        ['bottom'].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button variant='outlined' onClick={toggleDrawer(anchor, true)}>Filter</Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
        ))
      }
    </div>
  );
}