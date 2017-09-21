
const passwords = [
  'apple','bat','bea','butterfly','camel',
  'cupcake','dino','don','elephant','gorilla',
  'kitty','lotus','monster','narwhal','octopus',
  'penguin','pop','potato','ramen','redpanda',
  'remy','rhino','tiger','whale','yellow'
]

const images = passwords.reduce((acc, password) => {
  acc[password] = `localhost:8080/passwordImages/${password}.png`
  return acc
}, {})

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export {
	passwords,
	images,
	getRandomInt
}