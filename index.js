var firebaseConfig = {
    apiKey: "AIzaSyB2teX6515yS_e2WhIswVlpix_bhMZiy-g",
    authDomain: "messaging-app-c59af.firebaseapp.com",
    databaseURL: "https://messaging-app-c59af-default-rtdb.firebaseio.com",
    projectId: "messaging-app-c59af",
    storageBucket: "messaging-app-c59af.appspot.com",
    messagingSenderId: "1090648058298",
    appId: "1:1090648058298:web:e249176db40514d0559583"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const username = prompt("What is your name?");

document.getElementById("message-form").addEventListener("submit", sendMessage);

function sendMessage(e) {
    e.preventDefault();

    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;

    // clear the input box
    messageInput.value = "";

    //auto scroll to bottom
    document
        .getElementById("messages")
        .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

    // create db collection and send in the data
    db.ref("messages/" + timestamp).set({
        username,
        message,
    });
}

const fetchChat = db.ref("messages");

fetchChat.on("child_added", function(snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
      username === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById("messages").innerHTML += message;
});