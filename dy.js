function lcs(word1,word2){
	var max = 0;
	var index = 0;
	var lcsarr = new Array(word1.length+1);
	for(var i = 0; i <= word1.length+1; ++i){
		lcsarr[i] = new Array(word2.length + 1);
		for(var j = 0 ;j < word2.length+1; ++j){
			lcsarr[i][j] = 0;
		}
	}
	console.log('展示最新的数组是什么样子的');
    console.log(lcsarr);
	for(var i = 0; i<=word1.length;i++){
		for(var j = 0; j<=word2.length;j++){
			if(i==0 || j==0){
				lcsarr[i][j]=0;
			}else{
				if(word1[i-1] == word2[j-1]){
					lcsarr[i][j] = lcsarr[i-1][j-1] + 1;
				}else{
					lcsarr[i][j] = 0;
				}
			}
			if(max < lcsarr[i][j]){
				max = lcsarr[i][j];
				index = i;
			}
		}
	}
	console.log('展示改变之后的数组是什么样子的');
	console.log(lcsarr);
	console.log(max);
	console.log(index);
	var str = "";
	if(max==0){
		return "";
	}
	else{
		for(var i = index - max;i<=max;++i){
			str += word2[i];
		}
		return str;
	}
}

console.log(lcs("abbcc","dbbcc"));