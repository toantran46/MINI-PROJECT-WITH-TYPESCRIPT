import React from 'react';
import { Column } from '../../types/types';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { removeUser, userInfoSelector } from '../../store/homeSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const UserTable: React.FC = () => {
    const columns: Column[] = [
        { id: 'username', label: 'Username', minWidth: 160, align: "right" },
        { id: 'email', label: 'Email', minWidth: 160, align: "right" },
        { id: 'phoneNumber', label: 'Phone number', minWidth: 160, align: "right" },
        { id: 'address', label: 'Address', minWidth: 160, align: "right" },
        { id: 'action', label: 'Action', minWidth: 160, align: "center" },

    ]
    const dispatch = useAppDispatch();
    const userList = useAppSelector(userInfoSelector);
    React.useEffect(() => {
        console.log(userList, '1');
    }, [userList])
   return (
      <div>
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
                  {userList?.map((user) => (
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
                        <Button size="small">
                            <EditIcon></EditIcon>
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
      </div>
   )
}

export default UserTable;
