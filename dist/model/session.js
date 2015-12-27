'use strict';
class Session {
    constructor(id) {
        this.id = id;
    }
}
exports.Session = Session;
(function (SliceStatus) {
    SliceStatus[SliceStatus["UnknownStatus"] = 0] = "UnknownStatus";
    SliceStatus[SliceStatus["EquipmentOff"] = 1] = "EquipmentOff";
    SliceStatus[SliceStatus["EquipmentLeaking"] = 2] = "EquipmentLeaking";
    SliceStatus[SliceStatus["EquipmentOn"] = 3] = "EquipmentOn";
})(exports.SliceStatus || (exports.SliceStatus = {}));
var SliceStatus = exports.SliceStatus;
//# sourceMappingURL=session.js.map