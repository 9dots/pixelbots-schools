/**
 * Imports
 */

import ClassActivityRow from 'components/ClassActivityRow'
import EmptyClassStudents from './EmptyClassStudents'
import {Icon, Flex, Block, Checkbox} from 'vdux-ui'
import PageTitle from 'components/PageTitle'
import {Button, form} from 'vdux-containers'
import Loading from 'components/Loading'
import StudentGrid from './StudentGrid'
import element from 'vdux/element'
import summon from 'vdux-summon'

/**
 * <ClassStudents/>
 */

function render ({props}) {
  const {group, students, toggleAll, fields} = props
  const {selected} = fields
  const {value, loading, loaded} = students

  if (loading) return <Loading show={true} h='200' />

  const {items: studentList} = value

  return (
    <Block>
      <PageTitle title={`${group.displayName} | Students`} />
      {
        loaded && studentList.length
          ? <Block>
              <StudentMenu students={studentList} />
              <StudentGrid students={studentList} selected={selected.value || []} toggleAll={toggleAll} />
            </Block>
          : <EmptyClassStudents group={group} />
      }
    </Block>
  )
}

function StudentMenu ({props}) {
  const {students, selected} = props

  return (
    <Flex align='start center'>
      <Button bgColor='blue' color='white' align='center center' h='30' fs='xxs'>
        <Icon name='people' mr='s' />Add Student
      </Button>
      <Button bgColor='green' color='white' align='center center' ml='s' h='30' fs='xxs'>
        <Icon name='send' mr='s' />Invite Students
      </Button>
      <Button disabled={!selected} bgColor='white' color='black' align='center center' ml='s' h='30' fs='xxs'>
        <Icon name='lock' mr='s' />Reset Password
      </Button>
      <Button disabled={!selected} bgColor='white' color='black' align='center center' ml='s' h='30' fs='xxs'>
        <Icon name='print' mr='s' />Print Login Info
      </Button>
      <Button bgColor='red' color='white' align='center center' ml='s' h='30' fs='xxs'>
        <Icon name='delete' mr='s' />Remove from Class
      </Button>
      <Flex flex align='end center'>
        {students.length} students
      </Flex>
    </Flex>
  )
}

/**
 * Exports
 */

export default summon(({group}) => ({
  students: `/group/students?group=${group._id}`
}))(
  form(() => ({
    fields: ['selected']
  }))({
    render
  })
)
