//进行JSON搜索问题
let a = {
    name:"hehe"
};

let b = [
    {id: 1},
    {id: 2}
];

let temp = {
    '@name': '$.name',
     '@@ids': '$..id'
};

let result = refactor(temp,a,b);
