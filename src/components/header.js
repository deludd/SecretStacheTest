import React from 'react'
import { Link } from 'gatsby'

// import './Header.css'; // Подключите ваш файл стилей CSS здесь

const Header = () => {
  return (
    <>
      <header className="appBar">
        <nav className="toolbar">
          <div className="siteTitle">
            <h6 className="title">
              <Link to="/" className="navLink">
                Rick N Morty
              </Link>
            </h6>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
