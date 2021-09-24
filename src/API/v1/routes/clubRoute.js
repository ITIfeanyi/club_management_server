const express = require("express");
const router = express.Router();
const {
  createClubs,
  getAllClubs,
  getSingleClub,
  joinClub,
  removeClubUser,
  inviteToClubs,
  joinAsInvite,
} = require("../controller/clubController");

router.post("/create-club", createClubs);
router.get("/all-clubs", getAllClubs);
router.get("/get-single-club/:id", getSingleClub);
router.post("/join-club", joinClub);
router.post("/invite-user", inviteToClubs);
router.post("/join-as-invite/:userId/:clubId", joinAsInvite);
router.delete("/delete-club-user", removeClubUser);

module.exports = router;
