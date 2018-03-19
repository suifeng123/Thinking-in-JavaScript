/**
 * Created by Administrator on 2017/6/6.
 */
var strategies = {
    "S": function (salary) {
        return salary*4;
    },
    "A": function (salary) {
        return salary*3;
    },
    "B": function(salary){
        return salary*2;
    }
};

var calucateBonus = function(level,salary){
    return strategies[level](salary);
};
console.log(calucateBonus('S',29000));
console.log(calucateBonus('A',3000));