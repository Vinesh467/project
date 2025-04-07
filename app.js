
// TODO: Replace with your own Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const feedbackRef = db.collection("feedback");

document.getElementById("feedbackForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();
  if(name && message) {
    feedbackRef.add({ name, message, timestamp: new Date() }).then(() => {
      document.getElementById("name").value = "";
      document.getElementById("message").value = "";
    });
  }
});

feedbackRef.orderBy("timestamp", "desc").onSnapshot(snapshot => {
  const container = document.getElementById("commentsContainer");
  container.innerHTML = "";
  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement("div");
    div.innerHTML = `<p><strong>${data.name}</strong>: ${data.message}</p>`;
    container.appendChild(div);
  });
});
