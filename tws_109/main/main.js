const datbase = require('../main/datbase');
module.exports = {
    printInventory
};
function printInventory(inputs){
    var arr=count(inputs);
    var array_subtotal =discount(arr);
    var pre=infor(array_subtotal);
    var sum=0;
    var save=0;
    var print1="***<没钱赚商店>购物清单***\n";
    var print2="";
    var print3="----------------------\n";
    var print4="挥泪赠送商品：\n";
    var print5="";
for(var item of arr){
    print2+="名称："+item.name+"，数量："+String(item.number)+item.unit+"，单价："+String(item.price.toFixed(2))+"(元)，小计："+String(item.count.toFixed(2))+"(元)\n"
    sum+=item.count;
}
for(var item of pre){
    print5+="名称："+item.name+"，数量："+String(item.num)+item.unit+"\n";
    save+=item.num*item.price;
}
    var print6="总计："+String(sum.toFixed(2))+"(元)\n";
    var print7="节省："+String(save.toFixed(2))+"(元)\n";
    var print8="**********************";
    console.log(print1+print2+print3+print4+print5+print3+print6+print7+print8);
}
function count(array){
    var goods = new Array();
    var key;
    var num;
    var flag=0;
    for(var items of array){
        flag=0;
        if(items.indexOf("-")!=-1){
            var res=items.split("-");
            key=res[0];
            num=parseInt(res[1]);
        }
        else{
            key=items;
            num=1;
        }
        for(var item of goods){
            if(item.code===key){
                item.number+=num;
                flag=1;
            }
        }
        if(flag===0){
                goods.push({code:key,number:num});
            }
        }
        return goods;
    }
    function discount(arr){
        var dat=datbase.loadAllItems();
        var dis=datbase.loadPromotions();
        var num;
        for(itemA of arr){
            for(itemB of dat){
                if(itemA.code===itemB.barcode){
                    itemA.name=itemB.name;
                    itemA.unit=itemB.unit;
                    itemA.price=itemB.price;
                    itemA.count=itemA.number*itemA.price;
                }
            }
        }
        for(itemA of arr){
            for(itemC of dis){
                if(itemC.barcodes.indexOf(itemA.code)!=-1){
                    num = itemA.number - parseInt(itemA.number/3);
                    itemA.count=num*itemA.price;
                }
            }
            
        }
        return arr;
    }
    function infor(arr){
        var pre=new Array();
        for(item of arr){
            if(item.price*item.number>item.count){
                pre.push({name:item.name,num:(item.price*item.number-item.count)/item.price,unit:item.unit,price:item.price});
            }
        }
        return pre;
    }