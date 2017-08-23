/**
 * Imports
 */

import {combineInstancesAndStudents, activitySort} from 'lib/activity-helpers'
import {Block, Table, TableHeader, TableRow, Icon} from 'vdux-ui'
import ActivityProgressActions from './ActivityProgressActions'
import ActivityProgressRow from './ActivityProgressRow'
import {Checkbox, form, Button} from 'vdux-containers'
import EmptyState from 'components/EmptyState'
import SortHeader from 'components/SortHeader'
import summonPrefs from 'lib/summon-prefs'
import {component, element} from 'vdux'
import mapValues from '@f/map-values'
import index from '@f/index'
import map from '@f/map'

/**
 * <ActivityProgress/>
 */

export default summonPrefs()(
  form(({students}) => ({
    fields: ['selected']
  }))(
component({
  render ({props, context, actions}) {
    const {
    activity, students, setStatus, settingStatus, prefs,
    toggleAll, fields, instances, classRef, sequence
  } = props
    const sort = prefs.shareStudentSort || {property: 'name.givenName', dir: 1}

    // const instanceList = combineInstancesAndStudents(activity, students, instances)
    // .sort(activitySort(sort))

    const studentInsts = map((student, id) => ({
      ...student,
      ...(instances[id] || {notStarted: true})
    }), students)

    const headProps = {sort, setSort: actions.setSort, lighter: true, p: true}

    // Multi Select Variables
    const instanceIds = Object.keys(instances)
    const selected = (fields.selected.value || []).filter(id => instanceIds[id])
    const selMap = index(selected)
    const allSelected = instanceIds.length === selected.length && Object.keys(students).length
    const indeterminate = !allSelected && selected.length

    return (
      <Block w='col_main' m='auto' bgColor='white' boxShadow='card' p mb>
        <Table wide border='1px solid rgba(black, .1)' fs='s' lighter>
          <TableRow bgColor='grey' color='white'>
            {/*<TableHeader {...headProps}>
              <Checkbox pointer checked={allSelected} indeterminate={indeterminate} onChange={toggleAll('selected')} />
            </TableHeader>*/}
            <SortHeader {...headProps} prop='givenName' text='Name' />
            <SortHeader {...headProps} prop='percent' text='Score' />
            <SortHeader {...headProps} prop='status' text='Status' />
            {/*<TableHeader {...headProps} />*/}
          </TableRow>
          {
            instanceIds.length
              ? mapValues((instance, id) =>
                  <ActivityProgressRow
                    selected={!!selMap[id]}
                    sequence={sequence}
                    instance={instance} />,
                    studentInsts
                )
              : <tr>
                  <EmptyState tag='td' icon='person' color='green' colspan='100' pb='l'>
                    <Block>
                      You must add students to your class in order to view results.
                    </Block>
                    <Button onClick={context.setUrl(`/class/${classRef}/students`)} fs='s' lighter py boxShadow='z2' bgColor='green' mt='l'>
                      <Icon name='person_add' mr='s' fs='s' />
                        Add Students
                    </Button>
                  </EmptyState>
                </tr>
          }
        </Table>
      </Block>
    )
  },

  controller: {
    * setSort ({props}, sort, property) {
      yield props.setPref('shareStudentSort', {
        property,
        dir: property === sort.property ? sort.dir * -1 : 1
      })
    }
  }
})))
