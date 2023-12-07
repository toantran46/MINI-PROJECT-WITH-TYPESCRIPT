import { Box, Chip, CircularProgress, Paper, TablePagination, Typography } from '@mui/material';
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
import Toast from '../Toast';

const initialPageInfo = {
   page: 0,
   rowsPerPage: 10
}

const MovieTable = () => {
   
   const [totalResult, setTotalResult] = useState(0);
   const [pageInfoState, setPageInfoState] = useState(initialPageInfo);
   const [ openToast, setOpenToast] = useState(false);
   const {searchInput: searchKey, isDarkMode} = useHomeSlice();

   const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      event?.preventDefault();
      setPageInfoState({
         ...pageInfoState,
         page: newPage
      });
   };

   const { isLoading, data, isError, error } = useQuery({
      queryKey: [searchKey, pageInfoState],
      queryFn: () => MovieService(searchKey, (pageInfoState.page + 1))
   })

   useEffect(() => {
      if (data?.totalResults) {
         setTotalResult(Math.floor(data.totalResults));
      } else if (data?.Error) {
         setTotalResult(0);
      }
   }, [data])

   useEffect(() => {
      setPageInfoState({
         ...pageInfoState,
         page: 0
      });
   },[searchKey]);

   useEffect(() => {
      setOpenToast(isError);
   },[isError])
   
   return (
      <Paper sx={{ width: '100%', overflow: 'hidden', colorScheme: isDarkMode ? 'dark' : 'light' }}>
         {(totalResult !== 0) && 
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
               <Table stickyHeader id="movieTable">
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
                  <TableBody id="movie-body">
                     {isLoading ? 
                        <TableRow id="progress-row">
                           <TableCell colSpan={5} align="center">
                              <CircularProgress/>
                           </TableCell>
                        </TableRow>   
                     : (totalResult === 0) ? 
                        <TableRow id="no-data-row">
                           <TableCell colSpan={5} align="center">
                              <Typography>No data</Typography>
                           </TableCell>
                        </TableRow>
                     : data?.Search?.map((movie) => (
                        <TableRow
                           key={movie.Id}
                        >
                           <TableCell align="center">
                              {movie.Poster === STRING.NONE 
                              ? <img width="100" height="auto" src={NoImage}/>
                              :  <Link to={movie.Poster} target='_blank'>
                                    <img width="100" height="auto" src={movie.Poster} alt={movie.Title} />
                                 </Link>
                              }
                           </TableCell>
                           <TableCell align="left">{movie.Title}</TableCell>
                           <TableCell align="left">{movie.Type}</TableCell>
                           <TableCell sx={{alignItems: 'center'}} align="right"><Chip label={movie.Year} size="small" /></TableCell>
                        </TableRow>
                        ))
                     }
                  </TableBody>
               </Table>
            </Box>         
         </TableContainer>
         <Toast
            open={openToast}
            message={error ? error.message : "An error occurred!"}
            onClose={() => setOpenToast(false)}
            status='error'
            vertical='top'
            horizontal='center'
         />
      </Paper>
   )
}

export default MovieTable;