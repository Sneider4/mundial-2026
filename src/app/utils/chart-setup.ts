import {
    Chart, CategoryScale, LinearScale,
    BarElement, BarController,
    DoughnutController, ArcElement,
    Tooltip, Legend,
} from 'chart.js';

Chart.register(
    CategoryScale, LinearScale,
    BarElement, BarController,
    DoughnutController, ArcElement,
    Tooltip, Legend,
);

export const darkTooltip = {
    backgroundColor: 'rgba(7,9,13,.92)',
    titleColor: '#e8edf4',
    bodyColor: '#8892a4',
    borderColor: 'rgba(255,255,255,.08)',
    borderWidth: 1,
    padding: 10,
};

export const darkScalesX = {
    grid: { color: 'rgba(255,255,255,.05)' },
    ticks: { color: '#4a5568', font: { size: 11 } },
};

export const darkScalesY = {
    grid: { display: false },
    ticks: { color: '#8892a4', font: { size: 12 } },
};
