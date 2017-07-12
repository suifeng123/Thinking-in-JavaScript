/**
 * Created by Administrator on 2017/7/12.
 */
//��ʼ��������
function instantiateReactComponent(node,parentCompositeType){
    var instance;
    //�����
    if(node===null || node ===false){
        instance = ReactEmptyComponent.create(instantiateReactComponent);
    }

    if(typeof node==='object') {
        var element = node;
        if (typeof element.type === 'string') {
            //DOM��ǩ��ReactDOMReact)
            instance = ReactNativeComponent.createInternalComponent(element);
        } else if (isInternalComponentType(element.type)) {
            //�����ַ�����ʾ���Զ���������޷�ʹ�ã��˴������������ʼ������
            instance = new element.type(element);
        }
        else {
            instance = ReactCompositeComponentWrapper(element)
        }
    }else if(typeof node==='string' || typeof node==='number'){
        //�ַ����������ֵ����
        instance = ReactNativeComponent.createInstanceForText(node);
    }else{
        //�����κδ���
    }
    //����ʵ��
    instance.constructor(node);
    //��ʼ������
    instance._mountIndex = 0;
    instance._mountImage = null;

    return instance;
}