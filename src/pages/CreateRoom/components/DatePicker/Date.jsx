import React, { useState } from 'react'
import './Date.scss'
import styled from 'styled-components'
import { Colors } from 'constants/constants'

const DateDiv = styled.div`
  background-color: ${({ isActive }) => isActive ? Colors.PRIMARY_LIGHT: Colors.WHITE};
  height: 60px;
  width: 60px;
  @media (max-width: 500px) {
    height: 40px;
    width: 40px;
  }
  text-align: center;
`

const DateText = styled.p`
  font-size: 20px;
  color: ${({ isActive }) => isActive ? Colors.WHITE : Colors.PRIMARY_LIGHT};
  padding-top: 15px;
  @media (max-width: 500px) {
    font-size: 18px;
    padding-top: 6px;
  }
  margin-top: 0px;
`

const DateHeader = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: ${Colors.PRIMARY_LIGHT};
  padding-top: 15px;
  @media (max-width: 500px) {
    font-size: 16px;
    padding-top: 6px;
  }
  margin-top: 0px;
`

export const DateType = {
  PLACEHOLDER: 0,
  REGULAR: 1,
  HEADER: 2,
  INACTIVE: 3
}

const Date = ({
  date = '',
  type,
  isSelected = false,
  onClick = () => {}
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const isActive = (isHovered || isSelected) && type === DateType.REGULAR
  
  const onDateDivClick = () => {
    setIsHovered(false)
    onClick()
  }

  return (
    <DateDiv isActive={isActive} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={() => onDateDivClick()}>
      {(type === DateType.REGULAR || type === DateType.INACTIVE) && <DateText isActive={isActive}>{date}</DateText>}
      {type === DateType.HEADER && <DateHeader>{date}</DateHeader>}
    </DateDiv>
  )
}

export default Date