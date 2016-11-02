/**
 * Imports
 */

import {component, findDOMNode, Document, element} from 'vdux'
import {wrap, CSSContainer} from 'vdux-containers'
import {Block} from 'vdux-ui'

/**
 * <Resizer/>
 */

export default wrap(CSSContainer, {
  focusProps: {focus: true}
})(component({
  render({props, children, state, actions}) {
    const {focus, object} = props
    const {dragging} = state
    const {image, justify = 'center', zoom} = object
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
        <Handle dir='nw' start={actions.start} hide={!focus || justify === 'left'} />
        <Handle dir='ne' start={actions.start} hide={!focus || justify === 'right'} />
        <Handle dir='sw' start={actions.start} hide={!focus || justify === 'left'} />
        <Handle dir='se' start={actions.start} hide={!focus || justify === 'right'} />
        {
          dragging &&
          <Document onMouseup={actions.endDragging} onMouseMove={{handler: actions.move}} />
        }
    </Block>
    )
  },

  events: {
    * move (model, e) {
      const {state, props} = model
      const el = findDOMNode(model)

      const {onEnd, object} = props
      const {image, justify = 'center', zoom} = object
      const {x, y, startWidth, startHeight} = state

      const deltaX = (x - e.clientX) * (justify === 'center' ? 2 : 1)
      const deltaY = (y - e.clientY)
      let newWidth = 0
      let newHeight = 0

      if (isSouth(dir)) newHeight = startHeight - deltaY

      if (isEast(dir)) newWidth = startWidth - deltaX
      else if (isWest(dir)) newWidth = startWidth + deltaX

      const heightRatio = newHeight / image.height
      const widthRatio = newWidth / image.width
      const width = heightRatio < widthRatio
        ? clamp(widthRatio * image.width, 100, image.width)
        : clamp(heightRatio * image.width, 100, image.width)

      el.style.width = width + 'px'
      yield onEnd(width / image.width)
    },

    * start (model, dir, e) {
      const {actions} = model
      const el = findDOMNode(model)
      yield actions.startDragging(dir, e.clientX, e.clientY, el.clientWidth, el.clientHeight)
    }
  },

  reducer: {
    startDragging: (state, dir, x, y, startWidth, startHeight) => ({
      dir,
      x,
      y,
      startWidth,
      startHeight,
      dragging: true
    }),
    endDragging: () => ({dragging: false}),
  }
}))

/**
 * <Handle/>
 */

function Handle ({props}) {
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
      onMousedown={{handler: start(dir)}}
      boxShadow='z1'
      bgColor='blue'
      circle={w}
      m={w/-3}
      {...rest} />
  )
}

/**
 * Helpers
 */

function isNorth (dir) { return dir.indexOf('n') !== -1 }
function isSouth (dir) { return dir.indexOf('s') !== -1 }
function isEast (dir) { return dir.indexOf('e') !== -1 }
function isWest (dir) { return dir.indexOf('w') !== -1 }

function clamp (val, min, max) {
  return Math.min(Math.max(val, min), max)
}
