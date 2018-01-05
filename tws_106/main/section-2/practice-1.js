'use strict';
module.exports = function countSameElements(collection) {
    //Create an array for saving the requested result
    var res=[{}];
    res[0].key=collection[0];
    res[0].count=1;//Save the first element of given collection in the array res in the required format

    for (let i in collection)
    {
        if(collection[i] == res[0].key)//
        {
            res[0].count++;
        }
        else if(collection[i] == collection[i-1]);
        else
        {
            var obj={};
            obj.key=collection[i];
            obj.count=1;
            for(let j in collection)
            {
                if (collection[j] == collection[i])
                {
                    obj.count++;
                }
            }
            res.push(obj);
        }

    }

    return res;
}