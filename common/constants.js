function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}
//Status Code
define("CODE_SUCCESS",1)
define("CODE_FAIL",2)

//Response Message
define("MESSAGE_GET_SUCCESS","Get item list successfully");
define("MESSAGE_GET_ERROR","Fail to get item list");
define("MESSAGE_UPDATE_SUCCESS","Update item successfully");
define("MESSAGE_UPDATE_ERROR","Fail to update item");
define("MESSAGE_DELETE_SUCCESS","Delete item successfully");
define("MESSAGE_DELETE_ERROR","Fail to delete item");
define("MESSAGE_PARAMS_ERROR","Request parameters error");