const socket = io.connect("http://localhost:8000");

let pictures = ["male1", "female1", "male3", "female2", "male2", "female3"];

const userName = prompt("Enter your username:");
const authorPic = pictures[Math.floor(Math.random() * pictures.length)];

const userDetails = {
  userName,
  authorPic,
};

socket.emit("newUser", userDetails);

socket.on("userTopNameDisplay", (userName) => {
  const welcomeUserDiv = document.querySelector("#user-name");
  welcomeUserDiv.innerText = `Welcome ${userName}`;
});

socket.on("newUserJoins", (userName) => {
  const spanCreate = document.createElement("span");
  const newuserJoinsDiv = document.createElement("div");
  newuserJoinsDiv.id = "newUserJoins";
  const chatDisplayNewUserDiv = document.querySelector(".chat-display");

  spanCreate.innerText = `${userName} joined the chat`;
  spanCreate.classList.add("span-new-user-joins");
  newuserJoinsDiv.appendChild(spanCreate);
  chatDisplayNewUserDiv.appendChild(newuserJoinsDiv);

  const connectedUserName = document.querySelector("#connected-user-name");
  const connectedUserNameDiv = document.createElement("div");
  connectedUserNameDiv.innerText = userName;
  connectedUserName.appendChild(connectedUserNameDiv);

  var elem = document.querySelector(".chat-display");
  elem.scrollTop = elem.scrollHeight;
});

document.getElementById("new-message-btn").addEventListener("click", () => {
  const messageInput = document.getElementById("chat-input");
  const message = messageInput.value;
  if (message.trim()) {
    socket.emit("sendMessage", message);
    messageInput.value = "";

    const sendByUserDiv = document.createElement("div");
    sendByUserDiv.setAttribute("id", "send-by-user");

    const userIconDiv = document.createElement("div");
    userIconDiv.setAttribute("class", "user-icon");

    const imageTag = document.createElement("img");
    imageTag.src = `../../public/images/${authorPic}.png`;

    userIconDiv.appendChild(imageTag);
    sendByUserDiv.appendChild(userIconDiv);

    const messageContainerDiv = document.createElement("div");
    messageContainerDiv.classList.add(
      "message-container",
      "user-message-container"
    );

    const messageContentDiv = document.createElement("div");
    messageContentDiv.classList.add("message-content");
    messageContentDiv.innerText = message;

    const timeStampDiv = document.createElement("div");
    timeStampDiv.classList.add("time-stamp");
    const timeString = new Date().toLocaleTimeString();
    const [time, period] = timeString.split(" ");
    const [hour, minute] = time.split(":");

    timeStampDiv.innerText = `${hour}:${minute} ${period}`;

    messageContainerDiv.appendChild(messageContentDiv);
    messageContainerDiv.appendChild(timeStampDiv);

    sendByUserDiv.appendChild(messageContainerDiv);

    const chatDisplayDiv = document.querySelector(".chat-display");
    chatDisplayDiv.appendChild(sendByUserDiv);

    var elem = document.querySelector(".chat-display");
    elem.scrollTop = elem.scrollHeight;
  }
});
//

socket.on("chatMessage", (messageContent) => {
  const sendByUserDiv = document.createElement("div");
  sendByUserDiv.setAttribute("id", "send-by-other");

  const userIconDiv = document.createElement("div");
  userIconDiv.setAttribute("class", "user-icon");

  const imageTag = document.createElement("img");
  imageTag.src = `../../public/images/${messageContent.authorPic}.png`;

  userIconDiv.appendChild(imageTag);
  sendByUserDiv.appendChild(userIconDiv);

  const messageContainerDiv = document.createElement("div");
  messageContainerDiv.classList.add("message-container");

  const authorNametDiv = document.createElement("div");
  authorNametDiv.classList.add("author-name");
  authorNametDiv.innerText = messageContent.userName;

  const messageContentDiv = document.createElement("div");
  messageContentDiv.classList.add("message-content");
  messageContentDiv.innerText = messageContent.message;

  const timeStampDiv = document.createElement("div");
  timeStampDiv.classList.add("time-stamp");

  const timeString = new Date().toLocaleTimeString();
  const [time, period] = timeString.split(" ");
  const [hour, minute] = time.split(":");

  timeStampDiv.innerText = `${hour}:${minute} ${period}`;

  messageContainerDiv.appendChild(authorNametDiv);
  messageContainerDiv.appendChild(messageContentDiv);
  messageContainerDiv.appendChild(timeStampDiv);

  sendByUserDiv.appendChild(messageContainerDiv);

  const chatDisplayDiv = document.querySelector(".chat-display");
  chatDisplayDiv.appendChild(sendByUserDiv);

  var elem = document.querySelector(".chat-display");
  elem.scrollTop = elem.scrollHeight;
});

socket.on("load_messages", (messages) => {
  messages.forEach((message) => {
    const sendByUserDiv = document.createElement("div");
    sendByUserDiv.setAttribute("id", "send-by-other");

    const userIconDiv = document.createElement("div");
    userIconDiv.setAttribute("class", "user-icon");

    const imageTag = document.createElement("img");
    imageTag.src = `../../public/images/${message.authorPic}.png`;

    userIconDiv.appendChild(imageTag);
    sendByUserDiv.appendChild(userIconDiv);

    const messageContainerDiv = document.createElement("div");
    messageContainerDiv.classList.add("message-container");

    const authorNametDiv = document.createElement("div");
    authorNametDiv.classList.add("author-name");
    authorNametDiv.innerText = message.userName;

    const messageContentDiv = document.createElement("div");
    messageContentDiv.classList.add("message-content");
    messageContentDiv.innerText = message.message;

    const timeStampDiv = document.createElement("div");
    timeStampDiv.classList.add("time-stamp");
    timeStampDiv.innerText = message.hourSecTime;

    messageContainerDiv.appendChild(authorNametDiv);
    messageContainerDiv.appendChild(messageContentDiv);
    messageContainerDiv.appendChild(timeStampDiv);

    sendByUserDiv.appendChild(messageContainerDiv);

    const chatDisplayDiv = document.querySelector(".chat-display");
    chatDisplayDiv.appendChild(sendByUserDiv);

    var elem = document.querySelector(".chat-display");
    elem.scrollTop = elem.scrollHeight;
  });
});

//
// Preventing auto refresh
document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();
});
