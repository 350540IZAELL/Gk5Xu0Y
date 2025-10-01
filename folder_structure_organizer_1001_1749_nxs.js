// 代码生成时间: 2025-10-01 17:49:39
const fs = require('fs').promises;
const path = require('path');

class FolderStructureOrganizer {
  // 构造函数
  constructor(sourceDir, targetDir) {
    this.sourceDir = sourceDir;
    this.targetDir = targetDir;
  }

  // 检查目录是否存在
  async checkDirectoryExists(dir) {
    try {
      await fs.access(dir);
      return true;
    } catch (err) {
      return false;
    }
  }

  // 创建目录
  async createDirectory(dir) {
    try {
      await fs.mkdir(dir, { recursive: true });
    } catch (err) {
      console.error(`创建目录失败: ${dir}`, err);
      throw err;
    }
  }

  // 复制文件
  async copyFile(source, target) {
    try {
      await fs.copyFile(source, target);
    } catch (err) {
      console.error(`复制文件失败: ${source} -> ${target}`, err);
      throw err;
    }
  }

  // 整理文件夹结构
  async organize() {
    if (!this.sourceDir || !this.targetDir) {
      console.error('源目录和目标目录不能为空');
      throw new Error('源目录和目标目录不能为空');
    }

    // 检查源目录和目标目录是否存在
    if (!await this.checkDirectoryExists(this.sourceDir)) {
      console.error(`源目录不存在: ${this.sourceDir}`);
      throw new Error(`源目录不存在: ${this.sourceDir}`);
    }
    if (!await this.checkDirectoryExists(this.targetDir)) {
      console.error(`目标目录不存在: ${this.targetDir}`);
      throw new Error(`目标目录不存在: ${this.targetDir}`);
    }

    // 读取源目录中的所有文件和子目录
    const items = await fs.readdir(this.sourceDir, { withFileTypes: true });
    for (const item of items) {
      const sourcePath = path.join(this.sourceDir, item.name);
      const targetPath = path.join(this.targetDir, item.name);

      if (item.isDirectory()) {
        // 如果是目录，则递归调用整理函数
        await this.createDirectory(targetPath);
        await this.organize(sourcePath, targetPath);
      } else if (item.isFile()) {
        // 如果是文件，则复制到目标目录
        await this.copyFile(sourcePath, targetPath);
      } else {
        console.warn(`未知项目类型: ${sourcePath}`);
      }
    }
  }
}

// 示例用法
(async () => {
  try {
    const organizer = new FolderStructureOrganizer('./src', './dist');
    await organizer.organize();
    console.log('文件夹结构整理完成');
  } catch (err) {
    console.error('文件夹结构整理失败', err);
  }
})();