/**
 * Imports
 */

import {Block, Modal, Image, Icon, Flex} from 'vdux-ui'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import IntroSteps from './IntroSteps'
import IntroForms from './IntroForms'
import {Button, Text} from 'vdux-containers'
import element from 'vdux/element'

/**
 * <IntroModal/>
 */

function initialState() {
  return {
    cur: 0,
    counts: {}
  }
}

function render ({props, state, local}) {
  const {cur, counts} = state
  const btnProps = {
    bgColor: 'white',
    color: 'text',
    circle: '40px',
    align: 'center center',
    fs: 'm',
    p: 0,
    boxSadhow: 'card'
  }

  return (
    <Modal relative w='670' h='535'>
      {
        (cur < numSteps) && <IntroSteps cur={cur} counts={counts} />
      }
      {
        (cur >= numSteps) && <IntroForms cur={cur}/>
      }
      <Block absolute top='100%' wide h={btnProps.circle} top  bottom m='auto' hide={cur >= numSteps}>
        <Button
          icon='keyboard_arrow_left'
          onClick={local(prev)}
          {...btnProps}
          hide={cur <= 0}
          right='100%'
          absolute
          mr />

        <Button
          icon='keyboard_arrow_right'
          onClick={local(next)}
          {...btnProps}
          left='100%'
          absolute
          ml />
      </Block>
    </Modal>
  )
}

/**
 * Actions
 */

const next = createAction('<IntroModal/>: next')
const prev = createAction('<IntroModal/>: prev')

/**
 * Reducer
 */

const {numSteps} = IntroSteps
const reducer = handleActions({
  [prev]: state => {
    const cur = Math.max(state.cur - 1, 0)

    return {
      ...state,
      cur,
      counts: {
        ...state.counts,
        [cur]: (state.counts[cur] || 0) + 1
      }
    }
  },
  [next]: state => {
    const cur = Math.min(state.cur + 1, numSteps)

    return {
      ...state,
      cur,
      counts: {
        ...state.counts,
        [cur]: (state.counts[cur] || 0) + 1
      }
    }
  }
})


/**
 * Exports
 */

export default {
  render,
  initialState,
  reducer
}


