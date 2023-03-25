import React from 'react'
import { useState, useEffect } from 'react';

const Delete = (props) => {

    const [style, setStyle] = useState({display: 'none'});

    useEffect(() => {
        setStyle({display: 'block'})
    }, [])

    const closeModal = () => {
        setStyle({display: 'none'})
    }

    const showAlert = () => {
        alert('Selected data owned by this inactive user is marked for deletion');
        closeModal();
    }

  return (
    <>
        <div id="delete-data-modal" className="modal" style={style}>
            <div className="modal-content">
                <span className="modal-close" onClick={closeModal}>&times;</span>
                <h2 className="modal-header">Delete files owned by Inactive User [Irrevocable Action]</h2>
                <h4>Selected Inactive User Data</h4>
                <table id="selected-data-to-delete">
                <thead>
                    <tr>
                    <th>Inactive User ID</th>
                    <th>Storage Occupied in TB</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
                </table>
                <h4>File path details</h4>
                <table id="delete-data-table" className="datatable">
                <thead>
                    <tr>
                    <th>Filepath</th>
                    <th>Filesize (bytes)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>/path/to/file1.txt</td>
                    <td>1024</td>
                    </tr>
                    <tr>
                    <td>/path/to/file2.txt</td>
                    <td>2048</td>
                    </tr>
                </tbody>
                </table>
                <p>Total no.of files: <span id="total-files">223943243</span></p>
                <button id="delete-it-button" className="btn btn-reset" onClick={showAlert}>Delete it</button>
            </div>  
        </div>
    </>
  )
}

export default Delete;