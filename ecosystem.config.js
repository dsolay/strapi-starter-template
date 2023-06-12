module.exports = {
  apps: [
    {
      name: 'moviapp',
      script: 'yarn',
      args: 'start',
      interpreter: '/bin/sh',
      env_production: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'development',
      },
    },
  ],
}
