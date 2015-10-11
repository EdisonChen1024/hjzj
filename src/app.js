
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        // /////////////////////////////
        // // 2. add a menu item with "X" image, which is clicked to quit the program
        // //    you may modify it.
        // // ask the window size
        // var size = cc.winSize;

        // /////////////////////////////
        // // 3. add your codes below+.
        // // add a label shows "Hello World"
        // // create and initialize a label
        // var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // // position the label on the center of the screen
        // helloLabel.x = size.width / 2;
        // helloLabel.y = size.height / 2 + 200;
        // // add the label as a child to this layer
        // this.addChild(helloLabel, 5);

        // // add "HelloWorld" splash screen"
        // this.sprite = new cc.Sprite(res.HelloWorld_png);
        // this.sprite.attr({
        //     x: size.width / 2,
        //     y: size.height / 2
        // });
        // this.addChild(this.sprite, 0);
        cc.log("start 8===============>");
        var size = cc.winSize;
        // 创建一个精灵执行action
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);
        // maps
        var TAG_TILE_MAP = 1;
        // var map = new cc.TMXTiledMap("res/maps/1201.tmx", "res/maps/Res");
        var map = new cc.TMXTiledMap("res/maps/1201.tmx");
        cc.log(map);
        var ms = map.getMapSize();
        var ts = map.getTileSize();
        cc.log(ms.width);
        cc.log(ms.height);
        cc.log(ts.width);
        cc.log(ts.height);
        this.addChild(map, 0, TAG_TILE_MAP);
        map.runAction(new cc.ScaleBy(2, 0.5));

        // var group = map.getObjectGroup("Sky_6");
        // var array = group.getObjects();
        // var dict;
        // cc.log("len==>" + array.length);
        // for (var i = 0, len = array.length; i < len; i++)
        // {
        //     cc.log((i + 1) + "/" + len);
        //     dict = array[i];
        //     cc.log(typeof(dict));
        //     if (!dict)
        //     {
        //         cc.log("break");
        //         break;
        //     }
        //     for (var k in dict) 
        //     {
        //         cc.log(k + ' = ' + dict[k]);
        //     }
        // }
        // 检查能否获取所有层
        var layers = [
            "event",
            "actor",
            "monster",
            "Foreground_1",
            "Middle_2_1",
            "Middle_2_2",
            "Middle_2_3",
            "Surface_3",
            "Vision_4",
            "Clouds_5",
            "Sky_6",
            "floor",
            "not_exist",
        ];
        for (var i = 0; i < layers.length; i++)
        {
            var layer_name = layers[i];
            var ObjectGroups = map.getObjectGroup(layer_name);
            if (ObjectGroups == null)
            { 
                cc.log("============================================");
                cc.log("找不到指定层==>" + layer_name);
                cc.log("============================================");
            }
            else
            {
                cc.log("成功获取层==>" + layer_name);
            }
        }
        // 配置
        var ConfigNature = {};
        // 地图相关属性
        ConfigNature.TILEMAP_GRID_SIZE = 24 //格子像素 <> x <>
        ConfigNature.TILEMAP_SCALE = 1.25 //地图放大比例
        // 初始化碰撞区
        function initCollData(objLayerName)
        {
            var ObjectGroups = map.getObjectGroup(objLayerName);
            if (ObjectGroups == null)
            { 
                cc.log("============================================");
                cc.log("====  initCollData 找不到 碰撞层  ==========");
                cc.log("============================================");
                return;
            }

            //  var tiledRows = self:getMapSize().height
            //  var tiledHeight = self:getConfigNature.TILEMAP_GRID_SIZE().height

            var Objs = ObjectGroups.getObjects();
            var ObjCount = Objs.length;

            var boxColl_list = [];
            var polyLineColl_list = [];

            for(key in Objs)
            {
                var value = Objs[key];
                var pointArray = value["points"];
                var posX = value["x"];
                var posY = value["y"];//  此处的y 已切换成游戏里的坐标系 (图层高的格子数*ConfigNature.TILEMAP_GRID_SIZE - 图像高)
                if (pointArray)  // == "polyLine"
                {
                    var polygon = {};
                    polygon.x = posX;
                    polygon.y = posY;

                    var vertexes = []

                    var pointArrayCount = pointArray.length;
                    for(var i = 0; i < pointArrayCount; i++)
                    {
                        var point_x_float = pointArray[i]["x"];
                        var point_y_float = pointArray[i]["y"];

                        point_y_float = point_y_float * -1  // 转为左下角坐标

                        var v = [];
                        v[1] = point_x_float;
                        v[2] = point_y_float;
                        vertexes.push(v);
                    }
                    polygon.vertexes = vertexes;
                    polyLineColl_list.push(polygon);
                }
                else  // == "box"  矩形图形
                {
                    var box = {}
                    if (value["name"] == "floor")
                    {
                        // 延长地表 用于出场动画和离场动画
                        box.x = posX*ConfigNature.TILEMAP_SCALE - 500;
                        box.y = posY;
                        box.width = value["width"]*ConfigNature.TILEMAP_SCALE +1000;
                        box.height = value["height"]*ConfigNature.TILEMAP_SCALE;
                        // self._floorY = posY + box.height;
                    }
                    else
                    {
                        box.x = posX*ConfigNature.TILEMAP_SCALE;
                        box.y = posY;
                        box.width = value["width"]*ConfigNature.TILEMAP_SCALE;
                        box.height = value["height"]*ConfigNature.TILEMAP_SCALE;
                    }
                    boxColl_list.push(box);
                }
            }
            var ret = [];
            ret.push(boxColl_list);
            ret.push(polyLineColl_list);
            return ret
        }
        cc.log("initCollData");
        var ret = initCollData("floor");
        cc.log(ret[0].length);
        cc.log(ret[1].length);
        // actor层
        cc.log("initActorLayer");
        function initActorLayer()
        {
            var ObjectGroups = map.getObjectGroup("actor");
            if (ObjectGroups == null)
            {
                cc.log("============================================");
                cc.log("==== initActorLayer 找不到 角色层 ==========");
                cc.log("============================================");
                return;
            }
            var Objs = ObjectGroups.getObjects();
            var actorPos = {};
            actorPos.x = Objs[0]["x"]*ConfigNature.TILEMAP_SCALE;
            actorPos.y = Objs[0]["y"]*ConfigNature.TILEMAP_SCALE;
            return actorPos;
        }
        var ret = initActorLayer();
        cc.log(ret.x);
        cc.log(ret.y);
        //初始化怪物
        function initMonsterInfo()
        {
            var ObjectGroups = map.getObjectGroup("monster");
            if (ObjectGroups == null)
            {
                cc.log("============================================");
                cc.log("==== initMonsterInfo 找不到 怪物层==========");
                cc.log("============================================");
                return {};
            }
            var Objs = ObjectGroups.getObjects();
            var monsterTab = [];
            var goodTab = {}; //场景物件
            var npcTab = {}; //NPC
            for(key in Objs)
            {
                value = Objs[key];
                var tempName = value["name"];
                if( (tempName == "1") || (tempName == "2") )
                {
                    var monsterInfo = {};
                    monsterInfo.x = value["x"]*ConfigNature.TILEMAP_SCALE;
                    monsterInfo.y = value["y"]*ConfigNature.TILEMAP_SCALE;
                    monsterInfo.id = value["id"];
                    monsterTab.push(monsterInfo);
                }
            }
            // 按位置排序
            monsterTab.sort(function(a, b)
                {
                    return a.x < b.x;
                }
            )
            cc.log("初始化怪物完成")

            return monsterTab;
        }
        var ret = initMonsterInfo();

        // move map to the center of the screen
        // var ms = map.getMapSize();
        // var ts = map.getTileSize();
        // cc.log(ms.width, ms.height);
        // cc.log(ts.width, ts.height);
        // cc.log(0, 0);
        // map.runAction(cc.moveTo(1.0, cc.p(-ms.width * ts.width / 2, -ms.height * ts.height / 2)));
        cc.log("end   8===============>");

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter : function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

