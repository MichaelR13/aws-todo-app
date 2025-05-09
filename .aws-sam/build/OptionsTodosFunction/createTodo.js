const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event) => {
  try {
    const requestBody = JSON.parse(event.body);
    const { title, description } = requestBody;
    
    if (!title) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type,X-Api-Key,Authorization'
        },
        body: JSON.stringify({ message: 'Todo title is required' })
      };
    }
    
    const todo = {
      id: uuidv4(),
      title,
      description: description || '',
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    const params = {
      TableName: process.env.TODOS_TABLE,
      Item: todo
    };
    
    await dynamoDB.put(params).promise();
    
    // Log the operation for CloudWatch
    console.log('Successfully created todo:', JSON.stringify(todo));
    
    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,X-Api-Key,Authorization'
      },
      body: JSON.stringify(todo)
    };
  } catch (error) {
    console.error('Error creating todo:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,X-Api-Key,Authorization'
      },
      body: JSON.stringify({ message: 'Error creating todo' })
    };
  }
};