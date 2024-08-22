import createHttpError from 'http-errors';
import { contactCollection } from '../db/models/contact.js';
import { ROLES } from '../constants/index.js';

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      next(createHttpError(401));
      return;
    }

      const { role } = user;
      
    if (roles.includes(ROLES.AUTHOR) && role === ROLES.AUTHOR) {
      const { contactId } = req.params;
      if (!contactId) {
        next(createHttpError(403));
        return;
      }

      const contact = await contactCollection.findOne({
        _id: contactId,
        userId: user._id,
      });

      if (contact) {
        next();
        return;
      }
    }

    next(createHttpError(403));
  };
