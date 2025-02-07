// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  collection,
  doc,
  getFirestore,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDrrBuVj_o_ds3KLRnF9w2QutwaQORkPCQ",
  authDomain: "hiran-project-acf5f.firebaseapp.com",
  projectId: "hiran-project-acf5f",
  storageBucket: "hiran-project-acf5f.firebasestorage.app",
  messagingSenderId: "204945321402",
  appId: "1:204945321402:web:33c348718f967a7d464183"
};

const app = initializeApp(firebaseConfig);
const storage = getFirestore(app);

const reserveTableCollection = collection(storage, "reserve-table-collection");
const submitBtn = document.getElementById("send-message-btn");
const form = document.querySelector(".email-form");
submitBtn.addEventListener("click", async function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const people = document.getElementById("people").value;
  const message = document.querySelector('textarea[name="message"]').value;

  const nameValidate = document.getElementById("name-validate");
  const emailValidate = document.getElementById("email-validate");
  const phoneValidate = document.getElementById("phone-validate");
  const dateValidate = document.getElementById("date-validate");
  const timeValidate = document.getElementById("time-validate");
  const peopleValidate = document.getElementById("people-validate");
  const messageValidate = document.getElementById("message-validate");

  let isValid = true;
  if (name.length < 4) {
    nameValidate.textContent = "Please enter at least 4 characters.";
    isValid = false;
  }
  if (!validateEmail(email)) {
    emailValidate.textContent = "Please enter a valid email address.";
    isValid = false;
  }
  if (phone.length < 4) {
    phoneValidate.textContent = "Please enter at least 4 characters.";
    isValid = false;
  }
  if (date.length < 4) {
    dateValidate.textContent = "Please enter a valid date.";
    isValid = false;
  }
  if (time.length < 4) {
    timeValidate.textContent = "Please enter a valid time.";
    isValid = false;
  }
  if (people.length < 1 || isNaN(people)) {
    peopleValidate.textContent = "Please enter a valid number of people.";
    isValid = false;
  }
  if (message.length === 0) {
    messageValidate.textContent = "Please enter a message.";
    isValid = false;
  }
  if (!isValid) {
    setTimeout(() => {
      nameValidate.textContent = "";
      emailValidate.textContent = "";
      phoneValidate.textContent = "";
      dateValidate.textContent = "";
      timeValidate.textContent = "";
      peopleValidate.textContent = "";
      messageValidate.textContent = "";
    }, 2000);
    return;
  }

  const formData = {
    name,
    email,
    phone,
    date,
    time,
    people: parseInt(people, 10),
    message,
    timestamp: new Date(),
  };

  try {
    await setDoc(doc(reserveTableCollection), formData);
    alert(
      "Your table reservation request was sent. We will call back or send an Email to confirm your reservation. Thank you!"
    );

    form.reset();
  } catch (error) {
    alert("There was an error reserving table. Please try again.");
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
