// reservation.controller.js

const Reservation = require('../models/reservation.model');

exports.getAvailabilityPage = async (req, res, next) => {
    try {
        // Récupérer les dates disponibles pour chaque salle
        const availability = await getAvailability();

        // Passer les données à la vue
        res.render('availability', { availability: availability });
    } catch (error) {
        console.log(error);
        res.status(500).send("Une erreur est survenue lors de la récupération des dates disponibles.");
    }
};

async function getAvailability() {
    try {
        // Récupérer toutes les réservations
        const reservations = await Reservation.find();

        // Regrouper les réservations par salle
        const availability = {};
        reservations.forEach(reservation => {
            if (!availability[reservation.roomId]) {
                availability[reservation.roomId] = [];
            }
            availability[reservation.roomId].push({ startDate: reservation.startDate, endDate: reservation.endDate });
        });

        return availability;
    } catch (error) {
        console.log(error);
        throw error;
    }
}








exports.getReservationPage = (req, res, next) => {
    // Afficher la page de réservation
    res.render('reservation');
};

exports.postReservationData = async (req, res, next) => {
    try {
        const { startDate, endDate, roomId } = req.body;
        const userId = req.session.userId;

        // Vérifier si la salle est disponible pour les dates spécifiées
        const isRoomAvailable = await checkRoomAvailability(startDate, endDate, roomId);

        if (!isRoomAvailable) {
            return res.status(400).send("La salle sélectionnée n'est pas disponible pour ces dates.");
        }

        const reservation = new Reservation({
            startDate: startDate,
            endDate: endDate,
            roomId: roomId,
            userId: userId
        });

        await reservation.save();
        res.redirect('/dashboard'); // Rediriger vers le tableau de bord ou une autre page
    } catch (error) {
        console.log(error);
        res.status(500).send("Une erreur est survenue lors de la réservation.");
    }
};

// Fonction pour vérifier la disponibilité de la salle pour les dates spécifiées
async function checkRoomAvailability(startDate, endDate, roomId) {
    try {
        // Vérifier s'il existe des réservations pour la salle et les dates spécifiées
        const existingReservation = await Reservation.findOne({
            roomId: roomId,
            $or: [
                { startDate: { $lt: endDate }, endDate: { $gt: startDate } },
                { startDate: { $eq: startDate }, endDate: { $eq: endDate } }
            ]
        });

        return !existingReservation; // Retourne true si la salle est disponible, sinon false
    } catch (error) {
        console.log(error);
        throw error;
    }
}
