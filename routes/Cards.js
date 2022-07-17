const express = require('express')
const router = express.Router({ mergeParams: true });
const {create,getCards,getCardsforId,getBlockedCards} = require('../controllers/Cards')


router.route('/create').post(create)
router.route('/yours/:query/:userid/:skip').post(getCardsforId)
router.route('/get/:query/:skip').post(getCards)
router.route('/blocked/:query/:skip').post(getBlockedCards)
module.exports = router
