/**
 * Imports
 */

import ClassSettingsModal from 'modals/ClassSettingsModal'
import JoinSchoolModal from 'modals/JoinSchoolModal'
import ClassCodeModal from 'modals/ClassCodeModal'
import Redirect from 'components/Redirect'
import {Text, Block, Icon} from 'vdux-ui'
import FourOhFour from 'pages/FourOhFour'
import NavTile from 'components/NavTile'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'
import maybeOver from '@f/maybe-over'
import getProp from '@f/get-prop'
import fire from 'vdux-fire'

/**
 * <ClassLayout/>
 */

export default fire(props => ({
  group: {
    ref: `/classes/${props.groupId}`,
    join: {
      ref: '/schools',
      child: 'school'
    }
  }
}))(component({
  * onCreate ({props, context}) {
    if (!Object.keys(props.currentUser.schools || {}).length) {
      yield context.openModal(() => <JoinSchoolModal />)
    }
  },

  render ({props, children, context}) {
    const {group, currentUser, groupId} = props
    const {value, loading, error} = group

    if (loading) return <span />

    return (
      <Block>
        <Header group={value} groupId={groupId} />
        <Block>
          {maybeOver(value, children)}
        </Block>
      </Block>
    )
  }
}))

/**
 * Constants
 */

const activeProps = {opacity: 1}
const hoverProps = {opacity: 0.7}
const highlight = {highlight: 0.03}

/**
 * <Header/>
 */

const Header = component({
  render ({props, actions}) {
    const {group, groupId: id, isStudent, students} = props
    const {displayName, code, owners} = group

    return (
      <Block boxShadow='0 1px 2px 0 rgba(0,0,0,0.22)'>
        <Block p='m' fs='s' fw='lighter' capitalize bgColor='green' color='white' minHeight={107}>
          <Block align='space-between center'>
            <Block ellipsis fs='m' lighter align='start center'>
              {displayName}
              <Button
                onClick={actions.classSettings}
                activeProps={activeProps}
                hoverProps={hoverProps}
                hide={isStudent}
                icon='settings'
                opacity={1}
                fs='xs'
                ml='s'
                pr
                />
              <Block>
                {group.school.name}
              </Block>
              &middot;
              <Block>
                {group.grade} grade
              </Block>
            </Block>
            <Button
              onClick={actions.classCodeModal}
              border='1px solid grey_medium'
              align='start center'
              bgColor='off_white'
              hoverProps={highlight}
              focusProps={highlight}
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
        </Block>

        <Block align='center center' h={46} bgColor='off_white'>
          <NavTile href={`/class/${id}/feed`} highlight='red'>
            Assignments
          </NavTile>
          <NavTile href={`/class/${id}/students`} highlight='green'>
            Students
          </NavTile>
          {
          // <NavTile href={`/class/${id}/gradebook`} highlight='blue'>
          //   Gradebook
          // </NavTile>
          }
        </Block>
      </Block>
    )
  },

  controller: {
    * classCodeModal ({context, props}) {
      yield context.openModal(() => <ClassCodeModal code={props.group.code} />)
    },

    * classSettings ({context, props}) {
      yield context.openModal(() => <ClassSettingsModal group={props.group} />)
    }
  }
})
