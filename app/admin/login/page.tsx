"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)

  // Check if admin is already logged in
  useEffect(() => {
    async function checkCurrentSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          router.replace("/admin")
        }
      } catch (err) {
        console.error("Session check error:", err)
      } finally {
        setCheckingAuth(false)
      }
    }
    checkCurrentSession()
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      })

      if (error) {
        throw error
      }

      if (data.session) {
        router.replace("/admin")
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Gagal masuk. Periksa kembali email & password Anda."
      setErrorMsg(message)
    } finally {
      setLoading(false)
    }
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-surface-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-container border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-black flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-secondary-container/20 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-primary-container/20 blur-[120px] pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-surface-container-high/70 backdrop-blur-xl border border-outline-variant/30 shadow-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-container/20 text-primary-container mb-3 border border-primary-container/30">
            <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
          </div>
          <h1 className="font-headline-display text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
            Admin Portal
          </h1>
          <p className="font-body-md text-xs sm:text-sm text-text-muted mt-1">
            Masuk untuk mengelola sertifikasi &amp; portofolio
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3.5 rounded-xl bg-error/15 border border-error/40 text-error text-xs flex items-start gap-2">
            <span className="material-symbols-outlined text-base shrink-0 mt-0.5">error</span>
            <div className="leading-relaxed">{errorMsg}</div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-on-surface-variant mb-1.5">
              Email Admin
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@portfolio.com"
              className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-text-primary placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent text-sm transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-on-surface-variant mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-text-primary placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent text-sm transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-text-primary transition-colors cursor-pointer"
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                <span className="material-symbols-outlined text-lg">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 px-4 rounded-xl bg-primary-container text-surface-black font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-primary-container/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-surface-black border-t-transparent rounded-full animate-spin" />
                <span>Memverifikasi...</span>
              </>
            ) : (
              <>
                <span>Masuk Dashboard</span>
                <span className="material-symbols-outlined text-base">login</span>
              </>
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-6 pt-4 border-t border-outline-variant/20 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-primary-container transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Kembali ke Halaman Portofolio</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
