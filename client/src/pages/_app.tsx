import { NextPage } from 'next'
import { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'

type NextPageWithLayout = NextPage & {
    getLayout?: (page: React.ReactElement) => React.ReactNode
}
interface MyAppProps extends AppProps {
    Component: NextPageWithLayout
}
const App = ({ Component, pageProps }: MyAppProps) => (
    <Component {...pageProps} />
)

export default App
