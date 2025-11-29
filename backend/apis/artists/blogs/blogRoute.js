const blogRouter = require('express').Router();
const { verifytoken, restrictto } = require('../../../middlewares/verifytoken');
const { getblogs, updateblog, deleteblog, getartistblogs, writeBlog } = require('../blogs/blogControler');

blogRouter.post('/createblog', restrictto('user'), writeBlog);
blogRouter.get('/getblogs', getblogs);
blogRouter.route('/blogs/:blogid').get(getartistblogs).patch(updateblog).delete(deleteblog);

module.exports = blogRouter;