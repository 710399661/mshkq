

module.exports = function nodeTj(allPlugin, host) {

//   Beacon.init('0NODEXPZ4M4H7A3J', {
//     enableDebug: false,
//     versionCode: '1.4.22'
//   });

// //   Beacon.addInterceptor({
// //     onAddEvent: (event, overview) => {
// //       console.log('Event added ', event.name)
// //       event.addParam('key', 'value')
// //     },
// //     onSendSuccess: (eventList) => {
// //       console.log('onSendSuccess 2 ', eventList.length)
// //     },
// //     onSendFail: (eventList, error) => {
// //       console.log('onSendFail ', eventList.length, error)
// //     }
// //   })

//   for ( let key in allPlugin ) {
//     const target = allPlugin[key];
//     for (let hookName in target) {
//       const currHookName = target[hookName];
//       for (let plugin in currHookName) {
//         const currPlugin = currHookName[plugin];
//         Beacon.onEvent('plugin_register', {
//           host: host,
//           page_platform: 'mini',
//           plugin_name_en: currPlugin.pluginName,
//           plugin_target: key,
//           plugin_hookName: hookName,
//           plugin_version: currPlugin.version,
//           plugin_app_id: currPlugin.appid,
//           plugin_type: currPlugin.type,
//           plugin_author_email: currPlugin.author.email,
//           plugin_author_name: currPlugin.author.name,
//           plugin_path: currPlugin.path || '',
//           page_url: '/',
//           plugin_platform_mini: currPlugin.platform.indexOf('mini') !== -1 ? 1 : 0,
//           plugin_platform_pc: 0,
//           plugin_platform_h5: 0,
//         })
//       }
//     }
//   }
}
