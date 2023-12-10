import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={0.6}
    width={400}
    height={500}
    viewBox="0 0 400 160"
    backgroundColor="var(--white-800)"
    foregroundColor= 'var(--white-900)'
    
    {...props}
  >
    <circle cx="10" cy="80" r="4" />
    <circle cx="30" cy="80" r="4" />
    <circle cx="50" cy="80" r="4" />
  </ContentLoader>
)

export default MyLoader

