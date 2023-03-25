import React from 'react'
import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getDoc, getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";


const Activeuserstats = () => {

    const [activeUsers, setActiveUsers] = useState([]);

    useEffect(() => {
        getActiveUserDetails()
    }, [])

    const firebaseConfig = {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: "react-interview-project-7e9c0.firebaseapp.com",
        projectId: "react-interview-project-7e9c0",
        storageBucket: "react-interview-project-7e9c0.appspot.com",
        messagingSenderId: "129184381371",
        appId: "1:129184381371:web:8f35fe5cffe12947b56c9e",
        measurementId: "G-TKSNVBM6Y7"
    };

    async function getActiveUserDetails() {
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const colRef = collection(db, 'activeUsers');
        const docs = await getDocs(colRef);
        const aUsers = [];
        docs.forEach((doc) => {
            aUsers.push(doc.data())
            setActiveUsers(aUsers)
        })
        // console.log(aUsers)
        return aUsers
    }

  return (
        <>
            <h3 className="h3-colored h3">Storage Occupied by Active Users</h3>
            <table>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Email Id</th>
                        <th>ADS id</th>
                        <th>Storage Occupied [TB]</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {activeUsers.map((user, index) => {
                        
                        return (
                            <tr key={index}>
                                <td>{user.uname}</td>
                                <td>{user.email}</td>
                                <td>{user.adsId}</td>
                                <td>{user.storageOccupied}</td>
                            </tr>
                        )
                    })}

                    
                </tbody>
            </table>
        </>
  )
}

export default Activeuserstats