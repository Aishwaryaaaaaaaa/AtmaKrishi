// ================= CHARTS =================
// Earthy colour palette
const colors = {
  green: '#556B2F',
  greenLight: '#7B8A5E',
  sand: '#D7CCB6',
  sandLight: '#EFE9DD',
  dark: '#1F1F1F',
  accent: '#D9CDB0'
};

// 1. Rice diversity bar chart
const riceCtx = document.getElementById('riceChart').getContext('2d');
new Chart(riceCtx, {
  type: 'bar',
  data: {
    labels: ['Before 1960', 'Today'],
    datasets: [{
      label: 'Traditional rice varieties',
      data: [110000, 6000],
      backgroundColor: [colors.green, colors.sand],
      borderColor: [colors.green, colors.dark],
      borderWidth: 1,
      borderRadius: 6
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: colors.dark }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: colors.sandLight },
        ticks: { color: colors.dark, font: { family: 'Manrope' } }
      },
      x: {
        grid: { display: false },
        ticks: { color: colors.dark, font: { family: 'Manrope', size: 13 } }
      }
    }
  }
});

// 2. Fertiliser import dependency donut chart
const fertCtx = document.getElementById('fertiliserChart').getContext('2d');
new Chart(fertCtx, {
  type: 'doughnut',
  data: {
    labels: ['Imported Potash (100%)', 'Imported Phosphatic (90%)', 'Domestic Urea (70%)'],
    datasets: [{
      data: [100, 90, 70],
      backgroundColor: [colors.green, colors.sand, colors.greenLight],
      borderColor: '#F7F3EC',
      borderWidth: 4,
      hoverBorderColor: '#fff'
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: colors.dark,
          font: { family: 'Manrope', size: 13 },
          padding: 20
        }
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.raw}%`
        }
      }
    }
  }
});

// 3. Global fertiliser price index line chart (2020-2023)
const priceCtx = document.getElementById('priceChart').getContext('2d');
new Chart(priceCtx, {
  type: 'line',
  data: {
    labels: ['Jan 2020', 'Jul 2020', 'Jan 2021', 'Jul 2021', 'Jan 2022', 'Jul 2022', 'Jan 2023', 'Jul 2023'],
    datasets: [{
      label: 'Fertiliser Price Index',
      data: [72, 78, 105, 145, 210, 260, 190, 155],
      borderColor: colors.green,
      backgroundColor: 'rgba(85,107,47,0.1)',
      fill: true,
      tension: 0.3,
      pointBackgroundColor: colors.green,
      pointBorderColor: '#fff',
      pointRadius: 5,
      pointHoverRadius: 7
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: colors.dark }
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 50,
        grid: { color: colors.sandLight },
        ticks: { color: colors.dark, font: { family: 'Manrope' } }
      },
      x: {
        grid: { display: false },
        ticks: { color: colors.dark, font: { family: 'Manrope', size: 12 } }
      }
    }
  }
});
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{threshold:.2});

reveals.forEach(el=>observer.observe(el));