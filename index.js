const asyncPool = require("tiny-async-pool");

const timeOut = t => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Completed in ${t}`);
    }, t);
  });
};

const promiseCompletesAfterEnd = () => {
  console.log("start promiseCompletesAfterEnd");
  const durations = [1000, 2000, 3000];

  const promises = [];

  durations.map(duration => {
    promises.push(timeOut(duration));
  });

  Promise.all(promises).then(response => console.log(response));
  console.log("end promiseCompletesAfterEnd");
};

const allPromisesCompleteTogether = () => {
  console.log("start allPromisesCompleteTogether");
  for (let index = 0; index < 100; index++) {
    const durations = [1000, 1000, 5000];

    const promises = [];

    durations.map(duration => {
      promises.push(timeOut(duration));
    });

    Promise.all(promises).then(response => console.log(index, response));
  }
  console.log("end allPromisesCompleteTogether");
};

const asyncAwaitMeansWillWaitForPromiseToComplete = async () => {
  console.log("start promiseCompletesAfterEnd");
  const durations = [1000, 2000, 3000];

  const promises = [];

  durations.map(duration => {
    promises.push(timeOut(duration));
  });

  await Promise.all(promises).then(response => console.log(response));
  console.log("end promiseCompletesAfterEnd");
};

const awaitPromiseWorksInWhileLoop = async () => {
  console.log("start awaitPromiseWorksInWhileLoop");
  let i = 0;
  const durations = [1000, 2000, 3000];
  while (i < 5) {
    console.log(i);
    const promises = [];
    durations.map(duration => {
      promises.push(timeOut(duration));
    });
    await Promise.all(promises).then(response => console.log(i, response));
    i++;
  }
  console.log("end awaitPromiseWorksInWhileLoop");
};

const awaitPromiseWorksInForLoop = async () => {
  console.log("start awaitPromiseWorksInForLoop");
  const durations = [1000, 2000, 3000];
  for (let i = 0; i < 5; i++) {
    console.log(i);
    const promises = [];
    durations.map(duration => {
      promises.push(timeOut(duration));
    });
    await Promise.all(promises).then(response => console.log(i, response));
  }
  console.log("end awaitPromiseWorksInForLoop");
};

const awaitPromiseDoesNotWorkInForEach = async () => {
  console.log("start awaitPromiseDoesNotWorkInForEach");
  const durations = [1000, 2000, 3000];

  const arrayOfFiveNumbers = [...new Array(5).keys()];

  arrayOfFiveNumbers.forEach(async num => {
    const promises = [];
    durations.map(duration => {
      promises.push(timeOut(duration));
    });
    await Promise.all(promises).then(response => console.log(num, response));
  });
  console.log("end awaitPromiseDoesNotWorkInForEach");
};

const asyncPoolTest = async () => {
  const timeout2 = i =>
    new Promise(resolve =>
      setTimeout(() => {
        console.log(i, new Date());
        resolve(i);
      }, i)
    );
  await asyncPool(2, [1000, 5000, 3000, 2000], timeout2).then(results => console.log(results));
};

const asyncSqsTest = async () => {
  const workload = [...Array(10000).keys()];
  const AWS = require("aws-sdk");
  const sqs = new AWS.SQS();

  const addMessage = userId => {
    const message = `{"UserId": ${userId.toString()}}`;
    const parameters = {
      QueueUrl: "https://sqs.eu-west-1.amazonaws.com/12345/queue-name",
      MessageBody: message
    };
    console.log(userId, new Date());
    return sqs.sendMessage(parameters).promise();
  };

  await asyncPool(100, workload, addMessage);
};

// promiseCompletesAfterEnd();
//allPromisesCompleteTogether();
// asyncAwaitMeansWillWaitForPromiseToComplete();
// awaitPromiseWorksInWhileLoop();
// awaitPromiseWorksInForLoop();
// awaitPromiseDoesNotWorkInForEach();
asyncPoolTest();
//asyncSqsTest();


