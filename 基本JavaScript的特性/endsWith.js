/**
 * Created by Administrator on 2017/6/23.
 */
function endsWith(target,str,ignorecase){
    var end_str = target.substring(target.length - str.length);
    return ignorecase ? end_str.toLowerCase() === str.toLowerCase()
        : end_str === str;
}