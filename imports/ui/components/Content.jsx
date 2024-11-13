import React from 'react'

function Content({children}) {
  return (
    <main id="content">
        <div className='p-3 main-container'>
            {children}
        </div>
    </main>
  )
}

export default Content