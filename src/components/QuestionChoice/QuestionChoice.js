/**
 * Imports
 */

import {grey, blue, yellow, green, red} from 'lib/colors'
import BlockInput from 'components/BlockInput'
import {Block, Icon, Checkbox} from 'vdux-ui'
import ChoiceOverview from './ChoiceOverview'
import {Button, Tooltip} from 'vdux-containers'
import Avatar from 'components/Avatar'
import element from 'vdux/element'
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
 * getProps
 */

function getProps (props, context) {
  props.$media = context.uiMedia
  return props
}

/**
 * <QuestionChoice/>
 */

function render ({props}) {
  const {object, editing, $media, onEdit, showAnswers, remove, focusPrevious, overview, answerable, submit, idx, answer = [], actor} = props
  const {content, originalContent} = object
  const isCorrect = object.correctAnswer[0] === object._id
  const chosen = isChosen(object, answer)
  const hasAnswer = !!answer.length
  const bgColor = hasAnswer
    ? chosen ? colors[idx % colors.length] : 'grey_light'
    : colors[idx % colors.length]

  if(overview) return <ChoiceOverview correctCheck={isCorrect && CorrectCheck} bgColor={bgColor} {...props} />

  return (
    <Block
      printProps={{bgColor: 'transparent', p: '2px 0 2px 20px'}}
      onClick={answerable && submitAnswer}
      p={editing ? '12px 30px 12px 18px' : '12px 12px 12px 30px'}
      pointer={answerable}
      align='start center'
      borderRadius='25px'
      bgColor={bgColor}
      relative
      w='70%'
      my='s'>
      {!editing && showAnswers && isCorrect && <CorrectCheck show />}
      {chosen && <ChosenMarker actor={actor} />}
      {
        $media === 'print' && (
          <Block mr>
            <Checkbox checked={chosen} />
          </Block>
        )
      }
      <Block wide>
        {
          !editing
            ? <Block key='a' mx='40px' fs='s' innerHTML={content} class='markdown' printProps={{ml: 0}} />
            : <Block align='start center'>
                <Tooltip message='Mark Correct' mr>
                  <Checkbox checked={isCorrect} onClick={toggleCorrectness} ml='s' />
                </Tooltip>
                <BlockInput
                  onInput={e => onEdit({...object, originalContent: e.target.value})}
                  defaultValue={originalContent}
                  inputProps={{py: 3}}
                  wide
                  fs='s'
                  placeholder={`Choice #${idx + 1}`}
                  lighter
                  mb={0}
                  my={-6}
                  inputProps={{p: '4px 12px 5px', fs: 's', fw: 200}}
                  autofocus={!content}
                  onKeydown={{backspace: e => e.target.value === '' && [remove(), focusPrevious(e.target)]}}/>
                <Button
                  absolute={{right: -24, top: 0, bottom: 0}}
                  onClick={remove}
                  tabindex='-1'
                  icon='close'
                  color='text'
                  my='auto'
                  hide={!idx}
                  fs='s'/>
              </Block>

        }
      </Block>
    </Block>
  )

  function toggleCorrectness (e) {
    return onEdit({
      ...object,
      correctAnswer: object.correctAnswer
        .filter(answer => answer !== object._id)
        .concat(e.target.checked ? object._id : [])
    })
  }

  function * submitAnswer () {
    if (answer.indexOf(object._id) !== -1) {
      yield submit(answer.filter(id => id !== object._id))
    } else {
      yield submit(answer.concat(object._id))
    }
  }
}

function isChosen (obj, answer) {
  answer = [].concat(answer)
  return answer.indexOf(obj._id) !== -1
}

function ChosenMarker ({props}) {
  const {actor} = props

  return (
    <Avatar
      absolute={{left: 8, top: 0, bottom: 0}}
      border='2px solid white'
      boxShadow='0 1px 3px 0 rgba(0,0,0,0.5)'
      actor={actor}
      printProps={{hide: true}}
      size={32}
      m='auto'/>
  )
}

function CorrectCheck ({props}) {
  const {show} = props

  return (
    <Block
      absolute={{left: -18, top: 0, bottom: 0}}
      align='center center'
      bgColor='white'
      boxShadow='0 1px 3px 0 rgba(0,0,0,0.5)'
      color='green'
      hide={!show}
      circle={32}
      printProps={{boxShadow: '0 0 0', borderRadius: 0}}
      m='auto'>
        <Icon fs='s' name='check' />
    </Block>
  )
}

/**
 * Exports
 */

export default {
  getProps,
  render
}
