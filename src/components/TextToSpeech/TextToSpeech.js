/**
 * Imports
 */

import {playSpeech, cancelSpeech, ffSpeech, resumeSpeech, pauseSpeech, rwSpeech} from 'middleware/speechSynth'
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

  const handleEnd = () => [
    cancelSpeech(),
    onEnd(),
    local(setState, 'stopped')()
  ]

  return (
    <Block align='start center' mr='s' onClick={e => e.stopPropagation()} {...rest}>
      <Button
        icon={isPlaying || isPaused ? 'volume_off' : 'volume_up'}
        onClick={
          isStopped
            ? [
                local(setState, 'playing'),
                () => playSpeech({
                  text,
                  rate,
                  onEnd: handleEnd
                })
              ]
            : [handleEnd, local(setState, 'stopped')]
        }
        {...btnProps}
        disabled={false}/>
      {
        text.length >= 4 && (
          <Block align='start center' disabled={isStopped}>
            <Button
              icon='fast_rewind'
              onClick={rwSpeech}
              {...btnProps} />
            <Button
              icon={isPaused ? 'play_arrow' : 'pause'}
              onClick={
                isPaused
                  ? [resumeSpeech, local(setState, 'playing')]
                  : [pauseSpeech, local(setState, 'paused')]
              }
              {...btnProps} />
            <Button
              icon='fast_forward'
              onClick={ffSpeech}
              {...btnProps} />
          </Block>
        )
      }
    </Block>
  )
}

/**
 * Helpers
 */

function makeReadable (text) {
  if(text) {
    return text.replace(/__+/g, ', blank,')
      .replace(/&amp;/g, 'and')
      .split(/[\.!\?]”?\s|[\n\r]/)
      .filter(t => !!t)
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

function onRemove ({props, state}) {
  if (state.playState === 'playing') {
    return cancelSpeech()
  }
}

/**
 * Exports
 */

export default {
  render,
  reducer,
  onRemove
}
