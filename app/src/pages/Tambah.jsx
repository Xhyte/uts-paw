import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useKoleksi from '../hooks/useKoleksi.js'
import './Tambah.css'

const AWAL = { judul: '', kategori: 'Komik', penulis: '', tahunTerbit: '', status: 'Ingin Dibeli' }

export default function Tambah() {
  const { tambah } = useKoleksi()
  const navigate = useNavigate()
  const [form, setForm] = useState(AWAL)
  const [galat, setGalat] = useState('')

  const ubah = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const simpan = (e) => {
    e.preventDefault()
    if (form.judul.trim().length < 2) {
      setGalat('Judul wajib diisi, minimal 2 karakter.')
      return
    }
    if (form.penulis.trim().length < 2) {
      setGalat('Masukkan nama penulis dengan benar')
      return
    }
    if (form.tahunTerbit.trim().length != 4) {
      setGalat('Masukkan tahun terbit dengan benar')
      return
    }
    tambah({ ...form, judul: form.judul.trim() })
    navigate('/koleksi')
  }

  return (
    <form className="formulir" onSubmit={simpan} noValidate>
      <h1>Tambah Buku</h1>

      <label htmlFor="judul">Judul</label>
      <input id="judul" name="judul" value={form.judul} onChange={ubah} />
      {galat && <p role="alert">{galat}</p>}

      <label htmlFor="kategori">Kategori</label>
      <select id="kategori" name="kategori" value={form.kategori} onChange={ubah}>
        <option>Komik</option>
        <option>Novel</option>
        <option>Pengetahuan</option>
      </select>

      <label htmlFor="penulis">Penulis</label>
      <input id="penulis" name="penulis" value={form.penulis} onChange={ubah} />
      {galat && <p role="alert">{galat}</p>}

      <label htmlFor="tahunTerbit">Tahun Terbit</label>
      <input id="tahunTerbit" name="tahunTerbit" value={form.tahunTerbit} onChange={ubah} />
      {galat && <p role="alert">{galat}</p>}

      <label htmlFor="status">Status</label>
      <select id="status" name="status" value={form.status} onChange={ubah}>
        <option>Sedang Dibaca</option>
        <option>Dimiliki</option>
        <option>Ingin Dibeli</option>
      </select>

      <button type="submit">Simpan</button>
    </form>
  )
}