// 代码生成时间: 2025-09-29 02:42:23
// Mock database to store file versions
const database = {
  files: {},
  commits: []
};

/**
 * Represents a simple file system file
 *
 * @param {String} name - The name of the file
 * @param {String} content - The content of the file
 */
class File {
  constructor(name, content) {
    this.name = name;
    this.content = content;
  }
}

/**
 * Represents a commit in the version control system
 *
 * @param {String} message - The commit message
 * @param {File[]} files - An array of files being committed
 */
class Commit {
  constructor(message, files) {
    this.message = message;
    this.files = files;
  }
}

/**
 * Adds a new file to the system
 *
 * @param {String} name - The name of the file to add
 * @param {String} content - The content of the file
 */
function addFile(name, content) {
  if (database.files[name]) {
    throw new Error("File already exists.");
  }
  database.files[name] = new File(name, content);
}

/**
 * Commits the current state of files
 *
 * @param {String} message - The commit message
 */
function commit(message) {
  const filesToCommit = Object.values(database.files).map(file => new File(file.name, file.content));
  database.commits.push(new Commit(message, filesToCommit));
  console.log(`Committed: ${message}`);
}

/**
 * Retrieves the history of commits
 *
 * @returns {Commit[]} - An array of commits
 */
function getHistory() {
  return database.commits;
}

// Example usage
try {
  addFile("README.md", "# Project README");
  commit("Initial commit");
  addFile("index.js", "console.log('Hello World');");
  commit("Add index.js file");

  console.log(getHistory());
} catch (error) {
  console.error(error.message);
}
