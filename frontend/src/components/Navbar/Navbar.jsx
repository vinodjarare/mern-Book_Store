import { Book, Menu, ShoppingCartOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const Pages = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Books",
    url: "/books",
  },
  {
    title: "About",
    url: "/about",
  },
  {
    title: "Contact",
    url: "/contact",
  },
];
const DrawerCompo = ({ openDrawer, setOpenDrawer }) => {
  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List sx={{ padding: "0 50px" }}>
          {Pages.map((page, index) => (
            <ListItemButton
              key={index}
              onClick={() => setOpenDrawer(false)}
              component={Link}
              to={page.url}
            >
              <ListItemIcon>
                <ListItemText>{page.title}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
};

const Navbar = () => {
  const { cartItems: cart } = useSelector((state) => state.cart);
  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
  });
  const Icons = styled("div")(({ theme }) => ({
    // backgroundColor: "white",
    display: "flex",
    gap: "20px",
    alignItems: "center",
    // [theme.breakpoints.up("sm")]: { display: "flex" },
  }));

  const StyledBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  });
  const [value, setValue] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <AppBar position="static">
      <StyledToolbar>
        <StyledBox>
          <IconButton
            onClick={() => setOpenDrawer(!openDrawer)}
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <Menu style={{ color: "white" }} />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Books
          </Typography>
          <Book sx={{ display: { xs: "block", sm: "none" } }} />
        </StyledBox>
        <Tabs
          textColor="inherit"
          value={value}
          onChange={(e, value) => setValue(value)}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          {Pages.map((page, index) => (
            <Tab
              key={index}
              label={page.title}
              component={Link}
              to={page.url}
            />
          ))}
        </Tabs>
        <Icons>
          <Badge
            badgeContent={cart.length}
            color="error"
            component={Link}
            to="/cart"
          >
            <ShoppingCartOutlined />
          </Badge>
          <Avatar style={{ width: "25px", height: "25px" }} />
        </Icons>
      </StyledToolbar>
      <DrawerCompo openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </AppBar>
  );
};

export default Navbar;
