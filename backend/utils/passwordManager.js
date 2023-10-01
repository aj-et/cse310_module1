const bcrypt = require('bcrypt')

module.exports = {
    hashPassword: async (pwd) => {
        const salt = await bcrypt.genSalt()
        return await bcrypt.hash(pwd, salt)
    },
    comparePassword: async (pwd, existing_pwd) => await bcrypt.compare(pwd, existing_pwd)
}