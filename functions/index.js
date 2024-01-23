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
const admin = require("firebase-admin");
const app = initializeApp();
const cors = require("cors")({ origin: true, credentials: true });

const db = admin.firestore();

//const { last } = require("lodash");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.addUser = onCall(async (req) => {
  try {
    const uid = req.auth.uid;

    const docRef = await db
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
    const retVal = await db.collection("users").doc(uid).update(req.data);
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
      const snapshot = await db.collection(req.body.data).get();
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
      const docRef = await db
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
    const { col, sortBy, lim, dir } = req.body.data;
    let lastVisible = null;
    const pages = [];
    try {
      while (true) {
        const query = lastVisible
          ? db
              .collection(col)
              .orderBy(sortBy, dir)
              .limit(lim)
              .startAfter(lastVisible)
          : db.collection(col).orderBy(sortBy, dir).limit(lim);
        // Convert query snapshot to an array of documents
        const querySnapshot = await query.get();

        if (querySnapshot.empty) break;

        // Loop through the documents in the snapshot and add them to the array
        const pageData = [];
        querySnapshot.forEach((doc) => {
          pageData.push(doc.data());
        });
        pages.push(pageData);

        if (pageData.length < lim) break;

        // Get the last visible document
        lastVisible =
          col === "podcasts"
            ? pageData[pageData.length - 1].podcast.date
            : pageData[pageData.length - 1].date;
      }
      // Send the array of documents as the response
      res.status(200).send({ data: pages });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });
});

exports.getUserByEmail = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      await admin
        .auth()
        .getUserByEmail(req.body.data.username)
        .then((userRecord) => {
          res.status(200).send({ document: userRecord.toJSON() });
        });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });
});

exports.generateSessionCookie = onRequest((req, res) => {
  cors(req, res, async () => {
    // Extract the Authorization header from the request
    const authorizationHeader = req.headers["authorization"];

    // Check if the Authorization header is present
    if (!authorizationHeader) {
      return res
        .status(401)
        .json({ error: "Unauthorized - Missing Authorization header" });
    }

    // Extract the token from the Authorization header
    const idToken = authorizationHeader.replace("Bearer ", "");
    const expiresIn = 86400 * 1000 * 5; // 5 days
    try {
      // If idToken isn't valid an error will be thrown
      const decodedToken = await admin.auth().verifyIdToken(idToken);

      // Create session cookie
      const sessionCookie = await admin
        .auth()
        .createSessionCookie(idToken, { expiresIn });

      // Set the session cookie with domain-wide access
      res.cookie("__session", sessionCookie, {
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
        domain: ".adadkins.com",
        sameSite: "Strict",
      });
      res.end(JSON.stringify({ status: "success: session cookie set" }));
    } catch (error) {
      console.error("Error in authFunction:", error);
      res.status(500).json({ error: error });
    }
  });
});

// Check the session status and return a custom token for cross-domain authentication
exports.authStatus = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const sessionCookie = req.headers.cookie;
      logger.log(">>>>sessionCookie: ", sessionCookie);
      const cookie = sessionCookie.replace("__session=", "");
      logger.log("<<<<<<<cookie: ", cookie);
      // Check if the session cookie exists
      if (!cookie) {
        res.status(401).send("Unauthorized");
        return;
      }

      // Validate the session cookie
      const cookieClaims = await admin.auth().verifySessionCookie(cookie);
      logger.log(">>>>>>cookieClaims: ", cookieClaims);
      // If validation is successful, create a custom token (replace <uid> with the actual UID)
      const customToken = await admin
        .auth()
        .createCustomToken(cookieClaims.uid);

      // Return the custom token to the client
      res.status(200).json({ customToken });
    } catch (error) {
      if (error.code === "auth/invalid-session-cookie") {
        console.error("Invalid sessionCookie. Error:", error.message);
      } else {
        console.error("Error verifying sessionCookie:", error.message);
      }
      console.error("Error in authStatus:", error);
      res.status(401).json("Error: Request Unauthorized");
    }
  });
});

// Logout endpoint to clear the session cookie
exports.authLogout = onRequest((req, res) => {
  cors(req, res, () => {
    res.clearCookie("__session", {
      domain: ".adadkins.com", // Adjust to your domain
      secure: true,
      httpOnly: true,
      sameSite: "Strict",
    });
    res.status(200).json("Logged out successfully");
  });
});

// exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
//   // ...
// });
