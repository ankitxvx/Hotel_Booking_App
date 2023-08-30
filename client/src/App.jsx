import {Routes,Route} from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import AcountPage from './AcountPage'
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true;
function App() {
  
  return (
    <UserContextProvider>
    <Routes>
      <Route path ="/"element = {<Layout/>}>
      <Route index element = {<IndexPage/>}/>
      <Route path='/login' element ={<LoginPage/>}/>
      <Route path='/register' element ={<RegisterPage/>}/>
      <Route path='/account/:subpage?' element ={<AcountPage/>}/>
      

      </Route>
    </Routes>
    </UserContextProvider>
  )
}

export default App
