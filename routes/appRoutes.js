var express = require('express');
var router = express.Router();
const Utilisateur = require('../models/utilisateur');
const Voyage = require('../models/voyage');


router.post('/', async (req, res) => {
  let courriel = req.body.courriel;
  let motDePasse = req.body.motDePasse;
  if (courriel && motDePasse) {
    await Utilisateur.find({ courriel: courriel, motDePasse: motDePasse }, function (err, data) {
      if (err) {
        console.log(err);
        return
      } else {

        if (data.length == 0) {
          console.log("Incorrect Username and/or Password!")
          res.status(400).render('login', {
            message: "Incorrect Username and/or Password!",
            title: 'Planificateur du voyage'
          });
        } else {
          console.log(data);
          req.session.loggedin = true;
          req.session.username = courriel;
          res.redirect('/app/home');
        }
      }
    });
  }
});

router.get('/register', (req, res) => {
  res.render('register', { title: 'Registration' });
});

router.post('/register', async (req, res) => {
  // Validation des donnees ici

  const utilisateur = new Utilisateur({
    prenom: req.body.prenom,
    nom: req.body.nom,
    courriel: req.body.courriel,
    motDePasse: req.body.motDePasse,
  });

  try {
    const newUtilisateur = await utilisateur.save()
    res.redirect('/');
    // res.status(201).json(newUtilisateur)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});


router.get('/home', async (req, res) => {
  if (req.session.loggedin) {
    await Voyage.find({ courriel: req.session.username }, function (err, data) {
      if (err) {
        console.log(err);
        return
      }
      if (data.length == 0) {
        res.status(404).render('home1', { message: "Vous n'avez rien de voyage, creez en-un! " });

      } else {
        res.status(200).render('home2', { data: data });
      }
    });
  } else {
    res.status(500).redirect('/');
  }
});

router.get('/creer', (req, res) => {
  res.render('creer', { title: 'Nouveau Voyage' });
});

router.post('/creer', async (req, res) => {
  //Validation des donnees ici

  if (req.session.loggedin) {
    const voyage = new Voyage({
      courriel: req.session.username,
      pays: req.body.pays,
      ville: req.body.ville,
      dateDepart: req.body.dateDepart,
      dateRetour: req.body.dateRetour,
      modeTransport: req.body.modeTransport,
      compagnieTransport: req.body.compagnieTransport,
      prixTransport: req.body.prixTransport,
      accomodation: req.body.accomodation,
      adresseAccomodation: req.body.adresse,
      prixAccomodation: req.body.prixAccomodation,
      loisirs: req.body.loisirs
    });

    try {
      const newVoyage = await voyage.save()
      res.redirect('/app/home');

      // res.status(201).json(newUtilisateur)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  } else {
    res.status(500).redirect('/');
  }
});

router.get('/details/:id', async (req, res) => {
  if (req.session.loggedin) {
    await Voyage.findOne({ _id: req.params.id }, function (err, data) {
      if (err) {
        console.log(err);
        return
      }
        res.status(200).render('details', { data: data });
    });
  } else {
    res.status(500).redirect('/app/home2');
  }
});

module.exports = router;