
'use strict';

module.exports = function createUpdatedCollection(collectionA, objectB) {
    var result= collectionA;
    for (var i=0;i < collectionA.length;i++)
    {
        for(var j=0 ;j < objectB.value.length;j++)
        {
            if(collectionA[i].key == objectB.value[j])
            {
                result[i].count=result[i].count-parseInt(collectionA[i].count/3);

            }
        }
    }
    return result;
}