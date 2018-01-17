var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var ChatPageUI=(function(_super){
		function ChatPageUI(){
			
		    this.input_msg=null;
		    this.btn_send=null;
		    this.ta_content=null;

			ChatPageUI.__super.call(this);
		}

		CLASS$(ChatPageUI,'ui.main.ChatPageUI',_super);
		var __proto__=ChatPageUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(ChatPageUI.uiView);

		}

		ChatPageUI.uiView={"type":"View","props":{"width":600,"height":400},"child":[{"type":"TextInput","props":{"y":360,"x":47,"width":343,"var":"input_msg","text":"hello,world","skin":"comp/textinput.png","height":22}},{"type":"Button","props":{"y":360,"x":466,"var":"btn_send","skin":"comp/button.png","label":"Send"}},{"type":"TextArea","props":{"y":16,"x":15,"width":559,"var":"ta_content","skin":"comp/textarea.png","height":322}}]};
		return ChatPageUI;
	})(View);
var DrivingPageUI=(function(_super){
		function DrivingPageUI(){
			
		    this.m_uiSceneList=null;
		    this.m_uiSettingTab=null;
		    this.m_uiPath=null;
		    this.m_uiPathList=null;
		    this.m_uiWeather=null;
		    this.m_uiWeather_temperature=null;
		    this.m_uiWeather_timeOfDay=null;
		    this.m_uiWeather_rainType=null;
		    this.m_uiWeather_snowType=null;
		    this.m_uiWeather_fogType=null;
		    this.m_uiTraffic=null;
		    this.m_uiTraffic_carDensity_slider=null;
		    this.m_uiTraffic_carDensity_input=null;
		    this.m_uiTraffic_carIrregularity_slider=null;
		    this.m_uiTraffic_carIrregularity_input=null;
		    this.m_uiTraffic_pedestrainDensity_slider=null;
		    this.m_uiTraffic_pedestrainDensity_input=null;

			DrivingPageUI.__super.call(this);
		}

		CLASS$(DrivingPageUI,'ui.main.DrivingPageUI',_super);
		var __proto__=DrivingPageUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(DrivingPageUI.uiView);

		}

		DrivingPageUI.uiView={"type":"View","props":{"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"VBox","props":{"width":1280,"top":0,"bottom":0},"child":[{"type":"HBox","props":{"right":0,"left":0,"height":72},"child":[{"type":"HBox","props":{"top":0,"left":40,"bottom":0},"child":[{"type":"Label","props":{"valign":"middle","text":"CYBERTRON-","fontSize":26,"color":"#000000","centerY":0,"bold":true}},{"type":"Label","props":{"valign":"middle","text":"ZERO","fontSize":26,"color":"#02aef0","centerY":0,"bold":true}}]},{"type":"Box","props":{"centerY":0,"centerX":0},"child":[{"type":"Label","props":{"valign":"middle","text":"Open Scene Driving","fontSize":32,"centerY":0,"align":"center"}}]}]},{"type":"HBox","props":{"right":0,"left":0,"height":648},"child":[{"type":"VBox","props":{"width":200,"top":0,"bottom":0},"child":[{"type":"List","props":{"y":0,"x":0,"width":200,"var":"m_uiSceneList","vScrollBarSkin":"comp/vscroll.png","spaceY":16,"repeatX":1,"height":648},"child":[{"type":"Box","props":{"width":128,"name":"render","left":36},"child":[{"type":"Image","props":{"width":128,"name":"image","height":128}},{"type":"Label","props":{"width":128,"valign":"middle","top":8,"overflow":"hidden","name":"label","fontSize":16,"align":"center"}},{"type":"Button","props":{"y":0,"x":0,"width":128,"skin":"comp/checkbox.png","name":"button","height":128,"alpha":0.1}}]}]}]},{"type":"VBox","props":{"width":1080,"top":0,"bottom":0},"child":[{"type":"Tab","props":{"var":"m_uiSettingTab","skin":"comp/tab.png","selectedIndex":0,"right":0,"left":0,"labels":"Path,Weather,Traffic","height":26,"direction":"horizontal"}},{"type":"HBox","props":{"visible":true,"var":"m_uiPath","top":26,"right":0,"left":0,"height":82},"child":[{"type":"List","props":{"y":0,"x":0,"width":1080,"var":"m_uiPathList","spaceX":16,"repeatY":1,"height":82,"hScrollBarSkin":"comp/hscroll.png"},"child":[{"type":"Box","props":{"top":10,"name":"render","height":64},"child":[{"type":"Image","props":{"width":48,"name":"image","height":48}},{"type":"Label","props":{"width":48,"valign":"middle","overflow":"hidden","name":"label","bottom":5,"align":"center"}},{"type":"Button","props":{"width":48,"skin":"comp/checkbox.png","name":"button","height":48,"alpha":0.1}}]}]}]},{"type":"HBox","props":{"visible":false,"var":"m_uiWeather","top":26,"right":0,"left":0,"height":82},"child":[{"type":"VBox","props":{"width":270,"top":0,"space":5,"bottom":0,"align":"center"},"child":[{"type":"HBox","props":{"width":1,"height":10}},{"type":"HBox","props":{"x":20,"space":10},"child":[{"type":"Label","props":{"width":90,"valign":"middle","text":"Temperature:","height":26,"align":"right"}},{"type":"TextInput","props":{"width":120,"var":"m_uiWeather_temperature","valign":"middle","skin":"comp/textinput.png","height":26}}]},{"type":"HBox","props":{"x":20,"space":10},"child":[{"type":"Label","props":{"width":90,"valign":"middle","text":"Time of Day:","height":26,"align":"right"}},{"type":"TextInput","props":{"width":120,"var":"m_uiWeather_timeOfDay","valign":"middle","skin":"comp/textinput.png","height":26}}]}]},{"type":"VBox","props":{"width":82,"top":0,"bottom":0},"child":[{"type":"Image","props":{"top":20,"skin":"comp/rain.png","right":20,"left":20,"bottom":20}}]},{"type":"VBox","props":{"width":180,"top":0,"space":5,"bottom":0,"align":"center"},"child":[{"type":"HBox","props":{"width":1,"height":10}},{"type":"HBox","props":{"space":10},"child":[{"type":"Label","props":{"width":30,"valign":"middle","text":"Type:","height":26,"color":"#000000","align":"right"}},{"type":"ComboBox","props":{"width":120,"var":"m_uiWeather_rainType","skin":"comp/combobox.png","selectedIndex":0,"labels":"No,Yes","height":26}}]}]},{"type":"VBox","props":{"width":82,"top":0,"bottom":0},"child":[{"type":"Image","props":{"top":20,"skin":"comp/snow.png","right":20,"left":20,"bottom":20}}]},{"type":"VBox","props":{"width":180,"top":0,"space":5,"bottom":0},"child":[{"type":"HBox","props":{"width":1,"height":10}},{"type":"HBox","props":{"space":10},"child":[{"type":"Label","props":{"width":30,"valign":"middle","text":"Type:","height":26,"color":"#000000","align":"right"}},{"type":"ComboBox","props":{"width":120,"var":"m_uiWeather_snowType","skin":"comp/combobox.png","selectedIndex":0,"labels":"No,Yes","height":26}}]}]},{"type":"VBox","props":{"width":82,"top":0,"bottom":0},"child":[{"type":"Image","props":{"top":20,"skin":"comp/fog.png","right":20,"left":20,"bottom":20}}]},{"type":"VBox","props":{"width":180,"top":0,"space":5,"bottom":0},"child":[{"type":"HBox","props":{"width":1,"height":10}},{"type":"HBox","props":{"space":10},"child":[{"type":"Label","props":{"width":30,"valign":"middle","text":"Type:","height":26,"color":"#000000","align":"right"}},{"type":"ComboBox","props":{"width":120,"var":"m_uiWeather_fogType","skin":"comp/combobox.png","selectedIndex":0,"labels":"No,Yes","height":26}}]}]}]},{"type":"HBox","props":{"visible":false,"var":"m_uiTraffic","top":26,"right":0,"left":0,"height":82},"child":[{"type":"VBox","props":{"width":360,"top":0,"space":5,"bottom":0,"align":"center"},"child":[{"type":"HBox","props":{"width":1,"height":10}},{"type":"HBox","props":{"x":20,"space":10},"child":[{"type":"Label","props":{"width":120,"valign":"middle","text":"Car Density:","height":26,"align":"right"}},{"type":"HSlider","props":{"var":"m_uiTraffic_carDensity_slider","value":50,"skin":"comp/hslider.png","min":0,"max":100,"centerY":6}},{"type":"TextInput","props":{"width":50,"var":"m_uiTraffic_carDensity_input","skin":"comp/textinput.png","height":26}}]},{"type":"HBox","props":{"y":10,"x":30,"space":10},"child":[{"type":"Label","props":{"width":120,"valign":"middle","text":"Car Irregularity:","height":26,"align":"right"}},{"type":"HSlider","props":{"var":"m_uiTraffic_carIrregularity_slider","value":50,"skin":"comp/hslider.png","min":0,"max":100,"centerY":6}},{"type":"TextInput","props":{"width":50,"var":"m_uiTraffic_carIrregularity_input","skin":"comp/textinput.png","height":26}}]}]},{"type":"VBox","props":{"y":10,"x":10,"width":360,"top":0,"space":5,"bottom":0,"align":"center"},"child":[{"type":"HBox","props":{"width":1,"height":10}},{"type":"HBox","props":{"x":20,"space":10},"child":[{"type":"Label","props":{"width":120,"valign":"middle","text":"Pedestrain Densty:","height":26,"align":"right"}},{"type":"HSlider","props":{"var":"m_uiTraffic_pedestrainDensity_slider","value":50,"skin":"comp/hslider.png","min":0,"max":100,"centerY":6}},{"type":"TextInput","props":{"width":50,"var":"m_uiTraffic_pedestrainDensity_input","skin":"comp/textinput.png","height":26}}]}]}]},{"type":"HBox","props":{"top":108,"right":0,"left":0,"height":432}},{"type":"HBox","props":{"top":540,"right":0,"left":0,"height":108}}]}]}]}]};
		return DrivingPageUI;
	})(View);
var MainPageUI=(function(_super){
		function MainPageUI(){
			
		    this.list_left=null;

			MainPageUI.__super.call(this);
		}

		CLASS$(MainPageUI,'ui.main.MainPageUI',_super);
		var __proto__=MainPageUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(MainPageUI.uiView);

		}

		MainPageUI.uiView={"type":"View","props":{"width":800,"renderType":"instance","height":600},"child":[{"type":"Label","props":{"y":10,"x":10,"text":"Cybertron-","fontSize":24,"font":"SimHei","color":"#080606"}},{"type":"Label","props":{"y":10,"x":130,"text":"Zero","fontSize":24,"font":"SimHei","color":"#0d94e0"}},{"type":"List","props":{"y":199,"x":51,"width":"100","var":"list_left","height":"100"}}]};
		return MainPageUI;
	})(View);
var TestPageUI=(function(_super){
		function TestPageUI(){
			
		    this.btn_send=null;

			TestPageUI.__super.call(this);
		}

		CLASS$(TestPageUI,'ui.test.TestPageUI',_super);
		var __proto__=TestPageUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(TestPageUI.uiView);

		}

		TestPageUI.uiView={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"comp/bg.png","sizeGrid":"30,4,4,4","height":400}},{"type":"Button","props":{"y":345,"x":425,"width":150,"var":"btn_send","skin":"comp/button.png","sizeGrid":"4,4,4,4","label":"发送","height":37}},{"type":"Button","props":{"y":4,"x":563,"skin":"comp/btn_close.png","name":"close"}},{"type":"Button","props":{"y":160,"x":89,"label":"label"}},{"type":"Dialog","props":{"y":171,"x":311}},{"type":"Button","props":{"y":253,"x":67,"skin":"comp/button.png","label":"label"}},{"type":"CheckBox","props":{"y":166,"x":297,"skin":"comp/checkbox.png","label":"label"}},{"type":"Clip","props":{"y":65,"x":107,"skin":"comp/clip_selectBox.png"}},{"type":"Clip","props":{"y":108,"x":403,"skin":"comp/clip_tree_arrow.png"}},{"type":"HScrollBar","props":{"y":270,"x":313,"skin":"comp/hscroll.png"}}]};
		return TestPageUI;
	})(View);