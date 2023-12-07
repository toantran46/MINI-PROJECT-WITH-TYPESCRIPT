import SearchBox from '../../components/Search';
import MovieTable from '../../components/MovieTable';
import { Typography } from '@mui/material';

const Movie = () => {
   
   return (
      <>
         <Typography 
            variant="h5" 
            component="div" 
            align='center'>
            Movies
         </Typography>
         <SearchBox/>
         <MovieTable/>
      </>
   )
}

export default Movie