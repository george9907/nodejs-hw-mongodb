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

const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactsByIdController));

router.post(
  '/contacts',
  jsonParser,
  validateBody(contactSchema),
  ctrlWrapper(createContactController),
);

router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactConroller));

router.put(
  '/contacts/:contactId',
  jsonParser,
  validateBody(updateConactSchema),
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/contacts/:contactId',
  jsonParser,
  validateBody(updateConactSchema),
  ctrlWrapper(patchContactController),
);

export default router;
