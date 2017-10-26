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

//�����ı������������ReactText,������ReactElement
var ReactDOMTextComponent = function(text){
    //���浱ǰ���ַ���
    this._currentElement = text;
    this._stringText = ''+text;

    //ReactDOMComponentTree��Ҫ�Ĳ���
    this._nativeNode = null;
    this._nativeReact = null;

    //����
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

        //���ʹ��createElment������ǩ�ı�������ı�����ϱ�ǩ�� domID
        if(transaction.useCreateElment) {
            var ownerDocument = nativeContainerInfo._ownerDocument;
            var openingComment = ownerDocument.createComment(openingValue);
            var closingComment = ownerDocument.createComment(closingValue);
            var lazyTree = DOMLazyTree(ownerDocument.createDocumentFragment());
            //��ʼ��ǩ
            DOMLazyTree.queueChild(lazyTree,DOMLazyTree(openingComment));
            //������ı����ͣ��򴴽��ı��ڵ�
            if(this._stringText){
                DOMLazyTree.queueChild(lazyTree,DOMLazyTree(ownerDocument.createTextNode(this._stringText)))
            }
            //������ǩ
            DOMLazyTree.queueChild(lazyTree,DOMLazyTree(closingComment));
            ReactDOMTextComponent.precacheNode(this,openingComment);
            this._closingComment = closingComment;
            return lazyTree;
        }else{
            var escapedText = escapedTextContentForBrowser(this._stringText);
            //��̬ҳ����ֱ�ӷ����ı�
            if(transaction.renderToStaticMarkup){
                return escapedText;
            }
            //�������ͨ��createElement �������ı����򽫱�ǩ������ע�͵���ֱ�ӷ����ı�����
            return (
                '<!--'+ openingValue + '-->'+escapedText + '<!--'+closingValue + '-->'
            );
        }
    },
    //�����ı�����
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
        //ƴ�ճ�����
        for(var propKey in props){
            var propValue = props[propKey];

            if(registrationNameModules.hasOwnProperty(propKey)){
                //��Ե�ǰ�Ľڵ�����¼�����
                if(propValue){
                    enqueuePutListener(this,propKey,propValue,transaction);
                }
            }else {
                if(propKey === STYLE){
                    if(propValue){
                        //�ϲ���ʽ
                        propValue = this._previousStyleCopy = Object.assign({},props.style);
                    }
                    propValue = CSSPropertyOperations.createMarkupForStyles(propValue,this);
                }
                //�������Ա�ʶ
                var markup = null;
                if(this._tag != null &&  isCustomComponent(this._tag,props)){
                    markup = DOMPropertyOperations.createMarkupForProperty(propKey,propValue);
                }

                if(markup) {
                    ret += ' '+markup;
                }
            }
        }
        //���ھ�̬ҳ�棬����Ҫ����react-id,�������Խ�ʡ�����ֽ�
        if(transaction.renderToStaticMarkup){
            return ret;
        }
        //����react-id
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

        //��һ���ɵ����Բ����µ����Լ����е�ʱ����Ҫɾ��
        for(propKey in lastProps) {
            if(nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey)
            || lastProps[propKey]==null){
                continue;
            }
            //��DOM��ɾ������Ҫ����ʽ
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
                    // ������¼�������������Ҫȥ����Ͳ����Ե�ǰ�Ľڵ�ȡ���¼�����
                    deleteListener(this,propKey);
                }
            }else if(DOMProperty.isStandardName[propKey]||DOMProperty.isCustomAttribute(propKey)){
                //��DOM��ɾ������Ҫ������
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

    //�����������������ģʽ
    if(!batchingStrategy.isBatchingUpdates) {
        batchingStrategy.batchedUpdates(enqueueUpdate,component);
        return;
    }

    //���������������ģʽ���򽫸����������dirtyComponents
    dirtyComponents.push(component);
}

var Transaction = require('./Transaction');

//�����Լ����������
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

    //���������prevChildren �� nextChildren,����diff����
    if(!nextChildren && !prevChildren){
        return;
    }
    var updates = null;
    var name;
    //lastIndex �� prevChildren ������������nextIndex �� nextChildren��ÿ���ڵ������
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
            //�ƶ��ڵ�
            updates = enqueue(
                updates,
                this.moveChild(prevChild,lastPlaceNode,nextIndex,lastIndex);

            );
            lastIndex = Math.max(prevChild._mountIndex,lastIndex);
        }
    }
}