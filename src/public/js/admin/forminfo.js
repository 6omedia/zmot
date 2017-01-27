const forminfo = {
	business_form: {
		sendBtn: $('#send_btn'),
		updateBtn: $('#update_btn'),
		deleteBtn: $('#delete_btn'),
		errorBox: $('#error_box'),
		successBox: $('#successBox'),
		spinImg: $('#spin'),
		requiredFeilds: [
			{
				feildName: 'name',
				elem: $('#q_name'),
				value: '',
				error: 'Business Name required',
				required: true
			},
			{
				feildName: 'website',
				elem: $('#q_website'),
				value: '',
				required: false
			},
			{
				feildName: 'phone',
				elem: $('#q_phone'),
				value: '',
				error: 'Phone number required',
				required: true
			},
			{
				feildName: 'email',
				elem: $('#q_email'),
				value: '',
				error: 'Email required',
				required: true
			},
			{
				feildName: 'first line of address',
				elem: $('#q_addresslineone'),
				value: '',
				error: 'Fist line of address required',
				required: true
			},
			{
				feildName: 'town',
				elem: $('#q_town'),
				value: '',
				error: 'Town or city required',
				required: true
			},
			{
				feildName: 'post code',
				elem: $('#q_postcode'),
				value: '',
				error: 'Phone number required',
				required: true
			},
			{
				feildName: 'industry',
				elem: $('#q_industry'),
				value: '',
				error: 'Industry required',
				required: true
			},
			{
				feildName: 'opening hours',
				elem: $('#q_openinghours'),
				value: '',
				error: 'Opening hours required',
				required: true
			},
			{
				feildName: 'service one',
				elem: $('#q_service1'),
				value: '',
				error: 'Please select at least one service',
				required: true
			},
			{
				feildName: 'service two',
				elem: $('#q_service2'),
				value: '',
				required: false
			},
			{
				feildName: 'service three',
				elem: $('#q_service3'),
				value: '',
				required: false
			},
			{
				feildName: 'facebook',
				elem: $('#q_fb'),
				value: '',
				required: false
			},
			{
				feildName: 'twitter',
				elem: $('#q_tw'),
				value: '',
				required: false
			},
			{
				feildName: 'instagram',
				elem: $('#q_in'),
				value: '',
				required: false
			},
			{
				feildName: 'youtube',
				elem: $('#q_yt'),
				value: '',
				required: false
			},
			{
				feildName: 'linked in',
				elem: $('#q_li'),
				value: '',
				required: false
			}
		]
	},
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
	}
}


