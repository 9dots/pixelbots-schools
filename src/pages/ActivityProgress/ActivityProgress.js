/**
 * Imports
 */

import { Block, Table, TableHeader, TableRow, Icon } from 'vdux-ui'
import ActivityProgressRow from './ActivityProgressRow'
import EmptyState from 'components/EmptyState'
import datauriDownload from 'datauri-download'
import SortHeader from 'components/SortHeader'
import { form, Button } from 'vdux-containers'
import summonPrefs from 'lib/summon-prefs'
import { component, element } from 'vdux'
import mapValues from '@f/map-values'
import toCsv from 'to-csv'
import index from '@f/index'
import map from '@f/map'

/**
 * <ActivityProgress/>
 */

export default summonPrefs()(
  form(({ students }) => ({
    fields: ['selected']
  }))(
    component({
      render ({ props, context, actions }) {
        const {
          students,
          prefs,
          fields,
          instances,
          classRef,
          sequence,
          playlistRef
        } = props

        const sort = prefs.shareStudentSort || {
          property: 'name.givenName',
          dir: 1
        }

        // const instanceList = combineInstancesAndStudents(activity, students, instances)
        // .sort(activitySort(sort))

        const studentInsts = map(
          (student, id) =>
            mapToInstance(
              {
                ...student,
                ...(instances[id] || { notStarted: true })
              },
              sequence
            ),
          students
        )

        const headProps = {
          sort,
          setSort: actions.setSort,
          lighter: true,
          p: true
        }

        // Multi Select Variables
        const instanceIds = Object.keys(instances)
        const selected = (fields.selected.value || []).filter(
          id => instanceIds[id]
        )
        const selMap = index(selected)

        return (
          <Block w='col_main' m='auto' bgColor='white' boxShadow='card' p mb>
            <Block mb align='space-between center' wide>
              <Button px onClick={context.setUrl('/class/' + classRef)}>
                <Icon name='arrow_back' fs='s' mr='s' />
                Back
              </Button>
              <Button
                onClick={actions.exportAll(studentInsts)}
                bgColor='green'
                px>
                <Icon name='file_download' fs='m' mr='s' />
                Download
              </Button>
            </Block>
            <Table wide border='1px solid rgba(black, .1)' fs='s' lighter>
              <TableRow bgColor='grey' color='white'>
                {/* <TableHeader {...headProps}>
              <Checkbox pointer checked={allSelected} indeterminate={indeterminate} onChange={toggleAll('selected')} />
            </TableHeader> */}
                <SortHeader {...headProps} prop='givenName' text='Name' />
                <SortHeader {...headProps} prop='percent' text='Progress' />
                <SortHeader {...headProps} prop='status' text='Status' />
                <TableHeader {...headProps} />
              </TableRow>
              {instanceIds.length ? (
                mapValues(
                  (instance, id) => (
                    <ActivityProgressRow
                      classRef={classRef}
                      selected={!!selMap[id]}
                      completedChallenges={instance.completedChallenges}
                      playlistRef={playlistRef}
                      sequence={sequence}
                      instance={instance} />
                  ),
                  studentInsts
                )
              ) : (
                <tr>
                  <EmptyState
                    tag='td'
                    icon='person'
                    color='green'
                    colspan='100'
                    pb='l'>
                    <Block>
                      You must add students to your class in order to view
                      results.
                    </Block>
                    <Button
                      onClick={context.setUrl(`/class/${classRef}/students`)}
                      fs='s'
                      lighter
                      py
                      boxShadow='z2'
                      bgColor='green'
                      mt='l'>
                      <Icon name='person_add' mr='s' fs='s' />
                      Add Students
                    </Button>
                  </EmptyState>
                </tr>
              )}
            </Table>
          </Block>
        )
      },

      controller: {
        * setSort ({ props }, sort, property) {
          yield props.setPref('shareStudentSort', {
            property,
            dir: property === sort.property ? sort.dir * -1 : 1
          })
        },
        exportAll ({ props }, data) {
          const { sequence, playlist } = props

          const headers = [
            'Last Name',
            'First Name',
            'Activity Name',
            'Completed',
            'Possible',
            'Progress Pct',
            ...sequence.map((val, i) => i + 1)
          ]
          const content = mapValues(
            (inst, key) => [
              inst.familyName,
              inst.givenName,
              playlist.name,
              inst.numCompleted,
              inst.possibleCompleted,
              inst.progress,
              ...sequence.map((val, i) => inst.challengeScores[i] || 0)
            ],
            data
          )
          // console.log(headers, content)
          downloadCsv(playlist.name, [headers, ...content])
        }
      }
    })
  )
)

// function getScore (score) {
//   switch (score) {
//     case 1:
//       return 2
//     case 0.75:
//       return 1
//     default:
//       return 0
//   }
// }

function mapToInstance (instance, sequence) {
  const {
    completedChallenges = [],
    challengeScores = {},
    displayName,
    uid
  } = instance
  const [givenName, familyName] = displayName.split(' ')
  return {
    progress: `${(completedChallenges.length || 0) / sequence.length * 100}%`,
    challengeScores: mapValues(
      ({ completed = 0, badge = 0 }) => completed + badge,
      challengeScores
    ),
    numCompleted: completedChallenges.length.toString(),
    possibleCompleted: sequence.length.toString(),
    status: getStatus(instance),
    completedChallenges,
    displayName,
    familyName,
    givenName,
    uid
  }
}

function getStatus (instance) {
  if (instance.notStarted) return 'Not Started'
  if (instance.completed) return 'Completed'
  return 'In Progress'
}

function downloadCsv (filename, data) {
  datauriDownload(
    filename + '-' + today() + '.csv',
    'text/csv;charset=utf-8',
    toCsv(data, ',', false)
  )
}

function today () {
  var d = new Date()
  return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-')
}
