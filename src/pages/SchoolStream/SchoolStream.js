/**
 * Imports
 */

import EmptyState from 'components/EmptyState'
import {component, element} from 'vdux'
import {Block} from 'vdux-ui'

/**
 * <School Stream/>
 */

export default component({
  render ({props}) {
    return (
    	<Block>
    		<EmptyState icon='view_headline' w='auto' color='blue' fill>
    			<Block>Nothing to Report Yet</Block>
    			<Block fs='xs' mt>
    				Activity will be displayed here once teachers at your school start using Weo
  				</Block>
    		</EmptyState>
    	</Block>
    )
  }
})
