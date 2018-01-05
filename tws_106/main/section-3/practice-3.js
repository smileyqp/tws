'use strict';

module.exports = function createUpdatedCollection(collectionA, objectB) {
    var res=[{}];
    res[0].key=collectionA[0];
    res[0].count=1;

    for (var i = 1;i<collectionA.length;i++)
    {
        if(collectionA[i] == res[0].key)
        {
            res[0].count++;
        }
        else if(collectionA[i] == collectionA[i-1]);
        else
        {
            var obj={};
            obj.key=collectionA[i];
            obj.count=1;
            for(var j = i+1;j<collectionA.length;j++)
            {
                if (collectionA[j] == collectionA[i])
                {
                    obj.count++;
                }
            }
            res.push(obj);
        }

    }

    for (var i=0;i < res.length;i++)
    {
        for(var j=0 ;j < objectB.value.length;j++)
        {
            if(res[i].key == objectB.value[j])
            {
                res[i].count=res[i].count-parseInt(res[i].count/3);

            }
        }
    }
    return res;
}