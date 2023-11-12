import React from 'react'
import '../../css/Cards/JobAdvertisement.css'
import {Button} from '@material-ui/core'


function JobAdvertisement(props) {
  return (
    <div className='Advertisement'>

        <div className='addlogo'>
            <img src={props.logo} alt="logo1"/>
        </div>
        <div className='addname'>
            <p className='companytime'>{props.time}</p>
            <p className='companyname'>{props.name}</p>

        </div>
        <div className='addlocation'>
        <p className='companycity'>{props.city}</p>
            <p className='companycountry'>{props.country}</p>
        </div>
        <div className='addpackage'>
            <h3>{props.package}</h3>
            <Button>Quick Apply</Button>
        </div>

    </div>
  )
}

export default JobAdvertisement