import './App.css';
import Paper from '@mui/material/Paper';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Movies from './pages/Movie';
import Home from './pages/Home';
import Container from '@mui/material/Container'

function App() {
  return (
    <div className='app'>
      <Container maxWidth="lg">
        <Paper className='container' elevation={2}>
          <BrowserRouter>
            <Navbar/> 
            <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/movie' element={<Movies/>}></Route>
            </Routes>
          </BrowserRouter>
        </Paper>
      </Container>
    </div>
  )
}

export default App;
