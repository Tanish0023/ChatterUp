﻿# ChatterUp

The contemporary digital landscape is characterized by an increasing emphasis on privacy and anonymity. Traditional chat applications often compromise user data, hindering open and unrestricted communication. This project addresses this challenge by developing an anonymous chat platform that prioritizes user privacy without sacrificing the core functionalities of real-time messaging. By eliminating the need for personal information, the application fosters a safe environment for users to engage in open dialogue without fear of repercussions.

# System Architecture

## Overview
The anonymous chat application is structured as a client-server architecture. The client-side
handles user interactions, while the server manages connections, message routing, and data
storage.

### Components
- Client: The client-side application is built using HTML, CSS, and JavaScript. It
  provides a user interface for sending and receiving messages.
- Server: The server is implemented using Node.js and Express.js. It handles incoming
  connections, message routing, and database interactions.
- Database: MongoDB is used to store chat messages, user metadata (if applicable),
  and other relevant data.
  
### Interaction
1. User Interface: Users interact with the chat application through a web browser.
2. Message Sending: When a user sends a message, the client sends it to the server.
3. Message Routing: The server broadcasts the message to all connected clients.
4. Message Display: Clients receive the message and display it to the user.
5. Data Storage: The server optionally stores chat messages in the MongoDB database
for later retrieval or analysis.

![image](https://github.com/user-attachments/assets/412da0f3-8a1a-4f33-bf3e-1037646901fb)


## System Design

![image](https://github.com/user-attachments/assets/1194411c-4873-4477-8e42-88341f2d3f1c)


### User Interface (UI)
- Simplicity: A clean and intuitive interface focusing on essential elements: message
  input, send button, and chat history.
- Anonymity: No user registration or profile creation. Users are represented by random
  or assigned identifiers.
- Real-time updates: Messages appear instantly without page refreshes.

### Message Handling
- Asynchronous communication: Using WebSocket for real-time message delivery.
- Message format: Define a standardized JSON structure for messages, including
  sender ID (randomly generated), timestamp, and message content.
- Message broadcasting: Upon receiving a message, the server broadcasts it to all
  connected clients.
- Message persistence: Optionally store messages in the database for later retrieval or
  analysis, considering privacy implications.

### Database Schema
- Messages collection: Store message content, sender ID, timestamp, and potentially
  other metadata.
- Indexes: Create appropriate indexes for efficient querying (e.g., timestamp index for
  message retrieval).

### Implementation Details
- Client-side: Use JavaScript and WebSocket libraries to handle user interactions,
  message sending, and receiving.
- Server-side: Implement WebSocket server using Node.js and Socket.IO. Handle
  message routing, broadcasting, and database interactions.
- Database: Utilize MongoDB's Node.js driver for efficient database operations.


## Project Screenshots

### Landing Page
![1706261812688](https://github.com/user-attachments/assets/9a2e2bee-9bad-4433-937b-106a54020b26)

### Home Page
![1711007798262](https://github.com/user-attachments/assets/4779e6ae-deb7-4da6-bf11-e1df11363f25)

### When A new user Joins
![1711007798262](https://github.com/user-attachments/assets/1425f586-79fd-4741-82e9-9239e4b9c1f7)

### Multiple User Chatting
![1711007905897](https://github.com/user-attachments/assets/4631429a-3e77-42ee-9071-fa0f1bdaff49)

![1711007940577](https://github.com/user-attachments/assets/76e7386b-515a-4e6b-a657-00878d5becb2)

