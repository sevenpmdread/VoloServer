const express = require('express')
const router = express.Router({ mergeParams: true });
const {create,getCards,getCardsforId} = require('../controllers/Cards')


router.route('/create').post(create)
router.route('/yours').post(getCardsforId)
router.route('/get/:skip').get(getCards)
module.exports = router
