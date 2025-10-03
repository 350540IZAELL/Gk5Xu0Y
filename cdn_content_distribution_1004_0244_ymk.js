// 代码生成时间: 2025-10-04 02:44:21
const axios = require('axios'); // 引入axios库用于HTTP请求
const cheerio = require('cheerio'); // 引入cheerio库用于解析HTML
const fs = require('fs'); // 引入fs库用于文件操作
const path = require('path'); // 引入path库用于路径操作

// 定义CDN内容分发类
class CDNContentDistribution {
  // 构造函数
  constructor(cdnUrl, localPath) {
    this.cdnUrl = cdnUrl; // CDN的基础URL
    this.localPath = localPath; // 本地存储路径
  }

  // 下载CDN上的文件
  async downloadFile(url) {
    try {
      const response = await axios.get(url, { responseType: 'stream' });
      const filename = path.basename(url); // 获取文件名
      const localFilePath = path.join(this.localPath, filename); // 构建本地文件路径

      const writer = fs.createWriteStream(localFilePath);
      response.data.pipe(writer);
      return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
    } catch (error) {
      throw new Error(`下载文件失败: ${error.message}`);
    }
  }

  // 解析CDN页面并下载所有资源
  async downloadAllResources(pageUrl) {
    try {
      const response = await axios.get(pageUrl);
      const $ = cheerio.load(response.data); // 使用cheerio解析HTML

      const resources = [];
      $('link[rel="stylesheet"], script').each((i, elem) => {
        const src = $(elem).attr('src');
        if (src) {
          resources.push(src); // 收集所有资源
        }
      });

      for (const resource of resources) {
        await this.downloadFile(resource); // 下载每个资源
      }
    } catch (error) {
      throw new Error(`解析页面失败: ${error.message}`);
    }
  }
}

// 使用示例
const cdnUrl = 'https://example.com/cdn';
const localPath = './cdn-content';

// 创建CDN内容分发实例
const cdn = new CDNContentDistribution(cdnUrl, localPath);

// 下载页面资源
async function downloadPageResources(pageUrl) {
  try {
    await cdn.downloadAllResources(pageUrl);
    console.log('资源下载完成');
  } catch (error) {
    console.error('资源下载失败:', error.message);
  }
}

// 调用函数，下载示例页面资源
downloadPageResources(`${cdnUrl}/example-page.html`);