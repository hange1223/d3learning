/**
 * Created by Administrator on 2017/7/24.
 */
var data=[
    {name:'数据',level:1},
    {name:'分析',level:2},
    {name:'挖掘',level:3},
    {name:'HADOOP',level:4},//HADOOP、GBASE、HANA、HBASE
    {name:'GBASE',level:4},//HADOOP、GBASE、HANA、HBASE
    {name:'HANA',level:4},//HADOOP、GBASE、HANA、HBASE
    {name:'HBASE',level:4},//HADOOP、GBASE、HANA、HBASE
    {name:'SQL等',level:4},//HADOOP、GBASE、HANA、HBASE
    {name:'建模',level:3},
    {name:'办公软件',level:4},
    {name:'SPSS',level:4},
    {name:'SQL',level:4},
    {name:'开发',level:2},
    {name:'架构师',level:3},
    {name:'Hadoop',level:4},//Hadoop、Hive、HBase、Spark、Storm、 Kafka、ES
    {name:'Hive',level:4},//Hadoop、Hive、HBase、Spark、Storm、 Kafka、ES
    {name:'HBase',level:4},//Hadoop、Hive、HBase、Spark、Storm、 Kafka、ES
    {name:'Spark',level:4},//Hadoop、Hive、HBase、Spark、Storm、 Kafka、ES
    {name:'Storm',level:4},//Hadoop、Hive、HBase、Spark、Storm、 Kafka、ES
    {name:'Kafka',level:4},//Hadoop、Hive、HBase、Spark、Storm、 Kafka、ES
    {name:'ES',level:4},//Hadoop、Hive、HBase、Spark、Storm、 Kafka、ES
    {name:'Java',level:3},
    {name:'Struts',level:4},//Struts、Spring、Hibernate
    {name:'Spring',level:4},//Struts、Spring、Hibernate
    {name:'Hibernate',level:4},//Struts、Spring、Hibernate
    {name:' SQL',level:4},//Struts、Spring、Hibernate
    {name:'Web前端',level:4},//Struts、Spring、Hibernate
    {name:'可视化',level:2},
    {name:'前端',level:3},
    {name:'H5,C3,JS',level:4},
    {name:'ECharts',level:4},
    {name:'D3',level:4},
    {name:'Three.js',level:4},
    {name:'打包工具',level:4},
    {name:'WebGL 、3D',level:4},
    {name:'可视化开发',level:3},
    {name:'H5,C3',level:4},
    {name:'原生JS',level:4},
    {name:'svg,canvas',level:4}
];
var links=[
    {source:'数据',target:'分析'},
    {source:'数据',target:'开发'},
    {source:'数据',target:'可视化'},
    {source:'分析',target:'挖掘'},
    {source:'分析',target:'建模'},
    {source:'开发',target:'架构师'},
    {source:'开发',target:'Java'},
    {source:'可视化',target:'前端'},
    {source:'可视化',target:'可视化开发'},
    {source:'挖掘',target:'HADOOP'},
    {source:'挖掘',target:'GBASE'},
    {source:'挖掘',target:'HANA'},//HADOOP、GBASE、HANA、HBASE
    {source:'挖掘',target:'HBASE'},
    {source:'挖掘',target:'SQL'},
    {source:'建模',target:'SQL等'},
    {source:'建模',target:'办公软件'},
    {source:'建模',target:'SPSS'},
    {source:'架构师',target:'Hadoop'},
    {source:'架构师',target:'Hive'},//Hadoop、Hive、HBase、Spark、Storm、 Kafka、ES
    {source:'架构师',target:'HBase'},//Hadoop、Hive、HBase、Spark、Storm、 Kafka、ES
    {source:'架构师',target:'Spark'},//Hadoop、Hive、HBase、Spark、Storm、 Kafka、ES
    {source:'架构师',target:'Storm'},//Hadoop、Hive、HBase、Spark、Storm、 Kafka、ES
    {source:'架构师',target:'Kafka'},//Hadoop、Hive、HBase、Spark、Storm、 Kafka、ES
    {source:'架构师',target:'ES'},
    {source:'Java',target:'Struts'},   //Struts、Spring、Hibernate
    {source:'Java',target:'Spring'},   //Struts、Spring、Hibernate
    {source:'Java',target:'Hibernate'},   //Struts、Spring、Hibernate
    {source:'Java',target:' SQL'},   //Struts、Spring、Hibernate
    {source:'Java',target:'Web前端'},
    {source:'前端',target:'H5,C3,JS'},//Struts、Spring、Hibernate
    {source:'前端',target:'ECharts'},//Struts、Spring、Hibernate
    {source:'前端',target:'D3'},//Struts、Spring、Hibernate
    {source:'前端',target:'Three.js'},//Struts、Spring、Hibernate
    {source:'前端',target:'打包工具'},
    {source:'前端',target:'WebGL 、3D'},
    {source:'可视化开发',target:'H5,C3'},
    {source:'可视化开发',target:'原生JS'},
    {source:'可视化开发',target:'svg,canvas'}
];
drawForce("force_hg",data,links);
function drawForce(divname,data,links){
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
    var _simulation=d3.forceSimulation()
        .force("center",d3.forceCenter(_swidth/2,_sheight/2))
        .force("charge",d3.forceManyBody().strength(-1200))//必须设置后面的tick
        .force("link",d3.forceLink().id(function(d){return d.name;}));
//-基于节点生成布局
    _simulation.nodes(data)
        .on("tick",function(){
            allcircle.attr("cx",function(d){
                return d.x;
            })
                .attr("cy",function(d){
                    return d.y;
                });
            allline.attr("x1",function(d){
                return d.source.x;
            })
                .attr("y1",function(d){
                    return d.source.y;
                })
                .attr("x2",function(d){
                    return d.target.x;
                })
                .attr("y2",function(d){
                    return d.target.y;
                });
            alltext.attr("x",function(d){
                return d.x;
            })
                .attr("y",function(d){
                    return d.y;
                })
                .attr("dy","2.5em");
        })
        .force("x",d3.forceX())
        .force("y",d3.forceY());
//console.log(data);
    _simulation.force("link")
        .links(links);
    var allcircle=_svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .call(d3.drag()
            .on("start",_dragstart)
            .on("drag",_draging)
            .on("end",_dragend)
    )
        .attr("r",30)
        .style("fill",function(d,i){
            if(d.level==1){return"#C306FA";}
            else if(d.level==2){return "#CD35F9";}
            else if(d.level==3){return "#C306FA";}
            else{return "#E289FC";}
        });
    var allline=_svg.selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .style("stroke","#91FDDF");
    var alltext=_svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .style("text-anchor","middle")
        .style("fill","white")
        .text(function(d){
            return d.name;
        });
    function _dragstart(){
        if(!d3.event.active)
            _simulation.alphaTarget(0.3).restart();
    }
    function _draging(){
        d3.event.subject.fx=d3.event.x;
        d3.event.subject.fy=d3.event.y;
    }
    function _dragend(){
        d3.event.subject.fx=null;
        d3.event.subject.fy=null;
        //_simulation.stop();
    }
}
