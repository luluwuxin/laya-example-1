
function Sensor(nid, type)
{
    this.nid = nid;
    this.type = 0;// 0:camera 1:lidar 2:radar 3:GPS 4:IMU
    
}

function Client(cid,socket)
{
    this.cid = cid;
    this.socket = socket;

    this.send = function(msg)
    {
        //if(msg instanceof String)
        //{
        //    msg = JSON.parse(msg);
        //}

        if(msg instanceof Object)
        {
            msg = JSON.stringify(msg);
        }

        this.socket.send(msg);
    }
}

function WebClient(cid,socket)
{
    Client.call(this, cid, socket);
}

function RosClient(cid,socket)
{
    Client.call(this, cid, socket);

    this.cameras = new Array();
    this.lidars=new Array();
    this.radars=new Array();
}

function CarClient(cid,socket)
{
    Client.call(this, cid, socket);
}

function create(type, cid, socket)
{
    switch(type)
    {
        case 0:
            return new WebClient(cid, socket);
        case 1:
            return new RosClient(cid, socket);
        case 2:
            return new CarClient(cid, socket);
        default:
            return new Client(cid, socket);
    }

}
exports.create = create;