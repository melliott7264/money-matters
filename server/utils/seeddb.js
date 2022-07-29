// Script to seed the Mongodb with data for the Money Matters project

// require the necessary libraries
const faker = require('faker');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedDB() {
  // Connection URL

  if (process.env.MONGODB_URI) {
    const uri = process.env.MONGODB_URI;
  } else {
    const uri = 'mondodb://localhost/project3';
  }

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  });
  console.log('Client config: ' + client);

  try {
    await client.connect();
    console.log('Connected correctly to server');

    const usersCollection = client.db('project3').collection('users');
    const articlesCollection = client.db('project3').collection('articles');
    const commentsCollection = client.db('project3').collection('comments');

    // The drop() command destroys all data from a collection.
    // Make sure you run it against proper database and collection.
    usersCollection.drop();
    articlesCollection.drop();
    commentsCollection.drop();

    // Create collections for users, articles, and comments
    let usersDataArray = [];
    let articlesDataArray = [];
    let commentsDataArray = [];

    for (let i = 0; i < 50; i++) {
      const username = faker.internet.username();
      const email = faker.internet.exampleEmail();
      const password = 'password1234';
      let newUser = { username: username, email: email, password: password };
      userDataArray.push(newUser);
    }

    // create article data - three per user

    // create comment data - three per article

    // insert user data
    collection.insertMany(userData);

    console.log('Database seeded! :)');
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
}

seedDB();
