import { Separator } from '@/components/ui/separator'

export default function Footer() {
  return (
    <footer className='bg-gray-900 px-6 py-12'>
      <div className='mx-auto max-w-7xl'>
        <div className='grid gap-8 md:grid-cols-4'>
          <div>
            <div className='mb-4 flex items-center space-x-2'>
              <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-green-500 text-sm font-bold text-black'>
                T3
              </div>
              <span className='text-xl font-bold text-green-500'>Wallet</span>
            </div>
            <p className='text-gray-300'>The most secure and user-friendly cryptocurrency wallet platform.</p>
          </div>
          <div>
            <h4 className='mb-4 font-bold text-white'>Product</h4>
            <ul className='space-y-2 text-gray-300'>
              <li>
                <a href='#' className='transition-colors hover:text-green-400'>
                  Features
                </a>
              </li>
              <li>
                <a href='#' className='transition-colors hover:text-green-400'>
                  Security
                </a>
              </li>
              <li>
                <a href='#' className='transition-colors hover:text-green-400'>
                  Pricing
                </a>
              </li>
              <li>
                <a href='#' className='transition-colors hover:text-green-400'>
                  API
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='mb-4 font-bold text-white'>Support</h4>
            <ul className='space-y-2 text-gray-300'>
              <li>
                <a href='#' className='transition-colors hover:text-green-400'>
                  Help Center
                </a>
              </li>
              <li>
                <a href='#' className='transition-colors hover:text-green-400'>
                  Contact Us
                </a>
              </li>
              <li>
                <a href='#' className='transition-colors hover:text-green-400'>
                  Status
                </a>
              </li>
              <li>
                <a href='#' className='transition-colors hover:text-green-400'>
                  Community
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='mb-4 font-bold text-white'>Legal</h4>
            <ul className='space-y-2 text-gray-300'>
              <li>
                <a href='#' className='transition-colors hover:text-green-400'>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href='#' className='transition-colors hover:text-green-400'>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href='#' className='transition-colors hover:text-green-400'>
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href='#' className='transition-colors hover:text-green-400'>
                  Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Separator className='my-8 bg-gray-700' />
        <div className='text-center text-gray-300'>
          <p>© 2024 TB Wallet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
