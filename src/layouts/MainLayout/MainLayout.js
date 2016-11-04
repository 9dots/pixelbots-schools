/**
 * Imports
 */

import FeedWidgets from 'components/FeedWidgets'
import IntroModal from 'modals/IntroModal'
import AppLayout from 'layouts/AppLayout'
import {openModal} from 'reducer/modal'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * onCreate
 */

function onCreate ({props}) {
  const {currentUser} = props
  const {preferences = {}, userType} = currentUser
  const {slideshow = {}} = preferences

  if (!slideshow.done && userType === 'teacher') {
    return openModal(() => <IntroModal currentUser={currentUser} />)
  }
}

/**
 * <MainLayout/>
 */

function render ({props, children}) {
  return (
    <AppLayout {...props}>
      <Block align='start' w='col_main' mx='auto' py>
        <FeedWidgets user={props.currentUser}/>
        <Block flex>
          { children }
        </Block>
      </Block>
    </AppLayout>
  )
}

/**
 * Exports
 */

export default {
  onCreate,
  render
}
