import React from 'react';

const Inputui = (props) => {
    return (
        <div>
            <input type={props.type} placeholder={props.placeholder} onChange={(e) => props.onChangeHandler(props.fieldName,e)}
                className={props.error ? 'mb-2 is-invalid' : 'mb-2'} value={props.value} ></input>
            {props.error && <div class="invalid-feedback">
                Please choose a {props.placeholder}.
            </div>}
        </div>
    );
};

export default Inputui;