const express = require('express');
const router = express.Router();
const tourController = require('./../controllers/tourController');

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.tourStats);

router.route('/monthly-tours/:year').get(tourController.monthlyTours);

router
  .route('/:id/')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
