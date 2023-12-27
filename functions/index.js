/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {
  onCall,
  HttpsError,
  onRequest,
} = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions");
const { initializeApp } = require("firebase-admin/app");
const cors = require("cors")({ origin: true });
const admin = require("firebase-admin");
const app = initializeApp();
const db = admin.firestore();
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.addUser = onCall(async (req) => {
  try {
    console.log("auth: ", req);
    const uid = req.auth.uid;

    const docRef = await admin
      .firestore()
      .collection("users")
      .doc(uid)
      .set({ ...req.data });
    return { status: 200, message: "Write was a success!", data: docRef };
  } catch (error) {
    throw new HttpsError("invalid-argument", error.message);
  }
});

exports.updateUser = onCall(async (req) => {
  try {
    const uid = req.auth.uid;
    const retVal = await admin
      .firestore()
      .collection("users")
      .doc(uid)
      .update(req.data);
    return {
      status: 200,
      message: "Update was a success!",
      data: retVal,
    };
  } catch (error) {
    throw new HttpsError("invalid-argument", error.message);
  }
});

exports.getCollection = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = await admin.firestore().collection(req.body.data).get();
      // Convert query snapshot to an array of documents
      const documents = snapshot.docs.map((doc) => doc.data());
      console.log(documents);

      // Send the array of documents as the response
      res.status(200).send({ documents: documents });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });
});

exports.getDoc = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const docRef = await admin
        .firestore()
        .collection(req.body.data.col)
        .doc(req.body.data.id)
        .get();
      console.log(docRef.data());
      res.status(200).send({ document: docRef.data() });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });
});

// exports.getUser = onCall(async (req) => {
//   try {
//     const name = req.body.data
//     const retVal = await admin
//       .firestore()
//       .collection("users")
//       .doc(uid)
//       .update(req.data.updatedData);
//     console.log(retVal);
//     return { message: "Update was a success!", data: retVal };
//   } catch (error) {
//     throw new HttpsError("invalid-argument", error.message);
//   }
// });

// exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
//   // ...
// });
