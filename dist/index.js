module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 3789:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core = __importStar(__webpack_require__(3926));
const appInsights = __importStar(__webpack_require__(8330));
const util_1 = __webpack_require__(1669);
function varOrUnknown(name) {
    var x = process.env[name];
    if (util_1.isUndefined(x)) {
        x = "Unknown";
    }
    return x;
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const datamap = core.getInput('datamap');
            core.debug(`Datamap is ${datamap}`);
            const datapoints = JSON.parse(datamap);
            appInsights.setup(core.getInput('aikey'));
            var client = appInsights.defaultClient;
            client.commonProperties = {
                "sha": varOrUnknown("GITHUB_SHA"),
                "repository": varOrUnknown("GITHUB_REPOSITORY"),
                "ref": varOrUnknown("GITHUB_REF")
            };
            for (var name in datapoints) {
                const val = datapoints[name];
                core.debug(`Name: ${name} Value: ${val}`);
            }
            client.trackEvent({ name: "Build", measurements: datapoints });
            client.flush({
                callback: (response) => {
                    console.debug(`response: ${response}`);
                }
            });
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();


/***/ }),

/***/ 7531:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const os = __importStar(__webpack_require__(2087));
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
function escapeData(s) {
    return toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 3926:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const command_1 = __webpack_require__(7531);
const os = __importStar(__webpack_require__(2087));
const path = __importStar(__webpack_require__(5622));
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = command_1.toCommandValue(val);
    process.env[name] = convertedVal;
    command_1.issueCommand('set-env', { name }, convertedVal);
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    command_1.issueCommand('add-path', {}, inputPath);
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 8329:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var CorrelationContextManager_1 = __webpack_require__(2740);
var events_1 = __webpack_require__(8614);
/**
 * Type of span. Can be used to specify additional relationships between spans
 * in addition to a parent/child relationship.
 */
var SpanKind;
(function (SpanKind) {
    /** Default value. Indicates that the span is used internally. */
    SpanKind[SpanKind["INTERNAL"] = 0] = "INTERNAL";
    /**
     * Indicates that the span covers server-side handling of an RPC or other
     * remote request.
     */
    SpanKind[SpanKind["SERVER"] = 1] = "SERVER";
    /**
     * Indicates that the span covers the client-side wrapper around an RPC or
     * other remote request.
     */
    SpanKind[SpanKind["CLIENT"] = 2] = "CLIENT";
    /**
     * Indicates that the span describes producer sending a message to a
     * broker. Unlike client and server, there is no direct critical path latency
     * relationship between producer and consumer spans.
     */
    SpanKind[SpanKind["PRODUCER"] = 3] = "PRODUCER";
    /**
     * Indicates that the span describes consumer receiving a message from a
     * broker. Unlike client and server, there is no direct critical path latency
     * relationship between producer and consumer spans.
     */
    SpanKind[SpanKind["CONSUMER"] = 4] = "CONSUMER";
})(SpanKind = exports.SpanKind || (exports.SpanKind = {}));
var OpenTelemetryScopeManagerWrapper = (function () {
    function OpenTelemetryScopeManagerWrapper() {
    }
    OpenTelemetryScopeManagerWrapper.prototype.active = function () {
        var context = CorrelationContextManager_1.CorrelationContextManager.getCurrentContext();
        return __assign({}, context, { getValue: function () { return context; }, setValue: function () { } });
    };
    OpenTelemetryScopeManagerWrapper.prototype.with = function (span, fn) {
        var parentSpanId = span.parentSpanId;
        var name = span.name;
        var correlationContext = OpenTelemetryScopeManagerWrapper._spanToContext(span, parentSpanId, name);
        return CorrelationContextManager_1.CorrelationContextManager.runWithContext(correlationContext, fn)();
    };
    OpenTelemetryScopeManagerWrapper.prototype.bind = function (target) {
        if (typeof target === "function") {
            return CorrelationContextManager_1.CorrelationContextManager.wrapCallback(target);
        }
        else if (target instanceof events_1.EventEmitter) {
            CorrelationContextManager_1.CorrelationContextManager.wrapEmitter(target);
        }
        return target;
    };
    OpenTelemetryScopeManagerWrapper.prototype.enable = function () {
        CorrelationContextManager_1.CorrelationContextManager.enable();
        return this;
    };
    OpenTelemetryScopeManagerWrapper.prototype.disable = function () {
        CorrelationContextManager_1.CorrelationContextManager.disable();
        return this;
    };
    OpenTelemetryScopeManagerWrapper._spanToContext = function (span, parentSpanId, name) {
        var _parentId = parentSpanId ? "|" + span.context().traceId + "." + parentSpanId + "." : span.context().traceId;
        var context = __assign({}, span.context(), { traceFlags: span.context().traceFlags.toString() });
        var correlationContext = CorrelationContextManager_1.CorrelationContextManager.spanToContextObject(context, _parentId, name);
        return correlationContext;
    };
    return OpenTelemetryScopeManagerWrapper;
}());
exports.OpenTelemetryScopeManagerWrapper = OpenTelemetryScopeManagerWrapper;
exports.AsyncScopeManager = new OpenTelemetryScopeManagerWrapper();
//# sourceMappingURL=AsyncHooksScopeManager.js.map

/***/ }),

/***/ 244:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DiagChannel = __webpack_require__(9426);
var AutoCollectConsole = (function () {
    function AutoCollectConsole(client) {
        if (!!AutoCollectConsole.INSTANCE) {
            throw new Error("Console logging adapter tracking should be configured from the applicationInsights object");
        }
        this._client = client;
        AutoCollectConsole.INSTANCE = this;
    }
    AutoCollectConsole.prototype.enable = function (isEnabled, collectConsoleLog) {
        if (DiagChannel.IsInitialized) {
            __webpack_require__(2617)/* .enable */ .wp(isEnabled && collectConsoleLog, this._client);
            __webpack_require__(5688)/* .enable */ .wp(isEnabled, this._client);
            __webpack_require__(7102)/* .enable */ .wp(isEnabled, this._client);
        }
    };
    AutoCollectConsole.prototype.isInitialized = function () {
        return this._isInitialized;
    };
    AutoCollectConsole.prototype.dispose = function () {
        AutoCollectConsole.INSTANCE = null;
        this.enable(false, false);
    };
    AutoCollectConsole._methodNames = ["debug", "info", "log", "warn", "error"];
    return AutoCollectConsole;
}());
module.exports = AutoCollectConsole;
//# sourceMappingURL=Console.js.map

/***/ }),

/***/ 2740:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var Logging = __webpack_require__(4652);
var DiagChannel = __webpack_require__(9426);
var Traceparent = __webpack_require__(2185);
var Tracestate = __webpack_require__(4906);
var HttpRequestParser = __webpack_require__(3881);
var CorrelationContextManager = (function () {
    function CorrelationContextManager() {
    }
    /**
     *  Provides the current Context.
     *  The context is the most recent one entered into for the current
     *  logical chain of execution, including across asynchronous calls.
     */
    CorrelationContextManager.getCurrentContext = function () {
        if (!CorrelationContextManager.enabled) {
            return null;
        }
        var context = CorrelationContextManager.session.get(CorrelationContextManager.CONTEXT_NAME);
        if (context === undefined) {
            return null;
        }
        return context;
    };
    /**
     *  A helper to generate objects conforming to the CorrelationContext interface
     */
    CorrelationContextManager.generateContextObject = function (operationId, parentId, operationName, correlationContextHeader, traceparent, tracestate) {
        parentId = parentId || operationId;
        if (this.enabled) {
            return {
                operation: {
                    name: operationName,
                    id: operationId,
                    parentId: parentId,
                    traceparent: traceparent,
                    tracestate: tracestate
                },
                customProperties: new CustomPropertiesImpl(correlationContextHeader)
            };
        }
        return null;
    };
    CorrelationContextManager.spanToContextObject = function (spanContext, parentId, name) {
        var traceContext = new Traceparent();
        traceContext.traceId = spanContext.traceId;
        traceContext.spanId = spanContext.spanId;
        traceContext.traceFlag = spanContext.traceFlags || Traceparent.DEFAULT_TRACE_FLAG;
        traceContext.parentId = parentId;
        return CorrelationContextManager.generateContextObject(traceContext.traceId, traceContext.parentId, name, null, traceContext);
    };
    /**
     *  Runs a function inside a given Context.
     *  All logical children of the execution path that entered this Context
     *  will receive this Context object on calls to GetCurrentContext.
     */
    CorrelationContextManager.runWithContext = function (context, fn) {
        if (CorrelationContextManager.enabled) {
            return CorrelationContextManager.session.bind(fn, (_a = {}, _a[CorrelationContextManager.CONTEXT_NAME] = context, _a))();
        }
        else {
            return fn();
        }
        var _a;
    };
    /**
     * Wrapper for cls-hooked bindEmitter method
     */
    CorrelationContextManager.wrapEmitter = function (emitter) {
        if (CorrelationContextManager.enabled) {
            CorrelationContextManager.session.bindEmitter(emitter);
        }
    };
    /**
     *  Patches a callback to restore the correct Context when getCurrentContext
     *  is run within it. This is necessary if automatic correlation fails to work
     *  with user-included libraries.
     *
     *  The supplied callback will be given the same context that was present for
     *  the call to wrapCallback.  */
    CorrelationContextManager.wrapCallback = function (fn, context) {
        if (CorrelationContextManager.enabled) {
            return CorrelationContextManager.session.bind(fn, context ? (_a = {},
                _a[CorrelationContextManager.CONTEXT_NAME] = context,
                _a) : undefined);
        }
        return fn;
        var _a;
    };
    /**
     *  Enables the CorrelationContextManager.
     */
    CorrelationContextManager.enable = function (forceClsHooked) {
        if (this.enabled) {
            return;
        }
        if (!this.isNodeVersionCompatible()) {
            this.enabled = false;
            return;
        }
        if (!CorrelationContextManager.hasEverEnabled) {
            this.forceClsHooked = forceClsHooked;
            this.hasEverEnabled = true;
            if (typeof this.cls === "undefined") {
                if ((CorrelationContextManager.forceClsHooked === true) || (CorrelationContextManager.forceClsHooked === undefined && CorrelationContextManager.shouldUseClsHooked())) {
                    this.cls = __webpack_require__(8509);
                }
                else {
                    this.cls = __webpack_require__(7415);
                }
            }
            CorrelationContextManager.session = this.cls.createNamespace("AI-CLS-Session");
            DiagChannel.registerContextPreservation(function (cb) {
                return CorrelationContextManager.session.bind(cb);
            });
        }
        this.enabled = true;
    };
    CorrelationContextManager.startOperation = function (context, request) {
        var traceContext = context && context.traceContext || null;
        var spanContext = context && context.traceId
            ? context
            : null;
        var headers = context && context.headers;
        if (spanContext) {
            var traceparent = new Traceparent("00-" + spanContext.traceId + "-" + spanContext.spanId + "-01");
            var tracestate = new Tracestate(spanContext.tracestate);
            var correlationContext = CorrelationContextManager.generateContextObject(spanContext.traceId, "|" + spanContext.traceId + "." + spanContext.spanId + ".", typeof request === "string" ? request : "", undefined, traceparent, tracestate);
            return correlationContext;
        }
        // AzFunction TraceContext available
        if (traceContext) {
            var traceparent = new Traceparent(traceContext.traceparent);
            var tracestate = new Tracestate(traceContext.tracestate);
            var parser = typeof request === "object"
                ? new HttpRequestParser(request)
                : null;
            var correlationContext = CorrelationContextManager.generateContextObject(traceparent.traceId, traceparent.parentId, typeof request === "string"
                ? request
                : parser.getOperationName({}), parser && parser.getCorrelationContextHeader() || undefined, traceparent, tracestate);
            return correlationContext;
        }
        // No TraceContext available, parse as http.IncomingMessage
        if (headers) {
            var traceparent = new Traceparent(headers.traceparent);
            var tracestate = new Tracestate(headers.tracestate);
            var parser = new HttpRequestParser(context);
            var correlationContext = CorrelationContextManager.generateContextObject(traceparent.traceId, traceparent.parentId, parser.getOperationName({}), parser.getCorrelationContextHeader(), traceparent, tracestate);
            return correlationContext;
        }
        Logging.warn("startOperation was called with invalid arguments", arguments);
        return null;
    };
    /**
     *  Disables the CorrelationContextManager.
     */
    CorrelationContextManager.disable = function () {
        this.enabled = false;
    };
    /**
     * Reset the namespace
     */
    CorrelationContextManager.reset = function () {
        if (CorrelationContextManager.hasEverEnabled) {
            CorrelationContextManager.session = null;
            CorrelationContextManager.session = this.cls.createNamespace('AI-CLS-Session');
        }
    };
    /**
     *  Reports if CorrelationContextManager is able to run in this environment
     */
    CorrelationContextManager.isNodeVersionCompatible = function () {
        var nodeVer = process.versions.node.split(".");
        return parseInt(nodeVer[0]) > 3 || (parseInt(nodeVer[0]) > 2 && parseInt(nodeVer[1]) > 2);
    };
    /**
     * We only want to use cls-hooked when it uses async_hooks api (8.2+), else
     * use async-listener (plain -cls)
     */
    CorrelationContextManager.shouldUseClsHooked = function () {
        var nodeVer = process.versions.node.split(".");
        return (parseInt(nodeVer[0]) > 8) || (parseInt(nodeVer[0]) >= 8 && parseInt(nodeVer[1]) >= 2);
    };
    /**
     * A TypeError is triggered by cls-hooked for node [8.0, 8.2)
     * @internal Used in tests only
     */
    CorrelationContextManager.canUseClsHooked = function () {
        var nodeVer = process.versions.node.split(".");
        var greater800 = (parseInt(nodeVer[0]) > 8) || (parseInt(nodeVer[0]) >= 8 && parseInt(nodeVer[1]) >= 0);
        var less820 = (parseInt(nodeVer[0]) < 8) || (parseInt(nodeVer[0]) <= 8 && parseInt(nodeVer[1]) < 2);
        var greater470 = parseInt(nodeVer[0]) > 4 || (parseInt(nodeVer[0]) >= 4 && parseInt(nodeVer[1]) >= 7); // cls-hooked requires node 4.7+
        return !(greater800 && less820) && greater470;
    };
    CorrelationContextManager.enabled = false;
    CorrelationContextManager.hasEverEnabled = false;
    CorrelationContextManager.forceClsHooked = undefined; // true: use cls-hooked, false: use cls, undefined: choose based on node version
    CorrelationContextManager.CONTEXT_NAME = "ApplicationInsights-Context";
    return CorrelationContextManager;
}());
exports.CorrelationContextManager = CorrelationContextManager;
var CustomPropertiesImpl = (function () {
    function CustomPropertiesImpl(header) {
        this.props = [];
        this.addHeaderData(header);
    }
    CustomPropertiesImpl.prototype.addHeaderData = function (header) {
        var keyvals = header ? header.split(", ") : [];
        this.props = keyvals.map(function (keyval) {
            var parts = keyval.split("=");
            return { key: parts[0], value: parts[1] };
        }).concat(this.props);
    };
    CustomPropertiesImpl.prototype.serializeToHeader = function () {
        return this.props.map(function (keyval) {
            return keyval.key + "=" + keyval.value;
        }).join(", ");
    };
    CustomPropertiesImpl.prototype.getProperty = function (prop) {
        for (var i = 0; i < this.props.length; ++i) {
            var keyval = this.props[i];
            if (keyval.key === prop) {
                return keyval.value;
            }
        }
        return;
    };
    // TODO: Strictly according to the spec, properties which are recieved from
    // an incoming request should be left untouched, while we may add our own new
    // properties. The logic here will need to change to track that.
    CustomPropertiesImpl.prototype.setProperty = function (prop, val) {
        if (CustomPropertiesImpl.bannedCharacters.test(prop) || CustomPropertiesImpl.bannedCharacters.test(val)) {
            Logging.warn("Correlation context property keys and values must not contain ',' or '='. setProperty was called with key: " + prop + " and value: " + val);
            return;
        }
        for (var i = 0; i < this.props.length; ++i) {
            var keyval = this.props[i];
            if (keyval.key === prop) {
                keyval.value = val;
                return;
            }
        }
        this.props.push({ key: prop, value: val });
    };
    CustomPropertiesImpl.bannedCharacters = /[,=]/;
    return CustomPropertiesImpl;
}());
//# sourceMappingURL=CorrelationContextManager.js.map

/***/ }),

/***/ 8339:
/***/ ((module) => {

"use strict";

var AutoCollectExceptions = (function () {
    function AutoCollectExceptions(client) {
        if (!!AutoCollectExceptions.INSTANCE) {
            throw new Error("Exception tracking should be configured from the applicationInsights object");
        }
        AutoCollectExceptions.INSTANCE = this;
        this._client = client;
        // Only use for 13.7.0+
        var nodeVer = process.versions.node.split(".");
        AutoCollectExceptions._canUseUncaughtExceptionMonitor = parseInt(nodeVer[0]) > 13 || (parseInt(nodeVer[0]) === 13 && parseInt(nodeVer[1]) >= 7);
    }
    AutoCollectExceptions.prototype.isInitialized = function () {
        return this._isInitialized;
    };
    AutoCollectExceptions.prototype.enable = function (isEnabled) {
        var _this = this;
        if (isEnabled) {
            this._isInitialized = true;
            var self = this;
            if (!this._exceptionListenerHandle) {
                // For scenarios like Promise.reject(), an error won't be passed to the handle. Create a placeholder
                // error for these scenarios.
                var handle = function (reThrow, name, error) {
                    if (error === void 0) { error = new Error(AutoCollectExceptions._FALLBACK_ERROR_MESSAGE); }
                    _this._client.trackException({ exception: error });
                    _this._client.flush({ isAppCrashing: true });
                    // only rethrow when we are the only listener
                    if (reThrow && name && process.listeners(name).length === 1) {
                        console.error(error);
                        process.exit(1);
                    }
                };
                if (AutoCollectExceptions._canUseUncaughtExceptionMonitor) {
                    // Node.js >= 13.7.0, use uncaughtExceptionMonitor. It handles both promises and exceptions
                    this._exceptionListenerHandle = handle.bind(this, false, undefined); // never rethrows
                    process.on(AutoCollectExceptions.UNCAUGHT_EXCEPTION_MONITOR_HANDLER_NAME, this._exceptionListenerHandle);
                }
                else {
                    this._exceptionListenerHandle = handle.bind(this, true, AutoCollectExceptions.UNCAUGHT_EXCEPTION_HANDLER_NAME);
                    this._rejectionListenerHandle = handle.bind(this, false, undefined); // never rethrows
                    process.on(AutoCollectExceptions.UNCAUGHT_EXCEPTION_HANDLER_NAME, this._exceptionListenerHandle);
                    process.on(AutoCollectExceptions.UNHANDLED_REJECTION_HANDLER_NAME, this._rejectionListenerHandle);
                }
            }
        }
        else {
            if (this._exceptionListenerHandle) {
                if (AutoCollectExceptions._canUseUncaughtExceptionMonitor) {
                    process.removeListener(AutoCollectExceptions.UNCAUGHT_EXCEPTION_MONITOR_HANDLER_NAME, this._exceptionListenerHandle);
                }
                else {
                    process.removeListener(AutoCollectExceptions.UNCAUGHT_EXCEPTION_HANDLER_NAME, this._exceptionListenerHandle);
                    process.removeListener(AutoCollectExceptions.UNHANDLED_REJECTION_HANDLER_NAME, this._rejectionListenerHandle);
                }
                this._exceptionListenerHandle = undefined;
                this._rejectionListenerHandle = undefined;
                delete this._exceptionListenerHandle;
                delete this._rejectionListenerHandle;
            }
        }
    };
    AutoCollectExceptions.prototype.dispose = function () {
        AutoCollectExceptions.INSTANCE = null;
        this.enable(false);
        this._isInitialized = false;
    };
    AutoCollectExceptions.INSTANCE = null;
    AutoCollectExceptions.UNCAUGHT_EXCEPTION_MONITOR_HANDLER_NAME = "uncaughtExceptionMonitor";
    AutoCollectExceptions.UNCAUGHT_EXCEPTION_HANDLER_NAME = "uncaughtException";
    AutoCollectExceptions.UNHANDLED_REJECTION_HANDLER_NAME = "unhandledRejection";
    AutoCollectExceptions._RETHROW_EXIT_MESSAGE = "Application Insights Rethrow Exception Handler";
    AutoCollectExceptions._FALLBACK_ERROR_MESSAGE = "A promise was rejected without providing an error. Application Insights generated this error stack for you.";
    AutoCollectExceptions._canUseUncaughtExceptionMonitor = false;
    return AutoCollectExceptions;
}());
module.exports = AutoCollectExceptions;
//# sourceMappingURL=Exceptions.js.map

/***/ }),

/***/ 9895:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var os = __webpack_require__(2087);
var Constants = __webpack_require__(9722);
var Util = __webpack_require__(834);
var Context = __webpack_require__(2463);
var AutoCollectHttpDependencies = __webpack_require__(5679);
var AIMS_URI = "http://169.254.169.254/metadata/instance/compute";
var AIMS_API_VERSION = "api-version=2017-12-01";
var AIMS_FORMAT = "format=json";
var ConnectionErrorMessage = "ENETUNREACH";
var HeartBeat = (function () {
    function HeartBeat(client) {
        this._collectionInterval = 900000;
        this._vmData = {};
        this._azInst_vmId = "";
        this._azInst_subscriptionId = "";
        this._azInst_osType = "";
        if (!HeartBeat.INSTANCE) {
            HeartBeat.INSTANCE = this;
        }
        this._isInitialized = false;
        this._client = client;
    }
    HeartBeat.prototype.enable = function (isEnabled, config) {
        var _this = this;
        this._isEnabled = isEnabled;
        if (this._isEnabled && !this._isInitialized) {
            this._isInitialized = true;
        }
        if (isEnabled) {
            if (!this._handle) {
                this._handle = setInterval(function () { return _this.trackHeartBeat(config, function () { }); }, this._collectionInterval);
                this._handle.unref(); // Allow the app to terminate even while this loop is going on
            }
        }
        else {
            if (this._handle) {
                clearInterval(this._handle);
                this._handle = null;
            }
        }
    };
    HeartBeat.prototype.isInitialized = function () {
        return this._isInitialized;
    };
    HeartBeat.isEnabled = function () {
        return HeartBeat.INSTANCE && HeartBeat.INSTANCE._isEnabled;
    };
    HeartBeat.prototype.trackHeartBeat = function (config, callback) {
        var _this = this;
        var waiting = false;
        var properties = {};
        var sdkVersion = Context.sdkVersion; // "node" or "node-nativeperf"
        properties["sdk"] = sdkVersion;
        properties["osType"] = os.type();
        if (process.env.WEBSITE_SITE_NAME) {
            properties["appSrv_SiteName"] = process.env.WEBSITE_SITE_NAME || "";
            properties["appSrv_wsStamp"] = process.env.WEBSITE_HOME_STAMPNAME || "";
            properties["appSrv_wsHost"] = process.env.WEBSITE_HOSTNAME || "";
        }
        else if (process.env.FUNCTIONS_WORKER_RUNTIME) {
            properties["azfunction_appId"] = process.env.WEBSITE_HOSTNAME;
        }
        else if (config) {
            if (this._isVM === undefined) {
                waiting = true;
                this._getAzureComputeMetadata(config, function () {
                    if (_this._isVM && Object.keys(_this._vmData).length > 0) {
                        properties["azInst_vmId"] = _this._vmData["vmId"] || "";
                        properties["azInst_subscriptionId"] = _this._vmData["subscriptionId"] || "";
                        properties["azInst_osType"] = _this._vmData["osType"] || "";
                        _this._azInst_vmId = _this._vmData["vmId"] || "";
                        _this._azInst_subscriptionId = _this._vmData["subscriptionId"] || "";
                        _this._azInst_osType = _this._vmData["osType"] || "";
                    }
                    _this._client.trackMetric({ name: Constants.HeartBeatMetricName, value: 0, properties: properties });
                    callback();
                });
            }
            else if (this._isVM) {
                properties["azInst_vmId"] = this._azInst_vmId;
                properties["azInst_subscriptionId"] = this._azInst_subscriptionId;
                properties["azInst_osType"] = this._azInst_osType;
            }
        }
        if (!waiting) {
            this._client.trackMetric({ name: Constants.HeartBeatMetricName, value: 0, properties: properties });
            callback();
        }
    };
    HeartBeat.prototype.dispose = function () {
        HeartBeat.INSTANCE = null;
        this.enable(false);
        this._isInitialized = false;
    };
    HeartBeat.prototype._getAzureComputeMetadata = function (config, callback) {
        var _this = this;
        var metadataRequestUrl = AIMS_URI + "?" + AIMS_API_VERSION + "&" + AIMS_FORMAT;
        var requestOptions = (_a = {
                method: 'GET'
            },
            _a[AutoCollectHttpDependencies.disableCollectionRequestOption] = true,
            _a.headers = {
                "Metadata": "True",
            },
            _a);
        var req = Util.makeRequest(config, metadataRequestUrl, requestOptions, function (res) {
            if (res.statusCode === 200) {
                // Success; VM
                _this._isVM = true;
                var virtualMachineData_1 = "";
                res.on('data', function (data) {
                    virtualMachineData_1 += data;
                });
                res.on('end', function () {
                    _this._vmData = _this._isJSON(virtualMachineData_1) ? JSON.parse(virtualMachineData_1) : {};
                    callback();
                });
            }
            else {
                // else Retry on next heartbeat metrics call
                callback();
            }
        });
        if (req) {
            req.on('error', function (error) {
                // Unable to contact endpoint.
                // Do nothing for now.
                if (error && error.message && error.message.indexOf(ConnectionErrorMessage) > -1) {
                    _this._isVM = false; // confirm it's not in VM
                }
                // errors other than connect ENETUNREACH - retry
                callback();
            });
            req.end();
        }
        var _a;
    };
    HeartBeat.prototype._isJSON = function (str) {
        try {
            return (JSON.parse(str) && !!str);
        }
        catch (e) {
            return false;
        }
    };
    return HeartBeat;
}());
module.exports = HeartBeat;
//# sourceMappingURL=HeartBeat.js.map

/***/ }),

/***/ 5679:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var http = __webpack_require__(8605);
var https = __webpack_require__(7211);
var Logging = __webpack_require__(4652);
var Util = __webpack_require__(834);
var RequestResponseHeaders = __webpack_require__(9663);
var HttpDependencyParser = __webpack_require__(9412);
var CorrelationContextManager_1 = __webpack_require__(2740);
var CorrelationIdManager = __webpack_require__(1360);
var Traceparent = __webpack_require__(2185);
var DiagChannel = __webpack_require__(9426);
var AutoCollectHttpDependencies = (function () {
    function AutoCollectHttpDependencies(client) {
        if (!!AutoCollectHttpDependencies.INSTANCE) {
            throw new Error("Client request tracking should be configured from the applicationInsights object");
        }
        AutoCollectHttpDependencies.INSTANCE = this;
        this._client = client;
    }
    AutoCollectHttpDependencies.prototype.enable = function (isEnabled) {
        this._isEnabled = isEnabled;
        if (this._isEnabled && !this._isInitialized) {
            this._initialize();
        }
        if (DiagChannel.IsInitialized) {
            __webpack_require__(3405)/* .enable */ .wp(true, this._client);
            __webpack_require__(5096)/* .enable */ .wp(isEnabled, this._client);
            __webpack_require__(8135)/* .enable */ .wp(isEnabled, this._client);
            __webpack_require__(2084)/* .enable */ .wp(isEnabled, this._client);
            __webpack_require__(6054)/* .enable */ .wp(isEnabled, this._client);
        }
    };
    AutoCollectHttpDependencies.prototype.isInitialized = function () {
        return this._isInitialized;
    };
    AutoCollectHttpDependencies.prototype._initialize = function () {
        var _this = this;
        this._isInitialized = true;
        var originalGet = http.get;
        var originalRequest = http.request;
        var originalHttpsRequest = https.request;
        var clientRequestPatch = function (request, options) {
            var shouldCollect = !options[AutoCollectHttpDependencies.disableCollectionRequestOption] &&
                !request[AutoCollectHttpDependencies.alreadyAutoCollectedFlag];
            // If someone else patched traceparent headers onto this request
            if (options.headers && options.headers['user-agent'] && options.headers['user-agent'].toString().indexOf('azsdk-js') !== -1) {
                shouldCollect = false;
            }
            request[AutoCollectHttpDependencies.alreadyAutoCollectedFlag] = true;
            if (request && options && shouldCollect) {
                CorrelationContextManager_1.CorrelationContextManager.wrapEmitter(request);
                AutoCollectHttpDependencies.trackRequest(_this._client, { options: options, request: request });
            }
        };
        // On node >= v0.11.12 and < 9.0 (excluding 8.9.0) https.request just calls http.request (with additional options).
        // On node < 0.11.12, 8.9.0, and 9.0 > https.request is handled separately
        // Patch both and leave a flag to not double-count on versions that just call through
        // We add the flag to both http and https to protect against strange double collection in other scenarios
        http.request = function (options) {
            var requestArgs = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                requestArgs[_i - 1] = arguments[_i];
            }
            var request = originalRequest.call.apply(originalRequest, [http, options].concat(requestArgs));
            clientRequestPatch(request, options);
            return request;
        };
        https.request = function (options) {
            var requestArgs = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                requestArgs[_i - 1] = arguments[_i];
            }
            var request = originalHttpsRequest.call.apply(originalHttpsRequest, [https, options].concat(requestArgs));
            clientRequestPatch(request, options);
            return request;
        };
        // Node 8 calls http.request from http.get using a local reference!
        // We have to patch .get manually in this case and can't just assume request is enough
        // We have to replace the entire method in this case. We can't call the original.
        // This is because calling the original will give us no chance to set headers as it internally does .end().
        http.get = function (options) {
            var requestArgs = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                requestArgs[_i - 1] = arguments[_i];
            }
            var request = (_a = http.request).call.apply(_a, [http, options].concat(requestArgs));
            request.end();
            return request;
            var _a;
        };
        https.get = function (options) {
            var requestArgs = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                requestArgs[_i - 1] = arguments[_i];
            }
            var request = (_a = https.request).call.apply(_a, [https, options].concat(requestArgs));
            request.end();
            return request;
            var _a;
        };
    };
    /**
     * Tracks an outgoing request. Because it may set headers this method must be called before
     * writing content to or ending the request.
     */
    AutoCollectHttpDependencies.trackRequest = function (client, telemetry) {
        if (!telemetry.options || !telemetry.request || !client) {
            Logging.info("AutoCollectHttpDependencies.trackRequest was called with invalid parameters: ", !telemetry.options, !telemetry.request, !client);
            return;
        }
        var requestParser = new HttpDependencyParser(telemetry.options, telemetry.request);
        var currentContext = CorrelationContextManager_1.CorrelationContextManager.getCurrentContext();
        var uniqueRequestId;
        var uniqueTraceparent;
        if (currentContext && currentContext.operation && currentContext.operation.traceparent && Traceparent.isValidTraceId(currentContext.operation.traceparent.traceId)) {
            currentContext.operation.traceparent.updateSpanId();
            uniqueRequestId = currentContext.operation.traceparent.getBackCompatRequestId();
        }
        else if (CorrelationIdManager.w3cEnabled) {
            // Start an operation now so that we can include the w3c headers in the outgoing request
            var traceparent = new Traceparent();
            uniqueTraceparent = traceparent.toString();
            uniqueRequestId = traceparent.getBackCompatRequestId();
        }
        else {
            uniqueRequestId = currentContext && currentContext.operation && (currentContext.operation.parentId + AutoCollectHttpDependencies.requestNumber++ + '.');
        }
        // Add the source correlationId to the request headers, if a value was not already provided.
        // The getHeader/setHeader methods aren't available on very old Node versions, and
        // are not included in the v0.10 type declarations currently used. So check if the
        // methods exist before invoking them.
        if (Util.canIncludeCorrelationHeader(client, requestParser.getUrl()) && telemetry.request.getHeader && telemetry.request.setHeader) {
            if (client.config && client.config.correlationId) {
                // getHeader returns "any" type in newer versions of node. In basic scenarios, this will be <string | string[] | number>, but could be modified to anything else via middleware
                var correlationHeader = telemetry.request.getHeader(RequestResponseHeaders.requestContextHeader);
                try {
                    Util.safeIncludeCorrelationHeader(client, telemetry.request, correlationHeader);
                }
                catch (err) {
                    Logging.warn("Request-Context header could not be set. Correlation of requests may be lost", err);
                }
                if (currentContext && currentContext.operation) {
                    try {
                        telemetry.request.setHeader(RequestResponseHeaders.requestIdHeader, uniqueRequestId);
                        // Also set legacy headers
                        if (!client.config.ignoreLegacyHeaders) {
                            telemetry.request.setHeader(RequestResponseHeaders.parentIdHeader, currentContext.operation.id);
                            telemetry.request.setHeader(RequestResponseHeaders.rootIdHeader, uniqueRequestId);
                        }
                        // Set W3C headers, if available
                        if (uniqueTraceparent || currentContext.operation.traceparent) {
                            telemetry.request.setHeader(RequestResponseHeaders.traceparentHeader, uniqueTraceparent || currentContext.operation.traceparent.toString());
                        }
                        else if (CorrelationIdManager.w3cEnabled) {
                            // should never get here since we set uniqueTraceparent above for the w3cEnabled scenario
                            var traceparent = new Traceparent().toString();
                            telemetry.request.setHeader(RequestResponseHeaders.traceparentHeader, traceparent);
                        }
                        if (currentContext.operation.tracestate) {
                            var tracestate = currentContext.operation.tracestate.toString();
                            if (tracestate) {
                                telemetry.request.setHeader(RequestResponseHeaders.traceStateHeader, tracestate);
                            }
                        }
                        var correlationContextHeader = currentContext.customProperties.serializeToHeader();
                        if (correlationContextHeader) {
                            telemetry.request.setHeader(RequestResponseHeaders.correlationContextHeader, correlationContextHeader);
                        }
                    }
                    catch (err) {
                        Logging.warn("Correlation headers could not be set. Correlation of requests may be lost.", err);
                    }
                }
            }
        }
        // Collect dependency telemetry about the request when it finishes.
        if (telemetry.request.on) {
            telemetry.request.on('response', function (response) {
                requestParser.onResponse(response);
                var dependencyTelemetry = requestParser.getDependencyTelemetry(telemetry, uniqueRequestId);
                dependencyTelemetry.contextObjects = dependencyTelemetry.contextObjects || {};
                dependencyTelemetry.contextObjects["http.RequestOptions"] = telemetry.options;
                dependencyTelemetry.contextObjects["http.ClientRequest"] = telemetry.request;
                dependencyTelemetry.contextObjects["http.ClientResponse"] = response;
                client.trackDependency(dependencyTelemetry);
            });
            telemetry.request.on('error', function (e) {
                requestParser.onError(e);
                var dependencyTelemetry = requestParser.getDependencyTelemetry(telemetry, uniqueRequestId);
                dependencyTelemetry.contextObjects = dependencyTelemetry.contextObjects || {};
                dependencyTelemetry.contextObjects["http.RequestOptions"] = telemetry.options;
                dependencyTelemetry.contextObjects["http.ClientRequest"] = telemetry.request;
                dependencyTelemetry.contextObjects["Error"] = e;
                client.trackDependency(dependencyTelemetry);
            });
        }
    };
    AutoCollectHttpDependencies.prototype.dispose = function () {
        AutoCollectHttpDependencies.INSTANCE = null;
        this.enable(false);
        this._isInitialized = false;
    };
    AutoCollectHttpDependencies.disableCollectionRequestOption = 'disableAppInsightsAutoCollection';
    AutoCollectHttpDependencies.requestNumber = 1;
    AutoCollectHttpDependencies.alreadyAutoCollectedFlag = '_appInsightsAutoCollected';
    return AutoCollectHttpDependencies;
}());
module.exports = AutoCollectHttpDependencies;
//# sourceMappingURL=HttpDependencies.js.map

/***/ }),

/***/ 9412:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var url = __webpack_require__(8835);
var Contracts = __webpack_require__(5312);
var Util = __webpack_require__(834);
var RequestResponseHeaders = __webpack_require__(9663);
var RequestParser = __webpack_require__(426);
var CorrelationIdManager = __webpack_require__(1360);
/**
 * Helper class to read data from the request/response objects and convert them into the telemetry contract
 */
var HttpDependencyParser = (function (_super) {
    __extends(HttpDependencyParser, _super);
    function HttpDependencyParser(requestOptions, request) {
        var _this = _super.call(this) || this;
        if (request && request.method && requestOptions) {
            // The ClientRequest.method property isn't documented, but is always there.
            _this.method = request.method;
            _this.url = HttpDependencyParser._getUrlFromRequestOptions(requestOptions, request);
            _this.startTime = +new Date();
        }
        return _this;
    }
    /**
     * Called when the ClientRequest emits an error event.
     */
    HttpDependencyParser.prototype.onError = function (error) {
        this._setStatus(undefined, error);
    };
    /**
     * Called when the ClientRequest emits a response event.
     */
    HttpDependencyParser.prototype.onResponse = function (response) {
        this._setStatus(response.statusCode, undefined);
        this.correlationId = Util.getCorrelationContextTarget(response, RequestResponseHeaders.requestContextTargetKey);
    };
    /**
     * Gets a dependency data contract object for a completed ClientRequest.
     */
    HttpDependencyParser.prototype.getDependencyTelemetry = function (baseTelemetry, dependencyId) {
        var urlObject = url.parse(this.url);
        urlObject.search = undefined;
        urlObject.hash = undefined;
        var dependencyName = this.method.toUpperCase() + " " + urlObject.pathname;
        var remoteDependencyType = Contracts.RemoteDependencyDataConstants.TYPE_HTTP;
        var remoteDependencyTarget = urlObject.hostname;
        if (urlObject.port) {
            remoteDependencyTarget += ":" + urlObject.port;
        }
        if (this.correlationId) {
            remoteDependencyType = Contracts.RemoteDependencyDataConstants.TYPE_AI;
            if (this.correlationId !== CorrelationIdManager.correlationIdPrefix) {
                remoteDependencyTarget += " | " + this.correlationId;
            }
        }
        else {
            remoteDependencyType = Contracts.RemoteDependencyDataConstants.TYPE_HTTP;
        }
        var dependencyTelemetry = {
            id: dependencyId,
            name: dependencyName,
            data: this.url,
            duration: this.duration,
            success: this._isSuccess(),
            resultCode: this.statusCode ? this.statusCode.toString() : null,
            properties: this.properties || {},
            dependencyTypeName: remoteDependencyType,
            target: remoteDependencyTarget
        };
        if (baseTelemetry && baseTelemetry.time) {
            dependencyTelemetry.time = baseTelemetry.time;
        }
        else if (this.startTime) {
            dependencyTelemetry.time = new Date(this.startTime);
        }
        // We should keep any parameters the user passed in
        // Except the fields defined above in requestTelemetry, which take priority
        // Except the properties field, where they're merged instead, with baseTelemetry taking priority
        if (baseTelemetry) {
            // Copy missing fields
            for (var key in baseTelemetry) {
                if (!dependencyTelemetry[key]) {
                    dependencyTelemetry[key] = baseTelemetry[key];
                }
            }
            // Merge properties
            if (baseTelemetry.properties) {
                for (var key in baseTelemetry.properties) {
                    dependencyTelemetry.properties[key] = baseTelemetry.properties[key];
                }
            }
        }
        return dependencyTelemetry;
    };
    /**
     * Builds a URL from request options, using the same logic as http.request(). This is
     * necessary because a ClientRequest object does not expose a url property.
     */
    HttpDependencyParser._getUrlFromRequestOptions = function (options, request) {
        if (typeof options === 'string') {
            options = url.parse(options);
        }
        else if (options && typeof url.URL === 'function' && options instanceof url.URL) {
            return url.format(options);
        }
        else {
            // Avoid modifying the original options object.
            var originalOptions_1 = options;
            options = {};
            if (originalOptions_1) {
                Object.keys(originalOptions_1).forEach(function (key) {
                    options[key] = originalOptions_1[key];
                });
            }
        }
        // Oddly, url.format ignores path and only uses pathname and search,
        // so create them from the path, if path was specified
        if (options.path) {
            var parsedQuery = url.parse(options.path);
            options.pathname = parsedQuery.pathname;
            options.search = parsedQuery.search;
        }
        // Similarly, url.format ignores hostname and port if host is specified,
        // even if host doesn't have the port, but http.request does not work
        // this way. It will use the port if one is not specified in host,
        // effectively treating host as hostname, but will use the port specified
        // in host if it exists.
        if (options.host && options.port) {
            // Force a protocol so it will parse the host as the host, not path.
            // It is discarded and not used, so it doesn't matter if it doesn't match
            var parsedHost = url.parse("http://" + options.host);
            if (!parsedHost.port && options.port) {
                options.hostname = options.host;
                delete options.host;
            }
        }
        // Mix in default values used by http.request and others
        options.protocol = options.protocol || (request.agent && request.agent.protocol) || undefined;
        options.hostname = options.hostname || 'localhost';
        return url.format(options);
    };
    return HttpDependencyParser;
}(RequestParser));
module.exports = HttpDependencyParser;
//# sourceMappingURL=HttpDependencyParser.js.map

/***/ }),

/***/ 3881:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var url = __webpack_require__(8835);
var Contracts = __webpack_require__(5312);
var Util = __webpack_require__(834);
var RequestResponseHeaders = __webpack_require__(9663);
var RequestParser = __webpack_require__(426);
var CorrelationIdManager = __webpack_require__(1360);
var Tracestate = __webpack_require__(4906);
var Traceparent = __webpack_require__(2185);
/**
 * Helper class to read data from the request/response objects and convert them into the telemetry contract
 */
var HttpRequestParser = (function (_super) {
    __extends(HttpRequestParser, _super);
    function HttpRequestParser(request, requestId) {
        var _this = _super.call(this) || this;
        if (request) {
            _this.method = request.method;
            _this.url = _this._getAbsoluteUrl(request);
            _this.startTime = +new Date();
            _this.socketRemoteAddress = request.socket && request.socket.remoteAddress;
            _this.parseHeaders(request, requestId);
            if (request.connection) {
                _this.connectionRemoteAddress = request.connection.remoteAddress;
                _this.legacySocketRemoteAddress = request.connection["socket"] && request.connection["socket"].remoteAddress;
            }
        }
        return _this;
    }
    HttpRequestParser.prototype.onError = function (error, ellapsedMilliseconds) {
        this._setStatus(undefined, error);
        // This parameter is only for overrides. setStatus handles this internally for the autocollected case
        if (ellapsedMilliseconds) {
            this.duration = ellapsedMilliseconds;
        }
    };
    HttpRequestParser.prototype.onResponse = function (response, ellapsedMilliseconds) {
        this._setStatus(response.statusCode, undefined);
        // This parameter is only for overrides. setStatus handles this internally for the autocollected case
        if (ellapsedMilliseconds) {
            this.duration = ellapsedMilliseconds;
        }
    };
    HttpRequestParser.prototype.getRequestTelemetry = function (baseTelemetry) {
        var requestTelemetry = {
            id: this.requestId,
            name: this.method + " " + url.parse(this.url).pathname,
            url: this.url,
            /*
            See https://github.com/microsoft/ApplicationInsights-dotnet-server/blob/25d695e6a906fbe977f67be3966d25dbf1c50a79/Src/Web/Web.Shared.Net/RequestTrackingTelemetryModule.cs#L250
            for reference
            */
            source: this.sourceCorrelationId,
            duration: this.duration,
            resultCode: this.statusCode ? this.statusCode.toString() : null,
            success: this._isSuccess(),
            properties: this.properties
        };
        if (baseTelemetry && baseTelemetry.time) {
            requestTelemetry.time = baseTelemetry.time;
        }
        else if (this.startTime) {
            requestTelemetry.time = new Date(this.startTime);
        }
        // We should keep any parameters the user passed in
        // Except the fields defined above in requestTelemetry, which take priority
        // Except the properties field, where they're merged instead, with baseTelemetry taking priority
        if (baseTelemetry) {
            // Copy missing fields
            for (var key in baseTelemetry) {
                if (!requestTelemetry[key]) {
                    requestTelemetry[key] = baseTelemetry[key];
                }
            }
            // Merge properties
            if (baseTelemetry.properties) {
                for (var key in baseTelemetry.properties) {
                    requestTelemetry.properties[key] = baseTelemetry.properties[key];
                }
            }
        }
        return requestTelemetry;
    };
    HttpRequestParser.prototype.getRequestTags = function (tags) {
        // create a copy of the context for requests since client info will be used here
        var newTags = {};
        for (var key in tags) {
            newTags[key] = tags[key];
        }
        // don't override tags if they are already set
        newTags[HttpRequestParser.keys.locationIp] = tags[HttpRequestParser.keys.locationIp] || this._getIp();
        newTags[HttpRequestParser.keys.sessionId] = tags[HttpRequestParser.keys.sessionId] || this._getId("ai_session");
        newTags[HttpRequestParser.keys.userId] = tags[HttpRequestParser.keys.userId] || this._getId("ai_user");
        newTags[HttpRequestParser.keys.userAuthUserId] = tags[HttpRequestParser.keys.userAuthUserId] || this._getId("ai_authUser");
        newTags[HttpRequestParser.keys.operationName] = this.getOperationName(tags);
        newTags[HttpRequestParser.keys.operationParentId] = this.getOperationParentId(tags);
        newTags[HttpRequestParser.keys.operationId] = this.getOperationId(tags);
        return newTags;
    };
    HttpRequestParser.prototype.getOperationId = function (tags) {
        return tags[HttpRequestParser.keys.operationId] || this.operationId;
    };
    HttpRequestParser.prototype.getOperationParentId = function (tags) {
        return tags[HttpRequestParser.keys.operationParentId] || this.parentId || this.getOperationId(tags);
    };
    HttpRequestParser.prototype.getOperationName = function (tags) {
        return tags[HttpRequestParser.keys.operationName] || this.method + " " + url.parse(this.url).pathname;
    };
    HttpRequestParser.prototype.getRequestId = function () {
        return this.requestId;
    };
    HttpRequestParser.prototype.getCorrelationContextHeader = function () {
        return this.correlationContextHeader;
    };
    HttpRequestParser.prototype.getTraceparent = function () {
        return this.traceparent;
    };
    HttpRequestParser.prototype.getTracestate = function () {
        return this.tracestate;
    };
    HttpRequestParser.prototype.getLegacyRootId = function () {
        return this.legacyRootId;
    };
    HttpRequestParser.prototype._getAbsoluteUrl = function (request) {
        if (!request.headers) {
            return request.url;
        }
        var encrypted = request.connection ? request.connection.encrypted : null;
        var requestUrl = url.parse(request.url);
        var pathName = requestUrl.pathname;
        var search = requestUrl.search;
        var absoluteUrl = url.format({
            protocol: encrypted ? "https" : "http",
            host: request.headers.host,
            pathname: pathName,
            search: search
        });
        return absoluteUrl;
    };
    HttpRequestParser.prototype._getIp = function () {
        // regex to match ipv4 without port
        // Note: including the port would cause the payload to be rejected by the data collector
        var ipMatch = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/;
        var check = function (str) {
            var results = ipMatch.exec(str);
            if (results) {
                return results[0];
            }
        };
        var ip = check(this.rawHeaders["x-forwarded-for"])
            || check(this.rawHeaders["x-client-ip"])
            || check(this.rawHeaders["x-real-ip"])
            || check(this.connectionRemoteAddress)
            || check(this.socketRemoteAddress)
            || check(this.legacySocketRemoteAddress);
        // node v12 returns this if the address is "localhost"
        if (!ip
            && this.connectionRemoteAddress
            && this.connectionRemoteAddress.substr
            && this.connectionRemoteAddress.substr(0, 2) === "::") {
            ip = "127.0.0.1";
        }
        return ip;
    };
    HttpRequestParser.prototype._getId = function (name) {
        var cookie = (this.rawHeaders && this.rawHeaders["cookie"] &&
            typeof this.rawHeaders["cookie"] === 'string' && this.rawHeaders["cookie"]) || "";
        var value = HttpRequestParser.parseId(Util.getCookie(name, cookie));
        return value;
    };
    /**
     * Sets this operation's operationId, parentId, requestId (and legacyRootId, if necessary) based on this operation's traceparent
     */
    HttpRequestParser.prototype.setBackCompatFromThisTraceContext = function () {
        // Set operationId
        this.operationId = this.traceparent.traceId;
        if (this.traceparent.legacyRootId) {
            this.legacyRootId = this.traceparent.legacyRootId;
        }
        // Set parentId with existing spanId
        this.parentId = this.traceparent.parentId;
        // Update the spanId and set the current requestId
        this.traceparent.updateSpanId();
        this.requestId = this.traceparent.getBackCompatRequestId();
    };
    HttpRequestParser.prototype.parseHeaders = function (request, requestId) {
        this.rawHeaders = request.headers || request.rawHeaders;
        this.userAgent = request.headers && request.headers["user-agent"];
        this.sourceCorrelationId = Util.getCorrelationContextTarget(request, RequestResponseHeaders.requestContextSourceKey);
        if (request.headers) {
            var tracestateHeader = request.headers[RequestResponseHeaders.traceStateHeader]; // w3c header
            var traceparentHeader = request.headers[RequestResponseHeaders.traceparentHeader]; // w3c header
            var requestIdHeader = request.headers[RequestResponseHeaders.requestIdHeader]; // default AI header
            var legacy_parentId = request.headers[RequestResponseHeaders.parentIdHeader]; // legacy AI header
            var legacy_rootId = request.headers[RequestResponseHeaders.rootIdHeader]; // legacy AI header
            this.correlationContextHeader = request.headers[RequestResponseHeaders.correlationContextHeader];
            if (CorrelationIdManager.w3cEnabled && (traceparentHeader || tracestateHeader)) {
                // Parse W3C Trace Context headers
                this.traceparent = new Traceparent(traceparentHeader); // new traceparent is always created from this
                this.tracestate = traceparentHeader && tracestateHeader && new Tracestate(tracestateHeader); // discard tracestate if no traceparent is present
                this.setBackCompatFromThisTraceContext();
            }
            else if (requestIdHeader) {
                // Parse AI headers
                if (CorrelationIdManager.w3cEnabled) {
                    this.traceparent = new Traceparent(null, requestIdHeader);
                    this.setBackCompatFromThisTraceContext();
                }
                else {
                    this.parentId = requestIdHeader;
                    this.requestId = CorrelationIdManager.generateRequestId(this.parentId);
                    this.operationId = CorrelationIdManager.getRootId(this.requestId);
                }
            }
            else {
                // Legacy fallback
                if (CorrelationIdManager.w3cEnabled) {
                    this.traceparent = new Traceparent();
                    this.traceparent.parentId = legacy_parentId;
                    this.traceparent.legacyRootId = legacy_rootId || legacy_parentId;
                    this.setBackCompatFromThisTraceContext();
                }
                else {
                    this.parentId = legacy_parentId;
                    this.requestId = CorrelationIdManager.generateRequestId(legacy_rootId || this.parentId);
                    this.correlationContextHeader = null;
                    this.operationId = CorrelationIdManager.getRootId(this.requestId);
                }
            }
            if (requestId) {
                // For the scenarios that don't guarantee an AI-created context,
                // override the requestId with the provided one.
                this.requestId = requestId;
                this.operationId = CorrelationIdManager.getRootId(this.requestId);
            }
        }
    };
    HttpRequestParser.parseId = function (cookieValue) {
        var cookieParts = cookieValue.split("|");
        if (cookieParts.length > 0) {
            return cookieParts[0];
        }
        return ""; // old behavior was to return "" for incorrect parsing
    };
    HttpRequestParser.keys = new Contracts.ContextTagKeys();
    return HttpRequestParser;
}(RequestParser));
module.exports = HttpRequestParser;
//# sourceMappingURL=HttpRequestParser.js.map

/***/ }),

/***/ 6384:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var http = __webpack_require__(8605);
var https = __webpack_require__(7211);
var Logging = __webpack_require__(4652);
var Util = __webpack_require__(834);
var RequestResponseHeaders = __webpack_require__(9663);
var HttpRequestParser = __webpack_require__(3881);
var CorrelationContextManager_1 = __webpack_require__(2740);
var AutoCollectPerformance = __webpack_require__(1177);
var AutoCollectHttpRequests = (function () {
    function AutoCollectHttpRequests(client) {
        if (!!AutoCollectHttpRequests.INSTANCE) {
            throw new Error("Server request tracking should be configured from the applicationInsights object");
        }
        AutoCollectHttpRequests.INSTANCE = this;
        this._client = client;
    }
    AutoCollectHttpRequests.prototype.enable = function (isEnabled) {
        this._isEnabled = isEnabled;
        // Autocorrelation requires automatic monitoring of incoming server requests
        // Disabling autocollection but enabling autocorrelation will still enable
        // request monitoring but will not produce request events
        if ((this._isAutoCorrelating || this._isEnabled || AutoCollectPerformance.isEnabled()) && !this._isInitialized) {
            this.useAutoCorrelation(this._isAutoCorrelating);
            this._initialize();
        }
    };
    AutoCollectHttpRequests.prototype.useAutoCorrelation = function (isEnabled, forceClsHooked) {
        if (isEnabled && !this._isAutoCorrelating) {
            CorrelationContextManager_1.CorrelationContextManager.enable(forceClsHooked);
        }
        else if (!isEnabled && this._isAutoCorrelating) {
            CorrelationContextManager_1.CorrelationContextManager.disable();
        }
        this._isAutoCorrelating = isEnabled;
    };
    AutoCollectHttpRequests.prototype.isInitialized = function () {
        return this._isInitialized;
    };
    AutoCollectHttpRequests.prototype.isAutoCorrelating = function () {
        return this._isAutoCorrelating;
    };
    AutoCollectHttpRequests.prototype._generateCorrelationContext = function (requestParser) {
        if (!this._isAutoCorrelating) {
            return;
        }
        return CorrelationContextManager_1.CorrelationContextManager.generateContextObject(requestParser.getOperationId(this._client.context.tags), requestParser.getRequestId(), requestParser.getOperationName(this._client.context.tags), requestParser.getCorrelationContextHeader(), requestParser.getTraceparent(), requestParser.getTracestate());
    };
    AutoCollectHttpRequests.prototype._initialize = function () {
        var _this = this;
        this._isInitialized = true;
        var wrapOnRequestHandler = function (onRequest) {
            if (!onRequest) {
                return undefined;
            }
            if (typeof onRequest !== 'function') {
                throw new Error('onRequest handler must be a function');
            }
            return function (request, response) {
                CorrelationContextManager_1.CorrelationContextManager.wrapEmitter(request);
                CorrelationContextManager_1.CorrelationContextManager.wrapEmitter(response);
                var shouldCollect = request && !request[AutoCollectHttpRequests.alreadyAutoCollectedFlag];
                if (request && shouldCollect) {
                    // Set up correlation context
                    var requestParser_1 = new HttpRequestParser(request);
                    var correlationContext = _this._generateCorrelationContext(requestParser_1);
                    // Note: Check for if correlation is enabled happens within this method.
                    // If not enabled, function will directly call the callback.
                    CorrelationContextManager_1.CorrelationContextManager.runWithContext(correlationContext, function () {
                        if (_this._isEnabled) {
                            // Mark as auto collected
                            request[AutoCollectHttpRequests.alreadyAutoCollectedFlag] = true;
                            // Auto collect request
                            AutoCollectHttpRequests.trackRequest(_this._client, { request: request, response: response }, requestParser_1);
                        }
                        if (typeof onRequest === "function") {
                            onRequest(request, response);
                        }
                    });
                }
                else {
                    if (typeof onRequest === "function") {
                        onRequest(request, response);
                    }
                }
            };
        };
        // The `http.createServer` function will instantiate a new http.Server object.
        // Inside the Server's constructor, it is using addListener to register the
        // onRequest handler. So there are two ways to inject the wrapped onRequest handler:
        // 1) Overwrite Server.prototype.addListener (and .on()) globally and not patching
        //    the http.createServer call. Or
        // 2) Overwrite the http.createServer method and add a patched addListener to the
        //    fresh server instance. This seems more stable for possible future changes as
        //    it also covers the case where the Server might not use addListener to manage
        //    the callback internally.
        //    And also as long as the constructor uses addListener to add the handle, it is
        //    ok to patch the addListener after construction only. Because if we would patch
        //    the prototype one and the createServer method, we would wrap the handler twice
        //    in case of the constructor call.
        var wrapServerEventHandler = function (server) {
            var originalAddListener = server.addListener.bind(server);
            server.addListener = function (eventType, eventHandler) {
                switch (eventType) {
                    case 'request':
                    case 'checkContinue':
                        return originalAddListener(eventType, wrapOnRequestHandler(eventHandler));
                    default:
                        return originalAddListener(eventType, eventHandler);
                }
            };
            // on is an alias to addListener only
            server.on = server.addListener;
        };
        var originalHttpServer = http.createServer;
        http.createServer = function (onRequest) {
            // todo: get a pointer to the server so the IP address can be read from server.address
            var server = originalHttpServer(wrapOnRequestHandler(onRequest));
            wrapServerEventHandler(server);
            return server;
        };
        var originalHttpsServer = https.createServer;
        https.createServer = function (options, onRequest) {
            var server = originalHttpsServer(options, wrapOnRequestHandler(onRequest));
            wrapServerEventHandler(server);
            return server;
        };
    };
    /**
     * Tracks a request synchronously (doesn't wait for response 'finish' event)
     */
    AutoCollectHttpRequests.trackRequestSync = function (client, telemetry) {
        if (!telemetry.request || !telemetry.response || !client) {
            Logging.info("AutoCollectHttpRequests.trackRequestSync was called with invalid parameters: ", !telemetry.request, !telemetry.response, !client);
            return;
        }
        AutoCollectHttpRequests.addResponseCorrelationIdHeader(client, telemetry.response);
        // store data about the request
        var correlationContext = CorrelationContextManager_1.CorrelationContextManager.getCurrentContext();
        var requestParser = new HttpRequestParser(telemetry.request, (correlationContext && correlationContext.operation.parentId));
        // Overwrite correlation context with request parser results
        if (correlationContext) {
            correlationContext.operation.id = requestParser.getOperationId(client.context.tags) || correlationContext.operation.id;
            correlationContext.operation.name = requestParser.getOperationName(client.context.tags) || correlationContext.operation.name;
            correlationContext.operation.parentId = requestParser.getRequestId() || correlationContext.operation.parentId;
            correlationContext.customProperties.addHeaderData(requestParser.getCorrelationContextHeader());
        }
        AutoCollectHttpRequests.endRequest(client, requestParser, telemetry, telemetry.duration, telemetry.error);
    };
    /**
     * Tracks a request by listening to the response 'finish' event
     */
    AutoCollectHttpRequests.trackRequest = function (client, telemetry, _requestParser) {
        if (!telemetry.request || !telemetry.response || !client) {
            Logging.info("AutoCollectHttpRequests.trackRequest was called with invalid parameters: ", !telemetry.request, !telemetry.response, !client);
            return;
        }
        // store data about the request
        var correlationContext = CorrelationContextManager_1.CorrelationContextManager.getCurrentContext();
        var requestParser = _requestParser || new HttpRequestParser(telemetry.request, correlationContext && correlationContext.operation.parentId);
        if (Util.canIncludeCorrelationHeader(client, requestParser.getUrl())) {
            AutoCollectHttpRequests.addResponseCorrelationIdHeader(client, telemetry.response);
        }
        // Overwrite correlation context with request parser results (if not an automatic track. we've already precalculated the correlation context in that case)
        if (correlationContext && !_requestParser) {
            correlationContext.operation.id = requestParser.getOperationId(client.context.tags) || correlationContext.operation.id;
            correlationContext.operation.name = requestParser.getOperationName(client.context.tags) || correlationContext.operation.name;
            correlationContext.operation.parentId = requestParser.getOperationParentId(client.context.tags) || correlationContext.operation.parentId;
            correlationContext.customProperties.addHeaderData(requestParser.getCorrelationContextHeader());
        }
        // response listeners
        if (telemetry.response.once) {
            telemetry.response.once("finish", function () {
                AutoCollectHttpRequests.endRequest(client, requestParser, telemetry, null, null);
            });
        }
        // track a failed request if an error is emitted
        if (telemetry.request.on) {
            telemetry.request.on("error", function (error) {
                AutoCollectHttpRequests.endRequest(client, requestParser, telemetry, null, error);
            });
        }
    };
    /**
     * Add the target correlationId to the response headers, if not already provided.
     */
    AutoCollectHttpRequests.addResponseCorrelationIdHeader = function (client, response) {
        if (client.config && client.config.correlationId &&
            response.getHeader && response.setHeader && !response.headersSent) {
            var correlationHeader = response.getHeader(RequestResponseHeaders.requestContextHeader);
            Util.safeIncludeCorrelationHeader(client, response, correlationHeader);
        }
    };
    AutoCollectHttpRequests.endRequest = function (client, requestParser, telemetry, ellapsedMilliseconds, error) {
        if (error) {
            requestParser.onError(error, ellapsedMilliseconds);
        }
        else {
            requestParser.onResponse(telemetry.response, ellapsedMilliseconds);
        }
        var requestTelemetry = requestParser.getRequestTelemetry(telemetry);
        requestTelemetry.tagOverrides = requestParser.getRequestTags(client.context.tags);
        if (telemetry.tagOverrides) {
            for (var key in telemetry.tagOverrides) {
                requestTelemetry.tagOverrides[key] = telemetry.tagOverrides[key];
            }
        }
        var legacyRootId = requestParser.getLegacyRootId();
        if (legacyRootId) {
            requestTelemetry.properties["ai_legacyRootId"] = legacyRootId;
        }
        requestTelemetry.contextObjects = requestTelemetry.contextObjects || {};
        requestTelemetry.contextObjects["http.ServerRequest"] = telemetry.request;
        requestTelemetry.contextObjects["http.ServerResponse"] = telemetry.response;
        client.trackRequest(requestTelemetry);
    };
    AutoCollectHttpRequests.prototype.dispose = function () {
        AutoCollectHttpRequests.INSTANCE = null;
        this.enable(false);
        this._isInitialized = false;
        CorrelationContextManager_1.CorrelationContextManager.disable();
        this._isAutoCorrelating = false;
    };
    AutoCollectHttpRequests.alreadyAutoCollectedFlag = '_appInsightsAutoCollected';
    return AutoCollectHttpRequests;
}());
module.exports = AutoCollectHttpRequests;
//# sourceMappingURL=HttpRequests.js.map

/***/ }),

/***/ 7597:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Config = __webpack_require__(5499);
var Context = __webpack_require__(2463);
var Logging = __webpack_require__(4652);
var AutoCollectNativePerformance = (function () {
    function AutoCollectNativePerformance(client) {
        this._disabledMetrics = {};
        // Note: Only 1 instance of this can exist. So when we reconstruct this object,
        // just disable old native instance and reset JS member variables
        if (AutoCollectNativePerformance.INSTANCE) {
            AutoCollectNativePerformance.INSTANCE.dispose();
        }
        AutoCollectNativePerformance.INSTANCE = this;
        this._client = client;
    }
    /**
     *  Reports if NativePerformance is able to run in this environment
     */
    AutoCollectNativePerformance.isNodeVersionCompatible = function () {
        var nodeVer = process.versions.node.split(".");
        return parseInt(nodeVer[0]) >= 6;
    };
    /**
     * Start instance of native metrics agent.
     *
     * @param {boolean} isEnabled
     * @param {number} [collectionInterval=60000]
     * @memberof AutoCollectNativePerformance
     */
    AutoCollectNativePerformance.prototype.enable = function (isEnabled, disabledMetrics, collectionInterval) {
        var _this = this;
        if (disabledMetrics === void 0) { disabledMetrics = {}; }
        if (collectionInterval === void 0) { collectionInterval = 60000; }
        if (!AutoCollectNativePerformance.isNodeVersionCompatible()) {
            return;
        }
        if (AutoCollectNativePerformance._metricsAvailable == undefined && isEnabled && !this._isInitialized) {
            // Try to require in the native-metrics library. If it's found initialize it, else do nothing and never try again.
            try {
                var NativeMetricsEmitters = __webpack_require__(3342);
                AutoCollectNativePerformance._emitter = new NativeMetricsEmitters();
                AutoCollectNativePerformance._metricsAvailable = true;
                Logging.info("Native metrics module successfully loaded!");
            }
            catch (err) {
                // Package not available. Never try again
                AutoCollectNativePerformance._metricsAvailable = false;
                return;
            }
        }
        this._isEnabled = isEnabled;
        this._disabledMetrics = disabledMetrics;
        if (this._isEnabled && !this._isInitialized) {
            this._isInitialized = true;
        }
        // Enable the emitter if we were able to construct one
        if (this._isEnabled && AutoCollectNativePerformance._emitter) {
            // enable self
            AutoCollectNativePerformance._emitter.enable(true, collectionInterval);
            this._handle = setInterval(function () { return _this._trackNativeMetrics(); }, collectionInterval);
            this._handle.unref();
        }
        else if (AutoCollectNativePerformance._emitter) {
            // disable self
            AutoCollectNativePerformance._emitter.enable(false);
            if (this._handle) {
                clearInterval(this._handle);
                this._handle = undefined;
            }
        }
    };
    /**
     * Cleanup this instance of AutoCollectNativePerformance
     *
     * @memberof AutoCollectNativePerformance
     */
    AutoCollectNativePerformance.prototype.dispose = function () {
        this.enable(false);
    };
    /**
     * Parse environment variable and overwrite isEnabled based on respective fields being set
     *
     * @private
     * @static
     * @param {(boolean | IDisabledExtendedMetrics)} collectExtendedMetrics
     * @returns {(boolean | IDisabledExtendedMetrics)}
     * @memberof AutoCollectNativePerformance
     */
    AutoCollectNativePerformance.parseEnabled = function (collectExtendedMetrics) {
        var disableAll = process.env[Config.ENV_nativeMetricsDisableAll];
        var individualOptOuts = process.env[Config.ENV_nativeMetricsDisablers];
        // case 1: disable all env var set, RETURN with isEnabled=false
        if (disableAll) {
            return { isEnabled: false, disabledMetrics: {} };
        }
        // case 2: individual env vars set, RETURN with isEnabled=true, disabledMetrics={...}
        if (individualOptOuts) {
            var optOutsArr = individualOptOuts.split(",");
            var disabledMetrics = {};
            if (optOutsArr.length > 0) {
                for (var _i = 0, optOutsArr_1 = optOutsArr; _i < optOutsArr_1.length; _i++) {
                    var opt = optOutsArr_1[_i];
                    disabledMetrics[opt] = true;
                }
            }
            // case 2a: collectExtendedMetrics is an object, overwrite existing ones if they exist
            if (typeof collectExtendedMetrics === "object") {
                return { isEnabled: true, disabledMetrics: __assign({}, collectExtendedMetrics, disabledMetrics) };
            }
            // case 2b: collectExtendedMetrics is a boolean, set disabledMetrics as is
            return { isEnabled: collectExtendedMetrics, disabledMetrics: disabledMetrics };
        }
        // case 4: no env vars set, input arg is a boolean, RETURN with isEnabled=collectExtendedMetrics, disabledMetrics={}
        if (typeof collectExtendedMetrics === "boolean") {
            return { isEnabled: collectExtendedMetrics, disabledMetrics: {} };
        }
        else {
            // case 5: no env vars set, input arg is object, RETURN with isEnabled=true, disabledMetrics=collectExtendedMetrics
            return { isEnabled: true, disabledMetrics: collectExtendedMetrics };
        }
    };
    /**
     * Trigger an iteration of native metrics collection
     *
     * @private
     * @memberof AutoCollectNativePerformance
     */
    AutoCollectNativePerformance.prototype._trackNativeMetrics = function () {
        var shouldSendAll = true;
        if (typeof this._isEnabled !== "object") {
            shouldSendAll = this._isEnabled;
        }
        if (shouldSendAll) {
            this._trackGarbageCollection();
            this._trackEventLoop();
            this._trackHeapUsage();
        }
    };
    /**
     * Tracks garbage collection stats for this interval. One custom metric is sent per type of garbage
     * collection that occurred during this collection interval.
     *
     * @private
     * @memberof AutoCollectNativePerformance
     */
    AutoCollectNativePerformance.prototype._trackGarbageCollection = function () {
        if (this._disabledMetrics.gc) {
            return;
        }
        var gcData = AutoCollectNativePerformance._emitter.getGCData();
        for (var gc in gcData) {
            var metrics = gcData[gc].metrics;
            var name_1 = gc + " Garbage Collection Duration";
            var stdDev = Math.sqrt(metrics.sumSquares / metrics.count - Math.pow(metrics.total / metrics.count, 2)) || 0;
            this._client.trackMetric({
                name: name_1,
                value: metrics.total,
                count: metrics.count,
                max: metrics.max,
                min: metrics.min,
                stdDev: stdDev,
                tagOverrides: (_a = {},
                    _a[this._client.context.keys.internalSdkVersion] = "node-nativeperf:" + Context.sdkVersion,
                    _a)
            });
        }
        var _a;
    };
    /**
     * Tracks event loop ticks per interval as a custom metric. Also included in the metric is min/max/avg
     * time spent in event loop for this interval.
     *
     * @private
     * @returns {void}
     * @memberof AutoCollectNativePerformance
     */
    AutoCollectNativePerformance.prototype._trackEventLoop = function () {
        if (this._disabledMetrics.loop) {
            return;
        }
        var loopData = AutoCollectNativePerformance._emitter.getLoopData();
        var metrics = loopData.loopUsage;
        if (metrics.count == 0) {
            return;
        }
        var name = "Event Loop CPU Time";
        var stdDev = Math.sqrt(metrics.sumSquares / metrics.count - Math.pow(metrics.total / metrics.count, 2)) || 0;
        this._client.trackMetric({
            name: name,
            value: metrics.total,
            count: metrics.count,
            min: metrics.min,
            max: metrics.max,
            stdDev: stdDev,
            tagOverrides: (_a = {},
                _a[this._client.context.keys.internalSdkVersion] = "node-nativeperf:" + Context.sdkVersion,
                _a)
        });
        var _a;
    };
    /**
     * Track heap memory usage metrics as a custom metric.
     *
     * @private
     * @memberof AutoCollectNativePerformance
     */
    AutoCollectNativePerformance.prototype._trackHeapUsage = function () {
        if (this._disabledMetrics.heap) {
            return;
        }
        var memoryUsage = process.memoryUsage();
        var heapUsed = memoryUsage.heapUsed, heapTotal = memoryUsage.heapTotal, rss = memoryUsage.rss;
        this._client.trackMetric({
            name: "Memory Usage (Heap)",
            value: heapUsed,
            count: 1,
            tagOverrides: (_a = {},
                _a[this._client.context.keys.internalSdkVersion] = "node-nativeperf:" + Context.sdkVersion,
                _a)
        });
        this._client.trackMetric({
            name: "Memory Total (Heap)",
            value: heapTotal,
            count: 1,
            tagOverrides: (_b = {},
                _b[this._client.context.keys.internalSdkVersion] = "node-nativeperf:" + Context.sdkVersion,
                _b)
        });
        this._client.trackMetric({
            name: "Memory Usage (Non-Heap)",
            value: rss - heapTotal,
            count: 1,
            tagOverrides: (_c = {},
                _c[this._client.context.keys.internalSdkVersion] = "node-nativeperf:" + Context.sdkVersion,
                _c)
        });
        var _a, _b, _c;
    };
    return AutoCollectNativePerformance;
}());
exports.AutoCollectNativePerformance = AutoCollectNativePerformance;
//# sourceMappingURL=NativePerformance.js.map

/***/ }),

/***/ 1177:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var os = __webpack_require__(2087);
var Constants = __webpack_require__(9722);
var AutoCollectPerformance = (function () {
    /**
     * @param enableLiveMetricsCounters - enable sending additional live metrics information (dependency metrics, exception metrics, committed memory)
     */
    function AutoCollectPerformance(client, collectionInterval, enableLiveMetricsCounters) {
        if (collectionInterval === void 0) { collectionInterval = 60000; }
        if (enableLiveMetricsCounters === void 0) { enableLiveMetricsCounters = false; }
        this._lastIntervalRequestExecutionTime = 0; // the sum of durations which took place during from app start until last interval
        this._lastIntervalDependencyExecutionTime = 0;
        if (!AutoCollectPerformance.INSTANCE) {
            AutoCollectPerformance.INSTANCE = this;
        }
        this._isInitialized = false;
        this._client = client;
        this._collectionInterval = collectionInterval;
        this._enableLiveMetricsCounters = enableLiveMetricsCounters;
    }
    AutoCollectPerformance.prototype.enable = function (isEnabled, collectionInterval) {
        var _this = this;
        this._isEnabled = isEnabled;
        if (this._isEnabled && !this._isInitialized) {
            this._isInitialized = true;
        }
        if (isEnabled) {
            if (!this._handle) {
                this._lastCpus = os.cpus();
                this._lastRequests = {
                    totalRequestCount: AutoCollectPerformance._totalRequestCount,
                    totalFailedRequestCount: AutoCollectPerformance._totalFailedRequestCount,
                    time: +new Date
                };
                this._lastDependencies = {
                    totalDependencyCount: AutoCollectPerformance._totalDependencyCount,
                    totalFailedDependencyCount: AutoCollectPerformance._totalFailedDependencyCount,
                    time: +new Date
                };
                this._lastExceptions = {
                    totalExceptionCount: AutoCollectPerformance._totalExceptionCount,
                    time: +new Date
                };
                if (typeof process.cpuUsage === 'function') {
                    this._lastAppCpuUsage = process.cpuUsage();
                }
                this._lastHrtime = process.hrtime();
                this._collectionInterval = collectionInterval || this._collectionInterval;
                this._handle = setInterval(function () { return _this.trackPerformance(); }, this._collectionInterval);
                this._handle.unref(); // Allow the app to terminate even while this loop is going on
            }
        }
        else {
            if (this._handle) {
                clearInterval(this._handle);
                this._handle = undefined;
            }
        }
    };
    AutoCollectPerformance.countRequest = function (duration, success) {
        var durationMs;
        if (!AutoCollectPerformance.isEnabled()) {
            return;
        }
        if (typeof duration === 'string') {
            // dependency duration is passed in as "00:00:00.123" by autocollectors
            durationMs = +new Date('1970-01-01T' + duration + 'Z'); // convert to num ms, returns NaN if wrong
        }
        else if (typeof duration === 'number') {
            durationMs = duration;
        }
        else {
            return;
        }
        AutoCollectPerformance._intervalRequestExecutionTime += durationMs;
        if (success === false) {
            AutoCollectPerformance._totalFailedRequestCount++;
        }
        AutoCollectPerformance._totalRequestCount++;
    };
    AutoCollectPerformance.countException = function () {
        AutoCollectPerformance._totalExceptionCount++;
    };
    AutoCollectPerformance.countDependency = function (duration, success) {
        var durationMs;
        if (!AutoCollectPerformance.isEnabled()) {
            return;
        }
        if (typeof duration === 'string') {
            // dependency duration is passed in as "00:00:00.123" by autocollectors
            durationMs = +new Date('1970-01-01T' + duration + 'Z'); // convert to num ms, returns NaN if wrong
        }
        else if (typeof duration === 'number') {
            durationMs = duration;
        }
        else {
            return;
        }
        AutoCollectPerformance._intervalDependencyExecutionTime += durationMs;
        if (success === false) {
            AutoCollectPerformance._totalFailedDependencyCount++;
        }
        AutoCollectPerformance._totalDependencyCount++;
    };
    AutoCollectPerformance.prototype.isInitialized = function () {
        return this._isInitialized;
    };
    AutoCollectPerformance.isEnabled = function () {
        return AutoCollectPerformance.INSTANCE && AutoCollectPerformance.INSTANCE._isEnabled;
    };
    AutoCollectPerformance.prototype.trackPerformance = function () {
        this._trackCpu();
        this._trackMemory();
        this._trackNetwork();
        this._trackDependencyRate();
        this._trackExceptionRate();
    };
    AutoCollectPerformance.prototype._trackCpu = function () {
        // this reports total ms spent in each category since the OS was booted, to calculate percent it is necessary
        // to find the delta since the last measurement
        var cpus = os.cpus();
        if (cpus && cpus.length && this._lastCpus && cpus.length === this._lastCpus.length) {
            var totalUser = 0;
            var totalSys = 0;
            var totalNice = 0;
            var totalIdle = 0;
            var totalIrq = 0;
            for (var i = 0; !!cpus && i < cpus.length; i++) {
                var cpu = cpus[i];
                var lastCpu = this._lastCpus[i];
                var name = "% cpu(" + i + ") ";
                var model = cpu.model;
                var speed = cpu.speed;
                var times = cpu.times;
                var lastTimes = lastCpu.times;
                // user cpu time (or) % CPU time spent in user space
                var user = (times.user - lastTimes.user) || 0;
                totalUser += user;
                // system cpu time (or) % CPU time spent in kernel space
                var sys = (times.sys - lastTimes.sys) || 0;
                totalSys += sys;
                // user nice cpu time (or) % CPU time spent on low priority processes
                var nice = (times.nice - lastTimes.nice) || 0;
                totalNice += nice;
                // idle cpu time (or) % CPU time spent idle
                var idle = (times.idle - lastTimes.idle) || 0;
                totalIdle += idle;
                // irq (or) % CPU time spent servicing/handling hardware interrupts
                var irq = (times.irq - lastTimes.irq) || 0;
                totalIrq += irq;
            }
            // Calculate % of total cpu time (user + system) this App Process used (Only supported by node v6.1.0+)
            var appCpuPercent = undefined;
            if (typeof process.cpuUsage === 'function') {
                var appCpuUsage = process.cpuUsage();
                var hrtime = process.hrtime();
                var totalApp = ((appCpuUsage.user - this._lastAppCpuUsage.user) + (appCpuUsage.system - this._lastAppCpuUsage.system)) || 0;
                if (typeof this._lastHrtime !== 'undefined' && this._lastHrtime.length === 2) {
                    var elapsedTime = ((hrtime[0] - this._lastHrtime[0]) * 1e6 + (hrtime[1] - this._lastHrtime[1]) / 1e3) || 0; // convert to microseconds
                    appCpuPercent = 100 * totalApp / (elapsedTime * cpus.length);
                }
                // Set previous
                this._lastAppCpuUsage = appCpuUsage;
                this._lastHrtime = hrtime;
            }
            var combinedTotal = (totalUser + totalSys + totalNice + totalIdle + totalIrq) || 1;
            this._client.trackMetric({ name: Constants.PerformanceCounter.PROCESSOR_TIME, value: ((combinedTotal - totalIdle) / combinedTotal) * 100 });
            this._client.trackMetric({ name: Constants.PerformanceCounter.PROCESS_TIME, value: appCpuPercent || ((totalUser / combinedTotal) * 100) });
        }
        this._lastCpus = cpus;
    };
    AutoCollectPerformance.prototype._trackMemory = function () {
        var freeMem = os.freemem();
        var usedMem = process.memoryUsage().rss;
        var committedMemory = os.totalmem() - freeMem;
        this._client.trackMetric({ name: Constants.PerformanceCounter.PRIVATE_BYTES, value: usedMem });
        this._client.trackMetric({ name: Constants.PerformanceCounter.AVAILABLE_BYTES, value: freeMem });
        // Only supported by quickpulse service
        if (this._enableLiveMetricsCounters) {
            this._client.trackMetric({ name: Constants.QuickPulseCounter.COMMITTED_BYTES, value: committedMemory });
        }
    };
    AutoCollectPerformance.prototype._trackNetwork = function () {
        // track total request counters
        var lastRequests = this._lastRequests;
        var requests = {
            totalRequestCount: AutoCollectPerformance._totalRequestCount,
            totalFailedRequestCount: AutoCollectPerformance._totalFailedRequestCount,
            time: +new Date
        };
        var intervalRequests = (requests.totalRequestCount - lastRequests.totalRequestCount) || 0;
        var intervalFailedRequests = (requests.totalFailedRequestCount - lastRequests.totalFailedRequestCount) || 0;
        var elapsedMs = requests.time - lastRequests.time;
        var elapsedSeconds = elapsedMs / 1000;
        var averageRequestExecutionTime = ((AutoCollectPerformance._intervalRequestExecutionTime - this._lastIntervalRequestExecutionTime) / intervalRequests) || 0; // default to 0 in case no requests in this interval
        this._lastIntervalRequestExecutionTime = AutoCollectPerformance._intervalRequestExecutionTime; // reset
        if (elapsedMs > 0) {
            var requestsPerSec = intervalRequests / elapsedSeconds;
            var failedRequestsPerSec = intervalFailedRequests / elapsedSeconds;
            this._client.trackMetric({ name: Constants.PerformanceCounter.REQUEST_RATE, value: requestsPerSec });
            // Only send duration to live metrics if it has been updated!
            if (!this._enableLiveMetricsCounters || intervalRequests > 0) {
                this._client.trackMetric({ name: Constants.PerformanceCounter.REQUEST_DURATION, value: averageRequestExecutionTime });
            }
            // Only supported by quickpulse service
            if (this._enableLiveMetricsCounters) {
                this._client.trackMetric({ name: Constants.QuickPulseCounter.REQUEST_FAILURE_RATE, value: failedRequestsPerSec });
            }
        }
        this._lastRequests = requests;
    };
    // Static counter is accumulated externally. Report the rate to client here
    // Note: This is currently only used with QuickPulse client
    AutoCollectPerformance.prototype._trackDependencyRate = function () {
        if (this._enableLiveMetricsCounters) {
            var lastDependencies = this._lastDependencies;
            var dependencies = {
                totalDependencyCount: AutoCollectPerformance._totalDependencyCount,
                totalFailedDependencyCount: AutoCollectPerformance._totalFailedDependencyCount,
                time: +new Date
            };
            var intervalDependencies = (dependencies.totalDependencyCount - lastDependencies.totalDependencyCount) || 0;
            var intervalFailedDependencies = (dependencies.totalFailedDependencyCount - lastDependencies.totalFailedDependencyCount) || 0;
            var elapsedMs = dependencies.time - lastDependencies.time;
            var elapsedSeconds = elapsedMs / 1000;
            var averageDependencyExecutionTime = ((AutoCollectPerformance._intervalDependencyExecutionTime - this._lastIntervalDependencyExecutionTime) / intervalDependencies) || 0;
            this._lastIntervalDependencyExecutionTime = AutoCollectPerformance._intervalDependencyExecutionTime; // reset
            if (elapsedMs > 0) {
                var dependenciesPerSec = intervalDependencies / elapsedSeconds;
                var failedDependenciesPerSec = intervalFailedDependencies / elapsedSeconds;
                this._client.trackMetric({ name: Constants.QuickPulseCounter.DEPENDENCY_RATE, value: dependenciesPerSec });
                this._client.trackMetric({ name: Constants.QuickPulseCounter.DEPENDENCY_FAILURE_RATE, value: failedDependenciesPerSec });
                // redundant check for livemetrics, but kept for consistency w/ requests
                // Only send duration to live metrics if it has been updated!
                if (!this._enableLiveMetricsCounters || intervalDependencies > 0) {
                    this._client.trackMetric({ name: Constants.QuickPulseCounter.DEPENDENCY_DURATION, value: averageDependencyExecutionTime });
                }
            }
            this._lastDependencies = dependencies;
        }
    };
    // Static counter is accumulated externally. Report the rate to client here
    // Note: This is currently only used with QuickPulse client
    AutoCollectPerformance.prototype._trackExceptionRate = function () {
        if (this._enableLiveMetricsCounters) {
            var lastExceptions = this._lastExceptions;
            var exceptions = {
                totalExceptionCount: AutoCollectPerformance._totalExceptionCount,
                time: +new Date
            };
            var intervalExceptions = (exceptions.totalExceptionCount - lastExceptions.totalExceptionCount) || 0;
            var elapsedMs = exceptions.time - lastExceptions.time;
            var elapsedSeconds = elapsedMs / 1000;
            if (elapsedMs > 0) {
                var exceptionsPerSec = intervalExceptions / elapsedSeconds;
                this._client.trackMetric({ name: Constants.QuickPulseCounter.EXCEPTION_RATE, value: exceptionsPerSec });
            }
            this._lastExceptions = exceptions;
        }
    };
    AutoCollectPerformance.prototype.dispose = function () {
        AutoCollectPerformance.INSTANCE = null;
        this.enable(false);
        this._isInitialized = false;
    };
    AutoCollectPerformance._totalRequestCount = 0;
    AutoCollectPerformance._totalFailedRequestCount = 0;
    AutoCollectPerformance._lastRequestExecutionTime = 0;
    AutoCollectPerformance._totalDependencyCount = 0;
    AutoCollectPerformance._totalFailedDependencyCount = 0;
    AutoCollectPerformance._lastDependencyExecutionTime = 0;
    AutoCollectPerformance._totalExceptionCount = 0;
    AutoCollectPerformance._intervalDependencyExecutionTime = 0;
    AutoCollectPerformance._intervalRequestExecutionTime = 0;
    return AutoCollectPerformance;
}());
module.exports = AutoCollectPerformance;
//# sourceMappingURL=Performance.js.map

/***/ }),

/***/ 426:
/***/ ((module) => {

"use strict";

/**
 * Base class for helpers that read data from HTTP request/response objects and convert them
 * into the telemetry contract objects.
 */
var RequestParser = (function () {
    function RequestParser() {
    }
    /**
     * Gets a url parsed out from request options
     */
    RequestParser.prototype.getUrl = function () {
        return this.url;
    };
    RequestParser.prototype.RequestParser = function () {
        this.startTime = +new Date();
    };
    RequestParser.prototype._setStatus = function (status, error) {
        var endTime = +new Date();
        this.duration = endTime - this.startTime;
        this.statusCode = status;
        var properties = this.properties || {};
        if (error) {
            if (typeof error === "string") {
                properties["error"] = error;
            }
            else if (error instanceof Error) {
                properties["error"] = error.message;
            }
            else if (typeof error === "object") {
                for (var key in error) {
                    properties[key] = error[key] && error[key].toString && error[key].toString();
                }
            }
        }
        this.properties = properties;
    };
    RequestParser.prototype._isSuccess = function () {
        return (0 < this.statusCode) && (this.statusCode < 400);
    };
    return RequestParser;
}());
module.exports = RequestParser;
//# sourceMappingURL=RequestParser.js.map

/***/ }),

/***/ 6592:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
var AsyncHooksScopeManager_1 = __webpack_require__(8329);
var Constants = __webpack_require__(9722);
function filterSpanAttributes(attributes) {
    var newAttributes = __assign({}, attributes);
    Object.keys(Constants.SpanAttribute).forEach(function (key) {
        delete newAttributes[key];
    });
    return newAttributes;
}
function spanToTelemetryContract(span) {
    var id = "|" + span.context().traceId + "." + span.context().spanId + ".";
    var duration = Math.round(span._duration[0] * 1e3 + span._duration[1] / 1e6);
    var isHttp = ((span.attributes.component || "").toUpperCase() === Constants.DependencyTypeName.Http) || (!!span.attributes[Constants.SpanAttribute.HttpUrl]);
    var isGrpc = (span.attributes.component || "").toLowerCase() === Constants.DependencyTypeName.Grpc;
    if (isHttp) {
        // Read http span attributes
        var method = span.attributes[Constants.SpanAttribute.HttpMethod] || "GET";
        var url = new URL(span.attributes[Constants.SpanAttribute.HttpUrl]);
        var host = span.attributes[Constants.SpanAttribute.HttpHost] || url.host;
        var port = span.attributes[Constants.SpanAttribute.HttpPort] || url.port || null;
        var pathname = url.pathname || "/";
        // Translate to AI Dependency format
        var name_1 = method + " " + pathname;
        var dependencyTypeName = Constants.DependencyTypeName.Http;
        var target = port ? host + ":" + port : host;
        var data = url.toString();
        var resultCode = span.attributes[Constants.SpanAttribute.HttpStatusCode] || span.status.code || 0;
        var success = resultCode < 400; // Status.OK
        return {
            id: id, name: name_1, dependencyTypeName: dependencyTypeName,
            target: target, data: data,
            success: success, duration: duration,
            url: data,
            resultCode: String(resultCode),
            properties: filterSpanAttributes(span.attributes)
        };
    }
    else if (isGrpc) {
        var method = span.attributes[Constants.SpanAttribute.GrpcMethod] || "rpc";
        var service = span.attributes[Constants.SpanAttribute.GrpcService];
        var name_2 = service ? method + " " + service : span.name;
        return {
            id: id, duration: duration, name: name_2,
            target: service,
            data: service || name_2,
            url: service || name_2,
            dependencyTypeName: Constants.DependencyTypeName.Grpc,
            resultCode: String(span.status.code || 0),
            success: span.status.code === 0,
            properties: filterSpanAttributes(span.attributes),
        };
    }
    else {
        var name_3 = span.name;
        var links = span.links && span.links.map(function (link) {
            return {
                operation_Id: link.spanContext.traceId,
                id: link.spanContext.spanId
            };
        });
        return {
            id: id, duration: duration, name: name_3,
            target: span.attributes["peer.address"],
            data: span.attributes["peer.address"] || name_3,
            url: span.attributes["peer.address"] || name_3,
            dependencyTypeName: span.kind === AsyncHooksScopeManager_1.SpanKind.INTERNAL ? Constants.DependencyTypeName.InProc : (span.attributes.component || span.name),
            resultCode: String(span.status.code || 0),
            success: span.status.code === 0,
            properties: __assign({}, filterSpanAttributes(span.attributes), { "_MS.links": links || undefined }),
        };
    }
}
exports.spanToTelemetryContract = spanToTelemetryContract;
//# sourceMappingURL=SpanParser.js.map

/***/ }),

/***/ 3405:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
var diagnostic_channel_1 = __webpack_require__(7235);
var Traceparent = __webpack_require__(2185);
var SpanParser = __webpack_require__(6592);
var AsyncHooksScopeManager_1 = __webpack_require__(8329);
var clients = [];
exports.qP = function (event) {
    var span = event.data;
    var telemetry = SpanParser.spanToTelemetryContract(span);
    var spanContext = span.context();
    var traceparent = new Traceparent();
    traceparent.traceId = spanContext.traceId;
    traceparent.spanId = spanContext.spanId;
    traceparent.traceFlag = spanContext.traceFlags.toString();
    traceparent.parentId = span.parentSpanId ? "|" + spanContext.traceId + "." + span.parentSpanId + "." : null;
    AsyncHooksScopeManager_1.AsyncScopeManager.with(span, function () {
        clients.forEach(function (client) {
            if (span.kind === AsyncHooksScopeManager_1.SpanKind.SERVER) {
                // Server or Consumer
                client.trackRequest(telemetry);
            }
            else if (span.kind === AsyncHooksScopeManager_1.SpanKind.CLIENT || span.kind === AsyncHooksScopeManager_1.SpanKind.INTERNAL) {
                // Client or Producer or Internal
                client.trackDependency(telemetry);
            }
            // else - ignore producer/consumer spans for now until it is clear how this sdk should interpret them
        });
    });
};
function enable(enabled, client) {
    if (enabled) {
        if (clients.length === 0) {
            diagnostic_channel_1.channel.subscribe("azure-coretracing", exports.qP);
        }
        ;
        clients.push(client);
    }
    else {
        clients = clients.filter(function (c) { return c != client; });
        if (clients.length === 0) {
            diagnostic_channel_1.channel.unsubscribe("azure-coretracing", exports.qP);
        }
    }
}
exports.wp = enable;
//# sourceMappingURL=azure-coretracing.sub.js.map

/***/ }),

/***/ 5688:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
var Contracts_1 = __webpack_require__(5312);
var diagnostic_channel_1 = __webpack_require__(7235);
var clients = [];
// Mapping from bunyan levels defined at https://github.com/trentm/node-bunyan/blob/master/lib/bunyan.js#L256
var bunyanToAILevelMap = {
    10: Contracts_1.SeverityLevel.Verbose,
    20: Contracts_1.SeverityLevel.Verbose,
    30: Contracts_1.SeverityLevel.Information,
    40: Contracts_1.SeverityLevel.Warning,
    50: Contracts_1.SeverityLevel.Error,
    60: Contracts_1.SeverityLevel.Critical,
};
var subscriber = function (event) {
    var message = event.data.result;
    clients.forEach(function (client) {
        var AIlevel = bunyanToAILevelMap[event.data.level];
        if (message instanceof Error) {
            client.trackException({ exception: (message) });
        }
        else {
            client.trackTrace({ message: message, severity: AIlevel });
        }
    });
};
function enable(enabled, client) {
    if (enabled) {
        if (clients.length === 0) {
            diagnostic_channel_1.channel.subscribe("bunyan", subscriber);
        }
        ;
        clients.push(client);
    }
    else {
        clients = clients.filter(function (c) { return c != client; });
        if (clients.length === 0) {
            diagnostic_channel_1.channel.unsubscribe("bunyan", subscriber);
        }
    }
}
exports.wp = enable;
function dispose() {
    diagnostic_channel_1.channel.unsubscribe("bunyan", subscriber);
    clients = [];
}
__webpack_unused_export__ = dispose;
//# sourceMappingURL=bunyan.sub.js.map

/***/ }),

/***/ 2617:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
var Contracts_1 = __webpack_require__(5312);
var diagnostic_channel_1 = __webpack_require__(7235);
var clients = [];
var subscriber = function (event) {
    var message = event.data.message;
    clients.forEach(function (client) {
        if (message instanceof Error) {
            client.trackException({ exception: message });
        }
        else {
            // Message can have a trailing newline
            if (message.lastIndexOf("\n") == message.length - 1) {
                message = message.substring(0, message.length - 1);
            }
            client.trackTrace({ message: message, severity: (event.data.stderr ? Contracts_1.SeverityLevel.Warning : Contracts_1.SeverityLevel.Information) });
        }
    });
};
function enable(enabled, client) {
    if (enabled) {
        if (clients.length === 0) {
            diagnostic_channel_1.channel.subscribe("console", subscriber);
        }
        ;
        clients.push(client);
    }
    else {
        clients = clients.filter(function (c) { return c != client; });
        if (clients.length === 0) {
            diagnostic_channel_1.channel.unsubscribe("console", subscriber);
        }
    }
}
exports.wp = enable;
function dispose() {
    diagnostic_channel_1.channel.unsubscribe("console", subscriber);
    clients = [];
}
__webpack_unused_export__ = dispose;
//# sourceMappingURL=console.sub.js.map

/***/ }),

/***/ 9426:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
Object.defineProperty(exports, "__esModule", ({ value: true }));
var AsyncHooksScopeManager_1 = __webpack_require__(8329);
var Logging = __webpack_require__(4652);
exports.IsInitialized = !process.env["APPLICATION_INSIGHTS_NO_DIAGNOSTIC_CHANNEL"];
var TAG = "DiagnosticChannel";
if (exports.IsInitialized) {
    var publishers = __webpack_require__(6467);
    var individualOptOuts = process.env["APPLICATION_INSIGHTS_NO_PATCH_MODULES"] || "";
    var unpatchedModules = individualOptOuts.split(",");
    var modules = {
        bunyan: publishers.bunyan,
        console: publishers.console,
        mongodb: publishers.mongodb,
        mongodbCore: publishers.mongodbCore,
        mysql: publishers.mysql,
        redis: publishers.redis,
        pg: publishers.pg,
        pgPool: publishers.pgPool,
        winston: publishers.winston,
        azuresdk: publishers.azuresdk
    };
    for (var mod in modules) {
        if (unpatchedModules.indexOf(mod) === -1) {
            modules[mod].enable();
            Logging.info(TAG, "Subscribed to " + mod + " events");
        }
    }
    if (unpatchedModules.length > 0) {
        Logging.info(TAG, "Some modules will not be patched", unpatchedModules);
    }
}
else {
    Logging.info(TAG, "Not subscribing to dependency autocollection because APPLICATION_INSIGHTS_NO_DIAGNOSTIC_CHANNEL was set");
}
function registerContextPreservation(cb) {
    if (!exports.IsInitialized) {
        return;
    }
    var diagChannel = __webpack_require__(7235);
    diagChannel.channel.addContextPreservation(cb);
    diagChannel.channel.spanContextPropagator = AsyncHooksScopeManager_1.AsyncScopeManager;
}
exports.registerContextPreservation = registerContextPreservation;
//# sourceMappingURL=initialization.js.map

/***/ }),

/***/ 5096:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
var diagnostic_channel_1 = __webpack_require__(7235);
var clients = [];
exports.qP = function (event) {
    if (event.data.event.commandName === "ismaster") {
        // suppress noisy ismaster commands
        return;
    }
    clients.forEach(function (client) {
        var dbName = (event.data.startedData && event.data.startedData.databaseName) || "Unknown database";
        client.trackDependency({
            target: dbName,
            data: event.data.event.commandName,
            name: event.data.event.commandName,
            duration: event.data.event.duration,
            success: event.data.succeeded,
            /* TODO: transmit result code from mongo */
            resultCode: event.data.succeeded ? "0" : "1",
            time: event.data.startedData.time,
            dependencyTypeName: 'mongodb'
        });
    });
};
function enable(enabled, client) {
    if (enabled) {
        if (clients.length === 0) {
            diagnostic_channel_1.channel.subscribe("mongodb", exports.qP);
        }
        ;
        clients.push(client);
    }
    else {
        clients = clients.filter(function (c) { return c != client; });
        if (clients.length === 0) {
            diagnostic_channel_1.channel.unsubscribe("mongodb", exports.qP);
        }
    }
}
exports.wp = enable;
//# sourceMappingURL=mongodb.sub.js.map

/***/ }),

/***/ 8135:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
var diagnostic_channel_1 = __webpack_require__(7235);
var clients = [];
exports.qP = function (event) {
    clients.forEach(function (client) {
        var queryObj = event.data.query || {};
        var sqlString = queryObj.sql || "Unknown query";
        var success = !event.data.err;
        var connection = queryObj._connection || {};
        var connectionConfig = connection.config || {};
        var dbName = connectionConfig.socketPath ? connectionConfig.socketPath : (connectionConfig.host || "localhost") + ":" + connectionConfig.port;
        client.trackDependency({
            target: dbName,
            data: sqlString,
            name: sqlString,
            duration: event.data.duration,
            success: success,
            /* TODO: transmit result code from mysql */
            resultCode: success ? "0" : "1",
            time: event.data.time,
            dependencyTypeName: "mysql"
        });
    });
};
function enable(enabled, client) {
    if (enabled) {
        if (clients.length === 0) {
            diagnostic_channel_1.channel.subscribe("mysql", exports.qP);
        }
        ;
        clients.push(client);
    }
    else {
        clients = clients.filter(function (c) { return c != client; });
        if (clients.length === 0) {
            diagnostic_channel_1.channel.unsubscribe("mysql", exports.qP);
        }
    }
}
exports.wp = enable;
//# sourceMappingURL=mysql.sub.js.map

/***/ }),

/***/ 6054:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
var diagnostic_channel_1 = __webpack_require__(7235);
var clients = [];
exports.qP = function (event) {
    clients.forEach(function (client) {
        var q = event.data.query;
        var sql = (q.preparable && q.preparable.text) || q.plan || q.text || "unknown query";
        var success = !event.data.error;
        var conn = event.data.database.host + ":" + event.data.database.port;
        client.trackDependency({
            target: conn,
            data: sql,
            name: sql,
            duration: event.data.duration,
            success: success,
            resultCode: success ? "0" : "1",
            time: event.data.time,
            dependencyTypeName: "postgres"
        });
    });
};
function enable(enabled, client) {
    if (enabled) {
        if (clients.length === 0) {
            diagnostic_channel_1.channel.subscribe("postgres", exports.qP);
        }
        ;
        clients.push(client);
    }
    else {
        clients = clients.filter(function (c) { return c != client; });
        if (clients.length === 0) {
            diagnostic_channel_1.channel.unsubscribe("postgres", exports.qP);
        }
    }
}
exports.wp = enable;
//# sourceMappingURL=postgres.sub.js.map

/***/ }),

/***/ 2084:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
var diagnostic_channel_1 = __webpack_require__(7235);
var clients = [];
exports.qP = function (event) {
    clients.forEach(function (client) {
        if (event.data.commandObj.command === "info") {
            // We don't want to report 'info', it's irrelevant
            return;
        }
        client.trackDependency({
            target: event.data.address,
            name: event.data.commandObj.command,
            data: event.data.commandObj.command,
            duration: event.data.duration,
            success: !event.data.err,
            /* TODO: transmit result code from redis */
            resultCode: event.data.err ? "1" : "0",
            time: event.data.time,
            dependencyTypeName: "redis"
        });
    });
};
function enable(enabled, client) {
    if (enabled) {
        if (clients.length === 0) {
            diagnostic_channel_1.channel.subscribe("redis", exports.qP);
        }
        ;
        clients.push(client);
    }
    else {
        clients = clients.filter(function (c) { return c != client; });
        if (clients.length === 0) {
            diagnostic_channel_1.channel.unsubscribe("redis", exports.qP);
        }
    }
}
exports.wp = enable;
//# sourceMappingURL=redis.sub.js.map

/***/ }),

/***/ 7102:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
var Contracts_1 = __webpack_require__(5312);
var diagnostic_channel_1 = __webpack_require__(7235);
var clients = [];
var winstonToAILevelMap = {
    syslog: function (og) {
        var map = {
            emerg: Contracts_1.SeverityLevel.Critical,
            alert: Contracts_1.SeverityLevel.Critical,
            crit: Contracts_1.SeverityLevel.Critical,
            error: Contracts_1.SeverityLevel.Error,
            warning: Contracts_1.SeverityLevel.Warning,
            notice: Contracts_1.SeverityLevel.Information,
            info: Contracts_1.SeverityLevel.Information,
            debug: Contracts_1.SeverityLevel.Verbose
        };
        return map[og] === undefined ? Contracts_1.SeverityLevel.Information : map[og];
    },
    npm: function (og) {
        var map = {
            error: Contracts_1.SeverityLevel.Error,
            warn: Contracts_1.SeverityLevel.Warning,
            info: Contracts_1.SeverityLevel.Information,
            verbose: Contracts_1.SeverityLevel.Verbose,
            debug: Contracts_1.SeverityLevel.Verbose,
            silly: Contracts_1.SeverityLevel.Verbose
        };
        return map[og] === undefined ? Contracts_1.SeverityLevel.Information : map[og];
    },
    unknown: function (og) {
        return Contracts_1.SeverityLevel.Information;
    }
};
var subscriber = function (event) {
    var message = event.data.message;
    clients.forEach(function (client) {
        if (message instanceof Error) {
            client.trackException({
                exception: message,
                properties: event.data.meta
            });
        }
        else {
            var AIlevel = winstonToAILevelMap[event.data.levelKind](event.data.level);
            client.trackTrace({
                message: message,
                severity: AIlevel,
                properties: event.data.meta
            });
        }
    });
};
function enable(enabled, client) {
    if (enabled) {
        if (clients.length === 0) {
            diagnostic_channel_1.channel.subscribe("winston", subscriber);
        }
        ;
        clients.push(client);
    }
    else {
        clients = clients.filter(function (c) { return c != client; });
        if (clients.length === 0) {
            diagnostic_channel_1.channel.unsubscribe("winston", subscriber);
        }
    }
}
exports.wp = enable;
function dispose() {
    diagnostic_channel_1.channel.unsubscribe("winston", subscriber);
    clients = [];
}
__webpack_unused_export__ = dispose;
//# sourceMappingURL=winston.sub.js.map

/***/ }),

/***/ 9722:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DEFAULT_BREEZE_ENDPOINT = "https://dc.services.visualstudio.com";
exports.DEFAULT_LIVEMETRICS_ENDPOINT = "https://rt.services.visualstudio.com";
exports.DEFAULT_LIVEMETRICS_HOST = "rt.services.visualstudio.com";
var QuickPulseCounter;
(function (QuickPulseCounter) {
    // Memory
    QuickPulseCounter["COMMITTED_BYTES"] = "\\Memory\\Committed Bytes";
    // CPU
    QuickPulseCounter["PROCESSOR_TIME"] = "\\Processor(_Total)\\% Processor Time";
    // Request
    QuickPulseCounter["REQUEST_RATE"] = "\\ApplicationInsights\\Requests/Sec";
    QuickPulseCounter["REQUEST_FAILURE_RATE"] = "\\ApplicationInsights\\Requests Failed/Sec";
    QuickPulseCounter["REQUEST_DURATION"] = "\\ApplicationInsights\\Request Duration";
    // Dependency
    QuickPulseCounter["DEPENDENCY_RATE"] = "\\ApplicationInsights\\Dependency Calls/Sec";
    QuickPulseCounter["DEPENDENCY_FAILURE_RATE"] = "\\ApplicationInsights\\Dependency Calls Failed/Sec";
    QuickPulseCounter["DEPENDENCY_DURATION"] = "\\ApplicationInsights\\Dependency Call Duration";
    // Exception
    QuickPulseCounter["EXCEPTION_RATE"] = "\\ApplicationInsights\\Exceptions/Sec";
})(QuickPulseCounter = exports.QuickPulseCounter || (exports.QuickPulseCounter = {}));
var PerformanceCounter;
(function (PerformanceCounter) {
    // Memory
    PerformanceCounter["PRIVATE_BYTES"] = "\\Process(??APP_WIN32_PROC??)\\Private Bytes";
    PerformanceCounter["AVAILABLE_BYTES"] = "\\Memory\\Available Bytes";
    // CPU
    PerformanceCounter["PROCESSOR_TIME"] = "\\Processor(_Total)\\% Processor Time";
    PerformanceCounter["PROCESS_TIME"] = "\\Process(??APP_WIN32_PROC??)\\% Processor Time";
    // Requests
    PerformanceCounter["REQUEST_RATE"] = "\\ASP.NET Applications(??APP_W3SVC_PROC??)\\Requests/Sec";
    PerformanceCounter["REQUEST_DURATION"] = "\\ASP.NET Applications(??APP_W3SVC_PROC??)\\Request Execution Time";
})(PerformanceCounter = exports.PerformanceCounter || (exports.PerformanceCounter = {}));
;
/**
 * Map a PerformanceCounter/QuickPulseCounter to a QuickPulseCounter. If no mapping exists, mapping is *undefined*
 */
exports.PerformanceToQuickPulseCounter = (_a = {},
    _a[PerformanceCounter.PROCESSOR_TIME] = QuickPulseCounter.PROCESSOR_TIME,
    _a[PerformanceCounter.REQUEST_RATE] = QuickPulseCounter.REQUEST_RATE,
    _a[PerformanceCounter.REQUEST_DURATION] = QuickPulseCounter.REQUEST_DURATION,
    // Remap quick pulse only counters
    _a[QuickPulseCounter.COMMITTED_BYTES] = QuickPulseCounter.COMMITTED_BYTES,
    _a[QuickPulseCounter.REQUEST_FAILURE_RATE] = QuickPulseCounter.REQUEST_FAILURE_RATE,
    _a[QuickPulseCounter.DEPENDENCY_RATE] = QuickPulseCounter.DEPENDENCY_RATE,
    _a[QuickPulseCounter.DEPENDENCY_FAILURE_RATE] = QuickPulseCounter.DEPENDENCY_FAILURE_RATE,
    _a[QuickPulseCounter.DEPENDENCY_DURATION] = QuickPulseCounter.DEPENDENCY_DURATION,
    _a[QuickPulseCounter.EXCEPTION_RATE] = QuickPulseCounter.EXCEPTION_RATE,
    _a);
exports.QuickPulseDocumentType = {
    Event: "Event",
    Exception: "Exception",
    Trace: "Trace",
    Metric: "Metric",
    Request: "Request",
    Dependency: "RemoteDependency",
    Availability: "Availability",
    PageView: "PageView",
};
exports.QuickPulseType = {
    Event: "EventTelemetryDocument",
    Exception: "ExceptionTelemetryDocument",
    Trace: "TraceTelemetryDocument",
    Metric: "MetricTelemetryDocument",
    Request: "RequestTelemetryDocument",
    Dependency: "DependencyTelemetryDocument",
    Availability: "AvailabilityTelemetryDocument",
    PageView: "PageViewTelemetryDocument",
};
exports.TelemetryTypeStringToQuickPulseType = {
    EventData: exports.QuickPulseType.Event,
    ExceptionData: exports.QuickPulseType.Exception,
    MessageData: exports.QuickPulseType.Trace,
    MetricData: exports.QuickPulseType.Metric,
    RequestData: exports.QuickPulseType.Request,
    RemoteDependencyData: exports.QuickPulseType.Dependency,
    AvailabilityData: exports.QuickPulseType.Availability,
    PageViewData: exports.QuickPulseType.PageView
};
exports.TelemetryTypeStringToQuickPulseDocumentType = {
    EventData: exports.QuickPulseDocumentType.Event,
    ExceptionData: exports.QuickPulseDocumentType.Exception,
    MessageData: exports.QuickPulseDocumentType.Trace,
    MetricData: exports.QuickPulseDocumentType.Metric,
    RequestData: exports.QuickPulseDocumentType.Request,
    RemoteDependencyData: exports.QuickPulseDocumentType.Dependency,
    AvailabilityData: exports.QuickPulseDocumentType.Availability,
    PageViewData: exports.QuickPulseDocumentType.PageView
};
// OpenTelemetry Span Attributes
exports.SpanAttribute = {
    // HTTP
    HttpHost: "http.host",
    HttpMethod: "http.method",
    HttpPort: "http.port",
    HttpStatusCode: "http.status_code",
    HttpUrl: "http.url",
    HttpUserAgent: "http.user_agent",
    // GRPC
    GrpcMethod: "grpc.method",
    GrpcService: "rpc.service",
};
exports.DependencyTypeName = {
    Grpc: "GRPC",
    Http: "HTTP",
    InProc: "InProc",
};
exports.HeartBeatMetricName = "HeartBeat";
var _a;
//# sourceMappingURL=Constants.js.map

/***/ }),

/***/ 1371:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var Generated_1 = __webpack_require__(1182);
var RemoteDependencyDataConstants = (function () {
    function RemoteDependencyDataConstants() {
    }
    RemoteDependencyDataConstants.TYPE_HTTP = "Http";
    RemoteDependencyDataConstants.TYPE_AI = "Http (tracked component)";
    return RemoteDependencyDataConstants;
}());
exports.RemoteDependencyDataConstants = RemoteDependencyDataConstants;
function domainSupportsProperties(domain) {
    return "properties" in domain ||
        domain instanceof Generated_1.EventData ||
        domain instanceof Generated_1.ExceptionData ||
        domain instanceof Generated_1.MessageData ||
        domain instanceof Generated_1.MetricData ||
        domain instanceof Generated_1.PageViewData ||
        domain instanceof Generated_1.RemoteDependencyData ||
        domain instanceof Generated_1.RequestData;
}
exports.domainSupportsProperties = domainSupportsProperties;
//# sourceMappingURL=Constants.js.map

/***/ }),

/***/ 6162:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// THIS FILE WAS AUTOGENERATED
var Domain = __webpack_require__(5501);
"use strict";
/**
 * Instances of AvailabilityData represent the result of executing an availability test.
 */
var AvailabilityData = (function (_super) {
    __extends(AvailabilityData, _super);
    function AvailabilityData() {
        var _this = _super.call(this) || this;
        _this.ver = 2;
        _this.properties = {};
        _this.measurements = {};
        return _this;
    }
    return AvailabilityData;
}(Domain));
module.exports = AvailabilityData;
//# sourceMappingURL=AvailabilityData.js.map

/***/ }),

/***/ 6934:
/***/ ((module) => {

"use strict";
// THIS FILE WAS AUTOGENERATED

/**
 * Data struct to contain only C section with custom fields.
 */
var Base = (function () {
    function Base() {
    }
    return Base;
}());
module.exports = Base;
//# sourceMappingURL=Base.js.map

/***/ }),

/***/ 3885:
/***/ ((module) => {

"use strict";
// THIS FILE WAS AUTOGENERATED

var ContextTagKeys = (function () {
    function ContextTagKeys() {
        this.applicationVersion = "ai.application.ver";
        this.deviceId = "ai.device.id";
        this.deviceLocale = "ai.device.locale";
        this.deviceModel = "ai.device.model";
        this.deviceOEMName = "ai.device.oemName";
        this.deviceOSVersion = "ai.device.osVersion";
        this.deviceType = "ai.device.type";
        this.locationIp = "ai.location.ip";
        this.operationId = "ai.operation.id";
        this.operationName = "ai.operation.name";
        this.operationParentId = "ai.operation.parentId";
        this.operationSyntheticSource = "ai.operation.syntheticSource";
        this.operationCorrelationVector = "ai.operation.correlationVector";
        this.sessionId = "ai.session.id";
        this.sessionIsFirst = "ai.session.isFirst";
        this.userAccountId = "ai.user.accountId";
        this.userId = "ai.user.id";
        this.userAuthUserId = "ai.user.authUserId";
        this.cloudRole = "ai.cloud.role";
        this.cloudRoleInstance = "ai.cloud.roleInstance";
        this.internalSdkVersion = "ai.internal.sdkVersion";
        this.internalAgentVersion = "ai.internal.agentVersion";
        this.internalNodeName = "ai.internal.nodeName";
    }
    return ContextTagKeys;
}());
module.exports = ContextTagKeys;
//# sourceMappingURL=ContextTagKeys.js.map

/***/ }),

/***/ 2971:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// THIS FILE WAS AUTOGENERATED
var Base = __webpack_require__(6934);
"use strict";
/**
 * Data struct to contain both B and C sections.
 */
var Data = (function (_super) {
    __extends(Data, _super);
    function Data() {
        return _super.call(this) || this;
    }
    return Data;
}(Base));
module.exports = Data;
//# sourceMappingURL=Data.js.map

/***/ }),

/***/ 7579:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// THIS FILE WAS AUTOGENERATED
var DataPointType = __webpack_require__(2206);
"use strict";
/**
 * Metric data single measurement.
 */
var DataPoint = (function () {
    function DataPoint() {
        this.kind = DataPointType.Measurement;
    }
    return DataPoint;
}());
module.exports = DataPoint;
//# sourceMappingURL=DataPoint.js.map

/***/ }),

/***/ 2206:
/***/ ((module) => {

"use strict";
// THIS FILE WAS AUTOGENERATED

/**
 * Type of the metric data measurement.
 */
var DataPointType;
(function (DataPointType) {
    DataPointType[DataPointType["Measurement"] = 0] = "Measurement";
    DataPointType[DataPointType["Aggregation"] = 1] = "Aggregation";
})(DataPointType || (DataPointType = {}));
module.exports = DataPointType;
//# sourceMappingURL=DataPointType.js.map

/***/ }),

/***/ 5501:
/***/ ((module) => {

"use strict";
// THIS FILE WAS AUTOGENERATED

/**
 * The abstract common base of all domains.
 */
var Domain = (function () {
    function Domain() {
    }
    return Domain;
}());
module.exports = Domain;
//# sourceMappingURL=Domain.js.map

/***/ }),

/***/ 1313:
/***/ ((module) => {

"use strict";

/**
 * System variables for a telemetry item.
 */
var Envelope = (function () {
    function Envelope() {
        this.ver = 1;
        this.sampleRate = 100.0;
        this.tags = {};
    }
    return Envelope;
}());
module.exports = Envelope;
//# sourceMappingURL=Envelope.js.map

/***/ }),

/***/ 8516:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// THIS FILE WAS AUTOGENERATED
var Domain = __webpack_require__(5501);
"use strict";
/**
 * Instances of Event represent structured event records that can be grouped and searched by their properties. Event data item also creates a metric of event count by name.
 */
var EventData = (function (_super) {
    __extends(EventData, _super);
    function EventData() {
        var _this = _super.call(this) || this;
        _this.ver = 2;
        _this.properties = {};
        _this.measurements = {};
        return _this;
    }
    return EventData;
}(Domain));
module.exports = EventData;
//# sourceMappingURL=EventData.js.map

/***/ }),

/***/ 4687:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// THIS FILE WAS AUTOGENERATED
var Domain = __webpack_require__(5501);
"use strict";
/**
 * An instance of Exception represents a handled or unhandled exception that occurred during execution of the monitored application.
 */
var ExceptionData = (function (_super) {
    __extends(ExceptionData, _super);
    function ExceptionData() {
        var _this = _super.call(this) || this;
        _this.ver = 2;
        _this.exceptions = [];
        _this.properties = {};
        _this.measurements = {};
        return _this;
    }
    return ExceptionData;
}(Domain));
module.exports = ExceptionData;
//# sourceMappingURL=ExceptionData.js.map

/***/ }),

/***/ 227:
/***/ ((module) => {

"use strict";

/**
 * Exception details of the exception in a chain.
 */
var ExceptionDetails = (function () {
    function ExceptionDetails() {
        this.hasFullStack = true;
        this.parsedStack = [];
    }
    return ExceptionDetails;
}());
module.exports = ExceptionDetails;
//# sourceMappingURL=ExceptionDetails.js.map

/***/ }),

/***/ 7946:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// THIS FILE WAS AUTOGENERATED
var Domain = __webpack_require__(5501);
"use strict";
/**
 * Instances of Message represent printf-like trace statements that are text-searched. Log4Net, NLog and other text-based log file entries are translated into intances of this type. The message does not have measurements.
 */
var MessageData = (function (_super) {
    __extends(MessageData, _super);
    function MessageData() {
        var _this = _super.call(this) || this;
        _this.ver = 2;
        _this.properties = {};
        return _this;
    }
    return MessageData;
}(Domain));
module.exports = MessageData;
//# sourceMappingURL=MessageData.js.map

/***/ }),

/***/ 4246:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// THIS FILE WAS AUTOGENERATED
var Domain = __webpack_require__(5501);
"use strict";
/**
 * An instance of the Metric item is a list of measurements (single data points) and/or aggregations.
 */
var MetricData = (function (_super) {
    __extends(MetricData, _super);
    function MetricData() {
        var _this = _super.call(this) || this;
        _this.ver = 2;
        _this.metrics = [];
        _this.properties = {};
        return _this;
    }
    return MetricData;
}(Domain));
module.exports = MetricData;
//# sourceMappingURL=MetricData.js.map

/***/ }),

/***/ 995:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// THIS FILE WAS AUTOGENERATED
var EventData = __webpack_require__(8516);
"use strict";
/**
 * An instance of PageView represents a generic action on a page like a button click. It is also the base type for PageView.
 */
var PageViewData = (function (_super) {
    __extends(PageViewData, _super);
    function PageViewData() {
        var _this = _super.call(this) || this;
        _this.ver = 2;
        _this.properties = {};
        _this.measurements = {};
        return _this;
    }
    return PageViewData;
}(EventData));
module.exports = PageViewData;
//# sourceMappingURL=PageViewData.js.map

/***/ }),

/***/ 8005:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// THIS FILE WAS AUTOGENERATED
var Domain = __webpack_require__(5501);
"use strict";
/**
 * An instance of Remote Dependency represents an interaction of the monitored component with a remote component/service like SQL or an HTTP endpoint.
 */
var RemoteDependencyData = (function (_super) {
    __extends(RemoteDependencyData, _super);
    function RemoteDependencyData() {
        var _this = _super.call(this) || this;
        _this.ver = 2;
        _this.success = true;
        _this.properties = {};
        _this.measurements = {};
        return _this;
    }
    return RemoteDependencyData;
}(Domain));
module.exports = RemoteDependencyData;
//# sourceMappingURL=RemoteDependencyData.js.map

/***/ }),

/***/ 941:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// THIS FILE WAS AUTOGENERATED
var Domain = __webpack_require__(5501);
"use strict";
/**
 * An instance of Request represents completion of an external request to the application to do work and contains a summary of that request execution and the results.
 */
var RequestData = (function (_super) {
    __extends(RequestData, _super);
    function RequestData() {
        var _this = _super.call(this) || this;
        _this.ver = 2;
        _this.properties = {};
        _this.measurements = {};
        return _this;
    }
    return RequestData;
}(Domain));
module.exports = RequestData;
//# sourceMappingURL=RequestData.js.map

/***/ }),

/***/ 34:
/***/ ((module) => {

"use strict";
// THIS FILE WAS AUTOGENERATED

/**
 * Defines the level of severity for the event.
 */
var SeverityLevel;
(function (SeverityLevel) {
    SeverityLevel[SeverityLevel["Verbose"] = 0] = "Verbose";
    SeverityLevel[SeverityLevel["Information"] = 1] = "Information";
    SeverityLevel[SeverityLevel["Warning"] = 2] = "Warning";
    SeverityLevel[SeverityLevel["Error"] = 3] = "Error";
    SeverityLevel[SeverityLevel["Critical"] = 4] = "Critical";
})(SeverityLevel || (SeverityLevel = {}));
module.exports = SeverityLevel;
//# sourceMappingURL=SeverityLevel.js.map

/***/ }),

/***/ 7895:
/***/ ((module) => {

"use strict";
// THIS FILE WAS AUTOGENERATED

/**
 * Stack frame information.
 */
var StackFrame = (function () {
    function StackFrame() {
    }
    return StackFrame;
}());
module.exports = StackFrame;
//# sourceMappingURL=StackFrame.js.map

/***/ }),

/***/ 1182:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// THIS FILE WAS AUTOGENERATED

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AvailabilityData = __webpack_require__(6162);
exports.Base = __webpack_require__(6934);
exports.ContextTagKeys = __webpack_require__(3885);
exports.Data = __webpack_require__(2971);
exports.DataPoint = __webpack_require__(7579);
exports.DataPointType = __webpack_require__(2206);
exports.Domain = __webpack_require__(5501);
exports.Envelope = __webpack_require__(1313);
exports.EventData = __webpack_require__(8516);
exports.ExceptionData = __webpack_require__(4687);
exports.ExceptionDetails = __webpack_require__(227);
exports.MessageData = __webpack_require__(7946);
exports.MetricData = __webpack_require__(4246);
exports.PageViewData = __webpack_require__(995);
exports.RemoteDependencyData = __webpack_require__(8005);
exports.RequestData = __webpack_require__(941);
exports.SeverityLevel = __webpack_require__(34);
exports.StackFrame = __webpack_require__(7895);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 3022:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Converts the user-friendly enumeration TelemetryType to the underlying schema baseType value
 * @param type Type to convert to BaseData string
 */
function telemetryTypeToBaseType(type) {
    switch (type) {
        case TelemetryType.Event:
            return "EventData";
        case TelemetryType.Exception:
            return "ExceptionData";
        case TelemetryType.Trace:
            return "MessageData";
        case TelemetryType.Metric:
            return "MetricData";
        case TelemetryType.Request:
            return "RequestData";
        case TelemetryType.Dependency:
            return "RemoteDependencyData";
        case TelemetryType.Availability:
            return "AvailabilityData";
        case TelemetryType.PageView:
            return "PageViewData";
    }
    return undefined;
}
exports.telemetryTypeToBaseType = telemetryTypeToBaseType;
/**
 * Converts the schema baseType value to the user-friendly enumeration TelemetryType
 * @param baseType BaseData string to convert to TelemetryType
 */
function baseTypeToTelemetryType(baseType) {
    switch (baseType) {
        case "EventData":
            return TelemetryType.Event;
        case "ExceptionData":
            return TelemetryType.Exception;
        case "MessageData":
            return TelemetryType.Trace;
        case "MetricData":
            return TelemetryType.Metric;
        case "RequestData":
            return TelemetryType.Request;
        case "RemoteDependencyData":
            return TelemetryType.Dependency;
        case "AvailabilityData":
            return TelemetryType.Availability;
        case "PageViewData":
            return TelemetryType.PageView;
    }
    return undefined;
}
exports.baseTypeToTelemetryType = baseTypeToTelemetryType;
exports.TelemetryTypeString = {
    Event: "EventData",
    Exception: "ExceptionData",
    Trace: "MessageData",
    Metric: "MetricData",
    Request: "RequestData",
    Dependency: "RemoteDependencyData",
    Availability: "AvailabilityData",
    PageView: "PageViewData",
};
/**
 * Telemetry types supported by this SDK
 */
var TelemetryType;
(function (TelemetryType) {
    TelemetryType[TelemetryType["Event"] = 0] = "Event";
    TelemetryType[TelemetryType["Exception"] = 1] = "Exception";
    TelemetryType[TelemetryType["Trace"] = 2] = "Trace";
    TelemetryType[TelemetryType["Metric"] = 3] = "Metric";
    TelemetryType[TelemetryType["Request"] = 4] = "Request";
    TelemetryType[TelemetryType["Dependency"] = 5] = "Dependency";
    TelemetryType[TelemetryType["Availability"] = 6] = "Availability";
    TelemetryType[TelemetryType["PageView"] = 7] = "PageView";
})(TelemetryType = exports.TelemetryType || (exports.TelemetryType = {}));
//# sourceMappingURL=TelemetryType.js.map

/***/ }),

/***/ 8964:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", ({ value: true }));
__export(__webpack_require__(3022));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 5312:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", ({ value: true }));
__export(__webpack_require__(1371));
__export(__webpack_require__(1182));
__export(__webpack_require__(8964));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 538:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var Logging = __webpack_require__(4652);
var Channel = (function () {
    function Channel(isDisabled, getBatchSize, getBatchIntervalMs, sender) {
        this._buffer = [];
        this._lastSend = 0;
        this._isDisabled = isDisabled;
        this._getBatchSize = getBatchSize;
        this._getBatchIntervalMs = getBatchIntervalMs;
        this._sender = sender;
    }
    /**
     * Enable or disable disk-backed retry caching to cache events when client is offline (enabled by default)
     * These cached events are stored in your system or user's temporary directory and access restricted to your user when possible.
     * @param value if true events that occurred while client is offline will be cached on disk
     * @param resendInterval The wait interval for resending cached events.
     * @param maxBytesOnDisk The maximum size (in bytes) that the created temporary directory for cache events can grow to, before caching is disabled.
     * @returns {Configuration} this class
     */
    Channel.prototype.setUseDiskRetryCaching = function (value, resendInterval, maxBytesOnDisk) {
        this._sender.setDiskRetryMode(value, resendInterval, maxBytesOnDisk);
    };
    /**
     * Add a telemetry item to the send buffer
     */
    Channel.prototype.send = function (envelope) {
        var _this = this;
        // if master off switch is set, don't send any data
        if (this._isDisabled()) {
            // Do not send/save data
            return;
        }
        // validate input
        if (!envelope) {
            Logging.warn("Cannot send null/undefined telemetry");
            return;
        }
        // check if the incoming payload is too large, truncate if necessary
        var payload = this._stringify(envelope);
        if (typeof payload !== "string") {
            return;
        }
        // enqueue the payload
        this._buffer.push(payload);
        // flush if we would exceed the max-size limit by adding this item
        if (this._buffer.length >= this._getBatchSize()) {
            this.triggerSend(false);
            return;
        }
        // ensure an invocation timeout is set if anything is in the buffer
        if (!this._timeoutHandle && this._buffer.length > 0) {
            this._timeoutHandle = setTimeout(function () {
                _this._timeoutHandle = null;
                _this.triggerSend(false);
            }, this._getBatchIntervalMs());
        }
    };
    /**
     * Immediately send buffered data
     */
    Channel.prototype.triggerSend = function (isNodeCrashing, callback) {
        var bufferIsEmpty = this._buffer.length < 1;
        if (!bufferIsEmpty) {
            // compose an array of payloads
            var batch = this._buffer.join("\n");
            // invoke send
            if (isNodeCrashing) {
                this._sender.saveOnCrash(batch);
                if (typeof callback === "function") {
                    callback("data saved on crash");
                }
            }
            else {
                this._sender.send(Buffer.from ? Buffer.from(batch) : new Buffer(batch), callback);
            }
        }
        // update lastSend time to enable throttling
        this._lastSend = +new Date;
        // clear buffer
        this._buffer.length = 0;
        clearTimeout(this._timeoutHandle);
        this._timeoutHandle = null;
        if (bufferIsEmpty && typeof callback === "function") {
            callback("no data to send");
        }
    };
    Channel.prototype._stringify = function (envelope) {
        try {
            return JSON.stringify(envelope);
        }
        catch (error) {
            Logging.warn("Failed to serialize payload", error, envelope);
        }
    };
    return Channel;
}());
module.exports = Channel;
//# sourceMappingURL=Channel.js.map

/***/ }),

/***/ 5499:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var CorrelationIdManager = __webpack_require__(1360);
var ConnectionStringParser = __webpack_require__(94);
var Logging = __webpack_require__(4652);
var Constants = __webpack_require__(9722);
var url = __webpack_require__(8835);
var Config = (function () {
    function Config(setupString) {
        var _this = this;
        this.endpointBase = Constants.DEFAULT_BREEZE_ENDPOINT;
        var connectionStringEnv = process.env[Config.ENV_connectionString];
        var csCode = ConnectionStringParser.parse(setupString);
        var csEnv = ConnectionStringParser.parse(connectionStringEnv);
        var iKeyCode = !csCode.instrumentationkey && Object.keys(csCode).length > 0
            ? null // CS was valid but instrumentation key was not provided, null and grab from env var
            : setupString; // CS was invalid, so it must be an ikey
        this.instrumentationKey = csCode.instrumentationkey || iKeyCode /* === instrumentationKey */ || csEnv.instrumentationkey || Config._getInstrumentationKey();
        // validate ikey. If fails throw a warning
        if (!Config._validateInstrumentationKey(this.instrumentationKey)) {
            Logging.warn("An invalid instrumentation key was provided. There may be resulting telemetry loss", this.instrumentationKey);
        }
        this.endpointUrl = (csCode.ingestionendpoint || csEnv.ingestionendpoint || this.endpointBase) + "/v2/track";
        this.maxBatchSize = 250;
        this.maxBatchIntervalMs = 15000;
        this.disableAppInsights = false;
        this.samplingPercentage = 100;
        this.correlationIdRetryIntervalMs = 30 * 1000;
        this.correlationHeaderExcludedDomains = [
            "*.core.windows.net",
            "*.core.chinacloudapi.cn",
            "*.core.cloudapi.de",
            "*.core.usgovcloudapi.net",
            "*.core.microsoft.scloud",
            "*.core.eaglex.ic.gov"
        ];
        this.setCorrelationId = function (correlationId) { return _this.correlationId = correlationId; };
        this.proxyHttpUrl = process.env[Config.ENV_http_proxy] || undefined;
        this.proxyHttpsUrl = process.env[Config.ENV_https_proxy] || undefined;
        this.httpAgent = undefined;
        this.httpsAgent = undefined;
        this.profileQueryEndpoint = csCode.ingestionendpoint || csEnv.ingestionendpoint || process.env[Config.ENV_profileQueryEndpoint] || this.endpointBase;
        this._quickPulseHost = csCode.liveendpoint || csEnv.liveendpoint || process.env[Config.ENV_quickPulseHost] || Constants.DEFAULT_LIVEMETRICS_HOST;
        // Parse quickPulseHost if it starts with http(s)://
        if (this._quickPulseHost.match(/^https?:\/\//)) {
            this._quickPulseHost = url.parse(this._quickPulseHost).host;
        }
    }
    Object.defineProperty(Config.prototype, "profileQueryEndpoint", {
        get: function () {
            return this._profileQueryEndpoint;
        },
        set: function (endpoint) {
            CorrelationIdManager.cancelCorrelationIdQuery(this, this.setCorrelationId);
            this._profileQueryEndpoint = endpoint;
            this.correlationId = CorrelationIdManager.correlationIdPrefix; // Reset the correlationId while we wait for the new query
            CorrelationIdManager.queryCorrelationId(this, this.setCorrelationId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "quickPulseHost", {
        get: function () {
            return this._quickPulseHost;
        },
        set: function (host) {
            this._quickPulseHost = host;
        },
        enumerable: true,
        configurable: true
    });
    Config._getInstrumentationKey = function () {
        // check for both the documented env variable and the azure-prefixed variable
        var iKey = process.env[Config.ENV_iKey]
            || process.env[Config.ENV_azurePrefix + Config.ENV_iKey]
            || process.env[Config.legacy_ENV_iKey]
            || process.env[Config.ENV_azurePrefix + Config.legacy_ENV_iKey];
        if (!iKey || iKey == "") {
            throw new Error("Instrumentation key not found, pass the key in the config to this method or set the key in the environment variable APPINSIGHTS_INSTRUMENTATIONKEY before starting the server");
        }
        return iKey;
    };
    /**
    * Validate UUID Format
    * Specs taken from breeze repo
    * The definition of a VALID instrumentation key is as follows:
    * Not none
    * Not empty
    * Every character is a hex character [0-9a-f]
    * 32 characters are separated into 5 sections via 4 dashes
    * First section has 8 characters
    * Second section has 4 characters
    * Third section has 4 characters
    * Fourth section has 4 characters
    * Fifth section has 12 characters
    */
    Config._validateInstrumentationKey = function (iKey) {
        var UUID_Regex = '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';
        var regexp = new RegExp(UUID_Regex);
        return regexp.test(iKey);
    };
    // Azure adds this prefix to all environment variables
    Config.ENV_azurePrefix = "APPSETTING_";
    // This key is provided in the readme
    Config.ENV_iKey = "APPINSIGHTS_INSTRUMENTATIONKEY";
    Config.legacy_ENV_iKey = "APPINSIGHTS_INSTRUMENTATION_KEY";
    Config.ENV_profileQueryEndpoint = "APPINSIGHTS_PROFILE_QUERY_ENDPOINT";
    Config.ENV_quickPulseHost = "APPINSIGHTS_QUICKPULSE_HOST";
    // Azure Connection String
    Config.ENV_connectionString = "APPLICATIONINSIGHTS_CONNECTION_STRING";
    // Native Metrics Opt Outs
    Config.ENV_nativeMetricsDisablers = "APPLICATION_INSIGHTS_DISABLE_EXTENDED_METRIC";
    Config.ENV_nativeMetricsDisableAll = "APPLICATION_INSIGHTS_DISABLE_ALL_EXTENDED_METRICS";
    Config.ENV_http_proxy = "http_proxy";
    Config.ENV_https_proxy = "https_proxy";
    return Config;
}());
module.exports = Config;
//# sourceMappingURL=Config.js.map

/***/ }),

/***/ 94:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var Constants = __webpack_require__(9722);
var ConnectionStringParser = (function () {
    function ConnectionStringParser() {
    }
    ConnectionStringParser.parse = function (connectionString) {
        if (!connectionString) {
            return {};
        }
        var kvPairs = connectionString.split(ConnectionStringParser._FIELDS_SEPARATOR);
        var result = kvPairs.reduce(function (fields, kv) {
            var kvParts = kv.split(ConnectionStringParser._FIELD_KEY_VALUE_SEPARATOR);
            if (kvParts.length === 2) {
                var key = kvParts[0].toLowerCase();
                var value = kvParts[1];
                fields[key] = value;
            }
            return fields;
        }, {});
        if (Object.keys(result).length > 0) {
            // this is a valid connection string, so parse the results
            if (result.endpointsuffix) {
                // use endpoint suffix where overrides are not provided
                var locationPrefix = result.location ? result.location + "." : "";
                result.ingestionendpoint = result.ingestionendpoint || ("https://" + locationPrefix + "dc." + result.endpointsuffix);
                result.liveendpoint = result.liveendpoint || ("https://" + locationPrefix + "live." + result.endpointsuffix);
            }
            // apply the default endpoints
            result.ingestionendpoint = result.ingestionendpoint || Constants.DEFAULT_BREEZE_ENDPOINT;
            result.liveendpoint = result.liveendpoint || Constants.DEFAULT_LIVEMETRICS_ENDPOINT;
        }
        return result;
    };
    ConnectionStringParser._FIELDS_SEPARATOR = ";";
    ConnectionStringParser._FIELD_KEY_VALUE_SEPARATOR = "=";
    return ConnectionStringParser;
}());
module.exports = ConnectionStringParser;
//# sourceMappingURL=ConnectionStringParser.js.map

/***/ }),

/***/ 2463:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var os = __webpack_require__(2087);
var fs = __webpack_require__(5747);
var path = __webpack_require__(5622);
var Contracts = __webpack_require__(5312);
var Logging = __webpack_require__(4652);
var Context = (function () {
    function Context(packageJsonPath) {
        this.keys = new Contracts.ContextTagKeys();
        this.tags = {};
        this._loadApplicationContext();
        this._loadDeviceContext();
        this._loadInternalContext();
    }
    Context.prototype._loadApplicationContext = function (packageJsonPath) {
        // note: this should return the host package.json
        packageJsonPath = packageJsonPath || path.resolve(__dirname, "../../../../package.json");
        if (!Context.appVersion[packageJsonPath]) {
            Context.appVersion[packageJsonPath] = "unknown";
            try {
                var packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
                if (packageJson && typeof packageJson.version === "string") {
                    Context.appVersion[packageJsonPath] = packageJson.version;
                }
            }
            catch (exception) {
                Logging.info("unable to read app version: ", exception);
            }
        }
        this.tags[this.keys.applicationVersion] = Context.appVersion[packageJsonPath];
    };
    Context.prototype._loadDeviceContext = function () {
        this.tags[this.keys.deviceId] = "";
        this.tags[this.keys.cloudRoleInstance] = os && os.hostname();
        this.tags[this.keys.deviceOSVersion] = os && (os.type() + " " + os.release());
        this.tags[this.keys.cloudRole] = Context.DefaultRoleName;
        // not yet supported tags
        this.tags["ai.device.osArchitecture"] = os && os.arch();
        this.tags["ai.device.osPlatform"] = os && os.platform();
    };
    Context.prototype._loadInternalContext = function () {
        // note: this should return the sdk package.json
        var packageJsonPath = __webpack_require__.ab + "package.json";
        if (!Context.sdkVersion) {
            Context.sdkVersion = "unknown";
            try {
                var packageJson = JSON.parse(fs.readFileSync(__webpack_require__.ab + "package.json", "utf8"));
                if (packageJson && typeof packageJson.version === "string") {
                    Context.sdkVersion = packageJson.version;
                }
            }
            catch (exception) {
                Logging.info("unable to read app version: ", exception);
            }
        }
        this.tags[this.keys.internalSdkVersion] = "node:" + Context.sdkVersion;
    };
    Context.DefaultRoleName = "Web";
    Context.appVersion = {};
    Context.sdkVersion = null;
    return Context;
}());
module.exports = Context;
//# sourceMappingURL=Context.js.map

/***/ }),

/***/ 1360:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var Util = __webpack_require__(834);
var Logging = __webpack_require__(4652);
var CorrelationIdManager = (function () {
    function CorrelationIdManager() {
    }
    CorrelationIdManager.queryCorrelationId = function (config, callback) {
        // GET request to `${this.endpointBase}/api/profiles/${this.instrumentationKey}/appId`
        // If it 404s, the iKey is bad and we should give up
        // If it fails otherwise, try again later
        var appIdUrlString = config.profileQueryEndpoint + "/api/profiles/" + config.instrumentationKey + "/appId";
        if (CorrelationIdManager.completedLookups.hasOwnProperty(appIdUrlString)) {
            callback(CorrelationIdManager.completedLookups[appIdUrlString]);
            return;
        }
        else if (CorrelationIdManager.pendingLookups[appIdUrlString]) {
            CorrelationIdManager.pendingLookups[appIdUrlString].push(callback);
            return;
        }
        CorrelationIdManager.pendingLookups[appIdUrlString] = [callback];
        var fetchAppId = function () {
            if (!CorrelationIdManager.pendingLookups[appIdUrlString]) {
                // This query has been cancelled.
                return;
            }
            var requestOptions = {
                method: 'GET',
                // Ensure this request is not captured by auto-collection.
                // Note: we don't refer to the property in HttpDependencyParser because that would cause a cyclical dependency
                disableAppInsightsAutoCollection: true
            };
            Logging.info(CorrelationIdManager.TAG, requestOptions);
            var req = Util.makeRequest(config, appIdUrlString, requestOptions, function (res) {
                if (res.statusCode === 200) {
                    // Success; extract the appId from the body
                    var appId_1 = "";
                    res.setEncoding("utf-8");
                    res.on('data', function (data) {
                        appId_1 += data;
                    });
                    res.on('end', function () {
                        Logging.info(CorrelationIdManager.TAG, appId_1);
                        var result = CorrelationIdManager.correlationIdPrefix + appId_1;
                        CorrelationIdManager.completedLookups[appIdUrlString] = result;
                        if (CorrelationIdManager.pendingLookups[appIdUrlString]) {
                            CorrelationIdManager.pendingLookups[appIdUrlString].forEach(function (cb) { return cb(result); });
                        }
                        delete CorrelationIdManager.pendingLookups[appIdUrlString];
                    });
                }
                else if (res.statusCode >= 400 && res.statusCode < 500) {
                    // Not found, probably a bad key. Do not try again.
                    CorrelationIdManager.completedLookups[appIdUrlString] = undefined;
                    delete CorrelationIdManager.pendingLookups[appIdUrlString];
                }
                else {
                    // Retry after timeout.
                    setTimeout(fetchAppId, config.correlationIdRetryIntervalMs);
                }
            });
            if (req) {
                req.on('error', function (error) {
                    // Unable to contact endpoint.
                    // Do nothing for now.
                    Logging.warn(CorrelationIdManager.TAG, error);
                });
                req.end();
            }
        };
        setTimeout(fetchAppId, 0);
    };
    CorrelationIdManager.cancelCorrelationIdQuery = function (config, callback) {
        var appIdUrlString = config.profileQueryEndpoint + "/api/profiles/" + config.instrumentationKey + "/appId";
        var pendingLookups = CorrelationIdManager.pendingLookups[appIdUrlString];
        if (pendingLookups) {
            CorrelationIdManager.pendingLookups[appIdUrlString] = pendingLookups.filter(function (cb) { return cb != callback; });
            if (CorrelationIdManager.pendingLookups[appIdUrlString].length == 0) {
                delete CorrelationIdManager.pendingLookups[appIdUrlString];
            }
        }
    };
    /**
     * Generate a request Id according to https://github.com/lmolkova/correlation/blob/master/hierarchical_request_id.md
     * @param parentId
     */
    CorrelationIdManager.generateRequestId = function (parentId) {
        if (parentId) {
            parentId = parentId[0] == '|' ? parentId : '|' + parentId;
            if (parentId[parentId.length - 1] !== '.') {
                parentId += '.';
            }
            var suffix = (CorrelationIdManager.currentRootId++).toString(16);
            return CorrelationIdManager.appendSuffix(parentId, suffix, '_');
        }
        else {
            return CorrelationIdManager.generateRootId();
        }
    };
    /**
     * Given a hierarchical identifier of the form |X.*
     * return the root identifier X
     * @param id
     */
    CorrelationIdManager.getRootId = function (id) {
        var endIndex = id.indexOf('.');
        if (endIndex < 0) {
            endIndex = id.length;
        }
        var startIndex = id[0] === '|' ? 1 : 0;
        return id.substring(startIndex, endIndex);
    };
    CorrelationIdManager.generateRootId = function () {
        return '|' + Util.w3cTraceId() + '.';
    };
    CorrelationIdManager.appendSuffix = function (parentId, suffix, delimiter) {
        if (parentId.length + suffix.length < CorrelationIdManager.requestIdMaxLength) {
            return parentId + suffix + delimiter;
        }
        // Combined identifier would be too long, so we must truncate it.
        // We need 9 characters of space: 8 for the overflow ID, 1 for the
        // overflow delimiter '#'
        var trimPosition = CorrelationIdManager.requestIdMaxLength - 9;
        if (parentId.length > trimPosition) {
            for (; trimPosition > 1; --trimPosition) {
                var c = parentId[trimPosition - 1];
                if (c === '.' || c === '_') {
                    break;
                }
            }
        }
        if (trimPosition <= 1) {
            // parentId is not a valid ID
            return CorrelationIdManager.generateRootId();
        }
        suffix = Util.randomu32().toString(16);
        while (suffix.length < 8) {
            suffix = '0' + suffix;
        }
        return parentId.substring(0, trimPosition) + suffix + '#';
    };
    CorrelationIdManager.TAG = "CorrelationIdManager";
    CorrelationIdManager.correlationIdPrefix = "cid-v1:";
    CorrelationIdManager.w3cEnabled = true;
    // To avoid extraneous HTTP requests, we maintain a queue of callbacks waiting on a particular appId lookup,
    // as well as a cache of completed lookups so future requests can be resolved immediately.
    CorrelationIdManager.pendingLookups = {};
    CorrelationIdManager.completedLookups = {};
    CorrelationIdManager.requestIdMaxLength = 1024;
    CorrelationIdManager.currentRootId = Util.randomu32();
    return CorrelationIdManager;
}());
module.exports = CorrelationIdManager;
//# sourceMappingURL=CorrelationIdManager.js.map

/***/ }),

/***/ 5517:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var Contracts = __webpack_require__(5312);
var Util = __webpack_require__(834);
var CorrelationContextManager_1 = __webpack_require__(2740);
/**
 * Manages the logic of creating envelopes from Telemetry objects
 */
var EnvelopeFactory = (function () {
    function EnvelopeFactory() {
    }
    /**
     * Creates envelope ready to be sent by Channel
     * @param telemetry Telemetry data
     * @param telemetryType Type of telemetry
     * @param commonProperties Bag of custom common properties to be added to the envelope
     * @param context Client context
     * @param config Client configuration
     */
    EnvelopeFactory.createEnvelope = function (telemetry, telemetryType, commonProperties, context, config) {
        var data = null;
        switch (telemetryType) {
            case Contracts.TelemetryType.Trace:
                data = EnvelopeFactory.createTraceData(telemetry);
                break;
            case Contracts.TelemetryType.Dependency:
                data = EnvelopeFactory.createDependencyData(telemetry);
                break;
            case Contracts.TelemetryType.Event:
                data = EnvelopeFactory.createEventData(telemetry);
                break;
            case Contracts.TelemetryType.Exception:
                data = EnvelopeFactory.createExceptionData(telemetry);
                break;
            case Contracts.TelemetryType.Request:
                data = EnvelopeFactory.createRequestData(telemetry);
                break;
            case Contracts.TelemetryType.Metric:
                data = EnvelopeFactory.createMetricData(telemetry);
                break;
            case Contracts.TelemetryType.Availability:
                data = EnvelopeFactory.createAvailabilityData(telemetry);
                break;
            case Contracts.TelemetryType.PageView:
                data = EnvelopeFactory.createPageViewData(telemetry);
                break;
        }
        if (commonProperties && Contracts.domainSupportsProperties(data.baseData)) {
            if (data && data.baseData) {
                // if no properties are specified just add the common ones
                if (!data.baseData.properties) {
                    data.baseData.properties = commonProperties;
                }
                else {
                    // otherwise, check each of the common ones
                    for (var name in commonProperties) {
                        // only override if the property `name` has not been set on this item
                        if (!data.baseData.properties[name]) {
                            data.baseData.properties[name] = commonProperties[name];
                        }
                    }
                }
            }
            // sanitize properties
            data.baseData.properties = Util.validateStringMap(data.baseData.properties);
        }
        var iKey = config ? config.instrumentationKey || "" : "";
        var envelope = new Contracts.Envelope();
        envelope.data = data;
        envelope.iKey = iKey;
        // this is kind of a hack, but the envelope name is always the same as the data name sans the chars "data"
        envelope.name =
            "Microsoft.ApplicationInsights." +
                iKey.replace(/-/g, "") +
                "." +
                data.baseType.substr(0, data.baseType.length - 4);
        envelope.tags = this.getTags(context, telemetry.tagOverrides);
        envelope.time = (new Date()).toISOString();
        envelope.ver = 1;
        envelope.sampleRate = config ? config.samplingPercentage : 100;
        // Exclude metrics from sampling by default
        if (telemetryType === Contracts.TelemetryType.Metric) {
            envelope.sampleRate = 100;
        }
        return envelope;
    };
    EnvelopeFactory.createTraceData = function (telemetry) {
        var trace = new Contracts.MessageData();
        trace.message = telemetry.message;
        trace.properties = telemetry.properties;
        if (!isNaN(telemetry.severity)) {
            trace.severityLevel = telemetry.severity;
        }
        else {
            trace.severityLevel = Contracts.SeverityLevel.Information;
        }
        var data = new Contracts.Data();
        data.baseType = Contracts.telemetryTypeToBaseType(Contracts.TelemetryType.Trace);
        data.baseData = trace;
        return data;
    };
    EnvelopeFactory.createDependencyData = function (telemetry) {
        var remoteDependency = new Contracts.RemoteDependencyData();
        if (typeof telemetry.name === "string") {
            remoteDependency.name = telemetry.name.length > 1024 ? telemetry.name.slice(0, 1021) + '...' : telemetry.name;
        }
        remoteDependency.data = telemetry.data;
        remoteDependency.target = telemetry.target;
        remoteDependency.duration = Util.msToTimeSpan(telemetry.duration);
        remoteDependency.success = telemetry.success;
        remoteDependency.type = telemetry.dependencyTypeName;
        remoteDependency.properties = telemetry.properties;
        remoteDependency.resultCode = (telemetry.resultCode ? telemetry.resultCode + '' : '');
        if (telemetry.id) {
            remoteDependency.id = telemetry.id;
        }
        else {
            remoteDependency.id = Util.w3cTraceId();
        }
        var data = new Contracts.Data();
        data.baseType = Contracts.telemetryTypeToBaseType(Contracts.TelemetryType.Dependency);
        data.baseData = remoteDependency;
        return data;
    };
    EnvelopeFactory.createEventData = function (telemetry) {
        var event = new Contracts.EventData();
        event.name = telemetry.name;
        event.properties = telemetry.properties;
        event.measurements = telemetry.measurements;
        var data = new Contracts.Data();
        data.baseType = Contracts.telemetryTypeToBaseType(Contracts.TelemetryType.Event);
        data.baseData = event;
        return data;
    };
    EnvelopeFactory.createExceptionData = function (telemetry) {
        var exception = new Contracts.ExceptionData();
        exception.properties = telemetry.properties;
        if (!isNaN(telemetry.severity)) {
            exception.severityLevel = telemetry.severity;
        }
        else {
            exception.severityLevel = Contracts.SeverityLevel.Error;
        }
        exception.measurements = telemetry.measurements;
        exception.exceptions = [];
        var stack = telemetry.exception["stack"];
        var exceptionDetails = new Contracts.ExceptionDetails();
        exceptionDetails.message = telemetry.exception.message;
        exceptionDetails.typeName = telemetry.exception.name;
        exceptionDetails.parsedStack = this.parseStack(stack);
        exceptionDetails.hasFullStack = Util.isArray(exceptionDetails.parsedStack) && exceptionDetails.parsedStack.length > 0;
        exception.exceptions.push(exceptionDetails);
        var data = new Contracts.Data();
        data.baseType = Contracts.telemetryTypeToBaseType(Contracts.TelemetryType.Exception);
        data.baseData = exception;
        return data;
    };
    EnvelopeFactory.createRequestData = function (telemetry) {
        var requestData = new Contracts.RequestData();
        if (telemetry.id) {
            requestData.id = telemetry.id;
        }
        else {
            requestData.id = Util.w3cTraceId();
        }
        requestData.name = telemetry.name;
        requestData.url = telemetry.url;
        requestData.source = telemetry.source;
        requestData.duration = Util.msToTimeSpan(telemetry.duration);
        requestData.responseCode = (telemetry.resultCode ? telemetry.resultCode + '' : '');
        requestData.success = telemetry.success;
        requestData.properties = telemetry.properties;
        var data = new Contracts.Data();
        data.baseType = Contracts.telemetryTypeToBaseType(Contracts.TelemetryType.Request);
        data.baseData = requestData;
        return data;
    };
    EnvelopeFactory.createMetricData = function (telemetry) {
        var metrics = new Contracts.MetricData(); // todo: enable client-batching of these
        metrics.metrics = [];
        var metric = new Contracts.DataPoint();
        metric.count = !isNaN(telemetry.count) ? telemetry.count : 1;
        metric.kind = Contracts.DataPointType.Aggregation;
        metric.max = !isNaN(telemetry.max) ? telemetry.max : telemetry.value;
        metric.min = !isNaN(telemetry.min) ? telemetry.min : telemetry.value;
        metric.name = telemetry.name;
        metric.stdDev = !isNaN(telemetry.stdDev) ? telemetry.stdDev : 0;
        metric.value = telemetry.value;
        metrics.metrics.push(metric);
        metrics.properties = telemetry.properties;
        var data = new Contracts.Data();
        data.baseType = Contracts.telemetryTypeToBaseType(Contracts.TelemetryType.Metric);
        data.baseData = metrics;
        return data;
    };
    EnvelopeFactory.createAvailabilityData = function (telemetry) {
        var availabilityData = new Contracts.AvailabilityData();
        if (telemetry.id) {
            availabilityData.id = telemetry.id;
        }
        else {
            availabilityData.id = Util.w3cTraceId();
        }
        availabilityData.name = telemetry.name;
        availabilityData.duration = Util.msToTimeSpan(telemetry.duration);
        availabilityData.success = telemetry.success;
        availabilityData.runLocation = telemetry.runLocation;
        availabilityData.message = telemetry.message;
        availabilityData.measurements = telemetry.measurements;
        availabilityData.properties = telemetry.properties;
        var data = new Contracts.Data();
        data.baseType = Contracts.telemetryTypeToBaseType(Contracts.TelemetryType.Availability);
        data.baseData = availabilityData;
        return data;
    };
    EnvelopeFactory.createPageViewData = function (telemetry) {
        var pageViewData = new Contracts.PageViewData();
        pageViewData.name = telemetry.name;
        pageViewData.duration = Util.msToTimeSpan(telemetry.duration);
        pageViewData.url = telemetry.url;
        pageViewData.measurements = telemetry.measurements;
        pageViewData.properties = telemetry.properties;
        var data = new Contracts.Data();
        data.baseType = Contracts.telemetryTypeToBaseType(Contracts.TelemetryType.PageView);
        data.baseData = pageViewData;
        return data;
    };
    EnvelopeFactory.getTags = function (context, tagOverrides) {
        var correlationContext = CorrelationContextManager_1.CorrelationContextManager.getCurrentContext();
        // Make a copy of context tags so we don't alter the actual object
        // Also perform tag overriding
        var newTags = {};
        if (context && context.tags) {
            for (var key in context.tags) {
                newTags[key] = context.tags[key];
            }
        }
        if (tagOverrides) {
            for (var key in tagOverrides) {
                newTags[key] = tagOverrides[key];
            }
        }
        // Fill in internally-populated values if not already set
        if (correlationContext) {
            newTags[context.keys.operationId] = newTags[context.keys.operationId] || correlationContext.operation.id;
            newTags[context.keys.operationName] = newTags[context.keys.operationName] || correlationContext.operation.name;
            newTags[context.keys.operationParentId] = newTags[context.keys.operationParentId] || correlationContext.operation.parentId;
        }
        return newTags;
    };
    EnvelopeFactory.parseStack = function (stack) {
        var parsedStack = undefined;
        if (typeof stack === "string") {
            var frames = stack.split("\n");
            parsedStack = [];
            var level = 0;
            var totalSizeInBytes = 0;
            for (var i = 0; i <= frames.length; i++) {
                var frame = frames[i];
                if (_StackFrame.regex.test(frame)) {
                    var parsedFrame = new _StackFrame(frames[i], level++);
                    totalSizeInBytes += parsedFrame.sizeInBytes;
                    parsedStack.push(parsedFrame);
                }
            }
            // DP Constraint - exception parsed stack must be < 32KB
            // remove frames from the middle to meet the threshold
            var exceptionParsedStackThreshold = 32 * 1024;
            if (totalSizeInBytes > exceptionParsedStackThreshold) {
                var left = 0;
                var right = parsedStack.length - 1;
                var size = 0;
                var acceptedLeft = left;
                var acceptedRight = right;
                while (left < right) {
                    // check size
                    var lSize = parsedStack[left].sizeInBytes;
                    var rSize = parsedStack[right].sizeInBytes;
                    size += lSize + rSize;
                    if (size > exceptionParsedStackThreshold) {
                        // remove extra frames from the middle
                        var howMany = acceptedRight - acceptedLeft + 1;
                        parsedStack.splice(acceptedLeft, howMany);
                        break;
                    }
                    // update pointers
                    acceptedLeft = left;
                    acceptedRight = right;
                    left++;
                    right--;
                }
            }
        }
        return parsedStack;
    };
    return EnvelopeFactory;
}());
var _StackFrame = (function () {
    function _StackFrame(frame, level) {
        this.sizeInBytes = 0;
        this.level = level;
        this.method = "<no_method>";
        this.assembly = Util.trim(frame);
        var matches = frame.match(_StackFrame.regex);
        if (matches && matches.length >= 5) {
            this.method = Util.trim(matches[2]) || this.method;
            this.fileName = Util.trim(matches[4]) || "<no_filename>";
            this.line = parseInt(matches[5]) || 0;
        }
        this.sizeInBytes += this.method.length;
        this.sizeInBytes += this.fileName.length;
        this.sizeInBytes += this.assembly.length;
        // todo: these might need to be removed depending on how the back-end settles on their size calculation
        this.sizeInBytes += _StackFrame.baseSize;
        this.sizeInBytes += this.level.toString().length;
        this.sizeInBytes += this.line.toString().length;
    }
    // regex to match stack frames from ie/chrome/ff
    // methodName=$2, fileName=$4, lineNo=$5, column=$6
    _StackFrame.regex = /^([\s]+at)?(.*?)(\@|\s\(|\s)([^\(\@\n]+):([0-9]+):([0-9]+)(\)?)$/;
    _StackFrame.baseSize = 58; //'{"method":"","level":,"assembly":"","fileName":"","line":}'.length
    return _StackFrame;
}());
module.exports = EnvelopeFactory;
//# sourceMappingURL=EnvelopeFactory.js.map

/***/ }),

/***/ 4652:
/***/ ((module) => {

"use strict";

var Logging = (function () {
    function Logging() {
    }
    Logging.info = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (Logging.enableDebug) {
            console.info(Logging.TAG + message, optionalParams);
        }
    };
    Logging.warn = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (!Logging.disableWarnings) {
            console.warn(Logging.TAG + message, optionalParams);
        }
    };
    Logging.enableDebug = false;
    Logging.disableWarnings = false;
    Logging.disableErrors = false;
    Logging.TAG = "ApplicationInsights:";
    return Logging;
}());
module.exports = Logging;
//# sourceMappingURL=Logging.js.map

/***/ }),

/***/ 8904:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TelemetryClient = __webpack_require__(1975);
var ServerRequestTracking = __webpack_require__(6384);
var ClientRequestTracking = __webpack_require__(5679);
var Logging = __webpack_require__(4652);
/**
 * Application Insights Telemetry Client for Node.JS. Provides the Application Insights TelemetryClient API
 * in addition to Node-specific helper functions.
 * Construct a new TelemetryClient to have an instance with a different configuration than the default client.
 * In most cases, `appInsights.defaultClient` should be used instead.
 */
var NodeClient = (function (_super) {
    __extends(NodeClient, _super);
    function NodeClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Log RequestTelemetry from HTTP request and response. This method will log immediately without waiting for request completion
     * and it requires duration parameter to be specified on NodeHttpRequestTelemetry object.
     * Use trackNodeHttpRequest function to log the telemetry after request completion
     * @param telemetry Object encapsulating incoming request, response and duration information
     */
    NodeClient.prototype.trackNodeHttpRequestSync = function (telemetry) {
        if (telemetry && telemetry.request && telemetry.response && telemetry.duration) {
            ServerRequestTracking.trackRequestSync(this, telemetry);
        }
        else {
            Logging.warn("trackNodeHttpRequestSync requires NodeHttpRequestTelemetry object with request, response and duration specified.");
        }
    };
    /**
     * Log RequestTelemetry from HTTP request and response. This method will `follow` the request to completion.
     * Use trackNodeHttpRequestSync function to log telemetry immediately without waiting for request completion
     * @param telemetry Object encapsulating incoming request and response information
     */
    NodeClient.prototype.trackNodeHttpRequest = function (telemetry) {
        if (telemetry.duration || telemetry.error) {
            Logging.warn("trackNodeHttpRequest will ignore supplied duration and error parameters. These values are collected from the request and response objects.");
        }
        if (telemetry && telemetry.request && telemetry.response) {
            ServerRequestTracking.trackRequest(this, telemetry);
        }
        else {
            Logging.warn("trackNodeHttpRequest requires NodeHttpRequestTelemetry object with request and response specified.");
        }
    };
    /**
     * Log DependencyTelemetry from outgoing HTTP request. This method will instrument the outgoing request and append
     * the specified headers and will log the telemetry when outgoing request is complete
     * @param telemetry Object encapsulating outgoing request information
     */
    NodeClient.prototype.trackNodeHttpDependency = function (telemetry) {
        if (telemetry && telemetry.request) {
            ClientRequestTracking.trackRequest(this, telemetry);
        }
        else {
            Logging.warn("trackNodeHttpDependency requires NodeHttpDependencyTelemetry object with request specified.");
        }
    };
    return NodeClient;
}(TelemetryClient));
module.exports = NodeClient;
//# sourceMappingURL=NodeClient.js.map

/***/ }),

/***/ 1362:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var os = __webpack_require__(2087);
var Contracts = __webpack_require__(5312);
var Constants = __webpack_require__(9722);
var Util = __webpack_require__(834);
var Logging = __webpack_require__(4652);
var StreamId = Util.w3cTraceId(); // Create a guid
var QuickPulseEnvelopeFactory = (function () {
    function QuickPulseEnvelopeFactory() {
    }
    QuickPulseEnvelopeFactory.createQuickPulseEnvelope = function (metrics, documents, config, context) {
        var machineName = (os && typeof os.hostname === "function"
            && os.hostname()) || "Unknown"; // Note: os.hostname() was added in node v0.3.3
        var instance = (context.tags
            && context.keys
            && context.keys.cloudRoleInstance
            && context.tags[context.keys.cloudRoleInstance]) || machineName;
        var envelope = {
            Documents: documents.length > 0 ? documents : null,
            InstrumentationKey: config.instrumentationKey || "",
            Metrics: metrics.length > 0 ? metrics : null,
            InvariantVersion: 1,
            Timestamp: "/Date(" + Date.now() + ")/",
            Version: context.tags[context.keys.internalSdkVersion],
            StreamId: StreamId,
            MachineName: machineName,
            Instance: instance
        };
        return envelope;
    };
    QuickPulseEnvelopeFactory.createQuickPulseMetric = function (telemetry) {
        var data;
        data = {
            Name: telemetry.name,
            Value: telemetry.value,
            Weight: telemetry.count || 1
        };
        return data;
    };
    QuickPulseEnvelopeFactory.telemetryEnvelopeToQuickPulseDocument = function (envelope) {
        switch (envelope.data.baseType) {
            case Contracts.TelemetryTypeString.Event:
                return QuickPulseEnvelopeFactory.createQuickPulseEventDocument(envelope);
            case Contracts.TelemetryTypeString.Exception:
                return QuickPulseEnvelopeFactory.createQuickPulseExceptionDocument(envelope);
            case Contracts.TelemetryTypeString.Trace:
                return QuickPulseEnvelopeFactory.createQuickPulseTraceDocument(envelope);
            case Contracts.TelemetryTypeString.Dependency:
                return QuickPulseEnvelopeFactory.createQuickPulseDependencyDocument(envelope);
            case Contracts.TelemetryTypeString.Request:
                return QuickPulseEnvelopeFactory.createQuickPulseRequestDocument(envelope);
        }
        return null;
    };
    QuickPulseEnvelopeFactory.createQuickPulseEventDocument = function (envelope) {
        var document = QuickPulseEnvelopeFactory.createQuickPulseDocument(envelope);
        var name = envelope.data.baseData.name;
        var eventDocument = __assign({}, document, { Name: name });
        return eventDocument;
    };
    QuickPulseEnvelopeFactory.createQuickPulseTraceDocument = function (envelope) {
        var document = QuickPulseEnvelopeFactory.createQuickPulseDocument(envelope);
        var severityLevel = envelope.data.baseData.severityLevel || 0;
        var traceDocument = __assign({}, document, { Message: envelope.data.baseData.message, SeverityLevel: Contracts.SeverityLevel[severityLevel] });
        return traceDocument;
    };
    QuickPulseEnvelopeFactory.createQuickPulseExceptionDocument = function (envelope) {
        var document = QuickPulseEnvelopeFactory.createQuickPulseDocument(envelope);
        var exceptionDetails = envelope.data.baseData.exceptions;
        var exception = '';
        var exceptionMessage = '';
        var exceptionType = '';
        // Try to fill exception information from first error only
        if (exceptionDetails && exceptionDetails.length > 0) {
            // Try to grab the stack from parsedStack or stack
            if (exceptionDetails[0].parsedStack && exceptionDetails[0].parsedStack.length > 0) {
                exceptionDetails[0].parsedStack.forEach(function (err) {
                    exception += err.assembly + "\n";
                });
            }
            else if (exceptionDetails[0].stack && exceptionDetails[0].stack.length > 0) {
                exception = exceptionDetails[0].stack;
            }
            exceptionMessage = exceptionDetails[0].message;
            exceptionType = exceptionDetails[0].typeName;
        }
        var exceptionDocument = __assign({}, document, { Exception: exception, ExceptionMessage: exceptionMessage, ExceptionType: exceptionType });
        return exceptionDocument;
    };
    QuickPulseEnvelopeFactory.createQuickPulseRequestDocument = function (envelope) {
        var document = QuickPulseEnvelopeFactory.createQuickPulseDocument(envelope);
        var baseData = envelope.data.baseData;
        var requestDocument = __assign({}, document, { Name: baseData.name, Success: baseData.success, Duration: baseData.duration, ResponseCode: baseData.responseCode, OperationName: baseData.name // TODO: is this correct?
         });
        return requestDocument;
    };
    QuickPulseEnvelopeFactory.createQuickPulseDependencyDocument = function (envelope) {
        var document = QuickPulseEnvelopeFactory.createQuickPulseDocument(envelope);
        var baseData = envelope.data.baseData;
        var dependencyDocument = __assign({}, document, { Name: baseData.name, Target: baseData.target, Success: baseData.success, Duration: baseData.duration, ResultCode: baseData.resultCode, CommandName: baseData.data, OperationName: document.OperationId, DependencyTypeName: baseData.type });
        return dependencyDocument;
    };
    QuickPulseEnvelopeFactory.createQuickPulseDocument = function (envelope) {
        var documentType;
        var __type;
        var operationId, properties;
        if (envelope.data.baseType) {
            __type = Constants.TelemetryTypeStringToQuickPulseType[envelope.data.baseType];
            documentType = Constants.TelemetryTypeStringToQuickPulseDocumentType[envelope.data.baseType];
        }
        else {
            // Remark: This should never be hit because createQuickPulseDocument is only called within
            // valid baseType values
            Logging.warn("Document type invalid; not sending live metric document", envelope.data.baseType);
        }
        operationId = envelope.tags[QuickPulseEnvelopeFactory.keys.operationId];
        properties = QuickPulseEnvelopeFactory.aggregateProperties(envelope);
        var document = {
            DocumentType: documentType,
            __type: __type,
            OperationId: operationId,
            Version: "1.0",
            Properties: properties
        };
        return document;
    };
    QuickPulseEnvelopeFactory.aggregateProperties = function (envelope) {
        var properties = [];
        // Collect measurements
        var meas = (envelope.data.baseData).measurements || {};
        for (var key in meas) {
            if (meas.hasOwnProperty(key)) {
                var value = meas[key];
                var property = { key: key, value: value };
                properties.push(property);
            }
        }
        // Collect properties
        var props = (envelope.data.baseData).properties || {};
        for (var key in props) {
            if (props.hasOwnProperty(key)) {
                var value = props[key];
                var property = { key: key, value: value };
                properties.push(property);
            }
        }
        return properties;
    };
    QuickPulseEnvelopeFactory.keys = new Contracts.ContextTagKeys();
    return QuickPulseEnvelopeFactory;
}());
module.exports = QuickPulseEnvelopeFactory;
//# sourceMappingURL=QuickPulseEnvelopeFactory.js.map

/***/ }),

/***/ 9001:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var https = __webpack_require__(7211);
var AutoCollectHttpDependencies = __webpack_require__(5679);
var Logging = __webpack_require__(4652);
var QuickPulseUtil = __webpack_require__(5682);
var Util = __webpack_require__(834);
var QuickPulseConfig = {
    method: "POST",
    time: "x-ms-qps-transmission-time",
    subscribed: "x-ms-qps-subscribed"
};
var QuickPulseSender = (function () {
    function QuickPulseSender(config) {
        this._config = config;
        this._consecutiveErrors = 0;
    }
    QuickPulseSender.prototype.ping = function (envelope, done) {
        this._submitData(envelope, done, "ping");
    };
    QuickPulseSender.prototype.post = function (envelope, done) {
        // Important: When POSTing data, envelope must be an array
        this._submitData([envelope], done, "post");
    };
    QuickPulseSender.prototype._submitData = function (envelope, done, postOrPing) {
        var _this = this;
        var payload = JSON.stringify(envelope);
        var options = (_a = {},
            _a[AutoCollectHttpDependencies.disableCollectionRequestOption] = true,
            _a.host = this._config.quickPulseHost,
            _a.method = QuickPulseConfig.method,
            _a.path = "/QuickPulseService.svc/" + postOrPing + "?ikey=" + this._config.instrumentationKey,
            _a.headers = (_b = {
                    'Expect': '100-continue'
                },
                _b[QuickPulseConfig.time] = QuickPulseUtil.getTransmissionTime(),
                _b['Content-Type'] = 'application\/json',
                _b['Content-Length'] = Buffer.byteLength(payload),
                _b),
            _a);
        // HTTPS only
        if (this._config.httpsAgent) {
            options.agent = this._config.httpsAgent;
        }
        else {
            options.agent = Util.tlsRestrictedAgent;
        }
        var req = https.request(options, function (res) {
            var shouldPOSTData = res.headers[QuickPulseConfig.subscribed] === "true";
            _this._consecutiveErrors = 0;
            done(shouldPOSTData, res);
        });
        req.on("error", function (error) {
            // Unable to contact qps endpoint.
            // Do nothing for now.
            _this._consecutiveErrors++;
            // LOG every error, but WARN instead when X number of consecutive errors occur
            var notice = "Transient error connecting to the Live Metrics endpoint. This packet will not appear in your Live Metrics Stream. Error:";
            if (_this._consecutiveErrors % QuickPulseSender.MAX_QPS_FAILURES_BEFORE_WARN === 0) {
                notice = "Live Metrics endpoint could not be reached " + _this._consecutiveErrors + " consecutive times. Most recent error:";
                Logging.warn(QuickPulseSender.TAG, notice, error);
            }
            else {
                // Potentially transient error, do not change the ping/post state yet.
                Logging.info(QuickPulseSender.TAG, notice, error);
            }
            done();
        });
        req.write(payload);
        req.end();
        var _a, _b;
    };
    QuickPulseSender.TAG = "QuickPulseSender";
    QuickPulseSender.MAX_QPS_FAILURES_BEFORE_WARN = 25;
    return QuickPulseSender;
}());
module.exports = QuickPulseSender;
//# sourceMappingURL=QuickPulseSender.js.map

/***/ }),

/***/ 8725:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var Logging = __webpack_require__(4652);
var Config = __webpack_require__(5499);
var QuickPulseEnvelopeFactory = __webpack_require__(1362);
var QuickPulseSender = __webpack_require__(9001);
var Constants = __webpack_require__(9722);
var Context = __webpack_require__(2463);
/** State Container for sending to the QuickPulse Service */
var QuickPulseStateManager = (function () {
    function QuickPulseStateManager(iKey, context) {
        this._isCollectingData = false;
        this._lastSuccessTime = Date.now();
        this._lastSendSucceeded = true;
        this._metrics = {};
        this._documents = [];
        this._collectors = [];
        this.config = new Config(iKey);
        this.context = context || new Context();
        this._sender = new QuickPulseSender(this.config);
        this._isEnabled = false;
    }
    /**
     *
     * @param collector
     */
    QuickPulseStateManager.prototype.addCollector = function (collector) {
        this._collectors.push(collector);
    };
    /**
     * Override of TelemetryClient.trackMetric
     */
    QuickPulseStateManager.prototype.trackMetric = function (telemetry) {
        this._addMetric(telemetry);
    };
    /**
     * Add a document to the current buffer
     * @param envelope
     */
    QuickPulseStateManager.prototype.addDocument = function (envelope) {
        var document = QuickPulseEnvelopeFactory.telemetryEnvelopeToQuickPulseDocument(envelope);
        if (document) {
            this._documents.push(document);
        }
    };
    /**
     * Enable or disable communication with QuickPulseService
     * @param isEnabled
     */
    QuickPulseStateManager.prototype.enable = function (isEnabled) {
        if (isEnabled && !this._isEnabled) {
            this._isEnabled = true;
            this._goQuickPulse();
        }
        else if (!isEnabled && this._isEnabled) {
            this._isEnabled = false;
            clearTimeout(this._handle);
            this._handle = undefined;
        }
    };
    /**
     * Enable or disable all collectors in this instance
     * @param enable
     */
    QuickPulseStateManager.prototype.enableCollectors = function (enable) {
        this._collectors.forEach(function (collector) {
            collector.enable(enable);
        });
    };
    /**
     * Add the metric to this buffer. If same metric already exists in this buffer, add weight to it
     * @param telemetry
     */
    QuickPulseStateManager.prototype._addMetric = function (telemetry) {
        var value = telemetry.value;
        var count = telemetry.count || 1;
        var name = Constants.PerformanceToQuickPulseCounter[telemetry.name];
        if (name) {
            if (this._metrics[name]) {
                this._metrics[name].Value = (this._metrics[name].Value * this._metrics[name].Weight + value * count) / (this._metrics[name].Weight + count);
                this._metrics[name].Weight += count;
            }
            else {
                this._metrics[name] = QuickPulseEnvelopeFactory.createQuickPulseMetric(telemetry);
                this._metrics[name].Name = name;
                this._metrics[name].Weight = 1;
            }
        }
    };
    QuickPulseStateManager.prototype._resetQuickPulseBuffer = function () {
        delete this._metrics;
        this._metrics = {};
        this._documents.length = 0;
    };
    QuickPulseStateManager.prototype._goQuickPulse = function () {
        var _this = this;
        // Create envelope from Documents and Metrics
        var metrics = Object.keys(this._metrics).map(function (k) { return _this._metrics[k]; });
        var envelope = QuickPulseEnvelopeFactory.createQuickPulseEnvelope(metrics, this._documents.slice(), this.config, this.context);
        // Clear this document, metric buffer
        this._resetQuickPulseBuffer();
        // Send it to QuickPulseService, if collecting
        if (this._isCollectingData) {
            this._post(envelope);
        }
        else {
            this._ping(envelope);
        }
        var currentTimeout = this._isCollectingData ? QuickPulseStateManager.POST_INTERVAL : QuickPulseStateManager.PING_INTERVAL;
        if (this._isCollectingData && Date.now() - this._lastSuccessTime >= QuickPulseStateManager.MAX_POST_WAIT_TIME && !this._lastSendSucceeded) {
            // Haven't posted successfully in 20 seconds, so wait 60 seconds and ping
            this._isCollectingData = false;
            currentTimeout = QuickPulseStateManager.FALLBACK_INTERVAL;
        }
        else if (!this._isCollectingData && Date.now() - this._lastSuccessTime >= QuickPulseStateManager.MAX_PING_WAIT_TIME && !this._lastSendSucceeded) {
            // Haven't pinged successfully in 60 seconds, so wait another 60 seconds
            currentTimeout = QuickPulseStateManager.FALLBACK_INTERVAL;
        }
        this._lastSendSucceeded = null;
        this._handle = setTimeout(this._goQuickPulse.bind(this), currentTimeout);
        this._handle.unref(); // Don't block apps from terminating
    };
    QuickPulseStateManager.prototype._ping = function (envelope) {
        this._sender.ping(envelope, this._quickPulseDone.bind(this));
    };
    QuickPulseStateManager.prototype._post = function (envelope) {
        this._sender.post(envelope, this._quickPulseDone.bind(this));
    };
    /**
     * Change the current QPS send state. (shouldPOST == undefined) --> error, but do not change the state yet.
     */
    QuickPulseStateManager.prototype._quickPulseDone = function (shouldPOST, res) {
        if (shouldPOST != undefined) {
            if (this._isCollectingData !== shouldPOST) {
                Logging.info("Live Metrics sending data", shouldPOST);
                this.enableCollectors(shouldPOST);
            }
            this._isCollectingData = shouldPOST;
            if (res && res.statusCode < 300 && res.statusCode >= 200) {
                this._lastSuccessTime = Date.now();
                this._lastSendSucceeded = true;
            }
            else {
                this._lastSendSucceeded = false;
            }
        }
        else {
            // Received an error, keep the state as is
            this._lastSendSucceeded = false;
        }
    };
    QuickPulseStateManager.MAX_POST_WAIT_TIME = 20000;
    QuickPulseStateManager.MAX_PING_WAIT_TIME = 60000;
    QuickPulseStateManager.FALLBACK_INTERVAL = 60000;
    QuickPulseStateManager.PING_INTERVAL = 5000;
    QuickPulseStateManager.POST_INTERVAL = 1000;
    return QuickPulseStateManager;
}());
module.exports = QuickPulseStateManager;
//# sourceMappingURL=QuickPulseStateManager.js.map

/***/ }),

/***/ 5682:
/***/ ((module) => {

"use strict";

/**
 * @description UTC time the request was made. Expressed as the number of 100-nanosecond intervals that have elapsed since 12:00:00 midnight on January 1, 0001. This is used for clock skew calculations, so the value can never be stale (cached).
 *
 * @example
 * 8/5/2020 10:15:00 PM UTC => 637322625000000000
 * 8/5/2020 10:15:01 PM UTC => 637322625010000000
 *
 * @returns {number}
 */
var getTransmissionTime = function () {
    return (Date.now() + 62135596800000) * 10000;
};
module.exports = { getTransmissionTime: getTransmissionTime };
//# sourceMappingURL=QuickPulseUtil.js.map

/***/ }),

/***/ 9663:
/***/ ((module) => {

"use strict";

module.exports = {
    /**
     * Request-Context header
     */
    requestContextHeader: "request-context",
    /**
     * Source instrumentation header that is added by an application while making http
     * requests and retrieved by the other application when processing incoming requests.
     */
    requestContextSourceKey: "appId",
    /**
     * Target instrumentation header that is added to the response and retrieved by the
     * calling application when processing incoming responses.
     */
    requestContextTargetKey: "appId",
    /**
     * Request-Id header
     */
    requestIdHeader: "request-id",
    /**
     * Legacy Header containing the id of the immediate caller
     */
    parentIdHeader: "x-ms-request-id",
    /**
     * Legacy Header containing the correlation id that kept the same for every telemetry item
     * across transactions
     */
    rootIdHeader: "x-ms-request-root-id",
    /**
     * Correlation-Context header
     *
     * Not currently actively used, but the contents should be passed from incoming to outgoing requests
     */
    correlationContextHeader: "correlation-context",
    /**
     * W3C distributed tracing protocol header
     */
    traceparentHeader: "traceparent",
    /**
     * W3C distributed tracing protocol state header
     */
    traceStateHeader: "tracestate"
};
//# sourceMappingURL=RequestResponseHeaders.js.map

/***/ }),

/***/ 3597:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fs = __webpack_require__(5747);
var os = __webpack_require__(2087);
var path = __webpack_require__(5622);
var zlib = __webpack_require__(8761);
var child_process = __webpack_require__(3129);
var Logging = __webpack_require__(4652);
var AutoCollectHttpDependencies = __webpack_require__(5679);
var Util = __webpack_require__(834);
var Sender = (function () {
    function Sender(config, onSuccess, onError) {
        this._config = config;
        this._onSuccess = onSuccess;
        this._onError = onError;
        this._enableDiskRetryMode = false;
        this._resendInterval = Sender.WAIT_BETWEEN_RESEND;
        this._maxBytesOnDisk = Sender.MAX_BYTES_ON_DISK;
        this._numConsecutiveFailures = 0;
        this._resendTimer = null;
        if (!Sender.OS_PROVIDES_FILE_PROTECTION) {
            // Node's chmod levels do not appropriately restrict file access on Windows
            // Use the built-in command line tool ICACLS on Windows to properly restrict
            // access to the temporary directory used for disk retry mode.
            if (Sender.USE_ICACLS) {
                // This should be async - but it's currently safer to have this synchronous
                // This guarantees we can immediately fail setDiskRetryMode if we need to
                try {
                    Sender.OS_PROVIDES_FILE_PROTECTION = fs.existsSync(Sender.ICACLS_PATH);
                }
                catch (e) { }
                if (!Sender.OS_PROVIDES_FILE_PROTECTION) {
                    Logging.warn(Sender.TAG, "Could not find ICACLS in expected location! This is necessary to use disk retry mode on Windows.");
                }
            }
            else {
                // chmod works everywhere else
                Sender.OS_PROVIDES_FILE_PROTECTION = true;
            }
        }
    }
    /**
    * Enable or disable offline mode
    */
    Sender.prototype.setDiskRetryMode = function (value, resendInterval, maxBytesOnDisk) {
        this._enableDiskRetryMode = Sender.OS_PROVIDES_FILE_PROTECTION && value;
        if (typeof resendInterval === 'number' && resendInterval >= 0) {
            this._resendInterval = Math.floor(resendInterval);
        }
        if (typeof maxBytesOnDisk === 'number' && maxBytesOnDisk >= 0) {
            this._maxBytesOnDisk = Math.floor(maxBytesOnDisk);
        }
        if (value && !Sender.OS_PROVIDES_FILE_PROTECTION) {
            this._enableDiskRetryMode = false;
            Logging.warn(Sender.TAG, "Ignoring request to enable disk retry mode. Sufficient file protection capabilities were not detected.");
        }
    };
    Sender.prototype.send = function (payload, callback) {
        var _this = this;
        var endpointUrl = this._config.endpointUrl;
        // todo: investigate specifying an agent here: https://nodejs.org/api/http.html#http_class_http_agent
        var options = {
            method: "POST",
            withCredentials: false,
            headers: {
                "Content-Type": "application/x-json-stream"
            }
        };
        zlib.gzip(payload, function (err, buffer) {
            var dataToSend = buffer;
            if (err) {
                Logging.warn(err);
                dataToSend = payload; // something went wrong so send without gzip
                options.headers["Content-Length"] = payload.length.toString();
            }
            else {
                options.headers["Content-Encoding"] = "gzip";
                options.headers["Content-Length"] = buffer.length;
            }
            Logging.info(Sender.TAG, options);
            // Ensure this request is not captured by auto-collection.
            options[AutoCollectHttpDependencies.disableCollectionRequestOption] = true;
            var requestCallback = function (res) {
                res.setEncoding("utf-8");
                //returns empty if the data is accepted
                var responseString = "";
                res.on("data", function (data) {
                    responseString += data;
                });
                res.on("end", function () {
                    _this._numConsecutiveFailures = 0;
                    Logging.info(Sender.TAG, responseString);
                    if (typeof _this._onSuccess === "function") {
                        _this._onSuccess(responseString);
                    }
                    if (typeof callback === "function") {
                        callback(responseString);
                    }
                    if (_this._enableDiskRetryMode) {
                        // try to send any cached events if the user is back online
                        if (res.statusCode === 200) {
                            if (!_this._resendTimer) {
                                _this._resendTimer = setTimeout(function () {
                                    _this._resendTimer = null;
                                    _this._sendFirstFileOnDisk();
                                }, _this._resendInterval);
                                _this._resendTimer.unref();
                            }
                            // store to disk in case of burst throttling
                        }
                        else if (res.statusCode === 408 ||
                            res.statusCode === 429 ||
                            res.statusCode === 439 ||
                            res.statusCode === 500 ||
                            res.statusCode === 503) {
                            // TODO: Do not support partial success (206) until _sendFirstFileOnDisk checks payload age
                            _this._storeToDisk(payload);
                        }
                    }
                });
            };
            var req = Util.makeRequest(_this._config, endpointUrl, options, requestCallback);
            req.on("error", function (error) {
                // todo: handle error codes better (group to recoverable/non-recoverable and persist)
                _this._numConsecutiveFailures++;
                // Only use warn level if retries are disabled or we've had some number of consecutive failures sending data
                // This is because warn level is printed in the console by default, and we don't want to be noisy for transient and self-recovering errors
                // Continue informing on each failure if verbose logging is being used
                if (!_this._enableDiskRetryMode || _this._numConsecutiveFailures > 0 && _this._numConsecutiveFailures % Sender.MAX_CONNECTION_FAILURES_BEFORE_WARN === 0) {
                    var notice = "Ingestion endpoint could not be reached. This batch of telemetry items has been lost. Use Disk Retry Caching to enable resending of failed telemetry. Error:";
                    if (_this._enableDiskRetryMode) {
                        notice = "Ingestion endpoint could not be reached " + _this._numConsecutiveFailures + " consecutive times. There may be resulting telemetry loss. Most recent error:";
                    }
                    Logging.warn(Sender.TAG, notice, error);
                }
                else {
                    var notice = "Transient failure to reach ingestion endpoint. This batch of telemetry items will be retried. Error:";
                    Logging.info(Sender.TAG, notice, error);
                }
                _this._onErrorHelper(error);
                if (typeof callback === "function") {
                    var errorMessage = "error sending telemetry";
                    if (error && (typeof error.toString === "function")) {
                        errorMessage = error.toString();
                    }
                    callback(errorMessage);
                }
                if (_this._enableDiskRetryMode) {
                    _this._storeToDisk(payload);
                }
            });
            req.write(dataToSend);
            req.end();
        });
    };
    Sender.prototype.saveOnCrash = function (payload) {
        if (this._enableDiskRetryMode) {
            this._storeToDiskSync(payload);
        }
    };
    Sender.prototype._runICACLS = function (args, callback) {
        var aclProc = child_process.spawn(Sender.ICACLS_PATH, args, { windowsHide: true });
        aclProc.on("error", function (e) { return callback(e); });
        aclProc.on("close", function (code, signal) {
            return callback(code === 0 ? null : new Error("Setting ACL restrictions did not succeed (ICACLS returned code " + code + ")"));
        });
    };
    Sender.prototype._runICACLSSync = function (args) {
        // Some very old versions of Node (< 0.11) don't have this
        if (child_process.spawnSync) {
            var aclProc = child_process.spawnSync(Sender.ICACLS_PATH, args, { windowsHide: true });
            if (aclProc.error) {
                throw aclProc.error;
            }
            else if (aclProc.status !== 0) {
                throw new Error("Setting ACL restrictions did not succeed (ICACLS returned code " + aclProc.status + ")");
            }
        }
        else {
            throw new Error("Could not synchronously call ICACLS under current version of Node.js");
        }
    };
    Sender.prototype._getACLIdentity = function (callback) {
        if (Sender.ACL_IDENTITY) {
            return callback(null, Sender.ACL_IDENTITY);
        }
        var psProc = child_process.spawn(Sender.POWERSHELL_PATH, ["-Command", "[System.Security.Principal.WindowsIdentity]::GetCurrent().Name"], {
            windowsHide: true,
            stdio: ['ignore', 'pipe', 'pipe'] // Needed to prevent hanging on Win 7
        });
        var data = "";
        psProc.stdout.on("data", function (d) { return data += d; });
        psProc.on("error", function (e) { return callback(e, null); });
        psProc.on("close", function (code, signal) {
            Sender.ACL_IDENTITY = data && data.trim();
            return callback(code === 0 ? null : new Error("Getting ACL identity did not succeed (PS returned code " + code + ")"), Sender.ACL_IDENTITY);
        });
    };
    Sender.prototype._getACLIdentitySync = function () {
        if (Sender.ACL_IDENTITY) {
            return Sender.ACL_IDENTITY;
        }
        // Some very old versions of Node (< 0.11) don't have this
        if (child_process.spawnSync) {
            var psProc = child_process.spawnSync(Sender.POWERSHELL_PATH, ["-Command", "[System.Security.Principal.WindowsIdentity]::GetCurrent().Name"], {
                windowsHide: true,
                stdio: ['ignore', 'pipe', 'pipe'] // Needed to prevent hanging on Win 7
            });
            if (psProc.error) {
                throw psProc.error;
            }
            else if (psProc.status !== 0) {
                throw new Error("Getting ACL identity did not succeed (PS returned code " + psProc.status + ")");
            }
            Sender.ACL_IDENTITY = psProc.stdout && psProc.stdout.toString().trim();
            return Sender.ACL_IDENTITY;
        }
        else {
            throw new Error("Could not synchronously get ACL identity under current version of Node.js");
        }
    };
    Sender.prototype._getACLArguments = function (directory, identity) {
        return [directory,
            "/grant", "*S-1-5-32-544:(OI)(CI)F",
            "/grant", identity + ":(OI)(CI)F",
            "/inheritance:r"]; // Remove all inherited permissions
    };
    Sender.prototype._applyACLRules = function (directory, callback) {
        var _this = this;
        if (!Sender.USE_ICACLS) {
            return callback(null);
        }
        // For performance, only run ACL rules if we haven't already during this session
        if (Sender.ACLED_DIRECTORIES[directory] === undefined) {
            // Avoid multiple calls race condition by setting ACLED_DIRECTORIES to false for this directory immediately
            // If batches are being failed faster than the processes spawned below return, some data won't be stored to disk
            // This is better than the alternative of potentially infinitely spawned processes
            Sender.ACLED_DIRECTORIES[directory] = false;
            // Restrict this directory to only current user and administrator access
            this._getACLIdentity(function (err, identity) {
                if (err) {
                    Sender.ACLED_DIRECTORIES[directory] = false; // false is used to cache failed (vs undefined which is "not yet tried")
                    return callback(err);
                }
                else {
                    _this._runICACLS(_this._getACLArguments(directory, identity), function (err) {
                        Sender.ACLED_DIRECTORIES[directory] = !err;
                        return callback(err);
                    });
                }
            });
        }
        else {
            return callback(Sender.ACLED_DIRECTORIES[directory] ? null :
                new Error("Setting ACL restrictions did not succeed (cached result)"));
        }
    };
    Sender.prototype._applyACLRulesSync = function (directory) {
        if (Sender.USE_ICACLS) {
            // For performance, only run ACL rules if we haven't already during this session
            if (Sender.ACLED_DIRECTORIES[directory] === undefined) {
                this._runICACLSSync(this._getACLArguments(directory, this._getACLIdentitySync()));
                Sender.ACLED_DIRECTORIES[directory] = true; // If we get here, it succeeded. _runIACLSSync will throw on failures
                return;
            }
            else if (!Sender.ACLED_DIRECTORIES[directory]) {
                throw new Error("Setting ACL restrictions did not succeed (cached result)");
            }
        }
    };
    Sender.prototype._confirmDirExists = function (directory, callback) {
        var _this = this;
        fs.lstat(directory, function (err, stats) {
            if (err && err.code === 'ENOENT') {
                fs.mkdir(directory, function (err) {
                    if (err && err.code !== 'EEXIST') {
                        callback(err);
                    }
                    else {
                        _this._applyACLRules(directory, callback);
                    }
                });
            }
            else if (!err && stats.isDirectory()) {
                _this._applyACLRules(directory, callback);
            }
            else {
                callback(err || new Error("Path existed but was not a directory"));
            }
        });
    };
    /**
     * Computes the size (in bytes) of all files in a directory at the root level. Asynchronously.
     */
    Sender.prototype._getShallowDirectorySize = function (directory, callback) {
        // Get the directory listing
        fs.readdir(directory, function (err, files) {
            if (err) {
                return callback(err, -1);
            }
            var error = null;
            var totalSize = 0;
            var count = 0;
            if (files.length === 0) {
                callback(null, 0);
                return;
            }
            // Query all file sizes
            for (var i = 0; i < files.length; i++) {
                fs.stat(path.join(directory, files[i]), function (err, fileStats) {
                    count++;
                    if (err) {
                        error = err;
                    }
                    else {
                        if (fileStats.isFile()) {
                            totalSize += fileStats.size;
                        }
                    }
                    if (count === files.length) {
                        // Did we get an error?
                        if (error) {
                            callback(error, -1);
                        }
                        else {
                            callback(error, totalSize);
                        }
                    }
                });
            }
        });
    };
    /**
     * Computes the size (in bytes) of all files in a directory at the root level. Synchronously.
     */
    Sender.prototype._getShallowDirectorySizeSync = function (directory) {
        var files = fs.readdirSync(directory);
        var totalSize = 0;
        for (var i = 0; i < files.length; i++) {
            totalSize += fs.statSync(path.join(directory, files[i])).size;
        }
        return totalSize;
    };
    /**
     * Stores the payload as a json file on disk in the temp directory
     */
    Sender.prototype._storeToDisk = function (payload) {
        var _this = this;
        // tmpdir is /tmp for *nix and USERDIR/AppData/Local/Temp for Windows
        var directory = path.join(os.tmpdir(), Sender.TEMPDIR_PREFIX + this._config.instrumentationKey);
        // This will create the dir if it does not exist
        // Default permissions on *nix are directory listing from other users but no file creations
        Logging.info(Sender.TAG, "Checking existence of data storage directory: " + directory);
        this._confirmDirExists(directory, function (error) {
            if (error) {
                Logging.warn(Sender.TAG, "Error while checking/creating directory: " + (error && error.message));
                _this._onErrorHelper(error);
                return;
            }
            _this._getShallowDirectorySize(directory, function (err, size) {
                if (err || size < 0) {
                    Logging.warn(Sender.TAG, "Error while checking directory size: " + (err && err.message));
                    _this._onErrorHelper(err);
                    return;
                }
                else if (size > _this._maxBytesOnDisk) {
                    Logging.warn(Sender.TAG, "Not saving data due to max size limit being met. Directory size in bytes is: " + size);
                    return;
                }
                //create file - file name for now is the timestamp, a better approach would be a UUID but that
                //would require an external dependency
                var fileName = new Date().getTime() + ".ai.json";
                var fileFullPath = path.join(directory, fileName);
                // Mode 600 is w/r for creator and no read access for others (only applies on *nix)
                // For Windows, ACL rules are applied to the entire directory (see logic in _confirmDirExists and _applyACLRules)
                Logging.info(Sender.TAG, "saving data to disk at: " + fileFullPath);
                fs.writeFile(fileFullPath, payload, { mode: 384 }, function (error) { return _this._onErrorHelper(error); });
            });
        });
    };
    /**
     * Stores the payload as a json file on disk using sync file operations
     * this is used when storing data before crashes
     */
    Sender.prototype._storeToDiskSync = function (payload) {
        // tmpdir is /tmp for *nix and USERDIR/AppData/Local/Temp for Windows
        var directory = path.join(os.tmpdir(), Sender.TEMPDIR_PREFIX + this._config.instrumentationKey);
        try {
            Logging.info(Sender.TAG, "Checking existence of data storage directory: " + directory);
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory);
            }
            // Make sure permissions are valid
            this._applyACLRulesSync(directory);
            var dirSize = this._getShallowDirectorySizeSync(directory);
            if (dirSize > this._maxBytesOnDisk) {
                Logging.info(Sender.TAG, "Not saving data due to max size limit being met. Directory size in bytes is: " + dirSize);
                return;
            }
            //create file - file name for now is the timestamp, a better approach would be a UUID but that
            //would require an external dependency
            var fileName = new Date().getTime() + ".ai.json";
            var fileFullPath = path.join(directory, fileName);
            // Mode 600 is w/r for creator and no access for anyone else (only applies on *nix)
            Logging.info(Sender.TAG, "saving data before crash to disk at: " + fileFullPath);
            fs.writeFileSync(fileFullPath, payload, { mode: 384 });
        }
        catch (error) {
            Logging.warn(Sender.TAG, "Error while saving data to disk: " + (error && error.message));
            this._onErrorHelper(error);
        }
    };
    /**
     * Check for temp telemetry files
     * reads the first file if exist, deletes it and tries to send its load
     */
    Sender.prototype._sendFirstFileOnDisk = function () {
        var _this = this;
        var tempDir = path.join(os.tmpdir(), Sender.TEMPDIR_PREFIX + this._config.instrumentationKey);
        fs.exists(tempDir, function (exists) {
            if (exists) {
                fs.readdir(tempDir, function (error, files) {
                    if (!error) {
                        files = files.filter(function (f) { return path.basename(f).indexOf(".ai.json") > -1; });
                        if (files.length > 0) {
                            var firstFile = files[0];
                            var filePath = path.join(tempDir, firstFile);
                            fs.readFile(filePath, function (error, payload) {
                                if (!error) {
                                    // delete the file first to prevent double sending
                                    fs.unlink(filePath, function (error) {
                                        if (!error) {
                                            _this.send(payload);
                                        }
                                        else {
                                            _this._onErrorHelper(error);
                                        }
                                    });
                                }
                                else {
                                    _this._onErrorHelper(error);
                                }
                            });
                        }
                    }
                    else {
                        _this._onErrorHelper(error);
                    }
                });
            }
        });
    };
    Sender.prototype._onErrorHelper = function (error) {
        if (typeof this._onError === "function") {
            this._onError(error);
        }
    };
    Sender.TAG = "Sender";
    Sender.ICACLS_PATH = process.env.systemdrive + "/windows/system32/icacls.exe";
    Sender.POWERSHELL_PATH = process.env.systemdrive + "/windows/system32/windowspowershell/v1.0/powershell.exe";
    Sender.ACLED_DIRECTORIES = {};
    Sender.ACL_IDENTITY = null;
    // the amount of time the SDK will wait between resending cached data, this buffer is to avoid any throttling from the service side
    Sender.WAIT_BETWEEN_RESEND = 60 * 1000;
    Sender.MAX_BYTES_ON_DISK = 50 * 1000 * 1000;
    Sender.MAX_CONNECTION_FAILURES_BEFORE_WARN = 5;
    Sender.TEMPDIR_PREFIX = "appInsights-node";
    Sender.OS_PROVIDES_FILE_PROTECTION = false;
    Sender.USE_ICACLS = os.type() === "Windows_NT";
    return Sender;
}());
module.exports = Sender;
//# sourceMappingURL=Sender.js.map

/***/ }),

/***/ 1975:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var url = __webpack_require__(8835);
var Config = __webpack_require__(5499);
var Context = __webpack_require__(2463);
var Contracts = __webpack_require__(5312);
var Channel = __webpack_require__(538);
var TelemetryProcessors = __webpack_require__(73);
var CorrelationContextManager_1 = __webpack_require__(2740);
var Sender = __webpack_require__(3597);
var Util = __webpack_require__(834);
var Logging = __webpack_require__(4652);
var EnvelopeFactory = __webpack_require__(5517);
/**
 * Application Insights telemetry client provides interface to track telemetry items, register telemetry initializers and
 * and manually trigger immediate sending (flushing)
 */
var TelemetryClient = (function () {
    /**
     * Constructs a new client of the client
     * @param setupString the Connection String or Instrumentation Key to use (read from environment variable if not specified)
     */
    function TelemetryClient(setupString) {
        this._telemetryProcessors = [];
        var config = new Config(setupString);
        this.config = config;
        this.context = new Context();
        this.commonProperties = {};
        var sender = new Sender(this.config);
        this.channel = new Channel(function () { return config.disableAppInsights; }, function () { return config.maxBatchSize; }, function () { return config.maxBatchIntervalMs; }, sender);
    }
    /**
     * Log information about availability of an application
     * @param telemetry      Object encapsulating tracking options
     */
    TelemetryClient.prototype.trackAvailability = function (telemetry) {
        this.track(telemetry, Contracts.TelemetryType.Availability);
    };
    /**
     * Log a page view
     * @param telemetry      Object encapsulating tracking options
     */
    TelemetryClient.prototype.trackPageView = function (telemetry) {
        this.track(telemetry, Contracts.TelemetryType.PageView);
    };
    /**
     * Log a trace message
     * @param telemetry      Object encapsulating tracking options
     */
    TelemetryClient.prototype.trackTrace = function (telemetry) {
        this.track(telemetry, Contracts.TelemetryType.Trace);
    };
    /**
     * Log a numeric value that is not associated with a specific event. Typically used to send regular reports of performance indicators.
     * To send a single measurement, use just the first two parameters. If you take measurements very frequently, you can reduce the
     * telemetry bandwidth by aggregating multiple measurements and sending the resulting average at intervals.
     * @param telemetry      Object encapsulating tracking options
     */
    TelemetryClient.prototype.trackMetric = function (telemetry) {
        this.track(telemetry, Contracts.TelemetryType.Metric);
    };
    /**
     * Log an exception
     * @param telemetry      Object encapsulating tracking options
     */
    TelemetryClient.prototype.trackException = function (telemetry) {
        if (telemetry && telemetry.exception && !Util.isError(telemetry.exception)) {
            telemetry.exception = new Error(telemetry.exception.toString());
        }
        this.track(telemetry, Contracts.TelemetryType.Exception);
    };
    /**
     * Log a user action or other occurrence.
     * @param telemetry      Object encapsulating tracking options
     */
    TelemetryClient.prototype.trackEvent = function (telemetry) {
        this.track(telemetry, Contracts.TelemetryType.Event);
    };
    /**
     * Log a request. Note that the default client will attempt to collect HTTP requests automatically so only use this for requests
     * that aren't automatically captured or if you've disabled automatic request collection.
     *
     * @param telemetry      Object encapsulating tracking options
     */
    TelemetryClient.prototype.trackRequest = function (telemetry) {
        this.track(telemetry, Contracts.TelemetryType.Request);
    };
    /**
     * Log a dependency. Note that the default client will attempt to collect dependencies automatically so only use this for dependencies
     * that aren't automatically captured or if you've disabled automatic dependency collection.
     *
     * @param telemetry      Object encapsulating tracking option
     * */
    TelemetryClient.prototype.trackDependency = function (telemetry) {
        if (telemetry && !telemetry.target && telemetry.data) {
            // url.parse().host returns null for non-urls,
            // making this essentially a no-op in those cases
            // If this logic is moved, update jsdoc in DependencyTelemetry.target
            telemetry.target = url.parse(telemetry.data).host;
        }
        this.track(telemetry, Contracts.TelemetryType.Dependency);
    };
    /**
     * Immediately send all queued telemetry.
     * @param options Flush options, including indicator whether app is crashing and callback
     */
    TelemetryClient.prototype.flush = function (options) {
        this.channel.triggerSend(options ? !!options.isAppCrashing : false, options ? options.callback : undefined);
    };
    /**
     * Generic track method for all telemetry types
     * @param data the telemetry to send
     * @param telemetryType specify the type of telemetry you are tracking from the list of Contracts.DataTypes
     */
    TelemetryClient.prototype.track = function (telemetry, telemetryType) {
        if (telemetry && Contracts.telemetryTypeToBaseType(telemetryType)) {
            var envelope = EnvelopeFactory.createEnvelope(telemetry, telemetryType, this.commonProperties, this.context, this.config);
            // Set time on the envelope if it was set on the telemetry item
            if (telemetry.time) {
                envelope.time = telemetry.time.toISOString();
            }
            var accepted = this.runTelemetryProcessors(envelope, telemetry.contextObjects);
            // Ideally we would have a central place for "internal" telemetry processors and users can configure which ones are in use.
            // This will do for now. Otherwise clearTelemetryProcessors() would be problematic.
            accepted = accepted && TelemetryProcessors.samplingTelemetryProcessor(envelope, { correlationContext: CorrelationContextManager_1.CorrelationContextManager.getCurrentContext() });
            if (accepted) {
                TelemetryProcessors.performanceMetricsTelemetryProcessor(envelope, this.quickPulseClient);
                this.channel.send(envelope);
            }
        }
        else {
            Logging.warn("track() requires telemetry object and telemetryType to be specified.");
        }
    };
    /**
     * Adds telemetry processor to the collection. Telemetry processors will be called one by one
     * before telemetry item is pushed for sending and in the order they were added.
     *
     * @param telemetryProcessor function, takes Envelope, and optional context object and returns boolean
     */
    TelemetryClient.prototype.addTelemetryProcessor = function (telemetryProcessor) {
        this._telemetryProcessors.push(telemetryProcessor);
    };
    /*
     * Removes all telemetry processors
     */
    TelemetryClient.prototype.clearTelemetryProcessors = function () {
        this._telemetryProcessors = [];
    };
    TelemetryClient.prototype.runTelemetryProcessors = function (envelope, contextObjects) {
        var accepted = true;
        var telemetryProcessorsCount = this._telemetryProcessors.length;
        if (telemetryProcessorsCount === 0) {
            return accepted;
        }
        contextObjects = contextObjects || {};
        contextObjects['correlationContext'] = CorrelationContextManager_1.CorrelationContextManager.getCurrentContext();
        for (var i = 0; i < telemetryProcessorsCount; ++i) {
            try {
                var processor = this._telemetryProcessors[i];
                if (processor) {
                    if (processor.apply(null, [envelope, contextObjects]) === false) {
                        accepted = false;
                        break;
                    }
                }
            }
            catch (error) {
                accepted = true;
                Logging.warn("One of telemetry processors failed, telemetry item will be sent.", error, envelope);
            }
        }
        return accepted;
    };
    return TelemetryClient;
}());
module.exports = TelemetryClient;
//# sourceMappingURL=TelemetryClient.js.map

/***/ }),

/***/ 2185:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var Util = __webpack_require__(834);
var CorrelationIdManager = __webpack_require__(1360);
/**
 * Helper class to manage parsing and validation of traceparent header. Also handles hierarchical
 * back-compatibility headers generated from traceparent. W3C traceparent spec is documented at
 * https://www.w3.org/TR/trace-context/#traceparent-field
 */
var Traceparent = (function () {
    function Traceparent(traceparent, parentId) {
        this.traceFlag = Traceparent.DEFAULT_TRACE_FLAG;
        this.version = Traceparent.DEFAULT_VERSION;
        if (traceparent && typeof traceparent === "string") {
            // If incoming request contains traceparent: parse it, set operation, parent and telemetry id accordingly. traceparent should be injected into outgoing requests. request-id should be injected in back-compat format |traceId.spanId. so that older SDKs could understand it.
            if (traceparent.split(",").length > 1) {
                this.traceId = Util.w3cTraceId();
                this.spanId = Util.w3cTraceId().substr(0, 16);
            }
            else {
                var traceparentArr = traceparent.trim().split("-");
                var len = traceparentArr.length;
                if (len >= 4) {
                    this.version = traceparentArr[0];
                    this.traceId = traceparentArr[1];
                    this.spanId = traceparentArr[2];
                    this.traceFlag = traceparentArr[3];
                }
                else {
                    this.traceId = Util.w3cTraceId();
                    this.spanId = Util.w3cTraceId().substr(0, 16);
                }
                // Version validation
                if (!this.version.match(/^[0-9a-f]{2}$/g)) {
                    this.version = Traceparent.DEFAULT_VERSION;
                    this.traceId = Util.w3cTraceId();
                }
                if (this.version === "00" && len !== 4) {
                    this.traceId = Util.w3cTraceId();
                    this.spanId = Util.w3cTraceId().substr(0, 16);
                }
                if (this.version === "ff") {
                    this.version = Traceparent.DEFAULT_VERSION;
                    this.traceId = Util.w3cTraceId();
                    this.spanId = Util.w3cTraceId().substr(0, 16);
                }
                if (!this.version.match(/^0[0-9a-f]$/g)) {
                    this.version = Traceparent.DEFAULT_VERSION;
                }
                // TraceFlag validation
                if (!this.traceFlag.match(/^[0-9a-f]{2}$/g)) {
                    this.traceFlag = Traceparent.DEFAULT_TRACE_FLAG;
                    this.traceId = Util.w3cTraceId();
                }
                // Validate TraceId, regenerate new traceid if invalid
                if (!Traceparent.isValidTraceId(this.traceId)) {
                    this.traceId = Util.w3cTraceId();
                }
                // Validate Span Id, discard entire traceparent if invalid
                if (!Traceparent.isValidSpanId(this.spanId)) {
                    this.spanId = Util.w3cTraceId().substr(0, 16);
                    this.traceId = Util.w3cTraceId();
                }
                // Save backCompat parentId
                this.parentId = this.getBackCompatRequestId();
            }
        }
        else if (parentId) {
            // If incoming request contains only request-id, new traceid and spanid should be started, request-id value should be used as a parent. Root part of request-id should be stored in custom dimension on the request telemetry if root part is different from traceid. On the outgoing request side, request-id should be emitted in the |traceId.spanId. format.
            this.parentId = parentId.slice(); // copy
            var operationId = CorrelationIdManager.getRootId(parentId);
            if (!Traceparent.isValidTraceId(operationId)) {
                this.legacyRootId = operationId;
                operationId = Util.w3cTraceId();
            }
            if (parentId.indexOf("|") !== -1) {
                parentId = parentId.substring(1 + parentId.substring(0, parentId.length - 1).lastIndexOf("."), parentId.length - 1);
            }
            this.traceId = operationId;
            this.spanId = parentId;
        }
        else {
            // Fallback default constructor
            // if request does not contain any correlation headers, see case p2
            this.traceId = Util.w3cTraceId();
            this.spanId = Util.w3cTraceId().substr(0, 16);
        }
    }
    Traceparent.isValidTraceId = function (id) {
        return id.match(/^[0-9a-f]{32}$/) && id !== "00000000000000000000000000000000";
    };
    Traceparent.isValidSpanId = function (id) {
        return id.match(/^[0-9a-f]{16}$/) && id !== "0000000000000000";
    };
    Traceparent.prototype.getBackCompatRequestId = function () {
        return "|" + this.traceId + "." + this.spanId + ".";
    };
    Traceparent.prototype.toString = function () {
        return this.version + "-" + this.traceId + "-" + this.spanId + "-" + this.traceFlag;
    };
    Traceparent.prototype.updateSpanId = function () {
        this.spanId = Util.w3cTraceId().substr(0, 16);
    };
    Traceparent.DEFAULT_TRACE_FLAG = "01";
    Traceparent.DEFAULT_VERSION = "00";
    return Traceparent;
}());
module.exports = Traceparent;
//# sourceMappingURL=Traceparent.js.map

/***/ }),

/***/ 4906:
/***/ ((module) => {

"use strict";

/**
 * Helper class to manage parsing and strict-validation of tracestate header. W3C tracestate spec
 * is documented at https://www.w3.org/TR/trace-context/#header-value
 * @class Tracestate
 */
var Tracestate = (function () {
    // if true, performs strict tracestate header checking, else just passes it along
    function Tracestate(id) {
        this.fieldmap = [];
        if (!id) {
            return;
        }
        this.fieldmap = this.parseHeader(id);
    }
    Tracestate.prototype.toString = function () {
        var fieldarr = this.fieldmap;
        if (!fieldarr || fieldarr.length == 0) {
            return null;
        }
        return fieldarr.join(", ");
    };
    Tracestate.validateKeyChars = function (key) {
        var keyParts = key.split("@");
        if (keyParts.length == 2) {
            // Parse for tenant@vendor format
            var tenant = keyParts[0].trim();
            var vendor = keyParts[1].trim();
            var tenantValid = Boolean(tenant.match(/^[\ ]?[a-z0-9\*\-\_/]{1,241}$/));
            var vendorValid = Boolean(vendor.match(/^[\ ]?[a-z0-9\*\-\_/]{1,14}$/));
            return tenantValid && vendorValid;
        }
        else if (keyParts.length == 1) {
            // Parse for standard key format
            return Boolean(key.match(/^[\ ]?[a-z0-9\*\-\_/]{1,256}$/));
        }
        return false;
    };
    Tracestate.prototype.parseHeader = function (id) {
        var res = [];
        var keydeduper = {};
        var parts = id.split(",");
        if (parts.length > 32)
            return null;
        for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
            var rawPart = parts_1[_i];
            var part = rawPart.trim(); // trim out whitespace
            if (part.length === 0) {
                continue; // Discard empty pairs, but keep the rest of this tracestate
            }
            var pair = part.split("=");
            // pair should contain exactly one "="
            if (pair.length !== 2) {
                return null; // invalid pair: discard entire tracestate
            }
            // Validate length and charset of this key
            if (!Tracestate.validateKeyChars(pair[0])) {
                return null;
            }
            // Assert uniqueness of this key
            if (keydeduper[pair[0]]) {
                return null; // duplicate key: discard entire tracestate
            }
            else {
                keydeduper[pair[0]] = true;
            }
            // All checks passed -- add this part
            res.push(part);
        }
        return res;
    };
    Tracestate.strict = true;
    return Tracestate;
}());
module.exports = Tracestate;
//# sourceMappingURL=Tracestate.js.map

/***/ }),

/***/ 834:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var http = __webpack_require__(8605);
var https = __webpack_require__(7211);
var url = __webpack_require__(8835);
var constants = __webpack_require__(7619);
var Logging = __webpack_require__(4652);
var RequestResponseHeaders = __webpack_require__(9663);
var Util = (function () {
    function Util() {
    }
    /**
     * helper method to access userId and sessionId cookie
     */
    Util.getCookie = function (name, cookie) {
        var value = "";
        if (name && name.length && typeof cookie === "string") {
            var cookieName = name + "=";
            var cookies = cookie.split(";");
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                cookie = Util.trim(cookie);
                if (cookie && cookie.indexOf(cookieName) === 0) {
                    value = cookie.substring(cookieName.length, cookies[i].length);
                    break;
                }
            }
        }
        return value;
    };
    /**
     * helper method to trim strings (IE8 does not implement String.prototype.trim)
     */
    Util.trim = function (str) {
        if (typeof str === "string") {
            return str.replace(/^\s+|\s+$/g, "");
        }
        else {
            return "";
        }
    };
    /**
     * Convert an array of int32 to Base64 (no '==' at the end).
     * MSB first.
     */
    Util.int32ArrayToBase64 = function (array) {
        var toChar = function (v, i) {
            return String.fromCharCode((v >> i) & 0xFF);
        };
        var int32AsString = function (v) {
            return toChar(v, 24) + toChar(v, 16) + toChar(v, 8) + toChar(v, 0);
        };
        var x = array.map(int32AsString).join("");
        var b = Buffer.from ? Buffer.from(x, "binary") : new Buffer(x, "binary");
        var s = b.toString("base64");
        return s.substr(0, s.indexOf("="));
    };
    /**
     * generate a random 32bit number (-0x80000000..0x7FFFFFFF).
     */
    Util.random32 = function () {
        return (0x100000000 * Math.random()) | 0;
    };
    /**
     * generate a random 32bit number (0x00000000..0xFFFFFFFF).
     */
    Util.randomu32 = function () {
        return Util.random32() + 0x80000000;
    };
    /**
     * generate W3C-compatible trace id
     * https://github.com/w3c/distributed-tracing/blob/master/trace_context/HTTP_HEADER_FORMAT.md#trace-id
     */
    Util.w3cTraceId = function () {
        var hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
        // rfc4122 version 4 UUID without dashes and with lowercase letters
        var oct = "", tmp;
        for (var a = 0; a < 4; a++) {
            tmp = Util.random32();
            oct +=
                hexValues[tmp & 0xF] +
                    hexValues[tmp >> 4 & 0xF] +
                    hexValues[tmp >> 8 & 0xF] +
                    hexValues[tmp >> 12 & 0xF] +
                    hexValues[tmp >> 16 & 0xF] +
                    hexValues[tmp >> 20 & 0xF] +
                    hexValues[tmp >> 24 & 0xF] +
                    hexValues[tmp >> 28 & 0xF];
        }
        // "Set the two most significant bits (bits 6 and 7) of the clock_seq_hi_and_reserved to zero and one, respectively"
        var clockSequenceHi = hexValues[8 + (Math.random() * 4) | 0];
        return oct.substr(0, 8) + oct.substr(9, 4) + "4" + oct.substr(13, 3) + clockSequenceHi + oct.substr(16, 3) + oct.substr(19, 12);
    };
    Util.w3cSpanId = function () {
        return Util.w3cTraceId().substring(16);
    };
    Util.isValidW3CId = function (id) {
        return id.length === 32 && id !== "00000000000000000000000000000000";
    };
    /**
     * Check if an object is of type Array
     */
    Util.isArray = function (obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
    };
    /**
     * Check if an object is of type Error
     */
    Util.isError = function (obj) {
        return obj instanceof Error;
    };
    Util.isPrimitive = function (input) {
        var propType = typeof input;
        return propType === "string" || propType === "number" || propType === "boolean";
    };
    /**
     * Check if an object is of type Date
     */
    Util.isDate = function (obj) {
        return Object.prototype.toString.call(obj) === "[object Date]";
    };
    /**
     * Convert ms to c# time span format
     */
    Util.msToTimeSpan = function (totalms) {
        if (isNaN(totalms) || totalms < 0) {
            totalms = 0;
        }
        var sec = ((totalms / 1000) % 60).toFixed(7).replace(/0{0,4}$/, "");
        var min = "" + Math.floor(totalms / (1000 * 60)) % 60;
        var hour = "" + Math.floor(totalms / (1000 * 60 * 60)) % 24;
        var days = Math.floor(totalms / (1000 * 60 * 60 * 24));
        sec = sec.indexOf(".") < 2 ? "0" + sec : sec;
        min = min.length < 2 ? "0" + min : min;
        hour = hour.length < 2 ? "0" + hour : hour;
        var daysText = days > 0 ? days + "." : "";
        return daysText + hour + ":" + min + ":" + sec;
    };
    /**
     * Using JSON.stringify, by default Errors do not serialize to something useful:
     * Simplify a generic Node Error into a simpler map for customDimensions
     * Custom errors can still implement toJSON to override this functionality
     */
    Util.extractError = function (err) {
        // Error is often subclassed so may have code OR id properties:
        // https://nodejs.org/api/errors.html#errors_error_code
        var looseError = err;
        return {
            message: err.message,
            code: looseError.code || looseError.id || "",
        };
    };
    /**
     * Manually call toJSON if available to pre-convert the value.
     * If a primitive is returned, then the consumer of this function can skip JSON.stringify.
     * This avoids double escaping of quotes for Date objects, for example.
     */
    Util.extractObject = function (origProperty) {
        if (origProperty instanceof Error) {
            return Util.extractError(origProperty);
        }
        if (typeof origProperty.toJSON === "function") {
            return origProperty.toJSON();
        }
        return origProperty;
    };
    /**
     * Validate that an object is of type { [key: string]: string }
     */
    Util.validateStringMap = function (obj) {
        if (typeof obj !== "object") {
            Logging.info("Invalid properties dropped from payload");
            return;
        }
        var map = {};
        for (var field in obj) {
            var property = '';
            var origProperty = obj[field];
            var propType = typeof origProperty;
            if (Util.isPrimitive(origProperty)) {
                property = origProperty.toString();
            }
            else if (origProperty === null || propType === "undefined") {
                property = "";
            }
            else if (propType === "function") {
                Logging.info("key: " + field + " was function; will not serialize");
                continue;
            }
            else {
                var stringTarget = Util.isArray(origProperty) ? origProperty : Util.extractObject(origProperty);
                try {
                    if (Util.isPrimitive(stringTarget)) {
                        property = stringTarget;
                    }
                    else {
                        property = JSON.stringify(stringTarget);
                    }
                }
                catch (e) {
                    property = origProperty.constructor.name.toString() + " (Error: " + e.message + ")";
                    Logging.info("key: " + field + ", could not be serialized");
                }
            }
            map[field] = property.substring(0, Util.MAX_PROPERTY_LENGTH);
        }
        return map;
    };
    /**
     * Checks if a request url is not on a excluded domain list
     * and if it is safe to add correlation headers
     */
    Util.canIncludeCorrelationHeader = function (client, requestUrl) {
        var excludedDomains = client && client.config && client.config.correlationHeaderExcludedDomains;
        if (!excludedDomains || excludedDomains.length == 0 || !requestUrl) {
            return true;
        }
        for (var i = 0; i < excludedDomains.length; i++) {
            var regex = new RegExp(excludedDomains[i].replace(/\./g, "\.").replace(/\*/g, ".*"));
            if (regex.test(url.parse(requestUrl).hostname)) {
                return false;
            }
        }
        return true;
    };
    Util.getCorrelationContextTarget = function (response, key) {
        var contextHeaders = response.headers && response.headers[RequestResponseHeaders.requestContextHeader];
        if (contextHeaders) {
            var keyValues = contextHeaders.split(",");
            for (var i = 0; i < keyValues.length; ++i) {
                var keyValue = keyValues[i].split("=");
                if (keyValue.length == 2 && keyValue[0] == key) {
                    return keyValue[1];
                }
            }
        }
    };
    /**
     * Generate request
     *
     * Proxify the request creation to handle proxy http
     *
     * @param {string} requestUrl url endpoint
     * @param {Object} requestOptions Request option
     * @param {Function} requestCallback callback on request
     * @returns {http.ClientRequest} request object
     */
    Util.makeRequest = function (config, requestUrl, requestOptions, requestCallback) {
        if (requestUrl && requestUrl.indexOf('//') === 0) {
            requestUrl = 'https:' + requestUrl;
        }
        var requestUrlParsed = url.parse(requestUrl);
        var options = __assign({}, requestOptions, { host: requestUrlParsed.hostname, port: requestUrlParsed.port, path: requestUrlParsed.pathname });
        var proxyUrl = undefined;
        if (requestUrlParsed.protocol === 'https:') {
            proxyUrl = config.proxyHttpsUrl || undefined;
        }
        if (requestUrlParsed.protocol === 'http:') {
            proxyUrl = config.proxyHttpUrl || undefined;
        }
        if (proxyUrl) {
            if (proxyUrl.indexOf('//') === 0) {
                proxyUrl = 'http:' + proxyUrl;
            }
            var proxyUrlParsed = url.parse(proxyUrl);
            // https is not supported at the moment
            if (proxyUrlParsed.protocol === 'https:') {
                Logging.info("Proxies that use HTTPS are not supported");
                proxyUrl = undefined;
            }
            else {
                options = __assign({}, options, { host: proxyUrlParsed.hostname, port: proxyUrlParsed.port || "80", path: requestUrl, headers: __assign({}, options.headers, { Host: requestUrlParsed.hostname }) });
            }
        }
        var isHttps = requestUrlParsed.protocol === 'https:' && !proxyUrl;
        if (isHttps && config.httpsAgent !== undefined) {
            options.agent = config.httpsAgent;
        }
        else if (!isHttps && config.httpAgent !== undefined) {
            options.agent = config.httpAgent;
        }
        else if (isHttps) {
            // HTTPS without a passed in agent. Use one that enforces our TLS rules
            options.agent = Util.tlsRestrictedAgent;
        }
        if (isHttps) {
            return https.request(options, requestCallback);
        }
        else {
            return http.request(options, requestCallback);
        }
    };
    ;
    /**
     * Parse standard <string | string[] | number> request-context header
     */
    Util.safeIncludeCorrelationHeader = function (client, request, correlationHeader) {
        var header; // attempt to cast correlationHeader to string
        if (typeof correlationHeader === "string") {
            header = correlationHeader;
        }
        else if (correlationHeader instanceof Array) {
            header = correlationHeader.join(",");
        }
        else if (correlationHeader && typeof correlationHeader.toString === "function") {
            // best effort attempt: requires well-defined toString
            try {
                header = correlationHeader.toString();
            }
            catch (err) {
                Logging.warn("Outgoing request-context header could not be read. Correlation of requests may be lost.", err, correlationHeader);
            }
        }
        if (header) {
            Util.addCorrelationIdHeaderFromString(client, request, header);
        }
        else {
            request.setHeader(RequestResponseHeaders.requestContextHeader, RequestResponseHeaders.requestContextSourceKey + "=" + client.config.correlationId);
        }
    };
    Util.addCorrelationIdHeaderFromString = function (client, response, correlationHeader) {
        var components = correlationHeader.split(",");
        var key = RequestResponseHeaders.requestContextSourceKey + "=";
        var found = components.some(function (value) { return value.substring(0, key.length) === key; });
        if (!found) {
            response.setHeader(RequestResponseHeaders.requestContextHeader, correlationHeader + "," + RequestResponseHeaders.requestContextSourceKey + "=" + client.config.correlationId);
        }
    };
    Util.MAX_PROPERTY_LENGTH = 8192;
    Util.tlsRestrictedAgent = new https.Agent({
        secureOptions: constants.SSL_OP_NO_SSLv2 | constants.SSL_OP_NO_SSLv3 |
            constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1
    });
    return Util;
}());
module.exports = Util;
//# sourceMappingURL=Util.js.map

/***/ }),

/***/ 5865:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var AutoCollectPerformance = __webpack_require__(1177);
var TelemetryType = __webpack_require__(5312);
function performanceMetricsTelemetryProcessor(envelope, client) {
    // If live metrics is enabled, forward all telemetry there
    if (client) {
        client.addDocument(envelope);
    }
    // Increment rate counters (for standard metrics and live metrics)
    switch (envelope.data.baseType) {
        case TelemetryType.TelemetryTypeString.Exception:
            AutoCollectPerformance.countException();
            break;
        case TelemetryType.TelemetryTypeString.Request:
            var requestData = envelope.data.baseData;
            AutoCollectPerformance.countRequest(requestData.duration, requestData.success);
            break;
        case TelemetryType.TelemetryTypeString.Dependency:
            var remoteDependencyData = envelope.data.baseData;
            AutoCollectPerformance.countDependency(remoteDependencyData.duration, remoteDependencyData.success);
            break;
    }
    return true;
}
exports.performanceMetricsTelemetryProcessor = performanceMetricsTelemetryProcessor;
//# sourceMappingURL=PerformanceMetricsTelemetryProcessor.js.map

/***/ }),

/***/ 6494:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var Contracts = __webpack_require__(5312);
/**
 *  A telemetry processor that handles sampling.
 */
function samplingTelemetryProcessor(envelope, contextObjects) {
    var samplingPercentage = envelope.sampleRate; // Set for us in Client.getEnvelope
    var isSampledIn = false;
    if (samplingPercentage === null || samplingPercentage === undefined || samplingPercentage >= 100) {
        return true;
    }
    else if (envelope.data && Contracts.TelemetryType.Metric === Contracts.baseTypeToTelemetryType(envelope.data.baseType)) {
        // Exclude MetricData telemetry from sampling
        return true;
    }
    else if (contextObjects.correlationContext && contextObjects.correlationContext.operation) {
        // If we're using dependency correlation, sampling should retain all telemetry from a given request
        isSampledIn = getSamplingHashCode(contextObjects.correlationContext.operation.id) < samplingPercentage;
    }
    else {
        // If we're not using dependency correlation, sampling should use a random distribution on each item
        isSampledIn = (Math.random() * 100) < samplingPercentage;
    }
    return isSampledIn;
}
exports.samplingTelemetryProcessor = samplingTelemetryProcessor;
/** Ported from AI .NET SDK */
function getSamplingHashCode(input) {
    var csharpMin = -2147483648;
    var csharpMax = 2147483647;
    var hash = 5381;
    if (!input) {
        return 0;
    }
    while (input.length < 8) {
        input = input + input;
    }
    for (var i = 0; i < input.length; i++) {
        // JS doesn't respond to integer overflow by wrapping around. Simulate it with bitwise operators ( | 0)
        hash = ((((hash << 5) + hash) | 0) + input.charCodeAt(i) | 0);
    }
    hash = hash <= csharpMin ? csharpMax : Math.abs(hash);
    return (hash / csharpMax) * 100;
}
exports.getSamplingHashCode = getSamplingHashCode;
//# sourceMappingURL=SamplingTelemetryProcessor.js.map

/***/ }),

/***/ 73:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", ({ value: true }));
__export(__webpack_require__(6494));
__export(__webpack_require__(5865));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 8330:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var CorrelationContextManager = __webpack_require__(2740); // Keep this first
var AutoCollectConsole = __webpack_require__(244);
var AutoCollectExceptions = __webpack_require__(8339);
var AutoCollectPerformance = __webpack_require__(1177);
var HeartBeat = __webpack_require__(9895);
var AutoCollectHttpDependencies = __webpack_require__(5679);
var AutoCollectHttpRequests = __webpack_require__(6384);
var CorrelationIdManager = __webpack_require__(1360);
var Logging = __webpack_require__(4652);
var QuickPulseClient = __webpack_require__(8725);
var NativePerformance_1 = __webpack_require__(7597);
// We export these imports so that SDK users may use these classes directly.
// They're exposed using "export import" so that types are passed along as expected
exports.TelemetryClient = __webpack_require__(8904);
exports.Contracts = __webpack_require__(5312);
var DistributedTracingModes;
(function (DistributedTracingModes) {
    /**
     * (Default) Send Application Insights correlation headers
     */
    DistributedTracingModes[DistributedTracingModes["AI"] = 0] = "AI";
    /**
     * Send both W3C Trace Context headers and back-compatibility Application Insights headers
     */
    DistributedTracingModes[DistributedTracingModes["AI_AND_W3C"] = 1] = "AI_AND_W3C";
})(DistributedTracingModes = exports.DistributedTracingModes || (exports.DistributedTracingModes = {}));
// Default autocollection configuration
var _isConsole = true;
var _isConsoleLog = false;
var _isExceptions = true;
var _isPerformance = true;
var _isHeartBeat = false; // off by default for now
var _isRequests = true;
var _isDependencies = true;
var _isDiskRetry = true;
var _isCorrelating = true;
var _forceClsHooked;
var _isSendingLiveMetrics = false; // Off by default
var _isNativePerformance = true;
var _disabledExtendedMetrics;
var _diskRetryInterval = undefined;
var _diskRetryMaxBytes = undefined;
var _console;
var _exceptions;
var _performance;
var _heartbeat;
var _nativePerformance;
var _serverRequests;
var _clientRequests;
var _isStarted = false;
var _performanceLiveMetrics;
/**
 * Initializes the default client. Should be called after setting
 * configuration options.
 *
 * @param setupString the Connection String or Instrumentation Key to use. Optional, if
 * this is not specified, the value will be read from the environment
 * variable APPLICATIONINSIGHTS_CONNECTION_STRING or APPINSIGHTS_INSTRUMENTATIONKEY.
 * @returns {Configuration} the configuration class to initialize
 * and start the SDK.
 */
function setup(setupString) {
    if (!exports.defaultClient) {
        exports.defaultClient = new exports.TelemetryClient(setupString);
        _console = new AutoCollectConsole(exports.defaultClient);
        _exceptions = new AutoCollectExceptions(exports.defaultClient);
        _performance = new AutoCollectPerformance(exports.defaultClient);
        _heartbeat = new HeartBeat(exports.defaultClient);
        _serverRequests = new AutoCollectHttpRequests(exports.defaultClient);
        _clientRequests = new AutoCollectHttpDependencies(exports.defaultClient);
        if (!_nativePerformance) {
            _nativePerformance = new NativePerformance_1.AutoCollectNativePerformance(exports.defaultClient);
        }
    }
    else {
        Logging.info("The default client is already setup");
    }
    if (exports.defaultClient && exports.defaultClient.channel) {
        exports.defaultClient.channel.setUseDiskRetryCaching(_isDiskRetry, _diskRetryInterval, _diskRetryMaxBytes);
    }
    return Configuration;
}
exports.setup = setup;
/**
 * Starts automatic collection of telemetry. Prior to calling start no
 * telemetry will be *automatically* collected, though manual collection
 * is enabled.
 * @returns {ApplicationInsights} this class
 */
function start() {
    if (!!exports.defaultClient) {
        _isStarted = true;
        _console.enable(_isConsole, _isConsoleLog);
        _exceptions.enable(_isExceptions);
        _performance.enable(_isPerformance);
        _heartbeat.enable(_isHeartBeat, exports.defaultClient.config);
        _nativePerformance.enable(_isNativePerformance, _disabledExtendedMetrics);
        _serverRequests.useAutoCorrelation(_isCorrelating, _forceClsHooked);
        _serverRequests.enable(_isRequests);
        _clientRequests.enable(_isDependencies);
        if (exports.liveMetricsClient && _isSendingLiveMetrics) {
            exports.liveMetricsClient.enable(_isSendingLiveMetrics);
        }
    }
    else {
        Logging.warn("Start cannot be called before setup");
    }
    return Configuration;
}
exports.start = start;
/**
 * Returns an object that is shared across all code handling a given request.
 * This can be used similarly to thread-local storage in other languages.
 * Properties set on this object will be available to telemetry processors.
 *
 * Do not store sensitive information here.
 * Custom properties set on this object can be exposed in a future SDK
 * release via outgoing HTTP headers.
 * This is to allow for correlating data cross-component.
 *
 * This method will return null if automatic dependency correlation is disabled.
 * @returns A plain object for request storage or null if automatic dependency correlation is disabled.
 */
function getCorrelationContext() {
    if (_isCorrelating) {
        return CorrelationContextManager.CorrelationContextManager.getCurrentContext();
    }
    return null;
}
exports.getCorrelationContext = getCorrelationContext;
function startOperation(context, request) {
    return CorrelationContextManager.CorrelationContextManager.startOperation(context, request);
}
exports.startOperation = startOperation;
/**
 * Returns a function that will get the same correlation context within its
 * function body as the code executing this function.
 * Use this method if automatic dependency correlation is not propagating
 * correctly to an asynchronous callback.
 */
function wrapWithCorrelationContext(fn, context) {
    return CorrelationContextManager.CorrelationContextManager.wrapCallback(fn, context);
}
exports.wrapWithCorrelationContext = wrapWithCorrelationContext;
/**
 * The active configuration for global SDK behaviors, such as autocollection.
 */
var Configuration = (function () {
    function Configuration() {
    }
    /**
     * Sets the distributed tracing modes. If W3C mode is enabled, W3C trace context
     * headers (traceparent/tracestate) will be parsed in all incoming requests, and included in outgoing
     * requests. In W3C mode, existing back-compatibility AI headers will also be parsed and included.
     * Enabling W3C mode will not break existing correlation with other Application Insights instrumented
     * services. Default=AI
    */
    Configuration.setDistributedTracingMode = function (value) {
        CorrelationIdManager.w3cEnabled = value === DistributedTracingModes.AI_AND_W3C;
        return Configuration;
    };
    /**
     * Sets the state of console and logger tracking (enabled by default for third-party loggers only)
     * @param value if true logger activity will be sent to Application Insights
     * @param collectConsoleLog if true, logger autocollection will include console.log calls (default false)
     * @returns {Configuration} this class
     */
    Configuration.setAutoCollectConsole = function (value, collectConsoleLog) {
        if (collectConsoleLog === void 0) { collectConsoleLog = false; }
        _isConsole = value;
        _isConsoleLog = collectConsoleLog;
        if (_isStarted) {
            _console.enable(value, collectConsoleLog);
        }
        return Configuration;
    };
    /**
     * Sets the state of exception tracking (enabled by default)
     * @param value if true uncaught exceptions will be sent to Application Insights
     * @returns {Configuration} this class
     */
    Configuration.setAutoCollectExceptions = function (value) {
        _isExceptions = value;
        if (_isStarted) {
            _exceptions.enable(value);
        }
        return Configuration;
    };
    /**
     * Sets the state of performance tracking (enabled by default)
     * @param value if true performance counters will be collected every second and sent to Application Insights
     * @param collectExtendedMetrics if true, extended metrics counters will be collected every minute and sent to Application Insights
     * @returns {Configuration} this class
     */
    Configuration.setAutoCollectPerformance = function (value, collectExtendedMetrics) {
        if (collectExtendedMetrics === void 0) { collectExtendedMetrics = true; }
        _isPerformance = value;
        var extendedMetricsConfig = NativePerformance_1.AutoCollectNativePerformance.parseEnabled(collectExtendedMetrics);
        _isNativePerformance = extendedMetricsConfig.isEnabled;
        _disabledExtendedMetrics = extendedMetricsConfig.disabledMetrics;
        if (_isStarted) {
            _performance.enable(value);
            _nativePerformance.enable(extendedMetricsConfig.isEnabled, extendedMetricsConfig.disabledMetrics);
        }
        return Configuration;
    };
    /**
     * Sets the state of request tracking (enabled by default)
     * @param value if true HeartBeat metric data will be collected every 15 mintues and sent to Application Insights
     * @returns {Configuration} this class
     */
    Configuration.setAutoCollectHeartbeat = function (value) {
        _isHeartBeat = value;
        if (_isStarted) {
            _heartbeat.enable(value, exports.defaultClient.config);
        }
        return Configuration;
    };
    /**
     * Sets the state of request tracking (enabled by default)
     * @param value if true requests will be sent to Application Insights
     * @returns {Configuration} this class
     */
    Configuration.setAutoCollectRequests = function (value) {
        _isRequests = value;
        if (_isStarted) {
            _serverRequests.enable(value);
        }
        return Configuration;
    };
    /**
     * Sets the state of dependency tracking (enabled by default)
     * @param value if true dependencies will be sent to Application Insights
     * @returns {Configuration} this class
     */
    Configuration.setAutoCollectDependencies = function (value) {
        _isDependencies = value;
        if (_isStarted) {
            _clientRequests.enable(value);
        }
        return Configuration;
    };
    /**
     * Sets the state of automatic dependency correlation (enabled by default)
     * @param value if true dependencies will be correlated with requests
     * @param useAsyncHooks if true, forces use of experimental async_hooks module to provide correlation. If false, instead uses only patching-based techniques. If left blank, the best option is chosen for you based on your version of Node.js.
     * @returns {Configuration} this class
     */
    Configuration.setAutoDependencyCorrelation = function (value, useAsyncHooks) {
        _isCorrelating = value;
        _forceClsHooked = useAsyncHooks;
        if (_isStarted) {
            _serverRequests.useAutoCorrelation(value, useAsyncHooks);
        }
        return Configuration;
    };
    /**
     * Enable or disable disk-backed retry caching to cache events when client is offline (enabled by default)
     * Note that this method only applies to the default client. Disk-backed retry caching is disabled by default for additional clients.
     * For enable for additional clients, use client.channel.setUseDiskRetryCaching(true).
     * These cached events are stored in your system or user's temporary directory and access restricted to your user when possible.
     * @param value if true events that occured while client is offline will be cached on disk
     * @param resendInterval The wait interval for resending cached events.
     * @param maxBytesOnDisk The maximum size (in bytes) that the created temporary directory for cache events can grow to, before caching is disabled.
     * @returns {Configuration} this class
     */
    Configuration.setUseDiskRetryCaching = function (value, resendInterval, maxBytesOnDisk) {
        _isDiskRetry = value;
        _diskRetryInterval = resendInterval;
        _diskRetryMaxBytes = maxBytesOnDisk;
        if (exports.defaultClient && exports.defaultClient.channel) {
            exports.defaultClient.channel.setUseDiskRetryCaching(value, resendInterval, maxBytesOnDisk);
        }
        return Configuration;
    };
    /**
     * Enables debug and warning logging for AppInsights itself.
     * @param enableDebugLogging if true, enables debug logging
     * @param enableWarningLogging if true, enables warning logging
     * @returns {Configuration} this class
     */
    Configuration.setInternalLogging = function (enableDebugLogging, enableWarningLogging) {
        if (enableDebugLogging === void 0) { enableDebugLogging = false; }
        if (enableWarningLogging === void 0) { enableWarningLogging = true; }
        Logging.enableDebug = enableDebugLogging;
        Logging.disableWarnings = !enableWarningLogging;
        return Configuration;
    };
    /**
     * Enables communication with Application Insights Live Metrics.
     * @param enable if true, enables communication with the live metrics service
     */
    Configuration.setSendLiveMetrics = function (enable) {
        if (enable === void 0) { enable = false; }
        if (!exports.defaultClient) {
            // Need a defaultClient so that we can add the QPS telemetry processor to it
            Logging.warn("Live metrics client cannot be setup without the default client");
            return Configuration;
        }
        if (!exports.liveMetricsClient && enable) {
            // No qps client exists. Create one and prepare it to be enabled at .start()
            exports.liveMetricsClient = new QuickPulseClient(exports.defaultClient.config.instrumentationKey);
            _performanceLiveMetrics = new AutoCollectPerformance(exports.liveMetricsClient, 1000, true);
            exports.liveMetricsClient.addCollector(_performanceLiveMetrics);
            exports.defaultClient.quickPulseClient = exports.liveMetricsClient; // Need this so we can forward all manual tracks to live metrics via PerformanceMetricsTelemetryProcessor
        }
        else if (exports.liveMetricsClient) {
            // qps client already exists; enable/disable it
            exports.liveMetricsClient.enable(enable);
        }
        _isSendingLiveMetrics = enable;
        return Configuration;
    };
    // Convenience shortcut to ApplicationInsights.start
    Configuration.start = start;
    return Configuration;
}());
exports.Configuration = Configuration;
/**
 * Disposes the default client and all the auto collectors so they can be reinitialized with different configuration
*/
function dispose() {
    CorrelationIdManager.w3cEnabled = true; // reset to default
    exports.defaultClient = null;
    _isStarted = false;
    if (_console) {
        _console.dispose();
    }
    if (_exceptions) {
        _exceptions.dispose();
    }
    if (_performance) {
        _performance.dispose();
    }
    if (_heartbeat) {
        _heartbeat.dispose();
    }
    if (_nativePerformance) {
        _nativePerformance.dispose();
    }
    if (_serverRequests) {
        _serverRequests.dispose();
    }
    if (_clientRequests) {
        _clientRequests.dispose();
    }
    if (exports.liveMetricsClient) {
        exports.liveMetricsClient.enable(false);
        _isSendingLiveMetrics = false;
        exports.liveMetricsClient = undefined;
    }
}
exports.dispose = dispose;
//# sourceMappingURL=applicationinsights.js.map

/***/ }),

/***/ 5143:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const asyncWrap = process.binding('async_wrap');
const TIMERWRAP = asyncWrap.Providers.TIMERWRAP;

const patchs = {
  'nextTick': __webpack_require__(2833),
  'promise': __webpack_require__(6147),
  'timers': __webpack_require__(3921)
};

const ignoreUIDs = new Set();

function State() {
  this.enabled = false;
  this.counter = 0;
}

function Hooks() {
  const initFns = this.initFns = [];
  const preFns = this.preFns = [];
  const postFns = this.postFns = [];
  const destroyFns = this.destroyFns = [];

  this.init = function (uid, provider, parentUid, parentHandle) {
    // Ignore TIMERWRAP, since setTimeout etc. is monkey patched
    if (provider === TIMERWRAP) {
      ignoreUIDs.add(uid);
      return;
    }

    // call hooks
    for (const hook of initFns) {
      hook(uid, this, provider, parentUid, parentHandle);
    }
  };

  this.pre = function (uid) {
    if (ignoreUIDs.has(uid)) return;

    // call hooks
    for (const hook of preFns) {
      hook(uid, this);
    }
  };

  this.post = function (uid, didThrow) {
    if (ignoreUIDs.has(uid)) return;

    // call hooks
    for (const hook of postFns) {
      hook(uid, this, didThrow);
    }
  };

  this.destroy = function (uid) {
    // Cleanup the ignore list if this uid should be ignored
    if (ignoreUIDs.has(uid)) {
      ignoreUIDs.delete(uid);
      return;
    }

    // call hooks
    for (const hook of destroyFns) {
      hook(uid);
    }
  };
}

Hooks.prototype.add = function (hooks) {
  if (hooks.init) this.initFns.push(hooks.init);
  if (hooks.pre) this.preFns.push(hooks.pre);
  if (hooks.post) this.postFns.push(hooks.post);
  if (hooks.destroy) this.destroyFns.push(hooks.destroy);
};

function removeElement(array, item) {
  const index = array.indexOf(item);
  if (index === -1) return;
  array.splice(index, 1);
}

Hooks.prototype.remove = function (hooks) {
  if (hooks.init) removeElement(this.initFns, hooks.init);
  if (hooks.pre) removeElement(this.preFns, hooks.pre);
  if (hooks.post) removeElement(this.postFns, hooks.post);
  if (hooks.destroy) removeElement(this.destroyFns, hooks.destroy);
};

function AsyncHook() {
  this._state = new State();
  this._hooks = new Hooks();

  // expose version for conflict detection
  this.version = __webpack_require__(1910)/* .version */ .i8;

  // expose the Providers map
  this.providers = asyncWrap.Providers;

  // apply patches
  for (const key of Object.keys(patchs)) {
    patchs[key].call(this);
  }

  // setup async wrap
  if (process.env.hasOwnProperty('NODE_ASYNC_HOOK_WARNING')) {
    console.warn('warning: you are using async-hook-jl which is unstable.');
  }
  asyncWrap.setupHooks({
    init: this._hooks.init,
    pre: this._hooks.pre,
    post: this._hooks.post,
    destroy: this._hooks.destroy
  });
}
module.exports = AsyncHook;

AsyncHook.prototype.addHooks = function (hooks) {
  this._hooks.add(hooks);
};

AsyncHook.prototype.removeHooks = function (hooks) {
  this._hooks.remove(hooks);
};

AsyncHook.prototype.enable = function () {
  this._state.enabled = true;
  asyncWrap.enable();
};

AsyncHook.prototype.disable = function () {
  this._state.enabled = false;
  asyncWrap.disable();
};

/***/ }),

/***/ 2902:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const AsyncHook = __webpack_require__(5143);

// If a another copy (same version or not) of stack-chain exists it will result
// in wrong stack traces (most likely dublicate callSites).
if (global._asyncHook) {
  // In case the version match, we can simply return the first initialized copy
  if (global._asyncHook.version === __webpack_require__(1910)/* .version */ .i8) {
    module.exports = global._asyncHook;
  }
  // The version don't match, this is really bad. Lets just throw
  else {
    throw new Error('Conflicting version of async-hook-jl found');
  }
} else {
  const stackChain = __webpack_require__(9738);

  // Remove callSites from this module. AsyncWrap doesn't have any callSites
  // and the hooks are expected to be completely transparent.
  stackChain.filter.attach(function (error, frames) {
    return frames.filter(function (callSite) {
      const filename = callSite.getFileName();
      // filename is not always a string, for example in case of eval it is
      // undefined. So check if the filename is defined.
      return !(filename && filename.slice(0, __dirname.length) === __dirname);
    });
  });

  module.exports = global._asyncHook = new AsyncHook();
}

/***/ }),

/***/ 2833:
/***/ ((module) => {

"use strict";


function NextTickWrap() {}

module.exports = function patch() {
  const hooks = this._hooks;
  const state = this._state;

  const oldNextTick = process.nextTick;
  process.nextTick = function () {
    if (!state.enabled) return oldNextTick.apply(process, arguments);

    const args = new Array(arguments.length);
    for (let i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }
    const callback = args[0];

    if (typeof callback !== 'function') {
      throw new TypeError('callback is not a function');
    }

    const handle = new NextTickWrap();
    const uid = --state.counter;

    // call the init hook
    hooks.init.call(handle, uid, 0, null, null);

    // overwrite callback
    args[0] = function () {
      // call the pre hook
      hooks.pre.call(handle, uid);

      let didThrow = true;
      try {
        callback.apply(this, arguments);
        didThrow = false;
      } finally {
        // If `callback` threw and there is an uncaughtException handler
        // then call the `post` and `destroy` hook after the uncaughtException
        // user handlers have been invoked.
        if(didThrow && process.listenerCount('uncaughtException') > 0) {
          process.once('uncaughtException', function () {
            hooks.post.call(handle, uid, true);
            hooks.destroy.call(null, uid);
          });
        }
      }

      // callback done successfully
      hooks.post.call(handle, uid, false);
      hooks.destroy.call(null, uid);
    };

    return oldNextTick.apply(process, args);
  };
}


/***/ }),

/***/ 6147:
/***/ ((module) => {

"use strict";


function PromiseWrap() {}

module.exports = function patchPromise() {
  const hooks = this._hooks;
  const state = this._state;

  const Promise = global.Promise;

  /* As per ECMAScript 2015, .catch must be implemented by calling .then, as
   * such we need needn't patch .catch as well. see:
   * http://www.ecma-international.org/ecma-262/6.0/#sec-promise.prototype.catch
   */
  const oldThen = Promise.prototype.then;
  Promise.prototype.then = wrappedThen;

  function makeWrappedHandler(fn, handle, uid, isOnFulfilled) {
    if ('function' !== typeof fn) {
      return isOnFulfilled
        ? makeUnhandledResolutionHandler(uid)
        : makeUnhandledRejectionHandler(uid);
    }

    return function wrappedHandler() {
      hooks.pre.call(handle, uid);
      try {
        return fn.apply(this, arguments);
      } finally {
        hooks.post.call(handle, uid, false);
        hooks.destroy.call(null, uid);
      }
    };
  }

  function makeUnhandledResolutionHandler(uid) {
    return function unhandledResolutionHandler(val) {
      hooks.destroy.call(null, uid);
      return val;
    };
  }

  function makeUnhandledRejectionHandler(uid) {
    return function unhandledRejectedHandler(val) {
      hooks.destroy.call(null, uid);
      throw val;
    };
  }

  function wrappedThen(onFulfilled, onRejected) {
    if (!state.enabled) return oldThen.call(this, onFulfilled, onRejected);

    const handle = new PromiseWrap();
    const uid = --state.counter;

    hooks.init.call(handle, uid, 0, null, null);

    return oldThen.call(
      this,
      makeWrappedHandler(onFulfilled, handle, uid, true),
      makeWrappedHandler(onRejected, handle, uid, false)
    );
  }
};


/***/ }),

/***/ 3921:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const timers = __webpack_require__(8213);

function TimeoutWrap() {}
function IntervalWrap() {}
function ImmediateWrap() {}

const timeoutMap = new Map();
const intervalMap = new Map();
const ImmediateMap = new Map();

let activeCallback = null;
let clearedInCallback = false;

module.exports = function patch() {
  patchTimer(this._hooks, this._state, 'setTimeout', 'clearTimeout', TimeoutWrap, timeoutMap, true);
  patchTimer(this._hooks, this._state, 'setInterval', 'clearInterval', IntervalWrap, intervalMap, false);
  patchTimer(this._hooks, this._state, 'setImmediate', 'clearImmediate', ImmediateWrap, ImmediateMap, true);

  global.setTimeout = timers.setTimeout;
  global.setInterval = timers.setInterval;
  global.setImmediate = timers.setImmediate;

  global.clearTimeout = timers.clearTimeout;
  global.clearInterval = timers.clearInterval;
  global.clearImmediate = timers.clearImmediate;
};

function patchTimer(hooks, state, setFn, clearFn, Handle, timerMap, singleCall) {
  const oldSetFn = timers[setFn];
  const oldClearFn = timers[clearFn];

  // overwrite set[Timeout]
  timers[setFn] = function () {
    if (!state.enabled) return oldSetFn.apply(timers, arguments);

    const args = new Array(arguments.length);
    for (let i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }
    const callback = args[0];

    if (typeof callback !== 'function') {
      throw new TypeError('"callback" argument must be a function');
    }

    const handle = new Handle();
    const uid = --state.counter;
    let timerId = undefined;

    // call the init hook
    hooks.init.call(handle, uid, 0, null, null);

    // overwrite callback
    args[0] = function () {
      // call the pre hook
      activeCallback = timerId;
      hooks.pre.call(handle, uid);

      let didThrow = true;
      try {
        callback.apply(this, arguments);
        didThrow = false;
      } finally {
        // If `callback` threw and there is an uncaughtException handler
        // then call the `post` and `destroy` hook after the uncaughtException
        // user handlers have been invoked.
        if (didThrow && process.listenerCount('uncaughtException') > 0) {
          process.once('uncaughtException', function () {
            // call the post hook
            hooks.post.call(handle, uid, true);
            // setInterval won't continue
            timerMap.delete(timerId);
            hooks.destroy.call(null, uid);
          });
        }
      }

      // callback done successfully
      hooks.post.call(handle, uid, false);
      activeCallback = null;

      // call the destroy hook if the callback will only be called once
      if (singleCall || clearedInCallback) {
        clearedInCallback = false;
        timerMap.delete(timerId);
        hooks.destroy.call(null, uid);
      }
    };

    timerId = oldSetFn.apply(timers, args);
    // Bind the timerId and uid for later use, in case the clear* function is
    // called.
    timerMap.set(timerId, uid);

    return timerId;
  };

  // overwrite clear[Timeout]
  timers[clearFn] = function (timerId) {
    // If clear* was called within the timer callback, then delay the destroy
    // event to after the post event has been called.
    if (activeCallback === timerId && timerId !== null) {
      clearedInCallback = true;
    }
    // clear should call the destroy hook. Note if timerId doesn't exists
    // it is because asyncWrap wasn't enabled at the time.
    else if (timerMap.has(timerId)) {
      const uid = timerMap.get(timerId);
      timerMap.delete(timerId);
      hooks.destroy.call(null, uid);
    }

    oldClearFn.apply(timers, arguments);
  };
}


/***/ }),

/***/ 6813:
/***/ ((module) => {

"use strict";


module.exports = (Promise, ensureAslWrapper) => {
  // Updates to this class should also be applied to the the ES3 version
  // in index.js.
  return class WrappedPromise extends Promise {
    constructor(executor) {
      var context, args;
      super(wrappedExecutor);
      var promise = this;

      try {
        executor.apply(context, args);
      } catch (err) {
        args[1](err);
      }

      return promise;
      function wrappedExecutor(resolve, reject) {
        context = this;
        args = [wrappedResolve, wrappedReject];

        // These wrappers create a function that can be passed a function and an argument to
        // call as a continuation from the resolve or reject.
        function wrappedResolve(val) {
          ensureAslWrapper(promise, false);
          return resolve(val);
        }

        function wrappedReject(val) {
          ensureAslWrapper(promise, false);
          return reject(val);
        }
      }
    }
  }
};


/***/ }),

/***/ 5191:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wrap = __webpack_require__(1896).wrap;

/*
 *
 * CONSTANTS
 *
 */
var HAS_CREATE_AL = 1 << 0;
var HAS_BEFORE_AL = 1 << 1;
var HAS_AFTER_AL = 1 << 2;
var HAS_ERROR_AL = 1 << 3;

/**
 * There is one list of currently active listeners that is mutated in place by
 * addAsyncListener and removeAsyncListener. This complicates error-handling,
 * for reasons that are discussed below.
 */
var listeners = [];

/**
 * There can be multiple listeners with the same properties, so disambiguate
 * them by assigning them an ID at creation time.
 */
var uid = 0;

/**
 * Ensure that errors coming from within listeners are handed off to domains,
 * process._fatalException, or uncaughtException without being treated like
 * user errors.
 */
var inAsyncTick = false;

/**
 * Because asynchronous contexts can be nested, and errors can come from anywhere
 * in the stack, a little extra work is required to keep track of where in the
 * nesting we are. Because JS arrays are frequently mutated in place
 */
var listenerStack = [];

/**
 * The error handler on a listener can capture errors thrown during synchronous
 * execution immediately after the listener is added. To capture both
 * synchronous and asynchronous errors, the error handler just uses the
 * "global" list of active listeners, and the rest of the code ensures that the
 * listener list is correct by using a stack of listener lists during
 * asynchronous execution.
 */
var asyncCatcher;

/**
 * The guts of the system -- called each time an asynchronous event happens
 * while one or more listeners are active.
 */
var asyncWrap;

/**
 * Simple helper function that's probably faster than using Array
 * filter methods and can be inlined.
 */
function union(dest, added) {
  var destLength = dest.length;
  var addedLength = added.length;
  var returned = [];

  if (destLength === 0 && addedLength === 0) return returned;

  for (var j  = 0; j < destLength; j++) returned[j] = dest[j];

  if (addedLength === 0) return returned;

  for (var i = 0; i < addedLength; i++) {
    var missing = true;
    for (j = 0; j < destLength; j++) {
      if (dest[j].uid === added[i].uid) {
        missing = false;
        break;
      }
    }
    if (missing) returned.push(added[i]);
  }

  return returned;
}

/*
 * For performance, split error-handlers and asyncCatcher up into two separate
 * code paths.
 */

// 0.9+
if (process._fatalException) {
  /**
   * Error handlers on listeners can throw, the catcher needs to be able to
   * discriminate between exceptions thrown by user code, and exceptions coming
   * from within the catcher itself. Use a global to keep track of which state
   * the catcher is currently in.
   */
  var inErrorTick = false;

  /**
   * Throwing always happens synchronously. If the current array of values for
   * the current list of asyncListeners is put in a module-scoped variable right
   * before a call that can throw, it will always be correct when the error
   * handlers are run.
   */
  var errorValues;

  asyncCatcher = function asyncCatcher(er) {
    var length = listeners.length;
    if (inErrorTick || length === 0) return false;

    var handled = false;

    /*
     * error handlers
     */
    inErrorTick = true;
    for (var i = 0; i < length; ++i) {
      var listener = listeners[i];
      if ((listener.flags & HAS_ERROR_AL) === 0) continue;

      var value = errorValues && errorValues[listener.uid];
      handled = listener.error(value, er) || handled;
    }
    inErrorTick = false;

    /* Test whether there are any listener arrays on the stack. In the case of
     * synchronous throws when the listener is active, there may have been
     * none pushed yet.
     */
    if (listenerStack.length > 0) listeners = listenerStack.pop();
    errorValues = undefined;

    return handled && !inAsyncTick;
  };

  asyncWrap = function asyncWrap(original, list, length) {
    var values = [];

    /*
     * listeners
     */
    inAsyncTick = true;
    for (var i = 0; i < length; ++i) {
      var listener = list[i];
      values[listener.uid] = listener.data;

      if ((listener.flags & HAS_CREATE_AL) === 0) continue;

      var value = listener.create(listener.data);
      if (value !== undefined) values[listener.uid] = value;
    }
    inAsyncTick = false;

    /* One of the main differences between this polyfill and the core
     * asyncListener support is that core avoids creating closures by putting a
     * lot of the state managemnt on the C++ side of Node (and of course also it
     * bakes support for async listeners into the Node C++ API through the
     * AsyncWrap class, which means that it doesn't monkeypatch basically every
     * async method like this does).
     */
    return function () {
      // put the current values where the catcher can see them
      errorValues = values;

      /* More than one listener can end up inside these closures, so save the
       * current listeners on a stack.
       */
      listenerStack.push(listeners);

      /* Activate both the listeners that were active when the closure was
       * created and the listeners that were previously active.
       */
      listeners = union(list, listeners);

      /*
       * before handlers
       */
      inAsyncTick = true;
      for (var i = 0; i < length; ++i) {
        if ((list[i].flags & HAS_BEFORE_AL) > 0) {
          list[i].before(this, values[list[i].uid]);
        }
      }
      inAsyncTick = false;

      // save the return value to pass to the after callbacks
      var returned = original.apply(this, arguments);

      /*
       * after handlers (not run if original throws)
       */
      inAsyncTick = true;
      for (i = 0; i < length; ++i) {
        if ((list[i].flags & HAS_AFTER_AL) > 0) {
          list[i].after(this, values[list[i].uid]);
        }
      }
      inAsyncTick = false;

      // back to the previous listener list on the stack
      listeners = listenerStack.pop();
      errorValues = undefined;

      return returned;
    };
  };

  wrap(process, '_fatalException', function (_fatalException) {
    return function _asyncFatalException(er) {
      return asyncCatcher(er) || _fatalException(er);
    };
  });
}
// 0.8 and below
else {
  /**
   * If an error handler in asyncWrap throws, the process must die. Under 0.8
   * and earlier the only way to put a bullet through the head of the process
   * is to rethrow from inside the exception handler, so rethrow and set
   * errorThrew to tell the uncaughtHandler what to do.
   */
  var errorThrew = false;

  /**
   * Under Node 0.8, this handler *only* handles synchronously thrown errors.
   * This simplifies it, which almost but not quite makes up for the hit taken
   * by putting everything in a try-catch.
   */
  asyncCatcher = function uncaughtCatcher(er) {
    // going down hard
    if (errorThrew) throw er;

    var handled = false;

    /*
     * error handlers
     */
    var length = listeners.length;
    for (var i = 0; i < length; ++i) {
      var listener = listeners[i];
      if ((listener.flags & HAS_ERROR_AL) === 0) continue;
      handled = listener.error(null, er) || handled;
    }

    /* Rethrow if one of the before / after handlers fire, which will bring the
     * process down immediately.
     */
    if (!handled && inAsyncTick) throw er;
  };

  asyncWrap = function asyncWrap(original, list, length) {
    var values = [];

    /*
     * listeners
     */
    inAsyncTick = true;
    for (var i = 0; i < length; ++i) {
      var listener = list[i];
      values[listener.uid] = listener.data;

      if ((listener.flags & HAS_CREATE_AL) === 0) continue;

      var value = listener.create(listener.data);
      if (value !== undefined) values[listener.uid] = value;
    }
    inAsyncTick = false;

    /* One of the main differences between this polyfill and the core
     * asyncListener support is that core avoids creating closures by putting a
     * lot of the state managemnt on the C++ side of Node (and of course also it
     * bakes support for async listeners into the Node C++ API through the
     * AsyncWrap class, which means that it doesn't monkeypatch basically every
     * async method like this does).
     */
    return function () {
      /*jshint maxdepth:4*/

      // after() handlers don't run if threw
      var threw = false;

      // ...unless the error is handled
      var handled = false;

      /* More than one listener can end up inside these closures, so save the
       * current listeners on a stack.
       */
      listenerStack.push(listeners);

      /* Activate both the listeners that were active when the closure was
       * created and the listeners that were previously active.
       */
      listeners = union(list, listeners);

      /*
       * before handlers
       */
      inAsyncTick = true;
      for (var i = 0; i < length; ++i) {
        if ((list[i].flags & HAS_BEFORE_AL) > 0) {
          list[i].before(this, values[list[i].uid]);
        }
      }
      inAsyncTick = false;

      // save the return value to pass to the after callbacks
      var returned;
      try {
        returned = original.apply(this, arguments);
      }
      catch (er) {
        threw = true;
        for (var i = 0; i < length; ++i) {
          if ((listeners[i].flags & HAS_ERROR_AL) == 0) continue;
          try {
            handled = listeners[i].error(values[list[i].uid], er) || handled;
          }
          catch (x) {
            errorThrew = true;
            throw x;
          }
        }

        if (!handled) {
          // having an uncaughtException handler here alters crash semantics
          process.removeListener('uncaughtException', asyncCatcher);
          process._originalNextTick(function () {
            process.addListener('uncaughtException', asyncCatcher);
          });

          throw er;
        }
      }
      finally {
        /*
         * after handlers (not run if original throws)
         */
        if (!threw || handled) {
          inAsyncTick = true;
          for (i = 0; i < length; ++i) {
            if ((list[i].flags & HAS_AFTER_AL) > 0) {
              list[i].after(this, values[list[i].uid]);
            }
          }
          inAsyncTick = false;
        }

        // back to the previous listener list on the stack
        listeners = listenerStack.pop();
      }


      return returned;
    };
  };

  // will be the first to fire if async-listener is the first module loaded
  process.addListener('uncaughtException', asyncCatcher);
}

// for performance in the case where there are no handlers, just the listener
function simpleWrap(original, list, length) {
  inAsyncTick = true;
  for (var i = 0; i < length; ++i) {
    var listener = list[i];
    if (listener.create) listener.create(listener.data);
  }
  inAsyncTick = false;

  // still need to make sure nested async calls are made in the context
  // of the listeners active at their creation
  return function () {
    listenerStack.push(listeners);
    listeners = union(list, listeners);

    var returned = original.apply(this, arguments);

    listeners = listenerStack.pop();

    return returned;
  };
}

/**
 * Called each time an asynchronous function that's been monkeypatched in
 * index.js is called. If there are no listeners, return the function
 * unwrapped.  If there are any asyncListeners and any of them have callbacks,
 * pass them off to asyncWrap for later use, otherwise just call the listener.
 */
function wrapCallback(original) {
  var length = listeners.length;

  // no context to capture, so avoid closure creation
  if (length === 0) return original;

  // capture the active listeners as of when the wrapped function was called
  var list = listeners.slice();

  for (var i = 0; i < length; ++i) {
    if (list[i].flags > 0) return asyncWrap(original, list, length);
  }

  return simpleWrap(original, list, length);
}

function AsyncListener(callbacks, data) {
  if (typeof callbacks.create === 'function') {
    this.create = callbacks.create;
    this.flags |= HAS_CREATE_AL;
  }

  if (typeof callbacks.before === 'function') {
    this.before = callbacks.before;
    this.flags |= HAS_BEFORE_AL;
  }

  if (typeof callbacks.after === 'function') {
    this.after = callbacks.after;
    this.flags |= HAS_AFTER_AL;
  }

  if (typeof callbacks.error === 'function') {
    this.error = callbacks.error;
    this.flags |= HAS_ERROR_AL;
  }

  this.uid = ++uid;
  this.data = data === undefined ? null : data;
}
AsyncListener.prototype.create = undefined;
AsyncListener.prototype.before = undefined;
AsyncListener.prototype.after  = undefined;
AsyncListener.prototype.error  = undefined;
AsyncListener.prototype.data   = undefined;
AsyncListener.prototype.uid    = 0;
AsyncListener.prototype.flags  = 0;

function createAsyncListener(callbacks, data) {
  if (typeof callbacks !== 'object' || !callbacks) {
    throw new TypeError('callbacks argument must be an object');
  }

  if (callbacks instanceof AsyncListener) {
    return callbacks;
  }
  else {
    return new AsyncListener(callbacks, data);
  }
}

function addAsyncListener(callbacks, data) {
  var listener;
  if (!(callbacks instanceof AsyncListener)) {
    listener = createAsyncListener(callbacks, data);
  }
  else {
    listener = callbacks;
  }

  // Make sure the listener isn't already in the list.
  var registered = false;
  for (var i = 0; i < listeners.length; i++) {
    if (listener === listeners[i]) {
      registered = true;
      break;
    }
  }

  if (!registered) listeners.push(listener);

  return listener;
}

function removeAsyncListener(listener) {
  for (var i = 0; i < listeners.length; i++) {
    if (listener === listeners[i]) {
      listeners.splice(i, 1);
      break;
    }
  }
}

process.createAsyncListener = createAsyncListener;
process.addAsyncListener    = addAsyncListener;
process.removeAsyncListener = removeAsyncListener;

module.exports = wrapCallback;


/***/ }),

/***/ 6380:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (process.addAsyncListener) throw new Error("Don't require polyfill unless needed");

var shimmer      = __webpack_require__(1896)
  , semver       = __webpack_require__(3784)
  , wrap         = shimmer.wrap
  , massWrap     = shimmer.massWrap
  , wrapCallback = __webpack_require__(5191)
  , util         = __webpack_require__(1669)
  ;

var v6plus = semver.gte(process.version, '6.0.0');
var v7plus = semver.gte(process.version, '7.0.0');
var v8plus = semver.gte(process.version, '8.0.0');
var v11plus = semver.gte(process.version, '11.0.0');

var net = __webpack_require__(1631);

// From Node.js v7.0.0, net._normalizeConnectArgs have been renamed net._normalizeArgs
if (v7plus && !net._normalizeArgs) {
  // a polyfill in our polyfill etc so forth -- taken from node master on 2017/03/09
  net._normalizeArgs = function (args) {
    if (args.length === 0) {
      return [{}, null];
    }

    var arg0 = args[0];
    var options = {};
    if (typeof arg0 === 'object' && arg0 !== null) {
      // (options[...][, cb])
      options = arg0;
    } else if (isPipeName(arg0)) {
      // (path[...][, cb])
      options.path = arg0;
    } else {
      // ([port][, host][...][, cb])
      options.port = arg0;
      if (args.length > 1 && typeof args[1] === 'string') {
        options.host = args[1];
      }
    }

    var cb = args[args.length - 1];
    if (typeof cb !== 'function')
      return [options, null];
    else
      return [options, cb];
  }
} else if (!v7plus && !net._normalizeConnectArgs) {
  // a polyfill in our polyfill etc so forth -- taken from node master on 2013/10/30
  net._normalizeConnectArgs = function (args) {
    var options = {};

    function toNumber(x) { return (x = Number(x)) >= 0 ? x : false; }

    if (typeof args[0] === 'object' && args[0] !== null) {
      // connect(options, [cb])
      options = args[0];
    }
    else if (typeof args[0] === 'string' && toNumber(args[0]) === false) {
      // connect(path, [cb]);
      options.path = args[0];
    }
    else {
      // connect(port, [host], [cb])
      options.port = args[0];
      if (typeof args[1] === 'string') {
        options.host = args[1];
      }
    }

    var cb = args[args.length - 1];
    return typeof cb === 'function' ? [options, cb] : [options];
  };
}

// In https://github.com/nodejs/node/pull/11796 `_listen2` was renamed
// `_setUpListenHandle`. It's still aliased as `_listen2`, and currently the
// Node internals still call the alias - but who knows for how long. So better
// make sure we use the new name instead if available.
if ('_setUpListenHandle' in net.Server.prototype) {
  wrap(net.Server.prototype, '_setUpListenHandle', wrapSetUpListenHandle);
} else {
  wrap(net.Server.prototype, '_listen2', wrapSetUpListenHandle);
}

function wrapSetUpListenHandle(original) {
  return function () {
    this.on('connection', function (socket) {
      if (socket._handle) {
        socket._handle.onread = wrapCallback(socket._handle.onread);
      }
    });

    try {
      return original.apply(this, arguments);
    }
    finally {
      // the handle will only not be set in cases where there has been an error
      if (this._handle && this._handle.onconnection) {
        this._handle.onconnection = wrapCallback(this._handle.onconnection);
      }
    }
  };
}

function patchOnRead(ctx) {
  if (ctx && ctx._handle) {
    var handle = ctx._handle;
    if (!handle._originalOnread) {
      handle._originalOnread = handle.onread;
    }
    handle.onread = wrapCallback(handle._originalOnread);
  }
}

wrap(net.Socket.prototype, 'connect', function (original) {
  return function () {
    var args;
    // Node core uses an internal Symbol here to guard against the edge-case
    // where the user accidentally passes in an array. As we don't have access
    // to this Symbol we resort to this hack where we just detect if there is a
    // symbol or not. Checking for the number of Symbols is by no means a fool
    // proof solution, but it catches the most basic cases.
    if (v8plus &&
        Array.isArray(arguments[0]) &&
        Object.getOwnPropertySymbols(arguments[0]).length > 0) {
      // already normalized
      args = arguments[0];
    } else {
      // From Node.js v7.0.0, net._normalizeConnectArgs have been renamed net._normalizeArgs
      args = v7plus
        ? net._normalizeArgs(arguments)
        : net._normalizeConnectArgs(arguments);
    }
    if (args[1]) args[1] = wrapCallback(args[1]);
    var result = original.apply(this, args);
    patchOnRead(this);
    return result;
  };
});

var http = __webpack_require__(8605);

// NOTE: A rewrite occurred in 0.11 that changed the addRequest signature
// from (req, host, port, localAddress) to (req, options)
// Here, I use the longer signature to maintain 0.10 support, even though
// the rest of the arguments aren't actually used
wrap(http.Agent.prototype, 'addRequest', function (original) {
  return function (req) {
    var onSocket = req.onSocket;
    req.onSocket = wrapCallback(function (socket) {
      patchOnRead(socket);
      return onSocket.apply(this, arguments);
    });
    return original.apply(this, arguments);
  };
});

var childProcess = __webpack_require__(3129);

function wrapChildProcess(child) {
  if (Array.isArray(child.stdio)) {
    child.stdio.forEach(function (socket) {
      if (socket && socket._handle) {
        socket._handle.onread = wrapCallback(socket._handle.onread);
        wrap(socket._handle, 'close', activatorFirst);
      }
    });
  }

  if (child._handle) {
    child._handle.onexit = wrapCallback(child._handle.onexit);
  }
}

// iojs v2.0.0+
if (childProcess.ChildProcess) {
  wrap(childProcess.ChildProcess.prototype, 'spawn', function (original) {
    return function () {
      var result = original.apply(this, arguments);
      wrapChildProcess(this);
      return result;
    };
  });
} else {
  massWrap(childProcess, [
    'execFile', // exec is implemented in terms of execFile
    'fork',
    'spawn'
  ], function (original) {
    return function () {
      var result = original.apply(this, arguments);
      wrapChildProcess(result);
      return result;
    };
  });
}

// need unwrapped nextTick for use within < 0.9 async error handling
if (!process._fatalException) {
  process._originalNextTick = process.nextTick;
}

var processors = [];
if (process._nextDomainTick) processors.push('_nextDomainTick');
if (process._tickDomainCallback) processors.push('_tickDomainCallback');

massWrap(
  process,
  processors,
  activator
);
wrap(process, 'nextTick', activatorFirst);

var asynchronizers = [
  'setTimeout',
  'setInterval'
];
if (global.setImmediate) asynchronizers.push('setImmediate');

var timers = __webpack_require__(8213);
var patchGlobalTimers = global.setTimeout === timers.setTimeout;

massWrap(
  timers,
  asynchronizers,
  activatorFirst
);

if (patchGlobalTimers) {
  massWrap(
    global,
    asynchronizers,
    activatorFirst
  );
}

var dns = __webpack_require__(881);
massWrap(
  dns,
  [
    'lookup',
    'resolve',
    'resolve4',
    'resolve6',
    'resolveCname',
    'resolveMx',
    'resolveNs',
    'resolveTxt',
    'resolveSrv',
    'reverse'
  ],
  activator
);

if (dns.resolveNaptr) wrap(dns, 'resolveNaptr', activator);

var fs = __webpack_require__(5747);
massWrap(
  fs,
  [
    'watch',
    'rename',
    'truncate',
    'chown',
    'fchown',
    'chmod',
    'fchmod',
    'stat',
    'lstat',
    'fstat',
    'link',
    'symlink',
    'readlink',
    'realpath',
    'unlink',
    'rmdir',
    'mkdir',
    'readdir',
    'close',
    'open',
    'utimes',
    'futimes',
    'fsync',
    'write',
    'read',
    'readFile',
    'writeFile',
    'appendFile',
    'watchFile',
    'unwatchFile',
    "exists",
  ],
  activator
);

// only wrap lchown and lchmod on systems that have them.
if (fs.lchown) wrap(fs, 'lchown', activator);
if (fs.lchmod) wrap(fs, 'lchmod', activator);

// only wrap ftruncate in versions of node that have it
if (fs.ftruncate) wrap(fs, 'ftruncate', activator);

// Wrap zlib streams
var zlib;
try { zlib = __webpack_require__(8761); } catch (err) { }
if (zlib && zlib.Deflate && zlib.Deflate.prototype) {
  var proto = Object.getPrototypeOf(zlib.Deflate.prototype);
  if (proto._transform) {
    // streams2
    wrap(proto, "_transform", activator);
  }
  else if (proto.write && proto.flush && proto.end) {
    // plain ol' streams
    massWrap(
      proto,
      [
        'write',
        'flush',
        'end'
      ],
      activator
    );
  }
}

// Wrap Crypto
var crypto;
try { crypto = __webpack_require__(6417); } catch (err) { }
if (crypto) {

  var toWrap = [
      'pbkdf2',
      'randomBytes',
  ];
  if (!v11plus) {
    toWrap.push('pseudoRandomBytes');
  }

  massWrap(crypto, toWrap, activator);
}

// It is unlikely that any userspace promise implementations have a native
// implementation of both Promise and Promise.toString.
var instrumentPromise = !!global.Promise &&
    Promise.toString() === 'function Promise() { [native code] }' &&
    Promise.toString.toString() === 'function toString() { [native code] }';

// Check that global Promise is native
if (instrumentPromise) {
  // shoult not use any methods that have already been wrapped
  var promiseListener = process.addAsyncListener({
    create: function create() {
      instrumentPromise = false;
    }
  });

  // should not resolve synchronously
  global.Promise.resolve(true).then(function notSync() {
    instrumentPromise = false;
  });

  process.removeAsyncListener(promiseListener);
}

/*
 * Native promises use the microtask queue to make all callbacks run
 * asynchronously to avoid Zalgo issues. Since the microtask queue is not
 * exposed externally, promises need to be modified in a fairly invasive and
 * complex way.
 *
 * The async boundary in promises that must be patched is between the
 * fulfillment of the promise and the execution of any callback that is waiting
 * for that fulfillment to happen. This means that we need to trigger a create
 * when resolve or reject is called and trigger before, after and error handlers
 * around the callback execution. There may be multiple callbacks for each
 * fulfilled promise, so handlers will behave similar to setInterval where
 * there may be multiple before after and error calls for each create call.
 *
 * async-listener monkeypatching has one basic entry point: `wrapCallback`.
 * `wrapCallback` should be called when create should be triggered and be
 * passed a function to wrap, which will execute the body of the async work.
 * The resolve and reject calls can be modified fairly easily to call
 * `wrapCallback`, but at the time of resolve and reject all the work to be done
 * on fulfillment may not be defined, since a call to then, chain or fetch can
 * be made even after the promise has been fulfilled. To get around this, we
 * create a placeholder function which will call a function passed into it,
 * since the call to the main work is being made from within the wrapped
 * function, async-listener will work correctly.
 *
 * There is another complication with monkeypatching Promises. Calls to then,
 * chain and catch each create new Promises that are fulfilled internally in
 * different ways depending on the return value of the callback. When the
 * callback return a Promise, the new Promise is resolved asynchronously after
 * the returned Promise has been also been resolved. When something other than
 * a promise is resolved the resolve call for the new Promise is put in the
 * microtask queue and asynchronously resolved.
 *
 * Then must be wrapped so that its returned promise has a wrapper that can be
 * used to invoke further continuations. This wrapper cannot be created until
 * after the callback has run, since the callback may return either a promise
 * or another value. Fortunately we already have a wrapper function around the
 * callback we can use (the wrapper created by resolve or reject).
 *
 * By adding an additional argument to this wrapper, we can pass in the
 * returned promise so it can have its own wrapper appended. the wrapper
 * function can the call the callback, and take action based on the return
 * value. If a promise is returned, the new Promise can proxy the returned
 * Promise's wrapper (this wrapper may not exist yet, but will by the time the
 * wrapper needs to be invoked). Otherwise, a new wrapper can be create the
 * same way as in resolve and reject. Since this wrapper is created
 * synchronously within another wrapper, it will properly appear as a
 * continuation from within the callback.
 */

if (instrumentPromise) {
  wrapPromise();
}

function wrapPromise() {
  var Promise = global.Promise;

  // Updates to this class should also be applied to the the ES6 version
  // in es6-wrapped-promise.js.
  function wrappedPromise(executor) {
    if (!(this instanceof wrappedPromise)) {
      return Promise(executor);
    }

    if (typeof executor !== 'function') {
      return new Promise(executor);
    }

    var context, args;
    var promise = new Promise(wrappedExecutor);
    promise.__proto__ = wrappedPromise.prototype;

    try {
      executor.apply(context, args);
    } catch (err) {
      args[1](err);
    }

    return promise;

    function wrappedExecutor(resolve, reject) {
      context = this;
      args = [wrappedResolve, wrappedReject];

      // These wrappers create a function that can be passed a function and an argument to
      // call as a continuation from the resolve or reject.
      function wrappedResolve(val) {
        ensureAslWrapper(promise, false);
        return resolve(val);
      }

      function wrappedReject(val) {
        ensureAslWrapper(promise, false);
        return reject(val);
      }
    }
  }

  util.inherits(wrappedPromise, Promise);

  wrap(Promise.prototype, 'then', wrapThen);
  // Node.js <v7 only, alias for .then
  if (Promise.prototype.chain) {
    wrap(Promise.prototype, 'chain', wrapThen);
  }

  if (v6plus) {
    global.Promise = __webpack_require__(6813)(Promise, ensureAslWrapper);
  } else {
    var PromiseFunctions = [
      'all',
      'race',
      'reject',
      'resolve',
      'accept',  // Node.js <v7 only
      'defer'    // Node.js <v7 only
    ];

    PromiseFunctions.forEach(function(key) {
      // don't break `in` by creating a key for undefined entries
      if (typeof Promise[key] === 'function') {
        wrappedPromise[key] = Promise[key];
      }
    });
    global.Promise = wrappedPromise
  }

  function ensureAslWrapper(promise, overwrite) {
    if (!promise.__asl_wrapper || overwrite) {
      promise.__asl_wrapper = wrapCallback(propagateAslWrapper);
    }
  }

  function propagateAslWrapper(ctx, fn, result, next) {
    var nextResult;
    try {
      nextResult = fn.call(ctx, result);
      return {returnVal: nextResult, error: false}
    } catch (err) {
      return {errorVal: err, error: true}
    } finally {
      // Wrap any resulting futures as continuations.
      if (nextResult instanceof Promise) {
        next.__asl_wrapper = function proxyWrapper() {
          var aslWrapper = nextResult.__asl_wrapper || propagateAslWrapper;
          return aslWrapper.apply(this, arguments);
        }
      } else {
        ensureAslWrapper(next, true);
      }
    }
  }

  function wrapThen(original) {
    return function wrappedThen() {
      var promise = this;
      var next = original.apply(promise, Array.prototype.map.call(arguments, bind));

      next.__asl_wrapper = function proxyWrapper(ctx, fn, val, last) {
        if (promise.__asl_wrapper) {
          promise.__asl_wrapper(ctx, function () {}, null, next);
          return next.__asl_wrapper(ctx, fn, val, last);
        }
        return propagateAslWrapper(ctx, fn, val, last);
      }

      return next;

      // wrap callbacks (success, error) so that the callbacks will be called as a
      // continuations of the resolve or reject call using the __asl_wrapper created above.
      function bind(fn) {
        if (typeof fn !== 'function') return fn;
        return wrapCallback(function (val) {
          var result = (promise.__asl_wrapper || propagateAslWrapper)(this, fn, val, next);
          if (result.error) {
            throw result.errorVal
          } else {
            return result.returnVal
          }
        });
      }
    }
  }
}

// Shim activator for functions that have callback last
function activator(fn) {
  var fallback = function () {
    var args;
    var cbIdx = arguments.length - 1;
    if (typeof arguments[cbIdx] === "function") {
      args = Array(arguments.length)
      for (var i = 0; i < arguments.length - 1; i++) {
        args[i] = arguments[i];
      }
      args[cbIdx] = wrapCallback(arguments[cbIdx]);
    }
    return fn.apply(this, args || arguments);
  };
  // Preserve function length for small arg count functions.
  switch (fn.length) {
    case 1:
      return function (cb) {
        if (arguments.length !== 1) return fallback.apply(this, arguments);
        if (typeof cb === "function") cb = wrapCallback(cb);
        return fn.call(this, cb);
      };
    case 2:
      return function (a, cb) {
        if (arguments.length !== 2) return fallback.apply(this, arguments);
        if (typeof cb === "function") cb = wrapCallback(cb);
        return fn.call(this, a, cb);
      };
    case 3:
      return function (a, b, cb) {
        if (arguments.length !== 3) return fallback.apply(this, arguments);
        if (typeof cb === "function") cb = wrapCallback(cb);
        return fn.call(this, a, b, cb);
      };
    case 4:
      return function (a, b, c, cb) {
        if (arguments.length !== 4) return fallback.apply(this, arguments);
        if (typeof cb === "function") cb = wrapCallback(cb);
        return fn.call(this, a, b, c, cb);
      };
    case 5:
      return function (a, b, c, d, cb) {
        if (arguments.length !== 5) return fallback.apply(this, arguments);
        if (typeof cb === "function") cb = wrapCallback(cb);
        return fn.call(this, a, b, c, d, cb);
      };
    case 6:
      return function (a, b, c, d, e, cb) {
        if (arguments.length !== 6) return fallback.apply(this, arguments);
        if (typeof cb === "function") cb = wrapCallback(cb);
        return fn.call(this, a, b, c, d, e, cb);
      };
    default:
      return fallback;
  }
}

// Shim activator for functions that have callback first
function activatorFirst(fn) {
  var fallback = function () {
    var args;
    if (typeof arguments[0] === "function") {
      args = Array(arguments.length)
      args[0] = wrapCallback(arguments[0]);
      for (var i = 1; i < arguments.length; i++) {
        args[i] = arguments[i];
      }
    }
    return fn.apply(this, args || arguments);
  };
  // Preserve function length for small arg count functions.
  switch (fn.length) {
    case 1:
      return function (cb) {
        if (arguments.length !== 1) return fallback.apply(this, arguments);
        if (typeof cb === "function") cb = wrapCallback(cb);
        return fn.call(this, cb);
      };
    case 2:
      return function (cb, a) {
        if (arguments.length !== 2) return fallback.apply(this, arguments);
        if (typeof cb === "function") cb = wrapCallback(cb);
        return fn.call(this, cb, a);
      };
    case 3:
      return function (cb, a, b) {
        if (arguments.length !== 3) return fallback.apply(this, arguments);
        if (typeof cb === "function") cb = wrapCallback(cb);
        return fn.call(this, cb, a, b);
      };
    case 4:
      return function (cb, a, b, c) {
        if (arguments.length !== 4) return fallback.apply(this, arguments);
        if (typeof cb === "function") cb = wrapCallback(cb);
        return fn.call(this, cb, a, b, c);
      };
    case 5:
      return function (cb, a, b, c, d) {
        if (arguments.length !== 5) return fallback.apply(this, arguments);
        if (typeof cb === "function") cb = wrapCallback(cb);
        return fn.call(this, cb, a, b, c, d);
      };
    case 6:
      return function (cb, a, b, c, d, e) {
        if (arguments.length !== 6) return fallback.apply(this, arguments);
        if (typeof cb === "function") cb = wrapCallback(cb);
        return fn.call(this, cb, a, b, c, d, e);
      };
    default:
      return fallback;
  }
}

// taken from node master on 2017/03/09
function toNumber(x) {
  return (x = Number(x)) >= 0 ? x : false;
}

// taken from node master on 2017/03/09
function isPipeName(s) {
  return typeof s === 'string' && toNumber(s) === false;
}


/***/ }),

/***/ 3784:
/***/ ((module, exports) => {

exports = module.exports = SemVer

var debug
/* istanbul ignore next */
if (typeof process === 'object' &&
    process.env &&
    process.env.NODE_DEBUG &&
    /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
  debug = function () {
    var args = Array.prototype.slice.call(arguments, 0)
    args.unshift('SEMVER')
    console.log.apply(console, args)
  }
} else {
  debug = function () {}
}

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
exports.SEMVER_SPEC_VERSION = '2.0.0'

var MAX_LENGTH = 256
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
  /* istanbul ignore next */ 9007199254740991

// Max safe segment length for coercion.
var MAX_SAFE_COMPONENT_LENGTH = 16

// The actual regexps go on exports.re
var re = exports.re = []
var src = exports.src = []
var R = 0

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

var NUMERICIDENTIFIER = R++
src[NUMERICIDENTIFIER] = '0|[1-9]\\d*'
var NUMERICIDENTIFIERLOOSE = R++
src[NUMERICIDENTIFIERLOOSE] = '[0-9]+'

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

var NONNUMERICIDENTIFIER = R++
src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*'

// ## Main Version
// Three dot-separated numeric identifiers.

var MAINVERSION = R++
src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')'

var MAINVERSIONLOOSE = R++
src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')'

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

var PRERELEASEIDENTIFIER = R++
src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +
                            '|' + src[NONNUMERICIDENTIFIER] + ')'

var PRERELEASEIDENTIFIERLOOSE = R++
src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +
                                 '|' + src[NONNUMERICIDENTIFIER] + ')'

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

var PRERELEASE = R++
src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +
                  '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))'

var PRERELEASELOOSE = R++
src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +
                       '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))'

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

var BUILDIDENTIFIER = R++
src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+'

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

var BUILD = R++
src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +
             '(?:\\.' + src[BUILDIDENTIFIER] + ')*))'

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

var FULL = R++
var FULLPLAIN = 'v?' + src[MAINVERSION] +
                src[PRERELEASE] + '?' +
                src[BUILD] + '?'

src[FULL] = '^' + FULLPLAIN + '$'

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +
                 src[PRERELEASELOOSE] + '?' +
                 src[BUILD] + '?'

var LOOSE = R++
src[LOOSE] = '^' + LOOSEPLAIN + '$'

var GTLT = R++
src[GTLT] = '((?:<|>)?=?)'

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
var XRANGEIDENTIFIERLOOSE = R++
src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*'
var XRANGEIDENTIFIER = R++
src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*'

var XRANGEPLAIN = R++
src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:' + src[PRERELEASE] + ')?' +
                   src[BUILD] + '?' +
                   ')?)?'

var XRANGEPLAINLOOSE = R++
src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:' + src[PRERELEASELOOSE] + ')?' +
                        src[BUILD] + '?' +
                        ')?)?'

var XRANGE = R++
src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$'
var XRANGELOOSE = R++
src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$'

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
var COERCE = R++
src[COERCE] = '(?:^|[^\\d])' +
              '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:$|[^\\d])'

// Tilde ranges.
// Meaning is "reasonably at or greater than"
var LONETILDE = R++
src[LONETILDE] = '(?:~>?)'

var TILDETRIM = R++
src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+'
re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g')
var tildeTrimReplace = '$1~'

var TILDE = R++
src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$'
var TILDELOOSE = R++
src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$'

// Caret ranges.
// Meaning is "at least and backwards compatible with"
var LONECARET = R++
src[LONECARET] = '(?:\\^)'

var CARETTRIM = R++
src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+'
re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g')
var caretTrimReplace = '$1^'

var CARET = R++
src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$'
var CARETLOOSE = R++
src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$'

// A simple gt/lt/eq thing, or just "" to indicate "any version"
var COMPARATORLOOSE = R++
src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$'
var COMPARATOR = R++
src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$'

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
var COMPARATORTRIM = R++
src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +
                      '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')'

// this one has to use the /g flag
re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g')
var comparatorTrimReplace = '$1$2$3'

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
var HYPHENRANGE = R++
src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +
                   '\\s+-\\s+' +
                   '(' + src[XRANGEPLAIN] + ')' +
                   '\\s*$'

var HYPHENRANGELOOSE = R++
src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s+-\\s+' +
                        '(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s*$'

// Star ranges basically just allow anything at all.
var STAR = R++
src[STAR] = '(<|>)?=?\\s*\\*'

// Compile to actual regexp objects.
// All are flag-free, unless they were created above with a flag.
for (var i = 0; i < R; i++) {
  debug(i, src[i])
  if (!re[i]) {
    re[i] = new RegExp(src[i])
  }
}

exports.parse = parse
function parse (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  if (version.length > MAX_LENGTH) {
    return null
  }

  var r = options.loose ? re[LOOSE] : re[FULL]
  if (!r.test(version)) {
    return null
  }

  try {
    return new SemVer(version, options)
  } catch (er) {
    return null
  }
}

exports.valid = valid
function valid (version, options) {
  var v = parse(version, options)
  return v ? v.version : null
}

exports.clean = clean
function clean (version, options) {
  var s = parse(version.trim().replace(/^[=v]+/, ''), options)
  return s ? s.version : null
}

exports.SemVer = SemVer

function SemVer (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }
  if (version instanceof SemVer) {
    if (version.loose === options.loose) {
      return version
    } else {
      version = version.version
    }
  } else if (typeof version !== 'string') {
    throw new TypeError('Invalid Version: ' + version)
  }

  if (version.length > MAX_LENGTH) {
    throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')
  }

  if (!(this instanceof SemVer)) {
    return new SemVer(version, options)
  }

  debug('SemVer', version, options)
  this.options = options
  this.loose = !!options.loose

  var m = version.trim().match(options.loose ? re[LOOSE] : re[FULL])

  if (!m) {
    throw new TypeError('Invalid Version: ' + version)
  }

  this.raw = version

  // these are actually numbers
  this.major = +m[1]
  this.minor = +m[2]
  this.patch = +m[3]

  if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
    throw new TypeError('Invalid major version')
  }

  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
    throw new TypeError('Invalid minor version')
  }

  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
    throw new TypeError('Invalid patch version')
  }

  // numberify any prerelease numeric ids
  if (!m[4]) {
    this.prerelease = []
  } else {
    this.prerelease = m[4].split('.').map(function (id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id
        if (num >= 0 && num < MAX_SAFE_INTEGER) {
          return num
        }
      }
      return id
    })
  }

  this.build = m[5] ? m[5].split('.') : []
  this.format()
}

SemVer.prototype.format = function () {
  this.version = this.major + '.' + this.minor + '.' + this.patch
  if (this.prerelease.length) {
    this.version += '-' + this.prerelease.join('.')
  }
  return this.version
}

SemVer.prototype.toString = function () {
  return this.version
}

SemVer.prototype.compare = function (other) {
  debug('SemVer.compare', this.version, this.options, other)
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return this.compareMain(other) || this.comparePre(other)
}

SemVer.prototype.compareMain = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return compareIdentifiers(this.major, other.major) ||
         compareIdentifiers(this.minor, other.minor) ||
         compareIdentifiers(this.patch, other.patch)
}

SemVer.prototype.comparePre = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  // NOT having a prerelease is > having one
  if (this.prerelease.length && !other.prerelease.length) {
    return -1
  } else if (!this.prerelease.length && other.prerelease.length) {
    return 1
  } else if (!this.prerelease.length && !other.prerelease.length) {
    return 0
  }

  var i = 0
  do {
    var a = this.prerelease[i]
    var b = other.prerelease[i]
    debug('prerelease compare', i, a, b)
    if (a === undefined && b === undefined) {
      return 0
    } else if (b === undefined) {
      return 1
    } else if (a === undefined) {
      return -1
    } else if (a === b) {
      continue
    } else {
      return compareIdentifiers(a, b)
    }
  } while (++i)
}

// preminor will bump the version up to the next minor release, and immediately
// down to pre-release. premajor and prepatch work the same way.
SemVer.prototype.inc = function (release, identifier) {
  switch (release) {
    case 'premajor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor = 0
      this.major++
      this.inc('pre', identifier)
      break
    case 'preminor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor++
      this.inc('pre', identifier)
      break
    case 'prepatch':
      // If this is already a prerelease, it will bump to the next version
      // drop any prereleases that might already exist, since they are not
      // relevant at this point.
      this.prerelease.length = 0
      this.inc('patch', identifier)
      this.inc('pre', identifier)
      break
    // If the input is a non-prerelease version, this acts the same as
    // prepatch.
    case 'prerelease':
      if (this.prerelease.length === 0) {
        this.inc('patch', identifier)
      }
      this.inc('pre', identifier)
      break

    case 'major':
      // If this is a pre-major version, bump up to the same major version.
      // Otherwise increment major.
      // 1.0.0-5 bumps to 1.0.0
      // 1.1.0 bumps to 2.0.0
      if (this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0) {
        this.major++
      }
      this.minor = 0
      this.patch = 0
      this.prerelease = []
      break
    case 'minor':
      // If this is a pre-minor version, bump up to the same minor version.
      // Otherwise increment minor.
      // 1.2.0-5 bumps to 1.2.0
      // 1.2.1 bumps to 1.3.0
      if (this.patch !== 0 || this.prerelease.length === 0) {
        this.minor++
      }
      this.patch = 0
      this.prerelease = []
      break
    case 'patch':
      // If this is not a pre-release version, it will increment the patch.
      // If it is a pre-release it will bump up to the same patch version.
      // 1.2.0-5 patches to 1.2.0
      // 1.2.0 patches to 1.2.1
      if (this.prerelease.length === 0) {
        this.patch++
      }
      this.prerelease = []
      break
    // This probably shouldn't be used publicly.
    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
    case 'pre':
      if (this.prerelease.length === 0) {
        this.prerelease = [0]
      } else {
        var i = this.prerelease.length
        while (--i >= 0) {
          if (typeof this.prerelease[i] === 'number') {
            this.prerelease[i]++
            i = -2
          }
        }
        if (i === -1) {
          // didn't increment anything
          this.prerelease.push(0)
        }
      }
      if (identifier) {
        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
        if (this.prerelease[0] === identifier) {
          if (isNaN(this.prerelease[1])) {
            this.prerelease = [identifier, 0]
          }
        } else {
          this.prerelease = [identifier, 0]
        }
      }
      break

    default:
      throw new Error('invalid increment argument: ' + release)
  }
  this.format()
  this.raw = this.version
  return this
}

exports.inc = inc
function inc (version, release, loose, identifier) {
  if (typeof (loose) === 'string') {
    identifier = loose
    loose = undefined
  }

  try {
    return new SemVer(version, loose).inc(release, identifier).version
  } catch (er) {
    return null
  }
}

exports.diff = diff
function diff (version1, version2) {
  if (eq(version1, version2)) {
    return null
  } else {
    var v1 = parse(version1)
    var v2 = parse(version2)
    var prefix = ''
    if (v1.prerelease.length || v2.prerelease.length) {
      prefix = 'pre'
      var defaultResult = 'prerelease'
    }
    for (var key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return prefix + key
        }
      }
    }
    return defaultResult // may be undefined
  }
}

exports.compareIdentifiers = compareIdentifiers

var numeric = /^[0-9]+$/
function compareIdentifiers (a, b) {
  var anum = numeric.test(a)
  var bnum = numeric.test(b)

  if (anum && bnum) {
    a = +a
    b = +b
  }

  return a === b ? 0
    : (anum && !bnum) ? -1
    : (bnum && !anum) ? 1
    : a < b ? -1
    : 1
}

exports.rcompareIdentifiers = rcompareIdentifiers
function rcompareIdentifiers (a, b) {
  return compareIdentifiers(b, a)
}

exports.major = major
function major (a, loose) {
  return new SemVer(a, loose).major
}

exports.minor = minor
function minor (a, loose) {
  return new SemVer(a, loose).minor
}

exports.patch = patch
function patch (a, loose) {
  return new SemVer(a, loose).patch
}

exports.compare = compare
function compare (a, b, loose) {
  return new SemVer(a, loose).compare(new SemVer(b, loose))
}

exports.compareLoose = compareLoose
function compareLoose (a, b) {
  return compare(a, b, true)
}

exports.rcompare = rcompare
function rcompare (a, b, loose) {
  return compare(b, a, loose)
}

exports.sort = sort
function sort (list, loose) {
  return list.sort(function (a, b) {
    return exports.compare(a, b, loose)
  })
}

exports.rsort = rsort
function rsort (list, loose) {
  return list.sort(function (a, b) {
    return exports.rcompare(a, b, loose)
  })
}

exports.gt = gt
function gt (a, b, loose) {
  return compare(a, b, loose) > 0
}

exports.lt = lt
function lt (a, b, loose) {
  return compare(a, b, loose) < 0
}

exports.eq = eq
function eq (a, b, loose) {
  return compare(a, b, loose) === 0
}

exports.neq = neq
function neq (a, b, loose) {
  return compare(a, b, loose) !== 0
}

exports.gte = gte
function gte (a, b, loose) {
  return compare(a, b, loose) >= 0
}

exports.lte = lte
function lte (a, b, loose) {
  return compare(a, b, loose) <= 0
}

exports.cmp = cmp
function cmp (a, op, b, loose) {
  switch (op) {
    case '===':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a === b

    case '!==':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a !== b

    case '':
    case '=':
    case '==':
      return eq(a, b, loose)

    case '!=':
      return neq(a, b, loose)

    case '>':
      return gt(a, b, loose)

    case '>=':
      return gte(a, b, loose)

    case '<':
      return lt(a, b, loose)

    case '<=':
      return lte(a, b, loose)

    default:
      throw new TypeError('Invalid operator: ' + op)
  }
}

exports.Comparator = Comparator
function Comparator (comp, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (comp instanceof Comparator) {
    if (comp.loose === !!options.loose) {
      return comp
    } else {
      comp = comp.value
    }
  }

  if (!(this instanceof Comparator)) {
    return new Comparator(comp, options)
  }

  debug('comparator', comp, options)
  this.options = options
  this.loose = !!options.loose
  this.parse(comp)

  if (this.semver === ANY) {
    this.value = ''
  } else {
    this.value = this.operator + this.semver.version
  }

  debug('comp', this)
}

var ANY = {}
Comparator.prototype.parse = function (comp) {
  var r = this.options.loose ? re[COMPARATORLOOSE] : re[COMPARATOR]
  var m = comp.match(r)

  if (!m) {
    throw new TypeError('Invalid comparator: ' + comp)
  }

  this.operator = m[1]
  if (this.operator === '=') {
    this.operator = ''
  }

  // if it literally is just '>' or '' then allow anything.
  if (!m[2]) {
    this.semver = ANY
  } else {
    this.semver = new SemVer(m[2], this.options.loose)
  }
}

Comparator.prototype.toString = function () {
  return this.value
}

Comparator.prototype.test = function (version) {
  debug('Comparator.test', version, this.options.loose)

  if (this.semver === ANY) {
    return true
  }

  if (typeof version === 'string') {
    version = new SemVer(version, this.options)
  }

  return cmp(version, this.operator, this.semver, this.options)
}

Comparator.prototype.intersects = function (comp, options) {
  if (!(comp instanceof Comparator)) {
    throw new TypeError('a Comparator is required')
  }

  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  var rangeTmp

  if (this.operator === '') {
    rangeTmp = new Range(comp.value, options)
    return satisfies(this.value, rangeTmp, options)
  } else if (comp.operator === '') {
    rangeTmp = new Range(this.value, options)
    return satisfies(comp.semver, rangeTmp, options)
  }

  var sameDirectionIncreasing =
    (this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '>=' || comp.operator === '>')
  var sameDirectionDecreasing =
    (this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '<=' || comp.operator === '<')
  var sameSemVer = this.semver.version === comp.semver.version
  var differentDirectionsInclusive =
    (this.operator === '>=' || this.operator === '<=') &&
    (comp.operator === '>=' || comp.operator === '<=')
  var oppositeDirectionsLessThan =
    cmp(this.semver, '<', comp.semver, options) &&
    ((this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '<=' || comp.operator === '<'))
  var oppositeDirectionsGreaterThan =
    cmp(this.semver, '>', comp.semver, options) &&
    ((this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '>=' || comp.operator === '>'))

  return sameDirectionIncreasing || sameDirectionDecreasing ||
    (sameSemVer && differentDirectionsInclusive) ||
    oppositeDirectionsLessThan || oppositeDirectionsGreaterThan
}

exports.Range = Range
function Range (range, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (range instanceof Range) {
    if (range.loose === !!options.loose &&
        range.includePrerelease === !!options.includePrerelease) {
      return range
    } else {
      return new Range(range.raw, options)
    }
  }

  if (range instanceof Comparator) {
    return new Range(range.value, options)
  }

  if (!(this instanceof Range)) {
    return new Range(range, options)
  }

  this.options = options
  this.loose = !!options.loose
  this.includePrerelease = !!options.includePrerelease

  // First, split based on boolean or ||
  this.raw = range
  this.set = range.split(/\s*\|\|\s*/).map(function (range) {
    return this.parseRange(range.trim())
  }, this).filter(function (c) {
    // throw out any that are not relevant for whatever reason
    return c.length
  })

  if (!this.set.length) {
    throw new TypeError('Invalid SemVer Range: ' + range)
  }

  this.format()
}

Range.prototype.format = function () {
  this.range = this.set.map(function (comps) {
    return comps.join(' ').trim()
  }).join('||').trim()
  return this.range
}

Range.prototype.toString = function () {
  return this.range
}

Range.prototype.parseRange = function (range) {
  var loose = this.options.loose
  range = range.trim()
  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE]
  range = range.replace(hr, hyphenReplace)
  debug('hyphen replace', range)
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace)
  debug('comparator trim', range, re[COMPARATORTRIM])

  // `~ 1.2.3` => `~1.2.3`
  range = range.replace(re[TILDETRIM], tildeTrimReplace)

  // `^ 1.2.3` => `^1.2.3`
  range = range.replace(re[CARETTRIM], caretTrimReplace)

  // normalize spaces
  range = range.split(/\s+/).join(' ')

  // At this point, the range is completely trimmed and
  // ready to be split into comparators.

  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR]
  var set = range.split(' ').map(function (comp) {
    return parseComparator(comp, this.options)
  }, this).join(' ').split(/\s+/)
  if (this.options.loose) {
    // in loose mode, throw out any that are not valid comparators
    set = set.filter(function (comp) {
      return !!comp.match(compRe)
    })
  }
  set = set.map(function (comp) {
    return new Comparator(comp, this.options)
  }, this)

  return set
}

Range.prototype.intersects = function (range, options) {
  if (!(range instanceof Range)) {
    throw new TypeError('a Range is required')
  }

  return this.set.some(function (thisComparators) {
    return thisComparators.every(function (thisComparator) {
      return range.set.some(function (rangeComparators) {
        return rangeComparators.every(function (rangeComparator) {
          return thisComparator.intersects(rangeComparator, options)
        })
      })
    })
  })
}

// Mostly just for testing and legacy API reasons
exports.toComparators = toComparators
function toComparators (range, options) {
  return new Range(range, options).set.map(function (comp) {
    return comp.map(function (c) {
      return c.value
    }).join(' ').trim().split(' ')
  })
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
function parseComparator (comp, options) {
  debug('comp', comp, options)
  comp = replaceCarets(comp, options)
  debug('caret', comp)
  comp = replaceTildes(comp, options)
  debug('tildes', comp)
  comp = replaceXRanges(comp, options)
  debug('xrange', comp)
  comp = replaceStars(comp, options)
  debug('stars', comp)
  return comp
}

function isX (id) {
  return !id || id.toLowerCase() === 'x' || id === '*'
}

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
function replaceTildes (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceTilde(comp, options)
  }).join(' ')
}

function replaceTilde (comp, options) {
  var r = options.loose ? re[TILDELOOSE] : re[TILDE]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('tilde', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      // ~1.2 == >=1.2.0 <1.3.0
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
    } else if (pr) {
      debug('replaceTilde pr', pr)
      ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
            ' <' + M + '.' + (+m + 1) + '.0'
    } else {
      // ~1.2.3 == >=1.2.3 <1.3.0
      ret = '>=' + M + '.' + m + '.' + p +
            ' <' + M + '.' + (+m + 1) + '.0'
    }

    debug('tilde return', ret)
    return ret
  })
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
// ^1.2.3 --> >=1.2.3 <2.0.0
// ^1.2.0 --> >=1.2.0 <2.0.0
function replaceCarets (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceCaret(comp, options)
  }).join(' ')
}

function replaceCaret (comp, options) {
  debug('caret', comp, options)
  var r = options.loose ? re[CARETLOOSE] : re[CARET]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('caret', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      if (M === '0') {
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
      } else {
        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0'
      }
    } else if (pr) {
      debug('replaceCaret pr', pr)
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
              ' <' + (+M + 1) + '.0.0'
      }
    } else {
      debug('no pr')
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p +
              ' <' + (+M + 1) + '.0.0'
      }
    }

    debug('caret return', ret)
    return ret
  })
}

function replaceXRanges (comp, options) {
  debug('replaceXRanges', comp, options)
  return comp.split(/\s+/).map(function (comp) {
    return replaceXRange(comp, options)
  }).join(' ')
}

function replaceXRange (comp, options) {
  comp = comp.trim()
  var r = options.loose ? re[XRANGELOOSE] : re[XRANGE]
  return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
    debug('xRange', comp, ret, gtlt, M, m, p, pr)
    var xM = isX(M)
    var xm = xM || isX(m)
    var xp = xm || isX(p)
    var anyX = xp

    if (gtlt === '=' && anyX) {
      gtlt = ''
    }

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0'
      } else {
        // nothing is forbidden
        ret = '*'
      }
    } else if (gtlt && anyX) {
      // we know patch is an x, because we have any x at all.
      // replace X with 0
      if (xm) {
        m = 0
      }
      p = 0

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        // >1.2.3 => >= 1.2.4
        gtlt = '>='
        if (xm) {
          M = +M + 1
          m = 0
          p = 0
        } else {
          m = +m + 1
          p = 0
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<'
        if (xm) {
          M = +M + 1
        } else {
          m = +m + 1
        }
      }

      ret = gtlt + M + '.' + m + '.' + p
    } else if (xm) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (xp) {
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
    }

    debug('xRange return', ret)

    return ret
  })
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
function replaceStars (comp, options) {
  debug('replaceStars', comp, options)
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[STAR], '')
}

// This function is passed to string.replace(re[HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0
function hyphenReplace ($0,
  from, fM, fm, fp, fpr, fb,
  to, tM, tm, tp, tpr, tb) {
  if (isX(fM)) {
    from = ''
  } else if (isX(fm)) {
    from = '>=' + fM + '.0.0'
  } else if (isX(fp)) {
    from = '>=' + fM + '.' + fm + '.0'
  } else {
    from = '>=' + from
  }

  if (isX(tM)) {
    to = ''
  } else if (isX(tm)) {
    to = '<' + (+tM + 1) + '.0.0'
  } else if (isX(tp)) {
    to = '<' + tM + '.' + (+tm + 1) + '.0'
  } else if (tpr) {
    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr
  } else {
    to = '<=' + to
  }

  return (from + ' ' + to).trim()
}

// if ANY of the sets match ALL of its comparators, then pass
Range.prototype.test = function (version) {
  if (!version) {
    return false
  }

  if (typeof version === 'string') {
    version = new SemVer(version, this.options)
  }

  for (var i = 0; i < this.set.length; i++) {
    if (testSet(this.set[i], version, this.options)) {
      return true
    }
  }
  return false
}

function testSet (set, version, options) {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false
    }
  }

  if (version.prerelease.length && !options.includePrerelease) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (i = 0; i < set.length; i++) {
      debug(set[i].semver)
      if (set[i].semver === ANY) {
        continue
      }

      if (set[i].semver.prerelease.length > 0) {
        var allowed = set[i].semver
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch) {
          return true
        }
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false
  }

  return true
}

exports.satisfies = satisfies
function satisfies (version, range, options) {
  try {
    range = new Range(range, options)
  } catch (er) {
    return false
  }
  return range.test(version)
}

exports.maxSatisfying = maxSatisfying
function maxSatisfying (versions, range, options) {
  var max = null
  var maxSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!max || maxSV.compare(v) === -1) {
        // compare(max, v, true)
        max = v
        maxSV = new SemVer(max, options)
      }
    }
  })
  return max
}

exports.minSatisfying = minSatisfying
function minSatisfying (versions, range, options) {
  var min = null
  var minSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!min || minSV.compare(v) === 1) {
        // compare(min, v, true)
        min = v
        minSV = new SemVer(min, options)
      }
    }
  })
  return min
}

exports.minVersion = minVersion
function minVersion (range, loose) {
  range = new Range(range, loose)

  var minver = new SemVer('0.0.0')
  if (range.test(minver)) {
    return minver
  }

  minver = new SemVer('0.0.0-0')
  if (range.test(minver)) {
    return minver
  }

  minver = null
  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    comparators.forEach(function (comparator) {
      // Clone to avoid manipulating the comparator's semver object.
      var compver = new SemVer(comparator.semver.version)
      switch (comparator.operator) {
        case '>':
          if (compver.prerelease.length === 0) {
            compver.patch++
          } else {
            compver.prerelease.push(0)
          }
          compver.raw = compver.format()
          /* fallthrough */
        case '':
        case '>=':
          if (!minver || gt(minver, compver)) {
            minver = compver
          }
          break
        case '<':
        case '<=':
          /* Ignore maximum versions */
          break
        /* istanbul ignore next */
        default:
          throw new Error('Unexpected operation: ' + comparator.operator)
      }
    })
  }

  if (minver && range.test(minver)) {
    return minver
  }

  return null
}

exports.validRange = validRange
function validRange (range, options) {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, options).range || '*'
  } catch (er) {
    return null
  }
}

// Determine if version is less than all the versions possible in the range
exports.ltr = ltr
function ltr (version, range, options) {
  return outside(version, range, '<', options)
}

// Determine if version is greater than all the versions possible in the range.
exports.gtr = gtr
function gtr (version, range, options) {
  return outside(version, range, '>', options)
}

exports.outside = outside
function outside (version, range, hilo, options) {
  version = new SemVer(version, options)
  range = new Range(range, options)

  var gtfn, ltefn, ltfn, comp, ecomp
  switch (hilo) {
    case '>':
      gtfn = gt
      ltefn = lte
      ltfn = lt
      comp = '>'
      ecomp = '>='
      break
    case '<':
      gtfn = lt
      ltefn = gte
      ltfn = gt
      comp = '<'
      ecomp = '<='
      break
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"')
  }

  // If it satisifes the range it is not outside
  if (satisfies(version, range, options)) {
    return false
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    var high = null
    var low = null

    comparators.forEach(function (comparator) {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0')
      }
      high = high || comparator
      low = low || comparator
      if (gtfn(comparator.semver, high.semver, options)) {
        high = comparator
      } else if (ltfn(comparator.semver, low.semver, options)) {
        low = comparator
      }
    })

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false
    }
  }
  return true
}

exports.prerelease = prerelease
function prerelease (version, options) {
  var parsed = parse(version, options)
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
}

exports.intersects = intersects
function intersects (r1, r2, options) {
  r1 = new Range(r1, options)
  r2 = new Range(r2, options)
  return r1.intersects(r2)
}

exports.coerce = coerce
function coerce (version) {
  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  var match = version.match(re[COERCE])

  if (match == null) {
    return null
  }

  return parse(match[1] +
    '.' + (match[2] || '0') +
    '.' + (match[3] || '0'))
}


/***/ }),

/***/ 8309:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const util = __webpack_require__(1669);
const assert = __webpack_require__(2357);
const wrapEmitter = __webpack_require__(6174);
const asyncHook = __webpack_require__(2902);

const CONTEXTS_SYMBOL = 'cls@contexts';
const ERROR_SYMBOL = 'error@context';

//const trace = [];

const invertedProviders = [];
for (let key in asyncHook.providers) {
  invertedProviders[asyncHook.providers[key]] = key;
}

const DEBUG_CLS_HOOKED = process.env.DEBUG_CLS_HOOKED;

let currentUid = -1;

module.exports = {
  getNamespace: getNamespace,
  createNamespace: createNamespace,
  destroyNamespace: destroyNamespace,
  reset: reset,
  //trace: trace,
  ERROR_SYMBOL: ERROR_SYMBOL
};

function Namespace(name) {
  this.name = name;
  // changed in 2.7: no default context
  this.active = null;
  this._set = [];
  this.id = null;
  this._contexts = new Map();
}

Namespace.prototype.set = function set(key, value) {
  if (!this.active) {
    throw new Error('No context available. ns.run() or ns.bind() must be called first.');
  }

  if (DEBUG_CLS_HOOKED) {
    debug2('    SETTING KEY:' + key + '=' + value + ' in ns:' + this.name + ' uid:' + currentUid + ' active:' +
      util.inspect(this.active, true));
  }
  this.active[key] = value;
  return value;
};

Namespace.prototype.get = function get(key) {
  if (!this.active) {
    if (DEBUG_CLS_HOOKED) {
      debug2('    GETTING KEY:' + key + '=undefined' + ' ' + this.name + ' uid:' + currentUid + ' active:' +
        util.inspect(this.active, true));
    }
    return undefined;
  }
  if (DEBUG_CLS_HOOKED) {
    debug2('    GETTING KEY:' + key + '=' + this.active[key] + ' ' + this.name + ' uid:' + currentUid + ' active:' +
      util.inspect(this.active, true));
  }
  return this.active[key];
};

Namespace.prototype.createContext = function createContext() {
  if (DEBUG_CLS_HOOKED) {
    debug2('   CREATING Context: ' + this.name + ' uid:' + currentUid + ' len:' + this._set.length + ' ' + ' active:' +
      util.inspect(this.active, true, 2, true));
  }

  let context = Object.create(this.active ? this.active : Object.prototype);
  context._ns_name = this.name;
  context.id = currentUid;

  if (DEBUG_CLS_HOOKED) {
    debug2('   CREATED Context: ' + this.name + ' uid:' + currentUid + ' len:' + this._set.length + ' ' + ' context:' +
      util.inspect(context, true, 2, true));
  }

  return context;
};

Namespace.prototype.run = function run(fn) {
  let context = this.createContext();
  this.enter(context);
  try {
    if (DEBUG_CLS_HOOKED) {
      debug2(' BEFORE RUN: ' + this.name + ' uid:' + currentUid + ' len:' + this._set.length + ' ' +
        util.inspect(context));
    }
    fn(context);
    return context;
  }
  catch (exception) {
    if (exception) {
      exception[ERROR_SYMBOL] = context;
    }
    throw exception;
  }
  finally {
    if (DEBUG_CLS_HOOKED) {
      debug2(' AFTER RUN: ' + this.name + ' uid:' + currentUid + ' len:' + this._set.length + ' ' +
        util.inspect(context));
    }
    this.exit(context);
  }
};

Namespace.prototype.runAndReturn = function runAndReturn(fn) {
  var value;
  this.run(function (context) {
    value = fn(context);
  });
  return value;
};

/**
 * Uses global Promise and assumes Promise is cls friendly or wrapped already.
 * @param {function} fn
 * @returns {*}
 */
Namespace.prototype.runPromise = function runPromise(fn) {
  let context = this.createContext();
  this.enter(context);

  let promise = fn(context);
  if (!promise || !promise.then || !promise.catch) {
    throw new Error('fn must return a promise.');
  }

  if (DEBUG_CLS_HOOKED) {
    debug2(' BEFORE runPromise: ' + this.name + ' uid:' + currentUid + ' len:' + this._set.length + ' ' +
      util.inspect(context));
  }

  return promise
    .then(result => {
      if (DEBUG_CLS_HOOKED) {
        debug2(' AFTER runPromise: ' + this.name + ' uid:' + currentUid + ' len:' + this._set.length + ' ' +
          util.inspect(context));
      }
      this.exit(context);
      return result;
    })
    .catch(err => {
      err[ERROR_SYMBOL] = context;
      if (DEBUG_CLS_HOOKED) {
        debug2(' AFTER runPromise: ' + this.name + ' uid:' + currentUid + ' len:' + this._set.length + ' ' +
          util.inspect(context));
      }
      this.exit(context);
      throw err;
    });
};

Namespace.prototype.bind = function bindFactory(fn, context) {
  if (!context) {
    if (!this.active) {
      context = this.createContext();
    }
    else {
      context = this.active;
    }
  }

  let self = this;
  return function clsBind() {
    self.enter(context);
    try {
      return fn.apply(this, arguments);
    }
    catch (exception) {
      if (exception) {
        exception[ERROR_SYMBOL] = context;
      }
      throw exception;
    }
    finally {
      self.exit(context);
    }
  };
};

Namespace.prototype.enter = function enter(context) {
  assert.ok(context, 'context must be provided for entering');
  if (DEBUG_CLS_HOOKED) {
    debug2('  ENTER ' + this.name + ' uid:' + currentUid + ' len:' + this._set.length + ' context: ' +
      util.inspect(context));
  }

  this._set.push(this.active);
  this.active = context;
};

Namespace.prototype.exit = function exit(context) {
  assert.ok(context, 'context must be provided for exiting');
  if (DEBUG_CLS_HOOKED) {
    debug2('  EXIT ' + this.name + ' uid:' + currentUid + ' len:' + this._set.length + ' context: ' +
      util.inspect(context));
  }

  // Fast path for most exits that are at the top of the stack
  if (this.active === context) {
    assert.ok(this._set.length, 'can\'t remove top context');
    this.active = this._set.pop();
    return;
  }

  // Fast search in the stack using lastIndexOf
  let index = this._set.lastIndexOf(context);

  if (index < 0) {
    if (DEBUG_CLS_HOOKED) {
      debug2('??ERROR?? context exiting but not entered - ignoring: ' + util.inspect(context));
    }
    assert.ok(index >= 0, 'context not currently entered; can\'t exit. \n' + util.inspect(this) + '\n' +
      util.inspect(context));
  } else {
    assert.ok(index, 'can\'t remove top context');
    this._set.splice(index, 1);
  }
};

Namespace.prototype.bindEmitter = function bindEmitter(emitter) {
  assert.ok(emitter.on && emitter.addListener && emitter.emit, 'can only bind real EEs');

  let namespace = this;
  let thisSymbol = 'context@' + this.name;

  // Capture the context active at the time the emitter is bound.
  function attach(listener) {
    if (!listener) {
      return;
    }
    if (!listener[CONTEXTS_SYMBOL]) {
      listener[CONTEXTS_SYMBOL] = Object.create(null);
    }

    listener[CONTEXTS_SYMBOL][thisSymbol] = {
      namespace: namespace,
      context: namespace.active
    };
  }

  // At emit time, bind the listener within the correct context.
  function bind(unwrapped) {
    if (!(unwrapped && unwrapped[CONTEXTS_SYMBOL])) {
      return unwrapped;
    }

    let wrapped = unwrapped;
    let unwrappedContexts = unwrapped[CONTEXTS_SYMBOL];
    Object.keys(unwrappedContexts).forEach(function (name) {
      let thunk = unwrappedContexts[name];
      wrapped = thunk.namespace.bind(wrapped, thunk.context);
    });
    return wrapped;
  }

  wrapEmitter(emitter, attach, bind);
};

/**
 * If an error comes out of a namespace, it will have a context attached to it.
 * This function knows how to find it.
 *
 * @param {Error} exception Possibly annotated error.
 */
Namespace.prototype.fromException = function fromException(exception) {
  return exception[ERROR_SYMBOL];
};

function getNamespace(name) {
  return process.namespaces[name];
}

function createNamespace(name) {
  assert.ok(name, 'namespace must be given a name.');

  if (DEBUG_CLS_HOOKED) {
    debug2('CREATING NAMESPACE ' + name);
  }
  let namespace = new Namespace(name);
  namespace.id = currentUid;

  asyncHook.addHooks({
    init(uid, handle, provider, parentUid, parentHandle) {
      //parentUid = parentUid || currentUid;  // Suggested usage but appears to work better for tracing modules.
      currentUid = uid;

      //CHAIN Parent's Context onto child if none exists. This is needed to pass net-events.spec
      if (parentUid) {
        namespace._contexts.set(uid, namespace._contexts.get(parentUid));
        if (DEBUG_CLS_HOOKED) {
          debug2('PARENTID: ' + name + ' uid:' + uid + ' parent:' + parentUid + ' provider:' + provider);
        }
      } else {
        namespace._contexts.set(currentUid, namespace.active);
      }

      if (DEBUG_CLS_HOOKED) {
        debug2('INIT ' + name + ' uid:' + uid + ' parent:' + parentUid + ' provider:' + invertedProviders[provider]
          + ' active:' + util.inspect(namespace.active, true));
      }

    },
    pre(uid, handle) {
      currentUid = uid;
      let context = namespace._contexts.get(uid);
      if (context) {
        if (DEBUG_CLS_HOOKED) {
          debug2(' PRE ' + name + ' uid:' + uid + ' handle:' + getFunctionName(handle) + ' context:' +
            util.inspect(context));
        }

        namespace.enter(context);
      } else {
        if (DEBUG_CLS_HOOKED) {
          debug2(' PRE MISSING CONTEXT ' + name + ' uid:' + uid + ' handle:' + getFunctionName(handle));
        }
      }
    },
    post(uid, handle) {
      currentUid = uid;
      let context = namespace._contexts.get(uid);
      if (context) {
        if (DEBUG_CLS_HOOKED) {
          debug2(' POST ' + name + ' uid:' + uid + ' handle:' + getFunctionName(handle) + ' context:' +
            util.inspect(context));
        }

        namespace.exit(context);
      } else {
        if (DEBUG_CLS_HOOKED) {
          debug2(' POST MISSING CONTEXT ' + name + ' uid:' + uid + ' handle:' + getFunctionName(handle));
        }
      }
    },
    destroy(uid) {
      currentUid = uid;

      if (DEBUG_CLS_HOOKED) {
        debug2('DESTROY ' + name + ' uid:' + uid + ' context:' + util.inspect(namespace._contexts.get(currentUid))
          + ' active:' + util.inspect(namespace.active, true));
      }

      namespace._contexts.delete(uid);
    }
  });

  process.namespaces[name] = namespace;
  return namespace;
}

function destroyNamespace(name) {
  let namespace = getNamespace(name);

  assert.ok(namespace, 'can\'t delete nonexistent namespace! "' + name + '"');
  assert.ok(namespace.id, 'don\'t assign to process.namespaces directly! ' + util.inspect(namespace));

  process.namespaces[name] = null;
}

function reset() {
  // must unregister async listeners
  if (process.namespaces) {
    Object.keys(process.namespaces).forEach(function (name) {
      destroyNamespace(name);
    });
  }
  process.namespaces = Object.create(null);
}

process.namespaces = {};

if (asyncHook._state && !asyncHook._state.enabled) {
  asyncHook.enable();
}

function debug2(msg) {
  if (process.env.DEBUG) {
    process._rawDebug(msg);
  }
}


/*function debug(from, ns) {
 process._rawDebug('DEBUG: ' + util.inspect({
 from: from,
 currentUid: currentUid,
 context: ns ? ns._contexts.get(currentUid) : 'no ns'
 }, true, 2, true));
 }*/


function getFunctionName(fn) {
  if (!fn) {
    return fn;
  }
  if (typeof fn === 'function') {
    if (fn.name) {
      return fn.name;
    }
    return (fn.toString().trim().match(/^function\s*([^\s(]+)/) || [])[1];
  } else if (fn.constructor && fn.constructor.name) {
    return fn.constructor.name;
  }
}


// Add back to callstack
if (DEBUG_CLS_HOOKED) {
  var stackChain = __webpack_require__(9738);
  for (var modifier in stackChain.filter._modifiers) {
    stackChain.filter.deattach(modifier);
  }
}


/***/ }),

/***/ 8426:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* eslint-disable max-len */


const util = __webpack_require__(1669);
const assert = __webpack_require__(2357);
const wrapEmitter = __webpack_require__(6174);
const async_hooks = __webpack_require__(7303);

const CONTEXTS_SYMBOL = 'cls@contexts';
const ERROR_SYMBOL = 'error@context';

const DEBUG_CLS_HOOKED = process.env.DEBUG_CLS_HOOKED;

let currentUid = -1;

module.exports = {
  getNamespace: getNamespace,
  createNamespace: createNamespace,
  destroyNamespace: destroyNamespace,
  reset: reset,
  ERROR_SYMBOL: ERROR_SYMBOL
};

function Namespace(name) {
  this.name = name;
  // changed in 2.7: no default context
  this.active = null;
  this._set = [];
  this.id = null;
  this._contexts = new Map();
  this._indent = 0;
}

Namespace.prototype.set = function set(key, value) {
  if (!this.active) {
    throw new Error('No context available. ns.run() or ns.bind() must be called first.');
  }

  this.active[key] = value;

  if (DEBUG_CLS_HOOKED) {
    const indentStr = ' '.repeat(this._indent < 0 ? 0 : this._indent);
    debug2(indentStr + 'CONTEXT-SET KEY:' + key + '=' + value + ' in ns:' + this.name + ' currentUid:' + currentUid + ' active:' + util.inspect(this.active, {showHidden:true, depth:2, colors:true}));
  }

  return value;
};

Namespace.prototype.get = function get(key) {
  if (!this.active) {
    if (DEBUG_CLS_HOOKED) {
      const asyncHooksCurrentId = async_hooks.currentId();
      const triggerId = async_hooks.triggerAsyncId();
      const indentStr = ' '.repeat(this._indent < 0 ? 0 : this._indent);
      //debug2(indentStr + 'CONTEXT-GETTING KEY NO ACTIVE NS:' + key + '=undefined' + ' (' + this.name + ') currentUid:' + currentUid + ' active:' + util.inspect(this.active, {showHidden:true, depth:2, colors:true}));
      debug2(`${indentStr}CONTEXT-GETTING KEY NO ACTIVE NS: (${this.name}) ${key}=undefined currentUid:${currentUid} asyncHooksCurrentId:${asyncHooksCurrentId} triggerId:${triggerId} len:${this._set.length}`);
    }
    return undefined;
  }
  if (DEBUG_CLS_HOOKED) {
    const asyncHooksCurrentId = async_hooks.executionAsyncId();
    const triggerId = async_hooks.triggerAsyncId();
    const indentStr = ' '.repeat(this._indent < 0 ? 0 : this._indent);
    debug2(indentStr + 'CONTEXT-GETTING KEY:' + key + '=' + this.active[key] + ' (' + this.name + ') currentUid:' + currentUid + ' active:' + util.inspect(this.active, {showHidden:true, depth:2, colors:true}));
    debug2(`${indentStr}CONTEXT-GETTING KEY: (${this.name}) ${key}=${this.active[key]} currentUid:${currentUid} asyncHooksCurrentId:${asyncHooksCurrentId} triggerId:${triggerId} len:${this._set.length} active:${util.inspect(this.active)}`);
  }
  return this.active[key];
};

Namespace.prototype.createContext = function createContext() {
  // Prototype inherit existing context if created a new child context within existing context.
  let context = Object.create(this.active ? this.active : Object.prototype);
  context._ns_name = this.name;
  context.id = currentUid;

  if (DEBUG_CLS_HOOKED) {
    const asyncHooksCurrentId = async_hooks.executionAsyncId();
    const triggerId = async_hooks.triggerAsyncId();
    const indentStr = ' '.repeat(this._indent < 0 ? 0 : this._indent);
    debug2(`${indentStr}CONTEXT-CREATED Context: (${this.name}) currentUid:${currentUid} asyncHooksCurrentId:${asyncHooksCurrentId} triggerId:${triggerId} len:${this._set.length} context:${util.inspect(context, {showHidden:true, depth:2, colors:true})}`);
  }

  return context;
};

Namespace.prototype.run = function run(fn) {
  let context = this.createContext();
  this.enter(context);

  try {
    if (DEBUG_CLS_HOOKED) {
      const triggerId = async_hooks.triggerAsyncId();
      const asyncHooksCurrentId = async_hooks.executionAsyncId();
      const indentStr = ' '.repeat(this._indent < 0 ? 0 : this._indent);
      debug2(`${indentStr}CONTEXT-RUN BEGIN: (${this.name}) currentUid:${currentUid} triggerId:${triggerId} asyncHooksCurrentId:${asyncHooksCurrentId} len:${this._set.length} context:${util.inspect(context)}`);
    }
    fn(context);
    return context;
  } catch (exception) {
    if (exception) {
      exception[ERROR_SYMBOL] = context;
    }
    throw exception;
  } finally {
    if (DEBUG_CLS_HOOKED) {
      const triggerId = async_hooks.triggerAsyncId();
      const asyncHooksCurrentId = async_hooks.executionAsyncId();
      const indentStr = ' '.repeat(this._indent < 0 ? 0 : this._indent);
      debug2(`${indentStr}CONTEXT-RUN END: (${this.name}) currentUid:${currentUid} triggerId:${triggerId} asyncHooksCurrentId:${asyncHooksCurrentId} len:${this._set.length} ${util.inspect(context)}`);
    }
    this.exit(context);
  }
};

Namespace.prototype.runAndReturn = function runAndReturn(fn) {
  let value;
  this.run(function (context) {
    value = fn(context);
  });
  return value;
};

/**
 * Uses global Promise and assumes Promise is cls friendly or wrapped already.
 * @param {function} fn
 * @returns {*}
 */
Namespace.prototype.runPromise = function runPromise(fn) {
  let context = this.createContext();
  this.enter(context);

  let promise = fn(context);
  if (!promise || !promise.then || !promise.catch) {
    throw new Error('fn must return a promise.');
  }

  if (DEBUG_CLS_HOOKED) {
    debug2('CONTEXT-runPromise BEFORE: (' + this.name + ') currentUid:' + currentUid + ' len:' + this._set.length + ' ' + util.inspect(context));
  }

  return promise
    .then(result => {
      if (DEBUG_CLS_HOOKED) {
        debug2('CONTEXT-runPromise AFTER then: (' + this.name + ') currentUid:' + currentUid + ' len:' + this._set.length + ' ' + util.inspect(context));
      }
      this.exit(context);
      return result;
    })
    .catch(err => {
      err[ERROR_SYMBOL] = context;
      if (DEBUG_CLS_HOOKED) {
        debug2('CONTEXT-runPromise AFTER catch: (' + this.name + ') currentUid:' + currentUid + ' len:' + this._set.length + ' ' + util.inspect(context));
      }
      this.exit(context);
      throw err;
    });
};

Namespace.prototype.bind = function bindFactory(fn, context) {
  if (!context) {
    if (!this.active) {
      context = this.createContext();
    } else {
      context = this.active;
    }
  }

  let self = this;
  return function clsBind() {
    self.enter(context);
    try {
      return fn.apply(this, arguments);
    } catch (exception) {
      if (exception) {
        exception[ERROR_SYMBOL] = context;
      }
      throw exception;
    } finally {
      self.exit(context);
    }
  };
};

Namespace.prototype.enter = function enter(context) {
  assert.ok(context, 'context must be provided for entering');
  if (DEBUG_CLS_HOOKED) {
    const asyncHooksCurrentId = async_hooks.executionAsyncId();
    const triggerId = async_hooks.triggerAsyncId();
    const indentStr = ' '.repeat(this._indent < 0 ? 0 : this._indent);
    debug2(`${indentStr}CONTEXT-ENTER: (${this.name}) currentUid:${currentUid} triggerId:${triggerId} asyncHooksCurrentId:${asyncHooksCurrentId} len:${this._set.length} ${util.inspect(context)}`);
  }

  this._set.push(this.active);
  this.active = context;
};

Namespace.prototype.exit = function exit(context) {
  assert.ok(context, 'context must be provided for exiting');
  if (DEBUG_CLS_HOOKED) {
    const asyncHooksCurrentId = async_hooks.executionAsyncId();
    const triggerId = async_hooks.triggerAsyncId();
    const indentStr = ' '.repeat(this._indent < 0 ? 0 : this._indent);
    debug2(`${indentStr}CONTEXT-EXIT: (${this.name}) currentUid:${currentUid} triggerId:${triggerId} asyncHooksCurrentId:${asyncHooksCurrentId} len:${this._set.length} ${util.inspect(context)}`);
  }

  // Fast path for most exits that are at the top of the stack
  if (this.active === context) {
    assert.ok(this._set.length, 'can\'t remove top context');
    this.active = this._set.pop();
    return;
  }

  // Fast search in the stack using lastIndexOf
  let index = this._set.lastIndexOf(context);

  if (index < 0) {
    if (DEBUG_CLS_HOOKED) {
      debug2('??ERROR?? context exiting but not entered - ignoring: ' + util.inspect(context));
    }
    assert.ok(index >= 0, 'context not currently entered; can\'t exit. \n' + util.inspect(this) + '\n' + util.inspect(context));
  } else {
    assert.ok(index, 'can\'t remove top context');
    this._set.splice(index, 1);
  }
};

Namespace.prototype.bindEmitter = function bindEmitter(emitter) {
  assert.ok(emitter.on && emitter.addListener && emitter.emit, 'can only bind real EEs');

  let namespace = this;
  let thisSymbol = 'context@' + this.name;

  // Capture the context active at the time the emitter is bound.
  function attach(listener) {
    if (!listener) {
      return;
    }
    if (!listener[CONTEXTS_SYMBOL]) {
      listener[CONTEXTS_SYMBOL] = Object.create(null);
    }

    listener[CONTEXTS_SYMBOL][thisSymbol] = {
      namespace: namespace,
      context: namespace.active
    };
  }

  // At emit time, bind the listener within the correct context.
  function bind(unwrapped) {
    if (!(unwrapped && unwrapped[CONTEXTS_SYMBOL])) {
      return unwrapped;
    }

    let wrapped = unwrapped;
    let unwrappedContexts = unwrapped[CONTEXTS_SYMBOL];
    Object.keys(unwrappedContexts).forEach(function (name) {
      let thunk = unwrappedContexts[name];
      wrapped = thunk.namespace.bind(wrapped, thunk.context);
    });
    return wrapped;
  }

  wrapEmitter(emitter, attach, bind);
};

/**
 * If an error comes out of a namespace, it will have a context attached to it.
 * This function knows how to find it.
 *
 * @param {Error} exception Possibly annotated error.
 */
Namespace.prototype.fromException = function fromException(exception) {
  return exception[ERROR_SYMBOL];
};

function getNamespace(name) {
  return process.namespaces[name];
}

function createNamespace(name) {
  assert.ok(name, 'namespace must be given a name.');

  if (DEBUG_CLS_HOOKED) {
    debug2(`NS-CREATING NAMESPACE (${name})`);
  }
  let namespace = new Namespace(name);
  namespace.id = currentUid;

  const hook = async_hooks.createHook({
    init(asyncId, type, triggerId, resource) {
      currentUid = async_hooks.executionAsyncId();

      //CHAIN Parent's Context onto child if none exists. This is needed to pass net-events.spec
      // let initContext = namespace.active;
      // if(!initContext && triggerId) {
      //   let parentContext = namespace._contexts.get(triggerId);
      //   if (parentContext) {
      //     namespace.active = parentContext;
      //     namespace._contexts.set(currentUid, parentContext);
      //     if (DEBUG_CLS_HOOKED) {
      //       const indentStr = ' '.repeat(namespace._indent < 0 ? 0 : namespace._indent);
      //       debug2(`${indentStr}INIT [${type}] (${name}) WITH PARENT CONTEXT asyncId:${asyncId} currentUid:${currentUid} triggerId:${triggerId} active:${util.inspect(namespace.active, true)} resource:${resource}`);
      //     }
      //   } else if (DEBUG_CLS_HOOKED) {
      //       const indentStr = ' '.repeat(namespace._indent < 0 ? 0 : namespace._indent);
      //       debug2(`${indentStr}INIT [${type}] (${name}) MISSING CONTEXT asyncId:${asyncId} currentUid:${currentUid} triggerId:${triggerId} active:${util.inspect(namespace.active, true)} resource:${resource}`);
      //     }
      // }else {
      //   namespace._contexts.set(currentUid, namespace.active);
      //   if (DEBUG_CLS_HOOKED) {
      //     const indentStr = ' '.repeat(namespace._indent < 0 ? 0 : namespace._indent);
      //     debug2(`${indentStr}INIT [${type}] (${name}) asyncId:${asyncId} currentUid:${currentUid} triggerId:${triggerId} active:${util.inspect(namespace.active, true)} resource:${resource}`);
      //   }
      // }
      if(namespace.active) {
        namespace._contexts.set(asyncId, namespace.active);

        if (DEBUG_CLS_HOOKED) {
          const indentStr = ' '.repeat(namespace._indent < 0 ? 0 : namespace._indent);
          debug2(`${indentStr}INIT [${type}] (${name}) asyncId:${asyncId} currentUid:${currentUid} triggerId:${triggerId} active:${util.inspect(namespace.active, {showHidden:true, depth:2, colors:true})} resource:${resource}`);
        }
      }else if(currentUid === 0){
        // CurrentId will be 0 when triggered from C++. Promise events
        // https://github.com/nodejs/node/blob/master/doc/api/async_hooks.md#triggerid
        const triggerId = async_hooks.triggerAsyncId();
        const triggerIdContext = namespace._contexts.get(triggerId);
        if (triggerIdContext) {
          namespace._contexts.set(asyncId, triggerIdContext);
          if (DEBUG_CLS_HOOKED) {
            const indentStr = ' '.repeat(namespace._indent < 0 ? 0 : namespace._indent);
            debug2(`${indentStr}INIT USING CONTEXT FROM TRIGGERID [${type}] (${name}) asyncId:${asyncId} currentUid:${currentUid} triggerId:${triggerId} active:${util.inspect(namespace.active, { showHidden: true, depth: 2, colors: true })} resource:${resource}`);
          }
        } else if (DEBUG_CLS_HOOKED) {
          const indentStr = ' '.repeat(namespace._indent < 0 ? 0 : namespace._indent);
          debug2(`${indentStr}INIT MISSING CONTEXT [${type}] (${name}) asyncId:${asyncId} currentUid:${currentUid} triggerId:${triggerId} active:${util.inspect(namespace.active, { showHidden: true, depth: 2, colors: true })} resource:${resource}`);
        }
      }


      if(DEBUG_CLS_HOOKED && type === 'PROMISE'){
        debug2(util.inspect(resource, {showHidden: true}));
        const parentId = resource.parentId;
        const indentStr = ' '.repeat(namespace._indent < 0 ? 0 : namespace._indent);
        debug2(`${indentStr}INIT RESOURCE-PROMISE [${type}] (${name}) parentId:${parentId} asyncId:${asyncId} currentUid:${currentUid} triggerId:${triggerId} active:${util.inspect(namespace.active, {showHidden:true, depth:2, colors:true})} resource:${resource}`);
      }

    },
    before(asyncId) {
      currentUid = async_hooks.executionAsyncId();
      let context;

      /*
      if(currentUid === 0){
        // CurrentId will be 0 when triggered from C++. Promise events
        // https://github.com/nodejs/node/blob/master/doc/api/async_hooks.md#triggerid
        //const triggerId = async_hooks.triggerAsyncId();
        context = namespace._contexts.get(asyncId); // || namespace._contexts.get(triggerId);
      }else{
        context = namespace._contexts.get(currentUid);
      }
      */

      //HACK to work with promises until they are fixed in node > 8.1.1
      context = namespace._contexts.get(asyncId) || namespace._contexts.get(currentUid);

      if (context) {
        if (DEBUG_CLS_HOOKED) {
          const triggerId = async_hooks.triggerAsyncId();
          const indentStr = ' '.repeat(namespace._indent < 0 ? 0 : namespace._indent);
          debug2(`${indentStr}BEFORE (${name}) asyncId:${asyncId} currentUid:${currentUid} triggerId:${triggerId} active:${util.inspect(namespace.active, {showHidden:true, depth:2, colors:true})} context:${util.inspect(context)}`);
          namespace._indent += 2;
        }

        namespace.enter(context);

      } else if (DEBUG_CLS_HOOKED) {
        const triggerId = async_hooks.triggerAsyncId();
        const indentStr = ' '.repeat(namespace._indent < 0 ? 0 : namespace._indent);
        debug2(`${indentStr}BEFORE MISSING CONTEXT (${name}) asyncId:${asyncId} currentUid:${currentUid} triggerId:${triggerId} active:${util.inspect(namespace.active, {showHidden:true, depth:2, colors:true})} namespace._contexts:${util.inspect(namespace._contexts, {showHidden:true, depth:2, colors:true})}`);
        namespace._indent += 2;
      }
    },
    after(asyncId) {
      currentUid = async_hooks.executionAsyncId();
      let context; // = namespace._contexts.get(currentUid);
      /*
      if(currentUid === 0){
        // CurrentId will be 0 when triggered from C++. Promise events
        // https://github.com/nodejs/node/blob/master/doc/api/async_hooks.md#triggerid
        //const triggerId = async_hooks.triggerAsyncId();
        context = namespace._contexts.get(asyncId); // || namespace._contexts.get(triggerId);
      }else{
        context = namespace._contexts.get(currentUid);
      }
      */
      //HACK to work with promises until they are fixed in node > 8.1.1
      context = namespace._contexts.get(asyncId) || namespace._contexts.get(currentUid);

      if (context) {
        if (DEBUG_CLS_HOOKED) {
          const triggerId = async_hooks.triggerAsyncId();
          namespace._indent -= 2;
          const indentStr = ' '.repeat(namespace._indent < 0 ? 0 : namespace._indent);
          debug2(`${indentStr}AFTER (${name}) asyncId:${asyncId} currentUid:${currentUid} triggerId:${triggerId} active:${util.inspect(namespace.active, {showHidden:true, depth:2, colors:true})} context:${util.inspect(context)}`);
        }

        namespace.exit(context);

      } else if (DEBUG_CLS_HOOKED) {
        const triggerId = async_hooks.triggerAsyncId();
        namespace._indent -= 2;
        const indentStr = ' '.repeat(namespace._indent < 0 ? 0 : namespace._indent);
        debug2(`${indentStr}AFTER MISSING CONTEXT (${name}) asyncId:${asyncId} currentUid:${currentUid} triggerId:${triggerId} active:${util.inspect(namespace.active, {showHidden:true, depth:2, colors:true})} context:${util.inspect(context)}`);
      }
    },
    destroy(asyncId) {
      currentUid = async_hooks.executionAsyncId();
      if (DEBUG_CLS_HOOKED) {
        const triggerId = async_hooks.triggerAsyncId();
        const indentStr = ' '.repeat(namespace._indent < 0 ? 0 : namespace._indent);
        debug2(`${indentStr}DESTROY (${name}) currentUid:${currentUid} asyncId:${asyncId} triggerId:${triggerId} active:${util.inspect(namespace.active, {showHidden:true, depth:2, colors:true})} context:${util.inspect(namespace._contexts.get(currentUid))}`);
      }

      namespace._contexts.delete(asyncId);
    }
  });

  hook.enable();

  process.namespaces[name] = namespace;
  return namespace;
}

function destroyNamespace(name) {
  let namespace = getNamespace(name);

  assert.ok(namespace, 'can\'t delete nonexistent namespace! "' + name + '"');
  assert.ok(namespace.id, 'don\'t assign to process.namespaces directly! ' + util.inspect(namespace));

  process.namespaces[name] = null;
}

function reset() {
  // must unregister async listeners
  if (process.namespaces) {
    Object.keys(process.namespaces).forEach(function (name) {
      destroyNamespace(name);
    });
  }
  process.namespaces = Object.create(null);
}

process.namespaces = {};

//const fs = require('fs');
function debug2(...args) {
  if (DEBUG_CLS_HOOKED) {
    //fs.writeSync(1, `${util.format(...args)}\n`);
    process._rawDebug(`${util.format(...args)}`);
  }
}

/*function getFunctionName(fn) {
  if (!fn) {
    return fn;
  }
  if (typeof fn === 'function') {
    if (fn.name) {
      return fn.name;
    }
    return (fn.toString().trim().match(/^function\s*([^\s(]+)/) || [])[1];
  } else if (fn.constructor && fn.constructor.name) {
    return fn.constructor.name;
  }
}*/




/***/ }),

/***/ 8509:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const semver = __webpack_require__(2838);

/**
 * In order to increase node version support, this loads the version of context
 * that is appropriate for the version of on nodejs that is running.
 * Node < v8 - uses AsyncWrap and async-hooks-jl
 * Node >= v8 - uses native async-hooks
 */
if(process && semver.gte(process.versions.node, '8.0.0')){
  module.exports = __webpack_require__(8426);
}else{
  module.exports = __webpack_require__(8309);
}


/***/ }),

/***/ 2838:
/***/ ((module, exports) => {

exports = module.exports = SemVer

var debug
/* istanbul ignore next */
if (typeof process === 'object' &&
    process.env &&
    process.env.NODE_DEBUG &&
    /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
  debug = function () {
    var args = Array.prototype.slice.call(arguments, 0)
    args.unshift('SEMVER')
    console.log.apply(console, args)
  }
} else {
  debug = function () {}
}

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
exports.SEMVER_SPEC_VERSION = '2.0.0'

var MAX_LENGTH = 256
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
  /* istanbul ignore next */ 9007199254740991

// Max safe segment length for coercion.
var MAX_SAFE_COMPONENT_LENGTH = 16

// The actual regexps go on exports.re
var re = exports.re = []
var src = exports.src = []
var R = 0

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

var NUMERICIDENTIFIER = R++
src[NUMERICIDENTIFIER] = '0|[1-9]\\d*'
var NUMERICIDENTIFIERLOOSE = R++
src[NUMERICIDENTIFIERLOOSE] = '[0-9]+'

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

var NONNUMERICIDENTIFIER = R++
src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*'

// ## Main Version
// Three dot-separated numeric identifiers.

var MAINVERSION = R++
src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')'

var MAINVERSIONLOOSE = R++
src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')'

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

var PRERELEASEIDENTIFIER = R++
src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +
                            '|' + src[NONNUMERICIDENTIFIER] + ')'

var PRERELEASEIDENTIFIERLOOSE = R++
src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +
                                 '|' + src[NONNUMERICIDENTIFIER] + ')'

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

var PRERELEASE = R++
src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +
                  '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))'

var PRERELEASELOOSE = R++
src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +
                       '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))'

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

var BUILDIDENTIFIER = R++
src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+'

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

var BUILD = R++
src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +
             '(?:\\.' + src[BUILDIDENTIFIER] + ')*))'

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

var FULL = R++
var FULLPLAIN = 'v?' + src[MAINVERSION] +
                src[PRERELEASE] + '?' +
                src[BUILD] + '?'

src[FULL] = '^' + FULLPLAIN + '$'

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +
                 src[PRERELEASELOOSE] + '?' +
                 src[BUILD] + '?'

var LOOSE = R++
src[LOOSE] = '^' + LOOSEPLAIN + '$'

var GTLT = R++
src[GTLT] = '((?:<|>)?=?)'

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
var XRANGEIDENTIFIERLOOSE = R++
src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*'
var XRANGEIDENTIFIER = R++
src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*'

var XRANGEPLAIN = R++
src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:' + src[PRERELEASE] + ')?' +
                   src[BUILD] + '?' +
                   ')?)?'

var XRANGEPLAINLOOSE = R++
src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:' + src[PRERELEASELOOSE] + ')?' +
                        src[BUILD] + '?' +
                        ')?)?'

var XRANGE = R++
src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$'
var XRANGELOOSE = R++
src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$'

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
var COERCE = R++
src[COERCE] = '(?:^|[^\\d])' +
              '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:$|[^\\d])'

// Tilde ranges.
// Meaning is "reasonably at or greater than"
var LONETILDE = R++
src[LONETILDE] = '(?:~>?)'

var TILDETRIM = R++
src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+'
re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g')
var tildeTrimReplace = '$1~'

var TILDE = R++
src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$'
var TILDELOOSE = R++
src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$'

// Caret ranges.
// Meaning is "at least and backwards compatible with"
var LONECARET = R++
src[LONECARET] = '(?:\\^)'

var CARETTRIM = R++
src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+'
re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g')
var caretTrimReplace = '$1^'

var CARET = R++
src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$'
var CARETLOOSE = R++
src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$'

// A simple gt/lt/eq thing, or just "" to indicate "any version"
var COMPARATORLOOSE = R++
src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$'
var COMPARATOR = R++
src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$'

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
var COMPARATORTRIM = R++
src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +
                      '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')'

// this one has to use the /g flag
re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g')
var comparatorTrimReplace = '$1$2$3'

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
var HYPHENRANGE = R++
src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +
                   '\\s+-\\s+' +
                   '(' + src[XRANGEPLAIN] + ')' +
                   '\\s*$'

var HYPHENRANGELOOSE = R++
src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s+-\\s+' +
                        '(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s*$'

// Star ranges basically just allow anything at all.
var STAR = R++
src[STAR] = '(<|>)?=?\\s*\\*'

// Compile to actual regexp objects.
// All are flag-free, unless they were created above with a flag.
for (var i = 0; i < R; i++) {
  debug(i, src[i])
  if (!re[i]) {
    re[i] = new RegExp(src[i])
  }
}

exports.parse = parse
function parse (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  if (version.length > MAX_LENGTH) {
    return null
  }

  var r = options.loose ? re[LOOSE] : re[FULL]
  if (!r.test(version)) {
    return null
  }

  try {
    return new SemVer(version, options)
  } catch (er) {
    return null
  }
}

exports.valid = valid
function valid (version, options) {
  var v = parse(version, options)
  return v ? v.version : null
}

exports.clean = clean
function clean (version, options) {
  var s = parse(version.trim().replace(/^[=v]+/, ''), options)
  return s ? s.version : null
}

exports.SemVer = SemVer

function SemVer (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }
  if (version instanceof SemVer) {
    if (version.loose === options.loose) {
      return version
    } else {
      version = version.version
    }
  } else if (typeof version !== 'string') {
    throw new TypeError('Invalid Version: ' + version)
  }

  if (version.length > MAX_LENGTH) {
    throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')
  }

  if (!(this instanceof SemVer)) {
    return new SemVer(version, options)
  }

  debug('SemVer', version, options)
  this.options = options
  this.loose = !!options.loose

  var m = version.trim().match(options.loose ? re[LOOSE] : re[FULL])

  if (!m) {
    throw new TypeError('Invalid Version: ' + version)
  }

  this.raw = version

  // these are actually numbers
  this.major = +m[1]
  this.minor = +m[2]
  this.patch = +m[3]

  if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
    throw new TypeError('Invalid major version')
  }

  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
    throw new TypeError('Invalid minor version')
  }

  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
    throw new TypeError('Invalid patch version')
  }

  // numberify any prerelease numeric ids
  if (!m[4]) {
    this.prerelease = []
  } else {
    this.prerelease = m[4].split('.').map(function (id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id
        if (num >= 0 && num < MAX_SAFE_INTEGER) {
          return num
        }
      }
      return id
    })
  }

  this.build = m[5] ? m[5].split('.') : []
  this.format()
}

SemVer.prototype.format = function () {
  this.version = this.major + '.' + this.minor + '.' + this.patch
  if (this.prerelease.length) {
    this.version += '-' + this.prerelease.join('.')
  }
  return this.version
}

SemVer.prototype.toString = function () {
  return this.version
}

SemVer.prototype.compare = function (other) {
  debug('SemVer.compare', this.version, this.options, other)
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return this.compareMain(other) || this.comparePre(other)
}

SemVer.prototype.compareMain = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return compareIdentifiers(this.major, other.major) ||
         compareIdentifiers(this.minor, other.minor) ||
         compareIdentifiers(this.patch, other.patch)
}

SemVer.prototype.comparePre = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  // NOT having a prerelease is > having one
  if (this.prerelease.length && !other.prerelease.length) {
    return -1
  } else if (!this.prerelease.length && other.prerelease.length) {
    return 1
  } else if (!this.prerelease.length && !other.prerelease.length) {
    return 0
  }

  var i = 0
  do {
    var a = this.prerelease[i]
    var b = other.prerelease[i]
    debug('prerelease compare', i, a, b)
    if (a === undefined && b === undefined) {
      return 0
    } else if (b === undefined) {
      return 1
    } else if (a === undefined) {
      return -1
    } else if (a === b) {
      continue
    } else {
      return compareIdentifiers(a, b)
    }
  } while (++i)
}

// preminor will bump the version up to the next minor release, and immediately
// down to pre-release. premajor and prepatch work the same way.
SemVer.prototype.inc = function (release, identifier) {
  switch (release) {
    case 'premajor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor = 0
      this.major++
      this.inc('pre', identifier)
      break
    case 'preminor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor++
      this.inc('pre', identifier)
      break
    case 'prepatch':
      // If this is already a prerelease, it will bump to the next version
      // drop any prereleases that might already exist, since they are not
      // relevant at this point.
      this.prerelease.length = 0
      this.inc('patch', identifier)
      this.inc('pre', identifier)
      break
    // If the input is a non-prerelease version, this acts the same as
    // prepatch.
    case 'prerelease':
      if (this.prerelease.length === 0) {
        this.inc('patch', identifier)
      }
      this.inc('pre', identifier)
      break

    case 'major':
      // If this is a pre-major version, bump up to the same major version.
      // Otherwise increment major.
      // 1.0.0-5 bumps to 1.0.0
      // 1.1.0 bumps to 2.0.0
      if (this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0) {
        this.major++
      }
      this.minor = 0
      this.patch = 0
      this.prerelease = []
      break
    case 'minor':
      // If this is a pre-minor version, bump up to the same minor version.
      // Otherwise increment minor.
      // 1.2.0-5 bumps to 1.2.0
      // 1.2.1 bumps to 1.3.0
      if (this.patch !== 0 || this.prerelease.length === 0) {
        this.minor++
      }
      this.patch = 0
      this.prerelease = []
      break
    case 'patch':
      // If this is not a pre-release version, it will increment the patch.
      // If it is a pre-release it will bump up to the same patch version.
      // 1.2.0-5 patches to 1.2.0
      // 1.2.0 patches to 1.2.1
      if (this.prerelease.length === 0) {
        this.patch++
      }
      this.prerelease = []
      break
    // This probably shouldn't be used publicly.
    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
    case 'pre':
      if (this.prerelease.length === 0) {
        this.prerelease = [0]
      } else {
        var i = this.prerelease.length
        while (--i >= 0) {
          if (typeof this.prerelease[i] === 'number') {
            this.prerelease[i]++
            i = -2
          }
        }
        if (i === -1) {
          // didn't increment anything
          this.prerelease.push(0)
        }
      }
      if (identifier) {
        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
        if (this.prerelease[0] === identifier) {
          if (isNaN(this.prerelease[1])) {
            this.prerelease = [identifier, 0]
          }
        } else {
          this.prerelease = [identifier, 0]
        }
      }
      break

    default:
      throw new Error('invalid increment argument: ' + release)
  }
  this.format()
  this.raw = this.version
  return this
}

exports.inc = inc
function inc (version, release, loose, identifier) {
  if (typeof (loose) === 'string') {
    identifier = loose
    loose = undefined
  }

  try {
    return new SemVer(version, loose).inc(release, identifier).version
  } catch (er) {
    return null
  }
}

exports.diff = diff
function diff (version1, version2) {
  if (eq(version1, version2)) {
    return null
  } else {
    var v1 = parse(version1)
    var v2 = parse(version2)
    var prefix = ''
    if (v1.prerelease.length || v2.prerelease.length) {
      prefix = 'pre'
      var defaultResult = 'prerelease'
    }
    for (var key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return prefix + key
        }
      }
    }
    return defaultResult // may be undefined
  }
}

exports.compareIdentifiers = compareIdentifiers

var numeric = /^[0-9]+$/
function compareIdentifiers (a, b) {
  var anum = numeric.test(a)
  var bnum = numeric.test(b)

  if (anum && bnum) {
    a = +a
    b = +b
  }

  return a === b ? 0
    : (anum && !bnum) ? -1
    : (bnum && !anum) ? 1
    : a < b ? -1
    : 1
}

exports.rcompareIdentifiers = rcompareIdentifiers
function rcompareIdentifiers (a, b) {
  return compareIdentifiers(b, a)
}

exports.major = major
function major (a, loose) {
  return new SemVer(a, loose).major
}

exports.minor = minor
function minor (a, loose) {
  return new SemVer(a, loose).minor
}

exports.patch = patch
function patch (a, loose) {
  return new SemVer(a, loose).patch
}

exports.compare = compare
function compare (a, b, loose) {
  return new SemVer(a, loose).compare(new SemVer(b, loose))
}

exports.compareLoose = compareLoose
function compareLoose (a, b) {
  return compare(a, b, true)
}

exports.rcompare = rcompare
function rcompare (a, b, loose) {
  return compare(b, a, loose)
}

exports.sort = sort
function sort (list, loose) {
  return list.sort(function (a, b) {
    return exports.compare(a, b, loose)
  })
}

exports.rsort = rsort
function rsort (list, loose) {
  return list.sort(function (a, b) {
    return exports.rcompare(a, b, loose)
  })
}

exports.gt = gt
function gt (a, b, loose) {
  return compare(a, b, loose) > 0
}

exports.lt = lt
function lt (a, b, loose) {
  return compare(a, b, loose) < 0
}

exports.eq = eq
function eq (a, b, loose) {
  return compare(a, b, loose) === 0
}

exports.neq = neq
function neq (a, b, loose) {
  return compare(a, b, loose) !== 0
}

exports.gte = gte
function gte (a, b, loose) {
  return compare(a, b, loose) >= 0
}

exports.lte = lte
function lte (a, b, loose) {
  return compare(a, b, loose) <= 0
}

exports.cmp = cmp
function cmp (a, op, b, loose) {
  switch (op) {
    case '===':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a === b

    case '!==':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a !== b

    case '':
    case '=':
    case '==':
      return eq(a, b, loose)

    case '!=':
      return neq(a, b, loose)

    case '>':
      return gt(a, b, loose)

    case '>=':
      return gte(a, b, loose)

    case '<':
      return lt(a, b, loose)

    case '<=':
      return lte(a, b, loose)

    default:
      throw new TypeError('Invalid operator: ' + op)
  }
}

exports.Comparator = Comparator
function Comparator (comp, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (comp instanceof Comparator) {
    if (comp.loose === !!options.loose) {
      return comp
    } else {
      comp = comp.value
    }
  }

  if (!(this instanceof Comparator)) {
    return new Comparator(comp, options)
  }

  debug('comparator', comp, options)
  this.options = options
  this.loose = !!options.loose
  this.parse(comp)

  if (this.semver === ANY) {
    this.value = ''
  } else {
    this.value = this.operator + this.semver.version
  }

  debug('comp', this)
}

var ANY = {}
Comparator.prototype.parse = function (comp) {
  var r = this.options.loose ? re[COMPARATORLOOSE] : re[COMPARATOR]
  var m = comp.match(r)

  if (!m) {
    throw new TypeError('Invalid comparator: ' + comp)
  }

  this.operator = m[1]
  if (this.operator === '=') {
    this.operator = ''
  }

  // if it literally is just '>' or '' then allow anything.
  if (!m[2]) {
    this.semver = ANY
  } else {
    this.semver = new SemVer(m[2], this.options.loose)
  }
}

Comparator.prototype.toString = function () {
  return this.value
}

Comparator.prototype.test = function (version) {
  debug('Comparator.test', version, this.options.loose)

  if (this.semver === ANY) {
    return true
  }

  if (typeof version === 'string') {
    version = new SemVer(version, this.options)
  }

  return cmp(version, this.operator, this.semver, this.options)
}

Comparator.prototype.intersects = function (comp, options) {
  if (!(comp instanceof Comparator)) {
    throw new TypeError('a Comparator is required')
  }

  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  var rangeTmp

  if (this.operator === '') {
    rangeTmp = new Range(comp.value, options)
    return satisfies(this.value, rangeTmp, options)
  } else if (comp.operator === '') {
    rangeTmp = new Range(this.value, options)
    return satisfies(comp.semver, rangeTmp, options)
  }

  var sameDirectionIncreasing =
    (this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '>=' || comp.operator === '>')
  var sameDirectionDecreasing =
    (this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '<=' || comp.operator === '<')
  var sameSemVer = this.semver.version === comp.semver.version
  var differentDirectionsInclusive =
    (this.operator === '>=' || this.operator === '<=') &&
    (comp.operator === '>=' || comp.operator === '<=')
  var oppositeDirectionsLessThan =
    cmp(this.semver, '<', comp.semver, options) &&
    ((this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '<=' || comp.operator === '<'))
  var oppositeDirectionsGreaterThan =
    cmp(this.semver, '>', comp.semver, options) &&
    ((this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '>=' || comp.operator === '>'))

  return sameDirectionIncreasing || sameDirectionDecreasing ||
    (sameSemVer && differentDirectionsInclusive) ||
    oppositeDirectionsLessThan || oppositeDirectionsGreaterThan
}

exports.Range = Range
function Range (range, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (range instanceof Range) {
    if (range.loose === !!options.loose &&
        range.includePrerelease === !!options.includePrerelease) {
      return range
    } else {
      return new Range(range.raw, options)
    }
  }

  if (range instanceof Comparator) {
    return new Range(range.value, options)
  }

  if (!(this instanceof Range)) {
    return new Range(range, options)
  }

  this.options = options
  this.loose = !!options.loose
  this.includePrerelease = !!options.includePrerelease

  // First, split based on boolean or ||
  this.raw = range
  this.set = range.split(/\s*\|\|\s*/).map(function (range) {
    return this.parseRange(range.trim())
  }, this).filter(function (c) {
    // throw out any that are not relevant for whatever reason
    return c.length
  })

  if (!this.set.length) {
    throw new TypeError('Invalid SemVer Range: ' + range)
  }

  this.format()
}

Range.prototype.format = function () {
  this.range = this.set.map(function (comps) {
    return comps.join(' ').trim()
  }).join('||').trim()
  return this.range
}

Range.prototype.toString = function () {
  return this.range
}

Range.prototype.parseRange = function (range) {
  var loose = this.options.loose
  range = range.trim()
  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE]
  range = range.replace(hr, hyphenReplace)
  debug('hyphen replace', range)
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace)
  debug('comparator trim', range, re[COMPARATORTRIM])

  // `~ 1.2.3` => `~1.2.3`
  range = range.replace(re[TILDETRIM], tildeTrimReplace)

  // `^ 1.2.3` => `^1.2.3`
  range = range.replace(re[CARETTRIM], caretTrimReplace)

  // normalize spaces
  range = range.split(/\s+/).join(' ')

  // At this point, the range is completely trimmed and
  // ready to be split into comparators.

  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR]
  var set = range.split(' ').map(function (comp) {
    return parseComparator(comp, this.options)
  }, this).join(' ').split(/\s+/)
  if (this.options.loose) {
    // in loose mode, throw out any that are not valid comparators
    set = set.filter(function (comp) {
      return !!comp.match(compRe)
    })
  }
  set = set.map(function (comp) {
    return new Comparator(comp, this.options)
  }, this)

  return set
}

Range.prototype.intersects = function (range, options) {
  if (!(range instanceof Range)) {
    throw new TypeError('a Range is required')
  }

  return this.set.some(function (thisComparators) {
    return thisComparators.every(function (thisComparator) {
      return range.set.some(function (rangeComparators) {
        return rangeComparators.every(function (rangeComparator) {
          return thisComparator.intersects(rangeComparator, options)
        })
      })
    })
  })
}

// Mostly just for testing and legacy API reasons
exports.toComparators = toComparators
function toComparators (range, options) {
  return new Range(range, options).set.map(function (comp) {
    return comp.map(function (c) {
      return c.value
    }).join(' ').trim().split(' ')
  })
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
function parseComparator (comp, options) {
  debug('comp', comp, options)
  comp = replaceCarets(comp, options)
  debug('caret', comp)
  comp = replaceTildes(comp, options)
  debug('tildes', comp)
  comp = replaceXRanges(comp, options)
  debug('xrange', comp)
  comp = replaceStars(comp, options)
  debug('stars', comp)
  return comp
}

function isX (id) {
  return !id || id.toLowerCase() === 'x' || id === '*'
}

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
function replaceTildes (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceTilde(comp, options)
  }).join(' ')
}

function replaceTilde (comp, options) {
  var r = options.loose ? re[TILDELOOSE] : re[TILDE]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('tilde', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      // ~1.2 == >=1.2.0 <1.3.0
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
    } else if (pr) {
      debug('replaceTilde pr', pr)
      ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
            ' <' + M + '.' + (+m + 1) + '.0'
    } else {
      // ~1.2.3 == >=1.2.3 <1.3.0
      ret = '>=' + M + '.' + m + '.' + p +
            ' <' + M + '.' + (+m + 1) + '.0'
    }

    debug('tilde return', ret)
    return ret
  })
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
// ^1.2.3 --> >=1.2.3 <2.0.0
// ^1.2.0 --> >=1.2.0 <2.0.0
function replaceCarets (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceCaret(comp, options)
  }).join(' ')
}

function replaceCaret (comp, options) {
  debug('caret', comp, options)
  var r = options.loose ? re[CARETLOOSE] : re[CARET]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('caret', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      if (M === '0') {
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
      } else {
        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0'
      }
    } else if (pr) {
      debug('replaceCaret pr', pr)
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
              ' <' + (+M + 1) + '.0.0'
      }
    } else {
      debug('no pr')
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p +
              ' <' + (+M + 1) + '.0.0'
      }
    }

    debug('caret return', ret)
    return ret
  })
}

function replaceXRanges (comp, options) {
  debug('replaceXRanges', comp, options)
  return comp.split(/\s+/).map(function (comp) {
    return replaceXRange(comp, options)
  }).join(' ')
}

function replaceXRange (comp, options) {
  comp = comp.trim()
  var r = options.loose ? re[XRANGELOOSE] : re[XRANGE]
  return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
    debug('xRange', comp, ret, gtlt, M, m, p, pr)
    var xM = isX(M)
    var xm = xM || isX(m)
    var xp = xm || isX(p)
    var anyX = xp

    if (gtlt === '=' && anyX) {
      gtlt = ''
    }

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0'
      } else {
        // nothing is forbidden
        ret = '*'
      }
    } else if (gtlt && anyX) {
      // we know patch is an x, because we have any x at all.
      // replace X with 0
      if (xm) {
        m = 0
      }
      p = 0

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        // >1.2.3 => >= 1.2.4
        gtlt = '>='
        if (xm) {
          M = +M + 1
          m = 0
          p = 0
        } else {
          m = +m + 1
          p = 0
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<'
        if (xm) {
          M = +M + 1
        } else {
          m = +m + 1
        }
      }

      ret = gtlt + M + '.' + m + '.' + p
    } else if (xm) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (xp) {
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
    }

    debug('xRange return', ret)

    return ret
  })
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
function replaceStars (comp, options) {
  debug('replaceStars', comp, options)
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[STAR], '')
}

// This function is passed to string.replace(re[HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0
function hyphenReplace ($0,
  from, fM, fm, fp, fpr, fb,
  to, tM, tm, tp, tpr, tb) {
  if (isX(fM)) {
    from = ''
  } else if (isX(fm)) {
    from = '>=' + fM + '.0.0'
  } else if (isX(fp)) {
    from = '>=' + fM + '.' + fm + '.0'
  } else {
    from = '>=' + from
  }

  if (isX(tM)) {
    to = ''
  } else if (isX(tm)) {
    to = '<' + (+tM + 1) + '.0.0'
  } else if (isX(tp)) {
    to = '<' + tM + '.' + (+tm + 1) + '.0'
  } else if (tpr) {
    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr
  } else {
    to = '<=' + to
  }

  return (from + ' ' + to).trim()
}

// if ANY of the sets match ALL of its comparators, then pass
Range.prototype.test = function (version) {
  if (!version) {
    return false
  }

  if (typeof version === 'string') {
    version = new SemVer(version, this.options)
  }

  for (var i = 0; i < this.set.length; i++) {
    if (testSet(this.set[i], version, this.options)) {
      return true
    }
  }
  return false
}

function testSet (set, version, options) {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false
    }
  }

  if (version.prerelease.length && !options.includePrerelease) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (i = 0; i < set.length; i++) {
      debug(set[i].semver)
      if (set[i].semver === ANY) {
        continue
      }

      if (set[i].semver.prerelease.length > 0) {
        var allowed = set[i].semver
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch) {
          return true
        }
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false
  }

  return true
}

exports.satisfies = satisfies
function satisfies (version, range, options) {
  try {
    range = new Range(range, options)
  } catch (er) {
    return false
  }
  return range.test(version)
}

exports.maxSatisfying = maxSatisfying
function maxSatisfying (versions, range, options) {
  var max = null
  var maxSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!max || maxSV.compare(v) === -1) {
        // compare(max, v, true)
        max = v
        maxSV = new SemVer(max, options)
      }
    }
  })
  return max
}

exports.minSatisfying = minSatisfying
function minSatisfying (versions, range, options) {
  var min = null
  var minSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!min || minSV.compare(v) === 1) {
        // compare(min, v, true)
        min = v
        minSV = new SemVer(min, options)
      }
    }
  })
  return min
}

exports.minVersion = minVersion
function minVersion (range, loose) {
  range = new Range(range, loose)

  var minver = new SemVer('0.0.0')
  if (range.test(minver)) {
    return minver
  }

  minver = new SemVer('0.0.0-0')
  if (range.test(minver)) {
    return minver
  }

  minver = null
  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    comparators.forEach(function (comparator) {
      // Clone to avoid manipulating the comparator's semver object.
      var compver = new SemVer(comparator.semver.version)
      switch (comparator.operator) {
        case '>':
          if (compver.prerelease.length === 0) {
            compver.patch++
          } else {
            compver.prerelease.push(0)
          }
          compver.raw = compver.format()
          /* fallthrough */
        case '':
        case '>=':
          if (!minver || gt(minver, compver)) {
            minver = compver
          }
          break
        case '<':
        case '<=':
          /* Ignore maximum versions */
          break
        /* istanbul ignore next */
        default:
          throw new Error('Unexpected operation: ' + comparator.operator)
      }
    })
  }

  if (minver && range.test(minver)) {
    return minver
  }

  return null
}

exports.validRange = validRange
function validRange (range, options) {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, options).range || '*'
  } catch (er) {
    return null
  }
}

// Determine if version is less than all the versions possible in the range
exports.ltr = ltr
function ltr (version, range, options) {
  return outside(version, range, '<', options)
}

// Determine if version is greater than all the versions possible in the range.
exports.gtr = gtr
function gtr (version, range, options) {
  return outside(version, range, '>', options)
}

exports.outside = outside
function outside (version, range, hilo, options) {
  version = new SemVer(version, options)
  range = new Range(range, options)

  var gtfn, ltefn, ltfn, comp, ecomp
  switch (hilo) {
    case '>':
      gtfn = gt
      ltefn = lte
      ltfn = lt
      comp = '>'
      ecomp = '>='
      break
    case '<':
      gtfn = lt
      ltefn = gte
      ltfn = gt
      comp = '<'
      ecomp = '<='
      break
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"')
  }

  // If it satisifes the range it is not outside
  if (satisfies(version, range, options)) {
    return false
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    var high = null
    var low = null

    comparators.forEach(function (comparator) {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0')
      }
      high = high || comparator
      low = low || comparator
      if (gtfn(comparator.semver, high.semver, options)) {
        high = comparator
      } else if (ltfn(comparator.semver, low.semver, options)) {
        low = comparator
      }
    })

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false
    }
  }
  return true
}

exports.prerelease = prerelease
function prerelease (version, options) {
  var parsed = parse(version, options)
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
}

exports.intersects = intersects
function intersects (r1, r2, options) {
  r1 = new Range(r1, options)
  r2 = new Range(r2, options)
  return r1.intersects(r2)
}

exports.coerce = coerce
function coerce (version) {
  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  var match = version.match(re[COERCE])

  if (match == null) {
    return null
  }

  return parse(match[1] +
    '.' + (match[2] || '0') +
    '.' + (match[3] || '0'))
}


/***/ }),

/***/ 7415:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var assert      = __webpack_require__(2357);
var wrapEmitter = __webpack_require__(6174);

/*
 *
 * CONSTANTS
 *
 */
var CONTEXTS_SYMBOL = 'cls@contexts';
var ERROR_SYMBOL = 'error@context';

// load polyfill if native support is unavailable
if (!process.addAsyncListener) __webpack_require__(6380);

function Namespace(name) {
  this.name   = name;
  // changed in 2.7: no default context
  this.active = null;
  this._set   = [];
  this.id     = null;
}

Namespace.prototype.set = function (key, value) {
  if (!this.active) {
    throw new Error("No context available. ns.run() or ns.bind() must be called first.");
  }

  this.active[key] = value;
  return value;
};

Namespace.prototype.get = function (key) {
  if (!this.active) return undefined;

  return this.active[key];
};

Namespace.prototype.createContext = function () {
  return Object.create(this.active);
};

Namespace.prototype.run = function (fn) {
  var context = this.createContext();
  this.enter(context);
  try {
    fn(context);
    return context;
  }
  catch (exception) {
    if (exception) {
      exception[ERROR_SYMBOL] = context;
    }
    throw exception;
  }
  finally {
    this.exit(context);
  }
};

Namespace.prototype.runAndReturn = function (fn) {
  var value;
  this.run(function (context) {
    value = fn(context);
  });
  return value;
};

Namespace.prototype.bind = function (fn, context) {
  if (!context) {
    if (!this.active) {
      context = this.createContext();
    }
    else {
      context = this.active;
    }
  }

  var self = this;
  return function () {
    self.enter(context);
    try {
      return fn.apply(this, arguments);
    }
    catch (exception) {
      if (exception) {
        exception[ERROR_SYMBOL] = context;
      }
      throw exception;
    }
    finally {
      self.exit(context);
    }
  };
};

Namespace.prototype.enter = function (context) {
  assert.ok(context, "context must be provided for entering");

  this._set.push(this.active);
  this.active = context;
};

Namespace.prototype.exit = function (context) {
  assert.ok(context, "context must be provided for exiting");

  // Fast path for most exits that are at the top of the stack
  if (this.active === context) {
    assert.ok(this._set.length, "can't remove top context");
    this.active = this._set.pop();
    return;
  }

  // Fast search in the stack using lastIndexOf
  var index = this._set.lastIndexOf(context);

  assert.ok(index >= 0, "context not currently entered; can't exit");
  assert.ok(index,      "can't remove top context");

  this._set.splice(index, 1);
};

Namespace.prototype.bindEmitter = function (emitter) {
  assert.ok(emitter.on && emitter.addListener && emitter.emit, "can only bind real EEs");

  var namespace  = this;
  var thisSymbol = 'context@' + this.name;

  // Capture the context active at the time the emitter is bound.
  function attach(listener) {
    if (!listener) return;
    if (!listener[CONTEXTS_SYMBOL]) listener[CONTEXTS_SYMBOL] = Object.create(null);

    listener[CONTEXTS_SYMBOL][thisSymbol] = {
      namespace : namespace,
      context   : namespace.active
    };
  }

  // At emit time, bind the listener within the correct context.
  function bind(unwrapped) {
    if (!(unwrapped && unwrapped[CONTEXTS_SYMBOL])) return unwrapped;

    var wrapped  = unwrapped;
    var contexts = unwrapped[CONTEXTS_SYMBOL];
    Object.keys(contexts).forEach(function (name) {
      var thunk = contexts[name];
      wrapped = thunk.namespace.bind(wrapped, thunk.context);
    });
    return wrapped;
  }

  wrapEmitter(emitter, attach, bind);
};

/**
 * If an error comes out of a namespace, it will have a context attached to it.
 * This function knows how to find it.
 *
 * @param {Error} exception Possibly annotated error.
 */
Namespace.prototype.fromException = function (exception) {
  return exception[ERROR_SYMBOL];
};

function get(name) {
  return process.namespaces[name];
}

function create(name) {
  assert.ok(name, "namespace must be given a name!");

  var namespace = new Namespace(name);
  namespace.id = process.addAsyncListener({
    create : function () { return namespace.active; },
    before : function (context, storage) { if (storage) namespace.enter(storage); },
    after  : function (context, storage) { if (storage) namespace.exit(storage); },
    error  : function (storage) { if (storage) namespace.exit(storage); }
  });

  process.namespaces[name] = namespace;
  return namespace;
}

function destroy(name) {
  var namespace = get(name);

  assert.ok(namespace,    "can't delete nonexistent namespace!");
  assert.ok(namespace.id, "don't assign to process.namespaces directly!");

  process.removeAsyncListener(namespace.id);
  process.namespaces[name] = null;
}

function reset() {
  // must unregister async listeners
  if (process.namespaces) {
    Object.keys(process.namespaces).forEach(function (name) {
      destroy(name);
    });
  }
  process.namespaces = Object.create(null);
}
if (!process.namespaces) reset(); // call immediately to set up

module.exports = {
  getNamespace     : get,
  createNamespace  : create,
  destroyNamespace : destroy,
  reset            : reset
};


/***/ }),

/***/ 1938:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var diagnostic_channel_1 = __webpack_require__(7235);
exports.AzureMonitorSymbol = "Azure_Monitor_Tracer";
var isPatched = false;
/**
 * By default, @azure/core-tracing default tracer is a NoopTracer.
 * This patching changes the default tracer to a patched BasicTracer
 * which emits ended spans as diag-channel events.
 *
 * The @opentelemetry/tracing package must be installed to use these patches
 * https://www.npmjs.com/package/@opentelemetry/tracing
 * @param coreTracing
 */
var azureCoreTracingPatchFunction = function (coreTracing) {
    if (isPatched) {
        // tracer is already cached -- noop
        return coreTracing;
    }
    try {
        var tracing = __webpack_require__(4496);
        var opentelemetry = __webpack_require__(3445);
        var tracerConfig = diagnostic_channel_1.channel.spanContextPropagator
            ? { contextManager: diagnostic_channel_1.channel.spanContextPropagator }
            : undefined;
        new tracing.BasicTracerProvider().register(tracerConfig);
        var tracer_1 = opentelemetry.trace.getTracer("applicationinsights tracer");
        // Patch startSpan instead of using spanProcessor.onStart because parentSpan must be
        // set while the span is constructed
        var startSpanOriginal_1 = tracer_1.startSpan;
        tracer_1.startSpan = function (name, options) {
            // if no parent span was provided, apply the current context
            if (!options || !options.parent) {
                var parentOperation = tracer_1.getCurrentSpan();
                if (parentOperation && parentOperation.operation && parentOperation.operation.traceparent) {
                    options = __assign({}, options, { parent: {
                            traceId: parentOperation.operation.traceparent.traceId,
                            spanId: parentOperation.operation.traceparent.spanId,
                            traceFlags: 1,
                        } });
                }
            }
            var span = startSpanOriginal_1.call(this, name, options);
            var originalEnd = span.end;
            span.end = function () {
                var result = originalEnd.apply(this, arguments);
                diagnostic_channel_1.channel.publish("azure-coretracing", span);
                return result;
            };
            return span;
        };
        tracer_1[exports.AzureMonitorSymbol] = true;
        coreTracing.setTracer(tracer_1); // recordSpanData is not present on BasicTracer - cast to any
        isPatched = true;
    }
    catch (e) { /* squash errors */ }
    return coreTracing;
};
exports.azureCoreTracing = {
    versionSpecifier: ">= 1.0.0 < 2.0.0",
    patch: azureCoreTracingPatchFunction,
};
function enable() {
    diagnostic_channel_1.channel.registerMonkeyPatch("@azure/core-tracing", exports.azureCoreTracing);
}
exports.enable = enable;
//# sourceMappingURL=azure-coretracing.pub.js.map

/***/ }),

/***/ 8981:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
var diagnostic_channel_1 = __webpack_require__(7235);
var bunyanPatchFunction = function (originalBunyan) {
    var originalEmit = originalBunyan.prototype._emit;
    originalBunyan.prototype._emit = function (rec, noemit) {
        var ret = originalEmit.apply(this, arguments);
        if (!noemit) {
            var str = ret;
            if (!str) {
                str = originalEmit.call(this, rec, true);
            }
            diagnostic_channel_1.channel.publish("bunyan", { level: rec.level, result: str });
        }
        return ret;
    };
    return originalBunyan;
};
exports.bunyan = {
    versionSpecifier: ">= 1.0.0 < 2.0.0",
    patch: bunyanPatchFunction,
};
function enable() {
    diagnostic_channel_1.channel.registerMonkeyPatch("bunyan", exports.bunyan);
}
exports.enable = enable;
//# sourceMappingURL=bunyan.pub.js.map

/***/ }),

/***/ 9336:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
var diagnostic_channel_1 = __webpack_require__(7235);
var stream_1 = __webpack_require__(2413);
var consolePatchFunction = function (originalConsole) {
    var aiLoggingOutStream = new stream_1.Writable();
    var aiLoggingErrStream = new stream_1.Writable();
    // Default console is roughly equivalent to `new Console(process.stdout, process.stderr)`
    // We create a version which publishes to the channel and also to stdout/stderr
    aiLoggingOutStream.write = function (chunk) {
        if (!chunk) {
            return true;
        }
        var message = chunk.toString();
        diagnostic_channel_1.channel.publish("console", { message: message });
        return true;
    };
    aiLoggingErrStream.write = function (chunk) {
        if (!chunk) {
            return true;
        }
        var message = chunk.toString();
        diagnostic_channel_1.channel.publish("console", { message: message, stderr: true });
        return true;
    };
    var aiLoggingConsole = new originalConsole.Console(aiLoggingOutStream, aiLoggingErrStream);
    var consoleMethods = ["log", "info", "warn", "error", "dir", "time", "timeEnd", "trace", "assert"];
    var _loop_1 = function (method) {
        var originalMethod = originalConsole[method];
        if (originalMethod) {
            originalConsole[method] = function () {
                if (aiLoggingConsole[method]) {
                    try {
                        aiLoggingConsole[method].apply(aiLoggingConsole, arguments);
                    }
                    catch (e) {
                        // Ignore errors; allow the original method to throw if necessary
                    }
                }
                return originalMethod.apply(originalConsole, arguments);
            };
        }
    };
    for (var _i = 0, consoleMethods_1 = consoleMethods; _i < consoleMethods_1.length; _i++) {
        var method = consoleMethods_1[_i];
        _loop_1(method);
    }
    return originalConsole;
};
exports.console = {
    versionSpecifier: ">= 4.0.0",
    patch: consolePatchFunction,
};
function enable() {
    diagnostic_channel_1.channel.registerMonkeyPatch("console", exports.console);
    // Force patching of console
    /* tslint:disable-next-line:no-var-requires */
    __webpack_require__(7082);
}
exports.enable = enable;
//# sourceMappingURL=console.pub.js.map

/***/ }),

/***/ 6467:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
Object.defineProperty(exports, "__esModule", ({ value: true }));
var azuresdk = __webpack_require__(1938);
exports.azuresdk = azuresdk;
var bunyan = __webpack_require__(8981);
exports.bunyan = bunyan;
var consolePub = __webpack_require__(9336);
exports.console = consolePub;
var mongodbCore = __webpack_require__(8333);
exports.mongodbCore = mongodbCore;
var mongodb = __webpack_require__(6478);
exports.mongodb = mongodb;
var mysql = __webpack_require__(6801);
exports.mysql = mysql;
var pgPool = __webpack_require__(4542);
exports.pgPool = pgPool;
var pg = __webpack_require__(9289);
exports.pg = pg;
var redis = __webpack_require__(3402);
exports.redis = redis;
var tedious = __webpack_require__(5024);
exports.tedious = tedious;
var winston = __webpack_require__(6283);
exports.winston = winston;
function enable() {
    bunyan.enable();
    consolePub.enable();
    mongodbCore.enable();
    mongodb.enable();
    mysql.enable();
    pg.enable();
    pgPool.enable();
    redis.enable();
    winston.enable();
    azuresdk.enable();
    tedious.enable();
}
exports.enable = enable;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 8333:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
var diagnostic_channel_1 = __webpack_require__(7235);
var mongodbcorePatchFunction = function (originalMongoCore) {
    var originalConnect = originalMongoCore.Server.prototype.connect;
    originalMongoCore.Server.prototype.connect = function contextPreservingConnect() {
        var ret = originalConnect.apply(this, arguments);
        // Messages sent to mongo progress through a pool
        // This can result in context getting mixed between different responses
        // so we wrap the callbacks to restore appropriate state
        var originalWrite = this.s.pool.write;
        this.s.pool.write = function contextPreservingWrite() {
            var cbidx = typeof arguments[1] === "function" ? 1 : 2;
            if (typeof arguments[cbidx] === "function") {
                arguments[cbidx] = diagnostic_channel_1.channel.bindToContext(arguments[cbidx]);
            }
            return originalWrite.apply(this, arguments);
        };
        // Logout is a special case, it doesn't call the write function but instead
        // directly calls into connection.write
        var originalLogout = this.s.pool.logout;
        this.s.pool.logout = function contextPreservingLogout() {
            if (typeof arguments[1] === "function") {
                arguments[1] = diagnostic_channel_1.channel.bindToContext(arguments[1]);
            }
            return originalLogout.apply(this, arguments);
        };
        return ret;
    };
    return originalMongoCore;
};
exports.mongoCore = {
    versionSpecifier: ">= 2.0.0 < 4.0.0",
    patch: mongodbcorePatchFunction,
};
function enable() {
    diagnostic_channel_1.channel.registerMonkeyPatch("mongodb-core", exports.mongoCore);
}
exports.enable = enable;
//# sourceMappingURL=mongodb-core.pub.js.map

/***/ }),

/***/ 6478:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
var diagnostic_channel_1 = __webpack_require__(7235);
var mongodbPatchFunction = function (originalMongo) {
    var listener = originalMongo.instrument({
        operationIdGenerator: {
            next: function () {
                return diagnostic_channel_1.channel.bindToContext(function (cb) { return cb(); });
            },
        },
    });
    var eventMap = {};
    listener.on("started", function (event) {
        if (eventMap[event.requestId]) {
            // Note: Mongo can generate 2 completely separate requests
            // which share the same requestId, if a certain race condition is triggered.
            // For now, we accept that this can happen and potentially miss or mislabel some events.
            return;
        }
        eventMap[event.requestId] = __assign({}, event, { time: new Date() });
    });
    listener.on("succeeded", function (event) {
        var startedData = eventMap[event.requestId];
        if (startedData) {
            delete eventMap[event.requestId];
        }
        if (typeof event.operationId === "function") {
            event.operationId(function () { return diagnostic_channel_1.channel.publish("mongodb", { startedData: startedData, event: event, succeeded: true }); });
        }
        else {
            // fallback -- correlation will not work here
            diagnostic_channel_1.channel.publish("mongodb", { startedData: startedData, event: event, succeeded: true });
        }
    });
    listener.on("failed", function (event) {
        var startedData = eventMap[event.requestId];
        if (startedData) {
            delete eventMap[event.requestId];
        }
        if (typeof event.operationId === "function") {
            event.operationId(function () { return diagnostic_channel_1.channel.publish("mongodb", { startedData: startedData, event: event, succeeded: false }); });
        }
        else {
            // fallback -- correlation will not work here
            diagnostic_channel_1.channel.publish("mongodb", { startedData: startedData, event: event, succeeded: false });
        }
    });
    return originalMongo;
};
var mongodb3PatchFunction = function (originalMongo) {
    var listener = originalMongo.instrument();
    var eventMap = {};
    var contextMap = {};
    listener.on("started", function (event) {
        if (eventMap[event.requestId]) {
            // Note: Mongo can generate 2 completely separate requests
            // which share the same requestId, if a certain race condition is triggered.
            // For now, we accept that this can happen and potentially miss or mislabel some events.
            return;
        }
        contextMap[event.requestId] = diagnostic_channel_1.channel.bindToContext(function (cb) { return cb(); });
        eventMap[event.requestId] = __assign({}, event, { time: new Date() });
    });
    listener.on("succeeded", function (event) {
        var startedData = eventMap[event.requestId];
        if (startedData) {
            delete eventMap[event.requestId];
        }
        if (typeof event === "object" && typeof contextMap[event.requestId] === "function") {
            contextMap[event.requestId](function () { return diagnostic_channel_1.channel.publish("mongodb", { startedData: startedData, event: event, succeeded: true }); });
            delete contextMap[event.requestId];
        }
    });
    listener.on("failed", function (event) {
        var startedData = eventMap[event.requestId];
        if (startedData) {
            delete eventMap[event.requestId];
        }
        if (typeof event === "object" && typeof contextMap[event.requestId] === "function") {
            contextMap[event.requestId](function () { return diagnostic_channel_1.channel.publish("mongodb", { startedData: startedData, event: event, succeeded: false }); });
            delete contextMap[event.requestId];
        }
    });
    return originalMongo;
};
// In mongodb 3.3.0, mongodb-core was merged into mongodb, so the same patching
// can be used here. this.s.pool was changed to this.s.coreTopology.s.pool
var mongodbcorePatchFunction = function (originalMongo) {
    var originalConnect = originalMongo.Server.prototype.connect;
    originalMongo.Server.prototype.connect = function contextPreservingConnect() {
        var ret = originalConnect.apply(this, arguments);
        // Messages sent to mongo progress through a pool
        // This can result in context getting mixed between different responses
        // so we wrap the callbacks to restore appropriate state
        var originalWrite = this.s.coreTopology.s.pool.write;
        this.s.coreTopology.s.pool.write = function contextPreservingWrite() {
            var cbidx = typeof arguments[1] === "function" ? 1 : 2;
            if (typeof arguments[cbidx] === "function") {
                arguments[cbidx] = diagnostic_channel_1.channel.bindToContext(arguments[cbidx]);
            }
            return originalWrite.apply(this, arguments);
        };
        // Logout is a special case, it doesn't call the write function but instead
        // directly calls into connection.write
        var originalLogout = this.s.coreTopology.s.pool.logout;
        this.s.coreTopology.s.pool.logout = function contextPreservingLogout() {
            if (typeof arguments[1] === "function") {
                arguments[1] = diagnostic_channel_1.channel.bindToContext(arguments[1]);
            }
            return originalLogout.apply(this, arguments);
        };
        return ret;
    };
    return originalMongo;
};
var mongodb330PatchFunction = function (originalMongo) {
    mongodbcorePatchFunction(originalMongo); // apply mongodb-core patches
    var listener = originalMongo.instrument();
    var eventMap = {};
    var contextMap = {};
    listener.on("started", function (event) {
        if (eventMap[event.requestId]) {
            // Note: Mongo can generate 2 completely separate requests
            // which share the same requestId, if a certain race condition is triggered.
            // For now, we accept that this can happen and potentially miss or mislabel some events.
            return;
        }
        contextMap[event.requestId] = diagnostic_channel_1.channel.bindToContext(function (cb) { return cb(); });
        eventMap[event.requestId] = event;
    });
    listener.on("succeeded", function (event) {
        var startedData = eventMap[event.requestId];
        if (startedData) {
            delete eventMap[event.requestId];
        }
        if (typeof event === "object" && typeof contextMap[event.requestId] === "function") {
            contextMap[event.requestId](function () { return diagnostic_channel_1.channel.publish("mongodb", { startedData: startedData, event: event, succeeded: true }); });
            delete contextMap[event.requestId];
        }
    });
    listener.on("failed", function (event) {
        var startedData = eventMap[event.requestId];
        if (startedData) {
            delete eventMap[event.requestId];
        }
        if (typeof event === "object" && typeof contextMap[event.requestId] === "function") {
            contextMap[event.requestId](function () { return diagnostic_channel_1.channel.publish("mongodb", { startedData: startedData, event: event, succeeded: false }); });
            delete contextMap[event.requestId];
        }
    });
    return originalMongo;
};
exports.mongo2 = {
    versionSpecifier: ">= 2.0.0 <= 3.0.5",
    patch: mongodbPatchFunction,
};
exports.mongo3 = {
    versionSpecifier: "> 3.0.5 < 3.3.0",
    patch: mongodb3PatchFunction,
};
exports.mongo330 = {
    versionSpecifier: ">= 3.3.0 < 4.0.0",
    patch: mongodb330PatchFunction,
};
function enable() {
    diagnostic_channel_1.channel.registerMonkeyPatch("mongodb", exports.mongo2);
    diagnostic_channel_1.channel.registerMonkeyPatch("mongodb", exports.mongo3);
    diagnostic_channel_1.channel.registerMonkeyPatch("mongodb", exports.mongo330);
}
exports.enable = enable;
//# sourceMappingURL=mongodb.pub.js.map

/***/ }),

/***/ 6801:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
var diagnostic_channel_1 = __webpack_require__(7235);
var path = __webpack_require__(5622);
var mysqlPatchFunction = function (originalMysql, originalMysqlPath) {
    // The `name` passed in here is for debugging purposes,
    // to help distinguish which object is being patched.
    var patchObjectFunction = function (obj, name) {
        return function (func, cbWrapper) {
            var originalFunc = obj[func];
            if (originalFunc) {
                obj[func] = function mysqlContextPreserver() {
                    // Find the callback, if there is one
                    var cbidx = arguments.length - 1;
                    for (var i = arguments.length - 1; i >= 0; --i) {
                        if (typeof arguments[i] === "function") {
                            cbidx = i;
                            break;
                        }
                        else if (typeof arguments[i] !== "undefined") {
                            break;
                        }
                    }
                    var cb = arguments[cbidx];
                    var resultContainer = { result: null, startTime: null, startDate: null };
                    if (typeof cb === "function") {
                        // Preserve context on the callback.
                        // If this is one of the functions that we want to track,
                        // then wrap the callback with the tracking wrapper
                        if (cbWrapper) {
                            resultContainer.startTime = process.hrtime();
                            resultContainer.startDate = new Date();
                            arguments[cbidx] = diagnostic_channel_1.channel.bindToContext(cbWrapper(resultContainer, cb));
                        }
                        else {
                            arguments[cbidx] = diagnostic_channel_1.channel.bindToContext(cb);
                        }
                    }
                    var result = originalFunc.apply(this, arguments);
                    resultContainer.result = result;
                    return result;
                };
            }
        };
    };
    var patchClassMemberFunction = function (classObject, name) {
        return patchObjectFunction(classObject.prototype, name + ".prototype");
    };
    var connectionCallbackFunctions = [
        "connect", "changeUser",
        "ping", "statistics", "end",
    ];
    var connectionClass = require(path.dirname(originalMysqlPath) + "/lib/Connection");
    connectionCallbackFunctions.forEach(function (value) { return patchClassMemberFunction(connectionClass, "Connection")(value); });
    // Connection.createQuery is a static method
    patchObjectFunction(connectionClass, "Connection")("createQuery", function (resultContainer, cb) {
        return function (err) {
            var hrDuration = process.hrtime(resultContainer.startTime);
            /* tslint:disable-next-line:no-bitwise */
            var duration = (hrDuration[0] * 1e3 + hrDuration[1] / 1e6) | 0;
            diagnostic_channel_1.channel.publish("mysql", { query: resultContainer.result, callbackArgs: arguments, err: err, duration: duration, time: resultContainer.startDate });
            cb.apply(this, arguments);
        };
    });
    var poolCallbackFunctions = [
        "_enqueueCallback",
    ];
    var poolClass = require(path.dirname(originalMysqlPath) + "/lib/Pool");
    poolCallbackFunctions.forEach(function (value) { return patchClassMemberFunction(poolClass, "Pool")(value); });
    return originalMysql;
};
exports.mysql = {
    versionSpecifier: ">= 2.0.0 < 3.0.0",
    patch: mysqlPatchFunction,
};
function enable() {
    diagnostic_channel_1.channel.registerMonkeyPatch("mysql", exports.mysql);
}
exports.enable = enable;
//# sourceMappingURL=mysql.pub.js.map

/***/ }),

/***/ 4542:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
var diagnostic_channel_1 = __webpack_require__(7235);
function postgresPool1PatchFunction(originalPgPool) {
    var originalConnect = originalPgPool.prototype.connect;
    originalPgPool.prototype.connect = function connect(callback) {
        if (callback) {
            arguments[0] = diagnostic_channel_1.channel.bindToContext(callback);
        }
        return originalConnect.apply(this, arguments);
    };
    return originalPgPool;
}
exports.postgresPool1 = {
    versionSpecifier: ">= 1.0.0 < 3.0.0",
    patch: postgresPool1PatchFunction,
};
function enable() {
    diagnostic_channel_1.channel.registerMonkeyPatch("pg-pool", exports.postgresPool1);
}
exports.enable = enable;
//# sourceMappingURL=pg-pool.pub.js.map

/***/ }),

/***/ 9289:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
var diagnostic_channel_1 = __webpack_require__(7235);
var events_1 = __webpack_require__(8614);
function postgres6PatchFunction(originalPg, originalPgPath) {
    var originalClientQuery = originalPg.Client.prototype.query;
    var diagnosticOriginalFunc = "__diagnosticOriginalFunc";
    // wherever the callback is passed, find it, save it, and remove it from the call
    // to the the original .query() function
    originalPg.Client.prototype.query = function query(config, values, callback) {
        var data = {
            query: {},
            database: {
                host: this.connectionParameters.host,
                port: this.connectionParameters.port,
            },
            result: null,
            error: null,
            duration: 0,
            time: new Date(),
        };
        var start = process.hrtime();
        var queryResult;
        function patchCallback(cb) {
            if (cb && cb[diagnosticOriginalFunc]) {
                cb = cb[diagnosticOriginalFunc];
            }
            var trackingCallback = diagnostic_channel_1.channel.bindToContext(function (err, res) {
                var end = process.hrtime(start);
                data.result = res && { rowCount: res.rowCount, command: res.command };
                data.error = err;
                data.duration = Math.ceil((end[0] * 1e3) + (end[1] / 1e6));
                diagnostic_channel_1.channel.publish("postgres", data);
                // emulate weird internal behavior in pg@6
                // on success, the callback is called *before* query events are emitted
                // on failure, the callback is called *instead of* the query emitting events
                // with no events, that means no promises (since the promise is resolved/rejected in an event handler)
                // since we are always inserting ourselves as a callback, we have to restore the original
                // behavior if the user didn't provide one themselves
                if (err) {
                    if (cb) {
                        return cb.apply(this, arguments);
                    }
                    else if (queryResult && queryResult instanceof events_1.EventEmitter) {
                        queryResult.emit("error", err);
                    }
                }
                else if (cb) {
                    cb.apply(this, arguments);
                }
            });
            try {
                Object.defineProperty(trackingCallback, diagnosticOriginalFunc, { value: cb });
                return trackingCallback;
            }
            catch (e) {
                // this should never happen, but bailout in case it does
                return cb;
            }
        }
        // this function takes too many variations of arguments.
        // this patches any provided callback or creates a new callback if one wasn't provided.
        // since the callback is always called (if provided) in addition to always having a Promisified
        // EventEmitter returned (well, sometimes -- see above), its safe to insert a callback if none was given
        try {
            if (typeof config === "string") {
                if (values instanceof Array) {
                    data.query.preparable = {
                        text: config,
                        args: values,
                    };
                    callback = patchCallback(callback);
                }
                else {
                    data.query.text = config;
                    // pg v6 will, for some reason, accept both
                    // client.query("...", undefined, () => {...})
                    // **and**
                    // client.query("...", () => {...});
                    // Internally, precedence is given to the callback argument
                    if (callback) {
                        callback = patchCallback(callback);
                    }
                    else {
                        values = patchCallback(values);
                    }
                }
            }
            else {
                if (typeof config.name === "string") {
                    data.query.plan = config.name;
                }
                else if (config.values instanceof Array) {
                    data.query.preparable = {
                        text: config.text,
                        args: config.values,
                    };
                }
                else {
                    data.query.text = config.text;
                }
                if (callback) {
                    callback = patchCallback(callback);
                }
                else if (values) {
                    values = patchCallback(values);
                }
                else {
                    config.callback = patchCallback(config.callback);
                }
            }
        }
        catch (e) {
            // if our logic here throws, bail out and just let pg do its thing
            return originalClientQuery.apply(this, arguments);
        }
        arguments[0] = config;
        arguments[1] = values;
        arguments[2] = callback;
        arguments.length = (arguments.length > 3) ? arguments.length : 3;
        queryResult = originalClientQuery.apply(this, arguments);
        return queryResult;
    };
    return originalPg;
}
function postgres7PatchFunction(originalPg, originalPgPath) {
    var originalClientQuery = originalPg.Client.prototype.query;
    var diagnosticOriginalFunc = "__diagnosticOriginalFunc";
    // wherever the callback is passed, find it, save it, and remove it from the call
    // to the the original .query() function
    originalPg.Client.prototype.query = function query(config, values, callback) {
        var _this = this;
        var callbackProvided = !!callback; // Starting in pg@7.x+, Promise is returned only if !callbackProvided
        var data = {
            query: {},
            database: {
                host: this.connectionParameters.host,
                port: this.connectionParameters.port,
            },
            result: null,
            error: null,
            duration: 0,
            time: new Date(),
        };
        var start = process.hrtime();
        var queryResult;
        function patchCallback(cb) {
            if (cb && cb[diagnosticOriginalFunc]) {
                cb = cb[diagnosticOriginalFunc];
            }
            var trackingCallback = diagnostic_channel_1.channel.bindToContext(function (err, res) {
                var end = process.hrtime(start);
                data.result = res && { rowCount: res.rowCount, command: res.command };
                data.error = err;
                data.duration = Math.ceil((end[0] * 1e3) + (end[1] / 1e6));
                diagnostic_channel_1.channel.publish("postgres", data);
                if (err) {
                    if (cb) {
                        return cb.apply(this, arguments);
                    }
                    else if (queryResult && queryResult instanceof events_1.EventEmitter) {
                        queryResult.emit("error", err);
                    }
                }
                else if (cb) {
                    cb.apply(this, arguments);
                }
            });
            try {
                Object.defineProperty(trackingCallback, diagnosticOriginalFunc, { value: cb });
                return trackingCallback;
            }
            catch (e) {
                // this should never happen, but bailout in case it does
                return cb;
            }
        }
        // Only try to wrap the callback if it is a function. We want to keep the same
        // behavior of returning a promise only if no callback is provided. Wrapping
        // a nonfunction makes it a function and pg will interpret it as a callback
        try {
            if (typeof config === "string") {
                if (values instanceof Array) {
                    data.query.preparable = {
                        text: config,
                        args: values,
                    };
                    callbackProvided = typeof callback === "function";
                    callback = callbackProvided ? patchCallback(callback) : callback;
                }
                else {
                    data.query.text = config;
                    if (callback) {
                        callbackProvided = typeof callback === "function";
                        callback = callbackProvided ? patchCallback(callback) : callback;
                    }
                    else {
                        callbackProvided = typeof values === "function";
                        values = callbackProvided ? patchCallback(values) : values;
                    }
                }
            }
            else {
                if (typeof config.name === "string") {
                    data.query.plan = config.name;
                }
                else if (config.values instanceof Array) {
                    data.query.preparable = {
                        text: config.text,
                        args: config.values,
                    };
                }
                else {
                    data.query.text = config.text;
                }
                if (callback) {
                    callbackProvided = typeof callback === "function";
                    callback = patchCallback(callback);
                }
                else if (values) {
                    callbackProvided = typeof values === "function";
                    values = callbackProvided ? patchCallback(values) : values;
                }
                else {
                    callbackProvided = typeof config.callback === "function";
                    config.callback = callbackProvided ? patchCallback(config.callback) : config.callback;
                }
            }
        }
        catch (e) {
            // if our logic here throws, bail out and just let pg do its thing
            return originalClientQuery.apply(this, arguments);
        }
        arguments[0] = config;
        arguments[1] = values;
        arguments[2] = callback;
        arguments.length = (arguments.length > 3) ? arguments.length : 3;
        queryResult = originalClientQuery.apply(this, arguments);
        if (!callbackProvided) {
            // no callback, so create a pass along promise
            return queryResult
                // pass resolved promise after publishing the event
                .then(function (result) {
                patchCallback()(undefined, result);
                return new _this._Promise(function (resolve, reject) {
                    resolve(result);
                });
            })
                // pass along rejected promise after publishing the error
                .catch(function (error) {
                patchCallback()(error, undefined);
                return new _this._Promise(function (resolve, reject) {
                    reject(error);
                });
            });
        }
        return queryResult;
    };
    return originalPg;
}
exports.postgres6 = {
    versionSpecifier: "6.*",
    patch: postgres6PatchFunction,
};
exports.postgres7 = {
    versionSpecifier: ">=7.* <=8.*",
    patch: postgres7PatchFunction,
};
function enable() {
    diagnostic_channel_1.channel.registerMonkeyPatch("pg", exports.postgres6);
    diagnostic_channel_1.channel.registerMonkeyPatch("pg", exports.postgres7);
}
exports.enable = enable;
//# sourceMappingURL=pg.pub.js.map

/***/ }),

/***/ 3402:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
var diagnostic_channel_1 = __webpack_require__(7235);
var redisPatchFunction = function (originalRedis) {
    var originalSend = originalRedis.RedisClient.prototype.internal_send_command;
    // Note: This is mixing together both context tracking and dependency tracking
    originalRedis.RedisClient.prototype.internal_send_command = function (commandObj) {
        if (commandObj) {
            var cb_1 = commandObj.callback;
            if (!cb_1 || !cb_1.pubsubBound) {
                var address_1 = this.address;
                var startTime_1 = process.hrtime();
                var startDate_1 = new Date();
                // Note: augmenting the callback on internal_send_command is correct for context
                // tracking, but may be too low-level for dependency tracking. There are some 'errors'
                // which higher levels expect in some cases
                // However, the only other option is to intercept every individual command.
                commandObj.callback = diagnostic_channel_1.channel.bindToContext(function (err, result) {
                    var hrDuration = process.hrtime(startTime_1);
                    /* tslint:disable-next-line:no-bitwise */
                    var duration = (hrDuration[0] * 1e3 + hrDuration[1] / 1e6) | 0;
                    diagnostic_channel_1.channel.publish("redis", { duration: duration, address: address_1, commandObj: commandObj, err: err, result: result, time: startDate_1 });
                    if (typeof cb_1 === "function") {
                        cb_1.apply(this, arguments);
                    }
                });
                commandObj.callback.pubsubBound = true;
            }
        }
        return originalSend.call(this, commandObj);
    };
    return originalRedis;
};
exports.redis = {
    versionSpecifier: ">= 2.0.0 < 4.0.0",
    patch: redisPatchFunction,
};
function enable() {
    diagnostic_channel_1.channel.registerMonkeyPatch("redis", exports.redis);
}
exports.enable = enable;
//# sourceMappingURL=redis.pub.js.map

/***/ }),

/***/ 5024:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
var diagnostic_channel_1 = __webpack_require__(7235);
var tediousPatchFunction = function (originalTedious) {
    var originalMakeRequest = originalTedious.Connection.prototype.makeRequest;
    originalTedious.Connection.prototype.makeRequest = function makeRequest() {
        function getPatchedCallback(origCallback) {
            var start = process.hrtime();
            var data = {
                query: {},
                database: {
                    host: null,
                    port: null,
                },
                result: null,
                error: null,
                duration: 0,
            };
            return diagnostic_channel_1.channel.bindToContext(function (err, rowCount, rows) {
                var end = process.hrtime(start);
                data = __assign({}, data, { database: {
                        host: this.connection.config.server,
                        port: this.connection.config.options.port,
                    }, result: !err && { rowCount: rowCount, rows: rows }, query: {
                        text: this.parametersByName.statement.value,
                    }, error: err, duration: Math.ceil((end[0] * 1e3) + (end[1] / 1e6)) });
                diagnostic_channel_1.channel.publish("tedious", data);
                origCallback.call(this, err, rowCount, rows);
            });
        }
        var request = arguments[0];
        arguments[0].callback = getPatchedCallback(request.callback);
        originalMakeRequest.apply(this, arguments);
    };
    return originalTedious;
};
exports.tedious = {
    versionSpecifier: ">= 6.0.0 < 9.0.0",
    patch: tediousPatchFunction,
};
function enable() {
    diagnostic_channel_1.channel.registerMonkeyPatch("tedious", exports.tedious);
}
exports.enable = enable;
//# sourceMappingURL=tedious.pub.js.map

/***/ }),

/***/ 6283:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
var diagnostic_channel_1 = __webpack_require__(7235);
// register a "filter" with each logger that publishes the data about to be logged
var winston2PatchFunction = function (originalWinston) {
    var originalLog = originalWinston.Logger.prototype.log;
    var curLevels;
    var loggingFilter = function (level, message, meta) {
        var levelKind;
        if (curLevels === originalWinston.config.npm.levels) {
            levelKind = "npm";
        }
        else if (curLevels === originalWinston.config.syslog.levels) {
            levelKind = "syslog";
        }
        else {
            levelKind = "unknown";
        }
        diagnostic_channel_1.channel.publish("winston", { level: level, message: message, meta: meta, levelKind: levelKind });
        return message;
    };
    // whenever someone logs, ensure our filter comes last
    originalWinston.Logger.prototype.log = function log() {
        curLevels = this.levels;
        if (!this.filters || this.filters.length === 0) {
            this.filters = [loggingFilter];
        }
        else if (this.filters[this.filters.length - 1] !== loggingFilter) {
            this.filters = this.filters.filter(function (f) { return f !== loggingFilter; });
            this.filters.push(loggingFilter);
        }
        return originalLog.apply(this, arguments);
    };
    return originalWinston;
};
var winston3PatchFunction = function (originalWinston) {
    var mapLevelToKind = function (winston, level) {
        var levelKind;
        if (winston.config.npm.levels[level] != null) {
            levelKind = "npm";
        }
        else if (winston.config.syslog.levels[level] != null) {
            levelKind = "syslog";
        }
        else {
            levelKind = "unknown";
        }
        return levelKind;
    };
    var AppInsightsTransport = /** @class */ (function (_super) {
        __extends(AppInsightsTransport, _super);
        function AppInsightsTransport(winston, opts) {
            var _this = _super.call(this, opts) || this;
            _this.winston = winston;
            return _this;
        }
        AppInsightsTransport.prototype.log = function (info, callback) {
            // tslint:disable-next-line:prefer-const - try to obtain level from Symbol(level) afterwards
            var message = info.message, level = info.level, meta = info.meta, splat = __rest(info, ["message", "level", "meta"]);
            level = typeof Symbol["for"] === "function" ? info[Symbol["for"]("level")] : level; // Symbol(level) is uncolorized, so prefer getting it from here
            message = info instanceof Error ? info : message; // Winston places Errors at info, strings at info.message
            var levelKind = mapLevelToKind(this.winston, level);
            meta = meta || {}; // Winston _somtimes_ puts metadata inside meta, so start from here
            for (var key in splat) {
                if (splat.hasOwnProperty(key)) {
                    meta[key] = splat[key];
                }
            }
            diagnostic_channel_1.channel.publish("winston", { message: message, level: level, levelKind: levelKind, meta: meta });
            callback();
        };
        return AppInsightsTransport;
    }(originalWinston.Transport));
    // Patch this function
    function patchedConfigure() {
        // Grab highest sev logging level in case of custom logging levels
        var levels = arguments[0].levels || originalWinston.config.npm.levels;
        var lastLevel;
        for (var level in levels) {
            if (levels.hasOwnProperty(level)) {
                lastLevel = lastLevel === undefined || levels[level] > levels[lastLevel] ? level : lastLevel;
            }
        }
        this.add(new AppInsightsTransport(originalWinston, { level: lastLevel }));
    }
    var origCreate = originalWinston.createLogger;
    originalWinston.createLogger = function patchedCreate() {
        // Grab highest sev logging level in case of custom logging levels
        var levels = arguments[0].levels || originalWinston.config.npm.levels;
        var lastLevel;
        for (var level in levels) {
            if (levels.hasOwnProperty(level)) {
                lastLevel = lastLevel === undefined || levels[level] > levels[lastLevel] ? level : lastLevel;
            }
        }
        // Add custom app insights transport to the end
        // Remark: Configure is not available until after createLogger()
        // and the Logger prototype is not exported in winston 3.x, so
        // patch both createLogger and configure. Could also call configure
        // again after createLogger, but that would cause configure to be called
        // twice per create.
        var result = origCreate.apply(this, arguments);
        result.add(new AppInsightsTransport(originalWinston, { level: lastLevel }));
        var origConfigure = result.configure;
        result.configure = function () {
            origConfigure.apply(this, arguments);
            patchedConfigure.apply(this, arguments);
        };
        return result;
    };
    var origRootConfigure = originalWinston.createLogger;
    originalWinston.configure = function () {
        origRootConfigure.apply(this, arguments);
        patchedConfigure.apply(this, arguments);
    };
    originalWinston.add(new AppInsightsTransport(originalWinston));
    return originalWinston;
};
exports.winston3 = {
    versionSpecifier: "3.x",
    patch: winston3PatchFunction,
};
exports.winston2 = {
    versionSpecifier: "2.x",
    patch: winston2PatchFunction,
};
function enable() {
    diagnostic_channel_1.channel.registerMonkeyPatch("winston", exports.winston2);
    diagnostic_channel_1.channel.registerMonkeyPatch("winston", exports.winston3);
}
exports.enable = enable;
//# sourceMappingURL=winston.pub.js.map

/***/ }),

/***/ 7235:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
Object.defineProperty(exports, "__esModule", ({ value: true }));
var patchRequire_1 = __webpack_require__(423);
var patchRequire_2 = __webpack_require__(423);
exports.makePatchingRequire = patchRequire_2.makePatchingRequire;
var trueFilter = function (publishing) { return true; };
var ContextPreservingEventEmitter = /** @class */ (function () {
    function ContextPreservingEventEmitter() {
        this.version = __webpack_require__(5236)/* .version */ .i8; // Allow for future versions to replace things?
        this.subscribers = {};
        this.contextPreservationFunction = function (cb) { return cb; };
        this.knownPatches = {};
        this.currentlyPublishing = false;
    }
    ContextPreservingEventEmitter.prototype.shouldPublish = function (name) {
        var listeners = this.subscribers[name];
        if (listeners) {
            return listeners.some(function (_a) {
                var filter = _a.filter;
                return !filter || filter(false);
            });
        }
        return false;
    };
    ContextPreservingEventEmitter.prototype.publish = function (name, event) {
        if (this.currentlyPublishing) {
            return; // Avoid reentrancy
        }
        var listeners = this.subscribers[name];
        // Note: Listeners called synchronously to preserve context
        if (listeners) {
            var standardEvent_1 = {
                timestamp: Date.now(),
                data: event,
            };
            this.currentlyPublishing = true;
            listeners.forEach(function (_a) {
                var listener = _a.listener, filter = _a.filter;
                try {
                    if (filter && filter(true)) {
                        listener(standardEvent_1);
                    }
                }
                catch (e) {
                    // Subscriber threw an error
                }
            });
            this.currentlyPublishing = false;
        }
    };
    ContextPreservingEventEmitter.prototype.subscribe = function (name, listener, filter) {
        if (filter === void 0) { filter = trueFilter; }
        if (!this.subscribers[name]) {
            this.subscribers[name] = [];
        }
        this.subscribers[name].push({ listener: listener, filter: filter });
    };
    ContextPreservingEventEmitter.prototype.unsubscribe = function (name, listener, filter) {
        if (filter === void 0) { filter = trueFilter; }
        var listeners = this.subscribers[name];
        if (listeners) {
            for (var index = 0; index < listeners.length; ++index) {
                if (listeners[index].listener === listener && listeners[index].filter === filter) {
                    listeners.splice(index, 1);
                    return true;
                }
            }
        }
        return false;
    };
    // Used for tests
    ContextPreservingEventEmitter.prototype.reset = function () {
        var _this = this;
        this.subscribers = {};
        this.contextPreservationFunction = function (cb) { return cb; };
        // Modify the knownPatches object rather than replace, since a reference will be used in the require patcher
        Object.getOwnPropertyNames(this.knownPatches).forEach(function (prop) { return delete _this.knownPatches[prop]; });
    };
    ContextPreservingEventEmitter.prototype.bindToContext = function (cb) {
        return this.contextPreservationFunction(cb);
    };
    ContextPreservingEventEmitter.prototype.addContextPreservation = function (preserver) {
        var previousPreservationStack = this.contextPreservationFunction;
        this.contextPreservationFunction = (function (cb) { return preserver(previousPreservationStack(cb)); });
    };
    ContextPreservingEventEmitter.prototype.registerMonkeyPatch = function (packageName, patcher) {
        if (!this.knownPatches[packageName]) {
            this.knownPatches[packageName] = [];
        }
        this.knownPatches[packageName].push(patcher);
    };
    ContextPreservingEventEmitter.prototype.getPatchesObject = function () {
        return this.knownPatches;
    };
    return ContextPreservingEventEmitter;
}());
if (!global.diagnosticsSource) {
    global.diagnosticsSource = new ContextPreservingEventEmitter();
    // TODO: should this only patch require after at least one monkey patch is registered?
    /* tslint:disable-next-line:no-var-requires */
    var moduleModule = __webpack_require__(2282);
    // Note: We pass in the object now before any patches are registered, but the object is passed by reference
    // so any updates made to the object will be visible in the patcher.
    moduleModule.prototype.require = patchRequire_1.makePatchingRequire(global.diagnosticsSource.getPatchesObject());
}
exports.channel = global.diagnosticsSource;
//# sourceMappingURL=channel.js.map

/***/ }),

/***/ 423:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
Object.defineProperty(exports, "__esModule", ({ value: true }));
var path = __webpack_require__(5622);
var semver = __webpack_require__(413);
/* tslint:disable-next-line:no-var-requires */
var moduleModule = __webpack_require__(2282);
var nativeModules = Object.keys(process.binding("natives"));
var originalRequire = moduleModule.prototype.require;
function makePatchingRequire(knownPatches) {
    var patchedModules = {};
    return function patchedRequire(moduleId) {
        var originalModule = originalRequire.apply(this, arguments);
        if (knownPatches[moduleId]) {
            // Fetch the specific path of the module
            var modulePath = moduleModule._resolveFilename(moduleId, this);
            if (patchedModules.hasOwnProperty(modulePath)) {
                // This module has already been patched, no need to reapply
                return patchedModules[modulePath];
            }
            var moduleVersion = void 0;
            if (nativeModules.indexOf(moduleId) < 0) {
                try {
                    moduleVersion = originalRequire.call(this, path.join(moduleId, "package.json")).version;
                }
                catch (e) {
                    // This should only happen if moduleId is actually a path rather than a module
                    // This is not a supported scenario
                    return originalModule;
                }
            }
            else {
                // This module is implemented natively so we cannot find a package.json
                // Instead, take the version of node itself
                moduleVersion = process.version.substring(1);
            }
            var prereleaseTagIndex = moduleVersion.indexOf("-");
            if (prereleaseTagIndex >= 0) {
                // We ignore prerelease tags to avoid impossible to fix gaps in support
                // e.g. supporting console in >= 4.0.0 would otherwise not include
                // 8.0.0-pre
                moduleVersion = moduleVersion.substring(0, prereleaseTagIndex);
            }
            var modifiedModule = originalModule;
            for (var _i = 0, _a = knownPatches[moduleId]; _i < _a.length; _i++) {
                var modulePatcher = _a[_i];
                if (semver.satisfies(moduleVersion, modulePatcher.versionSpecifier)) {
                    modifiedModule = modulePatcher.patch(modifiedModule, modulePath);
                }
            }
            return patchedModules[modulePath] = modifiedModule;
        }
        return originalModule;
    };
}
exports.makePatchingRequire = makePatchingRequire;
//# sourceMappingURL=patchRequire.js.map

/***/ }),

/***/ 413:
/***/ ((module, exports) => {

exports = module.exports = SemVer

var debug
/* istanbul ignore next */
if (typeof process === 'object' &&
    process.env &&
    process.env.NODE_DEBUG &&
    /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
  debug = function () {
    var args = Array.prototype.slice.call(arguments, 0)
    args.unshift('SEMVER')
    console.log.apply(console, args)
  }
} else {
  debug = function () {}
}

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
exports.SEMVER_SPEC_VERSION = '2.0.0'

var MAX_LENGTH = 256
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
  /* istanbul ignore next */ 9007199254740991

// Max safe segment length for coercion.
var MAX_SAFE_COMPONENT_LENGTH = 16

// The actual regexps go on exports.re
var re = exports.re = []
var src = exports.src = []
var R = 0

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

var NUMERICIDENTIFIER = R++
src[NUMERICIDENTIFIER] = '0|[1-9]\\d*'
var NUMERICIDENTIFIERLOOSE = R++
src[NUMERICIDENTIFIERLOOSE] = '[0-9]+'

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

var NONNUMERICIDENTIFIER = R++
src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*'

// ## Main Version
// Three dot-separated numeric identifiers.

var MAINVERSION = R++
src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')'

var MAINVERSIONLOOSE = R++
src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')'

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

var PRERELEASEIDENTIFIER = R++
src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +
                            '|' + src[NONNUMERICIDENTIFIER] + ')'

var PRERELEASEIDENTIFIERLOOSE = R++
src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +
                                 '|' + src[NONNUMERICIDENTIFIER] + ')'

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

var PRERELEASE = R++
src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +
                  '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))'

var PRERELEASELOOSE = R++
src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +
                       '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))'

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

var BUILDIDENTIFIER = R++
src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+'

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

var BUILD = R++
src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +
             '(?:\\.' + src[BUILDIDENTIFIER] + ')*))'

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

var FULL = R++
var FULLPLAIN = 'v?' + src[MAINVERSION] +
                src[PRERELEASE] + '?' +
                src[BUILD] + '?'

src[FULL] = '^' + FULLPLAIN + '$'

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +
                 src[PRERELEASELOOSE] + '?' +
                 src[BUILD] + '?'

var LOOSE = R++
src[LOOSE] = '^' + LOOSEPLAIN + '$'

var GTLT = R++
src[GTLT] = '((?:<|>)?=?)'

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
var XRANGEIDENTIFIERLOOSE = R++
src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*'
var XRANGEIDENTIFIER = R++
src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*'

var XRANGEPLAIN = R++
src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:' + src[PRERELEASE] + ')?' +
                   src[BUILD] + '?' +
                   ')?)?'

var XRANGEPLAINLOOSE = R++
src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:' + src[PRERELEASELOOSE] + ')?' +
                        src[BUILD] + '?' +
                        ')?)?'

var XRANGE = R++
src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$'
var XRANGELOOSE = R++
src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$'

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
var COERCE = R++
src[COERCE] = '(?:^|[^\\d])' +
              '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:$|[^\\d])'

// Tilde ranges.
// Meaning is "reasonably at or greater than"
var LONETILDE = R++
src[LONETILDE] = '(?:~>?)'

var TILDETRIM = R++
src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+'
re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g')
var tildeTrimReplace = '$1~'

var TILDE = R++
src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$'
var TILDELOOSE = R++
src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$'

// Caret ranges.
// Meaning is "at least and backwards compatible with"
var LONECARET = R++
src[LONECARET] = '(?:\\^)'

var CARETTRIM = R++
src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+'
re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g')
var caretTrimReplace = '$1^'

var CARET = R++
src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$'
var CARETLOOSE = R++
src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$'

// A simple gt/lt/eq thing, or just "" to indicate "any version"
var COMPARATORLOOSE = R++
src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$'
var COMPARATOR = R++
src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$'

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
var COMPARATORTRIM = R++
src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +
                      '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')'

// this one has to use the /g flag
re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g')
var comparatorTrimReplace = '$1$2$3'

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
var HYPHENRANGE = R++
src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +
                   '\\s+-\\s+' +
                   '(' + src[XRANGEPLAIN] + ')' +
                   '\\s*$'

var HYPHENRANGELOOSE = R++
src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s+-\\s+' +
                        '(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s*$'

// Star ranges basically just allow anything at all.
var STAR = R++
src[STAR] = '(<|>)?=?\\s*\\*'

// Compile to actual regexp objects.
// All are flag-free, unless they were created above with a flag.
for (var i = 0; i < R; i++) {
  debug(i, src[i])
  if (!re[i]) {
    re[i] = new RegExp(src[i])
  }
}

exports.parse = parse
function parse (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  if (version.length > MAX_LENGTH) {
    return null
  }

  var r = options.loose ? re[LOOSE] : re[FULL]
  if (!r.test(version)) {
    return null
  }

  try {
    return new SemVer(version, options)
  } catch (er) {
    return null
  }
}

exports.valid = valid
function valid (version, options) {
  var v = parse(version, options)
  return v ? v.version : null
}

exports.clean = clean
function clean (version, options) {
  var s = parse(version.trim().replace(/^[=v]+/, ''), options)
  return s ? s.version : null
}

exports.SemVer = SemVer

function SemVer (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }
  if (version instanceof SemVer) {
    if (version.loose === options.loose) {
      return version
    } else {
      version = version.version
    }
  } else if (typeof version !== 'string') {
    throw new TypeError('Invalid Version: ' + version)
  }

  if (version.length > MAX_LENGTH) {
    throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')
  }

  if (!(this instanceof SemVer)) {
    return new SemVer(version, options)
  }

  debug('SemVer', version, options)
  this.options = options
  this.loose = !!options.loose

  var m = version.trim().match(options.loose ? re[LOOSE] : re[FULL])

  if (!m) {
    throw new TypeError('Invalid Version: ' + version)
  }

  this.raw = version

  // these are actually numbers
  this.major = +m[1]
  this.minor = +m[2]
  this.patch = +m[3]

  if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
    throw new TypeError('Invalid major version')
  }

  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
    throw new TypeError('Invalid minor version')
  }

  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
    throw new TypeError('Invalid patch version')
  }

  // numberify any prerelease numeric ids
  if (!m[4]) {
    this.prerelease = []
  } else {
    this.prerelease = m[4].split('.').map(function (id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id
        if (num >= 0 && num < MAX_SAFE_INTEGER) {
          return num
        }
      }
      return id
    })
  }

  this.build = m[5] ? m[5].split('.') : []
  this.format()
}

SemVer.prototype.format = function () {
  this.version = this.major + '.' + this.minor + '.' + this.patch
  if (this.prerelease.length) {
    this.version += '-' + this.prerelease.join('.')
  }
  return this.version
}

SemVer.prototype.toString = function () {
  return this.version
}

SemVer.prototype.compare = function (other) {
  debug('SemVer.compare', this.version, this.options, other)
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return this.compareMain(other) || this.comparePre(other)
}

SemVer.prototype.compareMain = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return compareIdentifiers(this.major, other.major) ||
         compareIdentifiers(this.minor, other.minor) ||
         compareIdentifiers(this.patch, other.patch)
}

SemVer.prototype.comparePre = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  // NOT having a prerelease is > having one
  if (this.prerelease.length && !other.prerelease.length) {
    return -1
  } else if (!this.prerelease.length && other.prerelease.length) {
    return 1
  } else if (!this.prerelease.length && !other.prerelease.length) {
    return 0
  }

  var i = 0
  do {
    var a = this.prerelease[i]
    var b = other.prerelease[i]
    debug('prerelease compare', i, a, b)
    if (a === undefined && b === undefined) {
      return 0
    } else if (b === undefined) {
      return 1
    } else if (a === undefined) {
      return -1
    } else if (a === b) {
      continue
    } else {
      return compareIdentifiers(a, b)
    }
  } while (++i)
}

// preminor will bump the version up to the next minor release, and immediately
// down to pre-release. premajor and prepatch work the same way.
SemVer.prototype.inc = function (release, identifier) {
  switch (release) {
    case 'premajor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor = 0
      this.major++
      this.inc('pre', identifier)
      break
    case 'preminor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor++
      this.inc('pre', identifier)
      break
    case 'prepatch':
      // If this is already a prerelease, it will bump to the next version
      // drop any prereleases that might already exist, since they are not
      // relevant at this point.
      this.prerelease.length = 0
      this.inc('patch', identifier)
      this.inc('pre', identifier)
      break
    // If the input is a non-prerelease version, this acts the same as
    // prepatch.
    case 'prerelease':
      if (this.prerelease.length === 0) {
        this.inc('patch', identifier)
      }
      this.inc('pre', identifier)
      break

    case 'major':
      // If this is a pre-major version, bump up to the same major version.
      // Otherwise increment major.
      // 1.0.0-5 bumps to 1.0.0
      // 1.1.0 bumps to 2.0.0
      if (this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0) {
        this.major++
      }
      this.minor = 0
      this.patch = 0
      this.prerelease = []
      break
    case 'minor':
      // If this is a pre-minor version, bump up to the same minor version.
      // Otherwise increment minor.
      // 1.2.0-5 bumps to 1.2.0
      // 1.2.1 bumps to 1.3.0
      if (this.patch !== 0 || this.prerelease.length === 0) {
        this.minor++
      }
      this.patch = 0
      this.prerelease = []
      break
    case 'patch':
      // If this is not a pre-release version, it will increment the patch.
      // If it is a pre-release it will bump up to the same patch version.
      // 1.2.0-5 patches to 1.2.0
      // 1.2.0 patches to 1.2.1
      if (this.prerelease.length === 0) {
        this.patch++
      }
      this.prerelease = []
      break
    // This probably shouldn't be used publicly.
    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
    case 'pre':
      if (this.prerelease.length === 0) {
        this.prerelease = [0]
      } else {
        var i = this.prerelease.length
        while (--i >= 0) {
          if (typeof this.prerelease[i] === 'number') {
            this.prerelease[i]++
            i = -2
          }
        }
        if (i === -1) {
          // didn't increment anything
          this.prerelease.push(0)
        }
      }
      if (identifier) {
        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
        if (this.prerelease[0] === identifier) {
          if (isNaN(this.prerelease[1])) {
            this.prerelease = [identifier, 0]
          }
        } else {
          this.prerelease = [identifier, 0]
        }
      }
      break

    default:
      throw new Error('invalid increment argument: ' + release)
  }
  this.format()
  this.raw = this.version
  return this
}

exports.inc = inc
function inc (version, release, loose, identifier) {
  if (typeof (loose) === 'string') {
    identifier = loose
    loose = undefined
  }

  try {
    return new SemVer(version, loose).inc(release, identifier).version
  } catch (er) {
    return null
  }
}

exports.diff = diff
function diff (version1, version2) {
  if (eq(version1, version2)) {
    return null
  } else {
    var v1 = parse(version1)
    var v2 = parse(version2)
    var prefix = ''
    if (v1.prerelease.length || v2.prerelease.length) {
      prefix = 'pre'
      var defaultResult = 'prerelease'
    }
    for (var key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return prefix + key
        }
      }
    }
    return defaultResult // may be undefined
  }
}

exports.compareIdentifiers = compareIdentifiers

var numeric = /^[0-9]+$/
function compareIdentifiers (a, b) {
  var anum = numeric.test(a)
  var bnum = numeric.test(b)

  if (anum && bnum) {
    a = +a
    b = +b
  }

  return a === b ? 0
    : (anum && !bnum) ? -1
    : (bnum && !anum) ? 1
    : a < b ? -1
    : 1
}

exports.rcompareIdentifiers = rcompareIdentifiers
function rcompareIdentifiers (a, b) {
  return compareIdentifiers(b, a)
}

exports.major = major
function major (a, loose) {
  return new SemVer(a, loose).major
}

exports.minor = minor
function minor (a, loose) {
  return new SemVer(a, loose).minor
}

exports.patch = patch
function patch (a, loose) {
  return new SemVer(a, loose).patch
}

exports.compare = compare
function compare (a, b, loose) {
  return new SemVer(a, loose).compare(new SemVer(b, loose))
}

exports.compareLoose = compareLoose
function compareLoose (a, b) {
  return compare(a, b, true)
}

exports.rcompare = rcompare
function rcompare (a, b, loose) {
  return compare(b, a, loose)
}

exports.sort = sort
function sort (list, loose) {
  return list.sort(function (a, b) {
    return exports.compare(a, b, loose)
  })
}

exports.rsort = rsort
function rsort (list, loose) {
  return list.sort(function (a, b) {
    return exports.rcompare(a, b, loose)
  })
}

exports.gt = gt
function gt (a, b, loose) {
  return compare(a, b, loose) > 0
}

exports.lt = lt
function lt (a, b, loose) {
  return compare(a, b, loose) < 0
}

exports.eq = eq
function eq (a, b, loose) {
  return compare(a, b, loose) === 0
}

exports.neq = neq
function neq (a, b, loose) {
  return compare(a, b, loose) !== 0
}

exports.gte = gte
function gte (a, b, loose) {
  return compare(a, b, loose) >= 0
}

exports.lte = lte
function lte (a, b, loose) {
  return compare(a, b, loose) <= 0
}

exports.cmp = cmp
function cmp (a, op, b, loose) {
  switch (op) {
    case '===':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a === b

    case '!==':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a !== b

    case '':
    case '=':
    case '==':
      return eq(a, b, loose)

    case '!=':
      return neq(a, b, loose)

    case '>':
      return gt(a, b, loose)

    case '>=':
      return gte(a, b, loose)

    case '<':
      return lt(a, b, loose)

    case '<=':
      return lte(a, b, loose)

    default:
      throw new TypeError('Invalid operator: ' + op)
  }
}

exports.Comparator = Comparator
function Comparator (comp, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (comp instanceof Comparator) {
    if (comp.loose === !!options.loose) {
      return comp
    } else {
      comp = comp.value
    }
  }

  if (!(this instanceof Comparator)) {
    return new Comparator(comp, options)
  }

  debug('comparator', comp, options)
  this.options = options
  this.loose = !!options.loose
  this.parse(comp)

  if (this.semver === ANY) {
    this.value = ''
  } else {
    this.value = this.operator + this.semver.version
  }

  debug('comp', this)
}

var ANY = {}
Comparator.prototype.parse = function (comp) {
  var r = this.options.loose ? re[COMPARATORLOOSE] : re[COMPARATOR]
  var m = comp.match(r)

  if (!m) {
    throw new TypeError('Invalid comparator: ' + comp)
  }

  this.operator = m[1]
  if (this.operator === '=') {
    this.operator = ''
  }

  // if it literally is just '>' or '' then allow anything.
  if (!m[2]) {
    this.semver = ANY
  } else {
    this.semver = new SemVer(m[2], this.options.loose)
  }
}

Comparator.prototype.toString = function () {
  return this.value
}

Comparator.prototype.test = function (version) {
  debug('Comparator.test', version, this.options.loose)

  if (this.semver === ANY) {
    return true
  }

  if (typeof version === 'string') {
    version = new SemVer(version, this.options)
  }

  return cmp(version, this.operator, this.semver, this.options)
}

Comparator.prototype.intersects = function (comp, options) {
  if (!(comp instanceof Comparator)) {
    throw new TypeError('a Comparator is required')
  }

  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  var rangeTmp

  if (this.operator === '') {
    rangeTmp = new Range(comp.value, options)
    return satisfies(this.value, rangeTmp, options)
  } else if (comp.operator === '') {
    rangeTmp = new Range(this.value, options)
    return satisfies(comp.semver, rangeTmp, options)
  }

  var sameDirectionIncreasing =
    (this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '>=' || comp.operator === '>')
  var sameDirectionDecreasing =
    (this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '<=' || comp.operator === '<')
  var sameSemVer = this.semver.version === comp.semver.version
  var differentDirectionsInclusive =
    (this.operator === '>=' || this.operator === '<=') &&
    (comp.operator === '>=' || comp.operator === '<=')
  var oppositeDirectionsLessThan =
    cmp(this.semver, '<', comp.semver, options) &&
    ((this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '<=' || comp.operator === '<'))
  var oppositeDirectionsGreaterThan =
    cmp(this.semver, '>', comp.semver, options) &&
    ((this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '>=' || comp.operator === '>'))

  return sameDirectionIncreasing || sameDirectionDecreasing ||
    (sameSemVer && differentDirectionsInclusive) ||
    oppositeDirectionsLessThan || oppositeDirectionsGreaterThan
}

exports.Range = Range
function Range (range, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (range instanceof Range) {
    if (range.loose === !!options.loose &&
        range.includePrerelease === !!options.includePrerelease) {
      return range
    } else {
      return new Range(range.raw, options)
    }
  }

  if (range instanceof Comparator) {
    return new Range(range.value, options)
  }

  if (!(this instanceof Range)) {
    return new Range(range, options)
  }

  this.options = options
  this.loose = !!options.loose
  this.includePrerelease = !!options.includePrerelease

  // First, split based on boolean or ||
  this.raw = range
  this.set = range.split(/\s*\|\|\s*/).map(function (range) {
    return this.parseRange(range.trim())
  }, this).filter(function (c) {
    // throw out any that are not relevant for whatever reason
    return c.length
  })

  if (!this.set.length) {
    throw new TypeError('Invalid SemVer Range: ' + range)
  }

  this.format()
}

Range.prototype.format = function () {
  this.range = this.set.map(function (comps) {
    return comps.join(' ').trim()
  }).join('||').trim()
  return this.range
}

Range.prototype.toString = function () {
  return this.range
}

Range.prototype.parseRange = function (range) {
  var loose = this.options.loose
  range = range.trim()
  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE]
  range = range.replace(hr, hyphenReplace)
  debug('hyphen replace', range)
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace)
  debug('comparator trim', range, re[COMPARATORTRIM])

  // `~ 1.2.3` => `~1.2.3`
  range = range.replace(re[TILDETRIM], tildeTrimReplace)

  // `^ 1.2.3` => `^1.2.3`
  range = range.replace(re[CARETTRIM], caretTrimReplace)

  // normalize spaces
  range = range.split(/\s+/).join(' ')

  // At this point, the range is completely trimmed and
  // ready to be split into comparators.

  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR]
  var set = range.split(' ').map(function (comp) {
    return parseComparator(comp, this.options)
  }, this).join(' ').split(/\s+/)
  if (this.options.loose) {
    // in loose mode, throw out any that are not valid comparators
    set = set.filter(function (comp) {
      return !!comp.match(compRe)
    })
  }
  set = set.map(function (comp) {
    return new Comparator(comp, this.options)
  }, this)

  return set
}

Range.prototype.intersects = function (range, options) {
  if (!(range instanceof Range)) {
    throw new TypeError('a Range is required')
  }

  return this.set.some(function (thisComparators) {
    return thisComparators.every(function (thisComparator) {
      return range.set.some(function (rangeComparators) {
        return rangeComparators.every(function (rangeComparator) {
          return thisComparator.intersects(rangeComparator, options)
        })
      })
    })
  })
}

// Mostly just for testing and legacy API reasons
exports.toComparators = toComparators
function toComparators (range, options) {
  return new Range(range, options).set.map(function (comp) {
    return comp.map(function (c) {
      return c.value
    }).join(' ').trim().split(' ')
  })
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
function parseComparator (comp, options) {
  debug('comp', comp, options)
  comp = replaceCarets(comp, options)
  debug('caret', comp)
  comp = replaceTildes(comp, options)
  debug('tildes', comp)
  comp = replaceXRanges(comp, options)
  debug('xrange', comp)
  comp = replaceStars(comp, options)
  debug('stars', comp)
  return comp
}

function isX (id) {
  return !id || id.toLowerCase() === 'x' || id === '*'
}

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
function replaceTildes (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceTilde(comp, options)
  }).join(' ')
}

function replaceTilde (comp, options) {
  var r = options.loose ? re[TILDELOOSE] : re[TILDE]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('tilde', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      // ~1.2 == >=1.2.0 <1.3.0
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
    } else if (pr) {
      debug('replaceTilde pr', pr)
      ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
            ' <' + M + '.' + (+m + 1) + '.0'
    } else {
      // ~1.2.3 == >=1.2.3 <1.3.0
      ret = '>=' + M + '.' + m + '.' + p +
            ' <' + M + '.' + (+m + 1) + '.0'
    }

    debug('tilde return', ret)
    return ret
  })
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
// ^1.2.3 --> >=1.2.3 <2.0.0
// ^1.2.0 --> >=1.2.0 <2.0.0
function replaceCarets (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceCaret(comp, options)
  }).join(' ')
}

function replaceCaret (comp, options) {
  debug('caret', comp, options)
  var r = options.loose ? re[CARETLOOSE] : re[CARET]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('caret', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      if (M === '0') {
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
      } else {
        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0'
      }
    } else if (pr) {
      debug('replaceCaret pr', pr)
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
              ' <' + (+M + 1) + '.0.0'
      }
    } else {
      debug('no pr')
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p +
              ' <' + (+M + 1) + '.0.0'
      }
    }

    debug('caret return', ret)
    return ret
  })
}

function replaceXRanges (comp, options) {
  debug('replaceXRanges', comp, options)
  return comp.split(/\s+/).map(function (comp) {
    return replaceXRange(comp, options)
  }).join(' ')
}

function replaceXRange (comp, options) {
  comp = comp.trim()
  var r = options.loose ? re[XRANGELOOSE] : re[XRANGE]
  return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
    debug('xRange', comp, ret, gtlt, M, m, p, pr)
    var xM = isX(M)
    var xm = xM || isX(m)
    var xp = xm || isX(p)
    var anyX = xp

    if (gtlt === '=' && anyX) {
      gtlt = ''
    }

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0'
      } else {
        // nothing is forbidden
        ret = '*'
      }
    } else if (gtlt && anyX) {
      // we know patch is an x, because we have any x at all.
      // replace X with 0
      if (xm) {
        m = 0
      }
      p = 0

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        // >1.2.3 => >= 1.2.4
        gtlt = '>='
        if (xm) {
          M = +M + 1
          m = 0
          p = 0
        } else {
          m = +m + 1
          p = 0
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<'
        if (xm) {
          M = +M + 1
        } else {
          m = +m + 1
        }
      }

      ret = gtlt + M + '.' + m + '.' + p
    } else if (xm) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (xp) {
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
    }

    debug('xRange return', ret)

    return ret
  })
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
function replaceStars (comp, options) {
  debug('replaceStars', comp, options)
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[STAR], '')
}

// This function is passed to string.replace(re[HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0
function hyphenReplace ($0,
  from, fM, fm, fp, fpr, fb,
  to, tM, tm, tp, tpr, tb) {
  if (isX(fM)) {
    from = ''
  } else if (isX(fm)) {
    from = '>=' + fM + '.0.0'
  } else if (isX(fp)) {
    from = '>=' + fM + '.' + fm + '.0'
  } else {
    from = '>=' + from
  }

  if (isX(tM)) {
    to = ''
  } else if (isX(tm)) {
    to = '<' + (+tM + 1) + '.0.0'
  } else if (isX(tp)) {
    to = '<' + tM + '.' + (+tm + 1) + '.0'
  } else if (tpr) {
    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr
  } else {
    to = '<=' + to
  }

  return (from + ' ' + to).trim()
}

// if ANY of the sets match ALL of its comparators, then pass
Range.prototype.test = function (version) {
  if (!version) {
    return false
  }

  if (typeof version === 'string') {
    version = new SemVer(version, this.options)
  }

  for (var i = 0; i < this.set.length; i++) {
    if (testSet(this.set[i], version, this.options)) {
      return true
    }
  }
  return false
}

function testSet (set, version, options) {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false
    }
  }

  if (version.prerelease.length && !options.includePrerelease) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (i = 0; i < set.length; i++) {
      debug(set[i].semver)
      if (set[i].semver === ANY) {
        continue
      }

      if (set[i].semver.prerelease.length > 0) {
        var allowed = set[i].semver
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch) {
          return true
        }
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false
  }

  return true
}

exports.satisfies = satisfies
function satisfies (version, range, options) {
  try {
    range = new Range(range, options)
  } catch (er) {
    return false
  }
  return range.test(version)
}

exports.maxSatisfying = maxSatisfying
function maxSatisfying (versions, range, options) {
  var max = null
  var maxSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!max || maxSV.compare(v) === -1) {
        // compare(max, v, true)
        max = v
        maxSV = new SemVer(max, options)
      }
    }
  })
  return max
}

exports.minSatisfying = minSatisfying
function minSatisfying (versions, range, options) {
  var min = null
  var minSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!min || minSV.compare(v) === 1) {
        // compare(min, v, true)
        min = v
        minSV = new SemVer(min, options)
      }
    }
  })
  return min
}

exports.minVersion = minVersion
function minVersion (range, loose) {
  range = new Range(range, loose)

  var minver = new SemVer('0.0.0')
  if (range.test(minver)) {
    return minver
  }

  minver = new SemVer('0.0.0-0')
  if (range.test(minver)) {
    return minver
  }

  minver = null
  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    comparators.forEach(function (comparator) {
      // Clone to avoid manipulating the comparator's semver object.
      var compver = new SemVer(comparator.semver.version)
      switch (comparator.operator) {
        case '>':
          if (compver.prerelease.length === 0) {
            compver.patch++
          } else {
            compver.prerelease.push(0)
          }
          compver.raw = compver.format()
          /* fallthrough */
        case '':
        case '>=':
          if (!minver || gt(minver, compver)) {
            minver = compver
          }
          break
        case '<':
        case '<=':
          /* Ignore maximum versions */
          break
        /* istanbul ignore next */
        default:
          throw new Error('Unexpected operation: ' + comparator.operator)
      }
    })
  }

  if (minver && range.test(minver)) {
    return minver
  }

  return null
}

exports.validRange = validRange
function validRange (range, options) {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, options).range || '*'
  } catch (er) {
    return null
  }
}

// Determine if version is less than all the versions possible in the range
exports.ltr = ltr
function ltr (version, range, options) {
  return outside(version, range, '<', options)
}

// Determine if version is greater than all the versions possible in the range.
exports.gtr = gtr
function gtr (version, range, options) {
  return outside(version, range, '>', options)
}

exports.outside = outside
function outside (version, range, hilo, options) {
  version = new SemVer(version, options)
  range = new Range(range, options)

  var gtfn, ltefn, ltfn, comp, ecomp
  switch (hilo) {
    case '>':
      gtfn = gt
      ltefn = lte
      ltfn = lt
      comp = '>'
      ecomp = '>='
      break
    case '<':
      gtfn = lt
      ltefn = gte
      ltfn = gt
      comp = '<'
      ecomp = '<='
      break
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"')
  }

  // If it satisifes the range it is not outside
  if (satisfies(version, range, options)) {
    return false
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    var high = null
    var low = null

    comparators.forEach(function (comparator) {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0')
      }
      high = high || comparator
      low = low || comparator
      if (gtfn(comparator.semver, high.semver, options)) {
        high = comparator
      } else if (ltfn(comparator.semver, low.semver, options)) {
        low = comparator
      }
    })

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false
    }
  }
  return true
}

exports.prerelease = prerelease
function prerelease (version, options) {
  var parsed = parse(version, options)
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
}

exports.intersects = intersects
function intersects (r1, r2, options) {
  r1 = new Range(r1, options)
  r2 = new Range(r2, options)
  return r1.intersects(r2)
}

exports.coerce = coerce
function coerce (version) {
  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  var match = version.match(re[COERCE])

  if (match == null) {
    return null
  }

  return parse(match[1] +
    '.' + (match[2] || '0') +
    '.' + (match[3] || '0'))
}


/***/ }),

/***/ 6174:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var shimmer = __webpack_require__(1896);
var wrap    = shimmer.wrap;
var unwrap  = shimmer.unwrap;

// Default to complaining loudly when things don't go according to plan.
// dunderscores are boring
var SYMBOL = 'wrap@before';

// Sets a property on an object, preserving its enumerability.
// This function assumes that the property is already writable.
function defineProperty(obj, name, value) {
  var enumerable = !!obj[name] && obj.propertyIsEnumerable(name);
  Object.defineProperty(obj, name, {
    configurable: true,
    enumerable: enumerable,
    writable: true,
    value: value
  });
}

function _process(self, listeners) {
  var l = listeners.length;
  for (var p = 0; p < l; p++) {
    var listener = listeners[p];
    // set up the listener so that onEmit can do whatever it needs
    var before = self[SYMBOL];
    if (typeof before === 'function') {
      before(listener);
    }
    else if (Array.isArray(before)) {
      var length = before.length;
      for (var i = 0; i < length; i++) before[i](listener);
    }
  }
}

function _listeners(self, event) {
  var listeners;
  listeners = self._events && self._events[event];
  if (!Array.isArray(listeners)) {
    if (listeners) {
      listeners = [listeners];
    }
    else {
      listeners = [];
    }
  }

  return listeners;
}

function _findAndProcess(self, event, before) {
  var after = _listeners(self, event);
  var unprocessed = after.filter(function(fn) { return before.indexOf(fn) === -1; });
  if (unprocessed.length > 0) _process(self, unprocessed);
}

function _wrap(unwrapped, visit) {
  if (!unwrapped) return;

  var wrapped = unwrapped;
  if (typeof unwrapped === 'function') {
    wrapped = visit(unwrapped);
  }
  else if (Array.isArray(unwrapped)) {
    wrapped = [];
    for (var i = 0; i < unwrapped.length; i++) {
      wrapped[i] = visit(unwrapped[i]);
    }
  }
  return wrapped;
}

module.exports = function wrapEmitter(emitter, onAddListener, onEmit) {
  if (!emitter || !emitter.on || !emitter.addListener ||
      !emitter.removeListener || !emitter.emit) {
    throw new Error("can only wrap real EEs");
  }

  if (!onAddListener) throw new Error("must have function to run on listener addition");
  if (!onEmit) throw new Error("must have function to wrap listeners when emitting");

  /* Attach a context to a listener, and make sure that this hook stays
   * attached to the emitter forevermore.
   */
  function adding(on) {
    return function added(event, listener) {
      var existing = _listeners(this, event).slice();

      try {
        var returned = on.call(this, event, listener);
        _findAndProcess(this, event, existing);
        return returned;
      }
      finally {
        // old-style streaming overwrites .on and .addListener, so rewrap
        if (!this.on.__wrapped) wrap(this, 'on', adding);
        if (!this.addListener.__wrapped) wrap(this, 'addListener', adding);
      }
    };
  }

  function emitting(emit) {
    return function emitted(event) {
      if (!this._events || !this._events[event]) return emit.apply(this, arguments);

      var unwrapped = this._events[event];

      /* Ensure that if removeListener gets called, it's working with the
       * unwrapped listeners.
       */
      function remover(removeListener) {
        return function removed() {
          this._events[event] = unwrapped;
          try {
            return removeListener.apply(this, arguments);
          }
          finally {
            unwrapped = this._events[event];
            this._events[event] = _wrap(unwrapped, onEmit);
          }
        };
      }
      wrap(this, 'removeListener', remover);

      try {
        /* At emit time, ensure that whatever else is going on, removeListener will
         * still work while at the same time running whatever hooks are necessary to
         * make sure the listener is run in the correct context.
         */
        this._events[event] = _wrap(unwrapped, onEmit);
        return emit.apply(this, arguments);
      }
      finally {
        /* Ensure that regardless of what happens when preparing and running the
         * listeners, the status quo ante is restored before continuing.
         */
        unwrap(this, 'removeListener');
        this._events[event] = unwrapped;
      }
    };
  }

  // support multiple onAddListeners
  if (!emitter[SYMBOL]) {
    defineProperty(emitter, SYMBOL, onAddListener);
  }
  else if (typeof emitter[SYMBOL] === 'function') {
    defineProperty(emitter, SYMBOL, [emitter[SYMBOL], onAddListener]);
  }
  else if (Array.isArray(emitter[SYMBOL])) {
    emitter[SYMBOL].push(onAddListener);
  }

  // only wrap the core functions once
  if (!emitter.__wrapped) {
    wrap(emitter, 'addListener', adding);
    wrap(emitter, 'on',          adding);
    wrap(emitter, 'emit',        emitting);

    defineProperty(emitter, '__unwrap', function () {
      unwrap(emitter, 'addListener');
      unwrap(emitter, 'on');
      unwrap(emitter, 'emit');
      delete emitter[SYMBOL];
      delete emitter.__wrapped;
    });
    defineProperty(emitter, '__wrapped', true);
  }
};


/***/ }),

/***/ 1896:
/***/ ((module) => {

"use strict";


function isFunction (funktion) {
  return typeof funktion === 'function'
}

// Default to complaining loudly when things don't go according to plan.
var logger = console.error.bind(console)

// Sets a property on an object, preserving its enumerability.
// This function assumes that the property is already writable.
function defineProperty (obj, name, value) {
  var enumerable = !!obj[name] && obj.propertyIsEnumerable(name)
  Object.defineProperty(obj, name, {
    configurable: true,
    enumerable: enumerable,
    writable: true,
    value: value
  })
}

// Keep initialization idempotent.
function shimmer (options) {
  if (options && options.logger) {
    if (!isFunction(options.logger)) logger("new logger isn't a function, not replacing")
    else logger = options.logger
  }
}

function wrap (nodule, name, wrapper) {
  if (!nodule || !nodule[name]) {
    logger('no original function ' + name + ' to wrap')
    return
  }

  if (!wrapper) {
    logger('no wrapper function')
    logger((new Error()).stack)
    return
  }

  if (!isFunction(nodule[name]) || !isFunction(wrapper)) {
    logger('original object and wrapper must be functions')
    return
  }

  var original = nodule[name]
  var wrapped = wrapper(original, name)

  defineProperty(wrapped, '__original', original)
  defineProperty(wrapped, '__unwrap', function () {
    if (nodule[name] === wrapped) defineProperty(nodule, name, original)
  })
  defineProperty(wrapped, '__wrapped', true)

  defineProperty(nodule, name, wrapped)
  return wrapped
}

function massWrap (nodules, names, wrapper) {
  if (!nodules) {
    logger('must provide one or more modules to patch')
    logger((new Error()).stack)
    return
  } else if (!Array.isArray(nodules)) {
    nodules = [nodules]
  }

  if (!(names && Array.isArray(names))) {
    logger('must provide one or more functions to wrap on modules')
    return
  }

  nodules.forEach(function (nodule) {
    names.forEach(function (name) {
      wrap(nodule, name, wrapper)
    })
  })
}

function unwrap (nodule, name) {
  if (!nodule || !nodule[name]) {
    logger('no function to unwrap.')
    logger((new Error()).stack)
    return
  }

  if (!nodule[name].__unwrap) {
    logger('no original to unwrap to -- has ' + name + ' already been unwrapped?')
  } else {
    return nodule[name].__unwrap()
  }
}

function massUnwrap (nodules, names) {
  if (!nodules) {
    logger('must provide one or more modules to patch')
    logger((new Error()).stack)
    return
  } else if (!Array.isArray(nodules)) {
    nodules = [nodules]
  }

  if (!(names && Array.isArray(names))) {
    logger('must provide one or more functions to unwrap on modules')
    return
  }

  nodules.forEach(function (nodule) {
    names.forEach(function (name) {
      unwrap(nodule, name)
    })
  })
}

shimmer.wrap = wrap
shimmer.massWrap = massWrap
shimmer.unwrap = unwrap
shimmer.massUnwrap = massUnwrap

module.exports = shimmer


/***/ }),

/***/ 2910:
/***/ ((module) => {

// Copyright 2012 the V8 project authors. All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
//       copyright notice, this list of conditions and the following
//       disclaimer in the documentation and/or other materials provided
//       with the distribution.
//     * Neither the name of Google Inc. nor the names of its
//       contributors may be used to endorse or promote products derived
//       from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

function FormatErrorString(error) {
  try {
    return Error.prototype.toString.call(error);
  } catch (e) {
    try {
      return "<error: " + e + ">";
    } catch (ee) {
      return "<error>";
    }
  }
}

module.exports = function FormatStackTrace(error, frames) {
  var lines = [];
  lines.push(FormatErrorString(error));
  for (var i = 0; i < frames.length; i++) {
    var frame = frames[i];
    var line;
    try {
      line = frame.toString();
    } catch (e) {
      try {
        line = "<error: " + e + ">";
      } catch (ee) {
        // Any code that reaches this point is seriously nasty!
        line = "<error>";
      }
    }
    lines.push("    at " + line);
  }
  return lines.join("\n");
};


/***/ }),

/***/ 9738:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// If a another copy (same version or not) of stack-chain exists it will result
// in wrong stack traces (most likely dublicate callSites).
if (global._stackChain) {
  // In case the version match, we can simply return the first initialized copy
  if (global._stackChain.version === __webpack_require__(9414)/* .version */ .i8) {
    module.exports = global._stackChain;
  }
  // The version don't match, this is really bad. Lets just throw
  else {
    throw new Error('Conflicting version of stack-chain found');
  }
}
// Yay, no other stack-chain copy exists, yet :/
else {
  module.exports = global._stackChain = __webpack_require__(3252);
}


/***/ }),

/***/ 3252:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


// use a already existing formater or fallback to the default v8 formater
var defaultFormater = __webpack_require__(2910);

// public define API
function stackChain() {
  this.extend = new TraceModifier();
  this.filter = new TraceModifier();
  this.format = new StackFormater();
  this.version = __webpack_require__(9414)/* .version */ .i8;
}


var SHORTCIRCUIT_CALLSITE = false;
stackChain.prototype.callSite = function collectCallSites(options) {
  if (!options) options = {};

  // Get CallSites
  SHORTCIRCUIT_CALLSITE = true;
  var obj = {};
  Error.captureStackTrace(obj, collectCallSites);
  var callSites = obj.stack;
  SHORTCIRCUIT_CALLSITE = false;

  // Slice
  callSites = callSites.slice(options.slice || 0);

  // Modify CallSites
  if (options.extend) callSites = this.extend._modify(obj, callSites);
  if (options.filter) callSites = this.filter._modify(obj, callSites);

  // Done
  return callSites;
};

var chain = new stackChain();

function TraceModifier() {
  this._modifiers = [];
}

TraceModifier.prototype._modify = function (error, frames) {
  for (var i = 0, l = this._modifiers.length; i < l; i++) {
    frames = this._modifiers[i](error, frames);
  }

  return frames;
};

TraceModifier.prototype.attach = function (modifier) {
  this._modifiers.push(modifier);
};

TraceModifier.prototype.deattach = function (modifier) {
  var index = this._modifiers.indexOf(modifier);

  if (index === -1) return false;

  this._modifiers.splice(index, 1);
  return true;
};

function StackFormater() {
  this._formater = defaultFormater;
  this._previous = undefined;
}

StackFormater.prototype.replace = function (formater) {
  if (formater) {
    this._formater = formater;
  } else {
    this.restore();
  }
};

StackFormater.prototype.restore  = function () {
  this._formater = defaultFormater;
  this._previous = undefined;
};

StackFormater.prototype._backup = function () {
  this._previous = this._formater;
};

StackFormater.prototype._roolback = function () {
  if (this._previous === defaultFormater) {
    this.replace(undefined);
  } else {
    this.replace(this._previous);
  }

  this._previous = undefined;
};


//
// Set Error.prepareStackTrace thus allowing stack-chain
// to take control of the Error().stack formating.
//

// If there already is a custom stack formater, then set
// that as the stack-chain formater.
if (Error.prepareStackTrace) {
    chain.format.replace(Error.prepareStackTrace);
}

var SHORTCIRCUIT_FORMATER = false;
function prepareStackTrace(error, originalFrames) {
  if (SHORTCIRCUIT_CALLSITE) return originalFrames;
  if (SHORTCIRCUIT_FORMATER) return defaultFormater(error, originalFrames);

  // Make a loss copy of originalFrames
  var frames = originalFrames.concat();

  // extend frames
  frames = chain.extend._modify(error, frames);

  // filter frames
  frames = chain.filter._modify(error, frames);

  // reduce frames to match Error.stackTraceLimit
  frames = frames.slice(0, Error.stackTraceLimit);

  // Set the callSite property
  // But only if it hasn't been explicitly set, otherwise
  // error.stack would have unintended side effects. Check also for
  // non-extensible/sealed objects, such as those from Google's Closure Library
  if (Object.isExtensible(error) &&
      (Object.getOwnPropertyDescriptor(error, "callSite") === undefined)) {
    error.callSite = {
      original: originalFrames,
      mutated: frames
    };
  }

  // format frames
  SHORTCIRCUIT_FORMATER = true;
  var format = chain.format._formater(error, frames);
  SHORTCIRCUIT_FORMATER = false;

  return format;
}

// Replace the v8 stack trace creator
Object.defineProperty(Error, 'prepareStackTrace', {
  'get': function () {
    return prepareStackTrace;
  },

  'set': function (formater) {
    // If formater is prepareStackTrace it means that someone ran
    // var old = Error.prepareStackTrace;
    // Error.prepareStackTrace = custom
    // new Error().stack
    // Error.prepareStackTrace = old;
    // The effect of this, should be that the old behaviour is restored.
    if (formater === prepareStackTrace) {
      chain.format._roolback();
    }
    // Error.prepareStackTrace was set, this means that someone is
    // trying to take control of the Error().stack format. Make
    // them belive they succeeded by setting them up as the stack-chain
    // formater.
    else {
      chain.format._backup();
      chain.format.replace(formater);
    }
  }
});

//
// Manage call site storeage
//
function callSiteGetter() {
  // calculate call site object
  this.stack;

  // return call site object
  return this.callSite;
}

Object.defineProperty(Error.prototype, 'callSite', {
  'get': callSiteGetter,

  'set': function (frames) {
    // In case callSite was set before [[getter]], just set
    // the value
    Object.defineProperty(this, 'callSite', {
        value: frames,
        writable: true,
        configurable: true
    });
  },

  configurable: true
});

module.exports = chain;


/***/ }),

/***/ 3445:
/***/ ((module) => {

module.exports = eval("require")("@opentelemetry/api");


/***/ }),

/***/ 4496:
/***/ ((module) => {

module.exports = eval("require")("@opentelemetry/tracing");


/***/ }),

/***/ 3342:
/***/ ((module) => {

module.exports = eval("require")("applicationinsights-native-metrics");


/***/ }),

/***/ 1910:
/***/ ((module) => {

"use strict";
module.exports = {"i8":"1.7.6"};

/***/ }),

/***/ 5236:
/***/ ((module) => {

"use strict";
module.exports = {"i8":"0.3.1"};

/***/ }),

/***/ 9414:
/***/ ((module) => {

"use strict";
module.exports = {"i8":"1.3.7"};

/***/ }),

/***/ 2357:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 7303:
/***/ ((module) => {

"use strict";
module.exports = require("async_hooks");

/***/ }),

/***/ 3129:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ 7082:
/***/ ((module) => {

"use strict";
module.exports = require("console");

/***/ }),

/***/ 7619:
/***/ ((module) => {

"use strict";
module.exports = require("constants");

/***/ }),

/***/ 6417:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 881:
/***/ ((module) => {

"use strict";
module.exports = require("dns");

/***/ }),

/***/ 8614:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 5747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 8605:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 7211:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 2282:
/***/ ((module) => {

"use strict";
module.exports = require("module");

/***/ }),

/***/ 1631:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 2087:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 5622:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 2413:
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 8213:
/***/ ((module) => {

"use strict";
module.exports = require("timers");

/***/ }),

/***/ 8835:
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 1669:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 8761:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	__webpack_require__.ab = __dirname + "/";/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(3789);
/******/ })()
;