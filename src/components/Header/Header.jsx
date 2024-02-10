import logo from '../../assets/images/logo.png';
import avt from '../../assets/images/avatar.svg';
import './style.css';

import { Link } from 'react-router-dom';
export const Header = () => {
    return (
        <section className="Header">
          <div className='Logo-name'>
            <div className='Logo'>
              <Link to="/home"><img src={logo} className="App-logo" alt="logo" /></Link>
            </div>
            <div className='Name'>
            <Link to="/home"><h1>HỆ THỐNG QUẢN LÝ ĐỊA ĐIỂM DU LỊCH AN GIANG</h1> </Link>
            </div>
          </div>
          <div className='Username-avt'>
            <div className='Username'>
              <h6>Xin chào Maithulamm!</h6>
            </div>
            <div className='Avt'>
              <img src={avt} className="Avt-img" alt="logo" />
            </div>
          </div>
        </section>
    );
}
