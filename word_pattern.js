function wordPattern(pattern,str) {

	var p=pattern.split(''),
		t=str.split(' '),
		dict1={},
		dict2={},
		len=p.length,
		i;

	if(len!==t.length) {
		return false;
	}

	for(i=0;i<len;i++) {
		// if key:value not in dict, assign it
		if(!dict1[ p[i] ] ) {
			dict1[ p[i] ]=t[i];	
		} else {
			// check if it is the same pattern
			if(dict1[ p[i] ]!==t[i] ) {
				return false;
			}
		}

		if(!dict2[ t[i] ]) {
			dict2[ t[i] ]=p[i];
		} else {
			// check if it is the same pattern
			if(dict2[ t[i] ]!==p[i] ) {
				return false;
			}
		}
	}
	return true;
}

console.log( wordPattern('abba','dog cat cat dog'));

