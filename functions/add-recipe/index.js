'use strict'

const admin = require('firebase-admin');

module.exports = async (request, response) => {
    const recipe = request.body;
    await admin.database().ref('/recipes').push(recipe);
    return response.sendStatus(201);
}