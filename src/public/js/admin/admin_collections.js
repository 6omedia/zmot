
!function(Awesomplete, Form){

	const addPostBtn = $('#add_collection_post');
	const postSearch = $('#posts_search');
	const list = $('#collectionPostList');

	function autoFilter(url, selector){

		var ajax = new XMLHttpRequest();
		ajax.open("GET", url, true);
		ajax.onload = function(){
			var list = JSON.parse(ajax.responseText).map(function(i) { return i.title; });
			console.log(list);
			new Awesomplete(document.querySelector(selector),{ list: list });
		};
		ajax.send();

	}

	addPostBtn.on('click', function(){

		const post = postSearch.val();
		if(post != ''){

			let string = '<li data-post="' + post + '">';
			string += '<span class="delBtn">-</span>';
			string += post;
			string += '</li>';

			list.append(string);
		}

		postSearch.val('');

	});

	autoFilter("/admin/api/get_posts", "#posts_search");

	$('#collectionPostList').on('click', '.delBtn', function(){
		$(this).parent().remove();
	});

	const collectionsForm = new Form(forminfo.collections_form);

	/*************************

		New Collection

	**************************/

	collectionsForm.sendBtn.on('click', function(){
		collectionsForm.sendForm(function(){

			// const posts = [];

			// $('#collectionPostList li').each(function(index){
			// 	posts.push($(this).data('post'));
			// });

			$.ajax({
				url: '/admin/api/add_collection',
				type: 'POST',
				// dataType: 'json',
				data:
				{
					name: collectionsForm.requiredFeilds[0].value,
					description: collectionsForm.requiredFeilds[1].value
					// posts: JSON.stringify(posts)
				},
				success: function(data)
				{
					collectionsForm.enableSubmit();
					if(data.success == '1'){

						collectionsForm.successBox.html('Collection Created').slideDown();

						// console.log(data);

					}else{
						if(data.error){
							// const displayError = makeErrorReadable(data.error);
							// console.log('Error: ', data.error);

							if(data.error.code == 11000){
								collectionsForm.errorBox.html('There is already a collection with that name').slideDown();	
							}else{
								collectionsForm.errorBox.html('Something went wrong, please try again later...').slideDown();
							}
							
						}else{
							collectionsForm.errorBox.html('Something went wrong, please try again later...').slideDown();
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

	/*************************

		Edit Collection

	**************************/

	collectionsForm.updateBtn.on('click', function(){
		collectionsForm.updateForm(function(){

			const collectionid = $('#datablock').data('collectionid');

			// const posts = [];

			// $('#collectionPostList li').each(function(index){
			// 	posts.push($(this).data('post'));
			// });

			$.ajax({
				url: '/admin/api/update_collection',
				type: 'POST',
				// dataType: 'json',
				data:
				{
					name: collectionsForm.requiredFeilds[0].value,
					description: collectionsForm.requiredFeilds[1].value,
				//	posts: JSON.stringify(posts),
					collectionid: collectionid
				},
				success: function(data)
				{
					collectionsForm.enableSubmit();
					// console.log(data);
					if(data.success == '1'){
						collectionsForm.successBox.html('Post Updated').slideDown();
					}else{
						collectionsForm.errorBox.html('Something went wrong, please try again later...').slideDown();
					}
				},
				error: function(xhr, desc, err)
				{
					console.log(xhr, desc, err);
				}
			});

		});
	});	

	$('.delete').on('click', function(){

		const collectionid = $(this).data('collectionid');

		const popup = new Popup(
			// positive
			function(){
				delete_thing('collection', collectionid, '/admin/collections', collectionsForm);
			}, 
			// negitive
			function(){
				popup.popDown();
			}
		);

		popup.popUp('Are you sure you want to delete this Post?');

	});

	$('#delete_btn').on('click', function(){

		const collectionid = $('#datablock').data('collectionid');

		const popup = new Popup(
			// positive
			function(){
				delete_thing('collection', collectionid, '/admin/collections', collectionsForm);
			}, 
			// negitive
			function(){
				popup.popDown();
			}
		);

		popup.popUp('Are you sure you want to delete this collection?');

	});
	
}(Awesomplete, Form)
