import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from '@mui/material';
import { useHomeSlice } from '../../store/homeSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CreateUserModal from '../CreateUserModal';
import { userColumn } from '../../common/dummyData';
import { ChangeEvent, MouseEvent, useState } from 'react';
import ConfirmPopup from '../ConfirmPopup';

const columns = userColumn;

const UserTable = () => {
   const [isOpenModal, setIsOpenModal] = useState(false);
   const [isOpenConfirmPopup, setIsOpenConfirmPopup] = useState(false);
   const [userId, setUserId] = useState<string | undefined>('');
   const [username, setUsername] = useState('');
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
      setIsOpenConfirmPopup(true);
      setUserId(id);
      setUsername(username);
     
   }

   const handleCloseConfirmPopup = () => {
      setIsOpenConfirmPopup(false);
   }

   const handleConfirmStatus = () => {
      setIsOpenConfirmPopup(false);
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
                        {user.email}
                     </TableCell>
                     <TableCell align="left">
                        {user.phoneNumber}
                     </TableCell>
                     <TableCell align="left">
                        {user.address}
                     </TableCell>
                     <TableCell align="center">
                        <Tooltip title="Edit" placement='top' arrow>
                           <Button onClick={() => handleEditUser(user.id)}>
                              <EditIcon/>
                           </Button>
                        </Tooltip>
                        <Tooltip title="Delete" placement='top' arrow>
                           <Button color='secondary' onClick={() => handleRemoveUser(user.id, user.username)}>
                              <DeleteIcon/>
                           </Button>
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
            isOpen={isOpenModal}
            userId={userId}
            onClose={() => setIsOpenModal(false)}/>
         <ConfirmPopup
            isOpen={isOpenConfirmPopup}
            onClose={handleCloseConfirmPopup}
            confirmStatus={handleConfirmStatus}
            username={username}
         />
      </>
   )
}

export default UserTable;
