// apexChartOpt.js
export const options = {
  series: [
    {
      name: 'Number of Transactions'
    }
  ],
  chart: {
    type: 'area',
    stacked: false,
    height: '100%',
    zoom: {
      type: 'x',
      enabled: true,
      autoScaleYaxis: true
    },
    toolbar: {
      autoSelected: 'zoom'
    }
  },
  dataLabels: {
    enabled: false
  },
  markers: {
    size: 0
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0,
      stops: [0, 90, 100]
    }
  },
  yaxis: {
    labels: {
      formatter: function (val) {
        return val.toFixed(0)
      },
      style: {
        colors: ['#ffffff']
      }
    },
    grid: {
      show: false
    },
    title: {
      text: 'Number of Transactions',
      style: {
        color: '#ffffff'
      }
    }
  },
  xaxis: {
    type: 'datetime',
    labels: {
      formatter: function (val) {
        const date = new Date(val)
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      },
      style: {
        colors: '#ffffff'
      }
    }
  },
  tooltip: {
    shared: false,
    y: {
      formatter: function (val) {
        return val.toFixed(0)
      }
    },
    x: {
      format: 'dd MMM yyyy'
    }
  },
  title: {
    text: ' ',
    align: 'left',
    style: {
      color: '#ffffff'
    }
  },
  grid: {
    xaxis: {
      lines: {
        show: false
      }
    },
    yaxis: {
      lines: {
        show: false
      }
    }
  },
  responsive: [
    {
      breakpoint: 1000,
      options: {
        chart: {
          height: '100%',
          width: '100%'
        }
      }
    },
    {
      breakpoint: 900,
      options: {
        chart: {
          height: 250,
          width: '90%'
        }
      }
    },
    {
      breakpoint: 700,
      options: {
        chart: {
          height: 250,
          width: '90%'
        }
      }
    },
    {
      breakpoint: 600,
      options: {
        chart: {
          height: 200,
          width: '90%'
        }
      }
    },
    {
      breakpoint: 400,
      options: {
        chart: {
          height: 150,
          width: '90%'
        }
      }
    }
  ]
}
