import React from 'react';
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles(theme => ({
  navLink: {
    color: "inherit",
    textDecoration: "none",
  }
}));

export default function SidebarLink({
  label,
  link,
  icon,
  location
}) {
  const classes = useStyles();
  const [selected, setSelected] = React.useState(false);

  const oddEvent = (match, location) => {
    if (!match) {
      setSelected(false);
      return false
    } else {
      setSelected(true);
      return true;
    }
  }

  return (
    <NavLink to={link} className={classes.navLink} isActive={oddEvent}>
      <ListItem button key={label} selected={selected}>
        <ListItemIcon>{icon || <MailIcon />}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItem>
    </NavLink>
  );
}