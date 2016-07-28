/**
 * Imports
 */

import QuestionAttachment from 'components/QuestionAttachment'
import QuestionComments from 'components/QuestionComments'
import MarkdownHelper from 'components/MarkdownHelper'
import {generateObjectId} from 'middleware/objectId'
import LineTextarea from 'components/LineTextarea'
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
  const {poll, attachments = [], originalContent, randomize} = object
  const type = getProp('0.objectType', attachments)
  const isMultipleChoice = !poll && type === 'choice'

  return (
    <Block fw='lighter' relative class='question' {...rest}>
      <Block align='start' py mb>
        <Badge mr pt={3} size={25}>{idx + 1}</Badge>
        <Block flex>
          <Block align='start' mt={-8}>
            <Block flex>
              <LineTextarea fs='s' lighter onInput={e => onEdit({...object, originalContent: e.target.value})} defaultValue={originalContent} autofocus />
            </Block>
            <Block alignSelf='baseline'>
              <MarkdownHelper relative mt={8} menuProps={{mr: -12}} />
            </Block>
          </Block>
        </Block>
      </Block>
      <Block align='start' mx={30} column={isMultipleChoice} onKeypress={{enter: type === 'choice' && attach('choice')}}>
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
              poll={poll}
              idx={i} />, attachments)
        }
        {
          !attachments.length && <QuestionTypeMenu attach={attach} />
        }
        {
          isMultipleChoice && (
            <Block mt align='start center' wide>
              <Button bgColor='grey' onClick={attach('choice')} mr>Add Choice</Button>
              <Toggle
                w={350}
                onChange={e => onEdit({...object, randomize: e.target.checked})}
                checked={randomize}
                label='Shuffle choice order' />
            </Block>
          )
        }
      </Block>
    </Block>
  )

  function attach (type, poll) {
    return function * () {
      const id = yield generateObjectId()

      yield onEdit({
        ...object,
        poll: poll === undefined ? object.poll : poll,
        attachments: attachments.concat({
          _id: id,
          objectType: type,
          correctAnswer: []
        })
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
