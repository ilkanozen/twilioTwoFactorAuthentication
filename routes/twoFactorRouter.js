const express = require("express");
const router = express.Router();
const twilio = require("twilio");

const accountSid = "xxxxx";
const authToken = "xxxx";
const client = new twilio(accountSid, authToken);
const servideSid = "xxxx";

router.post("/send", (req, res, next) => {
  const { phoneNumber } = req.body;
  client.verify
    .services(servideSid)
    .verifications.create({
      to: "+" + phoneNumber,
      channel: "sms",
      locale: "tr",
    })
    .then((verification) => res.send({ id: "+" + phoneNumber }))
    .catch((e) => console.log(e));
});

router.post("/check", (req, res, next) => {
  const { requestId, code } = req.body;
  client.verify
    .services(servideSid)
    .verificationChecks.create({ to: requestId, code })
    .then((result) => {
      console.log(result);
      if (result.status === "approved") {
        res.send("başarılır");
      } else {
        res.send("başarısız");
      }
    })
    .catch((e) => console.log(e));
});

module.exports = router;
