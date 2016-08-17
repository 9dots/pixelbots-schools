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
    const {x, y, startWidth, startHeight, dragging, dir} = state
    const {focus, object, onEnd} = props
    const {image, justify = 'left', zoom} = object
    const focusProps = focus
      ? {
          outline: '1px solid',
          outlineColor: 'blue_light',
          boxShadow: '0 0 6px rgba(blue, .8)'
        }
      : {}

    return (
      <Block
        w={image.width * (zoom || 1)}
        display='inline-block'
        maxWidth='100%'
        tabindex='-1'
        relative
        {...focusProps}>
        {children}
        <Handle dir='nw' start={start} hide={!focus || justify === 'left'} />
        <Handle dir='ne' start={start} hide={!focus || justify === 'right'} />
        <Handle dir='sw' start={start} hide={!focus || justify === 'left'} />
        <Handle dir='se' start={start} hide={!focus || justify === 'right'} />
        {
          dragging &&
          <Document onMouseup={local(endDragging)} onMouseMove={move} />
        }
    </Block>
    )

    function * move(e) {
      const el = findDOMNode(model)
      const deltaX = (x - e.clientX) * (justify === 'center' ? 2 : 1)
      const deltaY = (y - e.clientY)
      let newWidth = 0
      let newHeight = 0

      if(isSouth(dir))
        newHeight = startHeight - deltaY

      if(isEast(dir))
        newWidth = startWidth - deltaX
      else if(isWest(dir))
        newWidth = startWidth + deltaX

      const heightRatio = newHeight / image.height
      const widthRatio = newWidth / image.width
      const width = heightRatio < widthRatio
        ? clamp(widthRatio * image.width, 100, image.width)
        : clamp(heightRatio * image.width, 100, image.width)

      el.style.width = width + 'px'
      yield onEnd(width / image.width)
    }

    function * start(e, dir) {
      const el = findDOMNode(model)
      yield local(
        startDragging, {
          dir,
          x: e.clientX,
          y: e.clientY,
          startWidth: el.clientWidth,
          startHeight: el.clientHeight
        }
      )()
    }
  },
  reducer: handleActions({
    [startDragging]: (state, {dir, x, y, startWidth, startHeight}) => ({
      ...state, dir, x, y, startWidth, startHeight, dragging: true
    }),
    [endDragging]: state => ({...state, dragging: false}),
  })
})

/**
 * Handles
 */

function Handle({props}) {
  const {dir, start, ...rest} = props
  const w = 11
  return (
    <Block
      cursor={dir === 'sw' || dir === 'ne' ? 'nesw-resize' : 'nwse-resize'}
      absolute={{
        top: isNorth(dir) ? 0 : 'auto',
        right: isEast(dir) ? 0 : 'auto',
        bottom: isSouth(dir) ? 0 : 'auto',
        left: isWest(dir) ? 0 : 'auto'
      }}
      onMousedown={e => start(e, dir)}
      boxShadow='z1'
      bgColor='blue'
      circle={w}
      m={w/-3}
      {...rest}/>
  )
}

/**
 * Helpers
 */

function isNorth(dir) { return dir.indexOf('n') !== -1 }
function isSouth(dir) { return dir.indexOf('s') !== -1 }
function isEast(dir) { return dir.indexOf('e') !== -1 }
function isWest(dir) { return dir.indexOf('w') !== -1 }

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max)
}
