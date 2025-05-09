const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const params = {
      TableName: process.env.TODOS_TABLE
    };
    
    const result = await dynamoDB.scan(params).promise();
    
    // Log the operation for CloudWatch
    console.log('Successfully retrieved todos:', JSON.stringify(result.Items));
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result.Items)
    };
  } catch (error) {
    console.error('Error retrieving todos:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ message: 'Error retrieving todos' })
    };
  }
};