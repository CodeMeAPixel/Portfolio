// This file is deprecated, please use fivemScriptsData.ts instead
import {
    getAllScripts,
    getScriptById,
    getReleasedScripts,
    getInDevelopmentScripts,
    getComingSoonScripts
} from './fivemScriptsData';

export type { FivemScript } from '@/types/fivem';
export {
    getAllScripts,
    getScriptById,
    getReleasedScripts,
    getInDevelopmentScripts,
    getComingSoonScripts
};

// Re-export for backward compatibility
export const fivemScripts = getAllScripts();
