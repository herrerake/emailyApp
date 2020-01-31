// SurveyField contains logic to render a single
// label and text input
 
import React from 'react';

// non syntaxtic sugar (props.input)
// writing {... input} saves us from writing onBlur={input.onBlur} onChange={input.onChange}
export default ({ input, label, meta: { error, touched } }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{ marginBottom: '5px' }}/>
            <div className="red-text" style={{ marginBottom: '20px'}}>
                {touched && error}
            </div>
        </div>
    )
}