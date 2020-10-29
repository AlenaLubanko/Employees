import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuItems } from './MenuItems';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import CloseIcon from '@material-ui/icons/Close';
import './header.css';
import { useSelector } from 'react-redux';



function Header() {


  const [icon, setIcon] = useState(false);

  function handleClick() {
    setIcon(!icon)
  }

  return (
    <>
      <nav className="NavbarItems">
        <h2 className="navbar-logo">
          {/* <div className="wrapperLogo"> */}
        Приложение с данными работников предприятия<PeopleAltIcon className="mainLogo" />
          {/* </div> */}
        </h2>
        <div className="menu-icon" onClick={handleClick}>
          {icon ? <CloseIcon className="icon menu" /> : <MenuIcon className="icon close" />}
        </div>
        <>
          <ul className={icon ? 'nav-menu active' : 'nav-menu'}>
            {MenuItems.map((item, index) => (
              <li key={index}>
                <Link to={item.url} className={item.cName}>{item.title}</Link>
              </li>
            ))}

          </ul>
        </>
        <>
        
        </>
      </nav>

    </>
  )
}

export default Header;