/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: 'src/web/app',
  assetsBuildDirectory: './public/build',
  publicPath: '/build/',
  serverBuildDirectory: './build',
  devServerPort: 8002,
  ignoredRouteFiles: ['.*']
};
