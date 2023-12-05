import { AppBar, Container, List, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import LightBox from '../LightBox';
import { navLinks } from '../../common/common';
import { flexBetweenSpace } from '../styles/styles';
import { useHomeSlice } from '../../store/homeSlice';

const Navbar = () => {
  const {isDarkMode} = useHomeSlice()
  return (
    <AppBar sx={{marginBottom: 3}} position="sticky">
      <Toolbar>
        <Container sx={flexBetweenSpace} maxWidth="lg">
          <List
            component="nav"
            aria-labelledby="main navigation"
            sx={flexBetweenSpace}
          >
            {navLinks.map(({ title, path }) => (
              <ListItemButton 
                sx={{
                  '&:hover': {
                    borderRadius: 1,
                    color: isDarkMode ? 'white' : 'dark',
                  },
                    borderRadius: 1,
                    backgroundColor: 'transparent'
                }} 
                key={title} 
                component={Link} 
                to={path}>
                <ListItemText primary={title} />
              </ListItemButton>
            ))}
          </List>
          <LightBox/>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;