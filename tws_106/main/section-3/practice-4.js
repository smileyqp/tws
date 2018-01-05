'use strict';

module.exports = function createUpdatedCollection(collectionA, objectB) {
    const res = getCount(collectionA);
    for(let itemR of res)
    {
        if(objectB.value.indexOf(itemR.key)!= -1)
        {
            itemR.count-=parseInt(itemR.count/3)*1;
        }
    }
    return res;
}

function getCount(collection) {
    const result = new Array();
    const num=['0','1','2','3','4','5','6','7','8','9'];
    var flag=0;
    for (let itemC of collection) {
        flag=0;
        for (let itemR of result) {

            if (itemR.key === itemC[0]) {
                if(itemC.length>1)
                {
                    itemR.count+=parseInt(getValue(itemC));
                    flag=1;
                    break;
                }
                itemR.count++;
                flag=1;
                break;
            }
        }
        if(flag===0)
        {
            if(itemC.length>1) {
                var Count = parseInt(getValue(itemC));
                result.push({key:itemC[0],count:Count});
            }
            else
                result.push({key: itemC,count:1});
        }

    }
    return result;
}

function getValue(str) {
    const num=['0','1','2','3','4','5','6','7','8','9'];
    var value;
    for(let item of num)
    {
        if(str.indexOf(item)!=-1)
            value=item;
    }
    return value;
}