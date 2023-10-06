import React from 'react';

const Model = (props) => {
    return (
        <div>
            <div className={props.show ? "modal show" :"modal"}  style={props.show ? {display:"block"} : {display:"none"}} >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{props.title}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>props.hideModal()}>
                                <span aria-hidden="true" >&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{props.content}</p>
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>props.hideModal()}>Close</button>
                        </div>
                    </div>
                </div>
            </div>        
        </div>
    );
};


export default Model;