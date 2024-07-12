const URL = require('../models/url');
const generateShortId = require('../utils/short');
const logger = require('../config/logger');

// Controller to handle URL shortening
exports.shortenUrl = async (req, res) => {
    const { originalUrl, customName } = req.body;
    const userId = req.userId; 
    try {
        if (customName) {
            const existingCustomName = await URL.findOne({ customName });
            if (existingCustomName) {
                return res.status(400).json({ error: 'Custom name already in use' });
            }
        }

        const shortUrl = generateShortId(); 
        const newUrl = new URL({ originalUrl, shortUrl, customName, userId:  userId });
        await newUrl.save();
        logger.debug(`Created new url for address ${originalUrl}`)
        res.status(201).json({ shortUrl });
    } catch (error) {
        logger.error(`Error for creating: originalUrl:${originalUrl},
        shortUrl:${shortUrl},
        customName:${customName},
        userId:${userId},
         error: ${error}`); // Log error for debugging
        res.status(500).json({ error: 'Server error' });
    }
};

// Controller to handle URL redirection
exports.redirectUrl = async (req, res) => {
    const { shortUrl } = req.params;
    try {
        const url = await URL.findOne({ $or: [{ shortUrl }, { customName: shortUrl }] });
        if (url) {
            url.hitCount += 1; // Increment hit count
            await url.save();
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).json({ error: 'URL not found' });
        }
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({ error: 'Server error' });
    }
};

// Controller to handle updating the custom name of a URL
exports.updateCustomName = async (req, res) => {
    const { id } = req.params;
    const { newCustomName } = req.body;
    try {
        // Check if new custom name already exists
        const existingCustomName = await URL.findOne({ customName: newCustomName });
        if (existingCustomName) {
            return res.status(400).json({ error: 'Custom name already in use' });
        }

        // Find the URL by ID and update the custom name
        const url = await URL.findByIdAndUpdate(id, { customName: newCustomName }, { new: true });
        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }

        res.status(200).json({ message: 'Custom name updated', url });
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({ error: 'Server error' });
    }
};

// Controller to handle retrieving all URLs information
exports.getAllUrls = async (req, res) => {
    try {
        const userId = req.userId;
        const urls = await URL.find({ userId });
        res.status(200).json(urls);
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({ error: 'Server error' });
    }
};
