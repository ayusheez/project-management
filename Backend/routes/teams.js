const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const { auth, authorize } = require('../middleware/auth');

router.post('/', auth, authorize('admin', 'manager'), teamController.createTeam);
router.get('/', auth, teamController.getTeams);
router.post('/members', auth, authorize('admin', 'manager'), teamController.addMember);
router.delete('/:teamId/members/:userId', auth, authorize('admin', 'manager'), teamController.removeMember);
router.patch('/:id', auth, authorize('admin', 'manager'), teamController.updateTeam);

module.exports = router;