'use strict';
class DynamoDBRepository {
    constructor(client, table) {
        this.client = client;
        this.table = table;
        console.log('DynamoDBRepository - constructor() - params: [client: ' + JSON.stringify(this.client) + ', table: ' + this.table + ']');
    }
    async fetchAll() {
        console.log('DynamoDBRepository - fetchAll()');
        const entities = await this.client.scan({
            TableName: this.table
        }).promise();
        console.log('DynamoDBRepository - fetchAll() - result: ' + JSON.stringify(entities));
        return entities.Items;
    }
    async get(id) {
        console.log('DynamoDBRepository - get() - params: ' + id);
        const entity = await this.client.get({
            TableName: this.table,
            Key: {
                id
            },
        }).promise();
        console.log('DynamoDBRepository - get() - result: ' + JSON.stringify(entity));
        return entity.Item;
    }
    async save(entity) {
        console.log('DynamoDBRepository - save() - params: ' + JSON.stringify(entity));
        console.log('DynamoDBRepository - save() - params: [client: ' + JSON.stringify(this.client) + ', table: ' + this.table + ']');
        const params = {
            TableName: this.table,
            Item: entity,
        };
        console.log('DynamoDBRepository - save() - params: ' + JSON.stringify(params));
        return this.client.put(params).promise();
        /*this.client.putItem(params, function(err, data) {
            if (err) {
                console.error("GAMES TABLE: Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("GAMES TABLE: Added item:", JSON.stringify(data, null, 2));
            }
        });*/
    }
}
module.exports = DynamoDBRepository;