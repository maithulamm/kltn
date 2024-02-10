import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import Trangchu from '../../assets/images/Trangchu.svg';
import Bando from '../../assets/images/Bando.svg';
import Dulieu from '../../assets/images/Dulieu.svg';
import Phanhoi from '../../assets/images/Phanhoi.svg';
import Lienket from '../../assets/images/Lienket.svg';
import Huongdan from '../../assets/images/Huongdan.svg';


const navbar_icon = [
  [Trangchu, 'Trang chủ', '/home'],
  [Bando, 'Bản đồ', '/map'],
  [Dulieu, 'Dữ liệu', '/data'],
  [Phanhoi, 'Phản hồi', '/feedback'],
  [Lienket, 'Liên kết', '/link'],
  [Huongdan, 'Hướng dẫn', '/guide'],
];

function Navbar({ selected_Item }) {
  const [selectedIcon, setSelectedIcon] = useState(navbar_icon[selected_Item]);
  return (
    <section className="Navbar">
      {navbar_icon.map((icon, index) => (
        <Link to={icon[2]} key={index} className="Navbar__icon">
          <label className="Navbar__icon">
            <input
              type="radio"
              name="radio"
              checked={selectedIcon === icon}
              onChange={() => setSelectedIcon(icon)}
            />
            <div className='selected' />
            <div className="label">
              <img src={icon[0]} alt={icon[1]} />
              <p>{icon[1]}</p>
            </div>
          </label>
        </Link>
      ))}
    </section>

  );
}
export { Navbar };
