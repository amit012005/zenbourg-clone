const errorHandler = (err, req, res, next) => {
  console.error(err.stack)

  const statusCode = err.statusCode || res.statusCode === 200 ? 500 : res.statusCode

  res.status(statusCode).json({
    message: err.message || "An unexpected error occurred",
    // Provide stack trace in development only for security reasons
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  })
}

module.exports = errorHandler
