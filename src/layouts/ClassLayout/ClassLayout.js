/**
 * Imports
 */

import ClassCodeModal from 'modals/ClassCodeModal'
import {Text, Block, Icon} from 'vdux-ui'
import AppLayout from 'layouts/AppLayout'
import FourOhFour from 'pages/FourOhFour'
import NavTile from 'components/NavTile'
import {openModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import maybeOver from '@f/maybe-over'
import element from 'vdux/element'
import summon from 'vdux-summon'

/**
 * <ClassLayout/>
 */

function render ({props, children}) {
  console.log(props)
  const {group, currentUser, students} = props
  const {value, loaded, error} = group
  const {sValue, sLoaded, sError} = students
  const isStudent = currentUser.userType === 'student'

  if (!loaded || !sLoaded) return <span/>
  if (error) return <FourOhFour />
  console.log(sValue)

  return (
    <Block>
      <Header group={value} isStudent={isStudent} />
      <Block>
        {maybeOver(value, children)}
      </Block>
    </Block>
  )
}

function Header ({props}) {
  const {group, isStudent} = props
  const {_id: id, displayName, code} = group

  return (
    <Block boxShadow='0 1px 2px 0 rgba(0,0,0,0.22)'>
      <Block p='m' fs='s' fw='lighter' capitalize bgColor='green' color='white'>
        <Block ellipsis>
          {displayName}
        </Block>
        <Button
          onClick={() => openModal(() => <ClassCodeModal code={code} />)}
          border='1px solid grey_medium'
          align='start center'
          bgColor='off_white'
          hoverProps={{highlight: .03}}
          focusProps={{highlight: .03}}
          hide={isStudent}
          color='text'
          fw='normal'
          fs='xs'
          px='m'
          h='30'>
          Class Code: &nbsp;
          <Text color='blue' fs='15px' fontFamily='monospace'>
            {code}
          </Text>
          <Icon ml='s' fs='xs' name='help' circle />
        </Button>
      </Block>

      <Block align='center center' h={46} bgColor='off_white'>
        <NavTile href={`/class/${id}/feed`} highlight='red'>
          Feed
        </NavTile>
        <NavTile href={`/class/${id}/students`} highlight='green'>
          Students
        </NavTile>
        <NavTile href={`/class/${id}/gradebook`} highlight='blue'>
          Gradebook
        </NavTile>
      </Block>
    </Block>
  )
}

/**
 * Exports
 */

export default summon(props => ({
  group: `/group/${props.groupId}`,
  students: `/group/students?group=${props.groupId}`
}))({
  render
})
