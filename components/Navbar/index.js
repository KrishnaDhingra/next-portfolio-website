import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  FadeinSide,
  ListItem,
  NavbarOpen,
  HamburgerTopLine,
  HamburgerBottomLine,
} from '../AnimationVariants'
import styles from './index.module.css'

function Navbar() {
  const [visible, setVisible] = useState('-120vw')
  const [hamburgerState, setHamburgerState] = useState(true)

  const navbarFunc = () => {
    visible === '-120vw' ? setVisible('0vw') : setVisible('-120vw')
  }

  return (
    <motion.div
      className={styles.navbar_outer}
      variants={FadeinSide()}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.navbar}>
        <div className={styles.top_section}>
          <Link
            href="/"
            onClick={() => {
              setVisible('-120vw')
            }}
          >
            <a>k</a>
          </Link>
        </div>
        <div
          className={styles.hamburger_outer}
          onClick={() => {
            setHamburgerState(!hamburgerState)
            navbarFunc()
          }}
        >
          <motion.div
            className={styles.hamburger_lines}
            variants={HamburgerTopLine(hamburgerState)}
            initial="hidden"
            animate="visible"
          ></motion.div>
          <motion.div
            className={styles.hamburger_lines}
            variants={HamburgerBottomLine(hamburgerState)}
            initial="hidden"
            animate="visible"
          ></motion.div>
        </div>

        <div className={styles.bottom_section}>
          <Link href="/contact">
            <a
              onClick={() => {
                setVisible('-120vw')
                setHamburgerState(true)
              }}
              className={styles.work_with_me}
            >
              Work With Me
            </a>
          </Link>
        </div>
      </div>
      <motion.ul
        className={styles.navbar_dropdown}
        variants={NavbarOpen(visible)}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.links_outer}>
          <motion.div variants={ListItem(visible)}>
            <span>01</span>
            <Link className={styles.link} href="/">
              <li
                onClick={() => {
                  setVisible('-120vw')
                  setHamburgerState(!hamburgerState)
                }}
              >
                <a>Home</a>
              </li>
            </Link>
          </motion.div>

          <motion.div variants={ListItem(visible)}>
            <span>02</span>
            <Link className={styles.link} href="/about">
              <li
                onClick={() => {
                  setVisible('-120vw')
                  setHamburgerState(!hamburgerState)
                }}
              >
                <a>About</a>
              </li>
            </Link>
          </motion.div>
        </div>

        <div className={styles.links_outer}>
          <motion.div variants={ListItem(visible)}>
            <span>03</span>
            <Link className={styles.link} href="/work">
              <li
                onClick={() => {
                  setVisible('-120vw')
                  setHamburgerState(true)
                }}
              >
                <a>Work</a>
              </li>
            </Link>
          </motion.div>

          <motion.div variants={ListItem(visible)}>
            <span>04</span>
            <Link className={styles.link} href="/contact">
              <li
                onClick={() => {
                  setVisible('-120vw')
                  setHamburgerState(!hamburgerState)
                }}
              >
                <a>Contact</a>
              </li>
            </Link>
          </motion.div>
        </div>
      </motion.ul>
    </motion.div>
  )
}
export default Navbar
