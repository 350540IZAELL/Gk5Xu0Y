// 代码生成时间: 2025-10-17 03:14:23
 * Usage:
 *   gatsby build
 *   gatsby develop
 */

// Import necessary modules and dependencies
const React = require('react');
const { graphql, Link } = require('gatsby');

// Define the Data Annotation component
class DataAnnotation extends React.Component {
  // Constructor for initializing state
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      annotations: [],
      newAnnotation: {
        text: "",
        type: ""
      },
      error: null
    };
  }

  // Method to handle form submission for adding a new annotation
  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Here you would add logic to save the annotation to a database
      // For now, just update the state to show the new annotation
      const updatedAnnotations = this.state.annotations.concat(this.state.newAnnotation);
      this.setState({ annotations: updatedAnnotations, newAnnotation: { text: '', type: '' } });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  // Method to handle changes in the annotation form fields
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      newAnnotation: { ...prevState.newAnnotation, [name]: value }
    }));
  };

  // Render method to display the component
  render() {
    const { annotations, newAnnotation, error } = this.state;
    return (
      <div>
        <h1>Data Annotation Platform</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="text"
            value={newAnnotation.text}
            onChange={this.handleChange}
            placeholder="Enter annotation text"
          />
          <select name="type" value={newAnnotation.type} onChange={this.handleChange}>
            <option value="">Select type</option>
            <option value="positive">Positive</option>
            <option value="negative">Negative</option>
          </select>
          <button type="submit">Add Annotation</button>
        </form>
        <ul>
          {annotations.map((annotation, index) => (
            <li key={index}>{annotation.text} - {annotation.type}</li>
          ))}
        </ul>
      </div>
    );
  }
}

// Export the component for use in Gatsby
module.exports = DataAnnotation;
