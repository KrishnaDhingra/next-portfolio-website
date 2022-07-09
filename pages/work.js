import React, { useState } from 'react'
import sanityClient from '../client'
import Work from '../components/Work/index'

export async function getStaticProps(context) {
  const projectsData = sanityClient
    .fetch(
      `*[_type == "project"] {
  _id,
  projectName,
  technologies,
  projectType-> {
    projectType
  },
  mainImage{
      asset->{
        url
      }
  },
}`,
    )
    .then((data) => {
      console.log
      return data
    })
    .catch((err) => {
      console.log(err)
    })

  const projectTypes = sanityClient
    .fetch(
      `*[_type == "projectType"] {
      projectType
}`,
    )
    .then((data) => {
      // return data
      return [{ projectType: 'all' }, ...data]
    })
    .catch((err) => {
      console.log(err)
    })

  return {
    revalidate: 3600,
    props: {
      projectsData: await projectsData,
      projectTypes: await projectTypes,
    }, // will be passed to the page component as props
  }
}

export default function WorkPage({ projectsData, projectTypes }) {
  return <Work projectsData={projectsData} projectTypes={projectTypes} />
}
