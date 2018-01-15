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

		STATICATTR$(ChatPageUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":600,"height":400},"child":[{"type":"TextInput","props":{"y":360,"x":47,"width":343,"var":"input_msg","text":"hello,world","skin":"comp/textinput.png","height":22}},{"type":"Button","props":{"y":360,"x":466,"var":"btn_send","skin":"comp/button.png","label":"Send"}},{"type":"TextArea","props":{"y":16,"x":15,"width":559,"var":"ta_content","skin":"comp/textarea.png","height":322}}]};}
		]);
		return ChatPageUI;
	})(View);
var DrivingPageUI=(function(_super){
		function DrivingPageUI(){
			

			DrivingPageUI.__super.call(this);
		}

		CLASS$(DrivingPageUI,'ui.main.DrivingPageUI',_super);
		var __proto__=DrivingPageUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(DrivingPageUI.uiView);

		}

		DrivingPageUI.uiView={"type":"View","props":{"width":800,"renderType":"instance","height":600},"child":[{"type":"Image","props":{"y":0,"x":0,"width":800,"skin":"comp/blank.png","height":600}},{"type":"List","props":{"y":50,"x":0,"width":200,"vScrollBarSkin":"comp/vscroll.png","height":550,"hScrollBarSkin":"comp/hscroll.png"}},{"type":"Label","props":{"y":10,"x":10,"text":"Cybertron-","fontSize":24,"font":"SimHei"}},{"type":"Label","props":{"y":10,"x":130,"text":"Zero","fontSize":24,"font":"SimHei","color":"#0d94e0"}},{"type":"Tab","props":{"y":50,"x":214,"width":585,"skin":"comp/tab.png","labels":"label1,label2","height":551}}]};
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

		STATICATTR$(TestPageUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"comp/bg.png","sizeGrid":"30,4,4,4","height":400}},{"type":"Button","props":{"y":345,"x":425,"width":150,"var":"btn_send","skin":"comp/button.png","sizeGrid":"4,4,4,4","label":"发送","height":37}},{"type":"Button","props":{"y":4,"x":563,"skin":"comp/btn_close.png","name":"close"}},{"type":"Button","props":{"y":160,"x":89,"label":"label"}},{"type":"Dialog","props":{"y":171,"x":311}},{"type":"Button","props":{"y":253,"x":67,"skin":"comp/button.png","label":"label"}},{"type":"CheckBox","props":{"y":166,"x":297,"skin":"comp/checkbox.png","label":"label"}},{"type":"Clip","props":{"y":65,"x":107,"skin":"comp/clip_selectBox.png"}},{"type":"Clip","props":{"y":108,"x":403,"skin":"comp/clip_tree_arrow.png"}},{"type":"HScrollBar","props":{"y":270,"x":313,"skin":"comp/hscroll.png"}}]};}
		]);
		return TestPageUI;
	})(View);