/**
 * Imports
 */

import {Icon, Flex, Block, Checkbox} from 'vdux-ui'
import {Button} from 'vdux-containers'
import element from 'vdux/element'
import summon from 'vdux-summon'

/**
 * <ClassStudents/>
 */

function render ({props}) {
  const {group, students} = props
  const {value, loading} = students

  if (loading) return <span/>

  return (
    <Block>
      <Flex align='start center'>
        <Button bgColor='blue' color='white' align='center center' h='30' fs='xxs'>
          <Icon name='people' mr='s' />Add Student
        </Button>
        <Button bgColor='green' color='white' align='center center' ml='s' h='30' fs='xxs'>
          <Icon name='send' mr='s' />Invite Students
        </Button>
        <Button bgColor='white' color='black' align='center center' ml='s' h='30' fs='xxs'>
          <Icon name='lock' mr='s' />Reset Password
        </Button>
        <Button bgColor='white' color='black' align='center center' ml='s' h='30' fs='xxs'>
          <Icon name='print' mr='s' />Print Login Info
        </Button>
        <Button bgColor='red' color='white' align='center center' ml='s' h='30' fs='xxs'>
          <Icon name='delete' mr='s' />Remove from Class
        </Button>
        <Flex flex align='end center'>
          {value.items.length} students
        </Flex>
      </Flex>
    </Block>
  )
}

/**
 * Exports
 */

export default summon(({group}) => ({
  students: `/group/students?group=${group._id}`
}))({
  render
})
