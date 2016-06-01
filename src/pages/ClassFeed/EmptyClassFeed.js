/**
 * Imports
 */

import CreateActivityModal from 'modals/CreateActivityModal'
import {Block, Button, Tooltip} from 'vdux-containers'
import {openModal} from 'reducer/modal'
import element from 'vdux/element'
import {Icon} from 'vdux-ui'

/**
 * <EmptyClassFeed/>
 */

function render() {
  return(
    <Block p textAlign='center'>
      <Icon name='assignment' fs='xxl' color='green'/>
      <Block my fs='m' lighter>
        This is your class Activity Feed
      </Block>
      <Button fs='s' lighter py my boxShadow='z2' relative>
        <Block align='center center'>
          Assign an Intro Activity
          <Tooltip message='Assign a tutorial Activity to teach your students the basics of Weo.' align='center center' tooltipProps={{whiteSpace: 'normal', w: '200'}}>
            <Icon name='info' ml='s' fs='s'/>
          </Tooltip>
        </Block>
      </Button>
      <Block underline pointer hoverProps={{opacity: .8}} onClick={() => openModal(() => <CreateActivityModal />)}>
        or create your own!
      </Block>
      <Block fs='s' lighter mx='auto' mt='l' w='col_m'>
        Activities are interactive worksheets. Assign them to your class and they'll appear here for you and your students.
      </Block>
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}