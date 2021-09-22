import React from 'react'

export const GlobalFilter = ({filter, setFilter }: any) => {
    return (
        <div className="container mt-3">
        <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-default">Search: {' '}</span>
        </div>
        <input value={filter || ''} onChange={e => setFilter(e.target.value)} type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
      </div>
      </div>
    )
}