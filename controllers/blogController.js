import { Blog } from '../models';
import CustomErrorHandler from '../services/CustomErrorHandler';

import { blogValidator } from '../validators';

const blogController = {
    async createBlog(req, res, next) {
        //Blog Validation
        const { error } = blogValidator.validate(req.body);

        if(error){
            console.log('validation error');
            return next(CustomErrorHandler.blogValidationError(error.message));
        }
        //Validation Successful

        // Extract the title, content and author from the request body
        const { title, content } = req.body;

        // Prepare the blog model
        const blog = new Blog({
            title,
            content, 
            author: req.user.name, 
            likes: 0,
        });

        // Save the blog in the database
        try{
            const result = await blog.save();
            if(result){
                res.json(result).status(200);
                console.log(result);
                return next();
            }
        }
        catch(err){
            console.log(err);
            return next(err);
        }
    },

    async updateBlog(req, res, next) {
        console.log("Inside updateBlog");
        //Validation
        const { error } = blogValidator.validate(req.body);

        if(error){
            return next(CustomErrorHandler.blogValidationError(error.message));
        }
        //Validation Success

        console.log("Validation Successful");

        const { title, content } = req.body;

        try{
            const result = await Blog.findById({_id: req.params.id});

            if(!result){
                return next(CustomErrorHandler.blogNotExists());
            }

            const update = await Blog.findByIdAndUpdate({_id: result._id }, {
                title, content,
            }, {new: true});

            console.log(update);

            if(update){
                res.json(update);
                res.status(200);
                return next();
            }
        }
        catch(error){
            return next(error);
        }
    },

    async getBlog(req, res, next) {
        const _id = req.params.id;

        try{
            const blog = await Blog.findById({_id});
            if(blog){
                const { title, content, author } = blog;
                res.render('Blog', { title, content, author });
            }
            else{
                return next(CustomErrorHandler.blogNotExists);
            }
        }
        catch(err){
            return next(err);
        }
    },

    async getAllBlogs(req, res, next) {
        try {
            const allBlogs = await Blog.find();
            if(allBlogs){
                // res.json(allOrders).status(200);
                res.render('Home', { blogs: allBlogs, loggedIn: false });
            }
        }
        catch(err){
            return next(err);
        }
    }
}

export default blogController;