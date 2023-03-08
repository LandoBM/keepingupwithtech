const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth')

router.post('/', withAuth, async (req, res) => {
    try {
      const commentData = await Comment.create({
        ...req.body,
        comment_text: req.body.comment_text,
        // user_id: req.session.user_id,
        id: req.params.id,
        id: req.query.id
      },
      // {
      //   where: {
      //     id: req.params.id
      //   }
      // }
      );
      res.status(200).json(commentData);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.get('/comment', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      where: {
        id: req.query.id
      }
    })
    const comment = commentData.get({plain: true})
    res.render(comment , {
      ...comment,
      logged_in: true
    })

  }catch (err) {
    console.log(err)
    res.status(404).json(err)
  }
})

router.post('/:id', async(req, res) => {
  console.log(req.body, req.params.id,"=======")
  try{
    const commentData = await Comment.create({
      // ... req.body,
      user_id: req.query.user_id,
      post_id: req.params.id,
      // comment_text: req.body.comment_text
      // comment_text: req.body.comment_text
    })
    res.status(200).json(commentData)
    console.log(commentData)
  } catch (err) {
    console.log(err)
    res.status(404).json(err)
  }
})

// router.post('/:id', withAuth, async(req,res)=> {
//   console.log(req.body, req.params.id,"=======")
//   try{
//     const commentData = await Comment.create({
//       ...req.body,
//       user_id: req.session.user_test,
//       id: req.params.id
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
               comment_id: req.params.id
            }
        })

        if(!commentData) {
            res.status(404).json({message: `There is no comment related to this id!`})
            return
        }
        res.status(200).json(commentData)

    } catch(err) {
        res.status(404).json()
    }
})


module.exports = router