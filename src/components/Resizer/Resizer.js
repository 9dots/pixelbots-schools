/**
 * Imports
 */

import {wrap, CSSContainer} from 'vdux-containers'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import {findDOMNode} from 'vdux/dom'
import Document from 'vdux/document'
import element from 'vdux/element'
import {Block} from 'vdux-ui'


/**
 * Actions
 */

const startDragging = createAction('<Resizer/>: start dragging')
const endDragging = createAction('<Resizer/>: end dragging')

/**
 * <Resizer/>
 */

export default wrap(CSSContainer, {
  focusProps: { focus: true }
})({
  render(model) {
    const {props, children, local, state} = model
    const w = 10
    const {x, y, startWidth, startHeight, dragging} = state
    const {focus, object, onEnd} = props
    const {image, justify = 'left', zoom} = object
    const focusProps = focus
      ? {
          outline: '1px solid',
          outlineColor: 'blue_light',
          boxShadow: '0 0 6px rgba(blue, .8)'
        }
      : {}

    const handleProps = {
      boxShadow: 'z1', bgColor: 'blue', sq: w, p: 0, z: 1
    }
    return (
      <Block
        w={image.width * (zoom || 1)}
        display='inline-block'
        maxWidth='100%'
        tabindex='-1'
        relative
        {...focusProps}>
        {children}
      <Block
        hide={!focus || justify === 'left' || justify === 'center'}
        absolute={{left: w/-4, bottom: w/-4}}
        cursor='nesw-resize'
        onMousedown={start}
        {...handleProps} />
      <Block
        absolute={{right: w/-4, bottom: w/-4}}
        hide={!focus || justify === 'right'}
        cursor='nwse-resize'
        onMousedown={start}
        {...handleProps} />
        {
          dragging &&
          <Document onMouseup={local(endDragging)} onMouseMove={move} />
        }
    </Block>
    )

    function * move(e) {
      const el = findDOMNode(model)
      const deltaX = x - e.clientX
      const deltaY = y - e.clientY
      const newHeight = startHeight - deltaY
      let newWidth = startWidth + deltaX

      if(justify === 'center')
        newWidth = startWidth - deltaX * 2
      else if(justify === 'left')
        newWidth = startWidth - deltaX

      const heightRatio = newHeight / image.height
      const widthRatio = newWidth / image.width
      const width = heightRatio < widthRatio
        ? clamp(widthRatio * image.width, 100, image.width)
        : clamp(heightRatio * image.width, 100, image.width)

      el.style.width = width + 'px'
      yield onEnd(width / image.width)
    }

    function * start(e) {
      const el = findDOMNode(model)
      yield local(
        startDragging, {
          x: e.clientX,
          y: e.clientY,
          startWidth: el.clientWidth,
          startHeight: el.clientHeight
        }
      )()
    }
  },
  reducer: handleActions({
    [startDragging]: (state, {x, y, startWidth, startHeight}) => ({
      ...state, x, y, startWidth, startHeight, dragging: true
    }),
    [endDragging]: state => ({...state, dragging: false}),
  })
})

/**
 * Helpers
 */

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max)
}
