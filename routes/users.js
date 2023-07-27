const router = require('express').Router();
const {
  getUserInfo,
  updateUserInfo,
} = require('../controllers/users');

const {
  validateChangeUser,
} = require('../middlewares/validate');

router.get('/me', getUserInfo);
router.patch('/me', validateChangeUser, updateUserInfo);

module.exports = router;
