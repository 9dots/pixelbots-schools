/**
 * Imports
 */

import {Button, Textarea} from 'vdux-containers'
import {Block, Card} from 'vdux-ui'
import Avatar from 'components/Avatar'
import element from 'vdux/element'
import summon from 'vdux-summon'
import Form from 'vdux-form'
import Schema from '@weo-edu/schema'
import validate from '@weo-edu/validate'

/**
 * Comment Form
 */

function render({props}) {
  const {
    currentUser, makeComment,
    id, classId, makingComment = {}
  } = props
  return (
    <Form p='l' bg='off_white' borderTop='1px solid rgba(black, .05)' align='start start' onSubmit={createShare} validate={validateComment}>
      <Avatar actor={currentUser} size='40px' />
      <Block flex mx>
        <Textarea
          focusProps={{border: '1px solid rgba(37, 168, 224, 0.35)'}}
          activeProps={{border: '1px solid rgba(37, 168, 224, 0.35)'}}
          errorPlacement='left'
          placeholder='Write your comment…'
          borderColor='grey_light'
          name='comment'
          lh='1.5em'
          rows={3}
          p/>
      </Block>
      <Button busy={makingComment.loading} bgColor='grey' type='submit'>Submit</Button>
    </Form>
  )

  function * createShare(model) {
    const comment = {
      _object: [{
        attachments: [],
        objectType: 'comment',
        originalContent: model.comment
      }],
      channels: [`share!${id}.replies`],
      shareType: 'share',
      contexts: [{
        allow: [
          {id: `${classId}:teacher`},
          {id: `${classId}:student`},
        ],
        descriptor: {
          displayName: classId,
          id: classId,
          url: '/'
        }
      }]
    }

    yield makeComment(comment)
  }

}

/**
 * Validate
 */

function validateComment (model) {
  return validate(Schema()
    .prop('comment', Schema('string').min(1, 'Required'))
    .required('comment'))(model)
}

/**
 * Exports
 */


export default summon(() => ({
  makeComment: (body) => ({
    makingComent:  {
      url: '/share',
      method: 'POST',
      invalidates: 'activity_feed',
      body
    }
  })
}))({
  render
})