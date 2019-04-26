$(function () {
    window.addEventListener("resize", function (e) {
        pageScale();
    }, false);
    setTimeout(pageScale, 0)
    pageScale();

    $("#clock").MyDigitClock({//时钟
        fontSize: 26,
        fontFamily: "electronicFont",
        fontColor: "#00ACED",
        fontWeight: "bold",
        bAmPm: false,
        background: 'transparent',
        bShowHeartBeat: true
    });
    setTimeout(rotateInorder, 1000);
    setInterval(rotateInorder, 6900);
    drawPie("echart-pie");
    drawLine("echart-line");
    drawTwoLine();
    getbar();
    writebar() ;
})
function pageScale() {/*页面缩放*/
    let levelheight = 1080;
    let levelwidth = 1920;
    let ele = document.querySelector('#body');
    let width = document.body.clientWidth;
    let height = document.body.clientHeight;
    let rate = Math.min(height / levelheight, width / levelwidth);
    ele.style.transformOrigin = 'center top 0px';
    ele.style.transform = 'scale(' + rate + ')';
    let bosscon = document.querySelector('#maincontainer');
    if (height / levelheight <= width / levelwidth) {
        bosscon.style.alignItems = 'normal';
        bosscon.style.justifyContent = 'center';
        ele.style.transformOrigin = 'center top 0px';
    } else {
        bosscon.style.alignItems = 'center';
        bosscon.style.justifyContent = 'normal';
        ele.style.transformOrigin = 'left center 0px';
    }
}
function rotateInorder() {/*翻转*/
    $(".special-title").find(".site-item").toggleClass("flip")
    $("#siteItem-list").find(".site-item").each(function (i) {
        (function (index, $item) {
            setTimeout(function () {
                $item.toggleClass("flip");
                if (index == 0) {
                }
            }, (index + 1) * 300);
        })(i, $(this));
    });
}
function  drawPie(domId) {
    var myChart = echarts.init(document.getElementById(domId));
    var data = [
      { value: 1, name: "无证违章", color0: "#FF687D", color1: "#FC0C59" },
      { value: 1, name: "作业违章", color0: "#FCDE54", color1: "#F7BA2A" },
      // { value: 3, name: "其他", color0: "#df5cb4", color1: "#e07c76" },
      {
        value: 1,
        name: "吊索断裂",
        color0: "rgba(13,138,212,1)",
        color1: "rgba(60,181,251,1)"
      },
      { value: 1, name: "臂架折断", color0: "yellow", color1: "yellowgreen" },

      { value: 1, name: "高处坠落", color0: "#15E09B", color1: "#1DBD6B" }
    ];

    // 计算总数
    var total = data.map(v => v.value).reduce((o, n) => o + n);

    // 计算每一个data的其实角度和末了角度 θ1和θ2
    data.reduce((o, v) => {
      v.theta1 = o;
      v.theta2 = o + v.value / total;
      return v.theta2;
    }, 0);
    // 添加渐变
    data.forEach((v, i) => {
      var ops = calc(v.theta1 * 2 * Math.PI, v.theta2 * 2 * Math.PI);
      if (v.value)
        v.itemStyle = {
          color: {
            type: "radial",
            x: ops.center[0],
            y: ops.center[1],
            r: ops.radius,
            colorStops: [
              {
                offset: 0,
                color: v.color0
              },
              {
                offset: 0.5,
                color: v.color0
              },
              {
                offset: 0.3,
                color: v.color1
              },
              {
                offset: 1,
                color: v.color1
              }
            ]
            // globalCoord: false // 缺省为 false
          }
        };
      v.label = {
        normal: {
          show: true,
          formatter: "{b}\n\n{d}%",
          textStyle: {
            fontSize: 12,
            color: v.color1
          },
          position: "outside"
        },
        emphasis: {
          show: true
        }
      };
    });

    // 计算渐变中心以及渐变半径
    function calc(theta1, theta2) {
      var r = 0.5; // 半径是0.5 其实表示0.5个直径
      var inner = 0.6; // 里面镂空部分占60%  option中radius为[33%, 55%]  55 * 0.6 == 33

      var cos = Math.cos;
      var sin = Math.sin;
      var PI = Math.PI;
      var min = Math.min;
      var max = Math.max;

      var bottom = 0;
      var left = 2 * r;
      var right = 0;

      // y0: θ1对应的外部点的y值
      // y1: θ2对应的外部点的y值
      // _y0: θ1对应的内部点的y值
      // _y1: θ2对应的内部点的y值
      // x0: θ1对应的外部点的x值
      // x1: θ2对应的外部点的x值
      // _x0: θ1对应的内部点的x值
      // _x1: θ2对应的内部点的x值
      var y0 = r * (1 - cos(theta1));
      var y1 = r * (1 - cos(theta2));

      var _y0 = r * (1 - inner * cos(theta1));
      var _y1 = r * (1 - inner * cos(theta2));

      // 如果这个弧经过θ == PI的点  则bottom = 2PI
      // bottom用于之后的max计算中
      if (theta1 < PI && theta2 > PI) {
        bottom = 2 * r;
      }
      // 计算这几个点的最大最小值
      var ymin = min(_y0, _y1, y0, y1);
      var ymax = max(_y0, _y1, y0, y1, bottom);

      var x0 = r * (1 + sin(theta1));
      var x1 = r * (1 + sin(theta2));

      var _x0 = r * (1 + inner * sin(theta1));
      var _x1 = r * (1 + inner * sin(theta2));

      // 如果这个弧经过θ == PI / 2的点  则right = 2PI
      if (theta1 < PI / 2 && theta2 > PI / 2) {
        right = 2 * r;
      }
      // 如果这个弧经过θ == PI / 2 * 3的点  则left = 0
      if (theta1 < (PI / 2) * 3 && theta2 > (PI / 2) * 3) {
        left = 0;
      }
      var xmin = min(_x0, _x1, x0, x1, left);
      var xmax = max(_x0, _x1, x1, x0, right);

      return {
        // 计算圆心以及半径
        center: [(r - xmin) / (xmax - xmin), (r - ymin) / (ymax - ymin)],
        radius: r / min(xmax - xmin, ymax - ymin)
      };
    }

    var option = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {d}%"
      },
      // legend: {
      //   orient: "vertical",
      //   x: "75%",
      //   y: "25%",
      //   itemWidth: 14,
      //   itemHeight: 14,
      //   align: "left",
      //   data: [
      //     "混凝土露筋",
      //     "混凝土胀模",
      //     "其他",
      //     "其他（模板工程）",
      //     "卷材缺陷",
      //     "混凝土夹渣"
      //   ],
      //   textStyle: {
      //     color: "#fff"
      //   }
      // },

      series: [
        {
          name: "隐患类型",
          type: "pie",
          radius: ["45%", "70%"],
          center: ["50%", "55%"],
          data: data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(255, 255, 255,1)"
            }
          }
          // animation: false
        }
      ]
    };
    myChart.setOption(option);
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  }

  function drawLine() {
    var myChart = echarts.init(document.getElementById("echart-line"));
    // var option = {
    //   // backgroundColor: "#05224d",
    //   tooltip: {
    //     trigger: "axis",
    //     axisPointer: {
    //       // 坐标轴指示器，坐标轴触发有效
    //       type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
    //     }
    //   },
    //   grid: {
    //     top: "8%",
    //     left: "5%",
    //     right: "5%",
    //     bottom: "1%",
    //     containLabel: true
    //   },
    //   xAxis: [
    //     {
    //       type: "category",
    //       boundaryGap: false,
    //       axisLine: {
    //         //设置x轴的线
    //         show: true
    //         //   lineStyle: {
    //         //     color: "#DBE1FF"
    //         //   }
    //       },
    //       axisLabel: {
    //         //设置x轴的字
    //         textStyle: {
    //           color: "#DBE1FF",
    //           margin: 15
    //         }
    //       },
    //       axisTick: { show: false },
    //       data: ["施工一区", "施工二区", "施工三区", "施工四区"]
    //     }
    //   ],
    //   yAxis: [
    //     {
    //       type: "value",
    //       min: 0,
    //       max: 5,
    //       splitNumber: 1,
    //       splitLine: {
    //         show: false,
    //         lineStyle: {
    //           color: "#DBE1FF"
    //         }
    //       },
    //       axisLine: {
    //         //设置y轴的线
    //         show: true
    //         // lineStyle:{
    //         //     color:'#DBE1FF',
    //         //     width:1,//这里是为了突出显示加上的
    //         // }
    //       },
    //       axisLabel: {
    //         //设置y轴的字
    //         margin: 20,
    //         textStyle: {
    //           color: "#DBE1FF"
    //         }
    //       },
    //       axisTick: { show: false }
    //     }
    //   ],
    //   series: [
    //     {
    //       name: "设备隐患数",
    //       type: "line",
    //       smooth: true,
    //       itemStyle: { normal: { areaStyle: { type: "default" } } },
    //       lineStyle: {
    //         normal: {
    //           color: "rgba(255,255,255,0)" // 线条颜色
    //         }
    //       },
    //       symbol: "circle",
    //       symbolSize: 8,

    //       itemStyle: {
    //         normal: {
    //           color: "#00d4c7",
    //           lineStyle: {
    //             color: "#00d4c7",
    //             width: 1
    //           },
    //           areaStyle: {
    //             //color: '#94C9EC'
    //             color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
    //               {
    //                 offset: 0,
    //                 color: "rgba(74,208,181,1)"
    //               },
    //               {
    //                 offset: 1,
    //                 color: "rgba(84,97,187,1)"
    //               }
    //             ])
    //           }
    //         }
    //       },
    //       symbol:
    //         "image://data:image/png;base64,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",
    //       symbolSize: 42,
    //       areaStyle: {
    //         //区域填充样式
    //         normal: {
    //           //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
    //           color: new echarts.graphic.LinearGradient(
    //             0,
    //             0.7,
    //             0,
    //             1,
    //             [
    //               { offset: 0, color: "rgba(84,97,187,1)" },
    //               { offset: 0.7, color: "rgba(74,208,181,1)" }
    //             ],
    //             false
    //           ),
    //           shadowColor: "rgba(53,142,215, 0.9)", //阴影颜色
    //           shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
    //         }
    //       },
    //       data: [0, 2, 0, 44]
    //     }
    //   ]
    // };
      var option = option = {
        // backgroundColor: '#424956',
        title: {
            text: '请求数',
            textStyle: {
                fontWeight: 'normal',
                fontSize: 14,
                color:"#DBE1FF"
            },
            left: '6%'
        },
        tooltip: {
            trigger: 'axis',
            // axisPointer: {
            //     lineStyle: {
            //         color: '#57617B'
            //     }
            // }
        },
        legend: {
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: ['移动', '电信', '联通'],
            right: '4%',
            textStyle: {
              fontSize: 14,
              color:"#DBE1FF"
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            // axisLine: {
            //     lineStyle: {
            //         color: '#57617B'
            //     }
            // },
         axisLine: {
            //设置x轴的线
            show: true,
              lineStyle: {
                color: "#DBE1FF"
              }
          },
          axisLabel: {
            //设置x轴的字
            textStyle: {
              fontSize: 14,
              color:"#DBE1FF"
            }
          },
                //     {
    //       type: "category",
    //       boundaryGap: false,
    //       axisLine: {
    //         //设置x轴的线
    //         show: true
    //         //   lineStyle: {
    //         //     color: "#DBE1FF"
    //         //   }
    //       },
    //       axisLabel: {
    //         //设置x轴的字
    //         textStyle: {
    //           color: "#DBE1FF",
    //           margin: 15
    //         }
    //       },
    //       axisTick: { show: false },
    //       data: ["施工一区", "施工二区", "施工三区", "施工四区"]
    //     }
            data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35']
        }],
        yAxis: [{
            type: 'value',
            name: '单位（%）',
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#DBE1FF'
                }
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                    fontSize: 14,
                    color:"#DBE1FF"
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#57617B'
                }
            }
        }],
        series: [{
            name: '移动',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
                normal: {
                    width: 3
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: 'rgba(16,97,204, 0.3)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(17,235,210, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
          itemStyle: {
                    normal: {
                        
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: 'rgba(16,97,204,1)'
                        }, {
                            offset: 1,
                            color: 'rgba(17,235,210,1)'
                        }])
                    },
                    emphasis: {
                    color: 'rgb(0,196,132)',
                    borderColor: 'rgba(0,196,132,0.2)',
                    extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
                    borderWidth: 10
                }
                },
            data: [220, 182, 191, 134, 150, 120, 110, 125 ]
        }, {
            name: '电信',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
                normal: {
                    width: 3
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(205,52,42, 0.5)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(235,235,21, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                },
            },
          itemStyle: {
                    normal: {
                        
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: 'rgba(205,52,42,1)'
                        }, {
                            offset: 1,
                            color: 'rgba(235,235,21,1)'
                        }])
                    },
                    emphasis: {
                    color: 'rgb(99,250,235)',
                    borderColor: 'rgba(99,250,235,0.2)',
                    extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
                    borderWidth: 10
                }
                },
            data: [120, 110, 125, 145, 122, 165, 122, 220]
        }  ]
    };
    myChart.setOption(option);
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  };
  function drawTwoLine() {
    var myChart = echarts.init(
      document.getElementById("echart-twoline")
    );
    var option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          lineStyle: {
            color: "#57617B"
          }
        }
      },
      legend: {
        icon: "rect",
        //align:'right',
        itemWidth: 14,
        itemHeight: 10,
        itemGap: 13,
        data: ["计划产值", "完成产值"],
        right: "4%",
        textStyle: {
          fontSize: 12,
          color: "#F1F1F3"
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          axisLine: {
            //设置x轴的线
            show: true,
            lineStyle: {
              //color: "#DBE1FF"
            }
          },
          axisLabel: {
            //设置x轴的字
            textStyle: {
              color: "#DBE1FF",
              margin: 15
            }
          },
          data: [
            "1月",
            "2月",
            "3月",
            "4月"
          ]
        }
      ],
      yAxis: [
        {
          type: "value",
          name: "单位：万元",
          axisTick: {
            show: false
          },
          axisLine: {
            //设置y轴的线
            show: false,
            lineStyle: {
              color: "#DBE1FF"
            }
          },
          axisLabel: {
            //设置y轴的字
            textStyle: {
              color: "#DBE1FF",
              //fontSize: 14,
              margin: 0
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#57617B"
            }
          }
        }
      ],
      series: [
        {
          name: "计划产值",
          type: "line",
          //smooth: true,
          symbol: "circle",
          symbolSize: 8,
          lineStyle: {
            normal: {
              width: 0.5
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(252, 12, 89, 0.64)"
                  },
                  {
                    offset: 0.8,
                    color: "rgba(252, 12, 89, 0)"
                  }
                ],
                false
              ),
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: "rgba(252, 12, 89, 1)"
            }
          },
          // itemStyle: {
          //     normal: {
          //         color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          //             offset: 0,
          //             color: 'rgba(252, 12, 89, 0.64)'
          //         }, {
          //             offset: 1,
          //             color: 'rgba(252, 12, 89, 0)'
          //         }])
          //     },
          //     emphasis: {
          //     color: 'rgb(99,250,235)',
          //     borderColor: 'rgba(99,250,235,0.2)',
          //     extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
          //     borderWidth: 99
          //   }
          // },
          data: [
            1080.20,
            875.38,
            875.38,
            1143.60
          ]
        },
        {
          name: "完成产值",
          type: "line",
          //smooth: true,
          symbol: "circle",
          symbolSize: 8,
          lineStyle: {
            normal: {
              width: 0.5
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(116, 206, 214,.64)"
                  },
                  {
                    offset: 0.8,
                    color: "rgba(116, 206, 214,0)"
                  }
                ],
                false
              ),
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: "rgba(76, 240, 254, 1)"
            }
          },
          // itemStyle: {
          //     normal: {
          //         color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          //             offset: 0,
          //             color: 'rgba(116, 206, 214,.64)'
          //         }, {
          //             offset: 1,
          //             color: 'rgba(116, 206, 214,0)'
          //         }])
          //     },
          //     emphasis: {
          //     color: 'rgb(99,250,235)',
          //     borderColor: 'rgba(99,250,235,0.2)',
          //     extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
          //     borderWidth: 10
          // }
          //},
          data: [
            1293,
            670,
            883.10,
            888.66
          ]
        }
      ]
    };
    myChart.setOption(option);
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  };
  function getbar() {
    var myChart = echarts.init(
      document.getElementById("echart-getbar")
    );
    var option = {
      backgroundColor: '#23243a',
    tooltip: { //提示框组件
      trigger: 'axis',
      formatter: '{b}<br />{a0}: {c0}<br />{a1}: {c1}',
      axisPointer: {
        type: 'shadow',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      textStyle: {
        color: '#fff',
        fontStyle: 'normal',
        fontFamily: '微软雅黑',
        fontSize: 12,
      }
    },
    grid: {
      left: '1%',
      right: '4%',
      bottom: '6%',
      top:30,
      padding:'0 0 10 0',
      containLabel: true,
    },
      legend: {//图例组件，颜色和名字
          right:10,
      top:0,
      itemGap: 16,
      itemWidth: 18,
      itemHeight: 10,
          data:[{
              name:'流入',
              //icon:'image://../wwwroot/js/url2.png', //路径
          },
          {
              name:'流出',
          }],
          textStyle: {
        color: '#a8aab0',
        fontStyle: 'normal',
        fontFamily: '微软雅黑',
        fontSize: 12,            
          }
      },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,//坐标轴两边留白
        data: ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
        axisLabel: { //坐标轴刻度标签的相关设置。
          interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
          margin:15,
          textStyle: {
            color: '#078ceb',
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 12,
          }
        },
        axisTick:{//坐标轴刻度相关设置。
          show: false,
        },
        axisLine:{//坐标轴轴线相关设置
          lineStyle:{
            color:'#fff',
            opacity:0.2
          }
        },
        splitLine: { //坐标轴在 grid 区域中的分隔线。
          show: false,
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        splitNumber: 5,
        axisLabel: {
          textStyle: {
            color: '#a8aab0',
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 12,
          }
        },
        axisLine:{
          show: false
        },
        axisTick:{
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#fff'],
            opacity:0.06
          }
        }
  
      }
    ],
      series : [
          {
              name:'流入',
              type:'bar',
              data:[4.9, 7.3, 9.2, 5.6, 7.7, 5.6, 4.2, 3.6, 6, 6.4],
              barWidth: 10,
              barGap:0,//柱间距离
              label: {//图形上的文本标签
                  normal: {
                     show: true,
                     position: 'top',
                     textStyle: {
                         color: '#a8aab0',
                         fontStyle: 'normal',
                         fontFamily: '微软雅黑',
                         fontSize: 12,   
                     },
                  },
              },
              itemStyle: {//图形样式
                  normal: {
            barBorderRadius: [5, 5, 0, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 1, color: 'rgba(127, 128, 225, 0.7)'
                      },{
                          offset: 0.9, color: 'rgba(72, 73, 181, 0.7)'
                      },{
                          offset: 0.31, color: 'rgba(0, 208, 208, 0.7)'
                      },{
                          offset: 0.15, color: 'rgba(0, 208, 208, 0.7)'
                      }, {
                          offset: 0, color: 'rgba(104, 253, 255, 0.7)'
                      }], false),
                  },
              },
          },
          {
              name:'流出',
              type:'bar',
              data:[2.9, 5, 4.4, 2.7, 5.7, 4.6, 1.2, 2.7, 4.8, 6.0],
              barWidth: 10,
              barGap:0.2,//柱间距离
              label: {//图形上的文本标签
                  normal: {
                     show: true,
                     position: 'top',
                     textStyle: {
                         color: '#a8aab0',
                         fontStyle: 'normal',
                         fontFamily: '微软雅黑',
                         fontSize: 12,   
                     },
                  },
              },
              itemStyle: {//图形样式
                  normal: {
            barBorderRadius: [5, 5, 0, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 1, color: 'rgba(127, 128, 225, 0.7)'
                      },{
                          offset: 0.9, color: 'rgba(72, 73, 181, 0.7)'
                      },{
                          offset: 0.25, color: 'rgba(226, 99, 74, 0.7)'
                      }, {
                          offset: 0, color: 'rgba(253, 200, 106, 0.7)'
                      }], false),
                  },
              },
          }
      ]
  };
    myChart.setOption(option);
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  };
  function writebar() {
    var myChart = echarts.init(
      document.getElementById("echart-writebar")
    );
    var option = {
      // backgroundColor: '#011c3a',
      xAxis: {
          data: ['涉恐人员', '涉稳人员', '涉毒人员', '在逃人员', '刑事犯罪\n前科、劣迹人员', '肇事肇祸\n精神病人', '重点上访\n人员'],
          axisLine: {
              lineStyle: {
                  color: '#0177d4'
              }
          },
          axisLabel: {
              color: '#fff',
              fontSize: 14
          }
      },
      yAxis: {
          name: "（人）",
          nameTextStyle: {
              color: '#fff',
              fontSize: 16
          },
          axisLine: {
              lineStyle: {
                  color: '#0177d4'
              }
          },
          axisLabel: {
              color: '#fff',
              fontSize: 16
          },
          splitLine: {
              show:false,
              lineStyle: {
                  color: '#0177d4'
              }
          },
          interval:500,
          max:5000
  
      },
      series: [{
          type: 'bar',
          barWidth: 18,
          itemStyle:{
              normal:{
                  color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#00b0ff'
                  }, {
                      offset: 0.8,
                      color: '#7052f4'
                  }], false)
              }
          },
          data: [254, 3254, 1654, 2454, 4757, 2011, 1211]
      }]
  };
    myChart.setOption(option);
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  };

  