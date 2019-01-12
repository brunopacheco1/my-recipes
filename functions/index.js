const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebase = require('firebase');

admin.initializeApp();
firebase.initializeApp();

exports.addRecipe = functions.https.onRequest((request, response) => {
    return firebase.auth().currentUser.getIdToken().then(uid => {
        const recipe = request.body;
        recipe.user_id = uid;
        return recipe;
    })
    .then(recipe => admin.database().ref('/recipes').push(recipe))
    .then(snapshot => response.json(snapshot.ref.toString()))
    .catch(error => response.status(500).json({ error : error.message }));
});

exports.getRecipes = functions.https.onRequest((request, response) => {
    return admin.database().ref('/recipes').once('value')
    .then(snapshot => {
        let recipes = [];
        
        snapshot.forEach(childSnapshot => {
            const recipe = childSnapshot.val();
            recipe.id = childSnapshot.key;
            recipes.push(recipe);
        });

        return response.status(200).json({ size: snapshot.numChildren(), result: recipes });
    })
    .catch(error => response.status(500).json(error));
});
