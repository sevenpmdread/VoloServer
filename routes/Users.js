const express = require('express')
const router = express.Router({ mergeParams: true });
const {createUser} = require('../controllers/Users')


router.route('/createuser').post(createUser)
module.exports = router
