import {
    Chart,
    LinearScale,
    CategoryScale,
    LineController,
    LineElement,
    PointElement
} from 'chart.js';
function charts() {
    let myChart = null;
    function line_segment(ctx, labels, data) {
        if (myChart !== null) {
            myChart.destroy();
        }
        Chart.register(LinearScale, CategoryScale, LineController, LineElement, PointElement);
        const genericOptions = {
            scales: {
                x: {
                    ticks: {
                        color: 'white'
                    }
                },
                y: {
                    ticks: {
                        color: 'white'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true, // Ensure the legend is displayed
                    position: 'top' // Adjust the position ('top', 'bottom', 'left', 'right')
                }
            },
            responsive: true,
            // maintainAspectRatio: false, // Ignore the default aspect ratio
            fill: false,
            interaction: {
                intersect: false
            },
            radius: 5,
        };
        const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;
        const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;
        const config = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Temperature Chart',
                    data: data,
                    borderColor: '#9d0307',
                    segment: {
                        borderColor: ctx => skipped(ctx, 'rgb(0,0,0,0.2)') || down(ctx, '#052480'),
                        borderDash: ctx => skipped(ctx, [6, 6]),
                    },
                    spanGaps: true
                }]
            },
            options: genericOptions
        };
        myChart = new Chart(ctx, config);

    }
    return { line_segment }
}

export const Charts = charts();