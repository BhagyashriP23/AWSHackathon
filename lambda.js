const AWS = require('aws-sdk');

// Creating an instance of DynamoDB DocumentClient
const dynamo = new AWS.DynamoDB.DocumentClient();


// Fixing the table name as "dealerTable" if there is no TABLE_NAME variable set in the environment
//const tableName = process.env.TABLE_NAME || "uex-hackathon-bhagya-test"
const tableName = "uex-hackathon-bhagya-test"
/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
 
 /**
 * Lambda function handler.
 */

exports.handler = async (event, context) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    let body ;//= {"name":"SHRUTIKA"};
    let statusCode = '200';
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'*'
    };
    

    try {
        switch (event.httpMethod) {
            case 'POST':{
                console.log("Inside POST");
                let getPayload = {
                    Key: {
                        "id": 1
                    }
                };
                
                const parsedJsonBody = JSON.parse(event.body)
                
                getPayload.TableName = tableName;
                let resp = await dynamo.get(getPayload).promise();
                console.log(resp);
                let prevUserScore = resp.Item.userScore;
                let prevSystemScore = resp.Item.systemScore;
                let finalUserScore = resp.Item.userScore;
                let finalSystemScore = resp.Item.systemScore;
                let batting = resp.Item.isBatting;
                let battingFirst = resp.Item.isBattingFirst;
                let valueFromUser = parsedJsonBody.userInput;
                let valueGenerated = parsedJsonBody.generatedValue;
                // let valueFromUser = 2;
                // let valueGenerated = 3;
                let result = 0;
                console.log("Generated value is : " + valueGenerated);
                console.log("User Input is : " + valueFromUser);
                console.log("Is Batting : " + batting);
                console.log("Is Batting First : " + battingFirst);
                
                // User is Batting in First Innings
                if(batting && battingFirst) {
                    if(valueGenerated == valueFromUser) {
                        let str = "Batting Innings Ended : Final score is : " + prevUserScore;
                        console.log("Batting Innings Ended : Final score is : " + prevUserScore);
                        let payload = {
                            Key : {
                                "id": 1
                            },
                            UpdateExpression : "set isBatting = :newdata",
                            ExpressionAttributeValues: {
                                ":newdata": false
                            }
                        };
                    
                        payload.TableName = tableName;
                        await dynamo.update(payload).promise();
                        
                        let body = {"message" : str};
                        body = JSON.stringify(body);
                        return {
                        statusCode,
                        body,
                        headers
                    };
                    }
                    else {
                        result = prevUserScore + valueFromUser;
                        console.log("score updated to : " + result);
                        
                        let payload = {
                            Key : {
                                "id": 1
                            },
                            UpdateExpression : "set userScore = :newdata",
                            ExpressionAttributeValues: {
                                ":newdata": result
                            }
                        };
                        let str = "score updated to : " + result;
                        let body = {"message" : str};
                        body = JSON.stringify(body);
                        payload.TableName = tableName;
                        await dynamo.update(payload).promise();
                        
                        return {
                            statusCode,
                            body,
                            headers
                        };
                    }
                    
                }
                // User is Batting in Second Innings
                else if(batting && !battingFirst) {
                    if(valueGenerated == valueFromUser) {
                        console.log("Game Ended : User lose by " + (prevSystemScore - prevUserScore) + " runs!");
                        result = prevUserScore;
                        // let payload = {
                        //     Key : {
                        //         "id": 1
                        //     },
                        //     UpdateExpression : "set result = :newdata",
                        //     ExpressionAttributeValues: {
                        //         ":newdata": "lose by " + (prevSystemScore - prevUserScore) + " runs!"
                        //     }
                        // };
                        
                        let str = "Game Ended : User lose by " + (prevSystemScore - prevUserScore) + " runs!";
                        let body = {"message" : str};
                        body = JSON.stringify(body);
                        
                        // payload.TableName = tableName;
                        // await dynamo.update(payload).promise();
                        return {
                            statusCode,
                            body,
                            headers
                        };
                    }
                    else {
                        result = prevUserScore + valueFromUser;
                        console.log("score updated to : " + result);
                        
                        if(result > prevSystemScore) {
                            // let payload = {
                            //     Key : {
                            //         "id": 1
                            //     },
                            //     UpdateExpression : "set result = :newdata",
                            //     ExpressionAttributeValues: {
                            //         ":newdata": "win! Target : " + prevSystemScore + " achieved"
                            //     }
                            // };
                            
                        let str = "win! Target : " + prevSystemScore + " achieved";
                        let body = {"message" : str};
                        body = JSON.stringify(body);
                        
                        // payload.TableName = tableName;
                        // await dynamo.update(payload).promise();
                        return {
                            statusCode,
                            body,
                            headers
                            };
                        }
                        
                        let payload = {
                            Key : {
                                "id": 1
                            },
                            UpdateExpression : "set userScore = :newdata",
                            ExpressionAttributeValues: {
                                ":newdata": result
                            }
                        };
                        
                        payload.TableName = tableName;
                        await dynamo.update(payload).promise();
                    
                        let str = "score updated to : " + result;
                        let body = {"message" : str};
                        body = JSON.stringify(body);
                        
                        payload.TableName = tableName;
                        await dynamo.update(payload).promise();
                        return {
                            statusCode,
                            body,
                            headers
                            };
                    
                    
                    }
                    
                }
                // User is Bowling in Second Innings
                else if(!batting && battingFirst) {
                    if(valueGenerated == valueFromUser) {
                        console.log("Game Ended : User win by " + (prevUserScore - prevSystemScore) + " runs!");
                        result = prevSystemScore;
                        
                        // let payload = {
                        //     Key : {
                        //         "id": 1
                        //     },
                        //     UpdateExpression : "set result = :newdata",
                        //     ExpressionAttributeValues: {
                        //         ":newdata": "win by " + (prevUserScore - prevSystemScore) + " runs!"
                        //     }
                        // };
                        
                        let str = "Game Ended : User win by " + (prevUserScore - prevSystemScore) + " runs!";
                        let body = {"message" : str};
                        body = JSON.stringify(body);
                    
                        // payload.TableName = tableName;
                        // await dynamo.update(payload).promise();
                        
                        return {
                            statusCode,
                            body,
                            headers
                            };
                    }
                    else {
                        result = prevSystemScore + valueGenerated;
                        console.log("score updated to : " + result);
                        
                        let payload = {
                            Key : {
                                "id": 1
                            },
                            UpdateExpression : "set systemScore = :newdata",
                            ExpressionAttributeValues: {
                                ":newdata": result
                            }
                        };
                        
                        
                        
                        payload.TableName = tableName;
                        await dynamo.update(payload).promise();
                        
                        
                        if(result > prevUserScore) {
                            
                            let str = "Lose! Target : " + prevUserScore + " not defended";
                            let body = {"message" : str};
                            body = JSON.stringify(body);
                            
                            // let payload = {
                            //     Key : {
                            //         "id": 1
                            //     },
                            //     UpdateExpression : "set result = :newdata",
                            //     ExpressionAttributeValues: {
                            //         ":newdata": str
                            //     }
                            // };
                        
                        
                            // payload.TableName = tableName;
                            // await dynamo.update(payload).promise();
                            
                            return {
                            statusCode,
                            body,
                            headers
                            };
                        }
                        
                        let str = "score updated to : " + result;
                        let body = {"message" : str};
                        body = JSON.stringify(body);
                        
                        return {
                            statusCode,
                            body,
                            headers
                            };
                    }
                    
                }
                // User is Bowling in First Innings
                else {
                    if(valueGenerated == valueFromUser) {
                        result = prevSystemScore;
                        console.log("Bowling Innings Ended : Final system score is : " + result);
                        let payload = {
                            Key : {
                                "id": 1
                            },
                            UpdateExpression : "set isBatting = :newdata",
                            ExpressionAttributeValues: {
                                ":newdata": true
                            }
                        };
                        
                        let str = "Bowling Innings Ended : Final system score is : " + result;
                        let body = {"message" : str};
                        body = JSON.stringify(body);
                    
                        payload.TableName = tableName;
                        await dynamo.update(payload).promise();
                        
                        return {
                            statusCode,
                            body,
                            headers
                            };
                    }
                    else {
                        result = prevSystemScore + valueGenerated;
                        console.log("score updated to : " + result);
                        let payload = {
                            Key : {
                                "id": 1
                            },
                            UpdateExpression : "set systemScore = :newdata",
                            ExpressionAttributeValues: {
                                ":newdata": result
                            }
                        };
                        
                        let str = "score updated to : " + result;
                        let body = {"message" : str};
                        body = JSON.stringify(body);
                        
                        payload.TableName = tableName;
                        await dynamo.update(payload).promise();
                        
                         return {
                            statusCode,
                            body,
                            headers
                            };
                    }
                
            }
            
            }
            case 'GET':
               /* if(event.resource === "/dealer/{id}"){
                    // Handling GET request for a specific item by ID
                    const id = event.pathParameters.id
                    if(!id)
                        throw Error("{id} not defined")
                    body = await dynamo.get(formatDbParam(parsedJsonBody,id),event.pathParameters.id).promise();
                }else{
                    // Handling GET request to scan all items
                    body = await dynamo.scan(formatDbParam()).promise();
                }*/
                 body = await dynamo.scan(formatDbParam()).promise();
                break;
            
            case 'PUT':
                // Handling PUT request to update an item
               // body = await dynamo.put(formatDbParam(parsedJsonBody)).promise();
                break;
            case 'OPTIONS':
                {
                    
                    return{
                        statusCode,
                        body,
                        headers,
                        
                    };
                
                }
            default:
                throw new Error(`Unsupported method "${event.httpMethod}"`);
        }
    } catch (err) {
        // Handling errors
        statusCode = '400';
        body = err.message;
    }
    //finally {
    //     // Converting the response body to JSON string
    //     body = JSON.stringify(body);
    // }

    // Returning the response
    return {
        statusCode,
        body,
        headers
    };
};

/**
 * Formats DynamoDB parameters for put, get, and delete operations.
 */
function formatDbParam(item = null,id = null){
    return {
        TableName: tableName,
        Item:item,
        Key:id ? { id } : null
    }
}
