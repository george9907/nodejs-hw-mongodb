import { contactCollection } from '../db/models/contact.js';

function getAllContacts () {
  return contactCollection.find();
};

function getContactById (contactId) {
  return contactCollection.findById(contactId);
};

function createContact(payload) {
  return contactCollection.create(payload);
};

function deleteContact(contactId) {
  return contactCollection.findByIdAndDelete(contactId);
};


export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await contactCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};


export { getAllContacts, getContactById, createContact, deleteContact };