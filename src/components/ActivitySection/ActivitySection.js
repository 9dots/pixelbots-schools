/**
 * Imports
 */

import ActivityObject from 'components/ActivityObject'
import {component, element} from 'vdux'
import {Block} from 'vdux-ui'
import sleep from '@f/sleep'

/**
 * <ActivitySection/>
 */

export default component({
  initialState: ({props}) => ({
    limit: props.object.attachments.length <= 10
      ? undefined
      : 10
  }),

  * onCreate ({props, actions}) {
    yield sleep(16)
    yield actions.setObjectLimit(undefined)
  },

  render ({context, state, props}) {
    const {object, selectedObject, showAnswers, showAnswersOnPrint, instances, ...rest} = props

    const renderedAttachments = state.limit === undefined
      ? object.attachments
      : object.attachments.slice(0, state.limit)

    const overviewQuestions = instances && showPollResults
      ? getOverviewQuestions(attachments, instances)
      : []

    let i = 0

    return (
      <Block>
        {
          renderedAttachments.map(object => <ActivityObject
            {...rest}
            object={object}
            isSelected={selectedObject === object._id}
            idx={object.objectType === 'question' ? i++ : null}
            showAnswers={context.uiMedia === 'print' ? showAnswersOnPrint : showAnswers}
            overviewQuestion={object.objectType === 'question' ? overviewQuestions[i] : null} />
          )
        }
      </Block>
    )
  },

  reducer: {
    setObjectLimit: (state, limit) => ({limit})
  }
})
