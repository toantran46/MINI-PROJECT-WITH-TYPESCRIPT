import { Column } from '../../types/types';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { removeUser, userInfoSelector } from '../../store/homeSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CreateUserModal from '../CreateUserModal';
import { ChangeEvent, MouseEvent, useState } from 'react';

const columns: Column[] = [
   { id: 'username', label: 'Username', minWidth: 160, align: "left" },
   { id: 'email', label: 'Email', minWidth: 160, align: "left" },
   { id: 'phoneNumber', label: 'Phone number', minWidth: 160, align: "left" },
   { id: 'address', label: 'Address', minWidth: 160, align: "left" },
   { id: 'action', label: 'Action', minWidth: 100, align: "center" },
]

const UserTable = () => {
   
   const [isOpenModal, setIsOpenModal] = useState(false);
   const [userId, setUserId] = useState<string | undefined>('');
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(5);
   
   const dispatch = useAppDispatch();
   const userList = useAppSelector(userInfoSelector);
   const handleEditUser = (id: string | undefined) => {
      setIsOpenModal(true);
      setUserId(id);
   }
   const handleCreateUser = () => {
      setIsOpenModal(true);
      setUserId('');
   }

   const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      event?.preventDefault();
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+parseInt(event.target.value));
      setPage(0);
   };
   
   return (
      <>
         <Button variant="contained" sx={{marginBottom: 3, float: 'right'}} onClick={handleCreateUser}>Create new user</Button>
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="user list table">
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
                  {userList?.length === 0 
                  ? 
                  <TableRow>
                     <TableCell colSpan={5} align="center">
                        <Typography>No data</Typography>
                     </TableCell>
                  </TableRow>
                  : userList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                  <TableRow
                     key={user.username}
                  >
                     <TableCell align="left">
                        {user.username}
                     </TableCell>
                     <TableCell align="left">
                        {user.email}
                     </TableCell>
                     <TableCell align="left">
                        {user.phoneNumber}
                     </TableCell>
                     <TableCell align="left">
                        {user.address}
                     </TableCell>
                     <TableCell align="center">
                        <Button onClick={() => handleEditUser(user.id)} size="small">
                            <EditIcon/>
                        </Button>
                        <Button color='secondary' onClick={() => dispatch(removeUser(user.id))} size="small">
                            <DeleteIcon/>
                        </Button>
                     </TableCell>
                  </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
         <TablePagination
            component="div"
            rowsPerPageOptions={[5, 10, 20]}
            count={userList?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
         />
         <CreateUserModal
            isOpen={isOpenModal}
            userId={userId}
            onClose={() => setIsOpenModal(false)}>
         </CreateUserModal>
      </>
   )
}

export default UserTable;
