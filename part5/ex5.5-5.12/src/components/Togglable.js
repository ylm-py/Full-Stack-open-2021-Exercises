import React ,{ useState , forwardRef ,useImperativeHandle} from "react"
import PropTypes from 'prop-types'



const Togglable = forwardRef((props,refs) =>{
    const {btnLabel,children} = props
    const [visible,setVisible] = useState(false)
    const hideWhenVisible = {display:visible ? 'none' : ''}
    const showWhenVisible = {display:visible ? '' : 'none'}

    const toggleVisibility = () =>{
        setVisible(!visible)
    }
    useImperativeHandle(refs, () => {
        return {
          toggleVisibility
        }
      })

    return (
        <div style={{margin:'5px 0 5px'}}>
        <div style={hideWhenVisible}>
            <button onClick={toggleVisibility}>{btnLabel}</button>
        </div>
        <div style={showWhenVisible}>
            {children}
            <button onClick={toggleVisibility}>Cancel</button>
        </div>
        </div>
    )
})
Togglable.propTypes = {
    btnLabel: PropTypes.string.isRequired
  }
  

export default Togglable;