import './App.css'
import Router from './router'
import Header from '../shared/components/Header/Header'
import { Toolbar} from '@mui/material'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from './store'
import { useEffect } from 'react'
import { fetchAuthMe } from '../features/users/thunks/userThunks'

function App() {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      dispatch(fetchAuthMe());
    }
  });

  return (
    <>
      <Header />
      <Toolbar/>
      <Router />
    </>
  )
}

export default App
