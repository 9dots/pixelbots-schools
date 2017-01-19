/**
 * Imports
 */

import SchoolSidebar from 'components/SchoolSidebar'
import AppLayout from 'layouts/AppLayout'
import {component, element} from 'vdux'
import maybeOver from '@f/maybe-over'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'
import live from 'lib/live'

/**
 * <MainLayout/>
 */

export default summon(() => ({
  school: '/school'
}))(live(({currentUser}) => ({
  school: {
    url: '/school',
    params: {
      id: currentUser.school
    }
  }
}))(component({
  render ({props, children}) {
    return (
      <AppLayout {...props}>
        {internal(props.school.value, children)}
      </AppLayout>
    )
  }
})))

function internal (school, children) {
  if (!school) return <span/>

  return (
    <Block align='start' w='col_main' mx='auto' py px='s' mt='s'>
      <SchoolSidebar school={school} />
      <Block w='col_xl'>
        { maybeOver(school, children) }
      </Block>
    </Block>
  )
}
