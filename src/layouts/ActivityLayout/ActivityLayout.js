/**
 * Imports
 */

import PageTitle from 'components/PageTitle'
import {Button} from 'vdux-containers'
import {Block, Fixed, Flex, Text} from 'vdux-ui'
import element from 'vdux/element'
import summon from 'vdux-summon'
import maybeOver from '@f/maybe-over'
import FourOhFour from 'pages/FourOhFour'

/**
 * Activity Layout
 */

function render ({props, children}) {
  const {activity, currentUser} = props

  return (
    <Block class='app'>
      { internal(activity, currentUser, children) }
    </Block>
  )
}

function internal({value, loading, error}, currentUser, children) {
  if (loading) return ''
  if (error) return <FourOhFour />

  return [
    <Nav value={value} />,
    <PageTitle title={`${value.displayName} | Board`} />,
    maybeOver(value, children)
  ]
}

function Nav({props}) {
  const {value} = props
  return (
    <Block>
      <Fixed bgColor='white' wide top z={2} boxShadow='card'>
        <Flex align='start center' wide px h={53}>
          <Button icon='arrow_back' fs='s' onClick={() => window.history.back()} color='text' mr />
          <Text fs='s' lighter>
            {value.displayName}
          </Text>
        </Flex>
      </Fixed>
      <Block pt={53} hidden mb/>
    </Block>
  )
}

/**
 * Exports
 */

export default summon(props => ({
  activity: `/share/${props.activityId}`
}))({
  render
})