const devConfig = {
	apiKey: 'AIzaSyAQ7YJxZruXp5RhMetYq1idFJ8-y0svN-s',
  authDomain: 'artbot-dev.firebaseapp.com',
  databaseURL: 'https://artbot-dev.firebaseio.com',
  projectId: 'artbot-dev',
  storageBucket: 'artbot-dev.appspot.com',
  messagingSenderId: '1001646388415'
}

const prodConfig = {
	apiKey: "AIzaSyAj07kPi_C4eGAZBkV7ElSLEa_yg3sHoDc",
  authDomain: "artbot-26016.firebaseapp.com",
  databaseURL: "https://artbot-26016.firebaseio.com",
  projectId: "artbot-26016",
  storageBucket: "artbot-26016.appspot.com",
  messagingSenderId: "493804710533"
}

const config = process.env.NODE_ENV === 'development'
	? devConfig
	: prodConfig

console.log(config)

export default config