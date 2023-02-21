const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
   try{
     const postData = Post.findAll({
        attributes: [
            'id',
            'post_text',
            'title',
            'date',
          ],
        include: [
            {
                model: User,
                attributes: ['id', 'name', 'email']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'date'],
                include: {
                    model: User,
                    attributes: ['id', 'name', 'email']
                }
            }
        ]
    })
      const posts = postData.map(post => post.get({ plain: true }));
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      })
    }catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    try{
      const commentData = Comment.findAll({
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'date'],
        include: [
             {
                 model: User,
                 attributes: ['id', 'name', 'email']
             },
             {
                 model: Post,
                 attributes: [
                    'id',
                    'post_text',
                    'title',
                    'date',
                  ],
                 include: {
                     model: User,
                     attributes: ['id', 'name', 'email']
                 }
             }
         ]
     })
       const comments = commentData.map(comment => comment.get({ plain: true }));
       res.render('homepage', {
         comments,
         loggedIn: req.session.loggedIn
       })
     }catch(err) {
         console.log(err);
         res.status(500).json(err);
     }
 });

// Render the single post page
router.get('/post/:id', async (req, res) => {
  try{ 
    const postData = Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'post_text',
        'title',
        'date',
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'name','email']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['id', 'name','email']
            }
        }
      ]
    })
    const post = postData.get({ plain: true });

    res.render('post', {
        post,
        logged_in: req.session.logged_in
    });
    } catch(err) {
    console.log(err);
    res.status(500).json(err);
    }
});

router.get('/:id', withAuth, async (req, res) => {
    try{ 
     const postData= await Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'post_text',
        'title',
        'date',
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'name','email']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['id', 'name','email']
            }
        }
      ]
    })
    const post = postData.get({ plain: true });

    res.render('post', {
        post,
        logged_in: req.session.logged_in
    });
    }catch(err){

        console.log(err);
        res.status(500).json(err);
    }
});



router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
});

module.exports = router;