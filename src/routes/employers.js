var express = require('express');
var router = express.Router();
const Employer = require('../model/Employer');

//Get All Employers
router.get('/employers', (req, res, next) => {
  Employer.findAll()
    .then(employers => {
      res.json(employers);
    })
    .catch(err => {
      res.send(`error: + ${err}`);
    });
});

//Get By Id
router.get('/employer/:empId', (req, res, next) => {
  Employer.findOne(
      {
        where:
          { empId: req.params.empId }
      }
    )
    .then(employer => {
      res.json(employer);
    })
    .catch(err => {
      res.send(`error: + ${err}`);
    });
});

//Add Employer
router.post('/employer', (req, res, next) => {
  if (!req.body.empName || !req.body.empDepartment) {
    res.status(400);
    res.json({
      error: 'Bad Data'
    });
  } else {
    if (!req.body.empActive) req.body.empActive = 0;
    Employer.create(req.body)
      .then(() => {
        res.send('Employer Added');
      })
      .catch(err => {
        res.send(`Error: ${err}`);
      });
  }
});

//Delete Employer
router.delete('/employer/:empId', (req, res, next) => {
  Employer.destroy({
    where: {
      empId: req.params.empId
    }
  })
    .then(() => {
      res.send('Employer Deleted!');
    })
    .catch(err => {
      res.send(`error: ${err}`);
    });
});

//Update Employer
router.put('/employer/:empId', (req, res, next) => {
  if (!req.body.empName || !req.body.empDepartment) {
    res.status(400);
    res.json({
      error: 'Bad Data'
    });
  } else {
    Employer.update(
      {
        empName: req.body.empName,
        empActive: req.body.empActive,
        empDepartment: req.body.empDepartment,
        updatedAt: new Date()
      },
      { where: { empId: req.params.empId } }
    )
      .then(() => {
        res.send('Employer Updated!');
      })
      .error(err => res.send(err));
  }
});

module.exports = router;
