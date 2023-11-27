import React, {useState, ChangeEvent, FormEvent} from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useAppDispatch } from '../../store/store';
import { onSearchChange } from '../../store/homeSlice';
import { Button } from '@mui/material';

const SearchBox: React.FC = () => {
   const [searchKey, setSearchKey] = useState<string>('');
   const dispatch = useAppDispatch();
   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchKey(event.target.value);
   }
   const handleSubmit = (event: FormEvent) => {
      event.preventDefault();
      dispatch(onSearchChange(searchKey));
      setSearchKey('');
   }
   return (
      <div className='search-box d-flex float-right'>
         <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <FormControl>
               <div className='d-flex'>
                  <OutlinedInput onChange={handleSearchChange} value={searchKey} placeholder="Search here..." />
                  <Button variant="contained" type='submit'>Search</Button>
               </div>
            </FormControl>
         </form>
      </div>
   )
}

export default SearchBox;