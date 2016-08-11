/**
 * Imports
 */

import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import {openModal} from 'reducer/modal'
import {Button, Block} from 'vdux-ui'
import Confirm from 'modals/Confirm'
import element from 'vdux/element'
import noop from '@f/noop'

/**
 * <TextToSpeech/>
 */
let i = 0
let msg

function render ({props, state, local}) {
  const {
    rate, current, onStart = noop, onEnd = noop, ...rest
  } = props
  const text = makeReadable(props.text)
  const {playState = 'stopped'} = state
  const isStopped = playState === 'stopped'
  const isPlaying = playState === 'playing'
  const isPaused = playState === 'paused'
  const btnProps = {
    color: 'text',
    mr: 's',
    fs: 's',
    disabled: isStopped
  }

  return (
    <Block align='start center' mr='s' onClick={e => e.stopPropagation()} {...rest}>
      <Button
        icon={isPlaying || isPaused ? 'volume_off' : 'volume_up'}
        onClick={start}
        {...btnProps}
        disabled={false}/>
      <Block align='start center' disabled={isStopped} hide={text.length < 4}>
        <Button
          icon='fast_rewind'
          onClick={back}
          {...btnProps} />
        <Button
          icon={isPaused ? 'play_arrow' : 'pause'}
          onClick={pause}
          {...btnProps} />
        <Button
          icon='fast_forward'
          onClick={next}
          {...btnProps} />
      </Block>
    </Block>
  )

  function * start() {
    if('speechSynthesis' in window) {
      speechSynthesis.cancel()
      yield onStart()
      if(playState === 'stopped') {
        yield play()
      } else {
        yield end()
      }
    } else {
      yield openModal(() => <Confirm header='Browser Incompatible' message='Your browser does not support reading text. Please use the most up to date versions of Chrome or Safari to enable this feature.' />)
    }
  }

  function * play() {
    yield local(setState, 'playing')()
    speechSynthesis.resume()
    msg = new SpeechSynthesisUtterance(text[i])
    msg.lang = 'en-US'
    msg.rate = rate
    speechSynthesis.speak(msg)
    yield dispatch => {
      msg.onend = function () {
        if(i === text.length - 1 || !current)
          dispatch(end())
        else {
          i++
          dispatch(play())
        }
      }
    }
  }

  function next () {
    speechSynthesis.cancel()
  }

  function * pause () {
    if(speechSynthesis.paused) {
      speechSynthesis.resume()
      yield local(setState, 'playing')()
    } else {
      speechSynthesis.pause()
      yield local(setState, 'paused')()
    }

  }

  function * back () {
    if(msg) msg.onend = null
    i = Math.max(i - 2, -1)
    speechSynthesis.cancel()
    i++
    yield play()
  }

  function * end() {
    yield onEnd()
    if(msg) msg.onend = null
    yield local(setState, 'stopped')()
    i = 0
  }
}

/**
 * Helpers
 */

function makeReadable(text) {
  if(text) {
    return text.replace(/__+/g, ', blank,')
      .replace(/&amp;/g, 'and')
      .split(/[\.!\?]”?\s|[\n\r]/)
  } else {
    return ['Text is not readable.']
  }
}

/**
 * Actions
 */

const setState = createAction('<TextToSpeech/>: set state')

/**
 * Reducer
 */

const reducer = handleActions({
  [setState]: (state, playState) => ({...state, playState})
})

/**
 * onRemove
 */

function * onRemove ({props}) {
  if(msg) msg.onend = null
  i = 0
  speechSynthesis.cancel()
  yield props.onEnd()
}

/**
 * Exports
 */

export default {
  render,
  reducer,
  onRemove
}
