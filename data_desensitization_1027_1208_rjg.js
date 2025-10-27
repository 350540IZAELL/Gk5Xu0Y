// 代码生成时间: 2025-10-27 12:08:13
// Dependencies
const { createFilePath } = require('gatsby-source-filesystem');
const crypto = require('crypto');

// Desensitization Rules
const desensitizationRules = {
  // Example rule: replace email addresses with hashes
  email: (email) => {
    // Generate a hash from the email
    const hash = crypto.createHash('sha256').update(email).digest('hex');
    return `hash-${hash.substring(0, 8)}`;
  },
  // Add more rules as needed
};

// Function to desensitize data in markdown files
exports.onCreateNode = async ({
  node,
  actions,
  getCache,
}) => {
  const { createNode, createNodeField } = actions;

  // Check if the node is a markdown file
  if (node.internal.type === 'MarkdownRemark') {
    try {
      // Desensitize data in markdown file
      const markdownText = node.rawMarkdownBody;
      let desensitizedText = markdownText;

      // Apply desensitization rules
      Object.keys(desensitizationRules).forEach((rule) => {
        const regex = new RegExp(rule, 'g');
        desensitizedText = desensitizedText.replace(
          regex,
          desensitizationRules[rule]
        );
      });

      // Create a new node with desensitized data
      const desensitizedNode = {
        ...node,
        rawMarkdownBody: desensitizedText,
      };

      // Create a field for the desensitized data
      createNodeField({ node, name: 'desensitizedMarkdown', value: desensitizedText });

      // Create a new node for the desensitized data
      createNode(desensitizedNode);
    } catch (error) {
      console.error(
        'Error desensitizing data in markdown file:',
        error
      );
    }
  }
};
