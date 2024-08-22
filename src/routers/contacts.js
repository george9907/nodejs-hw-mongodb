import express from 'express';
import {
  getContactsController,
  getContactsByIdController,
  createContactController,
  deleteContactConroller,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { contactSchema, updateConactSchema } from '../validation/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get(
  '/contacts/:contactId',
  checkRoles(ROLES.AUTHOR),
  isValidId,
  ctrlWrapper(getContactsByIdController),
);

// router.post(
//   '/contacts',
//   jsonParser,
//   validateBody(contactSchema),
//   ctrlWrapper(createContactController),
// );

router.post(
  '/register',
  jsonParser,
  validateBody(contactSchema),
  ctrlWrapper(createContactController),
);

router.delete(
  '/contacts/:contactId',
  checkRoles(ROLES.AUTHOR),
  isValidId,
  ctrlWrapper(deleteContactConroller),
);

router.put(
  '/contacts/:contactId',
  jsonParser,
  validateBody(contactSchema),
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/contacts/:contactId',
  checkRoles(ROLES.AUTHOR),
  jsonParser,
  validateBody(updateConactSchema),
  ctrlWrapper(patchContactController),
);

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));


export default router;
