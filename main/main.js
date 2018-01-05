'use strict';
// 1.拆分字符串
function cutInputs(inputs)
{
  var cuttedInputs = new Array;
  var i = 0;
  for (let item of inputs)
  {
    var cuttedItem = item.split("-");
    if(cuttedItem.length == 1)
    {
      cuttedInputs[i++] = {barcode:cuttedItem[0],count:1};
    }else{
      cuttedInputs[i++] = {barcode:cuttedItem[0],count:parseFloat(cuttedItem[1])}; // 损失精度
    }

  }

  return cuttedInputs;

}

// 2.合并重复数组元素
function buildBarcode(cuttedInputs)
{
  var barcode = new Array;
  for (let i=0;i<cuttedInputs.length;i++)
  {
    for (let j=i+1;j<cuttedInputs.length;j++)
    {
      if (cuttedInputs[i].barcode == cuttedInputs[j].barcode )
        j = ++i;
    }
    barcode.push(cuttedInputs[i]);
  }
  return barcode;

}

// 3.数出每个barcode重复次数
function calculateBarcode(barcode, cuttedInputs)
{
  var count = 0;
  var calculatedBarcode = new Array;
  for(let i=0;i<barcode.length;i++)
  {
    for (let j=0;j< cuttedInputs.length;j++)
    {
      if (barcode[i].barcode == cuttedInputs[j].barcode)
      {
        count = count + cuttedInputs[j].count;       //怎样实现
      }
    }

    calculatedBarcode[i] = { 'barcode': barcode[i].barcode, 'count': count};
    count = 0;
  }

  return  calculatedBarcode;
}

// 4.补全清单基本信息
function buildCompletedItemSheet(calculatedBarcode) {

  var completedItemSheet = new Array;
  var arraynum = 0;
  var TotalSheet = [
    {
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000001',
      name: '雪碧',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000002',
      name: '苹果',
      unit: '斤',
      price: 5.50
    },
    {
      barcode: 'ITEM000003',
      name: '荔枝',
      unit: '斤',
      price: 15.00
    },
    {
      barcode: 'ITEM000004',
      name: '电池',
      unit: '个',
      price: 2.00
    },
    {
      barcode: 'ITEM000005',
      name: '方便面',
      unit: '袋',
      price: 4.50
    }
  ];
  for (let i=0;i<TotalSheet.length;i++)
  {
    for (let j=0;j<calculatedBarcode.length;j++)
    {
      if (TotalSheet[i].barcode == calculatedBarcode[j].barcode)
      {
        completedItemSheet[arraynum++] = { 'barcode':TotalSheet[i].barcode,'name': TotalSheet[i].name, 'count': calculatedBarcode[j].count, 'price':TotalSheet[i].price, 'unit': TotalSheet[i].unit, };
      }

    }

  }
  return completedItemSheet;

}

// 5.添加折扣类型
function addDiscountType(completedItemSheet)
{
  var discountTypeSheet =[
    {
      type: 'BUY_TWO_GET_ONE_FREE',
      barcodes: [
        'ITEM000000',
        'ITEM000001',
        'ITEM000005'
      ]
    },
    {
      type: 'OTHER_PROMOTION',
      barcodes: [
        'ITEM000003',
        'ITEM000004'
      ]
    }
  ];

  // 收据单项----折扣单项----折扣单项条形码
  for (let completedItemSheetItem of completedItemSheet)
  {
    let  type = 'OTHER_PROMOTION';
    for (let discountTypeSheetItem of discountTypeSheet)
    {
      for (let discountTypeSheetItemBarcode of discountTypeSheetItem.barcodes)
      if (completedItemSheetItem.barcode === discountTypeSheetItemBarcode)   // ===的伟大意义
      {
        type = discountTypeSheetItem.type;
      }

    }
    completedItemSheetItem.type = type;
  }

  return completedItemSheet;
}

// 6.计算小计，总价，节省
function calculateThreePrice(completedItemSheet)
{
  var calculatedThreePrice = new Array;
  var smallPrice ;
  var totalSave = 0;
  var totalPrice = 0;
  let i = 0;

  for (let completedItemSheetItem of completedItemSheet)
  {
    let count = parseFloat(completedItemSheetItem.count);
    let price = parseFloat(completedItemSheetItem.price);

    if (completedItemSheetItem.type == 'BUY_TWO_GET_ONE_FREE')
    {
      if(count > 2)
      {
        smallPrice = (count - 1) * price;
      }

      else {
        smallPrice = count * price;
      }
    }else {
      smallPrice = count * price;
    }

    calculatedThreePrice[i] = {
      name:completedItemSheetItem.name,
      count:completedItemSheetItem.count,
      unit:completedItemSheetItem.unit,
      price: completedItemSheetItem.price.toFixed(2),
      smallPrice:smallPrice

    };

    totalSave += count * price;
    totalPrice = totalPrice + smallPrice;
    i++;

  }

  calculatedThreePrice.totalPrice = totalPrice.toFixed(2);
  calculatedThreePrice.save = totalSave - totalPrice.toFixed(2);

  return calculatedThreePrice;

}


// 7.汇总的收据数组转为对象
function turnArraytoObject(calculatedThreePrice)
{
  var singleItem = '';
  for (let item of calculatedThreePrice) {
    singleItem +=  '名称：' +item.name + '，数量：' + item.count + item.unit + '，单价：' +item.price + '(元)，小计：' + item.smallPrice.toFixed(2) + '(元)' + "\n"
  }
  let ItemSheetObj = {
    singleItem: singleItem,
    totalPrice: calculatedThreePrice.totalPrice,
    save: calculatedThreePrice.save
  };

  return ItemSheetObj;
}

// 8.打印收据
function printReceipt(ItemSheetObj)
{
  return `***<没钱赚商店>收据***
${ItemSheetObj.singleItem}
----------------------
总计：${ItemSheetObj.totalPrice}(元)
节省：${ItemSheetObj.save}(元)
**********************`

}



var inputs = [
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000003-2.5',
  'ITEM000005',
  'ITEM000005-2',
];

var cuttedInputs = cutInputs(inputs);
var barcode = buildBarcode(cuttedInputs);
var calculatedBarcode = calculateBarcode(barcode, cuttedInputs);
var completedItemSheet = buildCompletedItemSheet(calculatedBarcode);
var addedDiscountType = addDiscountType(completedItemSheet);
var calculatedThreePrice = calculateThreePrice(addedDiscountType);
var ItemSheetObj = turnArraytoObject(calculatedThreePrice);
var result = printReceipt(ItemSheetObj);

//console.log(cuttedInputs);
// console.log(barcode);
// console.log(calculatedBarcode);
// console.log(completedItemSheet);
//console.log(addedDiscountType);
//console.log(calculatedThreePrice);
console.log(result);
