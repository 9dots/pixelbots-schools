/**
 * Imports
 */

import ClassSettingsModal from 'modals/ClassSettingsModal'
import { getRandomPassword } from 'lib/picture-passwords'
import JoinSchoolModal from 'modals/JoinSchoolModal'
import ClassCodeModal from 'modals/ClassCodeModal'
import { Text, Block, Icon } from 'vdux-ui'
import NavTile from 'components/NavTile'
import { component, element } from 'vdux'
import { Button } from 'vdux-containers'
import mapValues from '@f/map-values'
import maybeOver from '@f/maybe-over'
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
}))(
  component({
    * onCreate ({ props, context }) {
      if (!Object.keys(props.currentUser.schools || {}).length) {
        yield context.openModal(() => <JoinSchoolModal />)
      }
    },

    render ({ props, children, context }) {
      const { group, groupId } = props
      const { value, loading } = group

      if (loading) return <span />

      return (
        <Block>
          <Header group={value} groupId={groupId} />
          <Block>{maybeOver(value, children)}</Block>
        </Block>
      )
    }
  })
)

/**
 * Constants
 */

const activeProps = { opacity: 1 }
const hoverProps = { opacity: 0.7 }
const highlight = { highlight: 0.03 }

/**
 * <Header/>
 */

const Header = component({
  render ({ props, actions }) {
    const { group, groupId: id, isStudent } = props
    const { displayName, code } = group

    return (
      <Block boxShadow='0 1px 2px 0 rgba(0,0,0,0.22)'>
        <Block
          p='m'
          fs='s'
          fw='lighter'
          capitalize
          bgColor='green'
          color='white'
          minHeight={107}>
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
                pr />
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
          <Block align='start center' fs='xs' mt='s'>
            <Block>{group.school.name}</Block>
            <Block mx='s'>&middot;</Block>
            <Block>{group.grade}</Block>
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
    * classCodeModal ({ context, props }) {
      yield context.openModal(() => <ClassCodeModal code={props.group.code} />)
    },

    * classSettings ({ context, props, actions }) {
      const snap = yield context.firebaseOnce(
        `/classes/${props.groupId}/hasPicturePassword`
      )
      yield context.openModal(() => (
        <ClassSettingsModal
          passwordSetting={snap.val()}
          groupId={props.groupId}
          onPasswordAdd={actions.addStudentPasswords}
          group={props.group} />
      ))
    },
    * addStudentPasswords ({ props, actions }) {
      yield mapValues(
        (val, id) => actions.maybeAddPassword(id),
        props.group.students
      )
    },
    * maybeAddPassword ({ context }, studentId) {
      yield context.firebaseTransaction(
        `/users/${studentId}/pictureName`,
        pictureName => pictureName || getRandomPassword()
      )
    }
  }
})
