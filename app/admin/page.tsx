"use client"

import { useState, useEffect, useCallback } from "react"
import { supabase, Certificate, getCertificateImageUrl } from "@/lib/supabase"
import Image from "next/image"

interface FormState {
  title: string
  issuer: string
  credential_id: string
  credential_url: string
  issued_at: string
  description: string
  skills_input: string
  image_path: string
  is_published: boolean
  display_order: number
}

const initialFormState: FormState = {
  title: "",
  issuer: "",
  credential_id: "",
  credential_url: "",
  issued_at: new Date().toISOString().split("T")[0],
  description: "",
  skills_input: "",
  image_path: "",
  is_published: true,
  display_order: 0,
}

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all")

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCertId, setEditingCertId] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormState>(initialFormState)
  const [deleteConfirmCert, setDeleteConfirmCert] = useState<Certificate | null>(null)

  // Action states
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null)

  // Auto-dismiss alert feedback after 4 seconds
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [feedback])

  // Fetch certificates from Supabase
  const fetchCertificates = useCallback(async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .order("display_order", { ascending: true })

      if (error) throw error
      setCertificates(data || [])
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memuat sertifikasi dari Supabase."
      setFeedback({ type: "error", message: msg })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCertificates()
    }, 0)
    return () => clearTimeout(timer)
  }, [fetchCertificates])

  // Open modal for new certificate
  const handleOpenAddModal = () => {
    setEditingCertId(null)
    setFormData({
      ...initialFormState,
      display_order: certificates.length,
    })
    setImagePreview(null)
    setIsModalOpen(true)
  }

  // Open modal for editing
  const handleOpenEditModal = (cert: Certificate) => {
    setEditingCertId(cert.id)
    setFormData({
      title: cert.title,
      issuer: cert.issuer,
      credential_id: cert.credential_id || "",
      credential_url: cert.credential_url || "",
      issued_at: cert.issued_at ? cert.issued_at.split("T")[0] : "",
      description: cert.description || "",
      skills_input: (cert.skills || []).join(", "),
      image_path: cert.image_path || "",
      is_published: cert.is_published,
      display_order: cert.display_order,
    })
    setImagePreview(getCertificateImageUrl(cert.image_path))
    setIsModalOpen(true)
  }

  // Handle image upload to Supabase Storage
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validation: Image type and size (max 5MB)
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"]
    if (!validTypes.includes(file.type)) {
      setFeedback({ type: "error", message: "Hanya file gambar (JPG, PNG, WEBP, SVG) yang diperbolehkan." })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setFeedback({ type: "error", message: "Ukuran gambar terlalu besar (maksimal 5MB)." })
      return
    }

    setIsUploading(true)
    try {
      const fileExt = file.name.split(".").pop()
      const cleanFileName = `cert_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`

      // Upload to 'certificates' bucket
      const { data, error } = await supabase.storage
        .from("certificates")
        .upload(cleanFileName, file, {
          cacheControl: "3600",
          upsert: true,
        })

      if (error) throw error

      setFormData((prev) => ({ ...prev, image_path: data.path }))
      setImagePreview(getCertificateImageUrl(data.path))
      setFeedback({ type: "success", message: "Gambar berhasil diunggah ke Supabase Storage." })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mengunggah gambar ke Supabase Storage."
      setFeedback({ type: "error", message: msg })
    } finally {
      setIsUploading(false)
    }
  }

  // Handle Form Submit (Add or Edit)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.issuer.trim()) {
      setFeedback({ type: "error", message: "Judul sertifikasi dan Penerbit wajib diisi." })
      return
    }

    setIsSaving(true)
    const skillsArray = formData.skills_input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)

    const payload = {
      title: formData.title.trim(),
      issuer: formData.issuer.trim(),
      credential_id: formData.credential_id.trim() || null,
      credential_url: formData.credential_url.trim() || null,
      issued_at: formData.issued_at || null,
      description: formData.description.trim() || null,
      skills: skillsArray,
      image_path: formData.image_path || null,
      is_published: formData.is_published,
      display_order: Number(formData.display_order) || 0,
    }

    try {
      if (editingCertId) {
        // Update existing certificate
        const { error } = await supabase
          .from("certificates")
          .update(payload)
          .eq("id", editingCertId)

        if (error) throw error
        setFeedback({ type: "success", message: "Sertifikasi berhasil diperbarui!" })
      } else {
        // Insert new certificate
        const { error } = await supabase
          .from("certificates")
          .insert([payload])

        if (error) throw error
        setFeedback({ type: "success", message: "Sertifikasi baru berhasil ditambahkan!" })
      }

      setIsModalOpen(false)
      fetchCertificates()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan sertifikasi ke database."
      setFeedback({ type: "error", message: msg })
    } finally {
      setIsSaving(false)
    }
  }

  // Handle quick toggle publish status
  const handleTogglePublish = async (cert: Certificate) => {
    const updatedStatus = !cert.is_published
    try {
      const { error } = await supabase
        .from("certificates")
        .update({ is_published: updatedStatus })
        .eq("id", cert.id)

      if (error) throw error

      setCertificates((prev) =>
        prev.map((c) => (c.id === cert.id ? { ...c, is_published: updatedStatus } : c))
      )
      setFeedback({
        type: "success",
        message: `Sertifikasi "${cert.title}" ${updatedStatus ? "dipublikasikan" : "diubah ke draft"}.`,
      })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mengubah status publikasi."
      setFeedback({ type: "error", message: msg })
    }
  }

  // Handle quick change display order
  const handleOrderChange = async (cert: Certificate, delta: number) => {
    const newOrder = Math.max(0, cert.display_order + delta)
    if (newOrder === cert.display_order) return

    try {
      const { error } = await supabase
        .from("certificates")
        .update({ display_order: newOrder })
        .eq("id", cert.id)

      if (error) throw error

      fetchCertificates()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memperbarui urutan."
      setFeedback({ type: "error", message: msg })
    }
  }

  // Handle Delete Confirmation
  const handleDelete = async () => {
    if (!deleteConfirmCert) return

    try {
      const { error } = await supabase
        .from("certificates")
        .delete()
        .eq("id", deleteConfirmCert.id)

      if (error) throw error

      // Also clean up image from storage if present
      if (deleteConfirmCert.image_path) {
        await supabase.storage.from("certificates").remove([deleteConfirmCert.image_path])
      }

      setFeedback({ type: "success", message: "Sertifikasi berhasil dihapus permanen." })
      setDeleteConfirmCert(null)
      fetchCertificates()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus sertifikasi."
      setFeedback({ type: "error", message: msg })
    }
  }

  // Filtered certificates list
  const filteredCerts = certificates.filter((cert) => {
    const matchesSearch =
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cert.skills && cert.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())))

    if (statusFilter === "published") return matchesSearch && cert.is_published
    if (statusFilter === "draft") return matchesSearch && !cert.is_published
    return matchesSearch
  })

  const publishedCount = certificates.filter((c) => c.is_published).length
  const draftCount = certificates.length - publishedCount

  return (
    <div className="flex flex-col gap-6">
      {/* Page Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-headline-display text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
            Manajemen Sertifikasi
          </h1>
          <p className="font-body-md text-xs sm:text-sm text-text-muted mt-1">
            Tambah, edit, publikasikan, dan atur urutan sertifikasi yang tampil di portofolio.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container text-surface-black font-semibold text-xs sm:text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md shadow-primary-container/20 cursor-pointer self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-base font-bold">add</span>
          <span>Tambah Sertifikasi</span>
        </button>
      </div>

      {/* Notification Toast Alert */}
      {feedback && (
        <div
          className={`p-3.5 rounded-xl text-xs sm:text-sm flex items-start justify-between gap-3 transition-all ${
            feedback.type === "success"
              ? "bg-green-500/15 border border-green-500/30 text-green-300"
              : "bg-error/15 border border-error/30 text-error"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base">
              {feedback.type === "success" ? "check_circle" : "error"}
            </span>
            <span>{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-text-muted hover:text-text-primary">
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-surface-container-high/60 border border-outline-variant/30 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted">Total Sertifikasi</span>
            <div className="text-2xl font-extrabold text-text-primary mt-1">{certificates.length}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary-container">
            <span className="material-symbols-outlined text-xl">workspace_premium</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-high/60 border border-outline-variant/30 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-green-400">Dipublikasikan</span>
            <div className="text-2xl font-extrabold text-green-300 mt-1">{publishedCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
            <span className="material-symbols-outlined text-xl">public</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-high/60 border border-outline-variant/30 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400">Draft / Disembunyikan</span>
            <div className="text-2xl font-extrabold text-amber-300 mt-1">{draftCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <span className="material-symbols-outlined text-xl">visibility_off</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl bg-surface-container-high/40 border border-outline-variant/30">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-base">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari sertifikasi, penerbit, atau skill..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:ring-1 focus:ring-primary-container"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              statusFilter === "all"
                ? "bg-primary-container text-surface-black"
                : "text-text-muted hover:text-text-primary hover:bg-surface-container-high"
            }`}
          >
            Semua ({certificates.length})
          </button>
          <button
            onClick={() => setStatusFilter("published")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              statusFilter === "published"
                ? "bg-green-500/20 text-green-300 border border-green-500/30"
                : "text-text-muted hover:text-text-primary hover:bg-surface-container-high"
            }`}
          >
            Publik ({publishedCount})
          </button>
          <button
            onClick={() => setStatusFilter("draft")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              statusFilter === "draft"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                : "text-text-muted hover:text-text-primary hover:bg-surface-container-high"
            }`}
          >
            Draft ({draftCount})
          </button>
        </div>
      </div>

      {/* Main Certificates Table / List */}
      <div className="rounded-2xl bg-surface-container-high/40 border border-outline-variant/30 overflow-hidden">
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-2 border-primary-container border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono text-text-muted">Memuat data dari Supabase...</span>
          </div>
        ) : filteredCerts.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-surface-container-highest flex items-center justify-center text-text-muted mb-3">
              <span className="material-symbols-outlined text-2xl">folder_off</span>
            </div>
            <h3 className="text-sm font-bold text-text-primary">Tidak Ada Sertifikasi Ditemukan</h3>
            <p className="text-xs text-text-muted mt-1 max-w-xs">
              {searchTerm
                ? "Tidak ada data yang cocok dengan kata kunci pencarian Anda."
                : "Belum ada data sertifikasi di database Supabase."}
            </p>
            {!searchTerm && (
              <button
                onClick={handleOpenAddModal}
                className="mt-4 px-4 py-2 rounded-xl bg-primary-container text-surface-black text-xs font-semibold hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                + Tambah Sekarang
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/20 bg-surface-container-low/50 text-text-muted font-mono uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 w-16 text-center">Urutan</th>
                  <th className="py-3 px-4 w-16">Preview</th>
                  <th className="py-3 px-4">Nama Sertifikasi &amp; Penerbit</th>
                  <th className="py-3 px-4">Kredensial &amp; Tanggal</th>
                  <th className="py-3 px-4">Keahlian (Skills)</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/15">
                {filteredCerts.map((cert) => {
                  const imageUrl = getCertificateImageUrl(cert.image_path)

                  return (
                    <tr
                      key={cert.id}
                      className="hover:bg-surface-container-high/30 transition-colors group"
                    >
                      {/* Urutan Controls */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="font-mono font-bold text-text-primary w-5 text-center">
                            {cert.display_order}
                          </span>
                          <div className="flex flex-col">
                            <button
                              onClick={() => handleOrderChange(cert, -1)}
                              title="Pindahkan ke atas"
                              className="text-text-muted hover:text-primary-container leading-none p-0.5 cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[14px]">arrow_drop_up</span>
                            </button>
                            <button
                              onClick={() => handleOrderChange(cert, 1)}
                              title="Pindahkan ke bawah"
                              className="text-text-muted hover:text-primary-container leading-none p-0.5 cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Image Thumbnail */}
                      <td className="py-3.5 px-4">
                        <div className="w-12 h-9 rounded-lg bg-surface-container-low border border-outline-variant/30 flex items-center justify-center overflow-hidden relative shrink-0">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={cert.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <span className="material-symbols-outlined text-primary-container text-base">
                              card_membership
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Title & Issuer */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-bold text-text-primary truncate" title={cert.title}>
                          {cert.title}
                        </div>
                        <div className="text-[11px] text-primary-container/90 mt-0.5">{cert.issuer}</div>
                      </td>

                      {/* Credential & Date */}
                      <td className="py-3.5 px-4">
                        <div className="font-mono text-[11px] text-text-muted">
                          {cert.credential_id || "—"}
                        </div>
                        <div className="text-[11px] text-text-muted/70 mt-0.5">
                          {cert.issued_at
                            ? new Date(cert.issued_at).toLocaleDateString("id-ID", {
                                month: "short",
                                year: "numeric",
                              })
                            : "—"}
                        </div>
                      </td>

                      {/* Skills */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {cert.skills && cert.skills.length > 0 ? (
                            cert.skills.slice(0, 3).map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-1.5 py-0.5 rounded bg-surface-container-high text-[10px] text-text-muted border border-outline-variant/20"
                              >
                                {skill}
                              </span>
                            ))
                          ) : (
                            <span className="text-text-muted/50">—</span>
                          )}
                          {cert.skills && cert.skills.length > 3 && (
                            <span className="text-[10px] text-text-muted/70">
                              +{cert.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Status Toggle */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleTogglePublish(cert)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                            cert.is_published
                              ? "bg-green-500/15 border-green-500/30 text-green-300 hover:bg-green-500/25"
                              : "bg-surface-container-highest border-outline-variant/30 text-text-muted hover:text-text-primary"
                          }`}
                          title="Klik untuk mengubah status publikasi"
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              cert.is_published ? "bg-green-400" : "bg-text-muted"
                            }`}
                          />
                          <span>{cert.is_published ? "Published" : "Draft"}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditModal(cert)}
                            className="p-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-text-primary hover:text-primary-container transition-colors cursor-pointer"
                            title="Edit data sertifikasi"
                          >
                            <span className="material-symbols-outlined text-sm">edit</span>
                          </button>
                          <button
                            onClick={() => setDeleteConfirmCert(cert)}
                            className="p-1.5 rounded-lg bg-error/10 hover:bg-error/20 text-error transition-colors cursor-pointer"
                            title="Hapus sertifikasi"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL: Add / Edit Certificate Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-surface-container-high rounded-3xl border border-outline-variant/30 shadow-2xl p-6 sm:p-8 my-8 relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20 mb-6">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-text-primary">
                  {editingCertId ? "Edit Sertifikasi" : "Tambah Sertifikasi Baru"}
                </h2>
                <p className="text-xs text-text-muted mt-0.5">
                  Data akan disimpan ke database Supabase dan otomatis tampil di portofolio publik jika dipublikasikan.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-container-highest text-text-muted hover:text-text-primary flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-on-surface-variant mb-1">
                    Nama Sertifikasi <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Contoh: Meta Frontend Developer"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-text-primary text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-primary-container"
                  />
                </div>

                {/* Issuer */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-on-surface-variant mb-1">
                    Penerbit / Organisasi <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.issuer}
                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                    placeholder="Contoh: Meta (Coursera), Google"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-text-primary text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-primary-container"
                  />
                </div>

                {/* Credential ID */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-on-surface-variant mb-1">
                    ID Kredensial (Opsional)
                  </label>
                  <input
                    type="text"
                    value={formData.credential_id}
                    onChange={(e) => setFormData({ ...formData, credential_id: e.target.value })}
                    placeholder="Contoh: META-FE-984210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-text-primary text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-primary-container"
                  />
                </div>

                {/* Credential URL */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-on-surface-variant mb-1">
                    URL Verifikasi (Opsional)
                  </label>
                  <input
                    type="url"
                    value={formData.credential_url}
                    onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })}
                    placeholder="https://coursera.org/verify/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-text-primary text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-primary-container"
                  />
                </div>

                {/* Issued Date */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-on-surface-variant mb-1">
                    Tanggal Terbit
                  </label>
                  <input
                    type="date"
                    value={formData.issued_at}
                    onChange={(e) => setFormData({ ...formData, issued_at: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-text-primary text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-primary-container"
                  />
                </div>

                {/* Display Order */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-on-surface-variant mb-1">
                    Urutan Tampil (Angka kecil lebih awal)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-text-primary text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-primary-container"
                  />
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-on-surface-variant mb-1">
                  Keahlian / Teknologi (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={formData.skills_input}
                  onChange={(e) => setFormData({ ...formData, skills_input: e.target.value })}
                  placeholder="React, TypeScript, Next.js, Redux Toolkit, Tailwind CSS"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-text-primary text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-primary-container"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-on-surface-variant mb-1">
                  Deskripsi Singkat Program
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Jelaskan ringkasan materi, capstone project, atau kompetensi yang dicapai..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-text-primary text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-primary-container resize-none"
                />
              </div>

              {/* Image Upload Area */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-on-surface-variant mb-1">
                  Gambar / Sertifikat (Supabase Storage)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl border border-dashed border-outline-variant/40 bg-surface-container-low">
                  {imagePreview ? (
                    <div className="relative w-24 h-16 rounded-lg overflow-hidden border border-outline-variant/30 shrink-0 bg-surface-black">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-lg bg-surface-container-highest flex items-center justify-center text-text-muted shrink-0">
                      <span className="material-symbols-outlined text-2xl">image</span>
                    </div>
                  )}

                  <div className="flex-1 text-center sm:text-left">
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/svg+xml"
                      onChange={handleImageFileChange}
                      disabled={isUploading}
                      className="text-xs text-text-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-surface-container-high file:text-primary-container hover:file:bg-surface-container-highest cursor-pointer"
                    />
                    <p className="text-[11px] text-text-muted/60 mt-1">
                      {isUploading
                        ? "Sedang mengunggah ke Supabase Storage..."
                        : "Format yang didukung: JPG, PNG, WEBP, SVG (Maks. 5MB)"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Publish Checkbox */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_published"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  className="w-4 h-4 rounded text-primary-container bg-surface-container-low border-outline-variant/40 focus:ring-primary-container"
                />
                <label htmlFor="is_published" className="text-xs text-text-primary font-medium cursor-pointer">
                  Publikasikan langsung ke portofolio utama
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSaving}
                  className="px-4 py-2.5 rounded-xl bg-surface-container-highest text-text-muted hover:text-text-primary text-xs font-semibold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving || isUploading}
                  className="px-6 py-2.5 rounded-xl bg-primary-container text-surface-black text-xs font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {isSaving ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-surface-black border-t-transparent rounded-full animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <span>{editingCertId ? "Simpan Perubahan" : "Tambahkan Sertifikasi"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Delete Confirmation */}
      {deleteConfirmCert && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-surface-container-high rounded-3xl border border-outline-variant/30 shadow-2xl p-6 relative z-10 text-center">
            <div className="w-12 h-12 rounded-2xl bg-error/15 text-error flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-2xl">warning</span>
            </div>
            <h3 className="text-base font-bold text-text-primary">Hapus Sertifikasi?</h3>
            <p className="text-xs text-text-muted mt-2 leading-relaxed">
              Apakah Anda yakin ingin menghapus sertifikasi <span className="font-semibold text-text-primary">&ldquo;{deleteConfirmCert.title}&rdquo;</span>? Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setDeleteConfirmCert(null)}
                className="px-4 py-2 rounded-xl bg-surface-container-highest text-text-muted hover:text-text-primary text-xs font-semibold transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 rounded-xl bg-error text-white text-xs font-semibold hover:bg-error/90 transition-colors shadow-md shadow-error/20 cursor-pointer"
              >
                Hapus Permanen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
