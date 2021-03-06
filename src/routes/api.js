
var express = require('express');

const aws = require('aws-sdk');
// const aws = require('aws4');
const S3_BUCKET = process.env.S3_BUCKET_NAME;
// const S3_BUCKET = process.env.S3_BUCKET;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

var api = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../models/user');
var Post = require('../models/post');
var Collection = require('../models/collection');
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
                    collections: JSON.parse(req.body.collections),
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
                collections: JSON.parse(req.body.collections),
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
            });
        
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
                        case 'collection':

                            Collection.remove({ "_id" : req.body.itemid }, function(err, removed){
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
                manage_users: permissions[1].checked,
                manage_collections: permissions[2].checked
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
				                manage_users: permissions[1].checked,
                                manage_collections: permissions[2].checked
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
			                manage_users: permissions[1].checked,
                            manage_collections: permissions[2].checked
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

api.post('/generate_url', mid.requiresLogin, function(req, res, next){

    User.findById(req.session.userId)
        .exec(function(error, user){
            if(error){
                next(error);
            }else{
                // check if admin
                if(user.isadmin){

                    let data = {};
                    data.success = '0';

                    const imgName = req.body.imgName;

                    var s3 = new aws.S3({
                      accessKeyId: accessKeyId,
                      secretAccessKey: secretAccessKey,
                      region: 'eu-west-2',
                      signatureVersion: 'v4'
                    });

                    var uploadPreSignedUrl = s3.getSignedUrl('putObject', {
                        Bucket: S3_BUCKET,
                        Key: imgName,
                        ACL: 'authenticated-read',
                        ContentType: 'binary/octet-stream'
                        /* then add all the rest of your parameters to AWS puttObect here */
                    });

                    var downloadPreSignedUrl = s3.getSignedUrl('getObject', {
                        Bucket: S3_BUCKET,
                        Key: imgName,
                        /* set a fixed type, or calculate your mime type from the file extension */
                        ResponseContentType: 'image/jpeg'
                        /* and all the rest of your parameters to AWS getObect here */
                    });

                    data.uploadPreSignedUrl = uploadPreSignedUrl;

                    res.send(data);

                }else{
                    res.send('error');
                }
            }
        });
});

// api.post('/upload/:subfolder', mid.requiresLogin, function(req, res, next){

//     const subFolder = req.params.subfolder;

//   User.findById(req.session.userId)
//     .exec(function(error, user){
//       if(error){
//         next(error);
//       }else{
//         // check if admin
//         if(user.isadmin){

//             let data = {};
//             data.success = '0';

           
//             // now you have both urls
//             console.log( uploadPreSignedUrl, downloadPreSignedUrl ); 
         
//             res.send(data);

//             // create an incoming form object
//             // var form = new formidable.IncomingForm();

//             // // specify that we want to allow the user to upload multiple files in a single request
//             // form.multiples = true;

//             // // store all uploads in the /uploads directory
//             // form.uploadDir = path.join(__dirname, '../public/uploads/' + subFolder);

//             // // every time a file has been uploaded successfully,
//             // // rename it to it's orignal name
//             // form.on('file', function(field, file) {
//             //     fs.rename(file.path, path.join(form.uploadDir, file.name));
//             //     data.filename = file.name;
//             // });

//             // // log any errors that occur
//             // form.on('error', function(err) {
//             //     console.log('An error has occured: \n' + err);
//             //     res.send('An error has occured: \n' + err);
//             // });

//             // // once all the files have been uploaded, send a response to the client
//             // form.on('end', function() {
//             //     res.send(data);
//             //     res.end('success');
//             // });

//             // // parse the incoming request containing the form data
//             // form.parse(req);
        
//         }else{
//           res.send('error');
//         }

//       }
//     });
// });

api.get('/get_industries', function(req, res, next){

    Industry.find({}).exec(function(err, industries){

        if(err){
            res.send(err);
        }else{
            res.send(industries);
        }

    });

});

api.get('/get_outcomes', function(req, res, next){

    Outcome.find({}).exec(function(err, outcomes){

        if(err){
            res.send(err);
        }else{
            res.send(outcomes);
        }

    });

});

api.get('/get_elements', function(req, res, next){

    Element.find({}).exec(function(err, elements){

        if(err){
            res.send(err);
        }else{
            res.send(elements);
        }

    });

});

api.get('/get_publishers', function(req, res, next){

    Publisher.find({}).exec(function(err, publishers){

        if(err){
            res.send(err);
        }else{
            res.send(publishers);
        }

    });

});

api.get('/get_posts', function(req, res, next){

    Post.find({}).exec(function(err, posts){

        if(err){
            res.send(err);
        }else{
            res.send(posts);
        }

    });

});

api.post('/filtered_posts', function(req, res, next){

    const industry = req.body.industries;
    const outcome = req.body.outcome;
    const element = req.body.element;
    const publisher = req.body.publisher;

    let filterObj = {};

    if(industry != ''){
        filterObj.industries = industry;
    }

    if(outcome != ''){
        filterObj.outcomes = outcome;
    }

    if(element != ''){
        filterObj.elements = element;
    }

    if(publisher != ''){
        filterObj.publishers = publisher;
    }

    console.log(filterObj);

    Post.find(filterObj).exec(function(err, posts){

        if(err){
            res.send(err);
        }else{
            res.send(posts);
        }

    });

});

api.post('/add_collection', function(req, res, next){

    let data = {};
    data.success = '0';

    // create obj with form input
    var collectionData = {
        name: req.body.name,
        description: req.body.description
        // posts: JSON.parse(req.body.posts)
    }

    // add to mongo db
    Collection.create(collectionData, function(error, collection){
        if( error ){
            res.send(error);
        }else{

            data.success = '1';
            res.send(data);

        }
    });

});

api.post('/update_collection', function(req, res, next){

    let data = {};
    data.success = '0';

    const collectionid = req.body.collectionid;

    Collection.update(
    {
      "_id": collectionid
    }, 
    {
      $set: {
        name: req.body.name,
        description: req.body.description
        // posts: JSON.parse(req.body.posts)
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
    });

});

module.exports = api;