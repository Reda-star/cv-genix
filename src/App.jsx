
import Parser from './parser'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from './Loader';
import CVEditor from './editor';
import Landing from './Landing';
import Login from './auth/Login';
import SignUp from './auth/SignUp';



function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />

      <Route path="/parser" element={<Parser/>} />
      <Route path="/editor" element={<CVEditor/>} />
      <Route path="/load" element={<Loader />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
