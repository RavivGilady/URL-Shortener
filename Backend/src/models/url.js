const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    customName: { type: String, unique: true, sparse: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hitCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }


});

module.exports = mongoose.model('URL', urlSchema);
