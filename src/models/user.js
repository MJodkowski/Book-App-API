const mongoose = require('mongoose'),
bcrypt = require('bcrypt'),
jwt = require('jsonwebtoken'),
{jwtKey} = require('../../config/config'),
validator = require('validator');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email address');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.toJSON = function() {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

userSchema.methods.generateToken = async function() {
    const token = jwt.sign({ _id: this._id }, jwtKey, { expiresIn: '2h' });
    this.tokens.push({token});
    await this.save();
    return token;
}

userSchema.statics.findAndVerify = async (name, password) => {
    try {
        const user = await User.findOne({ name });
        if (!user) {
            throw new Error('User not found');
        }
        if (await bcrypt.compare(password, user.password)) {
            return user;
        }
    } catch (err) {
        res.status(500).send();
    }
}

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const SALT = 10;
        this.password = await bcrypt.hash(this.password, SALT);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;