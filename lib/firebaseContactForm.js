// import { add, doc, setDoc, Timestamp } from "firebase/firestore/lite";
import { db } from "../firebase";
import {  setDoc, doc, Timestamp } from "firebase/firestore";


export const sendContactForm = async ({ name, email, subject, message }) => {
  try {
    
    const res = await setDoc(doc(db, 'contact', email), {
      name: name,
      email: email,
      subject: subject,
      message: message,
      sentAt: Timestamp.now().toDate(),
    });

    console.log('Added document with ID: res')
    return 0;

  } catch (err) {
    console.log(err)
    return -1;
  }
};
// export const sendContactForm = async ({ name, email, subject, message }) => {
//   try {
//     // const ref = collection(db, "contact");
//     const res = await db.collection('contact').add({

//       name: name,
//       email: email,
//       subject: subject,
//       message: message,
//       sentAt: Timestamp.now().toDate(),
//     });
//     console.log('Added document with ID: ', res.id)
//     return 0;
//   } catch (err) {
//     console.log(err)
//     return -1;
//   }
// };