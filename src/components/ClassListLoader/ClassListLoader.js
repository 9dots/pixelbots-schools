/**
 * Imports
 */

import {MenuItem} from 'vdux-containers'
import {component, element} from 'vdux'
import mapValues from '@f/map-values'
import fire from 'vdux-fire'

/**
 * <Class List Loader/>
 */

export default fire(({classId}) => ({
	classData: `/classes/${classId}`
}))(component({
  render ({props}) {
  	const {classData} = props

		if (classData.loading) return <span/>

    return (
    	<MenuItem>{classData.value.displayName}</MenuItem>
    )
  }
}))
