// 代码生成时间: 2025-10-10 03:45:27
 * It includes basic error handling, comments, and documentation to ensure maintainability and scalability.
 */

// Import necessary Gatsby modules
const express = require('express');
const Gatsby = require('gatsby');
const fs = require('fs');
const path = require('path');

// Initialize express app
const app = express();

// Define port for the server
const PORT = process.env.PORT || 8000;

// Create a directory for skills data
const skillsDir = path.join(__dirname, 'skills');

// Ensure the skills directory exists
if (!fs.existsSync(skillsDir)) {
  fs.mkdirSync(skillsDir);
}

// Function to add a new skill
function addSkill(skill) {
  // Check if skill is valid
  if (!skill.name || !skill.description) {
    throw new Error('Invalid skill data');
  }

  // Create a new file for the skill
  const skillPath = path.join(skillsDir, `${skill.name}.json`);
  fs.writeFileSync(skillPath, JSON.stringify(skill, null, 2), 'utf8');

  return skill;
}

// Function to get all skills
function getAllSkills() {
  // Read all skill files from the directory
  const skillFiles = fs.readdirSync(skillsDir).filter(file => file.endsWith('.json'));

  // Parse each skill file and return an array of skills
  return skillFiles.map(file => JSON.parse(fs.readFileSync(path.join(skillsDir, file), 'utf8')));
}

// Express route to add a new skill
app.post('/skills', (req, res) => {
  try {
    const skill = req.body;
    const addedSkill = addSkill(skill);
    res.status(201).json(addedSkill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Express route to get all skills
app.get('/skills', (req, res) => {
  try {
    const skills = getAllSkills();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the Gatsby server
Gatsby.startServer(app, PORT, () => {
  console.log(`Skills Verification Platform server running on port ${PORT}`);
});