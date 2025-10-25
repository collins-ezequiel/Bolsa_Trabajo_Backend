// routes/profiles.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profilesController');
const { authenticateToken } = require('../middlewares/auth');
const { validateBody } = require('../middlewares/validatorHandler');
const { profileSchema } = require('../schemas/profileSchema');

router.post('/', authenticateToken, validateBody(profileSchema), profileController.createProfile);
router.get('/', authenticateToken, profileController.getProfileByUserId);
router.put('/', authenticateToken, validateBody(profileSchema), profileController.updateProfile);
// Obtener perfil de otro usuario por ID
router.get("/user/:id", authenticateToken, profileController.getProfileById);

module.exports = router;