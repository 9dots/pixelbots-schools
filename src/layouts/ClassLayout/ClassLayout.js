/**
 * Imports
 */

import ClassCodeModal from 'modals/ClassCodeModal'
import {Text, Flex, Block, Icon} from 'vdux-ui'
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
  const {group} = props

  return (
    <AppLayout {...props} bgColor='green'>
      {internal(group, children)}
    </AppLayout>
  )
}

function internal ({value, loading, error}, children) {
  if (loading) return ''
  if (error) return <FourOhFour />

  return [
    <Header group={value} />,
    <Block>
      {maybeOver(value, children)}
    </Block>
  ]
}

function Header ({props}) {
  const {group} = props
  const {_id: id, displayName, code} = group

  return (
    <Flex align='space-between center' h={46} bgColor='off_white' boxShadow='0 1px 2px 0 rgba(0,0,0,0.22)'>
      <Block ml pl fs='s' fw='lighter' capitalize flex align='start center'>
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
}

/**
 * Exports
 */

export default summon(props => ({
  group: `/group/${props.groupId}`
}))({
  render
})
