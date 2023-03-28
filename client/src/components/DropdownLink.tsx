import Link from 'next/link'
import { Menu } from '@headlessui/react'
import { ButtonHTMLAttributes, ReactNode } from 'react'

type DropdownLinkProps = {
    children: ReactNode
    href: string
}
const DropdownLink = ({ children, ...props }: DropdownLinkProps) => (
    <Menu.Item>
        {({ active }) => (
            <Link
                {...props}
                className={`w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 ${
                    active ? 'bg-gray-100' : ''
                } focus:outline-none transition duration-150 ease-in-out`}>
                {children}
            </Link>
        )}
    </Menu.Item>
)

type DropdownButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode
}
export const DropdownButton = ({ children, ...props }: DropdownButtonProps) => (
    <Menu.Item>
        {({ active }) => (
            <button
                className={`w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 ${
                    active ? 'bg-gray-100' : ''
                } focus:outline-none transition duration-150 ease-in-out`}
                {...props}>
                {children}
            </button>
        )}
    </Menu.Item>
)

export default DropdownLink
