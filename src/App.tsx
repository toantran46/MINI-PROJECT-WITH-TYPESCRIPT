import './App.css';
import Paper from '@mui/material/Paper';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Movie from './pages/Movie';
import Home from './pages/Home';
import { ThemeProvider } from '@emotion/react';
import { useHomeSlice } from './store/homeSlice';
import { darkTheme, lightTheme } from './theme/theme';
import { Container } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { ROUTER_PATH } from './constants/Constants';

const App = () => {
  
  const queryClient = new QueryClient();
  const { isDarkMode: prefersDarkMode} = useHomeSlice();
  const theme = useMemo(() => {
    return prefersDarkMode ? darkTheme : lightTheme;
  }, [prefersDarkMode])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
          <BrowserRouter>
              <Paper sx={{height: "100vh"}} elevation={3}>
                <Navbar/>
                <Container maxWidth="lg">
                  <Routes>
                    <Route path={ROUTER_PATH.HOME} element={<Home/>}/>
                    <Route path={ROUTER_PATH.MOVIE} element={<Movie/>}/>
                  </Routes>
                </Container>
              </Paper>
          </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App;
