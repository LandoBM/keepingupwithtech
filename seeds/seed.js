const sequelize = require('../config/connection')
const { User, Comment, Post} = require('../models')

const userData = require('./userData.json')
const postData = require('./postData.json')
const commentData = require('./commentData.json')

const seedDB = async () => {
    await sequelize.sync({ force: true })


const user = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
})

for (const post of postData) {
    await Post.create({
        ...post,
        id: user.id
    })
}

for (const comment of commentData){
    await Comment.create({
        ...comment,
        id: user.id
    })
}

process.exit(0)
}

seedDB()