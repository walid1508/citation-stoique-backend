const Quote = require('../models/Quote');

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

module.exports = {
    getRandomQuote,
};
