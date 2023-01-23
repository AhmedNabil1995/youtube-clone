import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import './TopNav.scss';
import { app } from '../../firebase';
import { login } from '../../redux/Slices/authSlice';
import { toggleOpen } from '../../redux/Slices/OpenModelSlice';
import {Link} from 'react-router-dom'
const TopNav = () => {
    let {currentUser} = useSelector(state=>state.auth);
    let dispatch =  useDispatch();

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

    const loginWithGoogle = ()=>{
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            dispatch(login({name:user.displayName,image:user.photoURL,email:user.email}));
            
        }).catch((err) => {
            console.log(err)
        });

    }
  return (
    <div className='topnav'>
        <div className='container'>
            <div className='row'>
                <div className='col-1'>
                <span>
                <i className="fa-sharp fa-solid fa-bars"></i>
                </span>
                <span>
                <i className="fa-brands fa-youtube"></i>
                <Link to={'/'}><p>Youtube</p></Link>
                </span>
                </div>
                <div className='col-2'>
                    <div>
                        <input type="text" placeholder='search'/>
                        <button>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </div>
                <div className='col-3'>
                    {currentUser?<><span onClick={()=>dispatch(toggleOpen())}>
                    <i className="fa-solid fa-square-plus"></i>
                    </span>
                    <img src={currentUser.image} alt='profile'/></>:<button onClick={loginWithGoogle} className='google-btn'>sign in with google</button>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default TopNav