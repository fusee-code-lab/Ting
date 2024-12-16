const bytecode = require('./plugins/bytecode');

exports.default = async ({ packager }) => {
  try {
    //v8字节码  如果在windows64下打包32位请先将electron 切换到32位
    let arch = packager.appInfo.platformSpecificOptions.target[0].arch[0];
    await bytecode(arch);
  } catch (err) {
    console.error(err);
  }
};
