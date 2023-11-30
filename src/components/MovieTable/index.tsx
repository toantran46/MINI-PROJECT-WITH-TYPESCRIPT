import React from 'react';
import axios from 'axios';
import { Paper } from '@mui/material';
import { useAppSelector } from '../../store/store';
import { useQuery } from '@tanstack/react-query';
import { ApiResponse, Column } from '../../types/types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const MovieTable: React.FC = () => {
   const searchKey = useAppSelector((state) => state.Slice.searchInput);
   
   const { isPending, error, data } = useQuery({
      queryKey: [searchKey],
      queryFn: () =>
         axios
            .get<ApiResponse>(`http://www.omdbapi.com/?s=${searchKey}&apikey=97a98665`)
            .then((res) => res.data)
            .catch((error) => console.log(error)),
      })
   if (error) return 'An error has occurred: ' + error.message;
   const columns: Column[] = [
      { id: 'Poster', label: 'Poster', minWidth: 160, align: "center" },
      { id: 'imdbID', label: 'imdbID', minWidth: 160, align: "right" },
      { id: 'Title', label: 'Title', minWidth: 160, align: "right" },
      { id: 'Type', label: 'Type', minWidth: 160, align: "right" },
      { id: 'Year', label: 'Year', minWidth: 160, align: "right" },
   ]
   return (
      <div>
         <TableContainer component={Paper}>
         {isPending ? <p>Loading...</p> :
            <div>
               <p className='text-align-bottom'>Search for: <span className='font-weight-bold'>{searchKey}</span></p>
               <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                     <TableRow>
                        {columns.map((column) => (
                           <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                           >
                              {column.label}
                           </TableCell>
                        ))}
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {data?.Search?.map((movie) => (
                     <TableRow
                        key={movie.imdbID}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                     >
                        <TableCell align="center">
                           <img width={100} height={100} src={movie.Poster} alt="" />
                        </TableCell>
                        <TableCell component="th" align="right" scope="row">
                           {movie.imdbID}
                        </TableCell>
                        <TableCell align="right">{movie.Title}</TableCell>
                        <TableCell align="right">{movie.Type}</TableCell>
                        <TableCell align="right">{movie.Year}</TableCell>
                     </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </div>
         }
         </TableContainer>
      </div>
   )
}

export default MovieTable