const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');

// This line is the most likely source of the error.
// This is the corrected version, including the new 'askQuestion' function.
const { 
  uploadAndProcessAgreement, 
  connectCalendar, 
  getAgreements, 
  askQuestion 
} = require('../controllers/agreement.controller');

const upload = multer({ 
  storage: multer.memoryStorage(), 
  limits: { fileSize: 10 * 1024 * 1024 } 
});

// --- Your existing routes ---
router.post('/upload', [auth, upload.single('document')], uploadAndProcessAgreement);
router.post('/:agreementId/connect-calendar', auth, connectCalendar);
router.get('/', auth, getAgreements);

// --- The new route for the chatbot ---
router.post('/:agreementId/ask', auth, askQuestion);


module.exports = router;