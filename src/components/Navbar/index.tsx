import { AppBar, Container, List, ListItem, ListItemText, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import LightBox from '../LightBox';
import { navLinks } from '../../common/common';
import { flexBetweenSpace } from '../styles/style';

const Navbar = () => {  
  return (
    <AppBar sx={{marginBottom: 3}} position="static">
      <Toolbar>
        <Container sx={flexBetweenSpace} maxWidth="lg">
          <List
            component="nav"
            aria-labelledby="main navigation"
            sx={flexBetweenSpace}
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
  )
}

export default Navbar;