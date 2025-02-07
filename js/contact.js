// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  collection,
  doc,
  getFirestore,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDhF7nVMK_x-Uj2zs0xkqSeXP_vcuMFouI",
  authDomain: "hiran-assigment.firebaseapp.com",
  projectId: "hiran-assigment",
  storageBucket: "hiran-assigment.firebasestorage.app",
  messagingSenderId: "8251239635",
  appId: "1:8251239635:web:510745fdfb0f0d4862f826",
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
