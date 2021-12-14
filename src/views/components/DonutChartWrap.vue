<template>
  <div class='donut-chart-wrap between-row'>
    <div class="wrapper"
         v-for="(item, index) in list"
         :key="index">
      <div ref="roseChart"
           class="roseChart"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'DonutChartWrap',
  methods: {
    drawPie () {
      const pieCharts = this.$refs.roseChart
      if (this.$isEmpty(pieCharts)) return
      pieCharts.forEach((item, index) => {
        var myChart = echarts.init(item)
        const colorType = this.list[index].type
        this.option.color = colors[colorType]

        this.option.graphic.style.text = this.list[index].name

        this.option.legend.data = this.list[index].legendData
        this.option.series[0].data = this.list[index].seriesData
        this.option.series[0].name = this.list[index].name
        myChart.setOption(this.option)
      })
    },
    handleData () {
      const ageSpread = this.spreadData.ageSpread
      const genderSpread = this.spreadData.genderSpread
      const levelSpread = this.spreadData.levelSpread

      const temList = JSON.parse(JSON.stringify(this.list))
      this.list = temList.map((item, index) => {
        let temSpread = []
        let key1 = ''
        if (index === 0) {
          temSpread = ageSpread
          key1 = 'ageGroup'
        }
        if (index === 1) {
          temSpread = genderSpread
          key1 = 'sex'
        }
        if (index === 2) {
          temSpread = levelSpread
          key1 = 'level'
        }
        item.legendData = temSpread.map(item => {
          return `${item[key1]} ${item.scale}`
        })
        item.seriesData = temSpread.map((item, index) => {
          const value = {
            value: item.memberQuantity,
            name: `${item[key1]} ${item.scale}`
          }
          return value
        })
        return item
      })
      this.drawPie()
    }
  },
  mounted () {
    this.drawPie()
  },
  watch: {
    spreadData: {
      handler () {
        this.handleData()
      },
      immediate: true
    }
  },
  props: {
    spreadData: {
      type: Object
    }
  },
  data () {
    return {
      option: {
        tooltip: {
          trigger: 'item',
          backgroundColor: 'transparent',
          padding: 0,
          formatter: function (params) {
            const item1 = params.seriesName.substring(0, 2)
            const item2 = params.data.name.split(' ')[0]
            const item3 = params.data.name.split(' ')[1]
            const item4 = params.data.value
            let toolTiphtml = '<div class="tooltip">'
            toolTiphtml += `<p class="center-align"><a class="round mr8" style="background:${params.color}"></a>${item1}： ${item2}</p>
            <p class="ml16 mt8">人数： ${item4}</p><p class="ml16 mt8">占比： ${item3}</p>`
            toolTiphtml += '</div>'
            return toolTiphtml
          },
          textStyle: {
            color: ' rgba(0,0,0,0.70)'
          }
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: '38.5%',
          style: {
            text: '年龄分布',
            textAlign: 'center',
            fill: '#333333',
            font: 'bolder 18px MicrosoftYaHei-Bold'
          }
        },
        legend: {
          orient: 'horizontal',
          top: '75%',
          icon: 'circle',
          itemWidth: 8,
          itemHeight: 8,
          itemGap: 20,
          textStyle: {
            color: '#333333',
            fontSize: 14
          },
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            center: ['50%', '40%'],
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ]
          }
        ]
      },
      list: [
        {
          name: '年龄分布',
          type: 'age',
          legendData: [],
          seriesData: []
        },
        {
          name: '性别分布',
          type: 'sex',
          legendData: [],
          seriesData: []
        },
        {
          name: '等级分布',
          type: 'level',
          legendData: [],
          seriesData: []
        }
      ]
    }
  }
}

// #518CFC    #FFAC41    #00A4FF    #D4704F    #50CBF4    #FFD200    #4FD4B7    #A9A9B0
const colors = {
  age: ['#518CFC', '#FFAC41', '#00A4FF', '#D4704F', '#50CBF4', '#FFD200'],
  sex: ['#518CFC', '#FFAC41', '#D4704F'],
  // level: ['#518CFC', '#FFAC41', '#00A4FF', '#D4704F', '#50CBF4', '#FFD200', '#4FD4B7']
  level: ['#50CBF4', '#FFD200', '#4FD4B7', '#D4704F', '#00A4FF', '#FFAC41', '#518CFC']
}
</script>

<style lang='scss' scoped>
/deep/ .tooltip {
  width: 100%;
  height: 100%;
  background: #ffffff;
  padding: 12px;

  border-radius: 2px;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.2), 0 2px 12px 0 rgba(0, 0, 0, 0.12);
  .round {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
}
.donut-chart-wrap {
  .roseChart {
    height: 500px;
    width: 400px;
  }
}
</style>
