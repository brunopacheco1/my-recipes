const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebase = require('firebase');

admin.initializeApp();

exports.addRecipe = functions.https.onRequest((request, response) => {
    firebase.auth().currentUser.getIdToken().then(uid => {
        const recipe = request.body;
        recipe.user_id = uid;
        return recipe;
    })
    .then(recipe => admin.database().ref('/recipes').push(recipe))
    .then(snapshot => response.json(snapshot.ref.toString()))
    .catch(error => response.status(500).json({ error : error.message }));
});

exports.getRecipes = functions.https.onRequest((request, response) => {
    admin.database().ref('/recipes').once('value')
    .then(snapshot => response.json(snapshot.val()))
    .catch(error => response.status(500).json({ error : error.message }));
});
