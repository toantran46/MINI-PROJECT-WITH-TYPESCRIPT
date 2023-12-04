import axios from 'axios';
import { Paper, TablePagination, Typography } from '@mui/material';
import { useAppSelector } from '../../store/store';
import { useQuery } from '@tanstack/react-query';
import { ApiResponse, Column } from '../../types/types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';

const columns: Column[] = [
   { id: 'Poster', label: 'Poster', minWidth: 160, align: "center" },
   { id: 'imdbID', label: 'imdbID', minWidth: 160, align: "left" },
   { id: 'Title', label: 'Title', minWidth: 160, align: "left" },
   { id: 'Type', label: 'Type', minWidth: 100, align: "left" },
   { id: 'Year', label: 'Year', minWidth: 100, align: "right" },
]

const MovieTable = () => {
   const searchKey = useAppSelector((state) => state.Slice.searchInput);
   const [totalResult, setTotalResult] = useState<number>(0);
   const [pageInfoState, setPageInfoState] = useState({
      page: 0,
      rowsPerPage: 10
   })
   
   const { isPending, error, data } = useQuery({
      queryKey: [searchKey, pageInfoState],
      queryFn: async () =>
         await axios
            .get<ApiResponse>(`http://www.omdbapi.com/?s=${searchKey}&apikey=97a98665&page=${pageInfoState.page + 1}`)
            .then((res) => {
               if (res.data.Response === "True") {
                  setTotalResult(res.data.totalResults)
               }
               else setTotalResult(0)
               return res.data;
            })
            .catch((error) => console.log(error)),
      })
   if (error) return 'An error has occurred: ' + error.message;

   const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      event?.preventDefault();
      setPageInfoState({
         ...pageInfoState,
         page: newPage
      });
   };
   
   return (
      <div>
         <TableContainer component={Paper}>
         {isPending ? <p>Loading...</p> :
            <div>
               <div className='p-2'>
                  <p className='mb-1'>Search for: <span className='font-weight-bold'>{searchKey}</span></p>
                  <p>Total results: <span className='font-weight-bold'>{totalResult}</span></p>
               </div>
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
                     { totalResult === 0 ? 
                     <TableRow>
                        <TableCell colSpan={5} align="center">
                           <Typography>No data</Typography>
                        </TableCell>
                     </TableRow>
                     :
                     data?.Search?.map((movie) => (
                     <TableRow
                        key={movie.imdbID}
                     >
                        <TableCell align="center">
                           <img width={100} height={100} src={movie.Poster} alt="" />
                        </TableCell>
                        <TableCell component="th" align="left" scope="row">
                           {movie.imdbID}
                        </TableCell>
                        <TableCell align="left">{movie.Title}</TableCell>
                        <TableCell align="left">{movie.Type}</TableCell>
                        <TableCell align="right">{movie.Year}</TableCell>
                     </TableRow>
                     ))}
                  </TableBody>
               </Table>
               
               <TablePagination
                  component="div"
                  onPageChange={handlePageChange}
                  page={pageInfoState.page}
                  count={totalResult}
                  rowsPerPage={10}
                  rowsPerPageOptions={[]}
               >
               </TablePagination>
            </div>
         }
         </TableContainer>
      </div>
   )
}

export default MovieTable