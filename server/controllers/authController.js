const User = require('../models/User')
const FbLogin = require('../models/FbLogin')
const { sequelize } = require('../config/database')
const crypto = require('crypto')


const handleFb = async (req,res) => {
    const { fbId, accessToken, email, first_name, picture } = req.body
    if (!fbId || !accessToken) return Promise.reject('incorrect fb info')

    const fbUser = await FbLogin.findOne({where:{fbid:fbId}})
    if (fbUser){
        res.json({data:fbUser})
    } else {

    }
}

const fbAuthentication = async (req, res) => {
    handleFb(req,res)
    /*const {accessToken, email, fbId, first_name, picture} = req.body
    let t;
    try {
        t = await sequelize.transaction()
        const createUser = await User.create({
            name: first_name,
            email,
            isfbuser: true,
            joined: new Date()
        }, { transaction: t })
        const createFbLogin = await FbLogin.create({
            fbid: fbId,
            userid: createUser.id,
            accesstoken: accessToken,
            picture
        }, { transaction: t })
        await t.commit()
        res.json({
            data: {
                userid: createUser.id,
                fbid: createFbLogin.fbid
            }
        })
    } catch (err) {
        console.log(err)
        if (t) await t.rollback()
        res.status(500).json({
            msg: 'Unable to process request'
        })
    }*/
}

const signToken = (email) => {
    const jwtPayload = { email }
    return jwt.sign(jwtPayload, 'JWT_SECRET')
}

const setToken = (key, value) => {
    //return Promise.resolve(redisClient.set(key, value))
}

const createSessions = (user) => {
    //Will use auth youtube exercise to create the token.
    console.log(user)
} 

module.exports = {
    fbAuthentication
}