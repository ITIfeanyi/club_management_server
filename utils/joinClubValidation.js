const debug = require("debug");
const dbQuery = require("../../../config/dbQuery");
async function validateJoinClub(club_id, user_id) {
  try {
    const errorMsg = { path: "", message: "" };

    if (typeof club_id !== "number") {
      errorMsg.message = "Invalid club id";
      errorMsg.path = "club";
      return errorMsg;
    } else if (typeof user_id !== "number") {
      errorMsg.message = "Invalid user id";
      errorMsg.path = "user";
      return errorMsg;
    }

    const text = "SELECT * FROM users WHERE user_id = $1";
    const value = [user_id];
    const { rows } = await dbQuery.query(text, value);
    if (!rows.length) {
      errorMsg.message = "User does not exist";
      errorMsg.path = "users";
      return errorMsg;
    }
    const textClub = "SELECT * FROM clubs WHERE club_id = $1";
    const valueClub = [club_id];
    const club = await dbQuery.query(textClub, valueClub);

    if (!club.rows.length) {
      errorMsg.message = "Club does not exist";
      errorMsg.path = "club";
      return errorMsg;
    }
    return errorMsg;
  } catch (error) {
    debug(error);
  }
}

module.exports = {
  validateJoinClub,
};
