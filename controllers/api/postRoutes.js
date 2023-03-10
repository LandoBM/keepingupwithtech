const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth')

router.post('/', async (req, res) => {
    try {
      const postData = await Post.create({
        ...req.body,
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id,
      });
      console.log(postData)
      res.status(200).json(postData);
    } catch (err) {
      res.status(400).json(err);
    }
});

// router.get('/', async (req, res) => {
//     try{
//       const postData = await Post.findAll({
//         // attributes: ['id', 'comment_text', 'post_id', 'user_id'],
//         include: [
//              {
//                  model: User,
//                 //  attributes: ['id', 'name', 'email']
//              },
//              {
//                  model: Comment,
//                 //  attributes: [
//                 //     'id',
//                 //     'post_text',
//                 //     'title',
//                 //     'date',
//                 //   ],
//                  include: {
//                      model: User,
//                     //  attributes: ['id', 'name', 'email']
//                     model: Post,
//                  }
//              }
//          ]
//      })
//        const posts = postData.map(posts => posts.get({ plain: true }));
//        res.render('post', {
//          ...post,
//          loggedIn: req.session.loggedIn
//        })
//      }catch(err) {
//          console.log(err);
//          res.status(500).json(err);
//      }
// });

router.post('/comment/:id', async(req, res) => {
  try{
    const commentData = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      post_id: req.params.id
    })
    res.status(200).json(commentData)
    console.log(commentData)
  } catch (err) {
    res.status(404).json(err)
  }
})

router.put('/:id', withAuth, async(req,res) => {
  try {
    const postData = await Post.update({
      title: req.body.title,
      post_text: req.body.post_text
    },
    { where:{
        id: req.params.id
      },
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