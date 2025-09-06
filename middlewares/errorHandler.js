// a centralized way to format and return error responses
export const errorHandler = (err, req, res, _next) => {
    console.error('[ERROR]', err);

// If error came from Supabase, it often has message/details
const status = err.statusCode || 500;    // default 500'
const message = err.message || 'Internal Server Error';

res.status(status).json({
    success: false,
    message,
})
};

// Using a helper to avoid repeating try/catch in every async route and Catch errors from Async routes Automatically
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
