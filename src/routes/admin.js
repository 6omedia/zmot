
var express = require('express');
var admin = express.Router();
var User = require('../models/user');
var Post = require('../models/post');
var Collection = require('../models/collection');
// var Category = require('../models/category');
var Industry = require('../models/industry');
var Outcome = require('../models/outcome');
var Element = require('../models/element');
var Publisher = require('../models/publisher');

var mid = require('../middleware');

function getCatsForPost(post, categories){
    let catarray = [];
                                    
    for(let i=0; i<categories.length; i++){

        let checked = false;

        for(let j=0; j<post.categories.length; j++){
            if(categories[i]._id == post.categories[j]){
                checked = true;
            }
        }

        let catObj = {
            catid: categories[i]._id,
            catname: categories[i].name,
            checked: checked
        };
        catarray.push(catObj);
    }

    return catarray;
}

// admin dashboard
admin.get('/', mid.requiresLogin, function(req, res, next){

  User.findById(req.session.userId)
    .exec(function(error, user){
      if(error){
        next(error);
      }else{

        // check if admin
        if(user.isadmin){
          res.render('admin', {
            title: 'Admin',
            user: user,
            fullname: user.fullname
          });
        }else{
          return res.redirect('/');
        }

      }
    });

});

function give_permission(user, permission, res, permitedFuction){

	if(user.permissions.length > 0){

		if(permission in user.permissions[0]){
			if(user.permissions[0][permission]){

				permitedFuction();
			
			}else{

				res.status(401).render('admin_error', {
					error_message: 'You don\'t have the correct permissions to access this page'
				});
			
			}
		}else{

			res.status(401).render('admin_error', {
				error_message: 'You don\'t have the correct permissions to access this page'
			});

		}

	}else{

		res.status(401).render('admin_error', {
			error_message: 'You don\'t have the correct permissions to access this page'
		});

	}

}

admin.get('/posts', mid.requiresLogin, function(req, res, next){

  User.findById(req.session.userId)
    .exec(function(error, user){
      if(error){
        next(error);
      }else{

        // check if admin
        if(user.isadmin){

        	give_permission(user, 'manage_posts', res, function(){

        		Post.find({}, function(err, posts){

		            if(error){
		              next(error);
		            }else{
		              res.render('admin_posts', {
		                title: 'Posts',
                        user: user,
		                fullname: user.fullname,
		                posts: posts,
		                admin_script: 'posts'
		              });
		            }

		        });

        	});

        }else{
            return res.redirect('/');
        }

      }
    });
});

admin.get('/posts/new', mid.requiresLogin, function(req, res, next){

  User.findById(req.session.userId)
    .exec(function(error, user){
      if(error){
        next(error);
      }else{

        // check if admin
        if(user.isadmin){

        	give_permission(user, 'manage_posts', res, function(){

        		Industry.find({}).sort({$natural:-1}).exec(function(error, industries){

	                if(error){
	                    next(error);
	                }else{

                        Outcome.find({}).sort({$natural:-1}).exec(function(error, outcomes){

                            if(error){
                                next(error);
                            }else{

                                Element.find({}).sort({$natural:-1}).exec(function(error, elements){

                                    if(error){
                                        next(error);
                                    }else{

                                        Publisher.find({}).sort({$natural:-1}).exec(function(error, publishers){

                                            if(error){
                                                next(error);
                                            }else{

                                                Collection.find({}).sort({$natural:-1}).exec(function(error, collections){

                                                    if(error){
                                                        next(error);
                                                    }else{

                                                        res.render('admin_posts_new', {
                                                            title: 'Create New Post',
                                                            user: user,
                                                            fullname: user.fullname,
                                                            industries: industries,
                                                            outcomes: outcomes,
                                                            elements: elements,
                                                            publishers: publishers,
                                                            collections: collections,
                                                            user: user, 
                                                            admin_script: 'posts'
                                                        });

                                                    }

                                                });
                                                
                                            }

                                        });
                                        
                                    }

                                });


                            }

                        });

	                }

	            });

        	});

        }else{
            return res.redirect('/');
        }

      }
    });
});

function getTaxForPost(post, taxCats, tax_name){

    console.log(tax_name);
    // console.log(taxCats);

    let catarray = [];
                                    
    for(let i=0; i<taxCats.length; i++){

        let checked = false;

        for(let j=0; j<post[tax_name].length; j++){
            // console.log('taxCats: ', taxCats[i].name);
            // console.log('postCats: ', post[tax_name][j]);
            if(taxCats[i].name == post[tax_name][j]){
         //       console.log('CHECKED');
                checked = true;
            }else{
         //        console.log('NOT CHECKED');
            }
        }

        let catObj = {
            id: taxCats[i]._id,
            name: taxCats[i].name,
            checked: checked
        };
        catarray.push(catObj);
    }

//    console.dir(catarray);

    return catarray;

}


admin.get('/posts/:id', mid.requiresLogin, function(req, res, next){

    let postid = req.params.id;

    User.findById(req.session.userId)
        .exec(function(error, user){
                if(error){
                    next(error);
                }else{
                // check if admin
                    if(user.isadmin){

                    	give_permission(user, 'manage_posts', res, function(){

			        		Post.findOne({"_id": postid}, function(error, post){

	                            if(error){
	                               // console.log(error);
	                            }else{

                                    Industry.find({}).sort({$natural:-1}).exec(function(error, industries){

                                        if(error){
                                            next(error);
                                        }else{

                                            const indArray = getTaxForPost(post, industries, 'industries');

                                            Outcome.find({}).sort({$natural:-1}).exec(function(error, outcomes){

                                                if(error){
                                                    next(error);
                                                }else{

                                                    const outArray = getTaxForPost(post, outcomes, 'outcomes');

                                                    Element.find({}).sort({$natural:-1}).exec(function(error, elements){

                                                        if(error){
                                                            next(error);
                                                        }else{

                                                            const eleArray = getTaxForPost(post, elements, 'elements');

                                                            Publisher.find({}).sort({$natural:-1}).exec(function(error, publishers){

                                                                if(error){
                                                                    next(error);
                                                                }else{

                                                                    const pubArray = getTaxForPost(post, publishers, 'publishers');

                                                                    Collection.find({}).sort({$natural:-1}).exec(function(error, collections){
                                                                       
                                                                        if(error){
                                                                            next(error);
                                                                        }else{

                                                                            const colArray = getTaxForPost(post, collections, 'collections');

                                                                            res.render('admin_post_edit', {
                                                                                title: 'Edit Post',
                                                                                user: user,
                                                                                fullname: user.fullname,
                                                                                post: post,
                                                                                postid: postid,
                                                                                industries: indArray,
                                                                                outcomes: outArray,
                                                                                elements: eleArray,
                                                                                publishers: pubArray,
                                                                                collections: colArray,
                                                                                admin_script: 'posts'
                                                                            });

                                                                        }
                                                                    });
                                                                    
                                                                }

                                                            });
                                                            
                                                        }

                                                    });


                                                }

                                            });

                                        }

                                    });


	                                // Category.find({}).sort({$natural:-1}).exec(function(error, categories){

	                                //     if(error){
	                                //         next(error);
	                                //     }else{

	                                //         const catarray = getCatsForPost(post, categories);

	                                //         res.render('admin_post_edit', {
	                                //             title: 'Edit Post',
                                    //             user: user,
	                                //             fullname: user.fullname,
	                                //             post: post,
	                                //             postid: postid,
	                                //             categories: catarray,
	                                //             admin_script: 'posts'
	                                //         });

	                                //     }

	                                // });

	                            }

	                        });

			        	});

                }else{
                    return res.redirect('/');
                }

            }
        });

});

admin.get('/posts/single/:id', mid.requiresLogin, function(req, res, next){

    let postid = req.params.id;

    User.findById(req.session.userId)
        .exec(function(error, user){
            if(error){
                next(error);
            }else{
                if(user.isadmin){

                    Post.findById(postid).exec(function(err, post){

                        if(err){

                            res.send(err);

                        }else{

                            res.render('admin_single', {
                                title: 'Admin',
                                post: post,
                                user: user,
                                fullname: user.fullname,
                                admin_script: 'posts'
                            }); 

                        }
    
                    });

                }
            }
        });

});

admin.get('/users', mid.requiresLogin, function(req, res, next){

  User.findById(req.session.userId)
    .exec(function(error, user){
      if(error){
        next(error);
      }else{

        // check if admin
        if(user.isadmin){

        	give_permission(user, 'manage_users', res, function(){

        		User.find({}).sort({$natural:-1}).exec(function(error, users){

	                if(error){
	                    next(error);
	                }else{
	                    
	                    res.render('admin_users', {
	                        title: 'Admin',
                            user: user,
	                        fullname: user.fullname,
	                        users: users,
	                        admin_script: 'users'
	                    });

	                }

	            });

        	});

        }else{
          return res.redirect('/');
        }

      }
    });

});

admin.get('/users/new', mid.requiresLogin, function(req, res, next){

  User.findById(req.session.userId)
    .exec(function(error, user){
      if(error){
        next(error);
      }else{

        // check if admin
        if(user.isadmin){

        	give_permission(user, 'manage_users', res, function(){
        		res.render('admin_users_new', {
	                title: 'Admin',
                  user: user,
	                fullname: user.fullname,
	                admin_script: 'users'
	            });
        	});

        }else{
          return res.redirect('/');
        }

      }
    });

});


admin.get('/users/:id', mid.requiresLogin, function(req, res, next){

    User.findById(req.session.userId)
        .exec(function(error, user){
                if(error){
                    next(error);
                }else{
                // check if admin
                    if(user.isadmin){

                    	give_permission(user, 'manage_users', res, function(){

                    		let userid = req.params.id;

			        		User.findOne({"_id": userid}, function(error, edUser){

	                            if(error){
	                                // console.log(error);
	                            }else{

	                                res.render('admin_user_edit', {
                                        title: 'Edit User',
                                        user: user,
                                        fullname: user.fullname,
                                        edUser: edUser,
                                        userid: userid,
                                        admin_script: 'users'
                                    });

	                            }

	                        });

			        	});

                }else{
                    return res.redirect('/');
                }

            }
        });

});

admin.get('/collections/new', mid.requiresLogin, function(req, res, next){

     User.findById(req.session.userId)
        .exec(function(error, user){
                if(error){
                    next(error);
                }else{
                // check if admin
                    if(user.isadmin){

                        give_permission(user, 'manage_collections', res, function(){

                            res.render('admin_collection_new', {
                                title: 'Admin Collections',
                                user: user,
                                fullname: user.fullname,
                                // edUser: edUser,
                                // userid: userid,
                                admin_script: 'collections'
                            });

                        });

                }else{
                    return res.redirect('/');
                }

            }
        });

});

admin.get('/collections', mid.requiresLogin, function(req, res, next){

    User.findById(req.session.userId)
        .exec(function(error, user){
                if(error){
                    next(error);
                }else{
                // check if admin
                    if(user.isadmin){

                        give_permission(user, 'manage_collections', res, function(){

                            Collection.find({}).exec(function(err, collections){

                                if(err){
                                    res.send(err);
                                }else{

                                    res.render('admin_collections', {
                                        title: 'Admin Collections',
                                        user: user,
                                        fullname: user.fullname,
                                        collections: collections,
                                        // edUser: edUser,
                                        // userid: userid,
                                        admin_script: 'collections'
                                    });
                                
                                }

                            });

                            // let userid = req.params.id;

                            // Collection.findOne({"_id": userid}, function(error, edUser){

                            //     if(error){
                            //         // console.log(error);
                            //     }else{

                            //         res.render('admin_user_edit', {
                            //             title: 'Edit User',
                            //             user: user,
                            //             fullname: user.fullname,
                            //             edUser: edUser,
                            //             userid: userid,
                            //             admin_script: 'users'
                            //         });

                            //     }

                            // });

                        });

                }else{
                    return res.redirect('/');
                }

            }
        });

});

admin.get('/collection/:id', mid.requiresLogin, function(req, res, next){

    User.findById(req.session.userId)
        .exec(function(error, user){
                if(error){
                    next(error);
                }else{
                // check if admin
                    if(user.isadmin){

                        give_permission(user, 'manage_collections', res, function(){

                            Collection.findOne({"_id": req.params.id}, function(error, collection){

                                if(error){
                                    // console.log(error);
                                }else{

                                    res.render('admin_collection_edit', {
                                        title: 'Collections',
                                        user: user,
                                        fullname: user.fullname,
                                        // edUser: edUser,
                                        collection: collection,
                                        admin_script: 'collections'
                                    });

                                }

                            });

                        });

                }else{
                    return res.redirect('/');
                }

            }
        });

});

admin.get('/collection/single/:id', mid.requiresLogin, function(req, res, next){

    User.findById(req.session.userId)
        .exec(function(error, user){
                if(error){
                    next(error);
                }else{
                // check if admin
                    if(user.isadmin){

                        give_permission(user, 'manage_collections', res, function(){

                            Collection.findOne({"_id": req.params.id}, function(error, collection){

                                if(error){
                                    // console.log(error);
                                }else{

                                //    console.log(collection._id);

                                    Post.find({collections: String(collection.name)}).exec(function(err, posts){

                                        if(err){

                                            console.log(err);

                                        }else{

                                            res.render('admin_collection_single', {
                                                title: 'Collections',
                                                user: user,
                                                fullname: user.fullname,
                                                posts: posts,
                                                collection: collection,
                                                admin_script: 'collections'
                                            });

                                        }

                                    });

                                    // let posts = [];

                                    // for(let i=0; i<collection.posts.length; i++){

                                    //     Post.find({title: this}).exec(function(err, post){
                                    //         console.log('yeah: ', post);
                                    //     });

                                    //     // posts.push()
                                    // }

                                }

                            });

                        });

                }else{
                    return res.redirect('/');
                }

            }
        });

});

module.exports = admin;