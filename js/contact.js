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

const contactsCollection = collection(storage, "contacts-collection");

const contactSubmitBtn = document.getElementById("contact-submit-btn");
const form = document.querySelector(".contact-form");
contactSubmitBtn.addEventListener("click", async function (event) {
  event.preventDefault();

  const name = document.getElementById("contact-name").value;
  const email = document.getElementById("contact-email").value;
  const subject = document.getElementById("contact-subject").value;
  const message = document.getElementById("contact-textarea").value;

  const formData = {
    name,
    email,
    subject,
    message,
  };

  try {
    await setDoc(doc(contactsCollection), formData);

    alert(
      "Your message sent successfully. We will call back to you soon. Thank you!"
    );

    form.reset();
  } catch (error) {
    alert("There was an error while sending data. Please try again.");
  }
});
