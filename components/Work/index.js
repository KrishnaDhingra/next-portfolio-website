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

function Work(props) {
  console.log(props.data)
  useEffect(() => {
    Aos.init({ duration: 1000, offset: 100 })
    sanityClient
      .fetch(
        `*[_type == "project"] {
      _id
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
        return data
      })
      .catch((err) => err)
  }, [])

  const [modalOpen, setModalOpen] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [projects, setProjects] = useState(project_data)

  const close = () => setModalOpen(false)
  const open = () => setModalOpen(true)

  let show = (e) => {
    if (e.target.innerHTML.toLowerCase() == 'all') {
      setProjects(project_data)
      return
    }
    const newProjects = project_data.filter(
      (element) => element.category == e.target.innerHTML.toLowerCase(),
    )
    setProjects(newProjects)
  }

  return (
    <div className={styles.work} onClick={close}>
      <div className={styles.button_container}>
        {buttons_data.map((element) => {
          return (
            <button onClick={(e) => show(e)} className={styles.work_button}>
              {element.innerHTML}
            </button>
          )
        })}
      </div>

      <div className={styles.project_container}>
        {projects.map((element) => {
          return (
            <div
              className={styles.project}
              data-aos="fade-up"
              onClick={(e) => {
                e.stopPropagation()
                modalOpen ? close() : open()
                setProjectName(element.description)
              }}
            >
              <img className={styles.project_image} src={element.image} />
              <span className={styles.project_description}>
                {element.description}
              </span>
              <div className={styles.technologies_used_container}>
                {element.technologies_used.map((element2) => {
                  return (
                    <span className={styles.technologies_used}>{element2}</span>
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
            project_name={projectName}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Work
