import React from 'react';
import CreateUserModal from '../../components/CreateUserModal';
import UserTable from '../../components/UserTable';


const Home: React.FC = () => {
   
   return (
      <>
         <CreateUserModal/>
         <UserTable/>
      </>
   )
}

export default Home