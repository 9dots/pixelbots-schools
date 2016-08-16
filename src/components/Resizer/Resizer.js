/**
 * Imports
 */

import {wrap, CSSContainer} from 'vdux-containers'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
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

export default wrap(CSSContainer)({
  render({props, children, local, state}) {
    let el = null
    const w = 10
    const {x, y, startWidth, startHeight, dragging} = state
    const {focus, object, onEdit} = props
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
        display='inline-block'
        fn={element => el = element}
        tabindex='-1'
        w={image.width * (zoom || 1)}
        maxWidth='100%'
        relative
        {...focusProps}>
        {children}
      <Block
        absolute={{left: w/-4, bottom: w/-4}}
        cursor='nesw-resize'
        draggable='true'
        boxShadow='z1'
        bgColor='blue'
        onMousedown={start}
        hide={!focus || justify === 'left' || justify === 'center'}
        sq={w}
        p={0}
        z={1} />
      <Block
        absolute={{right: w/-4, bottom: w/-4}}
        cursor='nwse-resize'
        draggable='true'
        boxShadow='z1'
        bgColor='blue'
        onMousedown={start}
        hide={!focus || justify === 'right'}
        sq={w}
        p={0}
        z={1} />
        {
          dragging && <Document onMouseup={up} onMouseMove={move} />
        }
    </Block>
    )

    function * move(e) {
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
      yield onEdit({...object, zoom: width / image.width})
    }

    function * up(e) {
      yield local(endDragging)()
    }

    function * start(e) {
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
