'use strict';
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const dynamodb = new AWS.DynamoDB.DocumentClient();
const DynamoDBRepository = require('../../repositories/dynamodb');
const repository = new DynamoDBRepository(dynamodb, 'games');
const fetchGamesUsecase = require('../../usecases/fetch-games')(repository);
const handler = async () => {
    console.log('Fetch games - DELIVERY');
    const result = await fetchGamesUsecase();
    console.log('Fetch games - DELIVERY, result: ' + JSON.stringify(result));
    const response = {
        'statusCode': 200,
        'body': JSON.stringify(result.savedGamesEntity.games),
        'isBase64Encoded': false,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS 
        }
    };
    return response;
};
module.exports = {
    handler,
};