import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Avatar from "@material-ui/core/Avatar";
import Bulldog from "../assets/images/bulldog.jpg";




const useStyles = makeStyles(theme => ({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  avatar: {
    margin: 10
  },
  bigAvatar: {
    // marginLeft: 80 ,
    width: 60,
    height: 60
  },
  toolBar: {
    background : '#2E3B55',
  }
}));

export default function TemporaryDrawer(props) {
  const username = localStorage.getItem('username')

  const { logUserOut, currentUsername } = props;
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
    userName: "Bruno"
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem>
          <ListItemIcon>
            <Avatar
              alt="bulldog placeholder"
              src={Bulldog}
              className={classes.bigAvatar}
            />
          </ListItemIcon>
        </ListItem>
        <ListItem>
          <ListItemText style={{textAlign: 'left'}}>Welcome!</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText style={{textAlign: 'left'}}>{currentUsername || username}</ListItemText>
        </ListItem>
        <Link to="/" style={{ textDecoration: "none", color: "grey", }}>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>
        </Link>
        <Link to="/testroute" style={{ textDecoration: "none", color: "grey", }}>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Test Route</ListItemText>
          </ListItem>
        </Link>
        <Link
          to="/"
          onClick={() => logUserOut(false)}
          style={{ textDecoration: "none", color: "grey" }}
        >
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <div>
      <AppBar position="static" className={classes.toolBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}></Typography>
          <IconButton
            style={{ float: "right" }}
            className={classes.menuButton}
            onClick={toggleDrawer("left", true)}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer>
    </div>
  );
}
