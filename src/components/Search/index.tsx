import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../store/store';
import { onSearchChange } from '../../store/homeSlice';
import { Box, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = () => {
   
   const dispatch = useAppDispatch();
   let timer: number;
   const debounceTime = 1500;
   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
      debouncedSearch(event.target.value);
   }
   const debouncedSearch = (searchKey: string) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
         dispatch(onSearchChange(searchKey));
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