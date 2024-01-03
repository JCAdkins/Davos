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
const { last } = require("lodash");
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
      res.status(200).send({ document: docRef.data() });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });
});

// col, sortBy, lim, dir
exports.getCollectionPage = onRequest((req, res) => {
  cors(req, res, async () => {
    const {col, sortBy, lim, dir } = req.body.data;
    let lastVisible = null;
    const pages = [];
    try {
      while (true){
       
      const query = lastVisible ?  admin.firestore().collection(col).orderBy(sortBy, dir).limit(lim).startAfter(lastVisible) : admin.firestore().collection(col).orderBy(sortBy, dir).limit(lim);
      // Convert query snapshot to an array of documents
      const querySnapshot = await query.get();

      if (querySnapshot.empty) break;

      // Loop through the documents in the snapshot and add them to the array
      const pageData = []
      querySnapshot.forEach((doc) => {
        pageData.push(doc.data())
      });
      pages.push(pageData);

      if (pageData.length < lim) break;

      // Get the last visible document
      lastVisible = col === "podcasts" ? pageData[pageData.length - 1].podcast.date : pageData[pageData.length - 1].date
      
      
      }
      // Send the array of documents as the response
      res.status(200).send({ data: pages });
      
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });
})

// exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
//   // ...
// });
