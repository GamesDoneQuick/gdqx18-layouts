'use strict';
exports.__esModule = true;
// Packages
var equals = require("deep-equal");
var clone = require("clone");
// Ours
var nodecgApiContext = require("./util/nodecg-api-context");
var obs = require("./obs");
var nodecg = nodecgApiContext.get();
// To edit the list of checklist items, edit the "default" value of schemas/checklist.json.
// Any changes you make will be fully picked up and integrated next time NodeCG starts.
var checklist = nodecg.Replicant('checklist');
var checklistDefault = checklist.schema["default"];
// Reconcile differences between persisted value and what we expect the checklistDefault to be.
var persistedValue = checklist.value;
if (!equals(persistedValue, checklistDefault)) {
    var mergedChecklist = clone(checklistDefault);
    var _loop_1 = function (category) {
        if (!{}.hasOwnProperty.call(checklistDefault, category)) {
            return "continue";
        }
        var results = checklistDefault[category].map(function (task) {
            var persistedGroup = persistedValue[category];
            if (persistedGroup) {
                var persistedTask = persistedGroup.find(function (_a) {
                    var name = _a.name;
                    return name === task.name;
                });
                if (persistedTask) {
                    return persistedTask;
                }
            }
            return task;
        });
        mergedChecklist[category] = results;
    };
    for (var category in checklistDefault) {
        _loop_1(category);
    }
    checklist.value = mergedChecklist;
}
var initializedRecordingTask = false;
var checklistComplete = nodecg.Replicant('checklistComplete');
checklist.on('change', function (newVal, oldVal) {
    var foundIncompleteTask = false;
    Object.keys(newVal).forEach(function (category) {
        if (!foundIncompleteTask) {
            foundIncompleteTask = newVal[category].some(function (task) { return !task.complete; });
        }
    });
    checklistComplete.value = !foundIncompleteTask;
    // Recording Cycling
    if (!initializedRecordingTask) {
        initializedRecordingTask = true;
        return;
    }
    if (!newVal.special) {
        return;
    }
    var newCycleRecordingsTask = newVal.special.find(function (_a) {
        var name = _a.name;
        return name === 'Cycle Recordings';
    });
    if (!newCycleRecordingsTask) {
        return;
    }
    if (!newCycleRecordingsTask.complete) {
        return;
    }
    if (!oldVal || !oldVal.special) {
        return cycleRecordings();
    }
    var oldCycleRecordingsTask = oldVal.special.find(function (_a) {
        var name = _a.name;
        return name === 'Cycle Recordings';
    });
    if (!oldCycleRecordingsTask || !oldCycleRecordingsTask.complete) {
        return cycleRecordings();
    }
});
function cycleRecordings() {
    if (obs.compositingOBSConnected()) {
        obs.cycleRecordings()["catch"](function (error) {
            nodecg.log.error('Failed to cycle recordings:', error);
        });
    }
}
function reset() {
    for (var category in checklist.value) { // tslint:disable-line:no-for-in
        if (!{}.hasOwnProperty.call(checklist.value, category)) {
            continue;
        }
        checklist.value[category].forEach(function (task) {
            task.complete = false;
        });
    }
    if (obs.compositingOBSConnected()) {
        obs.resetCropping();
    }
}
exports.reset = reset;
