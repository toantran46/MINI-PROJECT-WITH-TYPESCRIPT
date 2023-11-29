import React from 'react';
import SearchBox from '../../components/Search';
import MovieTable from '../../components/MovieTable';

const Movies: React.FC = () => {
   
   return (
      <>
        <SearchBox/>
        <MovieTable/>
      </>
   )
}

export default Movies