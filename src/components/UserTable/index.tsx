import React from 'react';
import { Column } from '../../types/types';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { removeUser, userInfoSelector } from '../../store/homeSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CreateUserModal from '../CreateUserModal';


const UserTable: React.FC = () => {
   const [isOpenModal, setIsOpenModal] = React.useState(false);
   const [userId, setUserId] = React.useState<string | undefined>('');
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(5);
   
   const columns: Column[] = [
      { id: 'username', label: 'Username', minWidth: 160, align: "right" },
      { id: 'email', label: 'Email', minWidth: 160, align: "right" },
      { id: 'phoneNumber', label: 'Phone number', minWidth: 160, align: "right" },
      { id: 'address', label: 'Address', minWidth: 160, align: "right" },
      { id: 'action', label: 'Action', minWidth: 160, align: "center" },
   ]
   const dispatch = useAppDispatch();
   const userList = useAppSelector(userInfoSelector);
   const handleEditUser = (id: string | undefined) => {
      setIsOpenModal(true);
      setUserId(id)
   }
   const handleCreateUser = () => {
      setIsOpenModal(true);
      setUserId('')
   }

   const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+parseInt(event.target.value));
      setPage(0);
   };
   
   return (
      <div>
         <Button variant="contained" className='mb-3 float-right' onClick={() => handleCreateUser()}>Create new user</Button>
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
                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                     <TableCell align="right">
                        {user.username}
                     </TableCell>
                     <TableCell align="right">
                        {user.email}
                     </TableCell>
                     <TableCell align="right">
                        {user.phoneNumber}
                     </TableCell>
                     <TableCell align="right">
                        {user.address}
                     </TableCell>
                     <TableCell align="center">
                        <Button onClick={() => handleEditUser(user.id)} size="small">
                            <EditIcon ></EditIcon>
                        </Button>
                        <Button onClick={() => dispatch(removeUser(user.id))} size="small">
                            <DeleteIcon></DeleteIcon>
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
      </div>
   )
}

export default UserTable;
