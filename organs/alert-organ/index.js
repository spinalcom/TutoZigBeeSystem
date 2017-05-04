var spinalCore = require('spinalcore');

var path = require('path');

var fs = require('fs');
var vm = require('vm');

vm.runInThisContext(fs.readFileSync(path.join(__dirname, 'js-libraries') + "/lib_is-sim/models.js"));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, 'js-libraries') + "/lib_tuto_sb/building.js"));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, 'js-libraries') + "/lib_zigbee/zigbee.js"));

var conn = spinalCore.connect("http://1657:4YCSeYUzsDG8XSrjqXgkDPrdmJ3fQqHs@127.0.0.1:8888/__building__");

var AlertProcess = require('./alert-process');

spinalCore.load(conn, "Network", function (network) {
  spinalCore.load(conn, "Numa", function (numa) {

    var alertProcess = new AlertProcess(numa, network);

  });

});
