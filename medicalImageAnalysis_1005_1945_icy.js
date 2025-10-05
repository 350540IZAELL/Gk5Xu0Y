// 代码生成时间: 2025-10-05 19:45:27
// 引入Gatsby所需的核心模块和API
const path = require('path')
# 增强安全性

// 创建一个Gatsby Node API实现，用于生成医学影像分析页面
async function createMedicalImageAnalysisPages({ actions, graphql }) {
  const { createPage } = actions

  // 查询所有医学影像分析的Markdown文件
# 增强安全性
  const result = await graphql(
    """
# 改进用户体验
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
# FIXME: 处理边界情况
              path
              title
            }
          }
        }
      }
    }
    """
  )

  // 错误处理
  if (result.errors) {
    throw new Error(result.errors)
  }

  // 遍历查询结果，为每个Markdown文件创建一个页面
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const title = node.frontmatter.title
    const path = node.frontmatter.path

    // 创建医学影像分析页面
    createPage({
      path: path,
      component: path.resolve(`./src/templates/medicalImageAnalysisTemplate.js`),
      context: {
        title: title,
        path: path,
      },
    })
  })
}

// 导出Gatsby Node API实现
module.exports.onCreateNode = createMedicalImageAnalysisPages