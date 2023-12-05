import { Box, Paper, TablePagination, Typography } from '@mui/material';
import { useAppSelector } from '../../store/store';
import { useQuery } from '@tanstack/react-query';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { flexBetweenSpace } from '../styles/styles';
import { MovieService } from '../../services/Services';
import { movieColumn } from '../../common/dummyData';

const MovieTable = () => {
   const searchKey = useAppSelector((state) => state.UserSlice.searchInput);
   const [totalResult, setTotalResult] = useState(0);
   const [pageInfoState, setPageInfoState] = useState({
      page: 0,
      rowsPerPage: 10
   })
   
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
         setTotalResult(data.totalResults)
      }
   }, [data])
   if (error) return 
   return (
      <TableContainer component={Paper}>
         {isLoading ? <Typography>Loading...</Typography> :
         <Box>
            {searchKey && 
               <Box p={2} sx={flexBetweenSpace}>
                  <Typography mb={1} display={'flex'} alignItems={'center'}>
                     Search for: <Typography fontWeight={'bold'}>{searchKey}</Typography>
                  </Typography>
                  
                  <TablePagination
                     component="div"
                     onPageChange={handlePageChange}
                     page={pageInfoState.page}
                     count={totalResult}
                     rowsPerPage={10}
                     rowsPerPageOptions={[]}
                  >
                  </TablePagination>
               </Box>
            }
            <Table sx={{ minWidth: 650, maxHeight: 450 }} stickyHeader>
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
                        <img width={100} height={100} src={movie.Poster} alt="" />
                     </TableCell>
                     <TableCell align="left">{movie.Title}</TableCell>
                     <TableCell align="left">{movie.Type}</TableCell>
                     <TableCell align="right">{movie.Year}</TableCell>
                  </TableRow>
                  ))}
               </TableBody>
            </Table>
         </Box>
      }
      </TableContainer>
   )
}

export default MovieTable