
function ObstaclePanelScript(dependences)
{
    //#region event callback
    function onAddButtonClick(sender)
    {
        var obstacle = this._obstacleManager.addDefaultObstacle();
        this._user.selectObstacle(obstacle);
    }

    function onObstacleButtonClick(obstacle, sender)
    {
        this._user.selectObstacle(obstacle);
    }

    function onObstacleImageLoaded(image)
    {
        // Make it h/w ratio correctly.
        var height = image.source.sourceHeight;
        var width = image.source.sourceWidth;
        var imageHeight = 80;
        var imageWidth = 100;
        var targetHeight = 0;
        var targetWidth = 0;
        if (height / width > imageHeight / imageWidth)
        {
            targetHeight = imageHeight;
            targetWidth = width * targetHeight / height;
        }
        else
        {
            targetWidth = imageWidth;
            targetHeight = height * targetWidth / width;
        }
        image.width = targetWidth;
        image.height = targetHeight;
    }

    function onObstacleListRender(obj, index)
    {
        var obstacle = obj.dataSource.obstacle;
        var isSelected = obstacle === this._user.getSelectedObstacle();
        var obstacleImage = obj.getChildByName("obstacleImage");
        var selectedMark = obj.getChildByName("selectedMark");
        var nameLabel = obj.getChildByName("nameLabel");
        var removeButton = obj.getChildByName("removeButton");

        if (nameLabel != null)
        {
            nameLabel.text = obstacle.name;
        }
        if (selectedMark != null)
        {
            selectedMark.visible = isSelected;
        }
        if (obstacleImage != null)
        {
            obstacleImage.once(Event.LOADED, this, onObstacleImageLoaded, [obstacleImage]);
            obstacleImage.skin = getObstacleIconByType(obstacle.type);
        }
        obj.on(Event.CLICK, this, onObstacleButtonClick, [obstacle]);
        obj.on(Event.RIGHT_CLICK, this, onObstacleRemoveButtonClick, [obstacle]);
    }

    function onObstacleRemoveButtonClick(obstacle)
    {
        this._obstacleManager.removeObstacle(obstacle);
    }

    function onObstacleAdded(sender, obstacle, index)
    {
        this.addObstacle(obstacle, index);
    }

    function onObstacleRemoved(sender, obstacle, index)
    {
        this.removeObstacle(obstacle, index);
    }

    function onObstacleSelected(sender, obstacle, oriObstacle)
    {
        this.updateObstacleItem(oriObstacle);
        this.updateObstacleItem(obstacle);
    }

    function onObstacleBaseInfoChanged(sender)
    {
        this.updateObstacleItem(sender);
    }

    //#endregion event callback

    this.updateObstacleItem = function(obstacle)
    {
        var index = this._obstacleManager.getObstacleIndex(obstacle);
        if (index != -1)
        {
            this.obstacleList.changeItem(index, {obstacle: obstacle});
        }        
    }

    this.refreshObstacleList = function()
    {
        this.obstacleList.refresh();
    }

    this.init = function()
    {
        var obstacleData = this._obstacleManager.getObstacles();
        for (var i = 0; i < obstacleData.length; i++)
        {
            this.addObstacle(obstacleData[i], i, false);
        }

        this.refreshObstacleList();
    }

    this.addObstacle = function(obstacle, index, refresh = true)
    {
        if (refresh)
        {
            this.obstacleList.addItemAt({obstacle: obstacle}, index);
        }
        else
        {
            this.obstacleList.array.splice(index, 0, {obstacle: obstacle});
        }
        obstacle.registerEvent(ObjectEvent.VALUE_CHANGED, this, onObstacleBaseInfoChanged);
    }

    this.clearObstacle = function()
    {
        this.obstacleList.array = [];
        this.refreshObstacleList();
    }

    this.removeObstacle = function(obstacle, index)
    {
        this.obstacleList.deleteItem(index);
    }

    //#region constructor
    ObstaclePanelScript.super(this);

    // member variable
    DependencesHelper.setDependences(this, dependences);
    this.obstacleList.array = [];

    // event
    this.obstacleList.renderHandler = new Handler(this, onObstacleListRender);
    this.addButton.on(Event.CLICK, this, onAddButtonClick);
    this._obstacleManager.registerEvent(ObstacleManagerEvent.ADDED, this, onObstacleAdded);
    this._obstacleManager.registerEvent(ObstacleManagerEvent.REMOVED, this, onObstacleRemoved);
    this._user.registerEvent(UserEvent.OBSTACLE_SELECTED, this, onObstacleSelected);

    this.init();
    //#endregion constructor
}

Laya.class(ObstaclePanelScript, "ObstaclePanelUI", ObstaclePanelUI);