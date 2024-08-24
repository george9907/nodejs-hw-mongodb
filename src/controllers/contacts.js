import * as ContactService from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';


export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await ContactService.getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactsByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await ContactService.getContactById(contactId);
  if (contact === null) {
    return next(createHttpError(404, 'Contact not found'));
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = await ContactService.createContact(req.body);

  res.status(201).send({
    status: 201,
    message: `Contact successfully created!`,
    data: contact,
  });
};

export const deleteContactConroller = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await ContactService.deleteContact(contactId);

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(204).end();
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await ContactService.updateContact(contactId, req.body, {
    upsert: true,
  });

  if (!result) {
    return next(createHttpError(404, 'Contact not found'));
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Contact successfully upserted!`,
    data: result.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  let photoUrl;
  const photo = req.file;
  
  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await ContactService.updateContact(contactId, {...req.body, photo: photoUrl,});


  if (!result) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.json({
    status: 200,
    message: `Contact successfully patched!`,
    data: result.contact,
  });
};



// src/controllers/students.js

// export const patchStudentController = async (req, res, next) => {
//   const { studentId } = req.params;
//   const photo = req.file;
//   		{
//     fieldname: photo,
//       originalname : download.jpeg,
// 		  encoding: 7bit,
// 		  mimetype: image/jpeg,
// 		  destination: /Users/borysmeshkov/Projects/goit-study/students-app/temp,
// 		  filename: 1710709919677_download.jpeg,
// 		  path: /Users/borysmeshkov/Projects/goit-study/students-app/temp/1710709919677_download.jpeg,
// 		  size: 7
// 	  }	
// 	/* Інший код контролеру */
// };
