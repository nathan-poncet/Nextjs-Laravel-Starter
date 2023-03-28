import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'
import { ReactNode } from 'react'

type Props = {
    header: ReactNode | ReactNode[]
    children: ReactNode | ReactNode[]
}
const AppLayout = ({ header, children }: Props) => {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <div className="min-h-screen bg-gray-100">
            {user && <Navigation user={user} />}

            {/* Page Heading */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {header}
                </div>
            </header>

            {/* Page Content */}
            <main>{children}</main>
        </div>
    )
}

export default AppLayout
