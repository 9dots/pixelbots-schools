/**
 * Imports
 */

import EmptyState from 'components/EmptyState'
import {setUrl} from 'redux-effects-location'
import PageTitle from 'components/PageTitle'
import {Button} from 'vdux-containers'
import {Block, Icon} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <ClassGradebook/>
 */

function render ({props}) {
  const {group} = props

  return (
    <Block>
      <PageTitle title={`${group.displayName} | Gradebook`} />
      <EmptyState icon='book' color='green' wide>
        You don't have any students in your class.
        <Button
          onClick={() => setUrl(`/class/${group._id}/students`)}
          boxShadow='z2'
          px='35px'
          lighter
          h='3em'
          fs='s'
          my='l'>
          <Block align='center center'>
            <Icon name='person_add' mr='s' />
            Add Students
          </Block>
        </Button>
      </EmptyState>
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
