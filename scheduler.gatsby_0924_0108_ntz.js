// 代码生成时间: 2025-09-24 01:08:49
 * This scheduler can be used to run tasks at specific intervals.
 */

// Import Node.js modules
const { scheduleJob } = require('node-cron');

// Define the Scheduler class
class Scheduler {
  // Initialize the scheduler with a task and interval
  constructor(task, interval) {
    this.task = task;
    this.interval = interval;
  }

  // Start the scheduled task
  start() {
    try {
      // Schedule the task to run at the specified interval
      this.job = scheduleJob(this.interval, this.task);
      console.log(`Scheduled task has been started at interval: ${this.interval}`);
    } catch (error) {
      console.error('Error starting the scheduled task:', error);
    }
  }

  // Stop the scheduled task
  stop() {
    if (this.job) {
      this.job.cancel();
      console.log('Scheduled task has been stopped.');
    } else {
      console.error('No scheduled task to stop.');
    }
  }
}

// Example usage:
// Define a simple task function
const myTask = () => {
  console.log('Task is running!');
};

// Create a new scheduler instance with the task and interval (e.g., every 5 seconds)
const scheduler = new Scheduler(myTask, '*/5 * * * *');

// Start the scheduler
scheduler.start();

// To stop the scheduler, call scheduler.stop()
// scheduler.stop();