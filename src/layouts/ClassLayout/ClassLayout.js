/**
 * Imports
 */

import ClassCodeModal from 'modals/ClassCodeModal'
import {Text, Flex, Block, Icon} from 'vdux-ui'
import AppLayout from 'layouts/AppLayout'
import FourOhFour from 'pages/FourOhFour'
import NavTile from 'components/NavTile'
import {openModal} from 'reducer/modal'
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

function Header ({props}) {
  const {group} = props
  const {_id: id, displayName, code} = group

  return (
    <Flex align='space-between center' h={46} bgColor='off_white' boxShadow='0 1px 2px 0 rgba(0,0,0,0.22)'>
      <Block ml pl fs='s' fw='lighter' capitalize>
        {displayName}
        <Text ml>
          Class Code: &nbsp;
          <Text color='blue'>
            {code}
          </Text>
          <Icon
            onClick={() => openModal(() => <ClassCodeModal code={code} />)}
            pointer
            ml='s'
            fs='s'
            name='help'
            color='black'
            circle />
        </Text>
      </Block>

      <Flex align='center center'>
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
      <Block />
    </Flex>
  )
}

function internal ({value, loading, error}, children) {
  if (loading) return ''
  if (error) return <FourOhFour />

  return [
    <Header group={value} />,
    <Block w='col_main' maxWidth='714px' mx='auto' relative my py>
      {maybeOver(value, children)}
    </Block>
  ]
}

/**
 * Exports
 */

export default summon(props => ({
  group: `/group/${props.groupId}`
}))({
  render
})
