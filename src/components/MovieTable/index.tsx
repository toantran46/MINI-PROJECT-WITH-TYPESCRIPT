import { Box, Paper, TablePagination, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { MovieService } from '../../services/Services';
import { movieColumn } from '../../common/dummyData';
import { useHomeSlice } from '../../store/homeSlice';
import { STRING } from '../../constants/Constants';
import NoImage from '../../assets/image-not-found.jpg';
import { Link } from 'react-router-dom';

const MovieTable = () => {
   
   const [totalResult, setTotalResult] = useState(0);
   const [pageInfoState, setPageInfoState] = useState({
      page: 0,
      rowsPerPage: 10
   })
   const {searchInput: searchKey} = useHomeSlice();
   
   const { isLoading, data, error } = useQuery({
      queryKey: [searchKey, pageInfoState],
      queryFn: () => MovieService(searchKey, (pageInfoState.page + 1))
   })

   const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      event?.preventDefault();
      setPageInfoState({
         ...pageInfoState,
         page: newPage
      });
   };
   useEffect(() => {
      if (data?.totalResults) {
         setTotalResult(data.totalResults);
      } else {
         setTotalResult(0);
      }
   }, [data])
   if (error) return <Typography>Please try again</Typography>
   
   return (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
         {(searchKey && totalResult !== 0) && 
            <Box textAlign={'right'}>                     
               <TablePagination
                  component="div"
                  onPageChange={handlePageChange}
                  page={pageInfoState.page}
                  count={totalResult}
                  rowsPerPage={10}
                  rowsPerPageOptions={[]}
               />
            </Box>
         }
         <TableContainer component={Paper} sx={{maxHeight: '73vh'}}>
            <Box>
               {isLoading ? <Typography p={2}>Loading...</Typography> :
               <Table stickyHeader>
                  <TableHead>
                     <TableRow>
                        {movieColumn.map((column) => (
                           <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth, fontWeight: 600 }}
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
                        key={movie.Id}
                     >
                        <TableCell align="center">
                           {movie.Poster === STRING.NONE ? 
                              <img width="100" height="auto" src={NoImage}/>
                           : <Link to={movie.Poster} target='_blank'>
                                 <img width="100" height="auto" src={movie.Poster} alt={movie.Id} />
                              </Link>}
                        </TableCell>
                        <TableCell align="left">{movie.Title}</TableCell>
                        <TableCell align="left">{movie.Type}</TableCell>
                        <TableCell align="right">{movie.Year}</TableCell>
                     </TableRow>
                     ))}
                  </TableBody>
               </Table>
               }
            </Box>         
         </TableContainer>
      </Paper>
   )
}

export default MovieTable;