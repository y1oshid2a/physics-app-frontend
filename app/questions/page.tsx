'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
type Question = {
    id: number
    title: string
    content: string
    ai_answer: string | null
    status: string
    created_at: string
}

export default function QuestionsPage() {
    const [questions, setQuestions] = useState<Question[]>([])
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            router.push('/login')
            return
        }

        fetch('http://localhost:8000/auth/questions', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setQuestions(data))
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">質問一覧</h1>
                    <button
                        onClick={() => router.push('/questions/new')}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        質問を投稿する
                    </button>
                </div>
                {questions.length === 0 ? (
                    <p className="text-gray-500">まだ質問がありません</p>
                ) : (
                    questions.map((q) => (
                        <div key={q.id} className="bg-white rounded shadow p-6 mb-4">
                            <h2 className="text-lg font-bold mb-2">{q.title}</h2>
                            <p className="text-gray-600 mb-2">{q.content}</p>
                            <span className="text-sm text-gray-400">{q.status} · {q.created_at}</span>
                            {q.ai_answer && (
                                <div className="mt-4 p-4 bg-blue-50 rounded">
                                    <p className="text-sm font-bold text-blue-700 mb-2">AI回答</p>
                                    <div className="text-sm text-gray-700 prose prose-sm max-w-none">
                                        <ReactMarkdown>{q.ai_answer}</ReactMarkdown>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}