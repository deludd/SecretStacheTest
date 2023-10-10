import React from 'react'
import { Link } from 'gatsby'

const Header = () => {
  return (
    <>
      <header className="appBar">
        <nav className="toolbar">
          <div className="siteTitle">
            <h6 className="title">
              <Link to="/" className="navLink">
                StacheAnime
              </Link>
            </h6>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
