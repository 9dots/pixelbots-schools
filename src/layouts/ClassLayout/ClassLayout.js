/**
 * Imports
 */

import ClassCodeModal from 'modals/ClassCodeModal'
import {Text, Flex, Block, Icon} from 'vdux-ui'
import AppLayout from 'layouts/AppLayout'
import FourOhFour from 'pages/FourOhFour'
import NavTile from 'components/NavTile'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'
import maybeOver from '@f/maybe-over'
import summon from 'vdux-summon'

/**
 * <ClassLayout/>
 */

export default summon(props => ({
  group: `/group/${props.groupId}`
}))(component({
  render ({props, children}) {
    return (
      <AppLayout {...props} bgColor='green'>
        {internal(props, children)}
      </AppLayout>
    )
  }
}))

/**
 * Render internal content
 */

function internal (props, children) {
  const {group, currentUser} = props
  const {value, loaded, error} = group
  const isStudent = currentUser.userType === 'student'

  if (!loaded) return ''
  if (error) return <FourOhFour />

  return [
    <Header group={value} isStudent={isStudent} />,
    <Block>
      {maybeOver(value, children)}
    </Block>
  ]
}

/**
 * <Header/>
 */

const Header = component({
  render ({props, actions}) {
    const {group, isStudent} = props
    const {_id: id, displayName, code} = group

    return (
      <Flex align='space-between center' h={46} bgColor='off_white' boxShadow='0 1px 2px 0 rgba(0,0,0,0.22)'>
        <Block ml pl fs='s' fw='lighter' capitalize flex align='start center'>
          <Block ellipsis>
            {displayName}
          </Block>
          <Button
            onClick={actions.openClassCodeModal}
            border='1px solid grey_medium'
            align='start center'
            bgColor='off_white'
            hoverProps={{highlight: 0.03}}
            focusProps={{highlight: 0.03}}
            hide={isStudent}
            color='text'
            fw='normal'
            fs='xs'
            px='m'
            h='30'
            mx>
            Class Code: &nbsp;
            <Text color='blue' fs='15px' fontFamily='monospace'>
              {code}
            </Text>
            <Icon ml='s' fs='xs' name='help' circle />
          </Button>
        </Block>

        <Flex align='center center' flex>
          <NavTile href={`/class/${id}/feed`} highlight='red'>
            Feed
          </NavTile>
          <NavTile href={`/class/${id}/students`} highlight='green'>
            Students
          </NavTile>
          <NavTile href={`/class/${id}/gradebook`} highlight='blue'>
            Gradebook
          </NavTile>
        </Flex>
        <Block flex />
      </Flex>
    )
  },

  events: {
    * openClassCodeModal ({context, props}) {
      yield context.openModal(() => <ClassCodeModal code={props.group.code} />)
    }
  }
})
