import React from 'react';
import { Cell, PieChart, Pie, Tooltip } from 'recharts';

import incomeCalculator from '../../tools/income-calculator.tools';
import sortPurchases from '../../tools/sort-purchases.tools';
import './charts.styles.scss';

const Charts = ({ data }) => {
    const { payPeriod } = incomeCalculator(data.profile);
    const { purchases } = data;
    // const { debt } = data.debt;

    let remainingBudget = parseInt(payPeriod);
    let pieChartData = [
        { name: 'Monthly Income', value: remainingBudget },
    ];

    if(purchases) {
        pieChartData = [];
        purchases.forEach(item => remainingBudget = remainingBudget - item.amount);
        pieChartData.unshift({ name: 'Remaining Budget', value: remainingBudget });

        const sortedArr = sortPurchases(purchases);
        sortedArr.forEach((item) => {
            if(item.value > 0) {
                pieChartData.push({
                    name: item.name,
                    value: item.value,
                });
            }
        });
    }
    
    return (
        <div className='container'>
            <PieChart width={400} height={400}>
                <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    fill="#8884d8"
                    label
                >
                {pieChartData.map((entry, index) => {
                    let fillColor = 'green';
                    if(entry.name === 'Bills') {fillColor = 'purple'}
                    if(entry.name === 'Expenses') {fillColor = 'red'}
                    if(entry.name === 'Fun') {fillColor = 'blue'}
                    return (
                        <Cell key={`cell-${index}`} fill={fillColor} />
                    )
                })}
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
      )
};

export default Charts;