import React from 'react'
import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getDoc, getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";


const Eagle = (props) => {

    const [inactiveUser, setInactiveUser] = useState();
    const [inactiveUsers, setInactiveUsers] = useState([]);
    const [storageOccupied, setStorageOccupied] = useState();

    // const [modal, setModal] = useState(false);
    const toggleModal = (idString, userId, userStorageOccupied) => {
        // Hard-Coded for now
        setInactiveUser(userId);
        setStorageOccupied(userStorageOccupied);
        document.getElementById(idString).classList.add('btn-reset')
        // setModal(!modal);
        setStyle({display: 'block'})
    }

    const toggleOwnershipModal = (idString, userId, userStorageOccupied) => {
        // Hard-Coded for now
        setInactiveUser(userId);
        setStorageOccupied(userStorageOccupied);
        document.getElementById(idString).classList.add('btn-claim');
        // setModal(!modal);
        setOwnershipStyle({display: 'block'});
    }

    const [style, setStyle] = useState({display: 'none'});
    const [ownershipStyle, setOwnershipStyle] = useState({display: 'none'});

    useEffect(() => {
        getInactiveUserDetails()
        setStyle({display: 'none'})
        setOwnershipStyle({display: 'none'})
    }, [])

    const closeModal = () => {
        setStyle({display: 'none'})
    }

    const showAlert = () => {
        alert('Selected data owned by this inactive user is marked for deletion');
        closeModal();
    }

    const closeOwnershipModal = () => {
        setOwnershipStyle({display: 'none'})
    }

    const showOwnershipAlert = () => {
        alert('Successfully initiated ownership transfer');
        closeOwnershipModal();
    }



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "react-interview-project-7e9c0.firebaseapp.com",
  projectId: "react-interview-project-7e9c0",
  storageBucket: "react-interview-project-7e9c0.appspot.com",
  messagingSenderId: "129184381371",
  appId: "1:129184381371:web:8f35fe5cffe12947b56c9e",
  measurementId: "G-TKSNVBM6Y7"
};

async function getInactiveUserDetails() {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const colRef = collection(db, 'inactiveUsers');
    const docs = await getDocs(colRef);
    const iUsers = [];
    docs.forEach((doc) => {
        iUsers.push(doc.data())
        setInactiveUsers(iUsers)
    })
    // console.log(iUsers)
    return iUsers
}


// async function getInactiveUserDetails(docId='inactiveUsers') {
//     try {
//         const querySnapshot = await getDocs(collection(db, "users"));
//         querySnapshot.forEach((doc) => {
//             console.log(`${doc.id} => ${JSON.parse(doc.data())}`);
//         });
//     } catch (e) {console.log(e);}
//     // Default
//     return {};
//   }


    // Bootstrapping to test
    // const inactiveUsers = [
    //     {index: 1, identity: 653424332, storageOccupied: 5.5}, 
    //     {index: 2, identity: 663424332, storageOccupied: 3.5},
    //     {index: 3, identity: 673424332, storageOccupied: 3.5},
    //     {index: 4, identity: 654424331, storageOccupied: 2.5}
    // ]

  return (
        <>
            <h2 id="volume-stats-header" className="h3-colored h3">Eagle Volume Usage Statistics for : {props.volume}</h2>
            <h3>Storage Occupied by Inactive Users</h3>
            <table id="inactive-users-table-id">
                <thead>
                    <tr>
                        <th>Inactive Users</th>
                        <th>Storage Occupied in TB</th>
                        <th>Delete Data</th>
                        <th>Claim Ownership</th>
                    </tr>
                </thead>
                <tbody>
                    {inactiveUsers.map((user, index) => {
                        const idString = "inactive-users-table-id-"+user.index;
                        return (
                            <tr id={idString} key={index}>
                                <td>{user.identity}</td>
                                <td>{user.storageOccupied}</td>
                                <td><button className="action-btn delete-data-button" onClick={() => toggleModal(idString, user.identity, user.storageOccupied)}>Delete data owned by this Inactive User</button></td>
                                <td><button className="action-btn claim-ownership-button" onClick={() => toggleOwnershipModal(idString, user.identity, user.storageOccupied)}>Claim ownership of this data</button></td>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </table>

            {/* {modal && <Delete show="true" />} */}
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
                    <tr>
                        <td>{inactiveUser}</td>
                        <td>{storageOccupied}</td>
                    </tr>
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

        {/* Ownership */}
        <div id="ownership-transfer-modal" className="modal" style={ownershipStyle}>
          <div className="modal-content">
            <span className="modal-close" onClick={closeOwnershipModal}>&times;</span>
            <h3 className="modal-header">Ownership Transfer</h3>
            <table id="selected-data" border="1">
              <thead>
                <tr>
                  <th>Inactive User ID</th>
                  <th>Storage Occupied in TB</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td>{inactiveUser}</td>
                    <td>{storageOccupied}</td>
                </tr>
              </tbody>
            </table>
            <p>
              To which user do you want to transfer the ownership of this data?
              <br />
              <strong style={{color: 'red'}}>
                Note: Ownership can be transferred only to members who are part of the use case group.
              </strong>
            </p>
            <label htmlFor="username-adsid">User Name or ADS ID:</label>
            <input type="text" id="username-adsid" name="username-adsid" />
            <div className="tooltip">
              <button id="claimit-button" className="modal-button" onClick={showOwnershipAlert}>ClaimIt</button>
              <span className="tooltiptext">Ownership transfer will be initiated once submitted.</span>
            </div>
          </div>
        </div>

        </>
  )
}

export default Eagle