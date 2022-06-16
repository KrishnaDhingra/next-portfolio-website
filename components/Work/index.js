import React, { useState, useEffect } from 'react'
import Aos from 'aos'
import { AnimatePresence } from 'framer-motion'
import { buttons_data, project_data } from './work_data.js'
import DetailProject from '../Detail_Project/index.js'
import styles from './index.module.css'
import sanityClient from '../../client'

// export async function getStaticProps(context) {
//   console.log('hello')
//   const projectsData = sanityClient
//     .fetch(
//       `*[_type == "project"] {
//       _id
//       projectName,
//       technologies,
//       mainImage{
//           asset->{
//             url
//           }
//       },
// }`,
//     )
//     .then((data) => {
//       console.log(data)
//       return data
//     })
//     .catch((err) => err)

//   return {
//     revalidate: 3600,
//     props: {
//       projectsData,
//       data: 'hello',
//     }, // will be passed to the page component as props
//   }
// }

function Work() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState('')
  const [projectType, setProjectType] = useState(null)
  const [projects, setProjects] = useState(null)
  const [filteredProjects, setFilteredProjects] = useState(null)

  useEffect(() => {
    Aos.init({ duration: 1000, offset: 100 })
    sanityClient
      .fetch(
        `*[_type == "project"] {
      _id,
      projectName,
      technologies,
      mainImage{
          asset->{
            url
          }
      },
    }`,
      )
      .then((data) => {
        console.log(data)
        setProjects(data)
        setFilteredProjects(data)
      })
      .catch((err) => {
        console.log(err)
      })
    sanityClient
      .fetch(
        `*[_type == "projectType"] {
          projectType
    }`,
      )
      .then((data) => {
        console.log(data)
        setProjectType(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const close = () => setModalOpen(false)
  const open = () => setModalOpen(true)

  let filterProjects = (e) => {
    if (e.target.innerHTML.toLowerCase() == 'all') {
      setFilteredProjects(projects)
      return
    }
    const filteredProjects = projects.filter(
      (element) => element.category == e.target.innerHTML.toLowerCase(),
    )
    setFilteredProjects(filteredProjects)
  }

  return (
    <div className={styles.work} onClick={close}>
      <div className={styles.button_container}>
        {projectType &&
          projectType.map((element, index) => {
            return (
              <button
                key={index}
                onClick={filterProjects}
                className={styles.work_button}
              >
                {element.projectType}
              </button>
            )
          })}
        {!projectType &&
          [1, 2, 3, 4, 5].map((element, index) => {
            return (
              <div
                key={index}
                className={styles.project_type_button_skeleton}
              ></div>
            )
          })}
      </div>

      <div className={styles.project_container}>
        {filteredProjects &&
          filteredProjects.map((element) => {
            return (
              <div
                key={element._id}
                className={styles.project}
                data-aos="fade-up"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedProject(element._id)
                  modalOpen ? close() : open()
                }}
              >
                <img
                  className={styles.project_image}
                  src={element.mainImage.asset.url}
                  alt={`${element.projectName} Image`}
                />
                <span className={styles.project_description}>
                  {element.projectName}
                </span>
                <div className={styles.technologies_used_container}>
                  {element.technologies.map((item, index) => {
                    return (
                      <span key={index} className={styles.technologies_used}>
                        {item}
                      </span>
                    )
                  })}
                </div>
              </div>
            )
          })}
        {!filteredProjects &&
          [1, 2, 3, 4, 5, 6].map((element, index) => {
            return (
              <div
                key={index}
                className={styles.project}
                data-aos="fade-up"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedProject(element._id)
                  modalOpen ? close() : open()
                }}
              >
                <div className={styles.project_image_skeleton}></div>
                <div className={styles.project_description_skeleton}></div>
                <div className={styles.technologies_used_container}>
                  {[1, 2, 3].map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={styles.technologies_used_skeleton}
                      ></div>
                    )
                  })}
                </div>
              </div>
            )
          })}
      </div>

      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {modalOpen && (
          <DetailProject
            modalOpen={modalOpen}
            handleClose={close}
            projectId={selectedProject}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Work
