import React from 'react';

const Inputui = (props) => {
    return (
        <div>
            <input type={props.type} placeholder={props.placeholder} onChange={(e) => props.onChangeHandler(props.fieldName, e.target.value)}
                className={props.error ? 'form-control mb-2 is-invalid' : 'form-control mb-2'} value={props.value} ></input>
            {props.error && <div class="invalid-feedback">
                Please choose a {props.placeholder}.
            </div>}
        </div>
    );
};

export default Inputui;