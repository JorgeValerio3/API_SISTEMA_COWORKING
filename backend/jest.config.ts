export default {
    preset: 'ts-jest/presets/default-esm', // Use ESM preset
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1', // Remap .js imports to .ts
    },
    transform: {
        // transform ts files with ts-jest
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                useESM: true, // Force ESM mode
            },
        ],
    },
};
