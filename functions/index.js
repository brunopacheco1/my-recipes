'use strict'

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const getRecipes = require('./get-recipes');
const addRecipe = require('./add-recipe');

admin.initializeApp();

exports.addRecipe = functions.https.onRequest(addRecipe);
exports.getRecipes = functions.https.onRequest(getRecipes);
