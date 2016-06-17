/**
 * Imports
 */

import GradePickerModal from 'modals/GradePickerModal'
import InviteTeacherModal from 'modals/InviteTeacherModal'
import EmptyState from 'components/EmptyState'
import {openModal} from 'reducer/modal'
import {Button, Text} from 'vdux-containers'
import {Block, Icon} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <EmptyConnect />
 */

function render({props}) {
  const {search, currentUser} = props
  return (
    search
      ? <EmptySearch {...props} />
      : <FillOutProfile currentUser={currentUser} />
  )
}

function FillOutProfile ({props}) {
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

function EmptySearch ({props}) {
  return (
    <EmptyState icon='people' color='yellow'>
      Sorry, we couldn't find anybody by that name.<br/>
      Try another search or invite&nbsp;
      <Text
        onClick={() => openModal(() => <InviteTeacherModal />)}
        hoverProps={{underline: true}}
        color='blue'
        pointer>
        {props.connectQuery}
      </Text>
      &nbsp;to join Weo.
    </EmptyState>
  )

}

/**
 * Exports
 */

export default {
  render
}