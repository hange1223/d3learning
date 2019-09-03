/**
 * Created by Administrator on 2017/7/17.
 */
//-------------------------------------------矩形树图
var dataset={
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
drawTreemap("treemap",dataset);
function drawTreemap(divname,dataset){
    var _swidth = $("#"+divname).width();
    var _sheight = $("#"+divname).height();
    //设置div留白
    var _margin = {top:20,left:140,right:140,bottom:60};
    var _svg=d3.select("#"+divname)
        .append("svg")
        .attr("width","100%")
        .attr("height","100%");
    //设置title高度
    var _titleHeight=50;
    var _title=_svg.append("g");
    var _chart=_svg.append("g")
        .attr("transform","translate(0,80)");
    var _hierarchydata=d3.hierarchy(dataset,function(d){return d.detail;})
        .sum(function(d){
            return d.revenue;
        });//个数

    var _treemapGen=d3.treemap()
        .tile(d3.treemapBinary)//设置生成方式
        .size([_swidth,_sheight-80]);
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
        .style("fill","#57666d")
        .style("stroke","#f5f5f5")
        .on("mouseover",function(d,i){
            d3.select(this).style("fill","white");
            d3.select(this.nextElementSibling)
                .style("fill","black");
            d3.select(this.nextElementSibling.nextElementSibling)
                .style("fill","black");
            console.log(d);
        })
        .on("mouseout",function(){
            d3.select(this).style("fill","#57666d");
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
    _title.append("rect")
        .attr("x",0)
        .attr("y",20)
        .attr("width","10")
        .attr("height",30)
        .style("fill","white");
    _title.append("text")
        .attr("x",30)
        .attr("y",20)
        .text("各市县电商实力对比")
        .attr("text-anchor","left")
        .attr("dy","0.8em")
        .style("fill","#e1e1e1")
        .style("font-size","30px");
}
//--------------------------------------------饼图
var datapie=[
    {name:"金花茶",value:40},
    {name:"甜石榴",value:20},
    {name:"鲜苹果",value:15},
    {name:"蜜香乌龙",value:15},
    {name:"蒙自琵琶",value:15},
    {name:"迷香普洱",value:15},
    {name:"梯田红印",value:15},
    {name:"干米线",value:15}
];
var _tooltipdiv=d3.select('body')
    .append("div")
    .attr("id","tooltip");
var colorset=['#7260af','#7260af','#aa99c8','#7260af','#d4c4db','#a563ad','#d4c4db'];
drawPie("mypie",datapie);
function drawPie(divname,dataset){
    var _swidth = $("#"+divname).width();
    var _sheight = $("#"+divname).height();
    //设置div留白
    var _margin = {top:20,left:140,right:140,bottom:60};
    //设置title高度
    var _titleHeight=50;
    //绘图区宽高
    var _chartHeight=_sheight- _margin.top -_margin.bottom- _titleHeight;
    var _chartWidth=_swidth-_margin.left -_margin.right;
//      绘图区边距
    var _chartMargin={top:20,left:20,right:20,bottom:20};
    var _svg = d3.select("#"+divname)
        .append("svg")
        .attr("width","100%")
        .attr("height","100%");
    var _glevel1 = _svg.append("g")
        .attr("transform","translate("+_margin.left+","+_margin.top+")");
    var _title=_glevel1.append("g");
    var _glevel2_legend=_glevel1.append("g")
        .attr("transform","translate("+_chartWidth/3*2+","+_margin.top+")");

    //一级组里添加2级绘图区组
    var _glevel2_chart=_glevel1.append("g")
        .attr("transform","translate(0,"+_titleHeight+")");
    var _glevel3_content = _glevel2_chart.append("g")
        .attr("class","chartcontent")
        .attr("transform","translate("+(_chartWidth/1.5)+","+_chartHeight/2+")");
    var _pie=d3.pie()
        .value(function(d){
            return d.value;
        });
    var _arcdata=_pie(dataset);
    var _arc=d3.arc()
        .innerRadius(0)
        .outerRadius(_chartHeight*0.4);
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
        .style("fill","#57c48d")
        .style("stroke","white")
        .on("mouseover",function(d,i){
            var _tooltipx=d3.event.x;
            var _tooltipy=d3.event.y;
            _tooltipdiv.style("top",_tooltipy+"px")
                .style("left",_tooltipx+10+"px")
                .style("display","block")
                .html(d.data.name+"<br/>投诉占比："+ d.data.value+"%");
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
    _glevel3_content.selectAll("text")
        .data(_arcdata)
        .enter()
        .append("text")
        .attr("x",function(d,i){
            return  _arc.centroid(d)[0]*2.5;
        })
        .attr("y",function(d,i){
            return  _arc.centroid(d)[1]*2.5;
        })
        .text(function(d){
            return d.data.name;
        })
        .attr("text-anchor","middle")
        .style("fill","white");
    _title.append("rect")
        .attr("x",0)
        .attr("y",0)
        .attr("width","10")
        .attr("height",30)
        .style("fill","white");
    _title.append("text")
        .attr("x",30)
        .attr("y",0)
        .text("各类目销售额占比")
        .attr("text-anchor","left")
        .attr("dy","0.8em")
        .style("fill","#e1e1e1")
        .style("font-size","30px");

}
//-------------------------------柱图
var dataset3=[60000,45000,42000,42000];
var colorset3=['#3eb27e','#abdb9c','#ff8447','#ffca62'];
var xlabel=['甜石榴','鲜苹果','蒙自琵琶','梯田红印','金花茶'];
var xlabel2=['2015年第39周','2015年第40周','2015年第41周','2015年第42周'];
var datapv=[1555,	2410,	1654,	648,	463];
var datauv=[555,	710,	654,	348,	263];
var datapvr=[-5,-7.1,5.4,4.8,-3,9.3,-5.5];
var datauvr=[-6,-2.1,1.4,1.8,-1,2.3,-3.5];
$(function(){
    drawRect("myrect",datapv,datauv,xlabel);
});
function drawRect(divname,ydata1,ydata2,xlabel){
    var _swidth = $("#"+divname).width();
    var _sheight = $("#"+divname).height();
    var _margin = {top:20,left:40,right:40,bottom:60};
    var _titleHeight=50;
    var _chartHeight=_sheight- _margin.top -_margin.bottom- _titleHeight-50;
    var _chartWidth=_swidth-_margin.left -_margin.right;
    var _chartMargin={top:20,left:20,right:20,bottom:20};
    var _yaxisHeight=_chartHeight-_chartMargin.top -_chartMargin.bottom;
    var _xaxisWidth=_chartWidth-_chartMargin.left-_chartMargin.right;
    var _svg = d3.select("#"+divname)
        .append("svg")
        .attr("width","100%")
        .attr("height","100%");
    var _padding=0.4;
    //一级组
    var _glevel1 = _svg.append("g")
        .attr("transform","translate("+_margin.left+","+_margin.top+")");
    //一级组里添加2级title组
    var _glevel2_title=_glevel1.append("g");

    var _glevel2_chart=_glevel1.append("g")
        .attr("transform","translate(0,"+_titleHeight+")");
    //绘图区组里添加左边y组
    var _glevel3_yaxisL=_glevel2_chart.append("g")
        .attr("class","gyaxisL")
        .attr("transform","translate("+_chartMargin.left+","+(_chartMargin.top+30)+")");

    //绘图区组里添加x组
    var _glevel3_xaxisB =_glevel2_chart.append("g")
        .attr("class","gxaxisB")
        .attr("transform","translate("+_chartMargin.left+","+(_chartHeight+30)+")");
    //绘图区组里添加内容组
    var _glevel3_content = _glevel2_chart.append("g")
        .attr("class","chartcontent")
        .attr("transform","translate("+_chartMargin.left+","+(_chartMargin.top+30)+")");
    //y轴连续型比例尺
    var _yLscale = d3.scaleLinear()
        .domain([0,d3.max(ydata1)]).nice()
        .range([_yaxisHeight,0])
        .clamp(true);
//     左y轴设置
    var _yLaxis = d3.axisLeft()
        .scale(_yLscale)
        .ticks(8);
    //y轴添加
    _yLaxis(_glevel3_yaxisL);
    //x轴序数型设置

    var _xBscale = d3.scaleBand()
        .padding(_padding)//20%包括内外边距及段间距paaddingInner只包括段间距
        .domain(xlabel)
        .range([0,_xaxisWidth]);
    //x轴设置及添加
    var _xBaxis = d3.axisBottom()
        .scale(_xBscale);
    //.ticks(2);???????????????????????????????????
    _xBaxis(_glevel3_xaxisB);
    _glevel3_content.append("g")
        .selectAll("rect")
        .data(ydata1)
        .enter()
        .append("rect")
        .attr("x",function(d,i){
            return  _xBscale(xlabel[i]);
        })
        .attr("y",function(d,i){
            return _yLscale(d);
        })
        .attr("width",_xBscale.bandwidth()/2)
        .attr("height",function(d,i){
            return _yLscale(d3.max(ydata1)-d);
        })
        .style("fill","#879296");
    _glevel3_content.append("g")
        /*.attr("transform","translate(0,-65)")*/
        .selectAll("rect")
        .data(ydata2)
        .enter()
        .append("rect")
        .attr("x",function(d,i){
            return  _xBscale(xlabel[i])+_xBscale.bandwidth()/2;
        })
        .attr("y",function(d,i){
            return _yLscale(d);
        })
        .attr("width",_xBscale.bandwidth()/2)
        .attr("height",function(d,i){
            return _yLscale(d3.max(ydata1)-d);
        })
        .style("fill","#ffffff");


    d3.select(".gxaxisB")
        .selectAll("line")
        .attr("stroke","#e1e1e1");
    d3.select(".gxaxisB")
        .selectAll("path")
        .attr("stroke","#e1e1e1");
    d3.select(".gxaxisB")
        .selectAll("text")
        .style("fill","white")
        .style("font-size","16px");
    d3.select(".gyaxisL")
        .selectAll("line")
        .attr("stroke","transparent");
    d3.select(".gyaxisL")
        .selectAll("path")
        .attr("stroke","transparent");
    d3.select(".gyaxisL")
        .selectAll("text")
        .style("fill","#e1e1e3")
        .style("font-size","16px");
    _glevel2_title.append("rect")
        .attr("x",0)
        .attr("y",0)
        .attr("width","10")
        .attr("height",30)
        .style("fill","white");
    _glevel2_title.append("text")
        .attr("x",30)
        .attr("y",0)
        .text('品牌行业单店销售额'+"\n"+ '全国水平')
        .attr("text-anchor","left")
        .attr("dy","0.8em")
        .style("fill","#e1e1e1")
        .style("font-size","1.8em");
    _glevel2_title.append("rect")
        .attr("x",20)
        .attr("y",50)
        .attr("rx",3)
        .attr("ry",3)
        .attr("width",20)
        .attr("height",20)
        .style("fill","white");
    _glevel2_title.append("text")
        .attr("x",50)
        .attr("y",50)
        .text("全国指数")
        .attr("text-anchor","left")
        .attr("dy","0.8em")
        .style("fill","#e1e1e1")
        .style("font-size","20px");
    _glevel2_title.append("rect")
        .attr("x",150)
        .attr("y",50)
        .attr("rx",3)
        .attr("ry",3)
        .attr("width",20)
        .attr("height",20)
        .style("fill","#acb4b7");
    _glevel2_title.append("text")
        .attr("x",180)
        .attr("y",50)
        .text("全国指数")
        .attr("text-anchor","left")
        .attr("dy","0.8em")
        .style("fill","#acb4b7")
        .style("font-size","20px");
}
//--------------------------------------柱图
var dataset2=[50,30,60,70,20,80,100,80,90,65,46,57,29];
var xlabel3=['蒙自市','个旧市','开远市','屏边县','建水县','石屏县','弥勒市','泸西县','元阳县','金平县','红河县',
    '绿春县','河口县'];
$(function(){drawRect2("shops",dataset2,xlabel3);});
function drawRect2(divname,dataset,xdata){
    //获取div的宽高
    var _swidth = $("#"+divname).width();
    var _sheight = $("#"+divname).height();
    //设置div留白
    var _margin = {top:20,left:20,right:20,bottom:80};
    //设置title高度
    var _titleHeight=50;
    //绘图区宽高
    var _chartHeight=_sheight- _margin.top -_margin.bottom- _titleHeight;
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
    //一级组里添加2级title组
    var _glevel2_title=_glevel1.append("g");
    //一级组里添加2级绘图区组
    var _glevel2_chart=_glevel1.append("g")
        .attr("transform","translate(0,"+_titleHeight+")");
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
        .attr("rx","5")
        .attr("ry","5")
        .attr("width",_bandscale.bandwidth())
        .attr("height",function(d,i){
            return _linescale(d3.max(dataset)-d);
        })
        .style("fill","#879296");
    _glevel2_title.append("rect")
        .attr("x",0)
        .attr("y",10)
        .attr("width","10")
        .attr("height",30)
        .style("fill","white");
    _glevel2_title.append("text")
        .attr("x",30)
        .attr("y",10)
        .text("各市总店铺数对比")
        .attr("text-anchor","left")
        .attr("dy","0.8em")
        .style("fill","#e1e1e1")
        .style("font-size","30px");

    d3.select(".gxaxis2")
        .selectAll("line")
        .attr("stroke","#e1e1e1");
    d3.select(".gxaxis2")
        .selectAll("path")
        .attr("stroke","#e1e1e1");
    d3.select(".gxaxis2")
        .selectAll("text")
        .style("fill","#e1e1e3")
        .style("font-size","16px");
    d3.select(".gyaxis2")
        .selectAll("line")
        .attr("stroke","transparent");
    d3.select(".gyaxis2")
        .selectAll("path")
        .attr("stroke","transparent");
    d3.select(".gyaxis2")
        .selectAll("text")
        .style("fill","#e1e1e3")
        .style("font-size","16px");
    drawGridy("gyaxis2",_xaxisWidth,"grey");
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
//--------------------------------最后一个柱图
var dataset4=[50,30,60,70];
var xlabel4=['4月份','5月份','6月份','7月份'];
$(function(){drawRect3("deal",dataset4,xlabel4);});
function drawRect3(divname,dataset,xdata){
    //获取div的宽高
    var _swidth = $("#"+divname).width()*0.8;
    var _sheight = $("#"+divname).height();
    //设置div留白
    var _margin = {top:20,left:20,right:20,bottom:80};
    //设置title高度
    var _titleHeight=50;
    //绘图区宽高
    var _chartHeight=_sheight- _margin.top -_margin.bottom- _titleHeight;
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
        .attr("transform","translate("+(_margin.left+50)+","+_margin.top+")");
    //一级组里添加2级title组
    var _glevel2_title=_glevel1.append("g");
    //一级组里添加2级绘图区组
    var _glevel2_chart=_glevel1.append("g")
        .attr("transform","translate(0,"+_titleHeight+")");
    //绘图区组里添加y组
    var _glevel3_yaxis=_glevel2_chart.append("g")
        .attr("class","gyaxis4")
        .attr("transform","translate("+_chartMargin.left+","+_chartMargin.top+")");
    //绘图区组里添加x组
    var _glevel3_xaxis =_glevel2_chart.append("g")
        .attr("class","gxaxis4")
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
        .attr("rx","5")
        .attr("ry","5")
        .attr("width",_bandscale.bandwidth())
        .attr("height",function(d,i){
            return _linescale(d3.max(dataset)-d);
        })
        .style("fill","#879296");
    _glevel2_title.append("rect")
        .attr("x",0)
        .attr("y",10)
        .attr("width","10")
        .attr("height",30)
        .style("fill","white");
    _glevel2_title.append("text")
        .attr("x",30)
        .attr("y",10)
        .text("交易额同比增长")
        .attr("text-anchor","left")
        .attr("dy","0.8em")
        .style("fill","#e1e1e1")
        .style("font-size","30px");

    d3.select(".gxaxis4")
        .selectAll("line")
        .attr("stroke","#e1e1e1");
    d3.select(".gxaxis4")
        .selectAll("path")
        .attr("stroke","#e1e1e1");
    d3.select(".gxaxis4")
        .selectAll("text")
        .style("fill","#e1e1e3")
        .style("font-size","16px");
    d3.select(".gyaxis4")
        .selectAll("line")
        .attr("stroke","transparent");
    d3.select(".gyaxis4")
        .selectAll("path")
        .attr("stroke","transparent");
    d3.select(".gyaxis4")
        .selectAll("text")
        .style("fill","#e1e1e3")
        .style("font-size","16px");
    drawGridy("gyaxis2",_xaxisWidth,"grey");
}
//-----------------------------------中国地图
var datasetMap = [{name:'安徽',value:421},

    {name:'安徽',value:421},

    {name:'北京',value:517},

    {name:'重庆',value:217},

    {name:'福建',value:214},

    {name:'广东',value:338},

    {name:'甘肃',value:849},

    {name:'广西',value:285},

    {name:'贵州',value:582},

    {name:'河北',value:375},

    {name:'黑龙江',value:888},

    {name:'河南',value:792},

    {name:'海南',value:615},

    {name:'湖北',value:943},

    {name:'湖南',value:969},

    {name:'江苏',value:255},

    {name:'江西',value:593},

    {name:'吉林',value:593},

    {name:'辽宁',value:392},

    {name:'内蒙古',value:307},

    {name:'宁夏',value:124},

    {name:'青海',value:660},

    {name:'山西',value:680},

    {name:'陕西',value:648},

    {name:'山东',value:754},

    {name:'上海',value:201},

    {name:'四川',value:106},

    {name:'天津',value:412},

    {name:'台湾',value:562},

    {name:'香港',value:767},

    {name:'西藏',value:232},

    {name:'新疆',value:269},

    {name:'云南',value:424},

    {name:'浙江',value:638}
];
drawMap("chinamap");
function drawMap(divname){
    var _swidth = $("#"+divname).width();
    var _sheight = $("#"+divname).height();
    //设置div留白
    var _margin = {top:20,left:20,right:20,bottom:80};
    //设置title高度
    var _titleHeight=50;
    //绘图区宽高
    var _chartHeight=_sheight- _margin.top -_margin.bottom- _titleHeight;
    var _chartWidth=_swidth-_margin.left -_margin.right;
//      绘图区边距
    var _chartMargin={top:20,left:20,right:20,bottom:20};
    //核心绘图区宽高
    //div里添加画布
    var _svg = d3.select("#"+divname)
        .append("svg")
        .attr("width","100%")
        .attr("height","100%");
    var _glevel1 = _svg.append("g")
        .attr("transform","translate("+(_margin.left+50)+","+_margin.top+")");
    //一级组里添加2级title组
    var _glevel2_title=_glevel1.append("g");
    //一级组里添加2级绘图区组
    var _glevel2_chart=_glevel1.append("g")
        .attr("transform","translate(0,"+_titleHeight+")");
    var maxdata=d3.max(datasetMap,function(d){return d.value;});
//量化比例尺
    var color=d3.scaleQuantize().domain([700,maxdata]).range(['green','greenyellow','yellowgreen','orange','red']);
//定义map对象，根据省份名称作为键值
    var mapdata=d3.map(datasetMap,function(d){return d.name;});
//1 获取json数据
    d3.json("china.json",function(error,data){
        //2定义投影
        var _projection=d3.geoMercator()
            .center([107,31])
            .fitExtent([[0,0],[_chartWidth,_chartHeight]],data);
        /* .translate([400,300])
         .scale(500);*/
        //3 定义地图路径生成器
        var _geopath=d3.geoPath()
            .projection(_projection);
        //4 基于获取的数据可视化
        _glevel2_chart.selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .attr("d",_geopath)
            .style("fill","#fefefe")
            .style("stroke","#0f262c");
        //基于地图里每个省份的中心点坐标添加文本信息
        /*_svg.selectAll("text")
         .data(data.features)
         .enter()
         .append("text")
         .attr("x",function(d){
         //使用_projection经纬度换算xy坐标
         var point=d.properties.cp;
         return _projection(point)[0];
         })
         .attr("y",function(d){
         var point=d.properties.cp;
         return _projection(point)[1];
         })
         .text(function(d){
                if(mapdata.get(d.properties.name)){return mapdata.get(d.properties.name).value;}
                else{return "";}
         })
         .style("fill","black");*/
        _glevel2_chart.selectAll("text")
            .data(data.features)
            .enter()
            .append("text")
            .attr("x",function(d){
                //使用_projection经纬度换算xy坐标
                return _geopath.centroid(d)[0];
            })
            .attr("y",function(d){
                return _geopath.centroid(d)[1];
            })
            .attr("dy","1em")
            .text(function(d){
                //con.log(mapdata.get(d.properties.name));
                if(mapdata.get(d.properties.name)){return mapdata.get(d.properties.name).value;}
               else{return "";}
            })
            .style("text-anchor","middle")
            .style("fill",function(d,i){
                if(mapdata.get(d.properties.name)){
                    if(mapdata.get(d.properties.name).value>700){return color(mapdata.get(d.properties.name).value);}
                    else{return "transparent";}
                }else{return '';}
            });
        _glevel2_title.append("rect")
            .attr("x",0)
            .attr("y",10)
            .attr("width","10")
            .attr("height",30)
            .style("fill","white");
        _glevel2_title.append("text")
            .attr("x",30)
            .attr("y",10)
            .text("近30天包裹走向")
            .attr("text-anchor","left")
            .attr("dy","0.8em")
            .style("fill","#e1e1e1")
            .style("font-size","30px");
    });
}

