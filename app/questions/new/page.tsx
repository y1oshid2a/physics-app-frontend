'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewQuestionPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    const res = await fetch('http://localhost:8000/auth/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    })

    if (res.ok) {
      router.push('/questions')
    } else {
      setError('投稿に失敗しました')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded shadow p-8">
        <h1 className="text-2xl font-bold mb-6">問題を投稿する</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />
        <textarea
          placeholder="問題の内容を入力してください"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded mb-4 h-48"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          投稿する
        </button>
      </div>
    </div>
  )
}