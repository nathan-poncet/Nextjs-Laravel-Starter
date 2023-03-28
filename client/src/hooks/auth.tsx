import useSWR from 'swr'
import axios from '@/lib/axios'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Url } from 'next/dist/shared/lib/router/router'
import { UserSchema, UserType } from '@/features/auth/data/user'

type UseAuthProps = {
    middleware?: 'guest' | 'auth'
    redirectIfAuthenticated?: Url
}
export const useAuth = ({
    middleware,
    redirectIfAuthenticated,
}: UseAuthProps = {}) => {
    const router = useRouter()

    const { data: user, error, mutate } = useSWR<UserType>(
        '/api/user',
        () =>
            axios
                .get('/api/user')
                .then(res => UserSchema.parse(res.data))
                .catch(error => {
                    if (error.response.status !== 409) throw error

                    router.push('/verify-email')
                }) as any,
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    type RegisterProps = {
        setErrors: Dispatch<SetStateAction<Record<string, []>>>
        [k: string]: any
    }
    const register = async ({ setErrors, ...props }: RegisterProps) => {
        await csrf()

        setErrors({})

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    type LoginProps = {
        setErrors: Dispatch<SetStateAction<Record<string, []>>>
        setStatus: Dispatch<SetStateAction<string | null>>
        [k: string]: any
    }
    const login = async ({ setErrors, setStatus, ...props }: LoginProps) => {
        await csrf()

        setErrors({})
        setStatus(null)

        axios
            .post('/login', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    type ForgotPasswordProps = {
        setErrors: Dispatch<SetStateAction<Record<string, []>>>
        setStatus: Dispatch<SetStateAction<string | null>>
        [k: string]: any
    }
    const forgotPassword = async ({
        setErrors,
        setStatus,
        email,
    }: ForgotPasswordProps) => {
        await csrf()

        setErrors({})
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    type ResetPasswordProps = {
        setErrors: Dispatch<SetStateAction<Record<string, []>>>
        setStatus: Dispatch<SetStateAction<string | null>>
        [k: string]: any
    }
    const resetPassword = async ({
        setErrors,
        setStatus,
        ...props
    }: ResetPasswordProps) => {
        await csrf()

        setErrors({})
        setStatus(null)

        axios
            .post('/reset-password', { token: router.query.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    type ResendEmailVerificationProps = {
        setStatus: Dispatch<SetStateAction<string | null>>
    }
    const resendEmailVerification = ({
        setStatus,
    }: ResendEmailVerificationProps) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }

        window.location.pathname = '/login'
    }

    useEffect(() => {
        console.log('dmsikamdoisaj', redirectIfAuthenticated, user)

        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated ?? '/')
        if (middleware === 'auth' && error) logout()
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
