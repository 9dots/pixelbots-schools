/**
 * Imports
 */


import CreateClassModal from 'modals/CreateClassModal'
import EmptyState from 'components/EmptyState'
import {setUrl} from 'redux-effects-location'
import {openModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import {Block, Text} from 'vdux-ui'
import element from 'vdux/element'

/**
 * EmptyFeed
 */

function render({props}) {
  const {follow} = props
  return(
    follow
      ? <EmptyState icon='explore' wide>
          <Block fs='m' m>Find People to Follow</Block>
          <Block fs='xs' my='l'>This is your home feed. Once you start following people, all their activities will show up here.</Block>
          <Button
            onClick={() => setUrl('/connect')}
            color='white'
            bgColor='green'
            boxShadow='z2'
            border='1px solid rgba(black, .1)'
            py='16px'
            px='40px'
            lighter
            fs='s'>
            Connect with Educators
          </Button>
        </EmptyState>
      : <EmptyState icon='school' color='green' wide>
          <Block fs='m' m>Welcome to Weo!</Block>
          <Button
            onClick={() => openModal(() => <CreateClassModal />)}
            color='white'
            bgColor='green'
            boxShadow='z2'
            border='1px solid rgba(black, .1)'
            py='16px'
            px='40px'
            lighter
            fs='s'
            m='l'>
            Create My First Class
          </Button>
          <Block>
            <Text bold>Classes </Text> let you deliver engaging, interactive activities to your students. <Text bold>Click the button</Text> above to create your first class.
          </Block>
        </EmptyState>
  )
}

/**
 * Exports
 */

export default {
  render
}