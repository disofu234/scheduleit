import React, { useState } from 'react'
import './PagedForm.scss'
import 'animate.css'

const PagedForm = ({ pages }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [shouldAnimateContent, setShouldAnimateContent] = useState(false)

  const isFirstPage = currentPage === 0
  const isLastPage = currentPage === pages.length - 1

  const { message, content, shouldShowNextButton } = pages[currentPage]

  const nextButtonClass = 
    'animate__animated next-button' +
    (shouldShowNextButton ? ' animate__fadeIn' : '')

  const onNextButtonClick = () => {
    setCurrentPage(currentPage + 1)
    setShouldAnimateContent(true)
  }

  const onPreviousButtonClick = () => {
    setCurrentPage(currentPage - 1)
    setShouldAnimateContent(true)
  }

  const animateClass = shouldAnimateContent ? ' animate__fadeIn' : ''

  return (
    <div className={'paged-form-wrapper animate__animated' + animateClass} onAnimationEnd={() => setShouldAnimateContent(false)}>
      <div className='paged-form-message'>{message}</div>
      <div className='paged-form-content'>
        <div>{content}</div>
      </div>
      <div className='paged-form-footer'>
        {!isFirstPage ? <div className='previous-button' onClick={() => onPreviousButtonClick()}>{"Back"}</div> : <div></div>}
        {!isLastPage && shouldShowNextButton && <div className={nextButtonClass} onClick={() => onNextButtonClick()}>{"Next"}</div>}
      </div>
    </div>
  )
}

export default PagedForm