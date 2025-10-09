// 代码生成时间: 2025-10-09 21:35:43
 * const solver = new DynamicProgrammingSolver();
 * console.log(solver.solveFibonacci(10));
 */

class DynamicProgrammingSolver {

  constructor() {
    // No special initialization needed for this example
  }

  /**
   * Solves the Fibonacci sequence problem using dynamic programming.
   *
   * @param {number} n - The index of the Fibonacci sequence to solve for.
   * @returns {number} The nth number in the Fibonacci sequence.
   * @throws {Error} If n is a negative number.
   */
  solveFibonacci(n) {
    // Error handling for negative numbers
    if (n < 0) {
      throw new Error("n must be a non-negative number");
    }

    // Base cases for dynamic programming
    if (n === 0) {
      return 0;
    }
    if (n === 1) {
      return 1;
    }

    // Initialize the base cases in an array for dynamic programming
    let fibSequence = [0, 1];

    // Calculate the rest of the Fibonacci sequence using dynamic programming
    for (let i = 2; i <= n; i++) {
      fibSequence[i] = fibSequence[i - 1] + fibSequence[i - 2];
    }

    return fibSequence[n];
  }
}

// Export the module if needed for use in other files
// module.exports = DynamicProgrammingSolver;

/**
 * Example usage:
 *
 * const solver = new DynamicProgrammingSolver();
 * console.log(solver.solveFibonacci(10)); // Should output 55
 */