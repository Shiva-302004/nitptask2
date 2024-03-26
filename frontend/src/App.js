
import './App.css';
import Navbar from './components/Navbar';
import { Routes,Route } from 'react-router-dom';
import Mypost from './pages/Mypost';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Comments from "./pages/Comments"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="">
        <Navbar/>
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home></Home>}/>
          <Route path="/login" element={<Login></Login>}/>
          <Route path="/signup" element={<Signup></Signup>}/>
          <Route path="/myposts" element={<Mypost></Mypost>}/>
          <Route path="/comments/:id" element={<Comments></Comments>}/>
        </Routes>
    </div>
  );
}

export default App;
