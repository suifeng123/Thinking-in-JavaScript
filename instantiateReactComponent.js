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

    _createOpenTagMarkupAndPutListeners: function(transaction,props){
        var ret = '<' + this._currentElement.type;
        //拼凑出属性
        for(var propKey in props){
            var propValue = props[propKey];

            if(registrationNameModules.hasOwnProperty(propKey)){
                //针对当前的节点添加事件代理
                if(propValue){
                    enqueuePutListener(this,propKey,propValue,transaction);
                }
            }else {
                if(propKey === STYLE){
                    if(propValue){
                        //合并样式
                        propValue = this._previousStyleCopy = Object.assign({},props.style);
                    }
                    propValue = CSSPropertyOperations.createMarkupForStyles(propValue,this);
                }
                //创建属性标识
                var markup = null;
                if(this._tag != null &&  isCustomComponent(this._tag,props)){
                    markup = DOMPropertyOperations.createMarkupForProperty(propKey,propValue);
                }

                if(markup) {
                    ret += ' '+markup;
                }
            }
        }
        //对于静态页面，不需要设置react-id,这样可以节省大量字节
        if(transaction.renderToStaticMarkup){
            return ret;
        }
        //设置react-id
        if(!this._nativeParent){
            ret += ' '+ DOMPropertyOperations.createMarkupForRoot();
        }

        ret += ' '+DOMPropertyOperations.createMarkupForID(this._domID);

        return ret;


    }

    _updateDOMProperties: function(lastProps,nextProps,transaction) {
        var propKey;
        var styleName;
        var styleUpdates;

        //当一个旧的属性不在新的属性集合中的时候，需要删除
        for(propKey in lastProps) {
            if(nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey)
            || lastProps[propKey]==null){
                continue;
            }
            //从DOM上删除不需要的样式
            if(propKey === STYLE) {
                var lastStyle = this._previousStyleCopy;
                for(propKey in lastProps){
                    if(lastProps.hasOwnProperty(styleName)){
                        styleUpdates = styleUpdates || {};
                        styleUpdates[styleName] = '';
                    }
                }
                this._previousStyleCopy = null;
            }else if(registrationNameModules.hasOwnProperty(propKey)){
                if(lastProps[propKey]){
                    // 这里的事件监听的属性需要去掉箭筒，针对当前的节点取消事件代理
                    deleteListener(this,propKey);
                }
            }else if(DOMProperty.isStandardName[propKey]||DOMProperty.isCustomAttribute(propKey)){
                //从DOM上删除不需要的属性
                DOMPropertyOperations.deleteValueForProperty(getNode(this),propKey);
            }
        }
    }
})

ReactComponent.prototype.setState = function(partialState,callback){
    this.updater.enqueueSetState(this,partialState);
    if(callback) {
        this.updater.enqueueCallback(this,callback,'setState');
    }
};


function enqueueUpdate(component){
    ensureInjected();

    //如果不处于批量更新模式
    if(!batchingStrategy.isBatchingUpdates) {
        batchingStrategy.batchedUpdates(enqueueUpdate,component);
        return;
    }

    //如果处于批量更新模式，则将该组件保存在dirtyComponents
    dirtyComponents.push(component);
}

var Transaction = require('./Transaction');

//我们自己定义的事务
var MyTransaction = function() {
    //...

}

Object.assign(MyTransaction.prototype,Transaction.Mixin,{
    getTransactionWrappers: function() {
        return [{
            initialize: function(){
                console.log('before method perform');
            },
            close: function(){
                console.log('after method perform');
            }
        }];
    };
});

var transaction = new MyTransaction();
var testMethod = function() {
    console.log('test');
}

transaction.peform(testMethod);

updateChildren: function(nextNestedChildrenElements,transaction,context){
    updateDepth++;
    var errorThrown = true;
    try{
        this._updateChildren(nextNestedChildrenElements,transaction,context);
        errorThrown = false;
    }finally {
        updateDepth--;
        if(!updateDepth){
            if(errorThrown){
                clearQueue();
            }else{
                processQueue();
            }
        }
    }
}


function makeInsertMarkup(markup,afterNode,toIndex){
    return {
        type: ReactMultiChildUpdateTypes.INSERT_MARKUP,
        content: markup,
        fromIndex: null,
        fromNode:null,
        toIndex:toIndex,
        afterNode: afterNode
    };
}


_updateChildren: function(nextNestedChildrenElements,transation,context){
    var prevChildren = this._renderedChildren;
    var removeNodes = {};
    var nextChildren = this._reconcileUpdateChildren(prevChildren,nextNestedChildrenElements,
    removeNodes,transation,context);

    //如果不存在prevChildren 和 nextChildren,则不做diff处理
    if(!nextChildren && !prevChildren){
        return;
    }
    var updates = null;
    var name;
    //lastIndex 是 prevChildren 中最后的索引，nextIndex 是 nextChildren中每个节点的索引
    var lastIndex = 0;
    var nexrIndex = 0;
    var lastPlaceNode = null;

    for(name in nextChildren){
        if(!nextChildren.hasOwnProperty(name)){
            continue;
        }
        var prevChild = prevChild && prevChildren[name];
        var nextChild = nextChildren[name];
        if(prevChild === nextChild){
            //移动节点
            updates = enqueue(
                updates,
                this.moveChild(prevChild,lastPlaceNode,nextIndex,lastIndex);

            );
            lastIndex = Math.max(prevChild._mountIndex,lastIndex);
        }
    }
}