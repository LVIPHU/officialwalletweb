/**
 * Copyright (c) 2025 NEXSOFT. All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * in whole or in part, is strictly prohibited without prior written consent
 * from NEXSOFT.
 */

/**
 * Formats FAQ answer text by adding line breaks before numbered steps
 *
 * Converts patterns like "1. Step one. 2. Step two." into:
 * "1. Step one.\n2. Step two."
 *
 * Also handles cases with introductory text:
 * "If a transaction fails: 1. Check... 2. Verify..." becomes:
 * "If a transaction fails:\n1. Check...\n2. Verify..."
 *
 * @param text - The FAQ answer text to format
 * @returns Formatted text with line breaks before numbered steps
 *
 * @example
 * ```typescript
 * formatFAQAnswer("1. Step one. 2. Step two.")
 * // Returns: "1. Step one.\n2. Step two."
 *
 * formatFAQAnswer("If a transaction fails: 1. Check... 2. Verify...")
 * // Returns: "If a transaction fails:\n1. Check...\n2. Verify..."
 * ```
 */
export function formatFAQAnswer(text: string): string {
  if (!text) return text

  // Pattern to match numbered steps: "N. " where N is 1-99
  const stepPattern = /\d+\.\s/

  // Check if text contains numbered steps
  if (!stepPattern.test(text)) {
    return text
  }

  let formatted = text

  // Handle cases where step starts after colon (e.g., "If fails: 1. Check")
  // Replace ": N. " with ":\nN. "
  formatted = formatted.replace(/(:\s+)(\d+\.\s)/g, ':\n$2')

  // Replace space before numbered steps with newline
  // Pattern: any character (not newline) followed by space(s) and "N. "
  // This handles cases like "text 1. Step" or "text  2. Step"
  formatted = formatted.replace(/([^\n])(\s+)(\d+\.\s)/g, (match, before, spaces, step) => {
    // Don't add newline if the character before is already a period (might be part of a sentence)
    // But do add if it's clearly a step pattern
    if (before === '.') {
      // Check if this looks like end of sentence before a step
      // If there's a period followed by space and number, it's likely a new step
      return `${before}\n${step}`
    }
    return `${before}\n${step}`
  })

  return formatted
}
