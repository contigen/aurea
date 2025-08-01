'use client'

import { useState, useEffect } from 'react'

export function TasteGraph() {
  const [nodes, setNodes] = useState<
    Array<{
      id: string
      x: number
      y: number
      size: number
      color: string
      label: string
    }>
  >([])

  useEffect(() => {
    const tasteNodes = [
      { id: '1', label: 'Indie Rock', color: 'bg-amber-400', size: 60 },
      { id: '2', label: 'Minimalism', color: 'bg-rose-300', size: 45 },
      { id: '3', label: 'Vintage', color: 'bg-stone-400', size: 55 },
      { id: '4', label: 'Craft', color: 'bg-amber-300', size: 40 },
      { id: '5', label: 'Analog', color: 'bg-rose-400', size: 50 },
      { id: '6', label: 'Artisan', color: 'bg-stone-300', size: 35 },
    ]

    const initialNodes = tasteNodes.map((node, i) => ({
      ...node,
      x: Math.random() * 400,
      y: Math.random() * 300,
    }))

    setNodes(initialNodes)

    const interval = setInterval(() => {
      setNodes(prev =>
        prev.map(node => ({
          ...node,
          x: node.x + (Math.random() - 0.5) * 2,
          y: node.y + (Math.random() - 0.5) * 2,
        }))
      )
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='relative w-full h-80 overflow-hidden rounded-2xl bg-gradient-to-br from-stone-100/50 to-amber-100/30 dark:from-stone-800/50 dark:to-stone-700/30'>
      <div className='absolute inset-0'>
        {nodes.map(node => (
          <div
            key={node.id}
            className={`absolute rounded-full ${node.color} opacity-70 transition-all duration-300 flex items-center justify-center text-xs font-medium text-stone-800`}
            style={{
              left: `${Math.max(0, Math.min(85, (node.x / 400) * 100))}%`,
              top: `${Math.max(0, Math.min(85, (node.y / 300) * 100))}%`,
              width: `${node.size}px`,
              height: `${node.size}px`,
            }}
          >
            {node.label}
          </div>
        ))}
      </div>
      <div className='absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/20 dark:to-stone-900/20' />
    </div>
  )
}
