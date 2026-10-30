import { Link } from 'react-router-dom'
import useKoleksi from '../hooks/useKoleksi.js'
import mahasiswa from '../../mahasiswa.json'
import '../Bonus.css'

export default function Beranda() {
  const { items, loading } = useKoleksi()
  const jumlahKategori = new Set(items.map((item) => item.kategori)).size

  return (
    <div id="beranda">
      <h1 id="judul-beranda">Rak Buku</h1>
      <p id="tema-beranda">Tema : {mahasiswa.tema}</p>
      {loading ? (
        <p>Memuat ringkasan...</p>
      ) : (
        <section className="ringkasan-beranda">
        <div className="kartu-ringkasan">
          <h2>{items.length}</h2>
          <p>Total Buku</p>
        </div>

        <div className="kartu-ringkasan">
          <h2>{jumlahKategori}</h2>
          <p>Total Kategori</p>
        </div>

      </section>
      )}
      <Link className="tombol-koleksi" to="/koleksi">Lihat semua buku</Link>
    </div>
  )
}