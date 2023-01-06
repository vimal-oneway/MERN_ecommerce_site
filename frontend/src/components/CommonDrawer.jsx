import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";

export default function CommonDrawer({ options }) {
  const [state, setState] = React.useState({
    left: options.show || false
  });

  
  const [display , setDisplay] = React.useState(options?.showDisplay || "")

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) 
    {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  React.useEffect(() => {
    setState(options?.show)
  }, [options]);
  const filterButtons = [
    <ListItem key={"1000"} disablePadding>
        <ListItemButton
        key="1"
        onClick={() => {
            options?.handlePriceBtn(["lt"], [1000], false);
        }}
        >
            <ListItemText primary="Under 1,000" /> 
        </ListItemButton>
    </ListItem>,

    <ListItem key={"1000 to 10000"} disablePadding>
        <ListItemButton
        key="2"
        onClick={() => {
          options?.handlePriceBtn(["gt", "lt"], [1000, 10000], false);
        }}
        >
            <ListItemText primary="1,000 - 10,000" /> 
        </ListItemButton>
    </ListItem>,

    <ListItem key={"above 10000"} disablePadding>
        <ListItemButton
        key="3"
        onClick={() => {
          options?.handlePriceBtn(["gt"], [10000], false);
        }}
        >
            <ListItemText primary="above 10,000" /> 
        </ListItemButton>
    </ListItem>,

    <ListItem key={"clear"} disablePadding>
        <ListItemButton
        key="4"
        onClick={() => {
          options?.handlePriceBtn([], [], true);
        }}
        >
            <ListItemText primary="clear" /> 
        </ListItemButton>
    </ListItem>,
  ];


  const filterDrawer = (anchor) => (
    <Box
      sx={{ width: 200 }}
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


  const anchor = "left"
  return (
    <div key={"drawer"}>
      {/* <Button onClick={toggleDrawer("left", true)} variant='outlined'>{"Filter"}</Button> */}
      {/* <Drawer
        anchor={left}
        open={state[left]}
        onClose={toggleDrawer(left, false)}
      >
        {
          // display === "navigationBar" && 
        }
      </Drawer> */}
      {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <Drawer
            anchor={anchor}
            // open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
          {display === "filter" && filterDrawer(anchor)}
          </Drawer>
    </div>
  );
}
