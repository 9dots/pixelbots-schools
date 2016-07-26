/**
 * Imports
 */

import PollChoiceOverview from './PollChoiceOverview'
import {grey, blue, yellow, green, red} from 'lib/colors'
import BlockInput from 'components/BlockInput'
import {Button} from 'vdux-containers'
import Avatar from 'components/Avatar'
import element from 'vdux/element'
import {Block} from 'vdux-ui'
import Color from 'Color'

/**
 * Colors
 */

const colors = [
  blue,
  yellow,
  green,
  red,
  Color(grey).lighten(0.6).rgbString()
].map(c => Color(c).lighten(0.3).rgbString())

/**
 * <QuestionPollChoice/>
 */

function render ({props}) {
  const {object, idx, editing, onEdit, remove, answerable, overview, focusPrevious, submit, answer = [], actor} = props
  const {content, originalContent} = object
  const chosen = answer[0] === object._id
  const hasAnswer = !!answer.length
  const bgColor = hasAnswer
    ? chosen ? colors[idx % colors.length] : 'grey_light'
    : colors[idx % colors.length]

  if(overview) return <PollChoiceOverview bgColor={bgColor} {...props} />

  return (
    <Block
      onClick={answerable && submitAnswer}
      pointer={answerable}
      bgColor={bgColor}
      boxShadow='card'
      maxWidth='140px'
      flex='0 0 30%'
      flexShrink='1'
      rounded='4px'
      relative
      mx='1%'
      tall
      >
      <Button zIndex={2} hide={!editing} color='text' absolute='top 4px right 4px' icon='close' onClick={remove} fs='s' tabindex='-1' />
      <Block pb='100%' wide relative>
        <Block absolute wide tall top left align='center center'>
          {
            !editing
              ? <Block p='s' class='markdown' fs='s' textAlign='center' innerHTML={content} />
              : <BlockInput
                  onInput={e => onEdit({...object, originalContent: e.target.value})}
                  defaultValue={originalContent}
                  mx={5}
                  fs='s'
                  placeholder={`Choice #${idx+1}`}
                  inputProps={{textAlign:'center', p: '6px 12px 5px', fs: 's', fw: 200}}
                  autofocus={!content}
                  onKeydown={{backspace: e => e.target.value === '' && [remove(), focusPrevious(e.target)]}} />
          }
        </Block>
        { chosen && <ChosenMarker actor={actor} /> }
      </Block>
    </Block>
  )

  function * submitAnswer () {
    yield submit(chosen ? [] : [object._id])
  }
}

function ChosenMarker ({props}) {
  const {actor} = props

  return (
    <Avatar
      absolute={{right: -6, top: -6}}
      border='2px solid white'
      boxSizing='content-box'
      boxShadow='z2'
      actor={actor}
      size='23%'
      m='auto'/>
  )
}

/**
 * Exports
 */

export default {
  render
}
