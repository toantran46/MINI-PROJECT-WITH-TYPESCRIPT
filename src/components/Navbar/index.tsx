import { AppBar, Container, List, ListItem, ListItemText, Toolbar } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import LightBox from '../LightBox';

const Navbar: React.FC = () => {

    const navLinks = [
        { title: "Home", path: "/" },
        { title: "Movie", path: "/movie" },
    ];
   return (
      <div className='mb-3'>
        <AppBar position="static">
        <Toolbar>
          <Container maxWidth="lg" className="d-flex justify-content-between">
            <List
              component="nav"
              aria-labelledby="main navigation"
              className='d-flex justify-content-between'
            >
              {navLinks.map(({ title, path }) => (
                <ListItem button key={title} component={Link} to={path}>
                  <ListItemText primary={title} />
                </ListItem>
              ))}
            </List>
            <LightBox/>
          </Container>
        </Toolbar>
      </AppBar>
      </div>
   )
}

export default Navbar;