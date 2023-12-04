import './App.css';
import Paper from '@mui/material/Paper';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Movies from './pages/Movie';
import Home from './pages/Home';
import Container from '@mui/material/Container'
import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { useAppSelector } from './store/store';
import { isDarkModeSelector } from './store/homeSlice';
import { darkTheme, lightTheme } from './theme/theme';

function App() {
  const prefersDarkMode = useAppSelector(isDarkModeSelector);
  const theme = React.useMemo(()=> {
    return prefersDarkMode ? darkTheme : lightTheme;
  }, [prefersDarkMode])
  
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  )
}

export default App;
