import styles from "./sideBar.module.css";

import React from 'react'
import {Link} from "react-router-dom";


export const SideBar = () => {
  return (
    <nav className={styles.navbar}>
        <li className={styles.list}>
          <Link className={styles.link} to="/">Volunteers</Link>
        </li>
        <li className={styles.list}>
           <Link className={styles.link} to="/events"> Events</Link>
        </li>
        {/* <li className={styles.list}>
           <Link className={styles.link} to="/expenses"> Expenses </Link>
        </li> */}
        <li className={styles.list}>
            <a className={styles.link} href="https://github.com/WadadParker/event-management" target="_blank">Github</a>
        </li>
    </nav>
  )
}
