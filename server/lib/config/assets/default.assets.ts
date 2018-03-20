const defaultAsset = {
  payload: {
    server: {
      gulpConfig: ['gulpfile.ts'],
      allTS: ['server.ts', 'server/lib/config/*.ts', 'server/modules/**/*.ts', 'gulpfile.ts'],
      config: ['server/modules/**/config/*.ts'],
      models: ['server/modules/**/models/*.ts'],
      routes: ['server/modules/**/routes/**/*.ts'],
      strategies: ['server/modules/**/config/strategies/*.ts'],
      policies: ['server/modules/**/policies/*.ts']
    }
  }
};

export const exportAssets = defaultAsset.payload;
