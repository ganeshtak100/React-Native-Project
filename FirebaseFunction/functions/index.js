const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', {structuredData: true});
  response.send('Hello from Firebase!');
});

exports.apiReq = functions.https.onRequest((req, res) => {
  switch (req.method) {
    case 'GET':
      res.send('req is get request');
      break;
    case 'POST':
      res.send('req is post request');
      break;
    case 'DELETE':
      res.send('req is delete request');
      break;
    default:
      res.send('it was a default case');
  }
});

exports.userData = functions.auth.user().onCreate(user => {
  console.log(`${user.email} is created`);
  return Promise.resolve();
});

exports.userData = functions.auth.user().onDelete(user => {
  console.log(`${user.email} is deleted`);
  return Promise.resolve();
});

exports.scheduleFunctions = functions.pubsub
  .schedule('* * * * *')
  .onRun(context => {
    console.log('running this taskevery minutes ...');
    return null;
  });
