'use strict';
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const dynamodb = new AWS.DynamoDB.DocumentClient();
const DynamoDBRepository = require('../../repositories/dynamodb');
const repository = new DynamoDBRepository(dynamodb, 'games');
const newGameUsecase = require('../../usecases/new-game')(repository);
const handler = async (event) => {
    console.log('New game - DELIVERY, params: ' + JSON.stringify(event));
    const result = await newGameUsecase(event.pathParameters.difficulty);
    const response = {
        'statusCode': 200,
        'body': JSON.stringify(result.gameEntity.game),
        'isBase64Encoded': false,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS 
        }
    };
    console.log('New game - DELIVERY, response: ' + JSON.stringify(response));
    return response;
};
module.exports = {
    handler,
};