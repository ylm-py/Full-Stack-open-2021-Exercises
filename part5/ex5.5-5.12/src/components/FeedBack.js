import React from 'react'
const FeedBack = ({message}) =>{
    const style = {
        backgroundColor: message.type === 'error' ? '#FFCCCB' : '#90EE90',
        border:'1px solid black',
        width:'50%',
        margin:'0 auto',
        textAlign:'center'
    }
    return (
        <div style={style}>
            {message.content}
        </div>
    )
}

export default FeedBack