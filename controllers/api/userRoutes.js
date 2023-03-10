const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req,res) => {
    try{
        const userInfo = await User.create(req.body)

        req.session.save(() => {
            req.session.user_id = userInfo.id
            req.session.logged_in = true;

            res.status(200).json(userInfo)
        })
    } catch (err) {
        res.status(404).json(err)
    }
})

router.post('/login', async (req,res)=> {
    try {
        const userInfo = await User.findOne({where: {email: req.body.email} })

        if(!userInfo) {
            alert(`Email do not match, please try again`)
            res.status(404).json({message: `Email do not match, please try again`})
            return
        }

        const correctPassword = await userInfo.checkPassword(req.body.password)
        console.log(correctPassword)
        if (!correctPassword) {
            alert(`Password do not match, please try again`)
            res.status(404).json({message: `Password do not match, please try again`})
        }

        req.session.save(() => {
            req.session.user_id = userInfo.id
            req.session.logged_in = true
            res.json({ user : userInfo, message: `Logging in...`})
            
        })
    } catch (err) {
        res.status(404).json(err)
    }
})

router.post('/logout', (req,res) => {
    if(req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(404).end()
    }
})


module.exports = router