const defaultProperties = {
  payload : {
    app: {
      title: 'Bulles de Soi',
      description: 'Site web de sophrologie et prise de rendez-vous en ligne',
      keywords: 'sophrologie, relaxation, gestion du stress, perinatalité, enfance, adolescence',
      version: ''
    },
    server: {
      livereload: false
    },
    config: {
      helmet: {
        hsts: {
          expiration: 15778476000,
          includeSubdomains: true,
          force: true
        }
      }
    }
  }
};

export const exportDefaultProperties = defaultProperties.payload;
