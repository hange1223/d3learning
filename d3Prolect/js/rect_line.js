/**
 * Created by Administrator on 2017/7/20.
 */
var data_shanghai=[0,17500,20333,33958,26250,43750];
var data_beijing=[15417,8750,40357,37292,37292,57917];
var data_hangzhou=[8333,20000,28334,11042,11042,48750];
var xlabel=['不限','1','2','3','4','5'];
var datay=[0,15000,30000,45000,60000,75000,80000];
$(function(){drawRect("rect_line",data_beijing,data_shanghai,data_hangzhou,xlabel);});
$("#hg_hu").click(function(){
    $("#rect_line").html("");
    drawRect("rect_line",data_shanghai,data_beijing,data_hangzhou,xlabel);
    d3.select("#rect_event_text").text("上海柱图");
    d3.select("#line1_event_text").text("上海");
    d3.select("#line2_event_text").text("北京");
});
$("#hg_jing").click(function(){
    $("#rect_line").html("");
    drawRect("rect_line",data_beijing,data_shanghai,data_hangzhou,xlabel);
    d3.select("#rect_event_text").text("北京柱图");
});
$("#hg_hang").click(function(){
    $("#rect_line").html("");
    drawRect("rect_line",data_hangzhou,data_shanghai,data_beijing,xlabel);
    d3.select("#rect_event_text").text("杭州柱图");
    d3.select("#line1_event_text").text("杭州");
    d3.select("#line3_event_text").text("北京");
});
function drawRect(divname,dataset,dataset2,dataset3,xdata){
    //获取div的宽高
    var _swidth = $("#"+divname).width();
    var _sheight = $("#"+divname).height();
    //设置div留白
    var _margin = {top:20,left:140,right:140,bottom:60};
    //设置legend高度
    var _legendHeight=50;
    //绘图区宽高
    var _chartHeight=_sheight- _margin.top -_margin.bottom- _legendHeight;
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
        .attr("height","100%")
        .attr("id","hg_rectline");
    var _padding=0.4;
    //一级组
    var _glevel1 = _svg.append("g")
        .attr("transform","translate("+_margin.left+","+_margin.top+")");
    //一级组里添加2级legend组
    var _glevel2_legend=_glevel1.append("g");
    _glevel2_legend.append("rect")
        .attr("x",0)
        .attr("y",_margin.top)
        .attr("class","rect_event")
        .attr("width","20")
        .attr("height","10")
        .style("fill","orange");
    _glevel2_legend.append("text")
        .text("北京柱图")
        .attr("class","rect_event")
        .attr("id","rect_event_text")
        .attr("x",30)
        .attr("y",_margin.top)
        .attr("text-anchor","left")
        .attr("dy","0.7em");
    //给legend第一组添加鼠标事件
    var flag=0;
    d3.selectAll(".rect_event")
        .on("mouseover",function(d){
            d3.selectAll(".hg_rect")
                .style("fill","rgba(243,196,52,.8)");
        })
        .on("mouseout",function(d){
            d3.selectAll(".hg_rect")
                .style("fill","orange");
        })
        .on("click",function(){
            if(flag==0){
                d3.selectAll(".hg_rect")
                    .transition()
                    .duration(1000)
                    .attr("width","0");
               flag=1;
            }else{
                    d3.selectAll(".hg_rect")
                        .transition()
                        .duration(1000)
                        .attr("width",_bandscale.bandwidth());
                   flag=0;
            }
        });

    //legend第二组
    _glevel2_legend.append("rect")
        .attr("class","line1_event")
        .attr("x",200)
        .attr("y",_margin.top)
        .attr("width","20")
        .attr("height","10")
        .style("fill","#03B483");
    _glevel2_legend.append("text")
        .text("北京")
        .attr("class","line1_event")
        .attr("id","line1_event_text")
        .attr("x",230)
        .attr("y",_margin.top)
        .attr("text-anchor","left")
        .attr("dy","0.6em");

    //给第二组legend添加鼠标事件
    var flag2=0;
    d3.selectAll(".line1_event")
        .on("mouseover",function(d){
            d3.select("#hg_line")
                .style("stroke-width","4");
        })
        .on("mouseout",function(d){
            d3.select("#hg_line")
                .style("stroke-width","2");
        })
        .on("click",function(){
            if(flag2==0){
                d3.select("#hg_line")
                    .style("display","none");
                flag2=1;
            }else{
                d3.select("#hg_line")
                    .style("display","block");
                flag2=0;
            }
        });
    //--legend第三组
    _glevel2_legend.append("rect")
        .attr("class","line2_event")
        .attr("x",400)
        .attr("y",_margin.top)
        .attr("width","20")
        .attr("height","10")
        .style("fill","#03A3B3");
    _glevel2_legend.append("text")
        .text("上海")
        .attr("class","line2_event")
        .attr("id","line2_event_text")
        .attr("x",430)
        .attr("y",_margin.top)
        .attr("text-anchor","left")
        .attr("dy","0.6em");
    //给第三组legend添加鼠标事件
    var flag3=0;
    d3.selectAll(".line2_event")
        .on("mouseover",function(d){
            d3.select("#hg_line2")
                .style("stroke-width","4");
        })
        .on("mouseout",function(d){
            d3.select("#hg_line2")
                .style("stroke-width","2");
        })
        .on("click",function(){
            if(flag3==0){
                d3.select("#hg_line2")
                    .style("display","none");
                flag3=1;
            }else{
                d3.select("#hg_line2")
                    .style("display","block");
                flag3=0;
            }
        });
    //legend第四组
    _glevel2_legend.append("rect")
        .attr("class","line3_event")
        .attr("x",600)
        .attr("y",_margin.top)
        .attr("width","20")
        .attr("height","10")
        .style("fill","#91FDDF");
    _glevel2_legend.append("text")
        .text("杭州")
        .attr("class","line3_event")
        .attr("id","line3_event_text")
        .attr("x",630)
        .attr("y",_margin.top)
        .attr("text-anchor","left")
        .attr("dy","0.6em");
    //第四组添加鼠标事件
    var flag4=0;
    d3.selectAll(".line3_event")
        .on("mouseover",function(d){
            d3.select("#hg_line3")
                .style("stroke-width","4");
        })
        .on("mouseout",function(d){
            d3.select("#hg_line3")
                .style("stroke-width","2");
        })
        .on("click",function(){
            if(flag4==0){
                d3.select("#hg_line3")
                    .style("display","none");
                flag4=1;
            }else{
                d3.select("#hg_line3")
                    .style("display","block");
                flag4=0;
            }
        });
    //一级组里添加2级绘图区组
    var _glevel2_chart=_glevel1.append("g")
        .attr("transform","translate(0,"+_legendHeight+")");
    //绘图区组里添加y组
    var _glevel3_yaxisL=_glevel2_chart.append("g")
        .attr("class","gyaxisL")
        .attr("transform","translate("+_chartMargin.left+","+_chartMargin.top+")");
    //绘图区组里添加x组
    var _glevel3_xaxis =_glevel2_chart.append("g")
        .attr("class","gxaxis")
        .attr("transform","translate("+_chartMargin.left+","+(_chartHeight-_chartMargin.bottom)+")");
    //绘图区组里添加内容组
    var _glevel3_content = _glevel2_chart.append("g")
        .attr("class","chartcontent")
        .attr("transform","translate("+_chartMargin.left+","+_chartMargin.top+")");
    //y轴连续型比例尺
    var _linescaleL = d3.scaleLinear()
        .domain([0,80000])
        .range([_yaxisHeight,0])
        .clamp(true) ;
    //左y轴设置
    var _yaxisL = d3.axisLeft()
        .scale(_linescaleL)
        .tickFormat(d3.format(",.2s"))
        .tickValues(datay);
    //y轴添加
    _yaxisL(_glevel3_yaxisL);
    //x轴序数型设置
    var _bandscale = d3.scaleBand()
        .padding(_padding)//20%包括内外边距及段间距paaddingInner只包括段间距
        .domain(xdata)
        .range([0,_xaxisWidth]);
    //x轴设置及添加
    var _xaxis = d3.axisBottom()
        .scale(_bandscale);
    _xaxis(_glevel3_xaxis);

    var _tooltipdiv=d3.select("#"+divname)
        .append("div")
        .attr("class","tooltip");

    _glevel3_content.append("g")
        .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class","hg_rect")
        .style("fill","orange")
        .attr("x",function(d,i){
            return  _bandscale(xdata[i]);
        })
        .attr("y",_yaxisHeight)
        .attr("width",_bandscale.bandwidth())
        .attr("height",0)
        .on("mouseover",function(d,i){
            d3.select(this).style("fill","rgba(243,196,52,.8)");
            var _tooltipx=d3.event.x;
            var _tooltipy=d3.event.y;
            _tooltipdiv.style("top",_tooltipy+"px")
                .style("left",_tooltipx+10+"px")
                .style("display","block")
                .html(function(){
            if(xdata[i]=='不限'){return xdata[i]+"年限：<br/>"+d}
                else{return xdata[i]+"年经验以上：<br/>"+d}}
            )
        })
        .on("mousemove",function(d,i){
            var _tooltipx=d3.event.x;
            var _tooltipy=d3.event.y;
            _tooltipdiv.style("top",_tooltipy+"px")
                .style("left",_tooltipx+10+"px");
        })
        .on("mouseout",function(d,i){
            d3.selectAll(".hg_rect").style("fill","orange");
            _tooltipdiv.style("display","none");
        })
        .transition()
        .duration(5000)
        .attr("y",function(d,i){
            return _linescaleL(d);
        })
        .attr("height",function(d,i){
            return _linescaleL(80000-d);
        });
    _glevel3_content.selectAll("hg_circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("class","hg_circle")
        .attr("cx",function(d,i){
            return  _bandscale(xdata[i])+_bandscale.bandwidth()/2;
        })
        .attr("cy",function(d,i){
            return _linescaleL(d);
        })
        .attr("r","5")
        .style("fill","transparent")
        .attr("transform","translate(0,-30)");
    _glevel3_content.selectAll("hg_circle")
        .data(dataset2)
        .enter()
        .append("circle")
        .attr("class","hg_circle")
        .attr("cx",function(d,i){
            return  _bandscale(xdata[i])+_bandscale.bandwidth()/2;
        })
        .attr("cy",function(d,i){
            return _linescaleL(d);
        })
        .attr("r","5")
        .style("fill","transparent")
        .attr("transform","translate(0,-30)");
    _glevel3_content.selectAll("hg_circle")
        .data(dataset3)
        .enter()
        .append("circle")
        .attr("class","hg_circle")
        .attr("cx",function(d,i){
            return  _bandscale(xdata[i])+_bandscale.bandwidth()/2;
        })
        .attr("cy",function(d,i){
            return _linescaleL(d);
        })
        .attr("r","5")
        .style("fill","transparent")
        .attr("transform","translate(0,-30)");
    var datazip=d3.zip(xdata,dataset);
    var datazip2=d3.zip(xdata,dataset2);
    var datazip3=d3.zip(xdata,dataset3);
    var _line=d3.line()
        .x(function(d,i){
            //返回实际的月份对应的x坐标
            return _bandscale(d[0])+_bandscale.bandwidth()/2;
        })
        .y(function(d,i){
            //返回实际的销售收入对应的y坐标
            return _linescaleL(d[1]);
        })
        .curve(d3.curveNatural);
        _glevel3_content.append("g")
        .append("path")
        .attr("id","hg_line")
        .attr("d",_line(datazip))
        .attr("stroke","#03B483")
        .attr("class","line")
        .style("stroke-width",2)
        .style("fill","none")
        .attr("transform","translate(0,-30)")
        .on("mouseover",function(){
            d3.select(this)
                .style("stroke-width",4);
        })
        .on("mouseout",function(){
            d3.select("#hg_line")
                .style("stroke-width",2);
        });
        _glevel3_content.append("g")
        .append("path")
        .attr("id","hg_line2")
        .attr("d",_line(datazip2))
        .attr("stroke","#03A3B3")
        .attr("class","line")
        .style("stroke-width",2)
        .style("fill","none")
        .attr("transform","translate(0,-30)")
        .on("mouseover",function(){
            d3.select(this)
                .style("stroke-width",4);
        })
        .on("mouseout",function(){
            d3.select("#hg_line")
                .style("stroke-width",2);
        });
    _glevel3_content.append("g")
        .append("path")
        .attr("id","hg_line3")
        .attr("d",_line(datazip3))
        .attr("stroke","#91FDDF")
        .attr("class","line")
        .style("stroke-width",2)
        .style("fill","none")
        .attr("transform","translate(0,-30)")
        .on("mouseover",function(){
            d3.select(this)
                .style("stroke-width",4);
        })
        .on("mouseout",function(){
            d3.select("#hg_line")
                .style("stroke-width",2);
        });
    _glevel3_content.append("text")
        .text("薪资水平")
        .style("transform","rotate(-90deg)")
        .attr("x",-_yaxisHeight/2)
        .attr("y",-40)
        .attr("text-anchor","middle");
    d3.select(".gxaxis")
        .selectAll("line")
        .attr("stroke","transparent");
    d3.select(".gxaxis")
        .selectAll("path")
        .attr("stroke","grey");
    d3.select(".gyaxisL")
        .selectAll("line")
        .attr("stroke","transparent");
    d3.select(".gyaxisL")
        .selectAll("path")
        .attr("stroke","transparent");
    d3.select(".gyaxisR")
        .selectAll("line")
        .attr("stroke","transparent");
    d3.select(".gyaxisR")
        .selectAll("path")
        .attr("stroke","transparent");
}
