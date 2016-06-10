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
  const headProps = {
    borderRight: '1px solid text',
    bgColor: 'grey',
    color: 'white',
    p: '24px 16px',
    relative: true,
    z: 2
  }

  if (!loaded && loading) return <Loading show={true} h='200' />

  const {items: activityList} = value

  return (
    <Block w='col_main' mx='auto' my py relative>
      <Card ui={Table} overflow='auto'>
        <TableRow>
          <TableHeader {...headProps} textAlign='left' borderWidth='0'>
            First
          </TableHeader>
          <TableHeader {...headProps} textAlign='left' borderWidth='0'>
            Last
          </TableHeader>
          <TableHeader {...headProps}>
            Total
          </TableHeader>
          {
            map(activity => <ActivityHeader {...headProps} activity={activity} />, activityList)
          }
        </TableRow>
        {
          map((student, i) => <GradebookRow
            activities={activityList}
            student={student}
            odd={i%2}
            last={students.length === (i+1)} />,students)
        }
      </Card>
    </Block>

  )
}

function ActivityHeader ({props}) {
  const {activity, ...rest} = props
  return (
    <TableHeader {...rest}  fs='xxs' px>
      <Block w='90px' ellipsis>
        {activity.displayName}
      </Block>
    </TableHeader>
  )
}


/**
 * Exports
 */

export default summonChannels(({group}) => `group!${group._id}.board`)({
  render
})