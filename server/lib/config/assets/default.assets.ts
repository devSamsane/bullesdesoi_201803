const defaultAsset = {
  payload: {
    server: {
      gulpConfig: ['gulpfile.ts'],
      allTS: ['server.ts', 'server/lib/config/*.ts', 'server/modules/**/*.ts', 'gulpfile.ts'],
      config: ['server/modules/**/config/**/*.ts'],
      models: ['server/modules/**/models/**/*.ts'],
      routes: ['server/modules/**/routes/**/*.ts'],
    }
  }
};

export const exportAssets = defaultAsset.payload;
