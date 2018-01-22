/**
 * Imports
 */

import { Block, Table, TableHeader, TableRow, Icon, Toast } from 'vdux-ui'
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
import Airtable from 'airtable'
import AirtableModal from 'modals/AirtableModal'
var base = new Airtable({apiKey: 'key1dbkUICnTbG7vO'}).base('appRt18Qzf64edPUO');

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
                ...instances[id]
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
                onClick={actions.openConfirmationModal(studentInsts)} 
                bgColor='blue'
                px>
                <Icon name='file_upload' fs='m' mr='s' />
                Export to Airtable
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

        * openConfirmationModal({context,actions}, studentInsts) {
          yield context.openModal(() => <AirtableModal onSubmit={actions.uploadToAirtable(studentInsts)} />)
        },

        uploadToAirtable({props,context}, data) {
          const {sequence, playlist, teacherName} = props
          let success = false;
          console.log(props, context)
          const content = mapValues(
            (inst, key) => ({
              familyName: inst.familyName,
              givenName: inst.givenName,
              playlist: playlist.name,
              scores: sequence.map((val, i) => inst.challengeScores[i] || 0),
              numCompleted: inst.numCompleted,
              possibleCompleted: inst.possibleCompleted,
              progress: inst.progress
            }),
            data
          )
          console.log(teacherName)
          const filter = "({Teacher} = '" + teacherName + "')"
          base('All Students').select({
            filterByFormula: filter,
            view: 'getCoding'
          }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
            records.forEach(function(record) {
              const currentStudent = content.find((student)=>student.givenName.toUpperCase() === record.get('First Name').toUpperCase() 
                && student.familyName.toUpperCase() === record.get('Last Name').toUpperCase())
              if (currentStudent) {
                //currentStudent.scores.map((score, i) => {
                  console.log(currentStudent)
                  base('ALL Students').update(record.id, {
                    // Had to hardcode, can't use variables for Question field
                    "Question 1": currentStudent.scores[0],
                    "Question 2": currentStudent.scores[1],
                    "Question 3": currentStudent.scores[2],
                    "Question 4": currentStudent.scores[3],
                    "Question 5": currentStudent.scores[4],
                    "Question 6": currentStudent.scores[5],
                    "Question 7": currentStudent.scores[6],
                    "Question 8": currentStudent.scores[7],
                    "Question 9": currentStudent.scores[8],
                    "Question 10": currentStudent.scores[9],

                  }, function(err, record) {
                      if (err) { console.error(err); return; }
                      console.log(record.get('First Name'));
                      // context.showToast(
                      //   <Toast key='a' bg='grey' color='white' align='center center' w={520}>
                      //     <Block align='center center'>
                      //       <Text fw='bolder' mr> Data successfully exported.</Text>
                      //     </Block>
                      //   </Toast>
                      // )
                  });
                  //})
              }
            })
            fetchNextPage();
          }, function done(err) {
            if (err) { console.error(err); return; }
          });



                    //: score

        },

        exportAll ({ props }, data) {
          const { sequence, playlist } = props

          const headers = [
            'Last Name',
            'First Name',
            'Activity Name',
            ...sequence.map((val, i) => i + 1),
            'Completed',
            'Possible',
            'Progress Pct'
          ]
          const content = mapValues(
            (inst, key) => [
              inst.familyName,
              inst.givenName,
              playlist.name,
              ...sequence
                .map(val => inst.challengeScores[val.gameRef] || 0)
                .map(({ badge = 0, completed = 0 }) => badge + completed)
                .map(val => val.toString()),
              inst.numCompleted,
              inst.possibleCompleted,
              inst.progress
            ],
            data
          )
          // console.log(content)
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
    numCompleted: completedChallenges.length.toString(),
    possibleCompleted: sequence.length.toString(),
    status: getStatus(instance),
    completedChallenges,
    challengeScores,
    displayName,
    familyName,
    givenName,
    uid
  }
}

function getStatus (instance) {
  if (instance.completed) return 'Completed'
  if (instance.started || instance.completedChallenges) return 'In Progress'
  return 'Not Started'
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
