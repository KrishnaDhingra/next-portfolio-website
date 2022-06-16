import styles from './index.module.css'
import { project_detail } from '../Work/work_data.js'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IoClose } from 'react-icons/io5'
import Backdrop from '../Backdrop/index'

function DetailProject({ modalClose, handleClose, project_name }) {
  const [imageView, setImageView] = useState('desktop')

  let detailedProjectData = ''

  detailedProjectData = project_detail.filter((e) => e.name == project_name)
  detailedProjectData = detailedProjectData[0]

  let image = ''
  let website_url = detailedProjectData.website_url
  let code_url = detailedProjectData.code_url
  let desktop_image = detailedProjectData.desktop_image
  let tablet_image = detailedProjectData.tablet_image
  let mobile_image = detailedProjectData.mobile_image
  let description = detailedProjectData.description

  if (imageView == 'desktop') {
    image = desktop_image
  } else if (imageView == 'tablet') {
    image = tablet_image
  } else {
    image = mobile_image
  }

  const dropIn = {
    hidden: {
      y: '-100vh',
    },
    visible: {
      y: '0vh',
      transition: {
        duration: 0.2,
        type: 'spring',
        damping: 25,
        stiffness: 400,
      },
    },
    exit: {
      y: '100vh',
    },
  }
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        className={styles.detail_project_container}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <IoClose className={styles.close_button} onClick={handleClose} />

        <div className={styles.left_container}>
          <img className={styles.hero_image} src={image} alt="" />
          <div className={styles.left_button_container}>
            {['desktop', 'tablet', 'mobile'].map((item) => {
              return (
                <button
                  className={styles.left_buttons}
                  onClick={() => {
                    setImageView(item)
                  }}
                >
                  {item}
                </button>
              )
            })}
          </div>
        </div>
        <div className={styles.right_container}>
          <h1 className={styles.heading}>Description</h1>
          <p className={styles.description}>{description}</p>
          <div className={styles.right_button_container}>
            <a
              href={website_url}
              target="_blank"
              className={`${styles.preview} ${styles.left_buttons}`}
            >
              Preview Site
            </a>
            <a
              href={code_url}
              target="_blank"
              className={`${styles.code} ${styles.left_buttons}`}
            >
              View Code
            </a>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  )
}
export default DetailProject
