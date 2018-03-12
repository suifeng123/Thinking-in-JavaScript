//判断一个对象是否是原生对象
function isPrimitive(value){
     return (
        typeof value === 'string' ||
	typeof value === 'number' ||
	typeof value === 'boolean'
     )
}
