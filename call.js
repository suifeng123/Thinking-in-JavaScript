/**
 * Created by Administrator on 2017/7/10.
 */
var mouse = {
    name:'jack',
    say: function(words){
        console.log(this.name +'says'+words);
    }
};
var foo = {
    name:'wang',
}

mouse.say.call(foo,'nihao');