/**
 * Imports
 */

import ProfileWidget from './ProfileWidget'
import ClassesWidget from './ClassesWidget'
import DraftsWidget from './DraftsWidget'
import {Card, Icon, Block, Divider} from 'vdux-ui'
import {component, element} from 'vdux'
import Link from 'components/Link'

/**
 * Constants
 */

const linkProps = {
  borderWidth: '0px',
  boxShadow: '0 0',
  borderLeft: '3px solid transparent',
  currentProps: {
    highlight: 0.03, 
    color: 'text', 
    borderColor: 'blue'
  }
}

/**
 * <FeedWidgets/>
 */

export default component({
  render ({props}) {
    const {user, ...rest} = props
    const cardMargin = '8px 6px 12px 0'
    const draftCount = user.drafts.canonicalTotal.items

    return (
      <Block mr {...rest}>
        <Card w='230px'>
          {
            //<ProfileWidget user={user} w={230} m={cardMargin} my={0} />
          }
          <Divider wide m={0} mr='s' color='#EEE'/>
          <Link ui={Card} align='start center' {...linkProps} pointer p href='/discussion' hide={user.userType === 'student'}>
            <Icon fs='m' mr name='forum' />
            <Block flex>Discussion</Block>
          </Link>
          <Divider m={0} color='#EEE'/>
          <Link ui={Card} w={230} m={cardMargin} my={0} align='start center' {...linkProps} pointer p href='/feed' hide={user.userType === 'student'}>
            <Icon fs='m' mr name='view_headline' />
            <Block flex>My Feed</Block>
          </Link>
          <Divider m={0} color='#EEE' hide={!draftCount} />
          <DraftsWidget boxShadow='0 0' w={230} {...linkProps} m={cardMargin} mt={0} draftCount={draftCount} user={user} />
        </Card>
        <ClassesWidget user={user} w={230} m={cardMargin} />
      </Block>
    )
  }
})
