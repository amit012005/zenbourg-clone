const { v4: uuidv4 } = require("uuid")

const generateVerificationCode = () => {
  // Generate a simple 6-digit numeric code for this example
  // For production, consider more robust codes or UUIDs
  return Math.floor(100000 + Math.random() * 900000).toString()
  // return uuidv4(); // Alternative: use UUID for longer, more unique codes
}

module.exports = generateVerificationCode
