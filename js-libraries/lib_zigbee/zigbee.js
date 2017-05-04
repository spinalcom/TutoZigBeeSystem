// Generated by CoffeeScript 1.10.0
var ZigbeeClusterModel,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ZigbeeClusterModel = (function(superClass) {
  extend(ZigbeeClusterModel, superClass);

  function ZigbeeClusterModel(params) {
    if (params == null) {
      params = {};
    }
    ZigbeeClusterModel.__super__.constructor.call(this);
    this.commandSender = null;
    this.add_attr({
      id: params.id != null ? params.id : '0000',
      name: params.name != null ? params.name(params.name) : "Unknown Zigbee Cluster"
    });
  }

  ZigbeeClusterModel.parseTime = function(timeInt) {
    var timerBytes;
    timerBytes = timeInt.toString(16).replace(/((.){1,2})/g, '0x$1').split(/(0x..?)/).filter(Boolean).reverse();
    if (timerBytes.length === 1) {
      timerBytes.push('0x0');
    } else if (timerBytes.length > 2) {
      timerBytes = timerBytes.slice(0, 2);
    }
    return timerBytes;
  };

  return ZigbeeClusterModel;

})(Model);
// Generated by CoffeeScript 1.10.0
var ZigbeeNetwork,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ZigbeeNetwork = (function(superClass) {
  extend(ZigbeeNetwork, superClass);

  function ZigbeeNetwork(name) {
    var relationshipMapping, self;
    if (name == null) {
      name = "Network";
    }
    ZigbeeNetwork.__super__.constructor.call(this);
    this._name.set(name);
    self = this;
    relationshipMapping = {};
    this.add_attr({
      discovery_active: false
    });
    this.addThing = function(thing, zapi) {
      var zigbeeThing;
      if ((thing.parent != null) && thing.type === 2) {
        if (relationshipMapping[thing.parent] != null) {
          return relationshipMapping[thing.parent].reference.addThing(thing, zapi);
        } else {
          zigbeeThing = new ZigbeeThing({
            zigbeeInfo: thing,
            communication: zapi
          });
          return relationshipMapping[thing.ieeeAddress] = {
            parent: thing.parent,
            reference: zigbeeThing
          };
        }
      } else {
        zigbeeThing = self.getThing(thing.ieeeAddress);
        if (zigbeeThing === null) {
          zigbeeThing = new ZigbeeThing({
            zigbeeInfo: thing,
            communication: zapi
          });
          self.add_child(zigbeeThing);
        } else {
          zigbeeThing.startInteraction({
            communication: zapi
          });
        }
        return relationshipMapping[thing.ieeeAddress] = {
          siblings: thing.siblings,
          reference: zigbeeThing
        };
      }
    };
    this.discoveryEnded = function() {
      this.removeAllListeners('thing_discovered');
      this.removeAllListeners('discovery_ended');
      this.removeAllListeners('discovery_started');
      return self.discovery_active.set(false);
    };
    this.discoveryStarted = function() {
      var endDevice, j, len, ref, results, thing;
      ref = self._children;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        thing = ref[j];
        thing.reachable.set(false);
        results.push((function() {
          var k, len1, ref1, results1;
          ref1 = thing._children;
          results1 = [];
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            endDevice = ref1[k];
            results1.push(endDevice.reachable.set(false));
          }
          return results1;
        })());
      }
      return results;
    };
  }

  ZigbeeNetwork.prototype.accept_child = function(ch) {
    return ch instanceof ZigbeeThing;
  };

  ZigbeeNetwork.prototype.getThing = function(ieeeAddress) {
    var i;
    i = this._children.length;
    while (i--) {
      if (this._children[i].id.ieeeAddress.get() === ieeeAddress) {
        return this._children[i];
      }
    }
    return null;
  };

  ZigbeeNetwork.prototype.display_suppl_context_actions = function(context_action) {
    return context_action.push(new TreeAppModule_ZigBeeNetwork);
  };

  return ZigbeeNetwork;

})(TreeItem);
// Generated by CoffeeScript 1.10.0
var ZigbeeDevice,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ZigbeeDevice = (function(superClass) {
  extend(ZigbeeDevice, superClass);

  function ZigbeeDevice(params) {
    if (params == null) {
      params = {};
    }
    ZigbeeDevice.__super__.constructor.call(this);
    this.add_attr({
      id: params.id != null ? params.id : '0000',
      name: params.name != null ? params.name : "Unknown Zigbee Device",
      endpoint: params.endpoint != null ? params.endpoint : '00',
      clusters: []
    });
  }

  return ZigbeeDevice;

})(Model);
// Generated by CoffeeScript 1.10.0
var ZigbeeThing,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ZigbeeThing = (function(superClass) {
  extend(ZigbeeThing, superClass);

  function ZigbeeThing(params) {
    var child, cluster, clusterInstance, destinationInfo, endpoint, j, k, len, len1, ref, ref1, zigbeeDevice;
    if (params == null) {
      params = {};
    }
    ZigbeeThing.__super__.constructor.call(this);
    if (params.name != null) {
      this._name.set(params.name);
    } else {
      this._name.set("Unknown Thing");
    }
    this.add_attr({
      name: this._name,
      id: {
        ieeeAddress: "0",
        networkAddress: "0"
      },
      type: 3,
      devices: [],
      siblings: [],
      reachable: true
    });
    if ((params.zigbeeInfo != null) && (params.communication != null)) {
      this.id.ieeeAddress.set(params.zigbeeInfo.ieeeAddress);
      this.id.networkAddress.set(params.zigbeeInfo.networkAddress);
      destinationInfo = {
        ieeeAddress: params.zigbeeInfo.ieeeAddress,
        networkAddress: params.zigbeeInfo.networkAddress
      };
      ref = params.zigbeeInfo.endpoints;
      for (j = 0, len = ref.length; j < len; j++) {
        endpoint = ref[j];
        zigbeeDevice = new ZigbeeDevice({
          id: endpoint.deviceId,
          name: deviceMapping[endpoint.deviceId],
          endpoint: endpoint.value
        });
        if (this.name.get() === 'Unknown Thing') {
          this.name.set(deviceMapping[endpoint.deviceId]);
        }
        destinationInfo.endpoint = endpoint.value;
        ref1 = endpoint.clusterList;
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          cluster = ref1[k];
          if (clusterMapping.hasOwnProperty(cluster)) {
            clusterInstance = new clusterMapping[cluster]({
              id: cluster
            });
            child = {};
            child[clusterInstance.name.get().replace(/ /g, '')] = clusterInstance;
            if (typeof clusterInstance.reportProcess !== 'undefined') {
              clusterInstance.reportProcess = new ReportProcess(destinationInfo, clusterInstance, params.communication);
            }
            if (typeof clusterInstance.startProcess !== 'undefined') {
              clusterInstance.startProcess = new StartProcess(destinationInfo, clusterInstance, params.communication);
            }
            zigbeeDevice.clusters.push(child);
          }
        }
        child = {};
        child[deviceMapping[endpoint.deviceId].replace(/ /g, '')] = zigbeeDevice;
        this.devices.push(child);
      }
    }
  }

  ZigbeeThing.prototype.addThing = function(thing, zapi) {
    var zigbeeThing;
    zigbeeThing = this.getThing(thing.ieeeAddress);
    if (zigbeeThing === null) {
      zigbeeThing = new ZigbeeThing({
        zigbeeInfo: thing,
        communication: zapi
      });
      return this.add_child(zigbeeThing);
    } else {
      return zigbeeThing.startInteraction({
        communication: zapi
      });
    }
  };

  ZigbeeThing.prototype.accept_child = function(ch) {
    return ch instanceof ZigbeeThing;
  };

  ZigbeeThing.prototype.getThing = function(ieeeAddress) {
    var i;
    i = this._children.length;
    while (i--) {
      if (this._children[i].id.ieeeAddress.get() === ieeeAddress) {
        return this._children[i];
      }
    }
    return null;
  };

  ZigbeeThing.prototype.startInteraction = function(params) {
    var cluster, clusterItem, destinationInfo, device, deviceItem, j, len, ref, results;
    if (params == null) {
      params = {};
    }
    if (params.communication != null) {
      destinationInfo = {
        ieeeAddress: this.id.ieeeAddress.get(),
        networkAddress: this.id.networkAddress.get()
      };
      ref = this.devices;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        deviceItem = ref[j];
        device = deviceItem[deviceItem._attribute_names[0]];
        destinationInfo.endpoint = device.endpoint.get();
        results.push((function() {
          var k, len1, ref1, results1;
          ref1 = device.clusters;
          results1 = [];
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            clusterItem = ref1[k];
            cluster = clusterItem[clusterItem._attribute_names[0]];
            if (typeof cluster.reportProcess !== 'undefined') {
              cluster.reportProcess = new ReportProcess(destinationInfo, cluster, params.communication);
            }
            if (typeof cluster.startProcess !== 'undefined') {
              cluster.startProcess = new StartProcess(destinationInfo, cluster, params.communication);
            }
            results1.push(this.reachable.set(true));
          }
          return results1;
        }).call(this));
      }
      return results;
    }
  };

  return ZigbeeThing;

})(TreeItem);
// Generated by CoffeeScript 1.10.0
var IlluminanceMeasurement,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

IlluminanceMeasurement = (function(superClass) {
  extend(IlluminanceMeasurement, superClass);

  function IlluminanceMeasurement(params) {
    if (params == null) {
      params = {};
    }
    IlluminanceMeasurement.__super__.constructor.call(this, params);
    this.reportProcess = null;
    this.add_attr({
      value: [],
      reportPeriod: 0
    });
    this.name.set('Illuminance Measurement');
  }

  IlluminanceMeasurement.prototype.reportFrame = function() {
    var frame;
    frame = {
      clusterId: '0400',
      profileId: '0104',
      data: ['0x00', '0x01', '0x00', '0x00', '0x00']
    };
    return frame;
  };

  return IlluminanceMeasurement;

})(ZigbeeClusterModel);
// Generated by CoffeeScript 1.10.0
var IASWarningDevice,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

IASWarningDevice = (function(superClass) {
  extend(IASWarningDevice, superClass);

  function IASWarningDevice(params) {
    if (params == null) {
      params = {};
    }
    IASWarningDevice.__super__.constructor.call(this, params);
    this.startProcess = null;
    this.add_attr({
      status: new ConstrainedVal(0, {
        min: 0,
        max: 1
      }),
      timer: 0
    });
    this.name.set('IAS Warning Device');
  }

  IASWarningDevice.prototype.startFrame = function(options) {
    var alarmTypeBytes, frame, headerBytes, timerBytes;
    if (options == null) {
      options = {};
    }
    timerBytes = options.timer != null ? options.timer.toString(16).replace(/((.){1,2})/g, '0x$1').split(/(0x..?)/).filter(Boolean).reverse() : ['0x01', '0x00'];
    if (timerBytes.length === 1) {
      timerBytes.push('0x0');
    } else if (timerBytes.length > 2) {
      timerBytes = timerBytes.slice(0, 2);
    }
    headerBytes = ['0x01', '0x01', '0x00'];
    alarmTypeBytes = ['0x11'];
    frame = {
      clusterId: '0502',
      profileId: '0104',
      data: headerBytes.concat(alarmTypeBytes, timerBytes)
    };
    return frame;
  };

  return IASWarningDevice;

})(ZigbeeClusterModel);
// Generated by CoffeeScript 1.10.0
var StartProcess,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

StartProcess = (function(superClass) {
  extend(StartProcess, superClass);

  function StartProcess(destination, model, zapi) {
    this.destination = destination;
    this.model = model;
    this.zapi = zapi;
    StartProcess.__super__.constructor.call(this, this.model);
  }

  StartProcess.prototype.onchange = function() {
    if (this.model.status.has_been_modified()) {
      if (this.model.status.get() === 1) {
        return this.start();
      }
    }
  };

  StartProcess.prototype.start = function() {
    var frameOptions, generalOptions;
    frameOptions = {
      timer: this.model.timer.get()
    };
    generalOptions = {
      ignoreResponse: true
    };
    return this.zapi.sendCommand(this.destination, this.model.startFrame(frameOptions), generalOptions).then((function(_this) {
      return function(response) {
        console.log('Alarm fired');
        return setTimeout(function() {
          return _this.model.status.set(0);
        }, _this.model.timer.get() * 1000);
      };
    })(this));
  };

  return StartProcess;

})(Process);
// Generated by CoffeeScript 1.10.0
var ReportProcess,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ReportProcess = (function(superClass) {
  extend(ReportProcess, superClass);

  function ReportProcess(destination, model, zapi) {
    this.destination = destination;
    this.model = model;
    this.zapi = zapi;
    ReportProcess.__super__.constructor.call(this, this.model);
    this.reportId = 0;
  }

  ReportProcess.prototype.onchange = function() {
    var reportPeriod;
    if (this.model.reportPeriod.has_been_modified()) {
      if (isNaN(this.model.reportPeriod.get())) {
        this.model.reportPeriod.set(0);
      }
      clearInterval(this.reportId);
      reportPeriod = this.model.reportPeriod.get();
      if (reportPeriod > 0) {
        return this.reportId = setInterval((function(_this) {
          return function() {
            return _this.report();
          };
        })(this), reportPeriod * 1000);
      }
    }
  };

  ReportProcess.prototype.report = function() {
    return this.zapi.sendCommand(this.destination, this.model.reportFrame()).then((function(_this) {
      return function(response) {
        _this.model.value.unshift(response.value);
        if (_this.model.value.length >= 10) {
          return _this.model.value.pop();
        }
      };
    })(this));
  };

  return ReportProcess;

})(Process);
// Generated by CoffeeScript 1.10.0
var TreeAppApplication_ZigBeeNetwork,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

TreeAppApplication_ZigBeeNetwork = (function(superClass) {
  extend(TreeAppApplication_ZigBeeNetwork, superClass);

  function TreeAppApplication_ZigBeeNetwork() {
    var _ina;
    TreeAppApplication_ZigBeeNetwork.__super__.constructor.call(this);
    this.name = 'ZigBee Network';
    this.powered_with = 'Spinalcom';
    _ina = (function(_this) {
      return function(app) {
        var ref, ref1;
        return app.data.focus.get() !== ((ref = app.selected_canvas_inst()) != null ? (ref1 = ref[0]) != null ? ref1.cm.view_id : void 0 : void 0);
      };
    })(this);
    this.actions.push({
      ico: "data:image/png;base64,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",
      siz: 1,
      ina: _ina,
      fun: (function(_this) {
        return function(evt, app) {
          var ConnectedDevices;
          app.undo_manager.snapshot();
          return ConnectedDevices = _this.add_item_depending_selected_tree(app.data, ZigbeeNetwork);
        };
      })(this)
    });
  }

  return TreeAppApplication_ZigBeeNetwork;

})(TreeAppApplication);
// Generated by CoffeeScript 1.10.0
var TreeAppModule_ZigBeeNetwork,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

TreeAppModule_ZigBeeNetwork = (function(superClass) {
  extend(TreeAppModule_ZigBeeNetwork, superClass);

  function TreeAppModule_ZigBeeNetwork() {
    var _ina;
    TreeAppModule_ZigBeeNetwork.__super__.constructor.call(this);
    this.name = 'ZigBee Network';
    _ina = (function(_this) {
      return function(app) {
        var ref, ref1;
        return app.data.focus.get() !== ((ref = app.selected_canvas_inst()) != null ? (ref1 = ref[0]) != null ? ref1.cm.view_id : void 0 : void 0);
      };
    })(this);
    this.actions.push({
      txt: "Save ZigBee Network",
      key: [""],
      ico: "data:image/png;base64,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",
      loc: true,
      fun: (function(_this) {
        return function(evt, app) {
          var dir_save, fs, i, item, items, len, name_save, path_item, results;
          items = app.data.selected_tree_items;
          results = [];
          for (i = 0, len = items.length; i < len; i++) {
            path_item = items[i];
            item = path_item[path_item.length - 1];
            console.log("saving : ", item);
            alert("Network saved on the Hub!");
            if ((typeof FileSystem !== "undefined" && FileSystem !== null) && (FileSystem.get_inst() != null)) {
              fs = FileSystem.get_inst();
              dir_save = "/__building__";
              name_save = prompt("Enter the name of your building:", item._name.get());
              results.push(fs.load_or_make_dir(dir_save, function(d, err) {
                var building_file;
                building_file = d.detect(function(x) {
                  return x.name.get() === name_save;
                });
                if (building_file != null) {
                  d.remove(building_file);
                }
                return d.add_file(name_save, item, {
                  model_type: "TreeItem"
                });
              }));
            } else {
              results.push(void 0);
            }
          }
          return results;
        };
      })(this)
    });
    this.actions.push({
      txt: "Start Discovery",
      ico: "data:image/png;base64,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",
      fun: (function(_this) {
        return function(evt, app) {
          var i, item, len, path, ref, results;
          ref = app.data.selected_tree_items;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            path = ref[i];
            item = path[path.length - 1];
            if (item instanceof ZigbeeNetwork) {
              results.push(item.discovery_active.set(true));
            } else {
              results.push(void 0);
            }
          }
          return results;
        };
      })(this)
    });
  }

  return TreeAppModule_ZigBeeNetwork;

})(TreeAppModule);