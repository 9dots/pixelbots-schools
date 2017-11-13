const passwords = [
  'apple',
  'bat',
  'bea',
  'butterfly',
  'camel',
  'cupcake',
  'dino',
  'don',
  'elephant',
  'gorilla',
  'kitty',
  'lotus',
  'monster',
  'narwhal',
  'octopus',
  'penguin',
  'pop',
  'potato',
  'ramen',
  'redpanda',
  'remy',
  'rhino',
  'tiger',
  'whale',
  'yellow'
]

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min // The maximum is exclusive and the minimum is inclusive
}

function getRandomPassword () {
  return passwords[getRandomInt(0, passwords.length - 1)]
}

export { passwords, getRandomInt, getRandomPassword }
