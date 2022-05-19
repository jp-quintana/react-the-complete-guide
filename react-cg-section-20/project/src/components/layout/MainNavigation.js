import { NavLink, Link } from 'react-router-dom'

import classes from './MainNavigation.module.css'

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <Link to='/' className={classes.logo}>
        Great Quotes
      </Link>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to="/quotes">
              All Quotes
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/new-quote">
              Add a quote
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation
