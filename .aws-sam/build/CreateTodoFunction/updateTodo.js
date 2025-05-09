const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const todoId = event.pathParameters.id;
    const requestBody = JSON.parse(event.body);
    const { title, description, completed } = requestBody;
    
    const params = {
      TableName: process.env.TODOS_TABLE,
      Key: {
        id: todoId
      },
      UpdateExpression: 'set title = :title, description = :description, completed = :completed, updatedAt = :updatedAt',
      ExpressionAttributeValues: {
        ':title': title,
        ':description': description || '',
        ':completed': completed !== undefined ? completed : false,
        ':updatedAt': new Date().toISOString()
      },
      ReturnValues: 'ALL_NEW'
    };
    
    const result = await dynamoDB.update(params).promise();
    
    // Log the operation for CloudWatch
    console.log('Successfully updated todo:', JSON.stringify(result.Attributes));
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result.Attributes)
    };
  } catch (error) {
    console.error('Error updating todo:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ message: 'Error updating todo' })
    };
  }
};