// Helper.js --- This is where you apply your OCD.
//
// Copyright (C) 2018 Damon Kwok
//
// Author: damon <damon-kwok@outlook.com>
// Date: 2018-01-17
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
var fs = require('fs');

function loadStringFromFile(filename)
{
	return fs.readFileSync(filename, 'utf8');
}

function saveStringToFile(filename, str)
{
	if(msg instanceof Object)
    {
        str = JSON.stringify(str);
    }
	fs.writeFileSync(filename, str);
}
function loadJSONFromFile(filename)
{
	var str = fs.readFileSync(filename, 'utf8');
	return JSON.parse(str);
}

function saveJSONToFile(filename, obj)
{
	fs.writeFileSync(filename, JSON.stringify(obj));
}

exports.loadStringFromFile = loadStringFromFile;
exports.saveStringToFile = saveStringToFile;
exports.loadJSONFromFile = loadJSONFromFile;
exports.saveJSONToFile = saveJSONToFile;
