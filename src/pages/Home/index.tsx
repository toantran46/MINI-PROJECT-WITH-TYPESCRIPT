import { Typography } from '@mui/material';
import UserTable from '../../components/UserTable';

const Home = () => {
   
   return (
      <>
         <Typography 
            variant="h5" 
            component="div" 
            align='center'>
            Home
         </Typography>
         <UserTable/>
      </>
   )
}

export default Home;