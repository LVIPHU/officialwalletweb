/**
 * Copyright (c) 2025 NEXSOFT. All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * in whole or in part, is strictly prohibited without prior written consent
 * from NEXSOFT.
 */

export function scrollToId(id = '', offset = 0, behavior: ScrollBehavior | undefined = 'smooth') {
  const element = document.getElementById(id)
  if (!element) return

  const elementPosition = element.getBoundingClientRect().top + window.scrollY
  const offsetPosition = elementPosition - offset

  window.scrollTo({
    top: offsetPosition,
    behavior,
  })
}

/**
 * Decode URL encoded hash selector for safe querySelector usage
 * Handles Unicode characters in hash (e.g., #vi-%E7%94%A8%E6%88%B7...)
 * @param hash - Hash string with # prefix (e.g., "#vi-%E7%94%A8%E6%88%B7")
 * @returns Decoded hash string safe for querySelector, or original hash if decode fails
 */
export function decodeHashSelector(hash: string): string {
  if (!hash || !hash.startsWith('#')) {
    return hash
  }

  try {
    const id = hash.slice(1)
    const decodedId = decodeURIComponent(id)

    return `#${CSS.escape(decodedId)}`
  } catch {
    return CSS.escape(hash)
  }
}
