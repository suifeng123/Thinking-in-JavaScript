/**
 * Created by Administrator on 2017/7/12.
 */
//初始化入口组件
function instantiateReactComponent(node,parentCompositeType){
    var instance;
    //空组件
    if(node===null || node ===false){
        instance = ReactEmptyComponent.create(instantiateReactComponent);
    }

    if(typeof node==='object') {
        var element = node;
        if (typeof element.type === 'string') {
            //DOM标签（ReactDOMReact)
            instance = ReactNativeComponent.createInternalComponent(element);
        } else if (isInternalComponentType(element.type)) {
            //不是字符串表示的自定义组件暂无法使用，此处将不做组件初始化操作
            instance = new element.type(element);
        }
        else {
            instance = ReactCompositeComponentWrapper(element)
        }
    }else if(typeof node==='string' || typeof node==='number'){
        //字符串或者数字的情况
        instance = ReactNativeComponent.createInstanceForText(node);
    }else{
        //不做任何处理
    }
    //设置实例
    instance.constructor(node);
    //初始化参数
    instance._mountIndex = 0;
    instance._mountImage = null;

    return instance;
}