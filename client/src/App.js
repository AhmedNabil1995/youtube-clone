import './App.css';
import TopNav from './components/topNav/TopNav';
import Home from './pages/home/Home';
import VideoPage from './pages/video/VideoPage';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import CreateVideo from './pages/createVideo/CreateVideo';
import { useSelector } from 'react-redux';
function App() {
let {open} = useSelector(state=>state.openModel);

  return (
    <div className="App">
      <BrowserRouter>
      <TopNav />
      <Routes>
        <Route path='/' element={<Home type='random'/>}/>
        <Route path='/trend' element={<Home type='trend' />}/>
        <Route path='/sub' element={<Home type='sub' />} />
        <Route path='/video/:id' element={<VideoPage />}/>
      </Routes>
      {open&&<CreateVideo />}
      </BrowserRouter>
    </div>
  );
}

export default App;
