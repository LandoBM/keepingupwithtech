const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require('../models')
const withAuth = require("../utils/auth");

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "post_text", "title", "date"],
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
        {
          model: Comment,

        },
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id"],
          include: {
            model: User,
            attributes: ["id", "name", "email"],
          },
        },
      ],
    });
    const posts = postData.map(posts => posts.get({ plain: true }));
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/post', withAuth, async(req, res) => {
  try {
      const userData = await User.findByPk(req.session.user_id, {
          attributes: { exclude: ['password']},
          include: [{model: Post, attributes: ["id", "post_text", "title", "date"]}],
      })

      console.log(userData)
      const user = userData.get({ plain: true })
      console.log(user)
      res.render('post', {
          ...user,
          logged_in: true
      })
  } catch(err) {
      console.log(err)
      res.status(500).json(err)
  }
})

// Render the single post page
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      // where: {
      //   id: req.params.id,
      // },
      attributes: ["id", "post_text", "title", "date"],
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id"],
          include: {
            model: User,
            attributes: ["id", "name", "email"],
            // model: Post,
          },
        },
      ],
    });
    const post = postData.get({ plain: true });
    console.log('POST:', post)
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/edit-post', async(req, res) => {
  try {
      const postData = await Post.findByPk(req.session.user_id, {
          // attributes: { exclude: ['password']},
          include: [{model: User }, {model: Comment}],
      })

      console.log(postData)
      const post = postData.get({ plain: true })
      console.log(post)
      res.render('post', {
          ...post,
          // logged_in: req.session.logged_in
      })
  } catch(err) {
      console.log(err)
      res.status(500).json(err)
  }
})

router.get("/edit-post/:id", async (req, res) => {
  try {
    const postData = await Post.findOne(req.params.id, {
      // where: {
      //   id: req.params.id,
      // },
      attributes: ["id", "post_text", "title", "date"],
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id"],
          include: {
            model: User,
            attributes: ["id", "name", "email"],
          },
        },
      ],
    });
    const post = postData.get({ plain: true });

    res.render("edit-post", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/comment/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      // where: {
      //   id: req.params.id,
      // },
      attributes: [
        'id',
        'user_id',
        'post_id',
        'comment_text'
    ],
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
        {
          model: Post,
          attributes: ["id", "comment_text", "post_id", "user_id"],
          include: {
            model: User,
            attributes: ["id", "name", "email"],
            model: Comment,
            attributes: [
              'id',
              'user_id',
              'post_id',
              'comment_text'
          ],
          },
        },
      ],
    });
    const comment = commentData.get({ plain: true });
    console.log('COMMENT:', comment)
    res.render('comment', {
      ...comment,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/userpost/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findByPk({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "comment_text", "post_id", "user_id"],
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
        {
          model: Post,
          // attributes: ["id", "comment_text", "post_id", "user_id"],
          include: {
            model: User,
            attributes: ["id", "name", "email"],
            model: Comment,
            attributes: ["id", "comment_text", "post_id", "user_id"]
          },
        },
      ],
    });
    const comment = commentData.get({ plain: true });
    console.log('COMMENT:', comment)
    res.render("/", {
      ...comment,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/post");
    return;
  }

  res.render("login");
});

module.exports = router;
