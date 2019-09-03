/**
 * Created by Administrator on 2017/7/21 0021.
 */


window.onload=function(){
    sun_rose("sun_rose",sunrose_data)
};
var sunrose_data=[
    {name:'其他相关职位 ',value:161},
    {name:'分析相关职位 ',value:141},
    {name:'开发相关职位 ',value:75},
    {name:'可视化相关职位',value:40},
    {name:'挖掘相关职位 ',value:34},
    {name:'研发相关职位 ',value:29},
    {name:'运营相关职位 ',value:15},
    {name:'架构相关职位 ',value:12}
];
function sun_rose(divname,sunrose_data){
    var _color2 = ["rgb(145,253,223)", "rgb(226,137,252)", "rgb(132,239,249)", "rgb(250,183,115)", "rgb(100,251,209)","rgb(250,163,74)","rgb(91,236,250)","rgb(216,98,250)"];
    var _scale = 1.12;
    var _tooltipdiv = d3.select("#" + divname)
        .append("div")
        .attr("class", "tooltip");
    var _swidth = $("#" + divname).width();
    var _sheight = $("#" + divname).height();


    var _svg = d3.select("#" + divname)
        .append("svg")
        .attr("class", "arcGroup")
        .attr("width", _swidth)
        .attr("height", _sheight);

    var _totalduration = 0;
    var _pie = d3.pie()
        .sort(null)
        .value(function (d) {
            return d.value;
        });
    var _arc = d3.arc()
        .innerRadius(_sheight/2*0.21)
        .outerRadius(function (d, i) {
            if (d.value < 20) {
                return _sheight / 2 * 0.3;
            } else if (d.value < 30) {
                return _sheight / 2 * 0.4;
            } else if (d.value < 41) {
                return _sheight / 2 * 0.5;
            } else if (d.value < 80) {
                return _sheight / 2 * 0.6;
            } else if (d.value < 200) {
                return _sheight / 2 * 0.7;
            }
        });
    var _arcdata = _pie(sunrose_data);

    drawpie();
    function drawpie() {  //生成圆饼的函数======================
        var _bangding = _svg
                        .selectAll("path")
                        .data(_pie(sunrose_data));

        var _enter = _bangding.enter();
        var _update = _bangding;
        var _exit = _bangding.exit();
      //更新的部分
        _update
            .transition()
            .tween("path", function (d, i) {
                var initEndAngle = d.endAngle;
                var node = this;
                //t 是0-1的随机数函数
                return function(t){
                    d.endAngle = d.startAngle+ t*(initEndAngle - d.startAngle);
                    d3.select(node).attr("d", _arc(d));
                }
            })
            .attr("fill", function (d, i) {
                return _color2[i];
            });

        //添加的部分
        _enter
            .each(function (d, i) {
                d.duration = (d.endAngle - d.startAngle) / (2 * Math.PI);
                d.delay = _totalduration;
                _totalduration += d.duration;
            })
            .append("path")
            .attr("class","lujing")
            .attr("opacity", "0.7")
            .attr("transform", "translate(150,150)")
            .on("mouseover", function (d,i) {
                console.log(d);
                console.log(this);
                d3.select(this).attr("opacity", "1");
                _arc
                    .innerRadius(_sheight/2*0.21)
                    .outerRadius(function () {
                        if (d.value < 20) {
                            return _sheight / 2 * 0.3*_scale;
                        } else if (d.value < 30) {
                            return _sheight / 2 * 0.4*_scale;
                        } else if (d.value < 41) {
                            return _sheight / 2 * 0.5*_scale;
                        } else if (d.value < 80) {
                            return _sheight / 2 * 0.6*_scale;
                        } else if (d.value < 200) {
                            return _sheight / 2 * 0.7*_scale;
                        }
                    });
                d3.select(this)
                    .transition()
                    .duration(500)
                    .ease(d3.easeBounce)
                    .attr("d", _arc);
                _tooltipdiv
                    .style("top", d3.event.y + 10 + "px")
                    .style("left", d3.event.x + 10 + "px")
                    .html(d.data.name + "<br/>" + d.data.value)
                    .style("display", "block");
            })
            .on("mousemove", function () {
                _tooltipdiv
                    .style("top", d3.event.y + 10 + "px")
                    .style("left", d3.event.x + 10 + "px")
            })
            .on("mouseout", function (d) {
                d3.select(this).attr("opacity", "0.7");
                _arc
                    .innerRadius(_sheight/2*0.21)
                    .outerRadius(function (d, i) {
                        if (d.value < 20) {
                            return _sheight / 2 * 0.3;
                        } else if (d.value < 30) {
                            return _sheight / 2 * 0.4;
                        } else if (d.value < 41) {
                            return _sheight / 2 * 0.5;
                        } else if (d.value < 80) {
                            return _sheight / 2 * 0.6;
                        } else if (d.value < 200) {
                            return _sheight / 2 * 0.7;
                        }
                    });
                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr("d", _arc(d));
                _tooltipdiv
                    .style("display", "none");
            })
            .attr("transform", "translate(" + _swidth /2*1.1+ "," + _sheight / 2*1.1 + ")")  //玫瑰图的中心坐标
           .transition()
           .duration(function(d){
             return d.duration*1000;
             })                                   //动画关闭了========
           .delay(function(d){
             return d.delay*1000;
             })
            //插值函数设置过渡效果
            .tween("path", function (d, i) {
                var initEndAngle = d.endAngle;
                var node = this;
                //t 是0-1的随机数函数
                return function(t){
                    d.endAngle = d.startAngle +  t *(initEndAngle - d.startAngle);
                    d3.select(node).attr("d", _arc(d));
                }
            })
            .attr("fill", function (d, i) {
                return _color2[i];
            });
        _exit
            .transition()
            .duration(1000)
            .delay(function(d){
                return d.delay*1000;
            })
            .remove();
        _svg.selectAll(".shuzii").remove();
//====================================================
        var shuzi=_svg.selectAll(".shuzii")
            .data(_pie(sunrose_data));
        var shuzi_exit=shuzi.exit();

        //数字的更新
        shuzi .transition()
            .duration(1000)
            .delay(900)
            .attr("x", function (d, i) {
                return _arc.centroid(d)[0]*1.7;  //中心点坐标
            })
            .attr("y", function (d, i) {
                return _arc.centroid(d)[1]*1.7;
            })
            .filter(function(d,i){
                return d.value>0;
            })
            .text(function (d) {
                return d.value;
            });
        //数字的增加
        shuzi
            .enter()
            .append("text")
            .attr("class","shuzii")
            .style("text-anchor", "middle")
            .attr("transform", "translate(" + _swidth / 2*1.1 + "," + _sheight / 2*1.1 + ")")
            .style("fill", "#fff")
            .on("mouseover", function (d) {
                _tooltipdiv
                    .style("display", "block")
                    .style("top", d3.event.clientY + 10 + "px")
                    .style("left", d3.event.clientX + 10 + "px")
                    .html(d.data.name + "<br/>：" + d.data.value);
            })
            .on("mousemove", function () {
                _tooltipdiv
                    .style("top", d3.event.clientY + 10 + "px")
                    .style("left", d3.event.clientX + 10 + "px")
            })
            .on("mouseout", function (d) {
                _tooltipdiv
                    .style("display", "none");
            })
            .transition()
            .duration(1000)
            .delay(900)
            .attr("x", function (d, i) {
                return _arc.centroid(d)[0]*1.7;  //中心点坐标
            })
            .attr("y", function (d, i) {
                return _arc.centroid(d)[1]*1.7;
            })
            .filter(function(d,i){
                return d.value>0;
            })
            .text(function (d) {

                return d.value;
            });
        //数字的删除
        shuzi_exit
            .remove();
    }


//-------------添加园中间的的“职位”文字-----------
    _svg
        .selectAll(".yuan")
        .data([1])
        .enter()
        .append("circle")
        .attr("cx", function (d, i) {
            return _swidth / 2*1.1;
        })
        .attr("cy", function (d, i) {
            return _sheight / 2*1.1;
        })
        .attr("r", _sheight / 2 * 0.16)
        .style("fill", "#fff");
    _svg.selectAll(".leixing")
        .data([1])
        .enter()
        .append("text")
        .attr("x", function (d, i) {
            return _swidth / 2*1.1;
        })
        .attr("y", function (d, i) {
            return _sheight / 2*1.1;
        })
        .text("职位")
        .attr("dy", "0.5rem")
        .attr("text-anchor", "middle")
        .attr("fill", "#808080")
        .attr("font-size", "35px");

    //添加图例
    var legend = _svg.selectAll(".legend")
        .data(_arcdata)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 30 + ")";
        });
    legend.append("rect")
        .attr("x", 100)
        .attr("y", 11)
        .attr("width", 20)
        .attr("height", 10)
        .style("fill", function (d, i) {
            return _color2[i];
        })
        .on("mouseover",function(d,i){
            //console.log(d3.event);
            var _getindex1=d3.event.target.__data__.index; //获取sunrose_data的索引
            //var _getindex000=d3.event.target.__data__.value; //获取sunrose_data的索引
            _arc
                .innerRadius(_sheight/2*0.21)
                .outerRadius(function () {
                    if (d.value < 20) {
                        return _sheight / 2 * 0.3*_scale;
                    } else if (d.value < 30) {
                        return _sheight / 2 * 0.4*_scale;
                    } else if (d.value < 41) {
                        return _sheight / 2 * 0.5*_scale;
                    } else if (d.value < 80) {
                        return _sheight / 2 * 0.6*_scale;
                    } else if (d.value < 200) {
                        return _sheight / 2 * 0.7*_scale;
                    }
                });
            console.log(_svg.selectAll(".lujing").selectAll("path"));
            var qq=_svg.selectAll(".lujing").selectAll("path")._parents[_getindex1];

         _svg
                .selectAll(qq)
                .data(_pie(sunrose_data))
                .enter()
                .each(function (d, i) {
                 d.duration = (d.endAngle - d.startAngle) / (2 * Math.PI);
                 d.delay = _totalduration;
                 _totalduration += d.duration;
             }).attr("d",_arc);
         /*   _svg.select(".lujing").select(qq)
                //.transition()
                //.duration(500)
                //.ease(d3.easeBounce)
                .attr("d", _arc);
            //console.log(qq);*/
        })
        .on("mouseout",function(d,i){
            var _getindex1=d3.event.target.__data__.index; //获取sunrose_data的索引
            _arc
                .innerRadius(_sheight/2*0.21)
                .outerRadius(function (d, i) {
                    if (d.value < 20) {
                        return _sheight / 2 * 0.3;
                    } else if (d.value < 30) {
                        return _sheight / 2 * 0.4;
                    } else if (d.value < 41) {
                        return _sheight / 2 * 0.5;
                    } else if (d.value < 80) {
                        return _sheight / 2 * 0.6;
                    } else if (d.value < 200) {
                        return _sheight / 2 * 0.7;
                    }
                });

          /*  var qq=_svg.selectAll(".lujing").selectAll("path");
            console.log(qq._parents[_getindex1]);
           _svg.selectAll("'"+qq._parents[_getindex1]+"'")
                                .transition()
                                .duration(500)
                                .attr("d", _arc);*/

        });
    legend.append("text")
        .attr("x", 88)
        .attr("y", 9)
        .attr("dy", "1em")
        .style("text-anchor", "end")
        .text(function (d) {
            return d.data.name;
        })
        .style("fill", "#788A94")
        .style("font-size", "12");

//==============点击事件======================
    var object={name:"",value:""};
    var newarray=[object,object,object,object,object,object,object,object];
        legend
            .selectAll("rect")
            .attr("cursor","pointer")
            .on("click",function(d,i){
                var _getindex=d3.event.target.__data__.index; //获取sunrose_data的索引
                if(newarray[_getindex].value == "") {  //判断新数组中是否有数值
                    newarray[_getindex] = sunrose_data[_getindex];
                    sunrose_data.splice(_getindex, 1, object);
                    d3.select(this).attr("opacity","0.3"); //图例颜色
                    drawpie();
                }else{
                    sunrose_data[_getindex]=newarray[_getindex]; //第二次点击时
                    newarray.splice(_getindex,1,object);
                    d3.select(this).attr("opacity","1");  //图例颜色
                    drawpie();
                }

            });
}
