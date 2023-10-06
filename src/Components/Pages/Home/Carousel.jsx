import React, { Component } from 'react'

export default class Carousel extends Component {
    constructor(props){
        console.log("child constructor")
        super();
        this.state={
            address:"pune"
        }
    }

    static getDerivedStateFromProps(props, state){
        console.log("child getDerivedStateFromProps")
        return null;
    }
    componentDidMount(){
        console.log("child componentDidMount")
    }
    render() {
        console.log("child render")
        return (
            <div>
                <h2>Carousel</h2>
            </div>
        );
    }
}
