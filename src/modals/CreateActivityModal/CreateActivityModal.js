/**
 * Imports
 */

import {Modal, ModalBody, ModalHeader, Icon, Block, Checkbox} from 'vdux-ui'
import {Button, Image} from 'vdux-containers'
import {setUrl} from 'redux-effects-location'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import {closeModal} from 'reducer/modal'
import Loading from 'components/Loading'
import resize from 'lib/resize-image'
import element from 'vdux/element'
import getProp from '@f/get-prop'
import summon from 'vdux-summon'
import map from '@f/map'

/**
 * onCreate
 */

function * onCreate ({props}) {
  const {currentUser, createBlank} = props
  const hideTemplates = getProp('preferences.messages.templates', currentUser)

  if (hideTemplates) {
    const activity = yield createBlank()
    yield closeModal()
    yield setUrl(`/activity/${activity._id}/public/preview`)
  }
}

/**
 * <CreateActivityModal/>
 */

const {TEMPLATE_BOARD_ID} = process.env
const w = 110
const h = w * 1.25

function render ({props, state, local}) {
  const {templates, noTemplates, currentUser} = props
  const {value, loaded} = templates
  const {hideTemplates} = state

  // If this modal is supposed to not be shown, just render
  // a span until we get redirected away from it
  if (getProp('preferences.messages.templates', currentUser)) {
    return <span/>
  }

  return (
    <Modal onDismiss={closeModal} textAlign='center' w='610'>
      <ModalHeader color='text'>
        Create Activities for your Class
      </ModalHeader>
      <Button onClick={createBlank} my pill bgColor='green' boxShadow='z2' py fs='s' fw='200'>
        Create a New Activity
        <Icon name='keyboard_arrow_right' ml='s'/>
      </Button>
      <Block my='l' fs='s' fontStyle='italic' fw='200'>
        or try editing some samples first
      </Block>
      <Block align='center center' pb='s'>
        {
          loaded
            ? map(activity => <TemplateItem activity={activity} copy={() => copyTemplate(activity._id)} />, value.items)
            : <Block m>
                <Loading show={true} border='1px solid grey_medium' h={h} w={w}/>
                <Block py='xs' color='grey_medium' textAlign='left'>
                  Loading ...
                </Block>
              </Block>

        }
      </Block>
      <Block p align='end' fs='xxs'>
        <Checkbox
          checked={hideTemplates}
          onChange={local(setHideTemplates)}
          label={'Don\'t show me this again'}
          uiProps={{flexDirection: 'row-reverse'}}
          pointer />
      </Block>
    </Modal>
  )

  function * createBlank () {
    if (hideTemplates) yield noTemplates()
    const activity = yield props.createBlank()
    yield closeModal()
    yield setUrl(`/activity/${activity._id}/public/preview`)
  }

  function * copyTemplate (id) {
    if (hideTemplates) yield noTemplates()
    const activity = yield props.copyTemplate(id)
    yield closeModal()
    yield setUrl(`/activity/${activity._id}/public/preview`)
  }
}

/**
 * Actions
 */

const setHideTemplates = createAction('<CreateActivityModal/>: set hide templates', e => e.target.checked)

/**
 * Reducer
 */

const reducer = handleActions({
  [setHideTemplates]: (state, value) => ({
    ...state,
    hideTemplates: value
  })
})

/**
 * Template Item
 */

function TemplateItem ({props}) {
  const {activity, copy} = props
  const {displayName, image} = activity
  return (
    <Block
      onClick={copy}
      hide={displayName === 'Announcement'}
      m>
      <Image hoverProps={{borderColor: 'blue_light', boxShadow: '0 0 1px 1px rgba(blue, .3)'}}
      display='block'
      border='1px solid grey_medium'
      src={resize(image.url, 350)}
      pointer
      h={h}
      w={w}/>
      <Block py='xs' color='grey_medium' textAlign='left'>
        {displayName}
      </Block>
    </Block>
  )
}

/**
 * Exports
 */

export default summon(props => ({
  templates: `/share?channel=group!${TEMPLATE_BOARD_ID}.board`,
  createBlank: () => ({
    creatingBlank: {
      url: '/share/new',
      method: 'POST'
    }
  }),
  copyTemplate: id => ({
    copyingTemplate: {
      url: `/share/template/${id}`,
      method: 'POST'
    }
  }),
  noTemplates: () => ({
    savingPreference:  {
      url: '/preference/messages.templates',
      method: 'PUT',
      body: {
        value: true
      },
      invalidates: '/user'
    }
  })
}))({
  onCreate,
  reducer,
  render
})
