import React, { Children, useState } from 'react'
import './HorizontalPager.scss'

const HorizontalPager = ({ children, maxNumOfElementsInPage, onPageChange = () => {} }) => {
  const [page, setPage] = useState(0)

  const childrenArr = Children.toArray(children)
  const numElements = children.length
  const maxNumOfPages = Math.ceil(numElements / maxNumOfElementsInPage) - 1
  
  const onLeftButtonClick = () => {
    if (page > 0) {
      setPage(page - 1)
      onPageChange(page - 1)
    }
  }

  const onRightButtonClick = () => {
    if (page < maxNumOfPages) {
      setPage(page + 1)
      onPageChange(page + 1)
    }
  }

  return (
    <div className="horizontal-pager">
      <div className="button-container">
        {page > 0 &&
          <div className="left-button" onClick={() => onLeftButtonClick()}></div>}
      </div>
      {childrenArr.filter((_, ind) => Math.floor(ind / maxNumOfElementsInPage) === page)}
      <div className="button-container">
        {page < maxNumOfPages &&
          <div className="right-button" onClick={() => onRightButtonClick()}></div>}
      </div>
    </div>
  )
}

export default HorizontalPager;