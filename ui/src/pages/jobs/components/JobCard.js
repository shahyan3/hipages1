import React from 'react'

// This is example of a Presentation/Container pattern. Essentially, the job of this component is to display data passed as props i.e. Presentation component.
//  The State is managed in the parent component e.g container

export const JobCard = ({ 
    invited,
    contantName, 
    createdAt, 
    suburb, 
    postcode, 
    category, 
    id, 
    description, 
    handleAccept, 
    handleDecline,
    price,
    phone,
    email
}) => {
    return (
        <>
        <div>
        <h3>{contantName}</h3>
        <h5>{new Date(createdAt).toLocaleString()}</h5>
        </div>
        <div className="info">
            <h5>{suburb}</h5>
            <h5>{postcode}</h5>
            <h5>{category}</h5>
            <h5>JOB ID: {id}</h5>
        </div>
        { !invited && 
            <div className="info contact">
                <h5>{phone}</h5>
                <h5>{email}</h5>
            </div>
        }
        <div>
            <p className="job-desc">{description}</p>
        </div>
        { invited &&
            <div className="info">
                <button onClick={(e) => handleAccept(e.target.value)} className="accept-btn" value={id}>Accept</button>
                <button onClick={(e) => handleDecline(e.target.value)} className="decline-btn" value={id}>Decline</button>
                <h5>${price} Lead Invitation</h5>
            </div>
        }
    </>
    )
}