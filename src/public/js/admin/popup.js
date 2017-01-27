class Popup {

	popUp(message, customform){

		let e_modal = $( document.createElement('div')).addClass('c_modal');
		let e_box = $( document.createElement('div')).addClass('box');
		let e_message = $(document.createElement('p')).html(message);
		const yesBtn = $( document.createElement('button')).html('Yes');
		const noBtn = $( document.createElement('button')).html('No');

		e_box.append(e_message);
		e_box.append(yesBtn);
		e_box.append(noBtn);
		e_modal.append(e_box);

		// let modal = '<div class="c_modal">';
		// modal += '<div class="box">';
		// modal += '<p>' + message + '</p>';

		// console.log(customform);

		if(customform !== undefined){
		 //	modal += customform;
		}else{
			// const yesBtn = $( document.createElement('button'));
			// const noBtn = $( document.createElement('button'));
			// // modal += '<button id="yes_btn">Yes</button>';
			// // modal += '<button id="no_btn">No</button>';
			// $(modal).append(yesBtn);
			// modal += noBtn;
		}

		// modal += '</div>';
		// modal += '</div>';

		$('body').append(e_modal);

		const thisClass = this;

		$('.c_modal').on('click', function(e){

			if($(e.target).is('.box') || $(e.target).is('button') || $(e.target).is('input')){
	            e.preventDefault();
	            return;
	        }

			thisClass.popDown();
		});

		yesBtn.on('click', function(){
			thisClass.positiveFunc();
		});
		noBtn.on('click', function(){
			thisClass.negativeFunc();
		});

		// if(customform !== undefined){
		// 	this.positiveFunc();
		// }

	}

	popDown(){

		console.log('popdocdcsdwn');
		$('.c_modal').remove();
		$('.c_modal').off();

	}

	constructor(positiveFunc, negativeFunc){
		this.positiveFunc = positiveFunc;
		this.negativeFunc = negativeFunc;
	}

}