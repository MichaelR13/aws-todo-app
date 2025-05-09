const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const todoId = event.pathParameters.id;
    
    const params = {
      TableName: process.env.TODOS_TABLE,
      Key: {
        id: todoId
      }
    };
    
    await dynamoDB.delete(params).promise();
    
    // Log the operation for CloudWatch
    console.log('Successfully deleted todo with ID:', todoId);
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,X-Api-Key,Authorization'
      },
      body: JSON.stringify({ message: 'Todo deleted successfully' })
    };
  } catch (error) {
    console.error('Error deleting todo:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,X-Api-Key,Authorization'
      },
      body: JSON.stringify({ message: 'Error deleting todo' })
    };
  }
};