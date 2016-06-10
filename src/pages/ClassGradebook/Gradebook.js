/**
 * Imports
 */

import {Table, TableHeader, TableRow, Card, Block} from 'vdux-ui'
import summonChannels from 'lib/summon-channels'
import GradebookRow from './GradebookRow'
import Loading from 'components/Loading'
import element from 'vdux/element'
import map from '@f/map'

/**
 * <Gradebook/>
 */

function render ({props}) {
  const {group, students, activities} = props
  const {value, loading, loaded} = activities

  if (!loaded && loading) return <Loading show={true} h='200' />

  const {items: activityList} = value

  return (
    <Block w='col_main' mx='auto' my='l' relative overflow='auto' boxShadow='card'>
      <Table overflow='auto'>
        <Header activities={activityList} />
        {
          map((student, i) => <GradebookRow
            activities={activityList}
            student={student}
            odd={i%2}
            last={students.length === (i+1)} />,students)
        }
      </Table>
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


/**
 * Exports
 */

export default summonChannels(({group}) => `group!${group._id}.board`)({
  render
})