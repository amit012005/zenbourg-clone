const { v4: uuidv4 } = require("uuid")

const generateVerificationCode = () => {
  return uuidv4() // Generates a unique UUID
}

module.exports = generateVerificationCode
