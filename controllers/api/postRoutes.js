const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth')

// router.get('/', (req, res) => {
//   try{
//     document.location.replace('/')
//   }catch (err){
//     res.status(404).json(err)
//   }
// })

router.post('/', withAuth, async (req, res) => {
    try {
      const postData = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      console.log(postData)
      res.status(200).json(postData);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async(req,res) => {
  try {
    const postData = await Post.update({
      where:{
        id: req.params.id
      }
    })
    if(!postData){
      res.status(404).json({message: 'Cannot load post'})
      return
    }
    res.status(200).json(postData)
  }catch (err) {
    res.status(404).json(err)
  }
})


router.delete('/:id', withAuth, async (req,res) => {
    try{
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                // user_id: req.session.user_id
            }
        })

        if(!postData) {
            res.status(404).json({message: `There is no blog post related to this id!`})
            return
        }
        res.status(200).json(postData)
    } catch(err) {
        res.status(404).json()
    }
})


module.exports = router