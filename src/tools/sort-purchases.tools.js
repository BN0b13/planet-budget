const sortPurchases = (purchases) => {
    let holdingPurchaseArr = {
        bills: [],
        expenses: [],
        fun: [],
    };
    let billsTotal = 0;
    let expensesTotal = 0;
    let funTotal = 0;
    purchases.forEach((item) => {
        switch(item.purchaseType) {
            case 'bill':
                holdingPurchaseArr.bills.push(item);
                billsTotal = parseInt(billsTotal) + parseInt(item.amount);
                break;
            case 'fun':
                holdingPurchaseArr.fun.push(item);
                funTotal = parseInt(funTotal) + parseInt(item.amount);
                break;
            default:
                holdingPurchaseArr.expenses.push(item);
                expensesTotal = parseInt(expensesTotal) + parseInt(item.amount);
        }
    });


    return [{
        name: 'Bills',
        value: billsTotal,
    },
    {
        name: 'Expenses',
        value: expensesTotal,
    },
    {
        name: 'Fun',
        value: funTotal,
    },
    ];
}

export default sortPurchases;