/**
 * Imports
 */

import ActivityObject from 'components/ActivityObject'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'
import formatQs from '@f/format-qs'
import parseQs from '@f/parse-qs'
import {Block} from 'vdux-ui'
import url from 'url'

/**
 * <ActivityAssignment/>
 */

export default component({
  render ({props, actions, context}) {
    const {object, selectedObject, currentUser, ...rest} = props
    const parsed = url.parse(object.url || '')
    const domain = parsed.protocol + '//' + parsed.host

    return (
      <Block>
        <Button hide={!(currentUser && currentUser.userType === 'student')} onClick={actions.openActivity}>
          Start Assignment
        </Button>
        {
          object.attachments.map((att, i) => <ActivityObject
            {...rest}
            currentUser={currentUser}
            domain={domain}
            object={att}
            isSelected={selectedObject === object._id}
            idx={i} />
          )
        }
      </Block>
    )
  },

  controller: {
    openActivity ({props}) {
      const {activityId, object, actor} = props
      const {url} = object
      const [base, query = ''] = url.split('?')

      const params = parseQs(query)
      const apiServer = process.env.API_SERVER

      params.update = `${apiServer}/instance/${activityId}/progress`

      const newUrl = [base, formatQs(params)].join('?')
      window.open(newUrl)
    }
  }
})
