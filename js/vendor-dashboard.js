  document.addEventListener('DOMContentLoaded', () => {
            const ctx = document.getElementById('bookingChart');

            const data = {
                labels: ['Jan', 'Feb', 'Mar', 'April', 'May'],
                datasets: [{
                    label: 'Booking Activity',
                    data: [50, 200, 350, 380, 360],
                    fill: true,
                    backgroundColor: 'rgba(196, 172, 218, 0.5)',
                    borderColor: 'rgba(128, 92, 153, 1)',
                    tension: 0.4,
                    pointRadius: 0,
                }]
            };

            const config = {
                type: 'line',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)',
                            }
                        }
                    }
                }
            };

            new Chart(ctx, config);
        });