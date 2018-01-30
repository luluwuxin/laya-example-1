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

// function FileHelper
// {
function loadStringFromFile(filename)
{
	// if(fs.statSync(filename).isFile())
	return fs.readFileSync(filename, 'utf-8');
	// return "";
}

function saveStringToFile(str, filename)
{
	fs.open(filename,"w",0644,function(e,fd){
		if(e) throw e;
		fs.write(fd,str,function(e){
			if(e) throw e;
			fs.closeSync(fd);
		})
	});
}
// }
exports.loadStringFromFile = loadStringFromFile;
exports.saveStringToFile = saveStringToFile;
