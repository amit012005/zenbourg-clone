const errorHandler = (err, req, res, next) => {
  console.error(err.stack) // Log the error stack for debugging

  const statusCode = err.statusCode || res.statusCode === 200 ? 500 : res.statusCode
  // If err.statusCode is set, use it. Otherwise, if res.statusCode is still 200 (meaning no error status set yet), default to 500.
  // Otherwise, use the res.statusCode if it has been set by a previous error.

  res.status(statusCode).json({
    message: err.message || "An unexpected error occurred.",
    // Optionally include stack trace in development
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  })
}

module.exports = errorHandler
