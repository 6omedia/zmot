!function(Awesomplete){

	function autoFilter(url, selector){

		var ajax = new XMLHttpRequest();
		ajax.open("GET", url, true);
		ajax.onload = function() {
			var list = JSON.parse(ajax.responseText).map(function(i) { return i.name; });
			new Awesomplete(document.querySelector(selector),{ list: list });
		};
		ajax.send();

	}

	function loadResults(industry, outcome, element, publisher){
		// fade and spin
		$('#post_list').css('opacity', '0.2');
		$('#postspin').show();
		// get results from server
		$.ajax({
			url: '/admin/api/filtered_posts',
			type: 'POST',
			// dataType: 'json',
			data:
			{
				industries: industry,
				outcome: outcome,
				element: element,
				publisher: publisher
			},
			success: function(data)
			{
				$('#post_list').css('opacity', '1');
				$('#post_list').empty();
				$('#postspin').hide();
				renderPosts(data);
			},
			error: function(xhr, desc, err)
			{

			}
		});
		// display results
	}

	function renderPosts(data){

		let string = '';

		for(let i=0; i<data.length; i++){
			string += '<li>';
			string += '<div class="imgBox">';
			string += '<img src="' + data[i].feat_img + '">';
			string += '</div>';
			string += '<a href="/admin/posts/single/' + data[i]._id + '">' + data[i].title + '</a>';
			string += '<a href="/admin/posts/' + data[i]._id + '">Edit Post</a>';
			string += '<span class="delete delBtn" data-postid="' + data[i]._id + '">x</span>';
			string += '</li>';
		}

		$('#post_list').append(string);

	}

	autoFilter("/admin/api/get_industries", "#industry_filter");
	autoFilter("/admin/api/get_outcomes", "#outcome_filter");
	autoFilter("/admin/api/get_elements", "#element_filter");
	autoFilter("/admin/api/get_publishers", "#publisher_filter");

	$('.filter').on('blur', function(){

		const industry = $('#industry_filter').val();
		const outcome = $('#outcome_filter').val();
		const element = $('#element_filter').val();
		const publisher = $('#publisher_filter').val();

		loadResults(industry, outcome, element, publisher);
	
	});

}(Awesomplete);


// Search

// $('#go').on('click', function(){
// 	const industry = $('#input_industry').val();
// 	const town = $('#input_town').val();
// 	const link = '/find/' + industry + '/' + town;
// 	window.location.replace(link);
// });