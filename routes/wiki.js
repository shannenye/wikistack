const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next) {
    res.redirect('/');
  });

router.post('/', function(req, res, next) {
    var page = Page.build({
        title: req.body.title,
        content: req.body.content
    });
    page.save()
    .then( (page) => {res.json(page);})
});

router.get('/add', function(req, res, next) {
    res.render('addpage.html');
});

// router.get('/:urlTitle', function(req, res, next) {
//     var uri = req.params.urlTitle;
//     res.json(Page.findAll({
//         where: {
//             urlTitle: uri,
//         }
//     }))
// })

router.get('/:urlTitle', function (req, res, next) {

      Page.findOne({
        where: {
          urlTitle: req.params.urlTitle
        }
      })
      .then(function(foundPage){
        res.render('wikipage', foundPage);
      })
      .catch(next);

    });



module.exports = router;