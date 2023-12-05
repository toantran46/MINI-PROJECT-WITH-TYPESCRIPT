import { ChangeEvent } from 'react';
import { Box, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search';
import { useHomeSlice } from '../../store/homeSlice';

const SearchBox = () => {
   
   let timer: number;
   const debounceTime = 1000;
   const {changeMovieSearch} = useHomeSlice()
   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
      debouncedSearch(event.target.value);
   }
   const debouncedSearch = (searchKey: string) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
         changeMovieSearch(searchKey);
      }, debounceTime);
   }

   return (
      <Box sx={{display: 'flex', float: 'right', marginBottom: 2}}>
         <TextField
            size='small' 
            onChange={handleSearchChange}
            placeholder="Search here..."
            InputProps={{
               startAdornment: (
                  <InputAdornment position="start">
                     <SearchIcon/>
                  </InputAdornment>
               )
            }}
         />
      </Box>
   )
}

export default SearchBox;