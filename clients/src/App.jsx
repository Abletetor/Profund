import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Blog from './pages/Blog';
import Projects from './pages/Projects';
import BlogDetail from './pages/BlogDetail';

const App = () => {

   return (
      <div>
         <Navbar />
         <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/projects' element={ <Projects /> } />
            <Route path='/contact' element={ <Contact /> } />
            <Route path='/about' element={ <About /> } />
            <Route path='/blog' element={ <Blog /> } />
            <Route path="/blog/:id" element={ <BlogDetail /> } />
         </Routes>
         <Footer />
      </div>
   );
};


export default App;