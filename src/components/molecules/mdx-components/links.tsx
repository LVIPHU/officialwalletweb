/**
 * Copyright (c) 2025 NEXSOFT. All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * in whole or in part, is strictly prohibited without prior written consent
 * from NEXSOFT.
 */

import type { MDXComponents } from 'mdx/types'

/**
 * MDX Link Components
 * Links with proper styling and security attributes
 */
export const mdxLinks: Partial<MDXComponents> = {
  // Links
  a: ({ ...props }) => (
    <a
      className='text-primary underline-offset-4 hover:underline'
      target='_blank'
      rel='noopener noreferrer'
      {...props}
    />
  ),
}
