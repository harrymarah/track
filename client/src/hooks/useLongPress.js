import { useRef } from 'react'

const useLongPress = (clickEvent, longPressEvent) => {
  const timerRef = useRef()
  const isLongPress = useRef()

  const startPressTimer = () => {
    isLongPress.current = false
    timerRef.current = setTimeout(() => {
      isLongPress.current = true
      longPressEvent()
    }, 500)
  }
  const handleOnClick = (e) => {
    if (isLongPress.current) return
    clickEvent()
  }
  const handleOnMouseDown = () => {
    startPressTimer()
  }
  const handleOnMouseUp = () => {
    clearTimeout(timerRef.current)
  }
  const handleOnTouchStart = () => {
    startPressTimer()
  }
  const handleOnTouchEnd = () => {
    clearTimeout(timerRef.current)
  }
  return {
    onClick: handleOnClick,
    onMouseDown: handleOnMouseDown,
    onMouseUp: handleOnMouseUp,
    onTouchStart: handleOnTouchStart,
    onTouchEnd: handleOnTouchEnd,
  }
}

export default useLongPress
