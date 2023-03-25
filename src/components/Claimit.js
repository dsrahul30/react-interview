import { useState, useEffect } from "react";
import Eagle from "./stats/Eagle";
import Otherstats from "./stats/Otherstats";
import Volume from "./stats/Volume";


function Claimit() {

    const [volumeSelected, setVolumeSelected] = useState('');

    // Show the selection path on first render
    useEffect(() => {
        updateSelectionPath()
    }, [])

    useEffect(() => {
        renderStats()
    }, [volumeSelected])

    const setVolumeOption = () => {
        setVolumeSelected(document.getElementById('volume').value);
        // console.log(volumeSelected);
        updateSelectionPath();
    }

    const renderStats = () => {

        if (volumeSelected === '') {
            return null;
        } else {
                if (volumeSelected === 'volume1') {
                    return (
                        <>
                            <Volume name={volumeSelected} path={"orb/LOB/" + volumeSelected} quota="25" used="12" /> 
                            <Eagle volume={volumeSelected} />
                            <Otherstats totalStorageInactiveUsers="15.0" />
                        </>
                    )
                } else {
                    return (
                        <>
                            <Volume name={volumeSelected} path={"orb/LOB/" + volumeSelected} quota="35" used="32" />
                            <Eagle volume={volumeSelected} />
                            <Otherstats totalStorageInactiveUsers="15.0" />
                        </>
                    )
                }

        }
    }

    return (
        <div className="container">
            <h1>ClaimIt: Cornerstone Usecase(s) directory [MapR Volume] MetaData Management Hub</h1>
            <div className="selections">
                <div className="dropdown">
                    <label htmlFor="clusterlocation">Location:</label>
                    <select id="clusterlocation" onChange={updateSelectionPath}>
                        <option>US</option>
                        <option>IN</option>
                    </select>
                </div>
                <div className="dropdown">
                    <label htmlFor="environment">Environment:</label>
                    <select id="environment" onChange={updateSelectionPath}>
                        <option>Silver</option>
                        <option>Gold</option>
                        <option>Platinum</option>
                        <option>Palladium</option>
                    </select>
                </div>
                <div className="dropdown">
                    <label htmlFor="clustertype">MapR Cluster Type:</label>
                    <select id="clustertype" onChange={updateSelectionPath}>
                        <option>Batch</option>
                        <option>Real Time</option>
                    </select>
                </div>
                <div className="dropdown">
                    <label htmlFor="clustername">MapR Cluster Name:</label>
                    <select id="clustername" onChange={updateSelectionPath}>
                        <option>Silver M5</option>
                        <option>Gold M5</option>
                        <option>Platinum M5</option>
                        <option>Palladium M5</option>
                    </select>
                </div>

            </div>

            <div className="selection-path-container">
                <div className="selection-path">
                    <h3>Selection Path:</h3>
                    <p id="selection-path"></p>
                </div>
            </div>

            <div className="dropdown">
                <label htmlFor="volume">Volume Name:</label>
                <select id="volume" defaultValue={""} onChange={setVolumeOption}>
                    <option value="" disabled>Select Volume Name</option>
                    <option>volume1</option>
                    <option>volume2</option>
                </select>
            </div>

            {renderStats()}

        </div>
    )
}

export default Claimit;


function updateSelectionPath() {
    const clusterlocationSelect = document.getElementById('clusterlocation');
    const environmentSelect = document.getElementById('environment');
    const clustertypeSelect = document.getElementById('clustertype');
    const clusternameSelect = document.getElementById('clustername')
    // const pathDisplay = document.querySelector('.path p');
    const selectionPath = document.getElementById('selection-path');
    const volumeSelect = document.getElementById('volume');


    const clusterlocation = clusterlocationSelect.value;
    const environment = environmentSelect.value;
    const maprClustername = clusternameSelect.value;
    const clusterType = clustertypeSelect.value;
    const volume = volumeSelect.value;

    // pathDisplay.innerHTML = clusterlocation + " -> " + environment + " -> " + maprClustername + " -> " + clusterType + " -> " + volume;
    selectionPath.innerHTML = clusterlocation + " -> " + environment + " -> " + maprClustername + " -> " + clusterType + " -> " + volume;
}