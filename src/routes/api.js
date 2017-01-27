
var express = require('express');
var api = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../models/user');
var Post = require('../models/post');
// var Category = require('../models/category');
var Industry = require('../models/industry');
var Outcome = require('../models/outcome');
var Element = require('../models/element');
var Publisher = require('../models/publisher');

var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

var mid = require('../middleware');

/* Posts */

api.post('/add_post', mid.requiresLogin, function(req, res, next){

  User.findById(req.session.userId)
    .exec(function(error, user){
      if(error){
        next(error);
      }else{
        // check if admin
        if(user.isadmin){

            let data = {};
            data.success = '0';

            // console.log('The string: ', req.body.body);

            const post = new Post(
                {
					title: req.body.title,
					slug: req.body.slug,
					body: req.body.body,
					// categories: JSON.parse(req.body.categories),
                    industries: JSON.parse(req.body.industries),
                    outcomes: JSON.parse(req.body.outcomes),
                    elements: JSON.parse(req.body.elements),
                    publishers: JSON.parse(req.body.publishers),
					feat_img: req.body.feat_img,
					user_id: req.body.user_id
                }
            );

            //save model to MongoDB
            post.save(function (err) {

                if(err) {
                    data.error = err;
                    res.send(data);
                }else{
                    data.success = '1';
                    res.send(data);
                }

            });
        
        }else{
      		res.send('error');
        }

      }
    });

});

api.post('/update_post', mid.requiresLogin, function(req, res, next){

  User.findById(req.session.userId)
    .exec(function(error, user){
      if(error){
        next(error);
      }else{
        // check if admin
        if(user.isadmin){

            let data = {};
            data.success = '0';
            const postid = req.body.postid;

            Post.update(
            {
              "_id": postid
            }, 
            {
              $set: {
                title: req.body.title,
                slug: req.body.slug,
                body: req.body.body,
                industries: JSON.parse(req.body.industries),
                outcomes: JSON.parse(req.body.outcomes),
                elements: JSON.parse(req.body.elements),
                publishers: JSON.parse(req.body.publishers),
                feat_img: req.body.feat_img
              }
            },
            function(err, affected, resp){
              if(err){
                data.error = err;
                res.send(data);
              }else{
                // console.log(affected);
                data.success = '1';
                res.send(data);
              }
            }
          );
        
        }else{
          res.send('error');
        }

      }
    });

});

// Categories

api.post('/add_industry', mid.requiresLogin, function(req, res, next){

    User.findById(req.session.userId)
        .exec(function(error, user){
            if(error){
                next(error);
            }else{
                // check if admin
                if(user.isadmin){

                    let data = {};
                    data.success = '0';
                    
                    const industry = new Industry(
                        {
                          name: req.body.name,
                          description: req.body.description
                        }
                    );

                    //save model to MongoDB
                    industry.save(function (err, industry) {

                        if(err) {
                            data.error = err;
                            res.send(data);
                        }else{
                            data.success = '1';
                            data.catname = industry.name; 
                            data.catid = industry._id;
                            res.send(data);
                        }

                    });

                }else{
                  res.send('error');
                }

            }
    });

});

api.post('/add_outcome', mid.requiresLogin, function(req, res, next){

    User.findById(req.session.userId)
        .exec(function(error, user){
            if(error){
                next(error);
            }else{
                // check if admin
                if(user.isadmin){

                    let data = {};
                    data.success = '0';
                    
                    const outcome = new Outcome(
                        {
                          name: req.body.name,
                          description: req.body.description
                        }
                    );

                    //save model to MongoDB
                    outcome.save(function (err, outcome) {

                        if(err) {
                            data.error = err;
                            res.send(data);
                        }else{
                            data.success = '1';
                            data.catname = outcome.name; 
                            data.catid = outcome._id;
                            res.send(data);
                        }

                    });

                }else{
                  res.send('error');
                }

            }
    });

});

api.post('/add_element', mid.requiresLogin, function(req, res, next){

    User.findById(req.session.userId)
        .exec(function(error, user){
            if(error){
                next(error);
            }else{
                // check if admin
                if(user.isadmin){

                    let data = {};
                    data.success = '0';
                    
                    const element = new Element(
                        {
                          name: req.body.name,
                          description: req.body.description
                        }
                    );

                    //save model to MongoDB
                    element.save(function (err, element) {

                        if(err) {
                            data.error = err;
                            res.send(data);
                        }else{
                            data.success = '1';
                            data.catname = element.name; 
                            data.catid = element._id;
                            res.send(data);
                        }

                    });

                }else{
                  res.send('error');
                }

            }
    });

});

api.post('/add_publisher', mid.requiresLogin, function(req, res, next){

    User.findById(req.session.userId)
        .exec(function(error, user){
            if(error){
                next(error);
            }else{
                // check if admin
                if(user.isadmin){

                    let data = {};
                    data.success = '0';
                    
                    const publisher = new Publisher(
                        {
                          name: req.body.name,
                          description: req.body.description
                        }
                    );

                    //save model to MongoDB
                    publisher.save(function (err, publisher) {

                        if(err) {
                            data.error = err;
                            res.send(data);
                        }else{
                            data.success = '1';
                            data.catname = publisher.name; 
                            data.catid = publisher._id;
                            res.send(data);
                        }

                    });

                }else{
                  res.send('error');
                }

            }
    });

});

api.post('/delete', mid.requiresLogin, function(req, res, next){

    User.findById(req.session.userId)
        .exec(function(error, user){
            if(error){
                next(error);
            }else{
                // check if admin
                if(user.isadmin){

                    let data = {};
                    data.success = '0';
                    
                    const delete_item = req.body.delete_item;

                    switch(delete_item){
                        case 'post':

                            Post.remove({ "_id" : req.body.itemid }, function(err){
                              if(err){
                                res.send(data);
                              }else{
                                data.success = '1';
                                res.send(data);
                              }
                            });

                        break;
                        case 'industry':

                            Industry.remove({ "_id" : req.body.itemid }, function(err, removed){
                                data.removed = removed;
                                if(err){
                                    data.error = err;
                                    res.send(data);
                                }else{

                                    if(removed){
                                        data.success = '1';
                                    }
                                    
                                    res.send(data);
                                }
                            });

                        break;
                        case 'outcome':

                            Outcome.remove({ "_id" : req.body.itemid }, function(err, removed){
                                data.removed = removed;
                                if(err){
                                    data.error = err;
                                    res.send(data);
                                }else{

                                    if(removed){
                                        data.success = '1';
                                    }
                                    
                                    res.send(data);
                                }
                            });

                        break;
                        case 'element':

                            Element.remove({ "_id" : req.body.itemid }, function(err, removed){
                                data.removed = removed;
                                if(err){
                                    data.error = err;
                                    res.send(data);
                                }else{

                                    if(removed){
                                        data.success = '1';
                                    }
                                    
                                    res.send(data);
                                }
                            });

                        break;
                        case 'publisher':

                            Publisher.remove({ "_id" : req.body.itemid }, function(err, removed){
                                data.removed = removed;
                                if(err){
                                    data.error = err;
                                    res.send(data);
                                }else{

                                    if(removed){
                                        data.success = '1';
                                    }
                                    
                                    res.send(data);
                                }
                            });

                        break;
                        case 'user':

                            User.findById({ "_id" : req.body.itemid }, function(err, theUser){

                                if(err){
                                    res.send(data);
                                }else{

                                    if(!theUser.isSuperAdmin){

                                        User.remove({ "_id" : req.body.itemid }, function(err, removed){
                                            data.removed = removed;
                                            if(err){
                                                data.error = err;
                                                res.send(data);
                                            }else{

                                                if(removed){
                                                    data.success = '1';
                                                }
                                                
                                                res.send(data);
                                            }
                                        });

                                    }else{
                                        data.error = 'Can not delete a Super Admin';
                                        res.send(data);
                                    }

                                }

                            });

                        break;
                    }

                }else{
                  res.send('error');
                }

            }
    });

});


api.post('/add_user', function(req, res, next){

    User.findById(req.session.userId)
    .exec(function(error, user){
      if(error){
        next(error);
      }else{
        // check if admin
        if(user.isadmin){

            let data = {};
            data.success = '0';

            const permissions = JSON.parse(req.body.permissions);

            // create obj with form input
            var userData = {
              fullname: req.body.fullname,
              email: req.body.email,
              password: req.body.password,
              isadmin: req.body.isadmin,
              permissions: [{
                manage_posts: permissions[0].checked,
                manage_users: permissions[1].checked
              }]
            }

            // add to mongo db
            User.create(userData, function(error, user){
              if( error ){
                res.send(error);
              }else{
                
                data.success = '1';
                res.send(data);

              }
            });
             
            
        }else{
          res.send('error');
        }

      }
    });

});

api.post('/update_user', mid.requiresLogin, function(req, res, next){

  User.findById(req.session.userId)
    .exec(function(error, user){
      if(error){
        next(error);
      }else{
        // check if admin
        if(user.isadmin){

            let data = {};
            data.success = '0';
            const userid = req.body.userid;

            const permissions = JSON.parse(req.body.permissions);

            let updateObj = {};

            const changepassword = req.body.changepassword;

            if(changepassword == "true"){

                let hashedPassword = '';

				bcrypt.hash(req.body.password, 5, function(err, hash){

					if(err){
						data.error = err;
						res.send(data);
					}

					updateObj = {
		               	$set: {
		                	fullname: req.body.fullname,
		                    email: req.body.email,
		                    password: hash,
		                    isadmin: req.body.isadmin,
		                    permissions: [{
				                manage_posts: permissions[0].checked,
				                manage_users: permissions[1].checked
			              	}]
		                }
		            };

		            User.update({"_id": userid}, updateObj, function(err, affected, resp){

						if(err){
							data.error = err;
							res.send(data);
						}else{
							data.success = '1';
							res.send(data);
						}
					});

				});

            }else{

            	updateObj = {
	               	$set: {
	                	fullname: req.body.fullname,
	                    email: req.body.email,
	                    isadmin: req.body.isadmin,
	                    permissions: [{
			                manage_posts: permissions[0].checked,
			                manage_users: permissions[1].checked
		              	}]
	                }
	            };

	            User.update({"_id": userid}, updateObj, function(err, affected, resp){

					if(err){
						data.error = err;
						res.send(data);
					}else{
						// console.log(affected);
						data.success = '1';
						res.send(data);
					}
				});

            }
        
        }else{
            res.send('error');
        }

      }
    });

});

// Image uploads

api.post('/upload/:subfolder', mid.requiresLogin, function(req, res, next){

    const subFolder = req.params.subfolder;

  User.findById(req.session.userId)
    .exec(function(error, user){
      if(error){
        next(error);
      }else{
        // check if admin
        if(user.isadmin){

            let data = {};
            data.success = '0';

            // create an incoming form object
            var form = new formidable.IncomingForm();

            // specify that we want to allow the user to upload multiple files in a single request
            form.multiples = true;

            // store all uploads in the /uploads directory
            form.uploadDir = path.join(__dirname, '../public/uploads/' + subFolder);

            // every time a file has been uploaded successfully,
            // rename it to it's orignal name
            form.on('file', function(field, file) {
                fs.rename(file.path, path.join(form.uploadDir, file.name));
                data.filename = file.name;
            });

            // log any errors that occur
            form.on('error', function(err) {
                console.log('An error has occured: \n' + err);
                res.send('An error has occured: \n' + err);
            });

            // once all the files have been uploaded, send a response to the client
            form.on('end', function() {
                res.send(data);
                res.end('success');
            });

            // parse the incoming request containing the form data
            form.parse(req);
        
        }else{
          res.send('error');
        }

      }
    });
});

module.exports = api;