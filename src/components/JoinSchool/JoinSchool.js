/**
 * Imports
 */

import BlockInput from 'components/BlockInput'
import {MenuItem} from 'vdux-containers'
import {component, element} from 'vdux'
import {debounce} from 'redux-timing'
import {Block, Card} from 'vdux-ui'
import summon from 'vdux-summon'

/**
 * <Join School/>
 */

export default summon(() => ({
  joinSchool: id => ({
    joiningSchool: {
      url: `/school/${id}/join`,
      method: 'PUT'
    }
  }),

  lookup: query => ({
    schools: {
      url: '/school/lookup',
      params: {
        query
      }
    }
  })
}))(component({
  render ({props, actions}) {
  	const {...rest} = props
  	const schools = (props.schools && props.schools.value && props.schools.value.items) || []

    return (
    	<Block align='start center' relative {...rest}>
        <BlockInput autofocus autocomplete='off' name='name' onInput={actions.debouncedLookup} autofocus placeholder='Search for your school by name…' mb={0}  />
        <Card z={2} maxHeight={175} overflow='auto' py='s' mt='-1' absolute top='100%' wide border='grey_light' hide={!schools.length}>
          {
            (schools || []).map(school => (
              <MenuItem wide p onClick={actions.join(school._id)}>
                {school.name}
              </MenuItem>
            ))
          }
        </Card>
      </Block>

    )
  },

  middleware: [
    debounce('debouncedLookup', 500)
  ],

  controller: {
    * debouncedLookup ({props}, query) {
      yield props.lookup(query)
    },

    * join ({props, context}, id) {
      yield props.joinSchool(id)
      yield props.fn()
    }
  }
}))
