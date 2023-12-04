import { useTheme} from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useAppDispatch } from '../../store/store';
import { onChangeDarkMode } from '../../store/homeSlice';
import { Button } from '@mui/material';

const LightBox = () => {
    
    const theme = useTheme();
    const dispatch = useAppDispatch()
    const handleChangeMode = () => {
        dispatch(onChangeDarkMode())
    }
        return (
            <div className='d-flex'>
                <Button onClick={handleChangeMode} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </Button>
            </div>
        )
    }

export default LightBox;
