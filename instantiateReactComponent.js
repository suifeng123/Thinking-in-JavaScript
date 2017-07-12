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

//创建文本组件，这里是ReactText,并不是ReactElement
var ReactDOMTextComponent = function(text){
    //保存当前的字符串
    this._currentElement = text;
    this._stringText = ''+text;

    //ReactDOMComponentTree需要的参数
    this._nativeNode = null;
    this._nativeReact = null;

    //属性
    this._domID = null;
    this._mountIndex = 0;
    this._closingComment = null;
    this._commentNodes = null;

};

Object.assign(ReactDOMTextComponent.prototype,{
    mountComponent: function(transaction,nativeParent,nativeContainerInfo,context){
        var domID = nativeContainerInfo._idCounter++;
        var openingValue = ' react-text: '+ domID + ' ';
        var closingValue = ' /react-text ';
        this._domID = domID;
        this._nativeParent = nativeParent;

        //如果使用createElment创建标签文本，则该文本会带上标签和 domID
        if(transaction.useCreateElment) {
            var ownerDocument = nativeContainerInfo._ownerDocument;
            var openingComment = ownerDocument.createComment(openingValue);
            var closingComment = ownerDocument.createComment(closingValue);
            var lazyTree = DOMLazyTree(ownerDocument.createDocumentFragment());
            //开始标签
            DOMLazyTree.queueChild(lazyTree,DOMLazyTree(openingComment));
            //如果是文本类型，则创建文本节点
            if(this._stringText){
                DOMLazyTree.queueChild(lazyTree,DOMLazyTree(ownerDocument.createTextNode(this._stringText)))
            }
            //结束标签
            DOMLazyTree.queueChild(lazyTree,DOMLazyTree(closingComment));
            ReactDOMTextComponent.precacheNode(this,openingComment);
            this._closingComment = closingComment;
            return lazyTree;
        }else{
            var escapedText = escapedTextContentForBrowser(this._stringText);
            //静态页面下直接返回文本
            if(transaction.renderToStaticMarkup){
                return escapedText;
            }
            //如果不是通过createElement 创建的文本，则将标签和属性注释掉，直接返回文本内容
            return (
                '<!--'+ openingValue + '-->'+escapedText + '<!--'+closingValue + '-->'
            );
        }
    },
    //更新文本内容
    receiveComponent: function(nextComponent,transition){
        if(nextText !== this._currentElement) {
            this._currentElement = nextText;
            var nextStringText = '' + nextText;
            if(nextStringText !== this._stringText){
                this._stringText = nextStringText;
                var commentNodes = this.getNativeNode();

                DOMChildrenOperations.replaceDelimitedText(commentNodes[0],commentNodes[1],nextStringText);
            }
        }
    }
})