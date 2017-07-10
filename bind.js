/**
 * Created by Administrator on 2017/7/10.
 */
var someUser = {
    name:'ifivh',
    func: function(words){
        console.log(this.name+'  say  '+words);
    }
};

var foo = {
    name:'hahah',
};

foo.func = someUser.func;
foo.func("asdf");
foo.func1 = someUser.func.bind(someUser); //°ó¶¨×÷ÓÃÓò
foo.func1("asfas");
func = someUser.func.bind(foo);
console.log(func in global);
func();