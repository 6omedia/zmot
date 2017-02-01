const forminfo = {
	posts_form: {
		sendBtn: $('#send_btn'),
		updateBtn: $('#update_btn'),
		errorBox: $('#error_box'),
		successBox: $('#successBox'),
		spinImg: $('#spin'),
		requiredFeilds: [
			{
				feildName: 'title',
				elem: $('#q_title'),
				value: '',
				error: 'Title required',
				required: true
			},
			{
				feildName: 'slug',
				elem: $('#q_slug'),
				value: '',
				error: 'Slug required',
				required: true
			},
			{
				feildName: 'content',
				elem: $('#q_content'),
				value: '',
				required: false
			},
			{
				feildName: 'Featured Image',
				elem: $('#featImg_container img'),
				value: '',
				required: false
			}
		]
	},
	industry_form: {
		sendBtn: $('#add_industry'),
		updateBtn: $('#update_industry_btn'),
		errorBox: $('#industry_err'),
		successBox: $('#industry_success'),
		spinImg: $('#spinindustry'),
		requiredFeilds: [
			{
				feildName: 'Industry Name',
				elem: $('#q_industryname'),
				value: '',
				error: 'Name required',
				required: true
			},
			{
				feildName: 'Industry Description',
				elem: $('#q_industry_description'),
				value: '',
				required: false
			}
		]
	},
	outcome_form: {
		sendBtn: $('#add_outcome'),
		updateBtn: $('#update_outcome_btn'),
		errorBox: $('#outcome_err'),
		successBox: $('#outcome_success'),
		spinImg: $('#spinoutcome'),
		requiredFeilds: [
			{
				feildName: 'Outcome Name',
				elem: $('#q_outcomename'),
				value: '',
				error: 'Name required',
				required: true
			},
			{
				feildName: 'Outcome Description',
				elem: $('#q_outcome_description'),
				value: '',
				required: false
			}
		]
	},
	element_form: {
		sendBtn: $('#add_element'),
		updateBtn: $('#update_element_btn'),
		errorBox: $('#element_err'),
		successBox: $('#element_success'),
		spinImg: $('#spinelement'),
		requiredFeilds: [
			{
				feildName: 'Element Name',
				elem: $('#q_elementname'),
				value: '',
				error: 'Name required',
				required: true
			},
			{
				feildName: 'Element Description',
				elem: $('#q_element_description'),
				value: '',
				required: false
			}
		]
	},
	publisher_form: {
		sendBtn: $('#add_publisher'),
		updateBtn: $('#update_publisher_btn'),
		errorBox: $('#publisher_err'),
		successBox: $('#publisher_success'),
		spinImg: $('#spinpublisher'),
		requiredFeilds: [
			{
				feildName: 'Publisher Name',
				elem: $('#q_publishername'),
				value: '',
				error: 'Name required',
				required: true
			},
			{
				feildName: 'Publisher Description',
				elem: $('#q_publisher_description'),
				value: '',
				required: false
			}
		]
	},
	users_form: {
		sendBtn: $('#send_btn'),
		updateBtn: $('#update_btn'),
		errorBox: $('#error_box'),
		successBox: $('#successBox'),
		spinImg: $('#spin'),
		requiredFeilds: [
			{
				feildName: 'Full Name',
				elem: $('#q_name'),
				value: '',
				error: 'Name required',
				required: true
			},
			{
				feildName: 'Email',
				elem: $('#q_email'),
				value: '',
				error: 'Email required',
				required: true
			},
			{
				feildName: 'Password',
				elem: $('#q_password'),
				value: '',
				error: 'Password required',
				required: true
			},
			{
				feildName: 'Confirm Password',
				elem: $('#q_passwordconfirm'),
				value: '',
				error: 'Passwords are empty or do not match',
				required: true
			}
		]
	},
	collections_form: {
		sendBtn: $('#send_btn'),
		updateBtn: $('#update_btn'),
		errorBox: $('#error_box'),
		successBox: $('#successBox'),
		spinImg: $('#spin'),
		requiredFeilds: [
			{
				feildName: 'Collection Name',
				elem: $('#q_title'),
				value: '',
				error: 'Collection Name required',
				required: true
			},
			{
				feildName: 'Collection Description',
				elem: $('#q_description'),
				value: '',
				required: false
			}
		]
	}
}