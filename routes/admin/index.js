const router = require('express').Router();
const Admin = require('../../controllers/admin/admin.controller.js');
const authAdmin = require('../../middleware/auth.admin.js');

router.post('/',authAdmin, Admin.create);
router.get('/',authAdmin, Admin.getAdminAll);
router.get('/:id',authAdmin, Admin.getAdminById);
router.put('/:id',authAdmin, Admin.updateAdmin);
router.delete('/:id',authAdmin, Admin.deleteAdmin);

module.exports = router;