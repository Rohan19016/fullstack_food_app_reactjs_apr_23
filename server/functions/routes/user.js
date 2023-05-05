const router = require("express").Router();
const admin = require("firebase-admin");
let data = [];

router.get("/", (req, res) => {
  return res.send("Inside the user router");
});
router.get("/jwtVerification", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ msg: "token not found" });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedValue = await admin.auth().verifyIdToken(token);
    if (!decodedValue) {
      return res
        .status(500)
        .json({ success: false, msg: "Unauthorized access" });
    }
    return res.status(200).json({ success: true, data: decodedValue });
  } catch (err) {
    return res.send({
      success: false,
      msg: `Error in extracting the token : ${err}`,
    });
  }
});

router.get("/all", async (req, res) => {
  data = []; // Reset data array before fetching users

  const listAllUsers = (nextpagetoken) => {
    admin
      .auth()
      .listUsers(1000, nextpagetoken)
      .then((listuserresult) => {
        listuserresult.users.forEach((rec) => {
          data.push(rec.toJSON());
        });
        if (listuserresult.pageToken) {
          // List next batch of users.
          listAllUsers(listuserresult.pageToken);
        } else {
          // All users have been fetched, send response
          return res
            .status(200)
            .send({ success: true, data: data, dataCount: data.length });
        }
      })
      .catch((error) => {
        console.log("Error listing users:", error);
        return res.send({
          success: false,
          msg: `Error in listing the users : ${error}`,
        });
      });
  };

  // Start listing users from the beginning, 1000 at a time.
  listAllUsers();
});
module.exports = router;
