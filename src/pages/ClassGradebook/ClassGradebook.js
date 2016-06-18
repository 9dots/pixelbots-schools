/**
 * Imports
 */


import EmptyClassGradebook from './EmptyClassGradebook'
import Gradebook from './Gradebook'
import PageTitle from 'components/PageTitle'
import Loading from 'components/Loading'
import {Block, Icon} from 'vdux-ui'
import element from 'vdux/element'
import summon from 'vdux-summon'

/**
 * <ClassGradebook/>
 */

function render ({props}) {
  const {group, students, currentUser} = props
  const {value, loading, loaded} = students

  if (!loaded && loading) return <Loading show={true} h='200' />

  const {items: studentList} = value

  return (
    <Block>
      <PageTitle title={`${group.displayName} | Gradebook`} />
      {
        loaded && studentList.length
          ? <Gradebook group={group} students={studentList} currentUser={currentUser} />
          : <EmptyClassGradebook group={group} />
      }
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
