/**
 * Copyright (c) 2025 NEXSOFT. All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * in whole or in part, is strictly prohibited without prior written consent
 * from NEXSOFT.
 */

/**
 * Safely escape HTML entities such as `&`, `<`, `>`, `"`, and `'`.
 * @param text - The input to safely escape
 * @returns The escaped input
 */
export function escape(text: string): string {
  const escapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  }
  return String(text).replace(/[&<>'"]/g, (match) => escapeMap[match] || match)
}
