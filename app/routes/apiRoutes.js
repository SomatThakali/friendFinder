let friendsData = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", (req, res) => {
    res.json(friendsData);
  });

  app.post("/api/friends", function(req, res) {
    // friendsData.push(req.body);

    let userInput = req.body;

    console.log(friendsData[0].scores);
    console.log(userInput.scores);

    let matchName = "";
    let matchImage = "";
    let maxDiff = 40;

    for (let i = 0; i < friendsData.length; i++) {
      let minDiff = 0;
      for (let j = 0; j < userInput.scores.length; j++) {
        minDiff += Math.abs(friendsData[i].scores[j] - userInput.scores[j]);
      }

      if (minDiff < maxDiff) {
        maxDiff = minDiff;
        matchName = friendsData[i].name;
        matchImage = friendsData[i].photo;
      }
    }

    friendsData.push(userInput);

    res.json({ status: "OK", name: matchName, photo: matchImage });
  });

  app.post("/api/clear", function(req, res) {
    friendsData.length = 0;
    res.json({ ok: true });
  });
};
