
import Parser from './parser'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from './Loader';
import CVEditor from './editor';
import Landing from './Landing';


function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/parser" element={<Parser/>} />

      <Route path="/editor" element={<CVEditor/>} />
      <Route path="/load" element={<Loader />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
