import {KindeProvider} from "@kinde-oss/kinde-auth-react";
import Parser from './parser'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from './Loader';
import CVEditor from './editor';
import Landing from './Landing';



function App() {

  return (
    <>
    <KindeProvider
		clientId="1c5bb0287012443fa477073b9e9a7037"
		domain="https://reda.kinde.com"
		redirectUri="http://localhost:5173"
		logoutUri="http://localhost:5173"
	>
		<BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>} />

      <Route path="/parser" element={<Parser/>} />
      <Route path="/editor" element={<CVEditor/>} />
      <Route path="/load" element={<Loader />} />
    </Routes>
    </BrowserRouter>
	</KindeProvider>

    
    </>
  )
}

export default App
