function addEvent(target,type,handler){
	if(target.addEventListener){
		target.addEvent(type,handler,false);
	}else{
		target.attachEvent("on"+type,function(event){
			//�Ѵ��������Ϊ�¼�Ŀ��ķ�������
			//�����¼�����
			return handler.call(target,event);
		});
	}