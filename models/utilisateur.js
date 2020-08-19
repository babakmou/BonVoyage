const mongoose = require('mongoose');

const utilisateurSchema= new mongoose.Schema(
    {
        nom:{
            type:String,
            required: true
        },
        prenom:{
            type:String,
            required: true
        },
        courriel:{
            type:String,
            required: true
        },
        motDePasse:{
            type:String,
            required: true
        }
    }
);

module.exports= mongoose.model('Utilisateur', utilisateurSchema);