import * as fs from 'fs';
import * as path from 'path';

// 递归创建目录 异步方法
export const mkdirs = (dirname, callback) => {
  fs.exists(dirname, exists => {
    if (exists) {
      callback();
    } else {
      // console.log(path.dirname(dirname));
      mkdirs(path.dirname(dirname), () => {
        fs.mkdir(dirname, callback);
      });
    }
  });
};

// 递归创建目录 同步方法
export const mkdirsSync = async dirname => {
  // console.log(dirname);
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      await fs.mkdirSync(dirname);
      return true;
    }
  }
};
// 同步删除指定目录下的所前目录和文件,包括当前目录
export const rmdirsSync = async targetPath => {
  try {
    let files = [];
    if (fs.existsSync(targetPath)) {
      files = fs.readdirSync(targetPath);
      files.forEach((file, index) => {
        const curPath = targetPath + '/' + file;
        if (fs.statSync(curPath).isDirectory()) {
          // recurse
          if (!rmdirsSync(curPath)) return false;
        } else {
          // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(targetPath);
    }
  } catch (e) {
    console.error(`remove director fail! path=${targetPath} errorMsg:${e}`);
    return false;
  }
  return true;
};

// 删除所有的文件(将所有文件夹置空)
export const emptyDir = fileUrl => {
  const files = fs.readdirSync(fileUrl); // 读取该文件夹
  files.forEach(file => {
    const stats = fs.statSync(fileUrl + '/' + file);
    if (stats.isDirectory()) {
      emptyDir(fileUrl + '/' + file);
    } else {
      fs.unlinkSync(fileUrl + '/' + file);
      console.log(`删除文件${fileUrl}/${file}成功`);
    }
  });
};

// 删除所有的空文件夹
export const rmEmptyDir = async fileUrl => {
  try {
    const files = fs.readdirSync(fileUrl);
    if (files.length > 0) {
      let tempFile = 0;
      files.forEach(fileName => {
        tempFile++;
        rmEmptyDir(fileUrl + '/' + fileName);
      });
      if (tempFile === files.length) {
        // 删除母文件夹下的所有字空文件夹后，将母文件夹也删除
        fs.rmdirSync(fileUrl);
        console.log('删除空文件夹' + fileUrl + '成功');
      }
    } else {
      fs.rmdirSync(fileUrl);
      console.log('删除空文件夹' + fileUrl + '成功');
    }
  } catch (error) {
    return false;
  }
};
