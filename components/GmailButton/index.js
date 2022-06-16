import React from 'react'
import styles from './index.module.css'
import { CgMail } from 'react-icons/cg'
import { motion } from 'framer-motion'
import { FadeIn } from '../AnimationVariants'

const GmailButton = () => {
  return (
    <motion.div
      className={styles.gmailbuttoncontainer}
      variants={FadeIn('up')}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.icon_container}>
        <CgMail className={styles.mail_icon} />
      </div>
      <div className={styles.mail_container}>
        <span className={styles.mail}>dkrishna1608@gmail.com</span>
      </div>
    </motion.div>
  )
}
export default GmailButton
