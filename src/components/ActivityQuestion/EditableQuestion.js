/**
 * Imports
 */

import QuestionAttachment from 'components/QuestionAttachment'
import QuestionComments from 'components/QuestionComments'
import ObjectControls from 'components/ObjectControls'
import MarkdownHelper from 'components/MarkdownHelper'
import {generateObjectId} from 'middleware/objectId'
import LineTextarea from 'components/LineTextarea'
import QuestionTypeMenu from './QuestionTypeMenu'
import {Button, Toggle} from 'vdux-containers'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import {Block, Badge, Icon} from 'vdux-ui'
import element from 'vdux/element'
import getProp from '@f/get-prop'
import summon from 'vdux-summon'
import map from '@f/map'

/**
 * <EditableQuestion/>
 */

function render ({props}) {
  const {object, idx,  onEdit, ...rest} = props
  const {poll, attachments = [], originalContent, randomize,caseSensitive} = object
  const type = getProp('0.objectType', attachments)
  const isMultipleChoice = !poll && type === 'choice'
  // Make sure type is choice because poll doesn't get set
  // false when switching to short or free
  const isPoll = poll && type === 'choice'

  return (
    <Block fw='lighter' relative class='question' {...rest}>
      <Block align='start' py mb>
        <Badge mr='l' pt={3} size={25}>{idx + 1}</Badge>
        <Block flex>
          <Block align='start' mt={-8} mb='l'>
            <Block flex>
              <LineTextarea fs='s' placeholder='Ask your class a question…' lighter onInput={e => onEdit({...object, originalContent: e.target.value})} defaultValue={originalContent} autofocus />
            </Block>
            <Block alignSelf='baseline' relative z={3}>
              <MarkdownHelper mt={8} menuProps={{mr: -12}} />
            </Block>
          </Block>
          <Block align='start' column={isMultipleChoice} onKeypress={{enter: type === 'choice' && attach('choice')}}>
            {
              map((att, i) => <QuestionAttachment
                  question={object}
                  focusPrevious={focusPrevious}
                  remove={() => onEdit({
                    ...object,
                    attachments: attachments.filter(({_id}) => _id !== att._id)
                  })}
                  onEdit={newObj => onEdit({
                    ...object,
                    attachments: attachments.map(att => att._id === newObj._id
                      ? newObj
                      : att)
                  })}
                  editing
                  object={att}
                  key={att._id}
                  numAtt={attachments.length}
                  poll={poll}
                  idx={i} />, attachments)
            }
            {
              isMultipleChoice && (
                <Block mt align='start center' wide>
                  <Button
                    hoverProps={{highlight: .03}}
                    focusProps={{highlight: .03}}
                    onClick={attach('choice')}
                    borderColor='grey_medium'
                    bgColor='white'
                    color='text'
                    mr>
                  <Icon name='add' fs='s' mr='s' />
                  Add Choice
                  </Button>
                </Block>
              )
            }
            {
              isPoll && (
                <Block align='center center' mr={-44}>
                  <Button onClick={attach('choice')} m='auto' bgColor='grey' p={0} sq={50} ml='s'>
                    <Icon name='add' fs='s' />
                  </Button>
                </Block>
              )
            }
          </Block>
        </Block>
      </Block>
      <ObjectControls {...props}>
        <QuestionTypeMenu object={object} attach={attach} />
        {
          isMultipleChoice &&
            <Toggle
              onChange={e => onEdit({...object, randomize: e.target.checked})}
              label='Shuffle Choice Order'
              checked={randomize}
              w={370}
              ml/>
        }
        {
          type === 'shortAnswer' &&
            <Toggle
              onChange={e => onEdit({
                ...object,
                attachments: [{
                  ...object.attachments[0],
                  caseSensitive: e.target.checked
                }]
              })}
              label='Case Sensitive'
              checked={object.attachments[0].caseSensitive}
              w={370}
              ml/>
        }
      </ObjectControls>
    </Block>
  )

  function attach (type, poll, removeAll, setCorrect) {
    return function * () {
      const id = yield generateObjectId()
      const newObj = {
        _id: id,
        objectType: type,
        correctAnswer: setCorrect ? [id] : []
      }

      yield onEdit({
        ...object,
        poll: poll === undefined ? object.poll : poll,
        attachments: removeAll
          ? [newObj]
          : attachments.concat(newObj)
      })
    }
  }

  // XXX This is a bit of a hack to give focus to the previous
  // choice when deleting
  function focusPrevious (node) {
    let p = node
    while ((p = p.parentNode) && p.className.indexOf('question') === -1)
      ;

    if (p) {
      const inputs = [].slice.call(p.querySelectorAll('input'))
      if (inputs.length) {
        const idx = inputs.indexOf(node)
        setTimeout(() => inputs[idx - 1].focus())
      }
    }
  }
}


/**
 * Exports
 */

export default {
  render
}
