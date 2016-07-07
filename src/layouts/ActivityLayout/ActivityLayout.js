/**
 * Imports
 */

import PageTitle from 'components/PageTitle'
import FourOhFour from 'pages/FourOhFour'
import maybeOver from '@f/maybe-over'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'
import Nav from  './Nav'

/**
 * Activity Layout
 */

function render ({props, children}) {
  return (
    <Block class='app'>
      { internal(props, children) }
    </Block>
  )
}

function internal(props, children) {
  const {activity, students, currentUser, classId} = props
  const {value, loading, error} = activity
  const {value: studentList, loading: sLoading, error: sError} = students

  if (loading || sLoading) return ''
  if (error || sError) return <FourOhFour />

  return [
    <Nav activity={value} user={currentUser} classId={classId} />,
    <PageTitle title={`${value.displayName}`} />,
    maybeOver({activity: value, students: studentList.items}, children)
  ]
}

/**
 * Exports
 */

export default summon(props => ({
  activity: `/share/${props.activityId}`,
  students: `/group/students?group=${props.classId}`
}))({
  render
})