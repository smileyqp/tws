'use strict';
module.exports = function countSameElements(collection) {
    const result = [];
    var flag=0;
    for (let itemC of collection) {
        flag=0;
        for (let itemR of result)
        {
            if (itemR.name === itemC[0])
            {
                if(itemC.length>1)
                {
                    itemR.summary+=parseInt(getValue(itemC));
                    flag=1;
                    break;
                }
                itemR.summary++;
                flag=1;
                break;
            }
        }
        if(flag===0)
        {
            if(itemC.length>1)
                result.push({name:itemC[0],summary:parseInt(getValue(itemC))});
            else
                result.push({name: itemC,summary:1});
        }

    }
    return result;
}
function getValue(str) {
    const num=['0','1','2','3','4','5','6','7','8','9','10'];
    var value;
    for(let item of num)
    {
        if(str.indexOf(item)!== -1)
            value=item;
    }
    return value;
}
