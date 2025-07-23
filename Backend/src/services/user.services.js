const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
    static async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }
    static async comparePassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
    static generateAuthToken(user) {
        return jwt.sign(
            {
                _id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
    }
}
module.exports = AuthService;