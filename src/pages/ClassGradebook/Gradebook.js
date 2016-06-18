/**
 * Imports
 */

import {Table, TableHeader, TableRow, Card, Block, Icon} from 'vdux-ui'
import summonChannels from 'lib/summon-channels'
import GradebookRow from './GradebookRow'
import Loading from 'components/Loading'
import {Button, Dropdown, MenuItem} from 'vdux-containers'
import element from 'vdux/element'
import map from '@f/map'

/**
 * <Gradebook/>
 */

function render ({props}) {
  const {group, students, activities, currentUser} = props
  const {value, loading, loaded} = activities

  if (!loaded && loading) return <Loading show={true} h='200' />

  const {items: activityList} = value

  return (
    <Block w='col_main' mx='auto' my='l' relative >
      <Block align='start center' relative>
        <Dropdown btn={<DropButton />} z='3' mt={-12} left w='160px' fs='xxs'>
          <MenuItem py>Display as Percentages </MenuItem>
          <MenuItem py align='start center'>
            Export to CSV
            <Icon name='file_download' fs='xs' ml='s' />
          </MenuItem>
        </Dropdown>
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
    <Button bgColor='green' mb h={32}>
      <Icon name='settings' fs='xs' mr='s' />
      Settings
      <Icon name='arrow_drop_down' fs='s' ml='s' mr='-12px' />
    </Button>
  )
}


/**
 * Exports
 */

export default summonChannels(({group}) => `group!${group._id}.board`)({
  render
})