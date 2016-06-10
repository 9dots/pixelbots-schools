/**
 * Imports
 */

import EmptyState from 'components/EmptyState'
import {setUrl} from 'redux-effects-location'
import {Button} from 'vdux-containers'
import {Icon, Block} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <EmptyClassStudents/>
 */

function render({props}) {
  const {group} = props
  return(
    <EmptyState icon='book' color='green' wide>
      <Block lh='30px' mt>
        You don't have any students in your class. Add students and assign them Activities.
      </Block>
      <Button
        onClick={() => setUrl(`/class/${group._id}/students`)}
        boxShadow='z2'
        bgColor='green'
        px='35px'
        lighter
        h='3em'
        fs='s'
        my='l'>
        <Block align='center center'>
          <Icon name='person_add' mr />
          Add Students
        </Block>
      </Button>
    </EmptyState>
  )
}

/**
 * Exports
 */

export default {
  render
}