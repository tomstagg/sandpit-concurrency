const AWS = require("aws-sdk");
const constants = require("../constants");

const sqs = new AWS.SQS();

module.exports.addMessage = async userId => {
    const parameters = {
        QueueUrl: constants.sqsUrl,
        MessageBody: toString()
        };
    try {
        await sqs.sendMessage(parameters).promise();
    } catch(err) {
        console.error(err);
        throw err;
    }
};

module.exports.testPromise = userId => {
    console.log(`Starting task ${userId}`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Finishing task ${userId}`);
            resolve(true);
        }, 10000);
    })
};