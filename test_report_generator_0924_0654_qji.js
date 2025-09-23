// 代码生成时间: 2025-09-24 06:54:17
// Import necessary modules
const fs = require('fs');
const path = require('path');
const { createRemoteFileNode } = require('gatsby-source-filesystem');

// Function to read test data from a JSON file or API
async function readTestData() {
  try {
    // Simulate reading data from a file or API
    // In a real scenario, you'd replace this with actual file reading or API calls
    const testData = JSON.parse(fs.readFileSync(path.join(__dirname, 'testData.json'), 'utf8'));
    return testData;
  } catch (error) {
    console.error('Error reading test data:', error);
    throw error;
  }
}

// Function to generate test report
function generateTestReport(data) {
  // Process the data to generate the report
  // This is a simple example and would be more complex in a real scenario
  const report = `\
Test Report:\
${data.map(test => `${test.name}: ${test.result}`).join('\
')}\
`;
  return report;
}

// Gatsby Node.js API to create a test report page
exports.onCreateNode = async ({ node, actions }) => {
  if (node.internal.type === 'Test') {
    const { createNodeField } = actions;
    const testReport = generateTestReport(node.testResults);
    createNodeField({
      node,
      name: 'testReport',
      value: testReport,
    });
  }
};

// Gatsby Node.js API to create pages
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const result = await graphql(
    "query {
      allTest {
        edges {
          node {
            id
            testReport {
              testReport
            }
          }
        }
      }
    }"
  );
  if (result.errors) {
    throw result.errors;
  }

  result.data.allTest.edges.forEach(({ node }) => {
    createPage({
      path: `/test-report/${node.id}`,
      component: require.resolve('./src/templates/TestReportTemplate.js'),
      context: {
        id: node.id,
        testReport: node.testReport.testReport,
      },
    });
  });
};

// Template for the Test Report page
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: true }
            }
          ]
        }
      ]
    }
  });
};
