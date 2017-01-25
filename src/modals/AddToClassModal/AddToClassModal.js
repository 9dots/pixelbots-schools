/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Block, Text, Icon, Checkbox} from 'vdux-ui'
import {component, element} from 'vdux'
import {form} from 'vdux-containers'
import summon from 'vdux-summon'

/**
 * <Add To Class Modal/>
 */

export default summon(() => ({
  classes: '/user/classes'
}))(
  form(({students}) => ({
    fields: ['selected']
  }))(component({
  render ({props, actions, context}) {
  	const {classes, students} = props
  	const {value, loaded} = classes

    return (
    	<Modal onDismiss={context.closeModal}>
    		<ModalBody pb='l' w='col_l' mx='auto'>
    			<ModalHeader>
    				Add to Class
  				</ModalHeader>
  				<Block textAlign='center' pb='l'>
  					Select the classes you want to add 
  					{ 
  						students.length > 1 
  						? <Text>
  								&nbsp;these <Text color='blue' bold>{students.length}</Text> students&nbsp;
								</Text>
  						: ' this student '
  					}
  					to.
					</Block>
  				<Block overflow='auto' border='1px solid grey_light' maxHeight='200' boxShadow='inset 0 2px 1px rgba(grey,0.1), inset 0 -2px 1px rgba(grey,0.1)'>
	  				{
	  					loaded && value.items.map((item, i) => <Item last={i === value.items.length - 1} item={item} />)
	  				}
  				</Block>
    		</ModalBody>
    	</Modal>

    )
  }
})))

const Item = component({
	render ({props}) {
		const {item, i, last} = props

		return (
			<Block align='start center' p borderBottom={last ? 0 : '1px solid grey_light'}>
				<Checkbox mr/>
				{item.displayName}
			</Block>
		)
	}
})
