import type { CSSProperties } from 'react'
import React from 'react'

interface PropsType {
  style?: CSSProperties
}

const HorizontalLine: React.FC<PropsType> = (props: PropsType) => {
  const defaultStyle: CSSProperties = {
    marginTop: '0px',
    marginBottom: '10px',
    width: '100%',
    height: '1px',
    backgroundColor: '#CFD8D8',
    marginLeft: '0px'
  }

  return <div style={props.style ?? defaultStyle}></div>
}

export default HorizontalLine
