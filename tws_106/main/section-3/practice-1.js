'use strict';

module.exports = function createUpdatedCollection(collectionA, objectB) {
    for(let itemA of collectionA)
    {
        if(objectB.value.indexOf(itemA.key)!= -1)
        {
            itemA.count--;
        }
    }
    return collectionA;
}