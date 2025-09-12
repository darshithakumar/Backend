const router = require('express').Router();
const { recommendCourses } = require('../controllers/courseController');
router.get('/recommend/:userId', recommendCourses);
module.exports = router;
