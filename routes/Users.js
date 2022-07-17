const express = require('express')
const router = express.Router({ mergeParams: true });
const {createUser,getAllCards} = require('../controllers/Users')

router.route('/').get(getAllCards)
router.route('/createuser').post(createUser)
module.exports = router
