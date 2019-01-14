'use strict'

const admin = require('firebase-admin');

module.exports = async (request, response) => {
    const snapshot = await admin.database().ref('/recipes').once('value');
    return response.status(200).json({ size: snapshot.numChildren(), result: snapshot.val() });
}