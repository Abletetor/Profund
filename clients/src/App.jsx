import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Blog from './pages/Blog';
import Projects from './pages/Projects';
import BlogDetail from './pages/BlogDetail';
import ProjectDetail from './pages/ProjectDetail';
import Investment from './pages/Investment';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {

   return (
      <div>
         <Navbar />
         <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/projects' element={ <Projects /> } />
            <Route path='/projects/:id' element={ <ProjectDetail /> } />
            <Route path='/contact' element={ <Contact /> } />
            <Route path='/about' element={ <About /> } />
            <Route path='/blog' element={ <Blog /> } />
            <Route path="/blog/:id" element={ <BlogDetail /> } />
            <Route path='/invest/:id' element={ <Investment /> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='/register' element={ <Register /> } />
         </Routes>
         <Footer />
      </div>
   );
};


export default App;