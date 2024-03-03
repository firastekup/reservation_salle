// reservation.controller.js

const Reservation = require('../models/reservation.model');

exports.getReservationPage = (req, res, next) => {
    // Afficher la page de réservation
    res.render('reservation');
};

exports.postReservationData = (req, res, next) => {
    // Enregistrer la réservation dans la base de données
    const { startDate, endDate, roomId } = req.body;
    const userId = req.session.userId;

    const reservation = new Reservation({
        startDate: startDate,
        endDate: endDate,
        roomId: roomId,
        userId: userId
    });

    reservation.save()
        .then(() => {
            res.redirect('/dashboard'); // Rediriger vers le tableau de bord ou une autre page
        })
        .catch((error) => {
            console.log(error);
            // Gérer les erreurs de manière appropriée
        });
};
