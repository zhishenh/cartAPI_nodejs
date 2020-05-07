const express = require('express');
const router = express.Router();
const CartItem = require('../model/cartItemModel');
const url = require('url')
const CONSTANTS = require('../common/constants');
const commonRespose = require('../common/response');

function validateID(user_id){
	console.log("Validate user ID:" + user_id);
}

/*
Handle HTTP GET method
Get all items in the cart
*/
router.get('/', async(req, res)=>{
	// Validate parameters
	const queryObject = url.parse(req.url, true).query;
	let params = JSON.parse(JSON.stringify(queryObject));
	if(!params.hasOwnProperty('user_id')){
		res.json(commonRespose.create(CONSTANTS.CODE_FAIL, CONSTANTS.MESSAGE_PARAMS_ERROR, {}));
		return;
	}
	validateID(params['user_id']);

	// Get item list
	try{
		const cartItem = await CartItem.find({
			user_id: queryObject['user_id']},
			{_id:0, update_dtm:0, __v:0});
		res.json(commonRespose.create(CONSTANTS.CODE_SUCCESS,CONSTANTS.MESSAGE_GET_SUCCESS,cartItem));
	}catch(err){
		console.log(err);
		res.json(commonRespose.create(CONSTANTS.CODE_ERROR,CONSTANTS.MESSAGE_GET_ERROR,{}));
	}
})

/*
Handle HTTP POST method
UPDATE a specific item in the cart
*/
router.post('', async(req, res) =>{
	// Validate parameters
	let params = req.body;
	if(!params.hasOwnProperty('user_id') || !params.hasOwnProperty('item_number') || !params.hasOwnProperty('qty') ){
		res.json(commonRespose.create(CONSTANTS.CODE_FAIL, CONSTANTS.MESSAGE_PARAMS_ERROR, {}));
		return;
	}
	user_id = params.user_id;
	item_number = params.item_number;
	qty = params.qty;
	validateID(user_id);

	// Update qty of a specific item
	try{
		let currentItem = await CartItem.findOne({user_id: user_id, item_number:item_number}).lean(true);
		if(currentItem == null){
			let item = new CartItem({user_id: user_id,
									item_number: item_number,
									qty:qty});
			await item.save();
			res.json(commonRespose.create(CONSTANTS.CODE_SUCCESS,CONSTANTS.MESSAGE_UPDATE_SUCCESS,{}));
			return;
		}
		let currentQty = JSON.parse(JSON.stringify(currentItem)).qty;
		if(currentQty + qty <= 0){
			await CartItem.deleteOne({user_id: user_id, item_number: item_number});
		}else{
			await CartItem.updateOne({user_id: user_id, item_number:item_number},{$set:{qty: currentQty+qty}});
		}

		res.json(commonRespose.create(CONSTANTS.CODE_SUCCESS,CONSTANTS.MESSAGE_UPDATE_SUCCESS,{}));
	}catch(err){
		res.json(commonRespose.create(CONSTANTS.CODE_FAIL,CONSTANTS.MESSAGE_UPDATE_ERROR,{err:err}));
	}
})

/*
Handle HTTP DELETE method
Delete a specific item in the cart
*/
router.delete('', async(req, res) =>{
	// Validate parameters
	let params = req.body;
	if(!params.hasOwnProperty('user_id') || !params.hasOwnProperty('item_number')){
		res.json(commonRespose.create(CONSTANTS.CODE_FAIL, CONSTANTS.MESSAGE_PARAMS_ERROR, {}));
		return;
	}
	user_id = params['user_id'];
	item_number =params['item_number'];
	validateID(user_id);

	//delete a specific item
	try{
		await CartItem.deleteOne({user_id: user_id, item_number: item_number});
		res.json(commonRespose.create(CONSTANTS.CODE_SUCCESS,CONSTANTS.MESSAGE_DELETE_SUCCESS,{}));
	}catch(err){
		res.json(commonRespose.create(CONSTANTS.CODE_FAIL,CONSTANTS.MESSAGE_DELETE_ERROR,{
			err: err
		}));
	}

})

module.exports = router;
