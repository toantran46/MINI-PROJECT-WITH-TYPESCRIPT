import React from 'react';
import Box from '@mui/material/Box';
import IconButton  from '@mui/material/IconButton';
import { useTheme} from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const LightBox: React.FC = () => {
const theme = useTheme();
const colorMode = React.useContext(ColorModeContext);
   return (
      <div className='d-flex'>
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.primary',
                color: 'text.primary',
                borderRadius: 1,
                p: 0,
            }}
            >
            {theme.palette.mode}
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Box>
      </div>
   )
}

export default LightBox;
