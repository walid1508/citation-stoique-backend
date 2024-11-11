const Quote = require('../models/quote');

// @desc Get random quote
// @route GET /api/quote
// @access Public
const getRandomQuote = async (req, res) => {
    try {
        const quotesCount = await Quote.countDocuments(); 
        const randomIndex = Math.floor(Math.random() * quotesCount); 
        const randomQuote = await Quote.findOne().skip(randomIndex).select('-_id -__v');

        if (!randomQuote) {
            return res.status(404).json({ message: 'Aucune citation trouvée' });
        }

        return res.status(200).json(randomQuote);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur du serveur' });
    }
}

// @desc Get a list of random quotes
// @route GET /api/quotes?num=
// @access Public
const getRandomQuoteList = async (req, res) => {
    try {
        const num = parseInt(req.query.num) || 10; 
        const limit = Math.min(num, 100);

        const randomQuotes = await Quote.aggregate([
            { $sample: { size: limit } }, 
            { $project: { _id: 0, __v: 0 } } 
        ]);

        if (!randomQuotes || randomQuotes.length === 0) {
            return res.status(404).json({ message: 'Aucune citation trouvée' });
        }

        return res.status(200).json(randomQuotes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur du serveur' });
    }
}



module.exports = {
    getRandomQuote,
    getRandomQuoteList,
};

