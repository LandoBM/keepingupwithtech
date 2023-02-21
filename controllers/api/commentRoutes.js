const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth')

router.post('/', withAuth, async (req, res) => {
    try {
      const commentData = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
      },
      {
        where: {
          id: req.params.id
        }
      }
      );
      res.status(200).json(commentData);
    } catch (err) {
      res.status(400).json(err);
    }
});

// router.post('/:id', withAuth, async(req,res)=> {
//   try{
//     const commentData = await Comment.create({
//       ...req.body,
//       user_id: req.session.user_test,
//       blog_id: req.params.id
//     })
//     res.status(200).json(commentData)
//   }catch(err){
//     res.status(404).json(err)
//   }
// })

router.delete('/:id', withAuth, async (req,res) => {
    try{
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        })

        if(!blogData) {
            res.status(404).json({message: `There is no comment related to this id!`})
            return
        }
        res.status(200).json(commentData)

    } catch(err) {
        res.status(404).json()
    }
})


module.exports = router