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
			
		    this.m_uiBanner_home=null;
		    this.m_uiBanner_setup=null;
		    this.m_uiBanner_scene=null;
		    this.m_uiBanner_scenario=null;
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
		    this.m_uiSensorButton=null;
		    this.m_uiSensorList=null;
		    this.m_uiSimButton=null;
		    this.m_uiDriveButton=null;
		    this.m_uiDrive_speed=null;
		    this.m_uiDrive_accer=null;
		    this.m_uiDrive_steerSlider=null;
		    this.m_uiDrive_steerImage=null;

			DrivingPageUI.__super.call(this);
		}

		CLASS$(DrivingPageUI,'ui.main.DrivingPageUI',_super);
		var __proto__=DrivingPageUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(DrivingPageUI.uiView);

		}

		DrivingPageUI.uiView={"type":"View","props":{"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"VBox","props":{"width":1280,"top":0,"bottom":0},"child":[{"type":"HBox","props":{"right":0,"left":0,"height":72},"child":[{"type":"HBox","props":{"top":0,"left":40,"bottom":0},"child":[{"type":"Label","props":{"valign":"middle","text":"CYBERTRON-","fontSize":26,"color":"#000000","centerY":0,"bold":true}},{"type":"Label","props":{"valign":"middle","text":"ZERO","fontSize":26,"color":"#02aef0","centerY":0,"bold":true}}]},{"type":"Box","props":{"centerY":0,"centerX":0},"child":[{"type":"Label","props":{"valign":"middle","text":"Open Scene Driving","fontSize":32,"centerY":0,"align":"center"}}]},{"type":"HBox","props":{"top":10,"right":10,"align":"top"},"child":[{"type":"Label","props":{"var":"m_uiBanner_home","valign":"middle","underline":true,"text":"Home","fontSize":16,"color":"#0000ff"}},{"type":"Label","props":{"width":16,"valign":"middle","text":"|","fontSize":16,"align":"center"}},{"type":"Label","props":{"y":10,"x":10,"var":"m_uiBanner_setup","valign":"middle","underline":true,"text":"Setup","fontSize":16,"color":"#0000ff"}},{"type":"Label","props":{"y":10,"x":10,"width":16,"valign":"middle","text":"|","fontSize":16,"align":"center"}},{"type":"Label","props":{"y":10,"x":10,"var":"m_uiBanner_scene","valign":"middle","underline":true,"text":"Scene","fontSize":16,"color":"#0000ff"}},{"type":"Label","props":{"y":10,"x":10,"width":16,"valign":"middle","text":"|","fontSize":16,"align":"center"}},{"type":"Label","props":{"y":20,"x":20,"var":"m_uiBanner_scenario","valign":"middle","underline":true,"text":"Scenario","fontSize":16,"color":"#0000ff"}}]}]},{"type":"HBox","props":{"right":0,"left":0,"height":648},"child":[{"type":"VBox","props":{"width":200,"top":0,"bottom":0},"child":[{"type":"List","props":{"y":0,"x":0,"width":200,"var":"m_uiSceneList","vScrollBarSkin":"comp/vscroll.png","spaceY":16,"repeatX":1,"height":648},"child":[{"type":"Box","props":{"width":128,"name":"render","left":36},"child":[{"type":"Image","props":{"width":128,"name":"image","height":128}},{"type":"Label","props":{"width":128,"valign":"middle","top":8,"overflow":"hidden","name":"label","fontSize":16,"align":"center"}},{"type":"Button","props":{"y":0,"x":0,"width":128,"skin":"comp/checkbox.png","name":"button","height":128,"alpha":0.1}}]}]}]},{"type":"VBox","props":{"width":1080,"top":0,"bottom":0},"child":[{"type":"Tab","props":{"var":"m_uiSettingTab","skin":"comp/tab.png","selectedIndex":0,"right":0,"left":0,"labels":"Path,Weather,Traffic","height":26,"direction":"horizontal"}},{"type":"HBox","props":{"visible":true,"var":"m_uiPath","top":26,"right":0,"left":0,"height":82},"child":[{"type":"List","props":{"y":0,"x":0,"width":1080,"var":"m_uiPathList","spaceX":16,"repeatY":1,"height":82,"hScrollBarSkin":"comp/hscroll.png"},"child":[{"type":"Box","props":{"top":10,"name":"render","height":64},"child":[{"type":"Image","props":{"width":48,"name":"image","height":48}},{"type":"Label","props":{"width":48,"valign":"middle","overflow":"hidden","name":"label","bottom":5,"align":"center"}},{"type":"Button","props":{"width":48,"skin":"comp/checkbox.png","name":"button","height":48,"alpha":0.1}}]}]}]},{"type":"HBox","props":{"visible":false,"var":"m_uiWeather","top":26,"right":0,"left":0,"height":82},"child":[{"type":"VBox","props":{"width":270,"top":0,"space":5,"bottom":0,"align":"center"},"child":[{"type":"HBox","props":{"width":1,"height":10}},{"type":"HBox","props":{"x":20,"space":10},"child":[{"type":"Label","props":{"width":90,"valign":"middle","text":"Temperature:","height":26,"align":"right"}},{"type":"TextInput","props":{"width":120,"var":"m_uiWeather_temperature","valign":"middle","skin":"comp/textinput.png","height":26}}]},{"type":"HBox","props":{"x":20,"space":10},"child":[{"type":"Label","props":{"width":90,"valign":"middle","text":"Time of Day:","height":26,"align":"right"}},{"type":"TextInput","props":{"width":120,"var":"m_uiWeather_timeOfDay","valign":"middle","skin":"comp/textinput.png","height":26}}]}]},{"type":"VBox","props":{"width":82,"top":0,"bottom":0},"child":[{"type":"Image","props":{"top":20,"skin":"comp/rain.png","right":20,"left":20,"bottom":20}}]},{"type":"VBox","props":{"width":180,"top":0,"space":5,"bottom":0,"align":"center"},"child":[{"type":"HBox","props":{"width":1,"height":10}},{"type":"HBox","props":{"space":10},"child":[{"type":"Label","props":{"width":30,"valign":"middle","text":"Type:","height":26,"color":"#000000","align":"right"}},{"type":"ComboBox","props":{"width":120,"var":"m_uiWeather_rainType","skin":"comp/combobox.png","selectedIndex":0,"labels":"No,Yes","height":26}}]}]},{"type":"VBox","props":{"width":82,"top":0,"bottom":0},"child":[{"type":"Image","props":{"top":20,"skin":"comp/snow.png","right":20,"left":20,"bottom":20}}]},{"type":"VBox","props":{"width":180,"top":0,"space":5,"bottom":0},"child":[{"type":"HBox","props":{"width":1,"height":10}},{"type":"HBox","props":{"space":10},"child":[{"type":"Label","props":{"width":30,"valign":"middle","text":"Type:","height":26,"color":"#000000","align":"right"}},{"type":"ComboBox","props":{"width":120,"var":"m_uiWeather_snowType","skin":"comp/combobox.png","selectedIndex":0,"labels":"No,Yes","height":26}}]}]},{"type":"VBox","props":{"width":82,"top":0,"bottom":0},"child":[{"type":"Image","props":{"top":20,"skin":"comp/fog.png","right":20,"left":20,"bottom":20}}]},{"type":"VBox","props":{"width":180,"top":0,"space":5,"bottom":0},"child":[{"type":"HBox","props":{"width":1,"height":10}},{"type":"HBox","props":{"space":10},"child":[{"type":"Label","props":{"width":30,"valign":"middle","text":"Type:","height":26,"color":"#000000","align":"right"}},{"type":"ComboBox","props":{"width":120,"var":"m_uiWeather_fogType","skin":"comp/combobox.png","selectedIndex":0,"labels":"No,Yes","height":26}}]}]}]},{"type":"HBox","props":{"visible":false,"var":"m_uiTraffic","top":26,"right":0,"left":0,"height":82},"child":[{"type":"VBox","props":{"width":360,"top":0,"space":5,"bottom":0,"align":"center"},"child":[{"type":"HBox","props":{"width":1,"height":10}},{"type":"HBox","props":{"x":20,"space":10},"child":[{"type":"Label","props":{"width":120,"valign":"middle","text":"Car Density:","height":26,"align":"right"}},{"type":"HSlider","props":{"var":"m_uiTraffic_carDensity_slider","value":50,"skin":"comp/hslider.png","min":0,"max":100,"centerY":6}},{"type":"TextInput","props":{"width":50,"var":"m_uiTraffic_carDensity_input","skin":"comp/textinput.png","height":26}}]},{"type":"HBox","props":{"y":10,"x":30,"space":10},"child":[{"type":"Label","props":{"width":120,"valign":"middle","text":"Car Irregularity:","height":26,"align":"right"}},{"type":"HSlider","props":{"var":"m_uiTraffic_carIrregularity_slider","value":50,"skin":"comp/hslider.png","min":0,"max":100,"centerY":6}},{"type":"TextInput","props":{"width":50,"var":"m_uiTraffic_carIrregularity_input","skin":"comp/textinput.png","height":26}}]}]},{"type":"VBox","props":{"y":10,"x":10,"width":360,"top":0,"space":5,"bottom":0,"align":"center"},"child":[{"type":"HBox","props":{"width":1,"height":10}},{"type":"HBox","props":{"x":20,"space":10},"child":[{"type":"Label","props":{"width":120,"valign":"middle","text":"Pedestrain Densty:","height":26,"align":"right"}},{"type":"HSlider","props":{"var":"m_uiTraffic_pedestrainDensity_slider","value":50,"skin":"comp/hslider.png","min":0,"max":100,"centerY":6}},{"type":"TextInput","props":{"width":50,"var":"m_uiTraffic_pedestrainDensity_input","skin":"comp/textinput.png","height":26}}]}]}]},{"type":"HBox","props":{"top":108,"right":0,"left":0,"height":432},"child":[{"type":"VBox","props":{"width":240,"top":0,"bottom":0},"child":[{"type":"HBox","props":{"right":0,"left":0,"height":288},"child":[{"type":"Button","props":{"width":48,"var":"m_uiSensorButton","top":24,"skin":"comp/checkbox.png","left":24,"height":48}},{"type":"List","props":{"width":150,"var":"m_uiSensorList","vScrollBarSkin":"comp/vscroll.png","top":15,"right":10,"repeatX":1,"height":200},"child":[{"type":"Box","props":{"y":0,"x":0,"width":80,"name":"render","height":32},"child":[{"type":"CheckBox","props":{"width":64,"skin":"comp/checkbox.png","name":"checkbox","height":32,"centerY":0}},{"type":"Label","props":{"text":"label","name":"label","left":64}}]}]}]},{"type":"HBox","props":{"right":0,"left":0,"height":144},"child":[{"type":"VBox","props":{},"child":[{"type":"Button","props":{"width":64,"var":"m_uiSimButton","top":20,"skin":"comp/checkbox.png","left":20,"height":64}}]},{"type":"VBox","props":{},"child":[{"type":"HBox","props":{},"child":[{"type":"CheckBox","props":{"skin":"comp/checkbox.png","label":"Car"}},{"type":"CheckBox","props":{"skin":"comp/checkbox.png","label":"Pedestrain"}}]},{"type":"HBox","props":{},"child":[{"type":"Label","props":{"text":"States:"}}]},{"type":"HBox","props":{},"child":[{"type":"Label","props":{"text":"0"}},{"type":"Label","props":{"text":"Cars"}},{"type":"Label","props":{"text":"0"}},{"type":"Label","props":{"text":"Pedestrain"}}]}]}]}]},{"type":"VBox","props":{"width":500,"top":0,"bottom":0},"child":[{"type":"Button","props":{"width":64,"var":"m_uiDriveButton","skin":"comp/checkbox.png","left":5,"label":"label","height":64,"bottom":5}},{"type":"Box","props":{"top":0,"right":0},"child":[{"type":"HBox","props":{},"child":[{"type":"VBox","props":{},"child":[{"type":"HBox","props":{},"child":[{"type":"Label","props":{"text":"Speed:"}},{"type":"Label","props":{"var":"m_uiDrive_speed","text":"label"}},{"type":"Label","props":{"text":"km/h"}}]},{"type":"HBox","props":{},"child":[{"type":"Label","props":{"text":"Accel:"}},{"type":"Label","props":{"var":"m_uiDrive_accer","text":"label"}},{"type":"Label","props":{"text":"m/s^2"}}]}]},{"type":"VBox","props":{},"child":[{"type":"HSlider","props":{"var":"m_uiDrive_steerSlider","skin":"comp/hslider.png","min":-1,"max":1}},{"type":"Image","props":{"var":"m_uiDrive_steerImage","skin":"comp/checkbox.png","anchorY":0.5,"anchorX":0.5}}]}]}]}]}]},{"type":"HBox","props":{"top":540,"right":0,"left":0,"height":108}}]}]}]}]};
		return DrivingPageUI;
	})(View);
var MainPageUI=(function(_super){
		function MainPageUI(){
			
		    this.m_uiBanner_home=null;
		    this.m_uiBanner_setup=null;
		    this.m_uiBanner_scene=null;
		    this.m_uiBanner_scenario=null;

			MainPageUI.__super.call(this);
		}

		CLASS$(MainPageUI,'ui.main.MainPageUI',_super);
		var __proto__=MainPageUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(MainPageUI.uiView);

		}

		MainPageUI.uiView={"type":"View","props":{"top":0,"right":0,"renderType":"instance","left":0,"bottom":0},"child":[{"type":"VBox","props":{"width":1280,"top":0,"bottom":0},"child":[{"type":"HBox","props":{"right":0,"left":0,"height":72},"child":[{"type":"HBox","props":{"top":0,"left":40,"bottom":0},"child":[{"type":"Label","props":{"valign":"middle","text":"CYBERTRON-","fontSize":26,"color":"#000000","centerY":0,"bold":true}},{"type":"Label","props":{"valign":"middle","text":"ZERO","fontSize":26,"color":"#02aef0","centerY":0,"bold":true}}]},{"type":"HBox","props":{"top":10,"right":10,"align":"top"},"child":[{"type":"Label","props":{"var":"m_uiBanner_home","valign":"middle","underline":true,"text":"Home","fontSize":16,"color":"#0000ff"}},{"type":"Label","props":{"width":16,"valign":"middle","text":"|","fontSize":16,"align":"center"}},{"type":"Label","props":{"y":10,"x":10,"var":"m_uiBanner_setup","valign":"middle","underline":true,"text":"Setup","fontSize":16,"color":"#0000ff"}},{"type":"Label","props":{"y":10,"x":10,"width":16,"valign":"middle","text":"|","fontSize":16,"align":"center"}},{"type":"Label","props":{"y":10,"x":10,"var":"m_uiBanner_scene","valign":"middle","underline":true,"text":"Scene","fontSize":16,"color":"#0000ff"}},{"type":"Label","props":{"y":10,"x":10,"width":16,"valign":"middle","text":"|","fontSize":16,"align":"center"}},{"type":"Label","props":{"y":20,"x":20,"var":"m_uiBanner_scenario","valign":"middle","underline":true,"text":"Scenario","fontSize":16,"color":"#0000ff"}}]}]}]}]};
		return MainPageUI;
	})(View);
var ScenarioPageUI=(function(_super){
		function ScenarioPageUI(){
			
		    this.m_uiBanner_home=null;
		    this.m_uiBanner_setup=null;
		    this.m_uiBanner_scene=null;
		    this.m_uiBanner_scenario=null;
		    this.m_uiScenarioButton=null;
		    this.m_uiScenarioList=null;

			ScenarioPageUI.__super.call(this);
		}

		CLASS$(ScenarioPageUI,'ui.main.ScenarioPageUI',_super);
		var __proto__=ScenarioPageUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(ScenarioPageUI.uiView);

		}

		ScenarioPageUI.uiView={"type":"View","props":{"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"VBox","props":{"width":1280,"top":0,"bottom":0},"child":[{"type":"HBox","props":{"right":0,"left":0,"height":72},"child":[{"type":"HBox","props":{"top":0,"left":40,"bottom":0},"child":[{"type":"Label","props":{"valign":"middle","text":"CYBERTRON-","fontSize":26,"color":"#000000","centerY":0,"bold":true}},{"type":"Label","props":{"valign":"middle","text":"ZERO","fontSize":26,"color":"#02aef0","centerY":0,"bold":true}}]},{"type":"HBox","props":{"top":10,"right":10,"align":"top"},"child":[{"type":"Label","props":{"var":"m_uiBanner_home","valign":"middle","underline":true,"text":"Home","fontSize":16,"color":"#0000ff"}},{"type":"Label","props":{"width":16,"valign":"middle","text":"|","fontSize":16,"align":"center"}},{"type":"Label","props":{"y":10,"x":10,"var":"m_uiBanner_setup","valign":"middle","underline":true,"text":"Setup","fontSize":16,"color":"#0000ff"}},{"type":"Label","props":{"y":10,"x":10,"width":16,"valign":"middle","text":"|","fontSize":16,"align":"center"}},{"type":"Label","props":{"y":10,"x":10,"var":"m_uiBanner_scene","valign":"middle","underline":true,"text":"Scene","fontSize":16,"color":"#0000ff"}},{"type":"Label","props":{"y":10,"x":10,"width":16,"valign":"middle","text":"|","fontSize":16,"align":"center"}},{"type":"Label","props":{"y":20,"x":20,"var":"m_uiBanner_scenario","valign":"middle","underline":true,"text":"Scenario","fontSize":16,"color":"#0000ff"}}]}]},{"type":"HBox","props":{"right":0,"left":0,"height":648},"child":[{"type":"VBox","props":{"width":200,"top":0,"bottom":0},"child":[{"type":"Button","props":{"width":64,"var":"m_uiScenarioButton","skin":"comp/checkbox.png","left":10,"label":"Add","height":64,"bottom":10}},{"type":"List","props":{"y":0,"x":0,"width":200,"var":"m_uiScenarioList","vScrollBarSkin":"comp/vscroll.png","selectEnable":true,"repeatX":1,"height":648},"child":[{"type":"Box","props":{"y":0,"x":0,"name":"render"},"child":[{"type":"Label","props":{"text":"label","name":"label"}}]}]}]}]}]}]};
		return ScenarioPageUI;
	})(View);
var SetupPageUI=(function(_super){
		function SetupPageUI(){
			
		    this.m_uiBanner_home=null;
		    this.m_uiBanner_setup=null;
		    this.m_uiBanner_scene=null;
		    this.m_uiBanner_scenario=null;
		    this.m_uiCarList=null;
		    this.m_uiInventoryList=null;
		    this.m_uiCarBox=null;
		    this.m_uiParameterList_delete=null;
		    this.m_uiParameterList=null;

			SetupPageUI.__super.call(this);
		}

		CLASS$(SetupPageUI,'ui.main.SetupPageUI',_super);
		var __proto__=SetupPageUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(SetupPageUI.uiView);

		}

		SetupPageUI.uiView={"type":"View","props":{"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"VBox","props":{"width":1280,"top":0,"bottom":0},"child":[{"type":"HBox","props":{"right":0,"left":0,"height":72},"child":[{"type":"HBox","props":{"top":0,"left":40,"bottom":0},"child":[{"type":"Label","props":{"valign":"middle","text":"CYBERTRON-","fontSize":26,"color":"#000000","centerY":0,"bold":true}},{"type":"Label","props":{"valign":"middle","text":"ZERO","fontSize":26,"color":"#02aef0","centerY":0,"bold":true}}]},{"type":"Box","props":{"centerY":0,"centerX":0},"child":[{"type":"Label","props":{"valign":"middle","text":"Car and Sensor Setup","fontSize":32,"centerY":0,"align":"center"}}]},{"type":"HBox","props":{"top":10,"right":10,"align":"top"},"child":[{"type":"Label","props":{"var":"m_uiBanner_home","valign":"middle","underline":true,"text":"Home","fontSize":16,"color":"#0000ff"}},{"type":"Label","props":{"width":16,"valign":"middle","text":"|","fontSize":16,"align":"center"}},{"type":"Label","props":{"y":10,"x":10,"var":"m_uiBanner_setup","valign":"middle","underline":true,"text":"Setup","fontSize":16,"color":"#0000ff"}},{"type":"Label","props":{"y":10,"x":10,"width":16,"valign":"middle","text":"|","fontSize":16,"align":"center"}},{"type":"Label","props":{"y":10,"x":10,"var":"m_uiBanner_scene","valign":"middle","underline":true,"text":"Scene","fontSize":16,"color":"#0000ff"}},{"type":"Label","props":{"y":10,"x":10,"width":16,"valign":"middle","text":"|","fontSize":16,"align":"center"}},{"type":"Label","props":{"y":20,"x":20,"var":"m_uiBanner_scenario","valign":"middle","underline":true,"text":"Scenario","fontSize":16,"color":"#0000ff"}}]}]},{"type":"HBox","props":{"y":72,"right":0,"left":0,"height":648},"child":[{"type":"VBox","props":{"width":200,"top":0,"bottom":0},"child":[{"type":"List","props":{"y":0,"x":0,"width":200,"var":"m_uiCarList","vScrollBarSkin":"comp/vscroll.png","spaceY":16,"repeatX":1,"height":648},"child":[{"type":"Box","props":{"width":128,"name":"render","left":36},"child":[{"type":"Image","props":{"width":128,"name":"image","height":128}},{"type":"Label","props":{"width":128,"valign":"middle","top":8,"overflow":"hidden","name":"label","fontSize":16,"align":"center"}},{"type":"Button","props":{"y":0,"x":0,"width":128,"skin":"comp/checkbox.png","name":"button","height":128,"alpha":0.1}}]}]}]},{"type":"VBox","props":{"x":200,"width":1080,"top":0,"bottom":0},"child":[{"type":"Box","props":{"top":480,"left":60},"child":[{"type":"List","props":{"width":360,"var":"m_uiInventoryList","spaceX":16,"repeatY":1,"height":82,"hScrollBarSkin":"comp/hscroll.png"},"child":[{"type":"Box","props":{"top":10,"name":"render","height":64},"child":[{"type":"Image","props":{"width":48,"name":"image","height":48}},{"type":"Label","props":{"width":48,"valign":"middle","text":"censor","overflow":"hidden","name":"label","bottom":5,"align":"center"}},{"type":"Button","props":{"width":48,"skin":"comp/checkbox.png","name":"button","height":48,"alpha":0.1}},{"type":"Label","props":{"visible":false,"text":"label","name":"templateJson"}}]}]}]},{"type":"Box","props":{"width":480,"var":"m_uiCarBox","top":50,"left":50,"height":360},"child":[{"type":"Label","props":{"top":0,"right":0,"left":0,"bottom":0,"bgColor":"#005c6e","alpha":0.5}}]},{"type":"Box","props":{"top":200,"right":150},"child":[{"type":"Button","props":{"x":225,"visible":false,"var":"m_uiParameterList_delete","skin":"comp/button.png","label":"Delete"}},{"type":"List","props":{"y":30,"width":300,"var":"m_uiParameterList","vScrollBarSkin":"comp/vscroll.png","spaceY":5,"repeatX":1,"height":400},"child":[{"type":"Box","props":{"y":0,"x":0,"width":200,"name":"render","height":30},"child":[{"type":"Label","props":{"width":120,"valign":"middle","text":"label","name":"label","centerY":0,"align":"right"}},{"type":"TextInput","props":{"x":130,"valign":"middle","text":"TextInput","skin":"comp/textinput.png","name":"input","centerY":0,"align":"left"}}]}]}]}]}]}]}]};
		return SetupPageUI;
	})(View);
var AskPopupWindowUI=(function(_super){
		function AskPopupWindowUI(){
			
		    this.content=null;
		    this.noButton=null;
		    this.yesButton=null;

			AskPopupWindowUI.__super.call(this);
		}

		CLASS$(AskPopupWindowUI,'ui.obstacleEditor.Common.PopupWindow.AskPopupWindowUI',_super);
		var __proto__=AskPopupWindowUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(AskPopupWindowUI.uiView);

		}

		AskPopupWindowUI.uiView={"type":"Dialog","props":{"width":400,"popupCenter":true,"height":200},"child":[{"type":"Image","props":{"y":0,"x":0,"top":0,"skin":"custom/bg_grayFrame.png","sizeGrid":"2,2,2,2","right":0,"left":0,"bottom":0}},{"type":"TextArea","props":{"width":360,"var":"content","top":20,"text":"a","right":20,"overflow":"hidden","left":20,"height":120,"fontSize":32,"editable":false,"color":"#ffffff","bottom":50,"align":"left"}},{"type":"Button","props":{"y":195,"x":395,"width":80,"var":"noButton","skin":"comp/button.png","right":5,"label":"No","height":30,"bottom":5,"anchorY":1,"anchorX":1}},{"type":"Button","props":{"width":80,"var":"yesButton","skin":"comp/button.png","right":100,"label":"Yes","height":30,"bottom":5,"anchorY":1,"anchorX":1}}]};
		return AskPopupWindowUI;
	})(Dialog);
var WarningPopupWindowUI=(function(_super){
		function WarningPopupWindowUI(){
			

			WarningPopupWindowUI.__super.call(this);
		}

		CLASS$(WarningPopupWindowUI,'ui.obstacleEditor.Common.PopupWindow.WarningPopupWindowUI',_super);
		var __proto__=WarningPopupWindowUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(WarningPopupWindowUI.uiView);

		}

		WarningPopupWindowUI.uiView={"type":"Dialog","props":{"width":100,"height":100}};
		return WarningPopupWindowUI;
	})(Dialog);
var DebugPanelUI=(function(_super){
		function DebugPanelUI(){
			
		    this.closeButton=null;
		    this.mapDirectoryInput=null;
		    this.loadMapButton=null;
		    this.loadCaseButton=null;
		    this.saveCaseButton=null;
		    this.loadCaseInput=null;

			DebugPanelUI.__super.call(this);
		}

		CLASS$(DebugPanelUI,'ui.obstacleEditor.DebugPanel.DebugPanelUI',_super);
		var __proto__=DebugPanelUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(DebugPanelUI.uiView);

		}

		DebugPanelUI.uiView={"type":"View","props":{"width":1200,"top":0,"right":0,"left":0,"height":800,"bottom":0},"child":[{"type":"Image","props":{"y":10,"x":10,"top":0,"skin":"custom/bg_grayFrame.png","sizeGrid":"2,2,2,2","right":0,"name":"bg","left":0,"bottom":0},"child":[{"type":"Button","props":{"y":1,"x":1199,"width":100,"var":"closeButton","top":1,"skin":"custom/pixel_gray30.png","right":1,"labelColors":"#ffffff","label":"close","height":30,"anchorY":0,"anchorX":1}},{"type":"Label","props":{"y":145,"x":276,"width":100,"text":"Map directory","height":30,"color":"#ffffff","align":"center"}},{"type":"TextInput","props":{"y":136,"x":379,"width":400,"var":"mapDirectoryInput","promptColor":"#7f7f7f","prompt":"map directory","height":30,"fontSize":12,"color":"#ffffff"}},{"type":"Button","props":{"y":136,"x":180,"width":100,"var":"loadMapButton","skin":"custom/pixel_gray30.png","labelColors":"#ffffff","label":"Load Map","height":30}},{"type":"Button","props":{"y":206,"x":180,"width":100,"var":"loadCaseButton","skin":"custom/pixel_gray30.png","labelColors":"#ffffff","label":"Load Case","height":30}},{"type":"Button","props":{"y":270,"x":181,"width":100,"var":"saveCaseButton","skin":"custom/pixel_gray30.png","labelColors":"#ffffff","label":"Save Case","height":30}},{"type":"TextInput","props":{"y":205,"x":286,"width":400,"var":"loadCaseInput","promptColor":"#7a7a7a","prompt":"case file path","height":30,"color":"#ffffff"}}]}]};
		return DebugPanelUI;
	})(View);
var ObstacleInfoPanelUI=(function(_super){
		function ObstacleInfoPanelUI(){
			
		    this.contentPanel=null;
		    this.typeComboBox=null;
		    this.nameInput=null;
		    this.routePointList=null;
		    this.routePointButton=null;
		    this.addRoutePointButton=null;

			ObstacleInfoPanelUI.__super.call(this);
		}

		CLASS$(ObstacleInfoPanelUI,'ui.obstacleEditor.InfoPanel.ObstacleInfoPanelUI',_super);
		var __proto__=ObstacleInfoPanelUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(ObstacleInfoPanelUI.uiView);

		}

		ObstacleInfoPanelUI.uiView={"type":"View","props":{"width":200,"top":0,"right":0,"left":0,"height":500,"bottom":0},"child":[{"type":"Image","props":{"top":0,"skin":"custom/bg_grayFrame.png","sizeGrid":"2,2,2,2","right":0,"name":"bg","left":0,"bottom":0}},{"type":"Label","props":{"top":5,"text":"Obstacle Info","right":0,"name":"title","left":0,"height":20,"fontSize":14,"font":"Arial","color":"#ffffff","align":"center"}},{"type":"Panel","props":{"var":"contentPanel","top":30,"right":1,"left":1,"bottom":1},"child":[{"type":"Label","props":{"width":40,"top":0,"text":"type:","name":"typeLabel","left":5,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff","align":"left"}},{"type":"ComboBox","props":{"var":"typeComboBox","top":-1,"skin":"comp/combobox.png","sizeGrid":"2,19,2,2","scrollBarSkin":"comp/vscroll.png","right":5,"left":45,"labels":"label1,label2","height":15}},{"type":"Label","props":{"width":40,"top":20,"text":"name:","name":"nameLabel","left":5,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}},{"type":"TextInput","props":{"var":"nameInput","top":19,"right":5,"promptColor":"#808080","prompt":"input","left":45,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}},{"type":"Label","props":{"width":40,"top":40,"text":"route:","name":"routeLabel","left":5,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}},{"type":"List","props":{"var":"routePointList","vScrollBarSkin":"comp/vscroll.png","top":60,"spaceY":10,"right":0,"left":0,"bottom":20},"child":[{"type":"Button","props":{"y":0,"var":"routePointButton","skin":"custom/pixel_gray30.png","sizeGrid":"1,1,1,1","right":20,"name":"render","left":0,"labelSize":12,"labelFont":"Arial","labelColors":"#ffffff","label":"label","height":20},"child":[{"type":"Image","props":{"width":10,"skin":"comp/vslider.png","name":"selectedMark","height":10}}]}]},{"type":"Button","props":{"var":"addRoutePointButton","skin":"custom/pixel_gray30.png","sizeGrid":"2,2,2,2","right":0,"left":0,"labelColors":"#ffffff","label":"add point","height":20,"bottom":0}}]}]};
		return ObstacleInfoPanelUI;
	})(View);
var RoutePointInfoPanelUI=(function(_super){
		function RoutePointInfoPanelUI(){
			
		    this.contentPanel=null;
		    this.xInput=null;
		    this.yInput=null;
		    this.rotationInput=null;
		    this.timestampIntervalInput=null;
		    this.speedInput=null;
		    this.lockTypeComboBox=null;
		    this.timestampValueLabel=null;
		    this.reversingCheckBox=null;

			RoutePointInfoPanelUI.__super.call(this);
		}

		CLASS$(RoutePointInfoPanelUI,'ui.obstacleEditor.InfoPanel.RoutePointInfoPanelUI',_super);
		var __proto__=RoutePointInfoPanelUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(RoutePointInfoPanelUI.uiView);

		}

		RoutePointInfoPanelUI.uiView={"type":"View","props":{"width":200,"top":0,"right":0,"left":0,"height":170,"bottom":0},"child":[{"type":"Image","props":{"top":0,"skin":"custom/bg_grayFrame.png","sizeGrid":"2,2,2,2","right":0,"name":"bg","left":0,"bottom":0}},{"type":"Label","props":{"y":10,"x":10,"top":5,"text":"Route Point Info","right":0,"name":"title","left":0,"height":20,"fontSize":14,"font":"Arial","color":"#ffffff","align":"center"}},{"type":"VBox","props":{"var":"contentPanel","top":24,"right":1,"left":1,"bottom":1},"child":[{"type":"Box","props":{"right":0,"name":"xBox","left":0,"height":18},"child":[{"type":"Label","props":{"y":2,"x":5,"width":50,"top":2,"text":"x:","name":"xLabel","left":5,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}},{"type":"TextInput","props":{"y":0,"x":70,"var":"xInput","type":"number","top":0,"right":0,"promptColor":"#808080","prompt":"input","left":70,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}}]},{"type":"Box","props":{"y":10,"x":10,"right":0,"name":"yBox","left":0,"height":18},"child":[{"type":"Label","props":{"x":5,"width":50,"top":2,"text":"y:","name":"yLabel","left":5,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}},{"type":"TextInput","props":{"x":70,"var":"yInput","type":"number","top":0,"right":0,"promptColor":"#808080","prompt":"input","left":70,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}}]},{"type":"Box","props":{"y":20,"x":20,"right":0,"name":"rotationBox","left":0,"height":18},"child":[{"type":"Label","props":{"x":5,"width":50,"top":2,"text":"rotation:","name":"rotationLabel","left":5,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}},{"type":"TextInput","props":{"x":70,"var":"rotationInput","type":"number","top":0,"right":0,"promptColor":"#808080","prompt":"input","left":70,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}}]},{"type":"Box","props":{"y":30,"x":30,"right":0,"name":"timeInterBox","left":0,"height":18},"child":[{"type":"Label","props":{"x":5,"width":50,"top":2,"text":"time inter:","name":"timestampIntervalLabel","left":5,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}},{"type":"TextInput","props":{"x":70,"var":"timestampIntervalInput","type":"number","top":0,"right":0,"promptColor":"#808080","prompt":"input","left":70,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}}]},{"type":"Box","props":{"y":40,"x":40,"right":0,"name":"speedBox","left":0,"height":18},"child":[{"type":"Label","props":{"x":5,"width":50,"top":2,"text":"speed:","name":"speedLabel","left":5,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}},{"type":"TextInput","props":{"x":70,"var":"speedInput","type":"number","top":0,"right":0,"promptColor":"#808080","prompt":"input","left":70,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}}]},{"type":"Box","props":{"y":90,"x":0,"right":0,"name":"lockTypeBox","left":0,"height":18},"child":[{"type":"Label","props":{"y":20,"x":5,"width":50,"top":2,"text":"lock type:","name":"lockTypeLabel","left":5,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}},{"type":"ComboBox","props":{"width":70,"var":"lockTypeComboBox","top":2,"skin":"comp/combobox.png","left":72,"labels":"label1,label2","height":15}}]},{"type":"Box","props":{"y":90,"x":0,"right":0,"name":"totalTimeBox","left":0,"height":18},"child":[{"type":"Label","props":{"x":5,"width":50,"top":2,"text":"total time:","name":"timestampLabel","left":5,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}},{"type":"Label","props":{"x":72,"width":50,"var":"timestampValueLabel","top":2,"text":"0","left":72,"height":15,"fontSize":12,"font":"Arial","color":"#c1c1c1"}}]},{"type":"Box","props":{"y":108,"x":0,"right":0,"name":"reversingBox","left":0,"height":18},"child":[{"type":"Label","props":{"x":5,"width":50,"top":2,"text":"reversing:","name":"reversingLabel","left":5,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}},{"type":"CheckBox","props":{"x":72,"width":10,"var":"reversingCheckBox","top":0,"skin":"comp/checkbox.png","left":72,"height":10}}]}]}]};
		return RoutePointInfoPanelUI;
	})(View);
var MapPanelUI=(function(_super){
		function MapPanelUI(){
			
		    this.mainContainer=null;
		    this.mapImage=null;
		    this.miniMapBox=null;
		    this.miniMapImageLight=null;
		    this.miniMapImage=null;
		    this.actualFrame=null;
		    this.miniMapButton=null;

			MapPanelUI.__super.call(this);
		}

		CLASS$(MapPanelUI,'ui.obstacleEditor.MapPanel.MapPanelUI',_super);
		var __proto__=MapPanelUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(MapPanelUI.uiView);

		}

		MapPanelUI.uiView={"type":"View","props":{"width":1000,"top":0,"right":0,"left":0,"height":770,"bottom":0},"child":[{"type":"Image","props":{"y":20,"x":20,"top":0,"skin":"custom/bg_grayFrame.png","sizeGrid":"2,2,2,2","right":0,"name":"bg","left":0,"bottom":0}},{"type":"Panel","props":{"var":"mainContainer","vScrollBarSkin":"comp/vscroll.png","top":0,"right":0,"left":0,"hScrollBarSkin":"comp/hscroll.png","bottom":0,"alpha":1},"child":[{"type":"Image","props":{"width":200,"var":"mapImage","height":200}}]},{"type":"Box","props":{"width":180,"var":"miniMapBox","left":10,"height":180,"bottom":25,"anchorY":1,"anchorX":0},"child":[{"type":"Image","props":{"top":-1,"skin":"custom/bg_grayFrame.png","sizeGrid":"2,2,2,2","right":-1,"name":"bg","left":-1,"bottom":-1}},{"type":"Image","props":{"y":0,"x":0,"var":"miniMapImageLight","top":0,"right":0,"left":0,"bottom":0,"alpha":0.3}},{"type":"Image","props":{"var":"miniMapImage","top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"y":18,"x":30,"width":100,"var":"actualFrame","skin":"comp/bg.png","renderType":"mask","height":100}}]},{"type":"Button","props":{"var":"miniMapButton","top":0,"right":0,"left":0,"bottom":0}}]}]};
		return MapPanelUI;
	})(View);
var RoutePointViewUI=(function(_super){
		function RoutePointViewUI(){
			
		    this.arrowImage=null;
		    this.selectedMark=null;
		    this.rotationButton=null;
		    this.dragButton=null;
		    this.indexLabel=null;

			RoutePointViewUI.__super.call(this);
		}

		CLASS$(RoutePointViewUI,'ui.obstacleEditor.MapPanel.RoutePointViewUI',_super);
		var __proto__=RoutePointViewUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(RoutePointViewUI.uiView);

		}

		RoutePointViewUI.uiView={"type":"View","props":{"y":-1,"x":-1,"width":50,"visible":true,"height":50},"child":[{"type":"Image","props":{"y":25,"x":25,"width":50,"var":"arrowImage","skin":"custom/pixel_red.png","sizeGrid":"1,1,1,1","height":5,"anchorY":0.5,"anchorX":0}},{"type":"Image","props":{"y":0,"x":0,"visible":true,"var":"selectedMark","top":0,"skin":"custom/bg_grayFrame.png","sizeGrid":"2,2,2,2","right":0,"left":0,"bottom":0},"child":[{"type":"Button","props":{"y":0,"x":0,"var":"rotationButton","top":0,"right":0,"left":0,"bottom":0}}]},{"type":"Image","props":{"top":10,"skin":"custom/bg_grayFrame.png","sizeGrid":"2,2,2,2","right":10,"left":10,"bottom":10},"child":[{"type":"Button","props":{"y":15,"x":15,"var":"dragButton","top":0,"right":0,"left":0,"bottom":0,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"var":"indexLabel","text":"99","fontSize":24,"color":"#ffffff","centerY":0,"centerX":0}}]};
		return RoutePointViewUI;
	})(View);
var ObstacleEditorMainPanelUI=(function(_super){
		function ObstacleEditorMainPanelUI(){
			
		    this.obstaclePanelContainer=null;
		    this.obstacleInfoPanelContainer=null;
		    this.routePointInfoPanelContainer=null;
		    this.mapPanelContainer=null;
		    this.closeButton=null;
		    this.saveButton=null;
		    this.undoButton=null;
		    this.redoButton=null;

			ObstacleEditorMainPanelUI.__super.call(this);
		}

		CLASS$(ObstacleEditorMainPanelUI,'ui.obstacleEditor.ObstacleEditorMainPanelUI',_super);
		var __proto__=ObstacleEditorMainPanelUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(ObstacleEditorMainPanelUI.uiView);

		}

		ObstacleEditorMainPanelUI.uiView={"type":"View","props":{"width":1200,"top":0,"right":0,"left":0,"height":800,"bottom":0},"child":[{"type":"Box","props":{"top":30,"right":0,"left":0,"bottom":0},"child":[{"type":"Panel","props":{"y":-30,"x":0,"width":100,"var":"obstaclePanelContainer","top":0,"left":0,"bottom":0}},{"type":"Panel","props":{"y":-30,"x":100,"width":200,"top":0,"left":100,"bottom":0},"child":[{"type":"Panel","props":{"var":"obstacleInfoPanelContainer","top":0,"right":0,"left":0,"height":500}},{"type":"Panel","props":{"var":"routePointInfoPanelContainer","top":500,"right":0,"left":0,"bottom":0}}]},{"type":"Panel","props":{"y":-30,"x":300,"var":"mapPanelContainer","top":0,"right":0,"left":300,"bottom":0}}]},{"type":"Box","props":{"top":0,"right":0,"name":"menu","left":0,"height":30},"child":[{"type":"Image","props":{"y":0,"skin":"custom/bg_grayFrame.png","sizeGrid":"2,2,2,2","right":0,"name":"bg","left":0,"height":30}},{"type":"Button","props":{"y":1,"x":1099,"width":100,"var":"closeButton","top":1,"skin":"comp/button.png","right":1,"label":"Close","height":28}},{"type":"HBox","props":{"width":500,"top":0,"space":5,"bottom":0},"child":[{"type":"Button","props":{"y":1,"x":1,"width":100,"var":"saveButton","skin":"comp/button.png","label":"Save","height":28}},{"type":"Button","props":{"y":1,"x":104,"width":100,"var":"undoButton","skin":"comp/button.png","label":"<-Undo","height":28}},{"type":"Button","props":{"y":1,"x":206,"width":100,"var":"redoButton","skin":"comp/button.png","label":"Redo->","height":28}}]}]}]};
		return ObstacleEditorMainPanelUI;
	})(View);
var ObstaclePanelUI=(function(_super){
		function ObstaclePanelUI(){
			
		    this.obstacleList=null;
		    this.obstacleButton=null;
		    this.addButton=null;

			ObstaclePanelUI.__super.call(this);
		}

		CLASS$(ObstaclePanelUI,'ui.obstacleEditor.ObstaclePanel.ObstaclePanelUI',_super);
		var __proto__=ObstaclePanelUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(ObstaclePanelUI.uiView);

		}

		ObstaclePanelUI.uiView={"type":"View","props":{"width":100,"top":0,"right":0,"left":0,"height":770,"bottom":0},"child":[{"type":"Image","props":{"top":0,"skin":"custom/bg_grayFrame.png","sizeGrid":"2,2,2,2","right":0,"name":"bg","left":0,"bottom":0}},{"type":"List","props":{"width":100,"var":"obstacleList","vScrollBarSkin":"comp/vscroll.png","top":0,"spaceY":20,"right":0,"repeatX":1,"mouseEnabled":true,"left":0,"labelStroke":-138,"height":730,"bottom":40,"anchorY":0,"anchorX":0},"child":[{"type":"Button","props":{"y":4,"width":60,"var":"obstacleButton","strokeColors":"#ff0000,#ff0000,#ff0000,#ff0000","skin":"comp/button.png","pivotY":0,"pivotX":0,"name":"render","height":60,"centerX":-7},"child":[{"type":"Image","props":{"width":20,"top":0,"skin":"comp/hslider.png","sizeGrid":"2,2,2,2","name":"selectedMark","left":0,"height":20}},{"type":"Label","props":{"text":"label","right":0,"name":"nameLabel","left":0,"height":18,"color":"#ffffff","bottom":-20,"align":"center"}}]}]},{"type":"Button","props":{"var":"addButton","skin":"comp/button.png","right":0,"left":0,"label":"add","height":40,"bottom":0}}]};
		return ObstaclePanelUI;
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