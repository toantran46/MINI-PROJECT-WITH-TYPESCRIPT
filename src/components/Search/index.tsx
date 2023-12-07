import { ChangeEvent, useState } from 'react';
import { Box, IconButton, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useHomeSlice } from '../../store/homeSlice';

let timeoutId: number;
const delay = 1000;

const SearchBox = () => {
   
   const {changeMovieSearch, searchInput} = useHomeSlice();
   const [searchTerm, setSearchTerm] = useState(searchInput)
   
   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
      debouncedSearch(event.target.value);
   }
   const debouncedSearch = (searchKey: string) => {
      clearTimeout(timeoutId);     
      timeoutId = setTimeout(() => {
         changeMovieSearch(searchKey);
      }, delay);
   }

   const onResetSearch = () => {
      setSearchTerm('');
      changeMovieSearch('');
   }

   return (
      <Box sx={{display: 'flex', float: 'right', marginBottom: 2}}>
         <TextField
            size='small' 
            onChange={handleSearchChange}
            placeholder="Search here..."
            defaultValue={searchTerm}
            InputProps={{
               startAdornment: (
                  <InputAdornment position="start">
                     <SearchIcon/>
                  </InputAdornment>
               ),
               endAdornment: (
                  <InputAdornment position="end">
                     <IconButton onClick={onResetSearch}>
                        <CloseIcon/>
                     </IconButton>
                  </InputAdornment>
               )
            }}
         />
      </Box>
   )
}

export default SearchBox;