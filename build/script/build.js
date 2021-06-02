const fs = require('fs');
const { name } = require('../../package.json');
const config = require('../cfg/build.json');
const appConfig = require('../../src/cfg/index.json');
const webpack = require('webpack');
const path = require('path');
const main = require('./webpack.main.config'); //主进程
const renderer = require('./webpack.renderer.config'); //子进程

/**  config配置  **/
const updateCfg = {
  //更新配置
  provider: 'generic',
  url: 'http://127.0.0.1:3000/', //程序更新地址
  fileUrl: 'http://127.0.0.1:3000/public/', //更新文件地址
  name: `${name.toLowerCase()}-updater` //本地更新文件佳名称
};
config.productName = name;
config.appId = `org.${name}`;
config.npmRebuild = true; //是否Rebuild编译
config.asar = true; //是否asar打包
config.publish = [
  {
    provider: updateCfg.provider,
    url: updateCfg.url
  }
];
appConfig.updateFileUrl = updateCfg.fileUrl;
appConfig.updaterCacheDirName = updateCfg.name;

/** win配置 */
config.nsis.displayLanguageSelector = false; //安装包语言提示
config.nsis.menuCategory = false; //是否创建开始菜单目录
config.nsis.shortcutName = name; //快捷方式名称(可中文)
config.nsis.allowToChangeInstallationDirectory = true; //是否允许用户修改安装为位置
config.win.requestedExecutionLevel = ['asInvoker', 'highestAvailable'][0]; //应用权限
config.win.target = [];
// config.win.target.push({ //单文件
//     "target": "portable"
//     // "arch": ["x64"]
// });
config.win.target.push({
  //nsis打包
  target: 'nsis',
  arch: ['ia32']
});
let nsh = '';
if (config.nsis.allowToChangeInstallationDirectory) {
  nsh =
    '!macro customHeader\n' +
    '\n' +
    '!macroend\n' +
    '\n' +
    '!macro preInit\n' +
    '\n' +
    '!macroend\n' +
    '\n' +
    '!macro customInit\n' +
    '    ReadRegStr $0 HKLM "Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall" "UninstallString"\n' +
    '    ${If} $0 != ""\n' +
    '       # ExecWait $0 $1\n' +
    '    ${EndIf}\n' +
    '!macroend\n' +
    '\n' +
    '!macro customInstall\n' +
    '\n' +
    '!macroend\n' +
    '\n' +
    '!macro customInstallMode\n' +
    '   # set $isForceMachineInstall or $isForceCurrentInstall\n' +
    '   # to enforce one or the other modes.\n' +
    '   #set $isForceMachineInstall\n' +
    '!macroend';
} else {
  nsh =
    '; Script generated by the HM NIS Edit Script Wizard.\n' +
    '\n' +
    '; HM NIS Edit Wizard helper defines custom install default dir\n' +
    '!macro preInit\n' +
    '    SetRegView 64\n' +
    '    WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "$LOCALAPPDATA\\' +
    name +
    '"\n' +
    '    WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "$LOCALAPPDATA\\' +
    name +
    '"\n' +
    '    SetRegView 32\n' +
    '    WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "$LOCALAPPDATA\\' +
    name +
    '"\n' +
    '    WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "$LOCALAPPDATA\\' +
    name +
    '"\n' +
    '!macroend';
}

/** linux配置 **/
config.linux.target = ['AppImage', 'snap', 'deb', 'rpm', 'pacman'][0];
config.linux.executableName = name;

fs.writeFileSync('./build/cfg/build.json', JSON.stringify(config, null, 2));
fs.writeFileSync('./build/cfg/installer.nsh', nsh);
fs.writeFileSync('./src/cfg/index.json', JSON.stringify(appConfig, null, 2));

function deleteFolderRecursive(url) {
  let files = [];
  if (fs.existsSync(url)) {
    files = fs.readdirSync(url);
    files.forEach(function (file, index) {
      let curPath = path.join(url, file);
      if (fs.statSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(url);
  } else {
    console.log('...');
  }
}

deleteFolderRecursive(path.resolve('dist')); //清除dist
webpack([{ ...main('production') }, { ...renderer('production') }], (err, stats) => {
  if (err || stats.hasErrors()) {
    // 在这里处理错误
    throw err;
  }
  console.log('ok');
});
