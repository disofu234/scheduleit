import { useState, useEffect } from 'react'

export const useWidth = () => {
  const [width, setWidth] = useState(window.screen.width)

  useEffect(() => {
    const handleResize = () => setWidth(window.screen.width)

    window.addEventListener('resize', handleResize)

    return _ => window.removeEventListener('resize', handleResize)
  })

  return width
}