/**
 * Imports
 */

import {Flex, Card, Text} from 'vdux-ui'
import {Block, Tooltip} from 'vdux-containers'
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
    numStudents, numReturned, bins, binMax
  } = data
  const lines = Array.apply(null, Array(binMax + 2))


  return (
    <Flex pt>
      <Card flex h={120} relative>
        <Block transform='rotate(-90deg)' absolute top bottom lh='0px' lighter>
          Students
        </Block>
        {
          map((line, i) => <Line binMax={binMax} i={i} />, lines)
        }
        {
          map((bin, i) => <Bar bin={bin} binMax={binMax} i={i} />, bins)
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

function Line({props}) {
  const {i, binMax} = props
  return (
    <Block
      borderBottom='1px solid #F2F2F2'
      borderColor={!i || i > binMax+1 && 'transparent'}
      absolute
      wide
      bottom={(i / (binMax + 1)) * 100 + '%'}
      >
      <Block
        right='100%'
        absolute
        lh='0px'
        fs='xxs'
        color='grey_medium'
        mr>
        {i}
        </Block>
    </Block>
  )
}

function Bar({props}) {
  const {bin, binMax, i} = props
  const colorStyles = indexToColor(i)
  const hideStyles = bin.length ? {} : {borderWidth: '0px'}

  return (
      <Block
        message={tooltipText(bin)}
        tooltipProps={{whiteSpace: 'pre', lh: 1.4}}
        placement='right'
        ui={Tooltip}
        delay={0}
        absolute
        left={(i * 10) + '%'}
        bottom
        w='9%'
        h={(bin.length / (binMax + 1)) * 100 + '%'}
        ml='.5%'
        {...colorStyles}
        {...hideStyles}>
        <Block absolute top='100%' mt='s' fs='xxs' wide color='grey_medium' textAlign='center'>
          {i * 10}
          <Text hide={i == 9}> - {(i + 1) * 10}</Text>
          %
          <Text hide={i != 9}> +</Text>
        </Block>
      </Block>
  )
}

function tooltipText(bin) {
  const text = bin.map(student => {
    const {displayName, percent} = student
    return `${displayName}: ${percent}`
  })
  return text.join('\n')
}

function indexToColor(i) {
  let {red} = colors
  red = Color(red)
  const blue = Color('#3EC1FA')
  const c1 = red.clone().saturate(.9).lighten((i * 5) / 100)
  const c2 = blue.clone().lighten(((10 - i) * 4) / 100)
  const mix = c1.clone().mix(c2, .5).saturate(.8)
  const border = mix.clone().darken(.1)

  return {
    border: `2px solid ${border.rgbString()}`,
    borderBottomWidth: 0,
    bgColor: mix.rgbString(),
    hoverProps: {
      bgColor: mix.clone().lighten(.04).rgbString(),
      borderColor: mix.clone().darken(.06).rgbString()
    }
  }
}

/**
 * Exports
 */

export default {
  render
}