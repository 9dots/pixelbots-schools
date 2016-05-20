/**
 * Imports
 */

import handleActions from '@f/handle-actions'
import {Button, Text} from 'vdux-containers'
import createAction from '@f/create-action'
import {closeModal} from 'reducer/modal'
import IntroSteps from './IntroSteps'
import IntroForms from './IntroForms'
import {Block, Modal} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <IntroModal/>
 */

function initialState () {
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
    boxShadow: 'card'
  }

  return (
    <Modal relative w='670' h='535' overlayProps={{bg: 'rgba(51,51,51,0.96)'}}>
      {
        (cur < numSteps) && <IntroSteps cur={cur} counts={counts} />
      }
      {
        (cur >= numSteps) && <IntroForms cur={cur}/>
      }
      <Block hide={cur >= numSteps}>
        <Block absolute top='100%' wide h={btnProps.circle} top  bottom m='auto'>
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
        <Block align='center center' wide absolute top='100%' mt='l'>
          { dots(cur, local) }
        </Block>
      </Block>
    </Modal>
  )
}

function dots(cur, local) {
  const arr = Array.apply(null, Array(numSteps))
  return (
    arr.map((_, i) => <Block pointer circle='8' bgColor={cur == i ? 'white' : 'rgba(255,255,255,.5)'} mx='s' onClick={local(go, i)}></Block>)
  )
}

/**
 * Actions
 */

const next = createAction('<IntroModal/>: next')
const prev = createAction('<IntroModal/>: prev')
const go = createAction('<IntroModal/>: go')

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
  },
  [go]: (state, i) => {
    const cur = i

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


