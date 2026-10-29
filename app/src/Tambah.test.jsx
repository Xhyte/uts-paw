import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, expect, test, vi } from 'vitest'
import App from './App.jsx'

const DATA = [{ id: '1', judul: 'Komet', kategori: 'Novel', penulis: 'Tere Liye', tahunTerbit: '2017', status: 'Dimiliki' }]

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(DATA))))
})

function buka(path) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

async function tambahBuku(judul, kategori = 'Novel', penulis, tahunTerbit, status = 'Dimiliki') {
  await userEvent.type(screen.getByLabelText('Judul'), judul)
  await userEvent.selectOptions(screen.getByLabelText('Kategori'), kategori)
  await userEvent.type(screen.getByLabelText('Penulis'), penulis)
  await userEvent.type(screen.getByLabelText('Tahun Terbit'), tahunTerbit)
  await userEvent.selectOptions(screen.getByLabelText('Status'), status)
  await userEvent.click(screen.getByRole('button', { name: 'Simpan' }))
}

test('menampilkan data hasil fetch di halaman koleksi', async () => {
  buka('/koleksi')
  expect(await screen.findByText('Komet')).toBeInTheDocument()
})

test('form menolak judul kosong', async () => {
  buka('/tambah')
  await userEvent.click(screen.getByRole('button', { name: 'Simpan' }))
  expect(screen.getByRole('alert')).toHaveTextContent('Judul wajib diisi')
})

test('menambah buku baru ke daftar', async () => {
  buka('/tambah')
  await tambahBuku('Komet','Novel', 'Tere Liye', '2017', 'Ingin Dibeli')
  await waitFor(() => {
    const data = JSON.parse(localStorage.getItem('uts-paw-koleksi') || '[]')
    expect(data.some((buku) => buku.judul === 'Komet')).toBe(true)
  })
})

test('form menolak tahun terbit tidak valid', async () => {
  buka('/tambah')
  await userEvent.type(screen.getByLabelText('Judul'), 'Komet')
  await userEvent.type(screen.getByLabelText('Penulis'), 'Tere Liye')
  await userEvent.type(screen.getByLabelText('Tahun Terbit'), '123')
  await userEvent.click(screen.getByRole('button', { name: 'Simpan' }))
  expect(screen.getByRole('alert')).toHaveTextContent('Tahun terbit harus terdiri dari 4 digit angka')
})
test('form menampilkan semua field buku', () => {
  buka('/tambah')
  expect(screen.getByLabelText('Judul')).toBeInTheDocument()
  expect(screen.getByLabelText('Kategori')).toBeInTheDocument()
  expect(screen.getByLabelText('Penulis')).toBeInTheDocument()
  expect(screen.getByLabelText('Tahun Terbit')).toBeInTheDocument()
  expect(screen.getByLabelText('Status')).toBeInTheDocument()
})
