var config = {
  apiKey: "AIzaSyD2GlScZ7mUiQg76WkNl2xUtZhF20AYb4A",
  authDomain: "blog0502-6a047.firebaseapp.com",
  projectId: "blog0502-6a047",
  storageBucket: "blog0502-6a047.appspot.com",
  messagingSenderId: "133967695248",
  appId: "1:133967695248:web:1db865c658f76b7619f715",
  measurementId: "G-J0T9NJV43Z"
};
firebase.initializeApp(config);
//firebase.firestore().settings( { timestampsInSnapshots: true });
var db = firebase.firestore();
//var database = firebase.database();


//index


let save = document.getElementById('save');
let postarea = document.getElementById("postarea");
let profile = document.getElementById("profile");



function add() {

  console.log("store");

  let title = document.getElementById("title").value;
  let content = document.getElementById("content").value;
  let uuid = Math.random();
  let datetmp = new Date().toISOString();
  //let dateobj = datetmp.slice(0,10);
  let user = firebase.auth().currentUser;
  if (title === "" || content === "") {
    alert("Title or content hasn't completed");
  }
  else if (user === null){
    alert("Log in frist");
  }
  else {
    db.collection("posts").doc(`${uuid}`).set({
      title: title,
      date: datetmp,
      content: content,
      author: user.displayName
    });

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    title = "";
    content = "";
  }

}

save.addEventListener('click', add);



db.collection("posts").orderBy("date", "desc").onSnapshot(querySnapshot => {
  postarea.innerHTML = "";
  querySnapshot.forEach(doc => {
    if (doc.data().title !== "" || doc.data().title !== null) {
      postarea.innerHTML +=
        `
      <div class="post" id="${doc.id}123">  
          <p class="titlefont">${doc.data().title}</p>
          <p>${doc.data().content}</p>
          <em>${doc.data().date.slice(0, 10)}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${doc.data().author}</em>
          <br>
          
        </div>
      `
      //<p class="x" id="${doc.id}"> X  </p>
      //console.log(doc.id);
    }
  });
});


firebase.auth().onAuthStateChanged((user) => {
  profile.innerHTML = "";
  if (user) {
    console.log(user);
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    profile.innerHTML += `
      <p>Hi~ ${user.displayName}</p>
      <button id="updatebtn">Update profile</button>
      <button id="logoutbtn">log out</button>
    `;
    let logoutbtn = document.getElementById("logoutbtn");
    logoutbtn.addEventListener("click", logout);
    let updatebtn = document.getElementById("updatebtn");
    updatebtn.addEventListener("click", function () { document.location.href = "22-5-3 firebase-auth-updateaccount.html"; });

    // ...
  } else {
    // User is signed out
    // ...
    profile.innerHTML += `
    <p>User email</p>
    <input id="logemail"></input>
    <p>User passward</p>
    <input id="logpassward">
    <button id="loginbtn">log in</button>
    <a href="22-5-3 firebase-auth-createaccount.html">註冊帳號!</a>
    `

    let loginbtn = document.getElementById("loginbtn");
    loginbtn.addEventListener("click", prelogin);
    let logemail = document.getElementById("logemail");
    let logpassward = document.getElementById("logpassward");
    logemail.addEventListener('keypress', function (event) {
      if (event.key === "Enter") {
        //enter的鍵值為13
        event.preventDefault();
        console.log("pressm");
        loginbtn.click();//觸動按鈕的點擊
      }
    })
    logpassward.addEventListener('keypress', function (event) {
      if (event.key === "Enter") {
        //enter的鍵值為13
        event.preventDefault();
        console.log("pressp");
        loginbtn.click();//觸動按鈕的點擊
      }
    })
  }
});


function prelogin() {
  let logemail = document.getElementById("logemail").value;
  let logpassward = document.getElementById("logpassward").value;
  login(logemail, logpassward);
}

function login(email, passward) {
  if (firebase.auth().currentUser !== null) logout;
  firebase.auth().signInWithEmailAndPassword(email, passward)
    .then((userCredential) => {
      // Signed in
      console.log("log in sus");
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);
      alert(errorCode);
    });
}

//window.addEventListener("load", logout);

function logout() {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    console.log("log out sus");
  }).catch((error) => {
    // An error happened.
    console.log(error);
  });
}

/*window.addEventListener("load" , function(){
  document.location.href="https://www.youtube.com/"
})*/