import {
  AccountCircle,
  Book,
  ExitToApp,
  GridView,
  ListAlt,
  Menu,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
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
  SpeedDial,
  SpeedDialAction,
  styled,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Actions/userAction";
import { toast } from "react-toastify";

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
  const { isAuthenticated, user } = useSelector((state) => state.user);
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Succesfully");
  };
  const dashboard = () => {
    navigate("/admin");
  };
  const handleMyOrders = () => {
    navigate("/orders");
  };
  const actions = [
    { icon: <ListAlt />, name: "Orders", func: handleMyOrders },
    { icon: <ExitToApp />, name: "Logout", func: handleLogout },
  ];
  if (user?.isAdmin === true) {
    actions.unshift({
      icon: <GridView />,
      name: "Dashboard",
      func: dashboard,
    });
  }

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
        <Icons
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Badge
            badgeContent={cart.length}
            color="error"
            component={Link}
            to="/cart"
          >
            <ShoppingCartOutlined />
          </Badge>
          {isAuthenticated ? (
            <SpeedDial
              ariaLabel="user"
              icon={<AccountCircle />}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              direction="down"
              sx={{
                position: "absolute",
                top: "80px",
                right: "20px",
              }}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  components={Link}
                  to={action.link}
                  key={action.name}
                  onClick={action.func}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  tooltipOpen={window.innerWidth <= 600 ? true : false}
                />
              ))}
            </SpeedDial>
          ) : (
            <Avatar
              component={Link}
              to="/login"
              sx={{ backgroundColor: "#1976d2" }}
            >
              <AccountCircle />
            </Avatar>
          )}
        </Icons>
      </StyledToolbar>
      <DrawerCompo openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </AppBar>
  );
};

export default Navbar;
