/**
 * Imports
 */

import {Table, TableHeader, TableRow, Card, Block, Icon} from 'vdux-ui'
import {Button, Dropdown, MenuItem} from 'vdux-containers'
import summonChannels from 'lib/summon-channels'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import GradebookRow from './GradebookRow'
import Loading from 'components/Loading'
import element from 'vdux/element'
import getProp from '@f/get-prop'
import map from '@f/map'

/**
 * <Gradebook/>
 */

function render ({props, local, state}) {
  const {group, students, activities, currentUser, togglePref} = props
  const {expanded} = state
  const {value, loading, loaded} = activities
  const asPercent = getProp('preferences.gradebook.displayPercent', currentUser)

  if (!loaded && loading) return <Loading show={true} h='200' />

  const {items: activityList} = value
  const expandedProps = expanded
    ? {
        position: 'fixed',
        overflowY: 'auto',
        bg: 'off_white',
        sq: '100%',
        pt: 'm',
        top: 0,
        z: 99,
        m: 0
      }
    : {}

  return (
    <Block w='col_main' mx='auto' my='l' relative  {...expandedProps}>
      <Block align='start center' relative mb pl={expanded ? 'm' : 0}>
        <Dropdown btn={<DropButton />} z='3' left w='160px' fs='xxs'>
          <MenuItem onClick={() => togglePref(asPercent)} py>
            Display as {asPercent ? ' Point Totals' : ' Percentages'}
          </MenuItem>
          <MenuItem py align='start center'>
            Export to CSV
            <Icon name='file_download' fs='xs' ml='s' />
          </MenuItem>
        </Dropdown>
        <ExpandButton ml onClick={local(toggle)} expanded={expanded} />
      </Block>
      <Block boxShadow='card' overflow='auto' relative>
        <Table overflow='auto'>
          <Header activities={activityList} />
          {
            map((student, i) => <GradebookRow
              activities={activityList}
              student={student}
              odd={i%2}
              currentUser={currentUser}
              last={students.length === (i+1)} />,students)
          }
        </Table>
      </Block>
    </Block>

  )
}

function Header ({props}) {
  const {activities, ...rest} = props
  const headProps = {
    borderRight: '1px solid text',
    bgColor: 'grey',
    color: 'white',
    p: '24px 16px'
  }
  return (
    <TableRow>
      <TableHeader {...headProps} width='10px' textAlign='left' borderWidth='0'>
        First
      </TableHeader>
      <TableHeader {...headProps} textAlign='left' borderWidth='0'>
        Last
      </TableHeader>
      <TableHeader {...headProps}>
        Total
      </TableHeader>
      {
        map(activity => <TableHeader {...headProps}  fs='xxs' px maxWidth='100px' minWidth='100px' ellipsis>{activity.displayName}</TableHeader>, activities)
      }
    </TableRow>
  )
}

function DropButton () {
  return (
    <Button bgColor='green' h={32}>
      <Icon name='settings' fs='xs' mr='s' />
      Settings
      <Icon name='arrow_drop_down' fs='s' ml='s' mr='-12px' />
    </Button>
  )
}

function ExpandButton ({props}) {
  const {expanded, ...rest} = props
  return (
    <Button h='32' {...rest}>
      <Icon name={expanded ? 'fullscreen_exit' : 'fullscreen'} fs='s' mr='s' />
      {expanded ? 'Exit' : 'Expand'}
    </Button>
  )
}

/**
 * Actions
 */

const toggle = createAction('<Gradebook />: toggle')

/**
 * Reducer
 */
const reducer = handleActions({
  [toggle]: state => ({...state, expanded: !state.expanded })
})


/**
 * Exports
 */

export default summonChannels(({group}) => `group!${group._id}.board`,
  {
    togglePref: (pref) => ({
      savingPreference:  {
        url: '/preference/gradebook.displayPercent',
        invalidates: '/user',
        method: 'PUT',
        body: {
          value: !pref
        }
      }
    })
  }
)({
  render,
  reducer
})