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
		    this.m_uiButton_setup=null;
		    this.m_uiButton_driving=null;
		    this.m_uiButton_scenario=null;

			MainPageUI.__super.call(this);
		}

		CLASS$(MainPageUI,'ui.main.MainPageUI',_super);
		var __proto__=MainPageUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(MainPageUI.uiView);

		}

		MainPageUI.uiView={"type":"View","props":{"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"top":0,"skin":"background/bg_page.png","right":0,"left":0,"bottom":0}},{"type":"Box","props":{"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Box","props":{"right":0,"left":0,"height":36},"child":[{"type":"Image","props":{"top":0,"skin":"custom/bg_banner.png","right":0,"left":0,"bottom":0}},{"type":"HBox","props":{"left":0,"centerY":0},"child":[{"type":"Image","props":{"skin":"custom/logo.png"}}]},{"type":"HBox","props":{"right":10,"centerY":0},"child":[{"type":"Label","props":{"var":"m_uiBanner_home","valign":"middle","text":"Home","height":18,"color":"#f0f0f0","centerY":0}},{"type":"Box","props":{"width":10,"centerY":0},"child":[{"type":"Image","props":{"width":1,"skin":"custom/pixel_gray30.png","sizeGrid":"0,5,0,110","height":16,"centerY":0,"centerX":0}}]},{"type":"Label","props":{"var":"m_uiBanner_setup","valign":"middle","text":"Setup","height":18,"color":"#f0f0f0","centerY":0}},{"type":"Box","props":{"width":10,"centerY":0},"child":[{"type":"Image","props":{"width":1,"skin":"custom/pixel_gray30.png","sizeGrid":"0,5,0,110","height":16,"centerY":0,"centerX":0}}]},{"type":"Label","props":{"var":"m_uiBanner_scene","valign":"middle","text":"Scene","height":18,"color":"#f0f0f0","centerY":0}},{"type":"Box","props":{"width":10,"centerY":0},"child":[{"type":"Image","props":{"width":1,"skin":"custom/pixel_gray30.png","sizeGrid":"0,5,0,110","height":16,"centerY":0,"centerX":0}}]},{"type":"Label","props":{"var":"m_uiBanner_scenario","valign":"middle","text":"Scenario","height":18,"color":"#f0f0f0","centerY":0}}]}]},{"type":"Box","props":{"top":36,"right":0,"left":0,"bottom":0},"child":[{"type":"HBox","props":{"centerY":0,"centerX":0},"child":[{"type":"Box","props":{},"child":[{"type":"Button","props":{"width":240,"var":"m_uiButton_setup","skin":"custom/button_main_setup.png","height":240}}]},{"type":"Box","props":{},"child":[{"type":"Button","props":{"width":240,"var":"m_uiButton_driving","skin":"custom/button_main_driving.png","height":240}}]},{"type":"Box","props":{},"child":[{"type":"Button","props":{"width":240,"var":"m_uiButton_scenario","skin":"custom/button_main_scenario.png","height":240}}]}]}]}]}]};
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

		ScenarioPageUI.uiView={"type":"View","props":{"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"VBox","props":{"width":1280,"top":0,"bottom":0},"child":[{"type":"HBox","props":{"right":0,"left":0,"height":72},"child":[{"type":"HBox","props":{"top":0,"left":40,"bottom":0},"child":[{"type":"Label","props":{"valign":"middle","text":"CYBERTRON-","fontSize":26,"color":"#000000","centerY":0,"bold":true}},{"type":"Label","props":{"valign":"middle","text":"ZERO","fontSize":26,"color":"#02aef0","centerY":0,"bold":true}}]},{"type":"HBox","props":{"top":10,"right":10,"align":"top"},"child":[{"type":"Label","props":{"var":"m_uiBanner_home","valign":"middle","underline":true,"text":"Home","fontSize":16,"color":"#0000ff"}},{"type":"Label","props":{"width":16,"valign":"middle","text":"|","fontSize":16,"align":"center"}},{"type":"Label","props":{"y":10,"x":10,"var":"m_uiBanner_setup","valign":"middle","underline":true,"text":"Setup","fontSize":16,"color":"#0000ff"}},{"type":"Label","props":{"y":10,"x":10,"width":16,"valign":"middle","text":"|","fontSize":16,"align":"center"}},{"type":"Label","props":{"y":10,"x":10,"var":"m_uiBanner_scene","valign":"middle","underline":true,"text":"Scene","fontSize":16,"color":"#0000ff"}},{"type":"Label","props":{"y":10,"x":10,"width":16,"valign":"middle","text":"|","fontSize":16,"align":"center"}},{"type":"Label","props":{"y":20,"x":20,"var":"m_uiBanner_scenario","valign":"middle","underline":true,"text":"Scenario","fontSize":16,"color":"#0000ff"}}]}]},{"type":"HBox","props":{"right":0,"left":0,"height":648},"child":[{"type":"VBox","props":{"width":200,"top":0,"bottom":0},"child":[{"type":"Button","props":{"width":64,"var":"m_uiScenarioButton","skin":"comp/checkbox.png","left":10,"label":"Add","height":64,"bottom":10}},{"type":"List","props":{"y":0,"x":0,"width":200,"var":"m_uiScenarioList","vScrollBarSkin":"comp/vscroll.png","selectEnable":true,"repeatX":1,"height":500},"child":[{"type":"Box","props":{"y":0,"x":0,"name":"render"},"child":[{"type":"Label","props":{"text":"label","name":"label"}}]}]}]}]}]}]};
		return ScenarioPageUI;
	})(View);
var SetupPageUI=(function(_super){
		function SetupPageUI(){
			
		    this.m_uiBanner_home=null;
		    this.m_uiBanner_setup=null;
		    this.m_uiBanner_scene=null;
		    this.m_uiBanner_scenario=null;
		    this.m_uiCarList=null;
		    this.m_uiCarBox=null;
		    this.m_uiInventoryList=null;
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

		SetupPageUI.uiView={"type":"View","props":{"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"top":0,"skin":"background/bg_page.png","right":0,"left":0,"bottom":0}},{"type":"Box","props":{"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Box","props":{"right":0,"left":0,"height":36},"child":[{"type":"Image","props":{"top":0,"skin":"custom/bg_banner.png","right":0,"left":0,"bottom":0}},{"type":"HBox","props":{"left":0,"centerY":0},"child":[{"type":"Image","props":{"skin":"custom/logo.png"}}]},{"type":"HBox","props":{"right":10,"centerY":0},"child":[{"type":"Label","props":{"var":"m_uiBanner_home","valign":"middle","text":"Home","height":18,"color":"#f0f0f0","centerY":0}},{"type":"Box","props":{"width":10,"centerY":0},"child":[{"type":"Image","props":{"width":1,"skin":"custom/pixel_gray30.png","sizeGrid":"0,5,0,110","height":16,"centerY":0,"centerX":0}}]},{"type":"Label","props":{"var":"m_uiBanner_setup","valign":"middle","text":"Setup","height":18,"color":"#f0f0f0","centerY":0}},{"type":"Box","props":{"width":10,"centerY":0},"child":[{"type":"Image","props":{"width":1,"skin":"custom/pixel_gray30.png","sizeGrid":"0,5,0,110","height":16,"centerY":0,"centerX":0}}]},{"type":"Label","props":{"var":"m_uiBanner_scene","valign":"middle","text":"Scene","height":18,"color":"#f0f0f0","centerY":0}},{"type":"Box","props":{"width":10,"centerY":0},"child":[{"type":"Image","props":{"width":1,"skin":"custom/pixel_gray30.png","sizeGrid":"0,5,0,110","height":16,"centerY":0,"centerX":0}}]},{"type":"Label","props":{"var":"m_uiBanner_scenario","valign":"middle","text":"Scenario","height":18,"color":"#f0f0f0","centerY":0}}]},{"type":"HBox","props":{"centerY":0,"centerX":0},"child":[{"type":"Label","props":{"valign":"middle","text":"Car and Sensor Setup","fontSize":16,"color":"#f0f0f0","align":"center"}}]}]},{"type":"Box","props":{"top":36,"right":0,"left":0,"bottom":0},"child":[{"type":"Box","props":{"width":210,"top":0,"bottom":0},"child":[{"type":"List","props":{"var":"m_uiCarList","vScrollBarSkin":"custom/vscroll.png","top":20,"spaceY":16,"right":5,"repeatX":1,"left":5,"bottom":20},"child":[{"type":"Box","props":{"width":180,"name":"render","height":120,"centerX":0},"child":[{"type":"Image","props":{"top":5,"skin":"custom/image_sensors_preview.png","name":"image","centerX":0}},{"type":"Label","props":{"valign":"middle","text":"Car Preset #1","overflow":"hidden","name":"label","color":"#f0f0f0","centerX":0,"bottom":10,"align":"center"}}]}]}]},{"type":"Box","props":{"top":0,"right":0,"left":210,"bottom":0},"child":[{"type":"Image","props":{"top":10,"skin":"custom/bg_inset.png","right":10,"left":10,"bottom":10,"sizeGrid":"10,10,10,10"}},{"type":"Box","props":{"var":"m_uiCarBox","top":50,"right":440,"left":50,"bottom":220}},{"type":"Box","props":{"width":350,"left":160,"height":110,"bottom":40},"child":[{"type":"Button","props":{"top":0,"stateNum":1,"skin":"custom/bg_tab.png","left":0,"labelColors":"#f0f0f0","label":"Inventory","height":24,"disabled":true}},{"type":"Image","props":{"top":24,"skin":"custom/bg_float.png","right":0,"left":0,"bottom":0,"sizeGrid":"20,20,20,20"}},{"type":"List","props":{"var":"m_uiInventoryList","top":24,"spaceX":16,"right":10,"repeatY":1,"left":10,"bottom":0},"child":[{"type":"Box","props":{"width":60,"name":"render","height":70,"centerY":0},"child":[{"type":"Image","props":{"width":32,"skin":"custom/bg_listitem.png","name":"image","height":32,"centerY":-10,"centerX":0,"sizeGrid":"3,10,5,10"}},{"type":"Image","props":{"width":32,"name":"icon","height":32,"centerY":-10,"centerX":0}},{"type":"Label","props":{"valign":"middle","text":"censor","overflow":"hidden","name":"label","color":"#f0f0f0","centerY":20,"centerX":0,"align":"center"}},{"type":"Label","props":{"visible":false,"name":"templateJson"}}]}]}]},{"type":"Box","props":{"width":260,"top":70,"right":80,"bottom":40},"child":[{"type":"Box","props":{"centerX":0},"child":[{"type":"Image","props":{"skin":"custom/image_sensor_type0.png"}}]},{"type":"Box","props":{"top":180,"right":0,"left":0,"bottom":0},"child":[{"type":"Button","props":{"top":0,"stateNum":1,"skin":"custom/bg_tab.png","left":0,"labelColors":"#f0f0f0","label":"Parameters","height":24,"disabled":true}},{"type":"Button","props":{"width":20,"visible":false,"var":"m_uiParameterList_delete","top":0,"stateNum":1,"skin":"custom/button_delete.png","right":20,"height":20}},{"type":"Image","props":{"top":24,"skin":"custom/bg_float.png","right":0,"left":0,"bottom":0,"sizeGrid":"20,20,20,20"}},{"type":"List","props":{"var":"m_uiParameterList","vScrollBarSkin":"custom/vscroll.png","top":35,"spaceY":5,"right":5,"repeatX":1,"left":5,"bottom":0},"child":[{"type":"Box","props":{"width":240,"name":"render","height":24,"centerX":0},"child":[{"type":"Label","props":{"width":100,"valign":"middle","text":"Parameter Name","name":"label","left":10,"color":"#f0f0f0","centerY":0,"align":"right"}},{"type":"TextInput","props":{"width":100,"valign":"middle","text":"TextInput","skin":"custom/bg_listitem.png","right":10,"name":"input","color":"#f0f0f0","centerY":0,"align":"left","sizeGrid":"3,10,5,10"}}]}]}]}]}]}]}]}]};
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

		ObstacleInfoPanelUI.uiView={"type":"View","props":{"width":200,"top":0,"right":0,"left":0,"height":500,"bottom":0},"child":[{"type":"Image","props":{"top":0,"skin":"custom/bg_panel.png","sizeGrid":"2,2,2,2","right":-1,"name":"bg","left":0,"bottom":0}},{"type":"Box","props":{"top":0,"right":0,"name":"title","left":0,"height":40},"child":[{"type":"Label","props":{"top":7,"text":"Selected obstacle","right":0,"name":"title","left":10,"height":20,"fontSize":12,"font":"Arial","color":"#ffffff","align":"left"}},{"type":"Image","props":{"top":14,"skin":"custom/line_subtitle.png","right":10,"left":120,"height":1}}]},{"type":"Panel","props":{"var":"contentPanel","top":30,"right":1,"left":1,"bottom":1},"child":[{"type":"Label","props":{"width":40,"top":0,"text":"type:","name":"typeLabel","left":5,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff","align":"left"}},{"type":"ComboBox","props":{"var":"typeComboBox","top":-1,"skin":"comp/combobox.png","sizeGrid":"2,19,2,2","scrollBarSkin":"comp/vscroll.png","right":5,"left":45,"labels":"label1,label2","height":15}},{"type":"Label","props":{"width":40,"top":20,"text":"name:","name":"nameLabel","left":5,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}},{"type":"TextInput","props":{"var":"nameInput","top":19,"right":5,"promptColor":"#808080","prompt":"input","left":45,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}},{"type":"Label","props":{"width":40,"top":40,"text":"route:","name":"routeLabel","left":5,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}},{"type":"List","props":{"var":"routePointList","vScrollBarSkin":"custom/vscroll.png","top":60,"spaceY":10,"right":0,"left":0,"bottom":45},"child":[{"type":"Button","props":{"y":1,"var":"routePointButton","skin":"custom/pixel_gray30.png","sizeGrid":"1,1,1,1","right":10,"name":"render","left":6,"labelSize":12,"labelFont":"Arial","labelColors":"#ffffff","label":"label","height":20},"child":[{"type":"Image","props":{"top":-1,"skin":"custom/frame_orange.png","sizeGrid":"2,2,2,2","right":-1,"name":"selectedMark","left":-1,"bottom":-1}}]}]},{"type":"Button","props":{"width":40,"var":"addRoutePointButton","skin":"custom/button_add_circle.png","labelColors":"#ffffff","height":40,"centerX":0,"bottom":3}}]}]};
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

		RoutePointInfoPanelUI.uiView={"type":"View","props":{"width":200,"top":0,"right":0,"name":"title","left":0,"height":255,"bottom":0},"child":[{"type":"Image","props":{"top":0,"skin":"custom/bg_panel.png","sizeGrid":"2,2,2,2","right":-1,"name":"bg","left":0,"bottom":0}},{"type":"Box","props":{"top":0,"right":0,"left":0,"height":40},"child":[{"type":"Label","props":{"top":7,"text":"Selected point","right":0,"name":"title","left":10,"height":20,"fontSize":12,"font":"Arial","color":"#ffffff","align":"left"}},{"type":"Image","props":{"top":14,"skin":"custom/line_subtitle.png","right":10,"left":100,"height":1}}]},{"type":"VBox","props":{"var":"contentPanel","top":24,"space":5,"right":1,"left":1,"bottom":1},"child":[{"type":"Box","props":{"right":0,"name":"xBox","left":0,"height":18},"child":[{"type":"Label","props":{"y":2,"x":5,"width":50,"top":2,"text":"x:","name":"xLabel","left":5,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}},{"type":"TextInput","props":{"y":0,"x":70,"var":"xInput","type":"number","top":0,"right":0,"promptColor":"#808080","prompt":"input","left":70,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}}]},{"type":"Box","props":{"y":10,"x":10,"right":0,"name":"yBox","left":0,"height":18},"child":[{"type":"Label","props":{"x":5,"width":50,"top":2,"text":"y:","name":"yLabel","left":5,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}},{"type":"TextInput","props":{"x":70,"var":"yInput","type":"number","top":0,"right":0,"promptColor":"#808080","prompt":"input","left":70,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}}]},{"type":"Box","props":{"y":20,"x":20,"right":0,"name":"rotationBox","left":0,"height":18},"child":[{"type":"Label","props":{"x":5,"width":50,"top":2,"text":"rotation:","name":"rotationLabel","left":5,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}},{"type":"TextInput","props":{"x":70,"var":"rotationInput","type":"number","top":0,"right":0,"promptColor":"#808080","prompt":"input","left":70,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}}]},{"type":"Box","props":{"y":30,"x":30,"right":0,"name":"timeInterBox","left":0,"height":18},"child":[{"type":"Label","props":{"x":5,"width":50,"top":2,"text":"time inter:","name":"timestampIntervalLabel","left":5,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}},{"type":"TextInput","props":{"x":70,"var":"timestampIntervalInput","type":"number","top":0,"right":0,"promptColor":"#808080","prompt":"input","left":70,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}}]},{"type":"Box","props":{"y":40,"x":40,"right":0,"name":"speedBox","left":0,"height":18},"child":[{"type":"Label","props":{"x":5,"width":50,"top":2,"text":"speed:","name":"speedLabel","left":5,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}},{"type":"TextInput","props":{"x":70,"var":"speedInput","type":"number","top":0,"right":0,"promptColor":"#808080","prompt":"input","left":70,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}}]},{"type":"Box","props":{"y":90,"x":0,"right":0,"name":"lockTypeBox","left":0,"height":18},"child":[{"type":"Label","props":{"y":20,"x":5,"width":50,"top":2,"text":"lock type:","name":"lockTypeLabel","left":5,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}},{"type":"ComboBox","props":{"width":70,"var":"lockTypeComboBox","top":2,"skin":"comp/combobox.png","left":72,"labels":"label1,label2","height":15}}]},{"type":"Box","props":{"y":90,"x":0,"right":0,"name":"totalTimeBox","left":0,"height":18},"child":[{"type":"Label","props":{"x":5,"width":50,"top":2,"text":"total time:","name":"timestampLabel","left":5,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}},{"type":"Label","props":{"x":72,"width":50,"var":"timestampValueLabel","top":2,"text":"0","left":72,"height":15,"fontSize":12,"font":"Arial","color":"#c1c1c1"}}]},{"type":"Box","props":{"y":108,"x":0,"right":0,"name":"reversingBox","left":0,"height":18},"child":[{"type":"Label","props":{"x":5,"width":50,"top":2,"text":"reversing:","name":"reversingLabel","left":5,"height":15,"fontSize":12,"font":"Arial","color":"#ffffff"}},{"type":"CheckBox","props":{"x":72,"width":10,"var":"reversingCheckBox","top":0,"skin":"comp/checkbox.png","left":72,"height":10}}]}]}]};
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

		MapPanelUI.uiView={"type":"View","props":{"width":1000,"top":0,"right":0,"left":0,"height":770,"bottom":0},"child":[{"type":"Panel","props":{"var":"mainContainer","vScrollBarSkin":"custom/vscroll_black.png","top":2,"right":2,"left":2,"hScrollBarSkin":"custom/hscroll_black.png","bottom":2,"alpha":1},"child":[{"type":"Image","props":{"width":200,"var":"mapImage","height":200}}]},{"type":"Box","props":{"width":180,"var":"miniMapBox","left":20,"height":180,"bottom":60,"anchorY":1,"anchorX":0},"child":[{"type":"Image","props":{"top":-1,"skin":"custom/bg_panel.png","sizeGrid":"2,2,2,2","right":-5,"name":"bg","left":-1,"bottom":-4}},{"type":"Image","props":{"y":0,"x":0,"var":"miniMapImageLight","top":0,"right":0,"left":0,"bottom":0,"alpha":0.3}},{"type":"Image","props":{"var":"miniMapImage","top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"y":18,"x":30,"width":100,"var":"actualFrame","skin":"comp/bg.png","renderType":"mask","height":100}}]},{"type":"Button","props":{"var":"miniMapButton","top":0,"right":0,"left":0,"bottom":0}}]}]};
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

		ObstacleEditorMainPanelUI.uiView={"type":"View","props":{"width":1200,"top":0,"right":0,"left":0,"height":800,"bottom":0},"child":[{"type":"Image","props":{"top":0,"skin":"custom/bg_main.png","sizeGrid":"3,3,3,3","right":0,"name":"bg","left":0,"bottom":0}},{"type":"Box","props":{"top":30,"right":0,"left":0,"bottom":0},"child":[{"type":"Panel","props":{"y":-30,"x":0,"width":200,"var":"obstaclePanelContainer","top":0,"left":0,"bottom":0}},{"type":"Panel","props":{"y":-30,"width":200,"top":0,"left":200,"bottom":0},"child":[{"type":"Panel","props":{"var":"obstacleInfoPanelContainer","top":10,"right":10,"left":10,"height":485}},{"type":"Panel","props":{"var":"routePointInfoPanelContainer","top":505,"right":10,"left":10,"bottom":10}}]},{"type":"Panel","props":{"y":-30,"var":"mapPanelContainer","top":0,"right":0,"left":400,"bottom":0}}]},{"type":"Box","props":{"top":0,"right":0,"name":"menu","left":0,"height":30},"child":[{"type":"Button","props":{"y":1,"x":1099,"width":100,"var":"closeButton","top":1,"strokeColors":"#000000,#888888,#888888,#000000","skin":"custom/bg_main.png","right":1,"labelStrokeColor":"#000000","labelStroke":1,"labelColors":"#ffffff,#ffffff,#ffffff,#888888","labelAlign":"center","label":"Close","height":28,"alpha":1}},{"type":"HBox","props":{"width":500,"top":0,"space":5,"left":0,"bottom":0},"child":[{"type":"Button","props":{"y":1,"x":3,"width":100,"var":"saveButton","strokeColors":"#000000,#888888,#888888,#000000","skin":"custom/bg_main.png","labelStroke":1,"labelColors":"#ffffff,#ffffff,#ffffff,#888888","label":"Save","height":28}},{"type":"Button","props":{"y":1,"x":104,"width":100,"var":"undoButton","strokeColors":"#000000,#888888,#888888,#000000","skin":"custom/bg_main.png","labelStroke":1,"labelColors":"#ffffff,#ffffff,#ffffff,#888888","label":"<-Undo","height":28}},{"type":"Button","props":{"y":1,"x":206,"width":100,"var":"redoButton","strokeColors":"#000000,#888888,#888888,#000000","skin":"custom/bg_main.png","labelStroke":1,"labelColors":"#ffffff,#ffffff,#ffffff,#888888","label":"Redo->","height":28}}]}]}]};
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

		ObstaclePanelUI.uiView={"type":"View","props":{"width":150,"top":0,"right":0,"left":0,"height":770,"bottom":0},"child":[{"type":"List","props":{"width":100,"var":"obstacleList","vScrollBarSkin":"custom/vscroll.png","top":30,"spaceY":20,"right":0,"repeatX":1,"mouseEnabled":true,"left":0,"labelStroke":-138,"height":730,"bottom":50,"anchorY":0,"anchorX":0},"child":[{"type":"Button","props":{"y":8,"width":120,"var":"obstacleButton","strokeColors":"#ff0000,#ff0000,#ff0000,#ff0000","skin":"custom/bg_main.png","sizeGrid":"2,2,2,2","pivotY":0,"pivotX":0,"name":"render","height":96,"centerX":-2},"child":[{"type":"Image","props":{"width":100,"name":"obstacleImage","height":80,"centerY":0,"centerX":0}},{"type":"Image","props":{"top":-1,"skin":"custom/frame_orange.png","sizeGrid":"2,2,2,2","right":-1,"name":"selectedMark","left":-1,"bottom":-1}},{"type":"Label","props":{"text":"label","right":0,"name":"nameLabel","left":0,"height":18,"color":"#ffffff","bottom":-20,"align":"center"}}]}]},{"type":"Button","props":{"width":40,"var":"addButton","skin":"custom/button_add_circle.png","height":40,"centerX":0,"bottom":2}},{"type":"Label","props":{"top":10,"text":"Obstacle List","right":0,"left":0,"height":30,"fontSize":12,"color":"#ffffff","align":"center"}}]};
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