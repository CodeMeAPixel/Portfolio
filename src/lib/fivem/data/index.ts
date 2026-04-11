import { FivemScript } from "../../../types/fivem";
import pixelLogs from "./pixel-logs";
import spikeGuard from "./spike-guard";
import cfxManager from "./cfx-manager";
import communityCommands from "./community-commands";
import fivem2Discord from "./fivem2discord";
import hiddenObjects from "./hidden-objects";
import specialCharsBlocker from "./special-chars-blocker";
import toxicAntiCheat from "./toxic-anticheat";
import pxLoadingScreen from "./pxLoadingScreen"
import pxCommands from "./pxCommands"
// Import additional scripts here as they are created
// import scriptName from "./script-file-name";

export const allScripts: FivemScript[] = [
    pixelLogs,
    spikeGuard,
    cfxManager,
    communityCommands,
    fivem2Discord,
    hiddenObjects,
    specialCharsBlocker,
    toxicAntiCheat,
    pxLoadingScreen,
    pxCommands
    // Add additional scripts here
];
