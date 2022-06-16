import React, { useEffect } from 'react'
import styles from './index.module.css'
import Link from 'next/link'
import Aos from 'aos'

function HomeContact() {
  useEffect(() => {
    Aos.init({ duration: 1000, offset: 100 })
  }, [])

  return (
    <div className={styles.home_contact}>
      <div className={styles.home_contact_text} data-aos="fade-up">
        I'd love to make something for you or your company
      </div>
      <Link href="/contact">
        <button className={styles.home_contact_button}>Hire Me</button>
      </Link>
    </div>
  )
}

export default HomeContact
