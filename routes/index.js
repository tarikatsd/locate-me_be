var express = require('express');
var router = express.Router();
const { checkBody } = require('../modules/checkBody');
const Place = require('../modeles/places');

router.post('/places', (req, res) => {
  const { nickname, name, latitude, longitude } = req.body;
  if (!checkBody(req.body, ['nickname', 'name', 'latitude', 'longitude'])) {
    res.json({ result: false, error: 'Missing or empty fields !' });
    return;
  }

  const newplace = new Place({
    nickname: nickname,
    name: name,
    latitude: latitude,
    longitude: longitude,
  });

  newplace.save().then((data) => {
    res.json({ result: true });
  });
});

router.get('/places/:nickname', (req, res) => {
  Place.find({ nickname: req.params.nickname }).then((data) => {
    if (data) {
      res.json({ result: true, places: data });
    }
  });
});

router.delete('/places', (req, res) => {
  const { nickname, name } = req.body;
  if (!checkBody(req.body, ['nickname', 'name'])) {
    res.json({ result: false, error: 'Missing or empty fields !' });
    return;
  }

  Place.deleteOne({ nickname: nickname, name: name }).then((data) => {
    if (data.deletedCount > 0) {
      res.json({ result: true });
    } else {
      res.json({ result: false, error: 'Place not found !' });
    }
  });
});

module.exports = router;