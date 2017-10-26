/**
 * Created by Administrator on 2017/6/26.
 */
var data = {name:'James'};
observe(data);
data.name = "asdf"; //监听到数据变化

function observe(data){
    if(!data || typeof data !== 'object') {
        return
    }
    //取出所有属性遍历
    Object.keys(data).forEach(function(key){
       defineReactive(data,key,data[key]);
    });
};

function defineReactive(data,key,val){
    observe(val);// 监听子属性
    Object.defineProperty(data,key,{
        enumerable: true,// 可枚举
        configurable: false,//不能重新定义
        get: function() {
            return val;
        },
        set: function(newVal){
            console.log('哈哈哈，监听到值变化了',val,'-->',newVal);
            val = newVal;
        }
    })
}