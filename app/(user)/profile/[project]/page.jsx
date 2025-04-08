import React from 'react'
import ViewContent from './ViewContent'

const page = async({params}) => {
  const {project} = await params

  return (
    <ViewContent projectId={project} />
  )
}

export default page