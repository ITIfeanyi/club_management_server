const validator = require("validator");
const nodemailer = require("nodemailer");
const { Clubs, users, Club_users } = require("../../../models");
const { handleError } = require("../util/handleError");
const { handleFieldsValidation } = require("../util/usersValidate");

module.exports = {
  createClubs: async (req, res) => {
    const { club_name, creator_id } = req.body;

    try {
      const user = await users.findOne({ where: { id: creator_id } });
      if (!user) {
        return handleError(res, "User does not exist", 404);
      }
      const newClub = await Clubs.create({ club_name, creator_id });

      return res.status(201).json({
        ok: true,
        club: newClub,
      });
    } catch (error) {
      const err = handleFieldsValidation(error);
      handleError(res, err, 400);
    }
  },
  getAllClubs: async (req, res) => {
    const allClub = await Clubs.findAll({
      include: ["admin", "member"],
      required: true,
    });

    res.status(200).json({
      ok: true,
      clubs: allClub,
    });
  },
  getSingleClub: async (req, res) => {
    const { id } = req.params;
    const club = await Clubs.findOne({
      where: { id },
      include: ["admin", "member"],
    });
    if (!club) {
      return handleError(res, "Club does not exist", 404);
    }

    res.status(200).json({
      ok: true,
      club,
    });
  },
  joinClub: async (req, res) => {
    try {
      const { club_id, user_id } = req.body;

      const clubExist = await Clubs.findOne({ where: { id: club_id } });
      if (!clubExist) {
        return handleError(res, "Club does not exist", 404);
      }

      const userExist = await users.findOne({ where: { id: user_id } });

      if (!userExist) {
        return handleError(res, "User does not exist", 404);
      }

      const userInClubAlready = await Club_users.findOne({
        where: {
          club_id,
          user_id,
        },
      });

      if (userInClubAlready) {
        return handleError(res, "User exists in club already", 400);
      }
      const clubJoiner = await Club_users.create({
        club_id,
        user_id,
      });
      res.status(200).json({
        ok: true,
        clubJoiner,
      });
    } catch (error) {
      const err = handleFieldsValidation(error);
      handleError(res, err, 400);
    }
  },
  inviteToClubs: async (req, res) => {
    const { email, club_id, creatorID } = req.body;
    const isEmail = validator.isEmail(email);
    const findUserWithEmail = await users.findOne({ where: { email } });

    if (!isEmail) {
      return handleError(res, "Invalid email", 400);
    } else if (!findUserWithEmail) {
      return handleError(res, "No user exist with this email", 404);
    }
    const isAdmin = await Clubs.findOne({
      where: {
        id: club_id,
        creator_id: creatorID,
      },
    });
    if (!isAdmin) {
      return handleError(res, "Create a club to make an invite", 404);
    }

    const { club_name, id } = isAdmin.dataValues;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        // eslint-disable-next-line no-undef
        user: `${process.env.GMAIL}`,
        // eslint-disable-next-line no-undef
        pass: `${process.env.APP_PASSWORD}`,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `${club_name}@test.com`, // sender address
      to: `${email}`,
      subject: "Join our club today ✔", // Subject line
      html: `<b>Hello</b>
              <p>This is from ${club_name}.</p>
              <p>Please join our club </p>
             <p> <b>Motto:  Na mumu dey chop yam!!!!!!</b> </p>
              <a href="https://clubmanagement02.herokuapp.com/api/v1/join-as-invite/${findUserWithEmail.dataValues.id}/${id}">Click to join ${club_name} </a>
      `,
    });
    res.status(200).json({
      ok: true,
      message: info,
    });
  },
  joinAsInvite: async (req, res) => {
    try {
      const { userId, clubId } = req.params;

      const clubExist = await Clubs.findOne({ where: { id: clubId } });
      if (!clubExist) {
        return handleError(res, "Club does not exist", 404);
      }

      const userExist = await users.findOne({ where: { id: userId } });

      if (!userExist) {
        return handleError(res, "User does not exist", 404);
      }

      const userInClubAlready = await Club_users.findOne({
        where: {
          club_id: clubId,
          user_id: userId,
        },
      });

      if (userInClubAlready) {
        return handleError(res, "User exists in club already", 400);
      }

      const clubJoiner = await Club_users.create({
        club_id: clubId,
        user_id: userId,
      });
      res.status(200).json({
        ok: true,
        clubJoiner,
      });
    } catch (error) {
      const err = handleFieldsValidation(error);
      handleError(res, err, 400);
    }
  },
  removeClubUser: async (req, res) => {
    try {
      const { clubId, adminId, clubberToDelete } = req.body;

      const isAdmin = await Clubs.findOne({
        where: {
          id: clubId,
          creator_id: adminId,
        },
      });
      if (!isAdmin) {
        return handleError(
          res,
          "You are not authorized to perform this operation",
          401
        );
      }

      const clubberDeleted = await Club_users.destroy({
        where: {
          club_id: clubId,
          user_id: clubberToDelete,
        },
      });
      if (!clubberDeleted) {
        return handleError(res, "User does not exist", 400);
      }
      res.status(200).json({
        ok: true,
        message: "deleted successfully",
      });
    } catch (error) {
      handleError(res, error);
    }
  },
};
