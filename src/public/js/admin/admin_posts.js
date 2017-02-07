
// function getCheckedCats() {
// 	let catArray = [];
// 	const catlis = $('.categories li input');

// 	catlis.each(function(){

// 		if($(this).is(':checked')){
// 			catArray.push($(this).val());
// 		}

// 	});

// 	return catArray;
// }

function getCheckedTax(tax){

	let theArray = [];
	const catlis = $('#' + tax + '_list li input');

	console.log(tax, ' ', catlis);

	catlis.each(function(){

		if($(this).is(':checked')){
			theArray.push($(this).val());
		}

	});

	return theArray;

}

$('#q_title').on('blur', function(){
	const slug = slugify($(this).val());
	$('#q_slug').val(slug);
});

$('#q_slug').on('blur', function(){
	const slug = slugify($('#q_slug').val());
	$('#q_slug').val(slug);
});


const postsForm = new Form(forminfo.posts_form);

postsForm.sendBtn.on('click', function(){
	postsForm.sendForm(function(){

		const indArray = getCheckedTax('industry');
		const outArray = getCheckedTax('outcome');
		const eleArray = getCheckedTax('element');
		const pubArray = getCheckedTax('publisher');

		const colArray = getCheckedTax('collection');

		const user_id = $('#datablock').data('userid');

		let feat_img = '';
		
		if($('#featImg_container img').attr('src') != undefined){
			feat_img = $('#featImg_container img').attr('src');
		}

		// content blocks

		const useContentBlocks = $('#cb_toggle').prop('checked');
		let theBody = '';

		if(useContentBlocks){

			const contentBlocks = $('#content_block_list li .contentBlock');

			let cbArray = [];

			contentBlocks.each(function(){

				let blocktype = $(this).data('content_type');
				let blockvalue = '';

				if(blocktype == 'Image'){
					blockvalue = $($(this).children()[2]).attr('src');
				}else{
					blockvalue = $($(this).children()[2]).val();
				}

				const cbObj = {
					blocktype: blocktype,
					blockvalue: blockvalue
				};
				cbArray.push(cbObj);
			});

			theBody = JSON.stringify(cbArray); // cbArray stringified
	
		}else{
			theBody = postsForm.requiredFeilds[2].elem.summernote('code');
		}

		$.ajax({
			url: '/admin/api/add_post',
			type: 'POST',
			// dataType: 'json',
			data:
			{
				title: postsForm.requiredFeilds[0].value,
				slug: postsForm.requiredFeilds[1].value,
				body: theBody,
				// categories: JSON.stringify(catArray),
				industries: JSON.stringify(indArray),
				outcomes: JSON.stringify(outArray),
				elements: JSON.stringify(eleArray),
				publishers: JSON.stringify(pubArray),
				collections: JSON.stringify(colArray),
				feat_img: feat_img,
				user_id: user_id
			},
			success: function(data)
			{
				postsForm.enableSubmit();
				if(data.success == '1'){
					postsForm.successBox.html('New Post Created').slideDown();
				}else{
					if(data.error){
						// const displayError = makeErrorReadable(data.error);
						if(data.error.code == 11000){
							postsForm.errorBox.html('There is already a post with that title or slug').slideDown();	
						}else{
							postsForm.errorBox.html('Something went wrong, please try again later...').slideDown();
						}
						
					}else{
						postsForm.errorBox.html('Something went wrong, please try again later...').slideDown();
					}
				}
			},
			error: function(xhr, desc, err)
			{
				console.log(xhr, desc, err);
			}
		});

	});

});

// Updateing a post

postsForm.updateBtn.on('click', function(){
	postsForm.updateForm(function(){

		const postid = $('#datablock').data('postid');

		// const catArray = getCheckedCats();

		const indArray = getCheckedTax('industry');
		const outArray = getCheckedTax('outcome');
		const eleArray = getCheckedTax('element');
		const pubArray = getCheckedTax('publisher');

		const colArray = getCheckedTax('collection');

		let feat_img = '';
		
		if($('#featImg_container img').attr('src') != undefined){
			feat_img = $('#featImg_container img').attr('src');
		}

		const useContentBlocks = $('#cb_toggle').prop('checked');
		let theBody = '';

		if(useContentBlocks){

			const contentBlocks = $('#content_block_list li .contentBlock');

			let cbArray = [];

			contentBlocks.each(function(){
				let blocktype = $(this).data('content_type');
				let blockvalue = '';

				if(blocktype == 'Image'){
					blockvalue = $($(this).children()[2]).attr('src');
				}else{
					blockvalue = $($(this).children()[2]).val();
				}

				const cbObj = {
					blocktype: blocktype,
					blockvalue: blockvalue
				};
				cbArray.push(cbObj);
			});

			theBody = JSON.stringify(cbArray); // cbArray stringified
	
		}else{
			theBody = postsForm.requiredFeilds[2].elem.summernote('code');
		}

		postsForm.disableSubmit();

		$.ajax({
			url: '/admin/api/update_post',
			type: 'POST',
			// dataType: 'json',
			data:
			{
				postid: postid,
				title: postsForm.requiredFeilds[0].value,
				slug: postsForm.requiredFeilds[1].value,
				body: theBody,
				// categories: JSON.stringify(catArray),
				industries: JSON.stringify(indArray),
				outcomes: JSON.stringify(outArray),
				elements: JSON.stringify(eleArray),
				publishers: JSON.stringify(pubArray),
				collections: JSON.stringify(colArray),
				feat_img: feat_img
			},
			success: function(data)
			{
				postsForm.enableSubmit();

				console.log(data);

				if(data.success == '1'){
					postsForm.successBox.html('Post Updated').slideDown();
				}else{
					postsForm.errorBox.html('Something went wrong, please try again later...').slideDown();
				}
			},
			error: function(xhr, desc, err)
			{
				console.log(xhr, desc, err);
			}
		});

	});

});


$('#delete_btn').on('click', function(){

	const postid = $('#datablock').data('postid');

	const popup = new Popup(
		// positive
		function(){
			delete_thing('post', postid, '/admin/posts', postsForm);
		}, 
		// negitive
		function(){
			popup.popDown();
		}
	);

	popup.popUp('Are you sure you want to delete this Post?');

});

// Posts Page 

$('#post_list').on('click', '.delete', function(){

	const postid = $(this).data('postid');

	const popup = new Popup(
		// positive
		function(){
			delete_thing('post', postid, '/admin/posts', postsForm);
		}, 
		// negitive
		function(){
			popup.popDown();
		}
	);

	popup.popUp('Are you sure you want to delete this Post?');

});










class Taxonomy {

	addTax(tax_form, tax_name, tax_list){
		tax_form.sendBtn.on('click', function(){
			tax_form.sendForm(function(){

				$.ajax({
					url: '/admin/api/add_' + tax_name,
					type: 'POST',
					// dataType: 'json',
					data:
					{
						name: tax_form.requiredFeilds[0].value,
						description: tax_form.requiredFeilds[1].value
					},
					success: function(data)
					{

						console.log(data);

						tax_form.enableSubmit();
						if(data.success == '1'){

							tax_form.successBox.html(tax_name + ' Created').slideDown();

							// console.log(data);
							
							let newCat = '<li>';
							newCat += '<input type="checkbox">';
							newCat += '<label>' + data.catname + '</label>';
							newCat += '<ul class="list">';
							newCat += '<li>';
							newCat += '<span class="delbtn deletecat" data-catid="' + data.catid + '">Delete</span>';
							newCat += '</li>';
							newCat += '<li>';
							newCat += '<a>Edit</a>';
							newCat += '</li>';
							newCat += '</ul>';
							newCat += '</li>';

							tax_list.prepend(newCat);

						}else{
							if(data.error){
								// const displayError = makeErrorReadable(data.error);
								if(data.error.code == 11000){
									tax_form.errorBox.html('There is already a ' + tax_name + ' with that name').slideDown();	
								}else{
									tax_form.errorBox.html('Something went wrong, please try again later...').slideDown();
								}
								
							}else{
								tax_form.errorBox.html('Something went wrong, please try again later...').slideDown();
							}
						}
					},
					error: function(xhr, desc, err)
					{
						console.log(xhr, desc, err);
					}
				});

			});
		});

	}

	deleteTaxItem(tax_form, tax_name){
		$('body').on('click', '.deletecat', function(){
			const catid = $(this).data('catid');
			const thisli = $(this).parent().parent().parent();

			const popup = new Popup(
				// positive
				function(){
					delete_thing(tax_name, catid, '', tax_form, function(){
						thisli.remove();
						popup.popDown();
					});
				},
				// negitive
				function(){
					popup.popDown();
				}
			);

			popup.popUp('Are you sure you want to delete this ' + tax_name + '?');

		});
	}

	constructor(tax_name, tax_form, tax_list){
		this.tax_name = tax_name;
		this.tax_form = tax_form;
		this.tax_list = tax_list;
		this.addTax(this.tax_form, this.tax_name, this.tax_list);
		this.deleteTaxItem(this.tax_form, this.tax_name);
	}

}

/* Categories Could put code below in own category.js */

$('.expand_addcatbox').on('click', function(){

	if($(this).hasClass('expanded')){
		$(this).next().slideUp(200);
		$(this).removeClass('expanded');	
	}else{
		$(this).next().slideDown(200);
		$(this).addClass('expanded');
	}
	
});

const industryForm = new Form(forminfo.industry_form);
const industry = new Taxonomy('industry', industryForm, $('#industry_list'));

const outcomeForm = new Form(forminfo.outcome_form);
const outcome = new Taxonomy('outcome', outcomeForm, $('#outcome_list'));

const elementForm = new Form(forminfo.element_form);
const element = new Taxonomy('element', elementForm, $('#element_list'));

const publisherForm = new Form(forminfo.publisher_form);
const publisher = new Taxonomy('publisher', publisherForm, $('#publisher_list'));





function displayUploadedImg(imgLink){

	const imgTag = '<img src="https://6omedia.s3.amazonaws.com/' + imgLink + '">';
	// const imgTag = '';
	$('#featImg_container').append(imgTag);
	$('#featImg_container > p').remove();
	$('#upload_box').hide();

}

const imgUploader = new ImageUploader($('#upload-input'), $('#upload_btn'), $('#feat_img_prog'), 'posts');

imgUploader.fileInput.on('click', function(){
	imgUploader.resetProgress();
});

imgUploader.uploadBtn.on('click', function(){
	imgUploader.uploadFile(function(filename){
		displayUploadedImg(filename);
	});
});

$('#remove_img').on('click', function(){
	$(this).next().remove();
	$('#upload_box').show();
	imgUploader.resetProgress();
	$('#upload-input').val('');
});

// Content Type Toggle

$('#cb_toggle').on('click', function(){

	if($(this).prop('checked')){
		$('#q_content').summernote('destroy');
		$('#q_content').hide();
		$('#cb').show();
	}else{
		$('#q_content').summernote({
	    	height: 300
	    });
	    $('#cb').hide();
	}

});

$('.contentBlock .remove').on('click', function(){
	$(this).parent().parent().remove();
});

$('.htmlEdit').keydown(function (e){
    var keycode1 = (e.keyCode ? e.keyCode : e.which);
    if (keycode1 == 0 || keycode1 == 9) {
        e.preventDefault();
        e.stopPropagation();
    }
});

const controls = new CbControls($('#content_block_list'), $('.post_section_menu'));

const types = [
	'Plain Text',
	'HTML',
	'Image',
	'Video'
];

controls.createButtons(types);

