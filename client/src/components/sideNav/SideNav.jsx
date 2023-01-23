import './sideNav.scss';
import { NavLink } from 'react-router-dom';

const SideNav = () => {

  return (
    <div className='sidenav'>
        <div className='container'>
          <NavLink className='item' to='/'>
            <span className='item_icon'>
            <i className='fa-solid fa-house'></i>
            </span>
            <span className='item_name'>Home</span>
          </NavLink>

          <NavLink className='item' to='/trend'>
            <span className='item_icon'>
            <i className='fa-regular fa-compass'></i>
            </span>
            <span className='item_name'>Trend</span>
          </NavLink>

          <NavLink className='item' to='/sub'>
            <span className='item_icon'>
            <i className='fa-solid fa-layer-group'></i>
            </span>
            <span className='item_name'>Subscriptions</span>
          </NavLink>
            <hr />
        </div>
    </div>
  )
}

export default SideNav