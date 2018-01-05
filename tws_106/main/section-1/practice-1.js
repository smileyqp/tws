'use strict';
module.exports = function collectSameElements(collectionA, collectionB) {
    var n=0;
    var m=0;
    for(var i=0;i<collectionA.length;i++){
        for(var j=0;j<collectionB.length;j++){
            if(collectionA[i]==collectionB[j]){
                n=n+1;
            }
        }
    }
    var arr=new Array(n);
    for(var i=0;i<collectionA.length;i++){
        for(var j=0;j<collectionB.length;j++){
            if(collectionA[i]==collectionB[j]){
                arr[m]=collectionA[i];
                m++;
            }
        }
    }
    return arr;
}
