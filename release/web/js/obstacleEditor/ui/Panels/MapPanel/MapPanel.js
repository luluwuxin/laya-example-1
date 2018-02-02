class ObstacleUIOnMap{constructor(t,i,e){DependencesHelper.setDependencesByParent(this,t,"mapPanelScript"),this._container=e;var n=function(){var t=new laya.ui.Box;return t.left=0,t.right=0,t.top=0,t.bottom=0,t.mouseThrough=!0,t};this.obstacleContainer=n(),this._container.addChild(this.obstacleContainer),this.routePointLinkLineContainer=n(),this.obstacleContainer.addChild(this.routePointLinkLineContainer),this.routePointContainer=n(),this.obstacleContainer.addChild(this.routePointContainer),this.routePointViews=[],this.routePointLinkLineViews=[],this.highlight(!1)}destroy(){this.obstacleContainer.destroy(),this.obstacleContainer=null}setSelected(t){this.highlight(t),t&&this._container.setChildIndex(this.obstacleContainer,this._container.numChildren-1)}highlight(t){this.obstacleContainer.alpha=t?1:.3}addRoutePoint(t){var i=t.index,e=new RoutePointViewScript(this,t);this.routePointContainer.addChild(e),this.routePointViews.splice(i,0,e),e.update();var n=new RoutePointLinkLineView(this,t,this.routePointLinkLineContainer);this.routePointLinkLineViews.splice(i,0,n)}removeRoutePoint(t){var i=t.index;this.routePointViews[i].destroy(),this.routePointViews.splice(i,1),this.routePointLinkLineViews[i].destroy(),this.routePointLinkLineViews.splice(i,1)}}class MainCarUIOnMap extends ObstacleUIOnMap{constructor(t,i,e){super(t,i,e);var n=new RoutePointViewScript(this,i.startPoint);this.routePointContainer.addChild(n)}addRoutePoint(t){var i=t.index,e=new RoutePointViewScript(this,t);this.routePointContainer.addChild(e),this.routePointViews.splice(i,0,e),e.update();var n=new MainCarRoutePointLinkLineView(this,t,this.routePointLinkLineContainer);this.routePointLinkLineViews.splice(i,0,n)}}function MapPanelScript(t){function i(t,i,e){this._addSceneObject(i)}function e(t,i,e){this._removeSceneObject(i)}function n(t,i){this.addRoutePoint(i)}function a(t,i){this.removeRoutePoint(i)}function s(t,i,e){this.selectSceneObject(i,e)}function o(){this._refreshMiniMapFrame()}function h(t){this.miniMapButton.off(Event.MOUSE_MOVE,this,r)}function r(t){this._miniMapFollowMouse(t)}function c(t){this.miniMapButton.on(Event.MOUSE_MOVE,this,r),this._miniMapFollowMouse(t)}function u(){this._isMainContainerClick=!0,this.mainContainer.on(Event.MOUSE_MOVE,this,p),this.mainContainer.on(Event.MOUSE_OUT,this,p)}function l(){this._isMainContainerClick&&function(){var t=this._user.getSelectedSceneObject();if(null==t)return;var i=this._mapData.uiToMapPosition({x:this.mapImage.mouseX,y:this.mapImage.mouseY}),e=null,n=new Pose;n.vec3.x=i.x,n.vec3.y=i.y;var a=this._user.getSelectedRoutePoint();if(null!=a&&a.pointType==ObjectPointType.MAIN_CAR_START_POINT)t.startPoint.setValue("x",i.x,"y",i.y,"z",this._mapData.mapInfo.objectZ);else{if(0==t.getRoutePointCount())e=t.createRoutePoint(this._mapData,n),t.addRoutePoint(e);else if(null==a){var s=t.getRoutePoint(t.getRoutePointCount()-1);(e=s.clone()).x=n.vec3.x,e.y=n.vec3.y,t.addRoutePoint(e)}else{var o=a.index;(e=a.clone()).x=n.vec3.x,e.y=n.vec3.y,t.addRoutePoint(e,o+1)}this._user.selectRoutePoint(e)}}.call(this)}function p(){this._isMainContainerClick=!1,this.mainContainer.off(Event.MOUSE_MOVE,this,p),this.mainContainer.off(Event.MOUSE_OUT,this,p)}this._miniMapFollowMouse=function(t){var i=this.miniMapBox.width/this._mapData.mapInfo.width,e=this.miniMapButton.mouseX/i,n=this.miniMapButton.mouseY/i;this.putPointToMapCenter(e,n)},this.initEvent=function(){this._obstacleManager.registerEvent(ObstacleManagerEvent.ADDED,this,i),this._obstacleManager.registerEvent(ObstacleManagerEvent.REMOVED,this,e),this._user.registerEvent(UserEvent.SCENE_OBJECT_SELECTED,this,s),this.mainContainer.vScrollBar.on(Event.CHANGE,this,o),this.mainContainer.hScrollBar.on(Event.CHANGE,this,o),this.miniMapButton.on(Event.MOUSE_DOWN,this,c),this.miniMapButton.on(Event.MOUSE_UP,this,h),this.miniMapButton.on(Event.MOUSE_OUT,this,h),this.mainContainer.on(Event.MOUSE_DOWN,this,u),this.mainContainer.on(Event.MOUSE_UP,this,l)},this._refreshMiniMapFrame=function(){var t=this.mainContainer.hScrollBar.value,i=this.mainContainer.vScrollBar.value,e=this.miniMapBox.width/this._mapData.mapInfo.width;this.actualFrame.width=this.mainContainer.width*e,this.actualFrame.height=this.mainContainer.height*e,this.actualFrame.x=t*e,this.actualFrame.y=i*e},this._initMiniMap=function(){var t=300,i=200,e=this._mapData.mapInfo;t/i<e.width/e.height?i=e.height/e.width*t:t=e.width/e.height*i,this.miniMapBox.width=t,this.miniMapBox.height=i,this.miniMapImage.skin=this._mapData.getMapImagePath(),this.miniMapImageLight.skin=this._mapData.getMapImagePath(),this._refreshMiniMapFrame()},this.getViewCenter=function(){var t=this.mainContainer.hScrollBar.value,i=this.mainContainer.vScrollBar.value;return{x:t+=this.mainContainer.width/2,y:i+=this.mainContainer.height/2}},this.putPointToMapCenter=function(t,i){t=Math.max(0,t-this.mainContainer.width/2),i=Math.max(0,i-this.mainContainer.height/2),t=Math.min(t,this._mapData.mapInfo.width-this.mainContainer.width),i=Math.min(i,this._mapData.mapInfo.height-this.mainContainer.height),this.mainContainer.scrollTo(t,i)},this.putRoutePointToMapCenter=function(t){var i=this._mapData.mapToUIPosition(t);this.putPointToMapCenter(i.x,i.y)},this._addSceneObject=function(t){var i=null;i=t.sceneObjectType==SceneObjectType.OBSTACLE?new ObstacleUIOnMap(this,t,this.mapImage):new MainCarUIOnMap(this,t,this.mapImage),this._sceneObjectRouteUIs[t.getUniqueID()]=i,t.registerEvent(ObstacleEvent.ROUTE_POINT_ADDED,this,n),t.registerEvent(ObstacleEvent.ROUTE_POINT_REMOVED,this,a)},this._removeSceneObject=function(t){this._sceneObjectRouteUIs[t.getUniqueID()].destroy(),delete this._sceneObjectRouteUIs[t.getUniqueID()]},this.addRoutePoint=function(t){var i=t.getOwner();this._sceneObjectRouteUIs[i.getUniqueID()].addRoutePoint(t)},this.removeRoutePoint=function(t){var i=t.getOwner();this._sceneObjectRouteUIs[i.getUniqueID()].removeRoutePoint(t)},this.selectSceneObject=function(t,i){null!=i&&i.getUniqueID()in this._sceneObjectRouteUIs&&this._sceneObjectRouteUIs[i.getUniqueID()].setSelected(!1),null!=t&&t.getUniqueID()in this._sceneObjectRouteUIs&&this._sceneObjectRouteUIs[t.getUniqueID()].setSelected(!0)},this.setMapData=function(t){logInfo("Set map data. map image path = [{0}]".format(t.getMapImagePath())),this._mapData=t,this.mapImage.skin=this._mapData.getMapImagePath(),this.mapImage.height=this._mapData.mapInfo.height,this.mapImage.width=this._mapData.mapInfo.width,this.initObstacleInfo(),this._initMiniMap()},this.initObstacleInfo=function(){for(var t=this._obstacleManager.getObstacles(),i=0;i<t.length;i++){this._addSceneObject(t[i]);for(var e=t[i].getRoutePoints(),n=0;n<e.length;n++)this.addRoutePoint(e[n])}},MapPanelScript.super(this),DependencesHelper.setDependences(this,t),this._sceneObjectRouteUIs={},this._loadedDataManager.registerEvent(LoadedDataManagerEvent.MAP_DATA_LOADED,this,function(t,i){this.setMapData(i),this.initEvent()}),ObjectHelper.swallowScrollMouseDown(this.mainContainer.hScrollBar),ObjectHelper.swallowScrollMouseDown(this.mainContainer.vScrollBar),this._addSceneObject(this._obstacleManager.getMainCar())}Laya.class(MapPanelScript,"MapPanelScript",MapPanelUI);