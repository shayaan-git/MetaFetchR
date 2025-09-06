// controllers/websiteController.js
import {
  createWebsite as createWebsiteRow,
  getAllWebsites,
  getWebsiteById,
  updateWebsite as updateWebsiteRow,
  deleteWebsite as deleteWebsiteRow,
} from "../models/websiteModel.js";

import { isUUID, isURL, toDbWebsiteFields } from "../utils/validators.js";

// CREATE  -> POST /api/websites
export const createWebsite = async (req, res) => {
  const { url, brandName, description } = req.body;

  // Validate URL
  if (!url || !isURL(url)) {
    // Throw error instead of res.status(error.status)
    const err = new Error('Valid "url" is required.');
    err.statusCode = 400;
    throw err;
  }

  // Prepare payload (camelCase → snake_case)
  const payload = {
    url,
    brand_name: brandName ?? null,
    description: description ?? null,
  };

  // Save to DB
  const created = await createWebsiteRow(payload);

  res.status(201).json({ success: true, data: created });
};

// READ ALL -> GET /api/websites
export const listWebsites = async (_req, res) => {
  const rows = await getAllWebsites();
  res.json({ success: true, data: rows });
};

// READ ONE -> GET /api/websites/:id
export const getWebsite = async (req, res) => {
  const { id } = req.params;

  if (!isUUID(id)) {
    const err = new Error('Invalid "id" format (UUID expected).');
    err.statusCode = 400;
    throw err;
  }

  const row = await getWebsiteById(id);
  res.json({ success: true, data: row });
};

// UPDATE -> PUT /api/websites/:id
export const updateWebsite = async (req, res) => {
  const { id } = req.params;

  if (!isUUID(id)) {
    const err = new Error('Invalid "id" format (UUID expected).');
    err.statusCode = 400;
    throw err;
  }

  // Map allowed fields
  const updates = toDbWebsiteFields(req.body);

  if (updates.url !== undefined && !isURL(updates.url)) {
    const err = new Error('If provided, "url" must be valid.');
    err.statusCode = 400;
    throw err;
  }

  updates.updated_at = new Date().toISOString();

  const updated = await updateWebsiteRow(id, updates);

  res.json({ success: true, data: updated });
};

// DELETE -> DELETE /api/websites/:id
export const deleteWebsite = async (req, res) => {
  const { id } = req.params;

  if (!isUUID(id)) {
    const err = new Error('Invalid "id" format (UUID expected).');
    err.statusCode = 400;
    throw err;
  }

  await deleteWebsiteRow(id);
  res.status(200).json({ success: true, message: 'Record Deleted' });
};
