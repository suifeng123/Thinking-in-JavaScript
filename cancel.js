function cancelHandler(event) {
	var event = event || window.event;

	/* �����Ǵ����¼��Ĵ���*/

	//������ȡ���¼�����ص�Ĭ����Ϊ*/
	if(event.preventDefault) event.preventDefault();
	if(event.returncode) event.returnValue = false;//IE
	return false;
}