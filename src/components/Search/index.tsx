import { ChangeEvent, useEffect, useState } from 'react';
import { Box, IconButton, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useHomeSlice } from '../../store/homeSlice';


const SearchBox = () => {
   let timeoutId: number;
   const DELAY = 1000;
   const {changeMovieSearch, searchInput} = useHomeSlice();
   const [searchTerm, setSearchTerm] = useState(searchInput);
   
   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
   }
   const debouncedSearch = (searchKey: string) => {
      clearTimeout(timeoutId);     
      timeoutId = setTimeout(() => {
          changeMovieSearch(searchKey);
      }, DELAY);
   }

   const onResetSearch = () => {
      setSearchTerm('');
      changeMovieSearch('');
   }
   useEffect(() => {
      debouncedSearch(searchTerm);
   },[searchTerm])
   return (
      <Box sx={{display: 'flex', float: 'right', marginBottom: 2}}>
         <TextField
            sx={{width: '20vw'}}
            size='small' 
            onChange={handleSearchChange}
            placeholder="Search here..."
            value={searchTerm}
            InputProps={{
               startAdornment: (
                  <InputAdornment position="start">
                     <SearchIcon/>
                  </InputAdornment>
               ),
               endAdornment: (
                  <InputAdornment sx={{display: searchInput ? 'contents' : 'none'}} position="end">
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