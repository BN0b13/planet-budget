const incomeCalculator = ({ income, compensationType, compensationRate }) => {
    const incomeInt = parseInt(income.replace(/\D/g, ''));
    let payPeriod = null; 

    if(compensationType === 'annually') {
        switch(compensationRate) {
            case 'weekly':
                payPeriod = incomeInt/52;
                break;
            case 'biweekly':
                payPeriod = incomeInt/26;
                break;
            case 'bimonthly':
                payPeriod = incomeInt/24;
                break;
            case 'monthly':
                payPeriod = incomeInt/12;
                break;
            default:
                payPeriod = incomeInt;
        }
    }

    if(compensationType === 'hourly') {
        switch(compensationRate) {
            case 'weekly':
                payPeriod = incomeInt*40;
                break;
            case 'biweekly':
                payPeriod = incomeInt*80;
                break;
            default:
                payPeriod = incomeInt;
        }
    }

    return {
       payPeriod: (Math.round(payPeriod * 100) / 100).toFixed(2)
    };
}

export default incomeCalculator;