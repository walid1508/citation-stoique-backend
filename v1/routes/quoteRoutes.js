const express = require('express')
const router = express.Router()
const quoteController = require('../controllers/quoteController')


router.get('/quote', quoteController.getRandomQuote)
router.get('/quotes', quoteController.getRandomQuoteList)

module.exports = router;