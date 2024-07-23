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

const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactsByIdController));

router.post('/contacts', jsonParser, ctrlWrapper(createContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactConroller));

router.put(
  '/contacts/:contactId',
  jsonParser,
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/contacts/:contactId',
  jsonParser,
  ctrlWrapper(patchContactController),
);

export default router;
