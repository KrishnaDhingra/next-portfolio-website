import styles from './index.module.css'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { IoClose } from 'react-icons/io5'
import Backdrop from '../Backdrop/index'
import sanityClient from '../../client'

function DetailProject({ handleClose, projectId }) {
  const [activeImage, setActiveImage] = useState(null)
  const [project, setProject] = useState(null)

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "project"] {
          projectName,
          description,
          desktopImage{
              asset->{
                url
              }
          },
          tabletImage{
              asset->{
                url
              }
          },
          mobileImage{
              asset->{
                url
              }
          },
          websiteLink,
          codeLink
    }`,
      )
      .then((data) => {
        console.log(data)
        setProject(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

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
      {project && (
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
            <img
              className={styles.hero_image}
              src={activeImage}
              alt={`${project.projectName} Image`}
            />
            <div className={styles.left_button_container}>
              <button
                className={styles.left_buttons}
                onClick={setActiveImage(project.desktopImage.asset.url)}
              >
                desktop
              </button>
              <button
                className={styles.left_buttons}
                onClick={setActiveImage(project.tabletImage.asset.url)}
              >
                tablet
              </button>
              <button
                className={styles.left_buttons}
                onClick={setActiveImage(project.mobileImage.asset.url)}
              >
                mobile
              </button>
            </div>
          </div>
          <div className={styles.right_container}>
            <h1 className={styles.heading}>Description</h1>
            <p className={styles.description}>{project.description}</p>
            <div className={styles.right_button_container}>
              <a
                href={project.websiteLink}
                target="_blank"
                className={`${styles.preview} ${styles.left_buttons}`}
              >
                Preview Site
              </a>
              <a
                href={project.codeLink}
                target="_blank"
                className={`${styles.code} ${styles.left_buttons}`}
              >
                View Code
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </Backdrop>
  )
}
export default DetailProject
