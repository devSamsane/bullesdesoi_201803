const defaultProperties = {
  payload: {
    app: {
      title: 'Bulles de Soi',
      description: 'Site web de sophrologie et prise de rendez-vous en ligne',
      keywords:
        'sophrologie, relaxation, gestion du stress, perinatalité, enfance, adolescence',
      version: ''
    },
    server: {
      livereload: false,
      secure: {
        ssl: false,
        privateKey: '../sslcerts/key.pem',
        certificate: '../sslcerts/cert.pem'
      }
    },
    config: {
      helmet: {
        hsts: {
          expiration: 15778476000,
          includeSubdomains: true,
          force: true
        }
      },
      log: {
        fileLogger: {
          directoryPath: process.env.LOG_DIR_PATH || process.cwd(),
          filename: process.env.LOG_FILE || 'app-log.json',
          maxsize: 10485760,
          maxFiles: 2,
          json: true
        }
      },
      db: {
        promise: global.Promise,
        options: {}
      }
    }
  }
};

export const exportDefaultProperties = defaultProperties.payload;
