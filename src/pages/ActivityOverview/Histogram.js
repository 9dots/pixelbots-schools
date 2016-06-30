/**
 * Imports
 */

import {Flex, Card, Block} from 'vdux-ui'
import element from 'vdux/element'
import Color from 'color'
import * as colors from 'lib/colors'
import map from '@f/map'

/**
 * Render
 */

function render({props}) {
  const {data} = props
  const {
    totalPoints, averagePoints, averagePercent,
    numStudents, numReturned, bins
  } = data

  return (
    <Flex>
      <Card flex h={120} relative>
        {
          map((bin, i) => <Bar bin={bin} i={i} />, bins)
        }
      </Card>
      <Card ui={Flex} lighter column ml w={138} h={120} p align='space-between'>
        <Block fs='m' mb='s'>
          Total
        </Block>
        <Block align='space-between'>
          <Block>
            Students:
          </Block>
          <Block>
            {numReturned} / {numStudents}
          </Block>
        </Block>
        <Block align='space-between'>
          <Block>
            Score:
          </Block>
          <Block>
            {averagePoints} / {totalPoints}
          </Block>
        </Block>
        <Block align='space-between'>
          <Block>
            Percent:
          </Block>
          <Block>
            {averagePercent}
          </Block>
        </Block>
      </Card>
    </Flex>
  )
}

function Bar({props}) {
  const {bin, i} = props
  const colorStyles = indexToColor(i)
  return (
    <Block
      absolute
      left={(i * 10) + '%'}
      bottom
      w='9%'
      h='50%'
      ml='.5%'
      {...colorStyles}>
      bin
    </Block>
  )
}

function indexToColor(i) {
  let {red} = colors
  red = Color(red)
  const blue = Color('#3EC1FA')
  const c1 = red.clone().saturate(.9).lighten((i * 5) / 100)
  const c2 = blue.clone().lighten(((10 - i) * 4) / 100)
  const mix = c1.clone().mix(c2, .5).saturate(.5)
  const border = mix.clone().darken(.1)

  return {
    border: `2px solid ${border.rgbString()}`,
    borderBottomWidth: 0,
    bg: mix.rgbString()
  }


  // c1 = lighten(saturate(red, 90), (bar * 5))
  // c2 = lighten(#3EC1FA, ((10 - bar)*5))
  // background: mix(c2, c1)
  // border: 2px solid darken(mix(c2, c1), 10)
  // border-bottom: 0
  // &:hover
  //   border-color: darken(mix(c2, c1), 6)
  //   background: lighten(@background, 4)

}

/**
 * Exports
 */

export default {
  render
}