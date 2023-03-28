import { LabelHTMLAttributes, ReactNode } from 'react'

type Props = LabelHTMLAttributes<HTMLLabelElement> & {
    className?: string
    children: ReactNode
}
const Label = ({ className, children, ...props }: Props) => (
    <label
        className={`${className} block font-medium text-sm text-gray-700`}
        {...props}>
        {children}
    </label>
)

export default Label
