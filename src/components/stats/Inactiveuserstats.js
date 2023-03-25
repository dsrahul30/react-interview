import React from 'react'

const Inactiveuserstats = (props) => {
  return (
    <>
        <h3 className="h3-colored-highlight h3">Total Storage Occupied by Inactive Users [TB] : {props.totalStorageInactiveUsers}</h3>
    </>
  )
}

export default Inactiveuserstats