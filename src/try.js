--------------------------------------------------------------------------------
-- ui
--------------------------------------------------------------------------------
src\bag\ItemTipView.lua
src\buff\Buff.lua
src\Coin\CoinView.lua
src\Components\MenuComponent.lua
src\Components\MenuComponent2.lua
src\Components\Tips.lua
src\control\FightMessageView.lua
src\control\FightView.lua
src\diamond\DiamondView.lua
src\duplicate\DuplicateResult.lua
src\duplicate\DuplicateTip.lua
src\duplicate\DuplicateView.lua
src\forge\Advance.lua
src\forge\ForgeView.lua
src\forge\Intensify.lua
src\gameSet\GameSetView.lua
src\login\CreateRole.lua
src\login\ErrorTip.lua
src\login\LoginView.lua
src\main\MainView.lua
src\main\TopMainView.lua
src\map\PauseView.lua
src\monster\AircraftBossView.lua
src\monster\AirplaneView.lua
src\monster\ArmedBossView.lua
src\monster\BatteryBossView.lua
src\monster\BulldozerView.lua
src\monster\CannonBossView.lua
src\monster\GiantBossView.lua
src\monster\MonsterView.lua
src\monster\NpcView.lua
src\monster\ParrotplaneView.lua
src\monster\RobotView.lua
src\monster\SceneCarView.lua
src\monster\SceneEarthbagsView.lua
src\monster\TankBossView.lua
src\monster\TankView.lua
src\monster\WormMachineView.lua
src\player\CharacterRoleView.lua
src\player\VehicleView.lua
src\shop\ShopView.lua
src\shop\Tips.lua
src\shoppingMall\ShoppingMallView.lua
src\skill\PlayerSkill.lua
src\tipUI\Tip.lua
src\treasureHunt\OpenChests.lua
src\treasureHunt\TreasureHuntView.lua
src\VIP\VIPView.lua


--------------------------------------------------------------------------------
-- tag
--------------------------------------------------------------------------------
TAG_ALERT_VIEW==>999999
TAG_MAP_VIEW==>30000
TAG_END_VIEW==>20100
TAG_SCREEN_VIEW==>20000
TAG_JOYSTICK_VIEW==>10010
TAG_BATTLE_STOP_VIEW==>10002
TAG_BATTLE_PREPARE_VIEW==>10001
TAG_BATTLE_VIEW==>10000
TAG_CHOOSE_VIEW==>9010
TAG_LOGIN_VIEW==>9000
TAG_LOADING_VIEW==>8000
TAG_LIVENESS_VIEW==>705
TAG_BUY_DIAMOND==>701
TAG_BUY_GOLD_VIEW==>700
TAG_SHOPPINGMALL_VIEW==>226
TAG_OPEN_CHESTS==>225
TAG_TREASURE_HUNT==>224
TAG_GAME_SET_VIEW==>223
TAG_ERROR_TIP==>222
TAG_VIPVIEW==>221
INTENSIFY_ADVANCE==>201
TAG_BAG_VIEW==>170
TAG_DUPLICATE_REVIVE==>162
TAG_DUPLICATE_RESULT==>161
TAG_DUPLICATE_VIEW==>160
TAG_ALLMENU==>153
TAG_DIAMONDVIEW==>152
TAG_COINVIEW==>151
TAG_SHOPVIEW==>150
TAG_TASK==>140
TAG_BACKGROUND_VIEW==>104
TAG_MAINGAME_PANEL==>103
TAG_ARMATURE_VIEW==>102
TAG_TEST_VIEW2==>101
TAG_TEST_VIEW1==>100
TAG_TOPMAINGAME_PANEL==>99
SCENE_ID_BATTLE==>20
SCENE_ID_MAIN==>10
LOGIN_VIEW==>1


--------------------------------------------------------------------------------
-- res\Bomb 用法
--------------------------------------------------------------------------------
var cache = cc.spriteFrameCache
        // c300 16
        // c301 14
        // c302 9
        // c303 19
        var info = [];
        info.push(["res/Bomb/c300/c300.plist", 16, "c300_"]);
        info.push(["res/Bomb/c301/c301.plist", 14, "c301_"]);
        info.push(["res/Bomb/c302/c302.plist", 9,  "c302_"]);
        info.push(["res/Bomb/c303/c303.plist", 19, "c303_"]);
        var index = Math.floor(Math.random() * info.length +1);
        var file_name = info[index][0];
        var amount = info[index][1];
        var prefix = info[index][2];
        cache.addSpriteFrames(file_name);
        var frames = [];
        for(var i = 0; i < amount; i++)
        {
            var one = i % 10;
            var ten = parseInt(i / 10);
            var name = prefix + ten + one + ".png";
            var frame = cache.getSpriteFrame(name);
            frames.push(frame);
            // var node = new cc.Sprite(frame);
            // cc.log(name, node);
            // var x = size.width / amount * i;
            // var y = size.height / 2;
            // node.x = x;
            // node.y = y;
            // this.addChild(node);
        }
        // var sp =  
        var animation = new cc.Animation(frames, 0.05);
        // animation.setDelayPerUnit(2.8 / 14);
        // animation.setRestoreOriginalFrame(true);        
        var action = cc.animate(animation);
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);        
        this.sprite.runAction(action.repeatForever());

--------------------------------------------------------------------------------
-- res\Buff 用法
--------------------------------------------------------------------------------
        cc.log("8===============>")      
        var size = cc.winSize;
        require("src/config/propItem.js")
        var DefineItemType = {
            // 大类
            IK1_EQUIP : 1 ,//       --装备
            IK1_CANUSE : 2 ,//      --可使用类
            IK1_VOUCHER : 3 ,//     --材料
            IK1_OTHER : 4 ,//       --凭证
            IK1_MONEY : 5 ,//       --货币
            IK1_RESOURCES : 6 ,//   --资源
            // 小类
            IK2_GON : 1 ,//            --枪械
            IK2_FASHION : 2 ,//        --时装
            IK2_PET : 3 ,//            --宠物
            IK2_ARMOR : 4 ,//         --护甲
            IK2_GON_PROMOTED : 20,//   --枪械进阶材料
            IK2_GON_UPGRADE : 21,//    --枪械强化材料
            IK2_PET_PROMOTED : 22,//   --宠物进阶材料
            IK2_PET_UPGRADE : 23,//    --宠物强化材料
            IK2_DIAMOND : 24,//        --钻石
            IK2_GOLD : 25,//           --金币
            IK2_EXP : 26,//            --经验
            IK2_ENERGY : 27,//         --体力
            IK2_POINT : 28,//          --积分
            IK2_BUFF : 29,//           --buff
            IK2_PROPS : 30,//          --关卡开启道具    
        };
        // 创建一个精灵执行action
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);

        function plistFrame(src_path , imgName , frames)
        {
            cc.log(src_path , imgName , frames);
            var cache = cc.spriteFrameCache;            
            cache.addSpriteFrames(src_path + ".plist", src_path + ".png");
            
            var frameNameLen = imgName.length;   // 图片帧名字长度
            var tab = []
            var spriteFrame = cache.getSpriteFrame(imgName + ".png");
            var originalSize = spriteFrame.getOriginalSize(); // 帧大小
            var i = 1;
            cc.log(imgName + ".png");
            while (spriteFrame)
            {
                tab.push(spriteFrame);
                // 图片名字偏移量
                var offset = i.toString().length;
                // 重组下一张帧图片的名字
                var newFrameName = imgName.substring(0, frameNameLen - offset) + i;
                // 获取下一帧
                spriteFrame = cache.getSpriteFrame(newFrameName + ".png");
                i = i + 1;
                cc.log(newFrameName + ".png");
            }
            var animation = cc.Animation(tab, frames);
            // animation.setDelayPerUnit(2.8 / 14);
            // animation.setRestoreOriginalFrame(true); 
            var action = cc.animate(animation);
            // cc.log(action, originalSize);
            return action;
        }
        // 测试res/Buff
        // var item = propItem[10901]; // DefineItemType.IK2_GOLD
        var item = propItem[10801]; // DefineItemType.IK2_POINT 绿色
        var item = propItem[10802]; // DefineItemType.IK2_POINT 紫色
        var item = propItem[101]; // (item.Skills == -1)
        var g_resPath = "res/";
        var self = this;
        if (item["ItemKind2"] == DefineItemType.IK2_GOLD)
        {
            cc.log("IK2_GOLD");
            // 获取配置资源
            var resSre2 = item["SwfId"];
            var name = g_resPath + "Buff/" + resSre2 + "/" + resSre2 + ".plist";
            var action = plistFrame(g_resPath +"Buff/"+ resSre2+"/"+resSre2 , resSre2+"_00000" , 0.06);
            // cc.log(originalSize);
            self.sprite.runAction(action.repeatForever());
            // self._armature = sp.SkeletonAnimation:create(g_resPath + resSre2+"/model.json", g_resPath + resSre2+"/model.atlas")
            // self._armature = sp.SkeletonAnimation:create(g_resPath + "buff/buff001/model.json", g_resPath + "buff/buff001/model.atlas")
        }
        else if (item["ItemKind2"] == DefineItemType.IK2_POINT)
        {
            cc.log("IK2_POINT");
            //获取配置资源
            var resSre2 = item["SwfId"];
            var action = plistFrame(g_resPath +"Buff/"+ resSre2+"/"+resSre2 , resSre2+"_00000" , 0.05);
            self.sprite.runAction(action.repeatForever());
            // self._armature = sp.SkeletonAnimation:create(g_resPath + resSre2+"/model.json", g_resPath + resSre2+"/model.atlas")
            // self._armature:setTimeScale(1)
            // self._armature:setAnimation(0, "idle_1", true)
            // self._sprite:addChild(self._armature)
        }
        else if (item.Skills == -1)
        {
            cc.log("tem.Skills == -1");
            //问号道具
            // self._armature = sp.SkeletonAnimation.create(g_resPath + "buff/buff001/model.json", g_resPath + "buff/buff001/model.atlas");
            self._armature = new sp.SkeletonAnimation(g_resPath + "Buff/buff001/model.json", g_resPath + "Buff/buff001/model.atlas", 1.5);

            self._armature.setTimeScale(1);
            self._armature.setAnimation(0, "idle_1", true);
            self._sprite.addChild(self._armature);
        }
        else
        {
            cc.log("normal");
            var resSre = item["SwfId"];
            //获取配置资源
            // self._armature = sp.SkeletonAnimation.create(g_resPath + resSre+"/model.json", g_resPath + resSre+"/model.atlas");
            self._armature = new sp.SkeletonAnimation(g_resPath + "Buff/buff001/model.json", g_resPath + "Buff/buff001/model.atlas", 1.5);
            self._armature.setTimeScale(1);
            self._armature.setAnimation(0, "idle_1", true);
            self.sprite.addChild(self._armature);
        }

--------------------------------------------------------------------------------
-- res/Bullet
--------------------------------------------------------------------------------
        require("src/config/bullet.js");  
        var size = cc.winSize;
        // 创建一个精灵执行action
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);
        // 协定了固定格式的plist读取方式(大图:z001.png, z001.plist; 小图:z001_00, z001_01 ...)
        // src_path:序列png和plist文件夹路径
        // imgName:文件名路径, plist文件名和png文件名必须一致
        // frames:帧频
        function readPlistFrame2Cache(src_path, imgName, frames)
        {
            var cache = cc.spriteFrameCache;       
            var path = src_path + imgName;
            cache.addSpriteFrames(path + ".plist", path + ".png");     
            var framePng = imgName + "_";
            var spriteFrame = cache.getSpriteFrame(framePng + ".png");            
            // 预留10^10的帧数
            for (var i = 1; i <= 10; i++)
            {
                if (spriteFrame)
                {
                    break;
                }
                framePng = framePng + "0";
                spriteFrame = cache.getSpriteFrame(framePng + ".png");
            }
            
            if (!spriteFrame)
            {
                cc.log(path + "->路径不存在或plist帧名格式错误");
                return;
            }
            
            var originalSize = spriteFrame.getOriginalSize(); // 帧大小                
            var frameNameLen = framePng.length;   // 图片帧名字长度
            var tab = [];
            var i = 1;
            cc.log(framePng);
            while (spriteFrame)
            {
                tab.push(spriteFrame);
                var offset = i.toString().length; // 图片名字偏移量
                var newFrameName = framePng.substring(0, frameNameLen - offset) + i; // 重组下一张帧图片的名字
                spriteFrame = cache.getSpriteFrame(newFrameName + ".png");
                i = i + 1;
                cc.log(newFrameName + ".png");
            }
            var animation = cc.Animation(tab, frames)
            var animate = cc.animate(animation)
            return animate
        }
        // split("abc|ccc", "|") --> {"abc","ccc"}
        function split(szFullString, szSeparator)
        {
            return szFullString.split(szSeparator) 
        }
        //创建子弹精灵
        var skillBase = {
            effects1 : "res/Bullet/q310",
            effects2 : "res/Bullet/q311",
            effects3 : "res/Bullet/q312",
        };
        var skillBase = {
            effects1 : "res/Bullet/m182",
            effects2 : "res/Bullet/m210",
            effects3 : "res/Bullet/m310",
        };
        function createView(self)
        {
            function showArray(array)
            {                
                for(var i = 0; i < array.length; i++)
                {
                    cc.log(array[i]);
                }
            }
            var _sprite = new cc.Sprite(res.HelloWorld_png);         
            // 一段
            var array = split(skillBase.effects1, "/");
            // showArray(array);
            var animate = readPlistFrame2Cache(skillBase.effects1 + "/", array[array.length - 1], 0.05);
            
            // 二段
            var array = split(skillBase.effects2, "/");
            // showArray(array);
            var animate1 = readPlistFrame2Cache(skillBase.effects2 + "/", array[array.length - 1], 0.35);
            
            // 三段
            var array = split(skillBase.effects3, "/");
            // showArray(array);
            var animate2 = readPlistFrame2Cache(skillBase.effects3 + "/", array[array.length - 1], 0.05);
            
            //初始化物理属性
            // self:initPhysicsProperty()
            
        //    var animate = tool_t:plistFrame("eff/aishipDieEffect/airship_1" , "a_00000" , 0.05)
        //    var animate1 = tool_t:plistFrame("eff/aishipDieEffect/airship_2" , "b_00000" , 0.05)
        //    var animate2 = tool_t:plistFrame("eff/aishipDieEffect/airship_3" , "c_00000" , 0.05)
            animate1.getAnimation().setLoops(7);
            var seq = cc.sequence(animate,animate1,animate2);
            cc.log(typeof(_sprite));
            cc.log(typeof(seq));
            self.sprite.runAction(seq.repeatForever());
        }
        createView(this);