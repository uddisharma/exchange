'use client'
import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';

const PriceChangeSparkline = ({ prices }: any) => {
    const color = prices[prices.length - 1] < prices[0] ? 'red' : 'green';

    return (
        <Sparklines data={prices} width={100} height={20}>
            <SparklinesLine color={color} />
        </Sparklines>
    );
};

export default PriceChangeSparkline;
