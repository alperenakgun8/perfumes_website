import './App.css'
import Router from './router'
import Header from '../shared/components/Header/Header'
import { Box, useTheme} from '@mui/material'

function App() {

  const theme = useTheme();

  return (
    <>
      <Header />
      <Box sx={{...theme.mixins.toolbar}}/>
      <Router />
    </>
  )
}

export default App
