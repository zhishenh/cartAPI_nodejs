const mongoose = require('mongoose');

const cartItemModel = mongoose.Schema({
	user_id: Number,
	item_number: String,
	qty: Number,
	update_dtm: {
		type: Date,
		default: Date.now
	}

})

module.exports = mongoose.model('cartItem', cartItemModel);