/**
 * Imports
 */

import GradePickerModal from 'modals/GradePickerModal'
import EmptyState from 'components/EmptyState'
import {openModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import {Block, Icon} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <EmptyConnect />
 */

function render({props}) {
  return (
    <EmptyState>
      <Block lh='30px'>
        Tell us what you teach<br/>
        We'll recommend teachers for you to follow.
      </Block>
      <Button
        onClick={() => openModal(() => <GradePickerModal user={props.currentUser} />)}
        boxShadow='z2'
        px='35px'
        lighter
        h='3em'
        fs='s'
        my='l'>
          <Block align='center center'>
            <Icon name='info_outline' fs='m' mr='s' mt='-1' />
            <Block>
              Complete My Profile
            </Block>
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