/**
 * Created by Administrator on 2017/6/26.
 */
var data = {name:'James'};
observe(data);
data.name = "asdf"; //���������ݱ仯

function observe(data){
    if(!data || typeof data !== 'object') {
        return
    }
    //ȡ���������Ա���
    Object.keys(data).forEach(function(key){
       defineReactive(data,key,data[key]);
    });
};

function defineReactive(data,key,val){
    observe(val);// ����������
    Object.defineProperty(data,key,{
        enumerable: true,// ��ö��
        configurable: false,//�������¶���
        get: function() {
            return val;
        },
        set: function(newVal){
            console.log('��������������ֵ�仯��',val,'-->',newVal);
            val = newVal;
        }
    })
}