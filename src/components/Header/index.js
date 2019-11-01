import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import ErrorIcon from '@material-ui/icons/Error';

import HelpDialog from './HelpDialog';
import logo from "assets/images/logo.png";
import appInfo from 'assets/config'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(4),
  },
  hide: {
    display: 'none',
  },
  logotypeImage: {
    height: 42,
    width: "auto",
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  grow: {
    flexGrow: 1
  },
  headerMenu: {
    marginTop: theme.spacing(7)
  },
  profileMenu: {
    minWidth: 265
  },
  profileMenuIcon: {
    marginRight: theme.spacing(1),
  },
  headerMenuItem: {
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
      color: "white"
    }
  },
  profileMenuLink: {
    fontSize: 16,
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer"
    }
  },
  profileMenuUser: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2)
  },
}));

export default function Header({
  open,
  setOpen,
  mobileOpen,
  setMobileOpen,
  signOut,
}) {
  const classes = useStyles();

  const [profileMenu, setProfileMenu] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }
  
  function handleMobileDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  function openProfileMenu(event) {
    setProfileMenu(event.currentTarget)
  }
  function closeProfileMenu() {
    setProfileMenu(null)
  }

  function openHelpDialog() {
    setDialogOpen(true)
  }
  function closeHelpDialog() {
    setDialogOpen(false)
  }
  
  return (
    <AppBar
      position="fixed"
      className={classNames(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <Hidden smUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleMobileDrawerToggle}
            edge="start"
            className={classNames(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden xsDown implementation="css">
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={classNames(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <div className={classes.grow} />
        <IconButton
          aria-haspopup="true"
          color="inherit"
          aria-controls="profile-menu"
          onClick={openProfileMenu}
        >
          <PersonIcon />
        </IconButton>
      </Toolbar>

      <Menu
        id="profile-menu"
        open={Boolean(profileMenu)}
        anchorEl={profileMenu}
        onClose={closeProfileMenu}
        disableAutoFocusItem
        className={classes.headerMenu}
        classes={{ paper: classes.profileMenu }}
      >
        <div className={classes.profileMenuUser}>
          <Typography variant="h4" noWrap>
            {appInfo.user}
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            color="primary"
            className={classes.profileMenuLink}
            href={appInfo.website}
            target='_blank'
          >
            公司首页
          </Typography>
        </div>
        <Divider />
        <MenuItem className={classes.headerMenuItem}>
          <PersonIcon className={classes.profileMenuIcon} />个人中心
        </MenuItem>
        <MenuItem className={classes.headerMenuItem} onClick={openHelpDialog} >
          <ErrorIcon className={classes.profileMenuIcon} />帮助
        </MenuItem>
        <Divider />
        <div className={classes.profileMenuUser}>
          <Typography
            variant="h6"
            align="right"
            noWrap
            color="primary"
            onClick={signOut}
          >
            退出
          </Typography>
        </div>
      </Menu>
      <HelpDialog open={dialogOpen} handleClose={closeHelpDialog} />
    </AppBar>
  );
}