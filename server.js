const http = require('http');
const fs = require('fs');

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

// You
const firebaseConfig = {
    apiKey: "AIzaSyBeUqzMAwe4qFUU08gSh8E4xPotZ9jYWQw",
    authDomain: "deneme-22e0c.firebaseapp.com",
    databaseURL: "https://deneme-22e0c-default-rtdb.firebaseio.com",
    projectId: "deneme-22e0c",
    storageBucket: "deneme-22e0c.appspot.com",
    messagingSenderId: "763736019422",
    appId: "1:763736019422:web:a2025202e7464ea71b4d4f",
    measurementId: "G-LMSS1NHLFZ"
  };
  
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = getFirestore(app);

const exampleCollection = collection(db ,'users');

// Declare global variables
let formData = {};

const server = http.createServer((req, res) => {
    // Enable CORS for all routes
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        // Pre-flight request. Reply successfully:
        res.writeHead(200);
        res.end();
        return;
    }
   
    if (req.method === 'POST' && req.url === '/') {
        let body = '';

        // Collect data from the request
        req.on('data', (chunk) => {
            body += chunk;
        });

        // Process data when the request ends
        req.on('end', () => {
            // Parse the JSON data
            const data = JSON.parse(body);

            formData=data;

            const dataToAdd = {
                name: formData.name,
                password: formData.password,
                email: formData.email
              };

              // Add data to a collection
addDoc(exampleCollection, dataToAdd)
.then((docRef) => {
  console.log('Document written with ID:', docRef.id);
})
.catch((error) => {
  console.error('Error adding document:', error);
});

            // Log the data to the console
            console.log('Received data:', data);
         

           
            // Send a simple response
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Data received successfully!');
        });
    } else {
        // Serve the HTML file
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }
});

// Start the server on port 5500
server.listen(5500, () => {
    console.log('Server listening on port 5500');
});



