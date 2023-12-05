import { useTheme} from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useAppDispatch } from '../../store/store';
// import { useHomeSlice } from '../../store/homeSlice';
import { onChangeDarkMode } from '../../store/homeSlice';
import { Box, Button, Tooltip } from '@mui/material';
import { THEME_MODE } from '../../constants/Constants';

const LightBox = () => {
    
    const theme = useTheme();
    const dispatch = useAppDispatch();
    // const {changeDarkMode} = useHomeSlice();
    const handleChangeMode = () => {
        dispatch(onChangeDarkMode())
        // changeDarkMode()
    }
        return (
            <Box display={'flex'}>
                <Tooltip title={theme.palette.mode === THEME_MODE.DARK ? 'Light Mode' : 'Dark Mode'} placement='bottom' arrow>
                    <Button onClick={handleChangeMode} color="inherit">
                        {theme.palette.mode === THEME_MODE.DARK ? <Brightness7Icon /> : <Brightness4Icon />}
                    </Button>
                </Tooltip>
            </Box>
        )
    }

export default LightBox;
