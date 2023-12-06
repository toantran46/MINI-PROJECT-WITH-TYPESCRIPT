import { ChangeEvent } from 'react';
import { Box, IconButton, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useHomeSlice } from '../../store/homeSlice';

let timer: number;
const debounceTime = 1000;

const SearchBox = () => {
   
   const {changeMovieSearch, searchInput} = useHomeSlice()
   
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
            defaultValue={searchInput}
            InputProps={{
               startAdornment: (
                  <InputAdornment position="start">
                     <SearchIcon/>
                  </InputAdornment>
               ),
               endAdornment: (
                  <InputAdornment position="end">
                     <IconButton onClick={() =>changeMovieSearch('')}><CloseIcon/></IconButton>
                  </InputAdornment>
               )
            }}
         />
      </Box>
   )
}

export default SearchBox;