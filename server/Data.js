// Data.js --- This is where you apply your OCD.
//
// Copyright (C) 2018 Damon Kwok
//
// Author: damon <damon-kwok@outlook.com>
// Date: 2018-01-25
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
//Code:

const FileHelper = require("./Helper.js");

function load(logic)
{
	/*	
		logic.SceneInfo={
		method:"scene_info",
		scene:"IndustrialCity",
		path: "default"
		};

		logic.WeatherInfo = {
		method:"weather_info",
		temperature:25,
		time_of_day:950,
		// rain_type:"HeavyRain",
		// snow_type:"ModerateSnow",
		rain_type:false,
		snow_type:true,
		fog_type:"HeaveFog",

		};

		logic.TrafficInfo={
		method:"traffic_info",
		car_density:50,
		pedestrain_density:19,
		car_irregularity:29
		};

		// 0:摄像头 1:激光雷达 2:毫米波雷达
		//roll:单位degree,范围 0~360
		//pitch:单位degree,范围 -90~90
		//yaw:单位degree,范围 0~360

		logic.CarConfig = {
		method:"car_config",
		config:[
		{sid:1, type:1,x:0,y:20,z:200.0,roll:0,pitch:0,yaw:0},
		{sid:2, type:2,x:0,y:55.0,z:200.0,roll:0,pitch:0,yaw:0,
		params:
		{
		LongRangeAzimuthFieldOfView:20.0,
		MidRangeAzimuthFieldOfView:90.0,
		VerticalFieldOfView:5.0,
		MinRange:100.0,
		LongRangeMaxRange:10000.0,
		MidRangeMaxRange:5000.0,
		MinRangeRate:-10000.0,
		MaxRangeRate:10000.0,
		LongRangeAzimuthResolution:4.0,
		MidRangeAzimuthResolution:12.0,
		VerticalResolution:10.0,
		LongRangeRangeResolution:250.0,
		MidRangeRangeResolution:125.0,
		RangeRateResolution:50.0,
		MaxNumDetections:64,
		UseMidRange:true
		}
		},
		{sid:3, type:0,x:188.0,y:0.0,z:110.0,roll:0,pitch:0,yaw:0,
		params:
		{
		fov:45,
		ResolutionWidth:1024,
		ResolutionHeight:768
		}
		},
		{sid:4, type:0,x:193.0,y:-55.0,z:103.0,roll:0,pitch:0,yaw:0, 
		params:
		{
		fov:60,ResolutionWidth:1920,ResolutionHeight:1024
		}
		},
		{sid:5, type:0,x:188.0,y:55.0,z:103.0,roll:0,pitch:0,yaw:0,
		params:
		{
		fov:90,ResolutionWidth:2560,ResolutionHeight:1440
		}
		}
		]
		};

		logic.CaseList = {
		method:"case_list",
		list:[
		]
		};

		FileHelper.saveJSONToFile("config/Sceneinfo", logic.SceneInfo);
		FileHelper.saveJSONToFile("config/WeatherInfo", logic.WeatherInfo);
		FileHelper.saveJSONToFile("config/TrafficInfo", logic.TrafficInfo);
		FileHelper.saveJSONToFile("config/CarConfig", logic.CarConfig);
		FileHelper.saveJSONToFile("config/CaseList", logic.CaseList);
	*/


	logic.CarState = {method:"car_state",
					  speed:18.093740463256836,accer:-0.34551405906677246,steer:-1};
	
	logic.CaseInfo=	{
		method:"case_info",
		scene: "IndustrialCity",
		name: "case2",
		content: "content of a json file",
		scene_config: "content of a json file"
	};

	// 0:PointCloud 1:Image 2:IMU 3:GPS
	logic.RosInfo = {
		method:"ros_info",
		start:false,
		config:[
			{sid:1, type:0, name:"raw_point", running:true},
			{sid:2, type:1, name:"raw_image", running:true},
			{sid:3, type:2, name:"raw_gps", running:true},
			{sid:4, type:3, name:"raw_imu", running:true},
			{sid:4, type:4, name:"raw_drive", running:true}
		]
	};
	
	logic.SumoInfo = {
		method: "sudomo_info",
		status:0 //0:stop 1:stop 2:pause
	}

	//load
	logic.SceneInfo=FileHelper.loadJSONFromFile("config/SceneInfo");
	logic.WeatherInfo = FileHelper.loadJSONFromFile("config/WeatherInfo");
	logic.TrafficInfo= FileHelper.loadJSONFromFile("config/TrafficInfo");
	logic.CarConfig = FileHelper.loadJSONFromFile("config/CarConfig");
	logic.CaseList = FileHelper.loadJSONFromFile("config/CaseList");

}

exports.load = load;
