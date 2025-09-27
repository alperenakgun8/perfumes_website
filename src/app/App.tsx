import './App.css'
import Router from './router'
import Header from '../shared/components/Header/Header'
import { Box, useTheme, Toolbar} from '@mui/material'

function App() {

  const theme = useTheme();

  return (
    <>
      <Header />
      <Toolbar/>
      <Router />
    </>
  )
}

export default App
