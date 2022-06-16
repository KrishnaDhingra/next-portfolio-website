import React from 'react'
import GmailButton from '../GmailButton/index'
import styles from './index.module.css'
import { motion } from 'framer-motion'
import { FadeIn, FadeInExtreme } from '../AnimationVariants'
// import Typewriter from 'typewriter-effect'

function FirstHomeComponent() {
  // const typeWriteOptions = {
  //   strings: ['Frontend Dev.', 'Blockchain Dev.', 'Freelancer', 'Student'],
  //   autoStart: true,
  //   loop: true,
  // }
  return (
    <div className={styles.first_home_component}>
      <motion.div
        className={styles.home_top_container}
        variants={FadeIn('down')}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.name}>krishna</div>
      </motion.div>

      <div className={styles.home_bottom_container}>
        <div className={styles.home_text_container}>
          <motion.div
            className={styles.home_text_left}
            variants={FadeInExtreme()}
            initial="hidden"
            animate="visible"
          >
            Hello 👋
            <br /> I'm Krishna Dhingra, <br />
            <span className={styles.typing_text}>
              Hello World
              {/* <Typewriter options={typeWriteOptions} /> */}
            </span>
          </motion.div>
          <div className={styles.home_text_right}></div>
        </div>
        <GmailButton />
      </div>
    </div>
  )
}

export default FirstHomeComponent
