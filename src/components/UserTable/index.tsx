import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from '@mui/material';
import { useHomeSlice } from '../../store/homeSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CreateUserModal from '../CreateUserModal';
import { userColumn } from '../../common/dummyData';
import { ChangeEvent, MouseEvent, useState } from 'react';
import ConfirmPopup from '../ConfirmPopup';
import { Link } from 'react-router-dom';

const columns = userColumn;

const UserTable = () => {
   const [isOpenModal, setIsOpenModal] = useState(false);
   const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
   const [userId, setUserId] = useState<string | undefined>('');
   const [usernameState, setUsernameState] = useState('');
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(5);
   const {userInfo: userList, removeHomeUser} = useHomeSlice();
   
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

   const handleRemoveUser = (id: string | undefined, username: string) => {
      setIsConfirmationOpen(true);
      setUserId(id);
      setUsernameState(username);
   }

   const handleCloseConfirmation = () => {
      setIsConfirmationOpen(false);
   }

   const handleConfirmAction = () => {
      setIsConfirmationOpen(false);
      removeHomeUser(userId);
   }
   
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
                           style={{ minWidth: column.minWidth, fontWeight: 600 }}
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
                        <Link to={'mailto:+' + user.email}>{user.email}</Link>
                     </TableCell>
                     <TableCell align="left">
                        <Link to={'tel:+' + user.phoneNumber}>{user.phoneNumber}</Link>
                     </TableCell>
                     <TableCell align="left">
                        {user.address}
                     </TableCell>
                     <TableCell align="center">
                        <Tooltip title="Edit" placement='top' arrow>
                           <IconButton onClick={() => handleEditUser(user.id)}>
                              <EditIcon/>
                           </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete" placement='top' arrow>
                           <IconButton color='secondary' onClick={() => handleRemoveUser(user.id, user.username)}>
                              <DeleteIcon/>
                           </IconButton>
                        </Tooltip>
                     </TableCell>
                  </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
         {userList?.length > 0 && 
         <TablePagination
            component="div"
            rowsPerPageOptions={[5, 10, 20]}
            count={userList?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
         />
         }
         <CreateUserModal
            open={isOpenModal}
            userId={userId}
            onClose={() => setIsOpenModal(false)}/>
         <ConfirmPopup
            open={isConfirmationOpen}
            onClose={handleCloseConfirmation}
            onConfirm={handleConfirmAction}
            title="Confirmation"
            content={`Are you sure you want to delete '${usernameState}' ?`}
         />
      </>
   )
}

export default UserTable;
