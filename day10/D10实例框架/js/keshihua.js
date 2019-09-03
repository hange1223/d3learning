/**
 * Created by Administrator on 2017/7/20.
 */
var _tooltipdiv=d3.select('body')
    .append("div")
    .attr("class","tooltip");
var dataset=[
    {name:'城市1',points:[115.6640625, 26.588527147308614],value:5000},
    {name:'城市2',points:[106.34765625, 30.524413269923986],value:2500},
    {name:'城市3',points:[ 114.169921875, 34.379712580462204],value:5500},
    {name:'城市4',points:[ 112.939453125, 30.826780904779774],value:8000}
];
var links = [
    {source: '城市1', target: '城市4', value: 30},
    {source: '城市2', target: '城市4', value: 50},
    {source: '城市3', target: '城市4', value: 20}
];
var geojson = [
    {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Point",
            "coordinates": [
                115.6640625,
                26.588527147308614
            ]
        }
    },
    {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Point",
            "coordinates": [
                106.34765625,
                30.524413269923986
            ]
        }
    },
    {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Point",
            "coordinates": [
                114.169921875,
                34.379712580462204
            ]
        }
    },
    {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Point",
            "coordinates": [
                112.939453125,
                30.826780904779774
            ]
        }
    }
];
drawMap("chart2",dataset,links,geojson);
function drawMap(divname,dataset,links,geojson) {
    var _swidth = $("#"+divname).width();
    var _sheight = $("#"+divname).height();
    //设置div留白
    var _margin = {top:0,left:20,right:20,bottom:80};
    //绘图区宽高
    var _chartHeight=_sheight- _margin.top -_margin.bottom;
    var _chartWidth=_swidth-_margin.left -_margin.right;
//      绘图区边距
    var _chartMargin={top:20,left:20,right:20,bottom:20};
    var datamap = d3.map(dataset, function (d) {
        return d.name;
    });
    var maxdata = d3.max(dataset, function (d) {
        return d.value;
    });
    var rsize = d3.scaleQuantize().domain([0, maxdata]).range([5, 8, 14, 16]);

//1 获取json数据
    d3.json("china.json", function (error, data) {
        //2定义投影
        var _projection = d3.geoMercator()
            .center([107, 31])
            .fitExtent([[0, 0], [_chartWidth,_chartHeight]], data);
        /* .translate([400,300])
         .scale(500);*/
        //3 定义地图路径生成器
        var _geopath = d3.geoPath()
            .projection(_projection);
        //4 基于获取的数据可视化
        var _svg = d3.select("#"+divname)
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%");
        var _glevel1 = _svg.append("g")
            .attr("transform","translate("+(_margin.left+50)+","+_margin.top+")");
        //一级组里添加2级绘图区组
        var _glevel2_chart=_glevel1.append("g")
            .attr("transform","translate(0,0)");
        var _def = _glevel2_chart.append("defs")
            .append("marker")
            .attr("id","arrow")
            .attr("markerWidth",30)
            .attr("markerHeight",30)
            .attr("refx",2)
            .attr("refy",6)
            .attr("orient","auto")
            .append("path")
            .attr("d","M2,2 L2,11 L10,6 L2,2")
            .style("fill","#a6c84c");
        _glevel2_chart.selectAll(".mappath")
            .data(data.features)
            .enter()
            .append("path")
            .attr("d", _geopath)
            .style("fill", "#323c48");
        _svg.selectAll(".pointpath")
         .data(geojson)
         .enter()
         .append("path")
         .attr("class","pointpath")
         .attr("d",_geopath.pointRadius(10))
         .style("fill","#a6c84c");
        _svg.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                var point = d.points;
                var xypoint = _projection(point);
                return xypoint[0];
            })
            .attr("cy", function (d) {
                var point = d.points;
                var xypoint = _projection(point);
                return xypoint[1];
            })
            .attr("r", function (d) {
                return rsize(d.value);
            })
            .style("fill", "#a6c84c");
        _svg.selectAll(".links")
            .data(links)
            .enter()
            .append("path")
            .attr("class", "links")
            .attr("d", function (d) {
                var _sourcename = d.source;
                var _sourcepoint = datamap.get(_sourcename).points;
                var _sourcexy = _projection(_sourcepoint);
                var _targetname = d.target;
                var _targetpoint = datamap.get(_targetname).points;
                var _targetxy = _projection(_targetpoint);
                var _linepath = d3.path();
                _linepath.moveTo(_sourcexy[0], _sourcexy[1]);
                _linepath.lineTo(_targetxy[0], _targetxy[1]);
                return _linepath.toString();
            })
            //添加动画
            .transition()
            .duration(5*1000)
            .attrTween("d",function(d){
                return function(t){
                    var _sourcename= d.source;
                    var _sourceoint=datamap.get(_sourcename).points;
                    var _sourcexy =_projection(_sourceoint);
                    var _targetname= d.target;
                    var _targetponit=datamap.get(_targetname).points;
                    var _targetxyFinal=_projection(_targetponit);
                    var _targetxy=[
                        _sourcexy[0]+(_targetxyFinal[0]-_sourcexy[0])*t,
                        _sourcexy[1]+(_targetxyFinal[1]-_sourcexy[1])*t
                    ];
                    var _linepath=d3.path();
                    _linepath.moveTo(_sourcexy[0],_sourcexy[1]);
                    _linepath.lineTo(_targetxy[0],_targetxy[1]);
                    return _linepath.toString();

                }
            })
            .style("stroke", "orange")
            .attr("marker-end","url(#arrow)")
            .style("stroke-dasharray","5,5");
    });
}
//矩形树图
var datasetTr={
    "name":"家用电器",
    detail:[
        {
            name:"电视",
            detail:[
                {name:"曲面电视",revenue:200},
                {name:"超薄电视",revenue:120},
                {name:"电视配件",revenue:80}
            ]
        },
        {
            name:"空调",
            detail:[
                {name:"壁挂式空调",revenue:80},
                {name:"柜式空调",revenue:40}
            ]
        }
    ]
};
var colorTree=["#af3e6b","#50a940","#6f49ea","#3f8fb5","#b49150"];
$(function(){
    drawTreemap("chart6",datasetTr);
});

function drawTreemap(divname,dataset){
    var _swidth = $("#"+divname).width();
    var _sheight = $("#"+divname).height();
    //设置div留白
    var _svg=d3.select("#"+divname)
        .append("svg")
        .attr("width","100%")
        .attr("height","100%");
    var _chart=_svg.append("g")
        .attr("transform","translate(20,20)");
    var _hierarchydata=d3.hierarchy(dataset,function(d){return d.detail;})
        .sum(function(d){
            return d.revenue;
        });//个数

    var _treemapGen=d3.treemap()
        .tile(d3.treemapBinary)//设置生成方式
        .size([_swidth*0.9,_sheight*0.7]);
//得到了treemap后得到的仍是hieradchy的层次数据
    var _treedata=_treemapGen(_hierarchydata)
        .leaves();
    var _grect=_chart.selectAll(".grect")
        .data(_treedata)
        .enter()
        .append("g");
    _grect.append("rect")
        .attr("x",function(d){
            return d.x0;
        })
        .attr("y",function(d){
            return d.y0;
        })
        .attr("width",function(d){
            return d.x1- d.x0;
        })
        .attr("height",function(d){
            return d.y1- d.y0;
        })
        .style("fill",function(d,i){
            return colorTree[i];
        })
        .style("stroke","#f5f5f5")
        .on("mouseover",function(d,i){
            d3.select(this).style("fill","white");
            d3.select(this.nextElementSibling)
                .style("fill","black");
            d3.select(this.nextElementSibling.nextElementSibling)
                .style("fill","black");
        })
        .on("mouseout",function(){
            d3.select("#"+divname)
                .selectAll("rect").style("fill",function(d,i){
                return colorTree[i];
            });
            d3.select(this.nextElementSibling)
                .style("fill","white");
            d3.select(this.nextElementSibling.nextElementSibling)
                .style("fill","transparent");
        });
    _grect.append("text")
        .attr("x",function(d){
            return d.x0+10;
        })
        .attr("y",function(d){
            return d.y0+10;
        })
        .attr("dy","1em")
        .text(function(d){
            return d.data.name;
        })
        .style("fill","white");
    _grect.append("text")
        .attr("x",function(d){
            return d.x0+10;
        })
        .attr("y",function(d){
            return d.y0+50;
        })
        .attr("dy","1em")
        .text(function(d){
            return d.value;
        })
        .style("fill","transparent");
}
//--------左边柱线混合图
var dataset1=[60000,45000,42000,42000,12000];
var datasetR=[0.2,0.1,0.05,0.02,0.4];
var xlabel=['金花茶','红石榴','鲜苹果','蒙自琵琶','蜜香乌龙'];
var datay=[0,15000,30000,45000,60000];
$(function(){drawRect("chart1",dataset1,datasetR,xlabel);});
function drawRect(divname,dataset,datasetR,xdata){
    //获取div的宽高
    var _swidth = $("#"+divname).width();
    var _sheight = $("#"+divname).height();
    //设置div留白
    var _margin = {top:20,left:40,right:40,bottom:60};
    //绘图区宽高
    var _chartHeight=_sheight- _margin.top -_margin.bottom;
    var _chartWidth=_swidth-_margin.left -_margin.right;
    // 绘图区边距
    var _chartMargin={top:20,left:20,right:20,bottom:20};
    //核心绘图区宽高
    var _yaxisHeight=_chartHeight-_chartMargin.top -_chartMargin.bottom;
    var _xaxisWidth=_chartWidth-_chartMargin.left-_chartMargin.right;
    //div里添加画布
    var _svg = d3.select("#"+divname)
        .append("svg")
        .attr("width","100%")
        .attr("height","100%");
    var _padding=0.4;
    //一级组
    var _glevel1 = _svg.append("g")
        .attr("transform","translate("+_margin.left+","+_margin.top+")");
    //一级组里添加2级绘图区组
    var _glevel2_chart=_glevel1.append("g")
        .attr("transform","translate(0,0)");
    //绘图区组里添加y组
    var _glevel3_yaxisL=_glevel2_chart.append("g")
        .attr("class","gyaxisLfirst")
        .attr("transform","translate("+_chartMargin.left+","+_chartMargin.top+")");
    var _glevel3_yaxisR=_glevel2_chart.append("g")
        .attr("class","gyaxisRfirst")
        .attr("transform","translate("+(_chartMargin.left+_xaxisWidth)+","+_chartMargin.top+")");
    //绘图区组里添加x组
    var _glevel3_xaxis =_glevel2_chart.append("g")
        .attr("class","gxaxisfirst")
        .attr("transform","translate("+_chartMargin.left+","+(_chartHeight-_chartMargin.bottom)+")");
    //绘图区组里添加内容组
    var _glevel3_content = _glevel2_chart.append("g")
        .attr("class","chartcontent")
        .attr("transform","translate("+_chartMargin.left+","+_chartMargin.top+")");
    //y轴连续型比例尺
    var _linescaleL = d3.scaleLinear()
        .domain([0,d3.max(dataset)]).nice()
        .range([_yaxisHeight,0])
        .clamp(true) ;
//     左y轴设置
    var _yaxisL = d3.axisLeft()
        .scale(_linescaleL)
        .tickFormat(d3.format(",.2s"))
        .tickValues(datay);
    //y轴添加
    _yaxisL(_glevel3_yaxisL);

    var _linescaleR= d3.scaleLinear()
        .domain([0,d3.max(datasetR)]).nice()
        .clamp(true)
        .range([_yaxisHeight,0]);

    var _yaxisR = d3.axisRight()
        .scale(_linescaleR)
        .ticks(5)
        .tickFormat(function(d){
            return d*100+"%";
        });
    //y轴添加
    _yaxisR(_glevel3_yaxisR);
    //x轴序数型设置
    var _bandscale = d3.scaleBand()
        .padding(_padding)//20%包括内外边距及段间距paaddingInner只包括段间距
        .domain(xdata)
        .range([0,_xaxisWidth]);
    //x轴设置及添加
    var _xaxis = d3.axisBottom()
        .scale(_bandscale);
    _xaxis(_glevel3_xaxis);
    //以下为添加鼠标点击获取相应x坐标做准备。
    var startx = _bandscale(xdata[0]) - (_bandscale.step()-_bandscale.bandwidth())/2;
    var endx = startx+ _bandscale.step()*(xdata.length);
    var _xnamerange = d3.scaleQuantize()
        .domain([startx,endx])
        .range(xdata);

    _glevel3_content.append("g")
        .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .style("fill","#55ccfd")
        .attr("x",function(d,i){
            return  _bandscale(xdata[i]);
        })
        .attr("y",_yaxisHeight)
        .attr("width",_bandscale.bandwidth())
        .attr("height",0)
        .on("mouseover",function(d,i){
            console.log(d3.event.offsetX);
            var _tooltipx=d3.event.offsetX;
            var _tooltipy=d3.event.offsetY;
            _tooltipdiv.style("top",_tooltipy+"px")
                .style("left",_tooltipx+"px")
                .style("display","block")
                .html( xdata[i]+"<br/>销售额："+d);
        })
        .on("mousemove",function(d,i){
            var _tooltipx=d3.event.x;
            var _tooltipy=d3.event.y;
            _tooltipdiv.style("top",_tooltipy+"px")
                .style("left",_tooltipx+"px");
        })
        .on("mouseout",function(d,i){
            _tooltipdiv.style("display","none");
        })
        .on("click",function(){
            var x = d3.mouse(this)[0];
            alert(_xnamerange(x));
        })
        .transition()
        .duration(5000)
        .attr("y",function(d,i){
            return _linescaleL(d);
        })
        .attr("height",function(d,i){
            return _linescaleL(d3.max(dataset)-d);
        });
    var datazip=d3.zip(xdata,datasetR);
    var _line=d3.line()
        .x(function(d,i){
            //返回实际的月份对应的x坐标
            return _bandscale(d[0])+_bandscale.bandwidth()/2;
        })
        .y(function(d,i){
            //返回实际的销售收入对应的y坐标
            return _linescaleR(d[1]);
        })
        .curve(d3.curveNatural);
    _glevel3_content.append("path")
        .attr("d",_line(datazip))
        .attr("stroke","#ce5285")
        .attr("class","line")
        .style("stroke-width",2)
        .style("fill","none");
    _glevel3_content.selectAll("circle")
        .data(xdata)
        .enter()
        .append("circle")
        .attr("cx",function(d,i){
            //返回实际的月份对应的x坐标
            return _bandscale(xdata[i])+_bandscale.bandwidth()/2;
        })
        .attr("cy",function(d,i){

            return _linescaleR(datasetR[i]);
        })
        .attr("r","3")
        .style("fill","white")
        .style("stroke","#ce5285");
    d3.select(".gxaxisfirst")
        .selectAll("path")
        .attr("stroke","#3e697c");
    d3.select(".gxaxisfirst")
        .selectAll("text")
        .attr("stroke","#8da5ad");
    d3.select(".gyaxisLfirst")
        .selectAll("line")
        .attr("stroke","transparent");
    d3.select(".gyaxisLfirst")
        .selectAll("text")
        .attr("stroke","#8da5ad");
    d3.select(".gyaxisLfirst")
        .selectAll("path")
        .attr("stroke","#3e697c");
    d3.select(".gyaxisRfirst")
        .selectAll("line")
        .attr("stroke","transparent");
    d3.select(".gyaxisRfirst")
        .selectAll("path")
        .attr("stroke","#3e697c");
    d3.select(".gyaxisRfirst")
        .selectAll("text")
        .attr("stroke","#8da5ad");
    drawGridy("gyaxisLfirst",_xaxisWidth,"#3b5e72");
    drawGridx("gxaxisfirst",_yaxisHeight,"#3b5e72");
}
//-----下面中间的柱形图
var dataset3=[50,30,60,70,20,80,100,80,90,65,46,57,29];
var xlabel3=['蒙自市','个旧市','开远市','屏边县','建水县','石屏县','弥勒市','泸西县','元阳县','金平县','红河县',
    '绿春县','河口县'];
$(function(){drawRect2("chart3",dataset3,xlabel3);});
function drawRect2(divname,dataset,xdata){
    //获取div的宽高
    var _swidth = $("#"+divname).width();
    var _sheight = $("#"+divname).height();
    //设置div留白
    var _margin = {top:20,left:20,right:20,bottom:60};
    //绘图区宽高
    var _chartHeight=_sheight- _margin.top -_margin.bottom;
    var _chartWidth=_swidth-_margin.left -_margin.right;
//      绘图区边距
    var _chartMargin={top:20,left:20,right:20,bottom:20};
    //核心绘图区宽高
    var _yaxisHeight=_chartHeight-_chartMargin.top -_chartMargin.bottom;
    var _xaxisWidth=_chartWidth-_chartMargin.left-_chartMargin.right;
    //div里添加画布
    var _svg = d3.select("#"+divname)
        .append("svg")
        .attr("width","100%")
        .attr("height","100%");
    var _padding=0.4;
    //一级组
    var _glevel1 = _svg.append("g")
        .attr("transform","translate("+_margin.left+","+_margin.top+")");
    //一级组里添加2级绘图区组
    var _glevel2_chart=_glevel1.append("g")
        .attr("transform","translate(0,0)");
    //绘图区组里添加y组
    var _glevel3_yaxis=_glevel2_chart.append("g")
        .attr("class","gyaxis2")
        .attr("transform","translate("+_chartMargin.left+","+_chartMargin.top+")");
    //绘图区组里添加x组
    var _glevel3_xaxis =_glevel2_chart.append("g")
        .attr("class","gxaxis2")
        .attr("transform","translate("+_chartMargin.left+","+(_chartHeight-_chartMargin.bottom)+")");
    //绘图区组里添加内容组
    var _glevel3_content = _glevel2_chart.append("g")
        .attr("class","chartcontent")
        .attr("transform","translate("+_chartMargin.left+","+_chartMargin.top+")");
    //y轴连续型比例尺
    var _linescale = d3.scaleLinear()
        .domain( [0,d3.max(dataset)] ).nice()
        .range([_yaxisHeight,0])
        .clamp(true) ;
//     左y轴设置
    var _yaxis = d3.axisLeft()
        .scale(_linescale)
        .ticks(5);
    //y轴添加
    _yaxis(_glevel3_yaxis);
    //x轴序数型设置
    var _bandscale = d3.scaleBand()
        .paddingInner(_padding)//20%包括内外边距及段间距paaddingInner只包括段间距
        .domain(xdata)
        .range([0,_xaxisWidth]);
    //x轴设置及添加
    var _xaxis = d3.axisBottom()
        .scale(_bandscale);
    _xaxis(_glevel3_xaxis);
    _glevel3_content.append("g")
        .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x",function(d,i){
            return  _bandscale(xdata[i]);
        })
        .attr("y",function(d,i){
            return _yaxisHeight - _linescale(d3.max(dataset)-d);
        })
        .attr("width",_bandscale.bandwidth())
        .attr("height",function(d,i){
            return _linescale(d3.max(dataset)-d);
        })
        .style("fill","#4cbddb")
        .on("mouseover",function(d,i){
            var _tooltipx=d3.event.clientX;
            var _tooltipy=d3.event.clientY;
            _tooltipdiv.style("top",_tooltipy-100+"px")
                .style("left",_tooltipx-100+"px")
                .style("display","block")
                .html( xdata[i]+"<br/>销售额："+d);
        })
        .on("mousemove",function(d,i){
            var _tooltipx=d3.event.x;
            var _tooltipy=d3.event.y;
            _tooltipdiv.style("top",_tooltipy+"px")
                .style("left",_tooltipx+"px");
        })
        .on("mouseout",function(d,i){
            _tooltipdiv.style("display","none");
        });

    d3.select(".gxaxis2")
        .selectAll("line")
        .attr("stroke","#e1e1e1");
    d3.select(".gxaxis2")
        .selectAll("path")
        .attr("stroke","#e1e1e1");
    d3.select(".gxaxis2")
        .selectAll("text")
        .style("fill","#8da5ad")
        .style("font-size","16px");
    d3.select(".gyaxis2")
        .selectAll("line")
        .attr("stroke","transparent");
    d3.select(".gyaxis2")
        .selectAll("path")
        .attr("stroke","transparent");
    d3.select(".gyaxis2")
        .selectAll("text")
        .style("fill","#8da5ad")
        .style("font-size","12px");
    drawGridy("gyaxis2",_xaxisWidth,"#3b5e72");
    drawGridx("gxaxis2",_yaxisHeight,"#3b5e72");
}
function drawGridy(divname,xwidth,color){
    d3.select("."+divname)
        .selectAll("g")
        .append("line")
        .attr("x1",0)
        .attr("y1",0)
        .attr("x2",xwidth)
        .attr("y2",0)
        .attr("stroke",color)
        .attr("stroke-width","0.5");
}
function drawGridx(divname,yheight,color){
    d3.select("."+divname)
        .selectAll("g")
        .append("line")
        .attr("x1",0)
        .attr("y1",0)
        .attr("x2",0)
        .attr("y2",-yheight)
        .attr("stroke",color)
        .attr("stroke-width","0.5");
}
//-----南丁格尔玫瑰图及饼图
var datapie=[
    {name:"金花茶",value:40},
    {name:"鲜苹果",value:35},
    {name:"甜石榴",value:20},
    {name:"蜜香乌龙",value:15},
    {name:"蒙自琵琶",value:9}
];
//var colorset=['#7260af','#7260af','#aa99c8','#7260af','#d4c4db','#a563ad','#d4c4db'];
drawPie("chart4",datapie);
function drawPie(divname,dataset){
    var _swidth = $("#"+divname).width();
    var _sheight = $("#"+divname).height();
    //设置div留白
    var _margin = {top:20,left:40,right:40,bottom:60};
    //绘图区宽高
    var _chartHeight=_sheight- _margin.top -_margin.bottom;
    var _chartWidth=_swidth-_margin.left -_margin.right;
//      绘图区边距
    var _chartMargin={top:20,left:20,right:20,bottom:20};
    var _svg = d3.select("#"+divname)
        .append("svg")
        .attr("width","100%")
        .attr("height","100%");
    var _glevel1 = _svg.append("g")
        .attr("transform","translate("+_margin.left+","+_margin.top+")");
    var _glevel2_legend=_glevel1.append("g")
        .attr("transform","translate(20,"+_margin.top+")");

    //一级组里添加2级绘图区组
    var _glevel2_chart=_glevel1.append("g")
        .attr("transform","translate(0,0)");
    var _glevel3_content = _glevel2_chart.append("g")
        .attr("class","chartcontent")
        .attr("transform","translate("+(_chartWidth/3*2)+","+_chartHeight/2+")");
    var _pie=d3.pie()
        .value(function(d){
            return d.value;
        });
    var _arcdata=_pie(dataset);
    var _arc=d3.arc()
        .innerRadius(40)
        .outerRadius(function(d){
            if(d.value>36){return _chartHeight*0.55;}
            else if(d.value>30){return _chartHeight*0.5;}
            else if(d.value>19){return _chartHeight*0.4;}
            else if(d.value>10){return _chartHeight*0.3;}
            else{return _chartHeight*0.2;}
        });
    var totalduration=0;
    _glevel3_content.append("g")
        .selectAll("path")
        .data(_arcdata)
        .enter()
        .each(function(d,i){
            d.duration =(d.endAngle- d.startAngle)/(2*Math.PI)*3;
            d.delay=totalduration;
            totalduration=totalduration+d.duration;
        })
        .append("path")
        .attr("d",_arc)
        .style("fill",function(d,i){
            return colorTree[i];
        })
        .style("stroke","white")
        .on("mouseover",function(d,i){
            var _tooltipx=d3.event.offsetX;
            var _tooltipy=d3.event.offsetY;
            _tooltipdiv.style("top",_tooltipy+"px")
                .style("left",_tooltipx+"px")
                .style("display","block")
                .html(d.data.name+"<br/>销售占比："+ d.data.value+"%");
        })
        .on("mousemove",function(d,i){
            var _tooltipx=d3.event.x;
            var _tooltipy=d3.event.y;
            _tooltipdiv.style("top",_tooltipy+"px")
                .style("left",_tooltipx+10+"px");
        })
        .on("mouseout",function(d,i){
            _tooltipdiv.style("display","none");
        });
    var sumdata=d3.sum(dataset,function(d){return d.value;});
    _glevel3_content.selectAll("text")
        .data(_arcdata)
        .enter()
        .append("text")
        .attr("x",function(d,i){
            return  _arc.centroid(d)[0];
        })
        .attr("y",function(d,i){
            return  _arc.centroid(d)[1];
        })
        .text(function(d){
            return (d.value/sumdata*100).toFixed(1)+"%";
        })
        .attr("text-anchor","middle")
        .style("font-size","12px")
        .style("fill","white");
    _glevel3_content.append("circle")
        .attr("cx","0")
        .attr("cy","0")
        .attr("r",20)
        .style("fill","#dcdcdc");
    _glevel3_content.append("text")
        .attr("x","0")
        .attr("y","0")
        .text("类型")
        .style("fill","#818181")
        .attr("text-anchor","middle")
        .attr("dy","0.5em");
    _glevel2_legend.selectAll(".lengend")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("class","lengend")
        .attr("cx","-20")
        .attr("cy",function(d,i){
            return i*30;
        })
        .attr("r","10")
        .style("fill",function(d,i){
            return colorTree[i];
        });
    _glevel2_legend.selectAll(".lengendtext")
        .data(dataset)
        .enter()
        .append("text")
        .attr("class","lengendtext")
        .attr("x","-20")
        .attr("y",function(d,i){
            return i*30;
        })
        .attr("dx","1em")
        .attr("dy","0.2em")
        .attr("text-anchor","left")
        .text(function(d){return d.name;})
        .style("fill","#8da5ad");
}
//-----------散点图
var datasetSand = [
    ['白酒',175,1477],['饼干',249,2258],['炒货',261,2329],
    ['除污类',230,2775],['果酒',5,2523],['护理用品',204,1886],
    ['家用杂品',255,2333],['洁面护肤',267,1392],['进口食品',164,1551],
    ['毛巾',68,1655],['面点类',35,2310],['面类',21,1903],
    ['沐浴',170,1893],['啤酒',190,1898],['其他',212,1248],
    ['肉及水产',179,1166],['食材',213,1497],['食品杂货',180,2439],
    ['蔬菜类',10,2389],['糖果',28,1417],['调料类',299,2179],
    ['文具期刊',203,1785],['洗发',132,1545],['洗衣类',187,1850],
    ['香烟',234,1968],['小五金',208,1320],['休闲小食',188,1465],
    ['牙膏牙刷',93,1492],['饮料',85,1943],['纸质品',127,2336]
];
//[ ['白酒','饼干','炒货'...],[175,249,261..],[1477,2258,2329...] ]
var dataset_new = d3.transpose(datasetSand);

var dlabel = dataset_new[0];
var xdatavalue=dataset_new[1];
var xdata = ['50','100','150','200','250',"300"];
var ydata = dataset_new[2];

var _colorscale = d3.scaleQuantize()
    .domain([1000,3000])
    .range(['#ce406b','#5e40c4','#d1a556','#44a8d4','#4265c6']);

drawscatter("chart5",ydata,xdata,dlabel);

function drawscatter(divname,ydata,xdata,dlabel){

    var _swidth = $("#"+divname).width();
    var _sheight = $("#"+divname).height();
    var _margin = {top:5,left:30,right:10,bottom:50};
    //得到绘图区的高度和宽度
    var _chartHeight = _sheight - _margin.top - _margin.bottom;
    var _chartWidth = _swidth - _margin.left - _margin.right;

    //核心绘图区的边距
    var _chartmargin  =  {top:5,left:20,right:20,bottom:20};

    //核心绘图区的高度和宽度
    var _yaxisHeight = _chartHeight - _chartmargin.top - _chartmargin.bottom;
    var _xaxisWidth = _chartWidth - _chartmargin.left - _chartmargin.right;
    var _svg = d3.select("#"+divname)
        .append("svg")
        .attr("width",_swidth)
        .attr("height",_sheight);


    var _glevel1 = _svg.append("g")
        .attr("transform","translate("+_margin.left +","+_margin.top+")");
    var _glevel2_chart = _glevel1.append("g")
        .attr("transform","translate(0,20)");

    var _gleve3_yaxis = _glevel2_chart.append("g")
        .attr("class","gyaxisSc")
        .attr("transform","translate("+_chartmargin.left+","+_chartmargin.top+")");


    var _gleve3_xaxis = _glevel2_chart.append("g")
        .attr("class","gxaxisSc")
        .attr("transform","translate("+_chartmargin.left+","+(_chartHeight - _chartmargin.bottom)+")");

    var _gleve3_content = _glevel2_chart.append("g")
        .attr("class","chartcontent")
        .attr("transform","translate("+_chartmargin.left+","+_chartmargin.top+")");


    //定义Y轴比例尺
    var _yscale = d3.scaleLinear()
        .domain( [0 , d3.max(ydata) ] ).nice()
        .range([_yaxisHeight,0])
        .clamp(true) ;
    //定义Y轴坐标轴，使用前面定义的比例尺
    var _yaxis = d3.axisLeft()
        .scale(_yscale)
        .ticks(5);

    _yaxis(_gleve3_yaxis);

    //定义X轴比例尺
    var _xscale=d3.scaleBand()// x是序数比例尺
        .domain(xdata)
        .range([0,_xaxisWidth]);
    //定义X轴坐标轴
    var _xaxis = d3.axisBottom()
        .scale(_xscale);

    _xaxis(_gleve3_xaxis);

    _gleve3_content.append("g")
        .selectAll("circle")
        .data(dlabel)
        .enter()
        .append("circle")
        .attr("cx",0)
        .attr("cy",_yaxisHeight)
        .attr("r","0")
        .style("fill",function(d,i){
            return _colorscale(ydata[i]);
        })
        .transition()
        .duration(5000)
        .ease(d3.easeBounce)
        .attr("cx",function(d,i){
            return   _xscale(xdata[i])+_xscale.bandwidth()/2;
        })
        .attr("cy",function(d,i){
            return _yscale(ydata[i]) ;
        })
        .attr("r","10");
//
    _gleve3_content.append("g")
        .selectAll("text")
        .data(dlabel)
        .enter()
        .append("text")
        .attr("x",0)
        .attr("y",_yaxisHeight)
        .attr("dx",'10')
        .attr("dy","0.5em")
        .style("fill",function(d,i){
            return _colorscale(ydata[i]);
        })
        .transition()
        .duration(5000)
        .ease(d3.easeBounce)
        .attr("x",function(d,i){
            return _xscale(xdata[i]);
        })
        .attr("y",function(d,i){
            return _yscale(ydata[i]);
        })
        .filter(function(d,i){
            return ydata[i]>2500;
        })
        .text(function(d,i){
            return d;
        });

    d3.select(".gxaxisSc")
        .selectAll("line")
        .attr("stroke","#e1e1e1");
    d3.select(".gxaxisSc")
        .selectAll("path")
        .attr("stroke","#e1e1e1");
    d3.select(".gxaxisSc")
        .selectAll("text")
        .style("fill","#8da5ad")
        .style("font-size","16px");
    d3.select(".gyaxisSc")
        .selectAll("line")
        .attr("stroke","transparent");
    d3.select(".gyaxisSc")
        .selectAll("path")
        .attr("stroke","transparent");
    d3.select(".gyaxisSc")
        .selectAll("text")
        .style("fill","#8da5ad")
        .style("font-size","12px");
    drawGridy("gyaxisSc",_xaxisWidth,"#3b5e72");
    drawGridx("gxaxisSc",_yaxisHeight,"#3b5e72");
}
