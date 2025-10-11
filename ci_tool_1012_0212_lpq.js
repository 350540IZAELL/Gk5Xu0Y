// 代码生成时间: 2025-10-12 02:12:19
// 引入必要的Gatsby API和Node.js核心模块
const { onPreBootstrap } = require(`gatsby`);
const { exec } = require(`child_process`);

// 定义持续集成工具的主要功能
module.exports = async function(ciTool) {
  // 在Gatsby站点启动前执行
  onPreBootstrap(async () => {
    try {
      // 执行测试命令
      console.log(`Running tests...`);
      await exec("npm run test", (error, stdout, stderr) => {
        if (error) {
          console.error(`Test error: ${error.message}`);
          throw error;
        }
        if (stderr) {
          console.error(`Test stderr: ${stderr}`);
          throw new Error(stderr);
        }
        console.log(stdout);
      });

      // 执行构建命令
      console.log(`Building site...`);
      await exec("gatsby build", (error, stdout, stderr) => {
        if (error) {
          console.error(`Build error: ${error.message}`);
          throw error;
        }
        if (stderr) {
          console.error(`Build stderr: ${stderr}`);
          throw new Error(stderr);
        }
        console.log(stdout);
      });

      console.log(`CI process completed successfully.`);
    } catch (error) {
      console.error(`CI process encountered an error: ${error.message}`);
    }
  });
};
