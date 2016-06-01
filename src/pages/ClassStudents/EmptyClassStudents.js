/**
 * Imports
 */

import InviteStudentsModal from 'modals/InviteStudentsModal'
import AddStudentModal from 'modals/AddStudentModal'
import {Icon, Block, Text} from 'vdux-ui'
import {openModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import element from 'vdux/element'

/**
 * <EmptyClassStudents/>
 */

function render({props}) {
  const {group} = props
  return(
    <Block p textAlign='center'>
      <Icon name='people' fs='xxl' color='green'/>
      <Block my fs='m' lighter>
        Your class has no students
      </Block>
      <Block align='center center' my='l'>
        <Button fs='s' lighter py  boxShadow='z2' bgColor='green' mr onClick={() => openModal(() => <InviteStudentsModal group={group}  />)}>
          <Block align='center center'>
            <Icon name='send' mr='s' fs='s'/>
            Invite Students
          </Block>
        </Button>
        <Button fs='s' lighter py boxShadow='z2' onClick={() => openModal(() => <AddStudentModal />)}>
          <Block align='center center'>
            <Icon name='person_add' mr='s' fs='s'/>
            Add Students
          </Block>
        </Button>
      </Block>
      <Block fs='s' lighter mx='auto' w='col_m'>
        Or instruct them to sign up at <Text bold>weo.io/student</Text> and
        join your class using the following code:
        <Text fontFamily='monospace' color='blue' ml='s'>
          {group.code}
        </Text>
      </Block>
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}