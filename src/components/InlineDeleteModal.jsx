import React from 'react';

function InlineDeleteModal({onDelete,onCancel}) {
  return (
    <div className='position-absolute top-0 start-0 bottom-0 end-0 bg-secondary d-flex align-items-center justify-content-end' style={{"--bs-bg-opacity": "5"}}>

      <button onClick={onDelete} className='btn btn-sm btn-danger'>Elimina</button>
      <button onClick={onCancel} className='btn btn-sm btn-ligth mx-1 py-0'>Annulla</button>
    </div>
  );
}

export default InlineDeleteModal;