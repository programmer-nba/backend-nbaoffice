const router = require('express').Router();
const main = require('../controllers/main.controller.js');
const { AuthorizeUser }= require('../middleware/auth.js');

router.post('/login', main.Login);
router.post('/logout',AuthorizeUser, main.logout);
router.get('/me', AuthorizeUser, main.Me);
router.post('/create',AuthorizeUser, main.Create);
router.get('/list',AuthorizeUser, main.GetUser);
router.delete('/delete/:id',AuthorizeUser, main.Delete);

module.exports = router;