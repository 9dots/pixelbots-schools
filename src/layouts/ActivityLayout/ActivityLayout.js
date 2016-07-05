/**
 * Imports
 */

import ActivityDropdownMenu from 'components/ActivityDropdownMenu'
import ActivityCardActions from 'components/ActivityCardActions'
import {Block, Fixed, Flex, Text} from 'vdux-ui'
import PageTitle from 'components/PageTitle'
import FourOhFour from 'pages/FourOhFour'
import {Button} from 'vdux-containers'
import maybeOver from '@f/maybe-over'
import Link from 'components/Link'
import element from 'vdux/element'
import summon from 'vdux-summon'

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
    <Nav value={value} classId={classId} user={currentUser} />,
    <PageTitle title={`${value.displayName} | Board`} />,
    maybeOver({activity: value, students: studentList.items}, children)
  ]
}

function Nav({props}) {
  const {value, classId, user} = props
  return (
    <Block>
      <Fixed bgColor='white' wide top z={2} boxShadow='card' align='start center' h={53}>
        <Flex align='start center' wide px flex>
          <Button icon='arrow_back' fs='s' onClick={() => window.history.back()} color='text' mr />
          <Text fs='s' lighter>
            {value.displayName}
          </Text>
        </Flex>
        <Flex align='center center'>
          <NavTile highlight='red' href={`/activity/${value.id}/${classId}/students`}>
            Student Progress
          </NavTile>
          <NavTile highlight='green' href={`/activity/${value.id}/${classId}/overview`}>
            Class Overview
          </NavTile>
          <NavTile highlight='blue' href={`/activity/${value.id}/${classId}/preview`}>
            Activity Preview
          </NavTile>
        </Flex>
        <Flex flex align='end center' px>
          <ActivityCardActions activity={value} user={user} pin='Pin' pr={0} />
          <ActivityDropdownMenu activity={value} />
        </Flex>
      </Fixed>
      <Block pt={53} hidden mb/>
    </Block>
  )
}

function NavTile ({props, children}) {
    const {highlight} = props
    const height = '53px'
    return (
    <Block px={10}>
      <Link
        pointer
        display='inline-block'
        fs='xxs'
        px
        uppercase
        h={height}
        lh={height}
        textAlign='center'
        borderBottom='3px solid transparent'
        transition='all 0.2s'
        currentProps={{borderBottomColor: highlight}}
        hoverProps={{borderBottomColor: highlight}}
        {...props}>
        {children}
      </Link>
    </Block>
   )
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