const mongoose = require('mongoose');

const voyageSchema = new mongoose.Schema(
    {
        courriel: {
            type: String,
            required: true
        },
        pays: {
            type: String,
            required: true
        },
        ville: {
            type: String,
            required: true
        },
        dateDepart: {
            type: Date,
            required: true
        },
        dateRetour: {
            type: Date,
            required: true
        },
        modeTransport: {
            type: String,
            required: true
        },
        compagnieTransport: {
            type: String,
            required: false
        },
        prixTransport: {
            type: Number,
            required: false
        },
        accomodation: {
            type: String,
            required: true
        },
        adresseAccomodation: {
            type: String,
            required: true
        },
        prixAccomodation: {
            type: Number,
            required: false
        },
        loisirs: {
            type: String,
            required: false
        }
    }
);

module.exports = mongoose.model('Voyage', voyageSchema);