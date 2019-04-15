let friendsData = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", (req, res) => {
    res.json(friendsData);
  });

  app.post("/api/friends", function(req, res) {
    // friendsData.push(req.body);

    let userInput = req.body;

    let matchName = "";
    let matchImage = "";
    let maxDiff = 40;

    friendsData.forEach((friends, i) => {
      let minDiff = 0;
      friends.scores.forEach((score, j) => {
        minDiff += Math.abs(score - userInput.scores[j]);
      });
      if (minDiff < maxDiff) {
        maxDiff = minDiff;
        matchName = friendsData[i].name;
        matchImage = friendsData[i].photo;
      }
    });

    friendsData.push(userInput);

    res.json({ status: "OK", name: matchName, photo: matchImage });
  });

  app.post("/api/clear", function(req, res) {
    friendsData.length = 0;
    res.json({ ok: true });
  });
};
