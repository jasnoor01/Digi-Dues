import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

export default function Adminprogressbar() {
    const percentage = 6;
    return (
        <div className=' pbar col-lg-3 col-md-3 col-xs-3 col-sm-3 d-flex flex-column align-items-center' >
            <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                background
                backgroundPadding={6}
                styles={buildStyles({
                    backgroundColor: "transparent",
                    textColor: "#00203FFF",
                    pathColor: "#00203FFF",

                    trailColor: "#ccc"
                })}
            />
            <center className='text-wrap p-2'><h4><small>Rs </small><span className='text-success'>500</span> <small>Of Rs</small> <span className='text-danger'>5100</span>  <small>Recieved</small></h4></center>
        </div>
    )
}
