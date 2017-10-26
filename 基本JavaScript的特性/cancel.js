function cancelHandler(event) {
	var event = event || window.event;

	/* 这里是处理事件的代码*/

	//现在是取消事件的相关的默认行为*/
	if(event.preventDefault) event.preventDefault();
	if(event.returncode) event.returnValue = false;//IE
	return false;
}