import React, { useState, useEffect } from 'react'
import styles from './index.module.css'
import Navbar from '../Navbar/index'
import LoadingAnimation from '../LoadingAnimation/index'
import HomeContact from '../HomeContact/index'
import Footer from '../Footer/index'
import ProgressBar from '../ProgressBar/index'

export default function Layout({ children }) {
  const [scrollTop, setScrollTop] = useState(0)
  const [loading, setLoading] = useState(true)

  const onScroll = () => {
    const winScroll = document.documentElement.scrollTop
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight

    const scrolled = (winScroll / height) * 100
    setScrollTop(scrolled)
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2600)

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <div>
          <Navbar />
          <main className={styles.container}>
            {children}
            <HomeContact />
            <Footer />
            <ProgressBar height={scrollTop} />
          </main>
        </div>
      )}
    </>
  )
}
