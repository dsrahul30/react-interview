import React from 'react'
import Activeuserstats from './Activeuserstats'
import Inactiveuserstats from './Inactiveuserstats'

const Otherstats = (props) => {
  return (
    <>
        <Inactiveuserstats totalStorageInactiveUsers={props.totalStorageInactiveUsers} />
        <Activeuserstats />
    </>
  )
}

export default Otherstats