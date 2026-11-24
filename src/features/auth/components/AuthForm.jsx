import { useState } from 'react'
import useInput from '../../../hooks/useInput'
import { login, register } from '../api/authApi'
import { setToken, setUser } from '../../../helpers/apiHelper'
import { showErrorAlert, showSuccessAlert } from '../../../helpers/toolsHelper'

const inputClass =
  'w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-slate-800'

export default function AuthForm({ mode = 'login', onSuccess }) {
  const isLogin = mode === 'login'
  const [email, onEmail] = useInput('')
  const [username, onUsername] = useInput('')
  const [password, onPassword] = useInput('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = isLogin
      ? await login({ username, password })
      : await register({ username, email, password })
    setLoading(false)
    if (res.status === 'success') {
      if (isLogin) {
        const { token, user } = res.data || {}
        setToken(token)
        if (user) setUser(user)
      } else {
        showSuccessAlert(res.message)
      }
      onSuccess?.(res.data)
    } else {
      showErrorAlert(res.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        id={isLogin ? 'login-username' : 'register-username'}
        placeholder="Username"
        className={inputClass}
        value={username}
        onChange={onUsername}
        required
      />
      {!isLogin && (
        <input
          id="register-email"
          type="email"
          placeholder="Email"
          className={inputClass}
          value={email}
          onChange={onEmail}
          required
        />
      )}
      <input
        id={isLogin ? 'login-password' : 'register-password'}
        type="password"
        placeholder="Password"
        className={inputClass}
        value={password}
        onChange={onPassword}
        minLength={isLogin ? undefined : 6}
        required
      />
      <button
        id={isLogin ? 'login-submit' : 'register-submit'}
        type="submit"
        disabled={loading}
        className="w-full rounded bg-[var(--color-accent)] px-3 py-2 text-white dark:text-slate-950 font-medium disabled:opacity-50"
      >
        {isLogin ? 'Masuk' : 'Daftar'}
      </button>
    </form>
  )
}
