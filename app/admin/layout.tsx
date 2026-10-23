"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const isLoginPage = pathname === "/admin/login"

  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(!isLoginPage)

  useEffect(() => {
    if (isLoginPage) return

    async function checkAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          router.replace("/admin/login")
          return
        }
        setUserEmail(session.user?.email || "Admin")
      } catch (err) {
        console.error("Auth check error:", err)
        router.replace("/admin/login")
      } finally {
        setCheckingAuth(false)
      }
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session && !isLoginPage) {
          router.replace("/admin/login")
        } else if (session) {
          setUserEmail(session.user?.email || "Admin")
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [router, isLoginPage])

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      router.replace("/admin/login")
    } catch (err) {
      console.error("Logout error:", err)
    }
  }

  // If on login page, render login page directly without admin chrome
  if (isLoginPage) {
    return <>{children}</>
  }

  // Loading state while checking auth
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-surface-black flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-primary-container border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-text-muted">Memuat Dashboard Admin...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-black text-on-surface flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-surface-container-lowest/90 backdrop-blur-xl border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-primary-container flex items-center justify-center text-surface-black font-extrabold text-sm shadow-sm group-hover:scale-105 transition-transform">
                V
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-text-primary tracking-tight">
                  Porto Dashboard
                </span>
                <span className="text-[10px] font-mono text-primary-container uppercase tracking-wider">
                  Admin Console
                </span>
              </div>
            </Link>
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container-high/60 text-xs text-text-primary border border-outline-variant/30 hover:border-primary-container/40 hover:text-primary-container transition-all"
            >
              <span className="material-symbols-outlined text-sm">open_in_new</span>
              <span>Lihat Portofolio</span>
            </Link>

            {userEmail && (
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant/20 text-xs text-text-muted">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span className="truncate max-w-[180px]">{userEmail}</span>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-error/10 text-error border border-error/30 hover:bg-error/20 text-xs font-semibold transition-all cursor-pointer"
              title="Keluar dari akun admin"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-outline-variant/20 py-4 text-center text-xs text-on-surface-variant">
        <span>Portfolio Management Console &bull; Connected to Supabase</span>
      </footer>
    </div>
  )
}
