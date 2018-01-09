var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var ChatPageUI=(function(_super){
		function ChatPageUI(){
			
		    this.input_message=null;
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

		ChatPageUI.uiView={"type":"View","props":{"width":600,"height":400},"child":[{"type":"TextInput","props":{"y":360,"x":47,"width":343,"var":"input_message","text":"hello,world","skin":"comp/textinput.png","height":22}},{"type":"Button","props":{"y":360,"x":466,"var":"btn_send","skin":"comp/button.png","label":"Send"}},{"type":"TextArea","props":{"y":16,"x":15,"width":559,"var":"ta_content","skin":"comp/textarea.png","height":322}}]};
		return ChatPageUI;
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