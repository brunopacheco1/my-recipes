'use strict';

exports.persistRecipe = (request, response) => {
  response.status(200).send(JSON.stringify(request.body));
};

exports.event = (event, callback) => {
  callback();
};
