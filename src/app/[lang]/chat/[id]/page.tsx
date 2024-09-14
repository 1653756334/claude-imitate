import React from 'react'

export default function Chat({ params }: { params: { id: string } }) {
  return (
    <div>Chat {params.id}</div>
  )
}
