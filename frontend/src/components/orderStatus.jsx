import React, { Component } from 'react';
import {Row, Col} from "react-bootstrap";
import {apiUrl}  from "../config.json";
import axios from 'axios';
import {getCurrentUser} from '../services/authService';
const apiEndpoint = apiUrl + "/user";

class OrderStatus extends React.Component {
    constructor() {
        super();
        this.state = {
          source: "",
          destination: "",
          status: -1

        };
    
        this.changeSource = this.changeSource.bind(this);
        this.changeDestination= this.changeDestination.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }
      changeSource(event) {
        this.setState({
          source: event.target.value,
        });
      }
      changeDestination(event) {
        this.setState({
          destination: event.target.value,
        });
      }
    
      onSubmit(event) {
        event.preventDefault();
        const user = getCurrentUser();
        console.log("User details", user);
        const startTheRide = {
          source: this.state.source,
          destination: this.state.destination,
          userId: user.email,
          status: 0
        };
        console.log("Start", startTheRide);
        axios.post(apiEndpoint+"/orderStatus", startTheRide).then((res) => {
            this.setState({status: 0})
        })
      }

    async componentDidMount(){
        const user = getCurrentUser()
        const source = "fda"
        const destination = "fsad"
        axios.get( apiEndpoint+`/orderStatus/${user.email}/${source}/${destination}`).then((res) => {
            //console.log("res STATUSSSSS: ", res.data.order.status)
            if (res?.data?.order?.status && res?.data?.order?.status !== -1) {
            this.setState({status: res.data.order.status})
            }
        })
    }
      
    render() { 
        return (
        <div>
        
            <form onSubmit={this.onSubmit}>

                <div>
                <h2 style ={{"margin-left": "300px", "marginBottom": "100px", "marginTop": "20px"}}> Order Status</h2>
                    <Row>
                        <Col>
                            <tr>
                                <td>
                                <input
                                    type="text"
                                    placeholder="Source Location"
                                    onChange={this.changeSource}
                                    value={this.state.source}
                                    className="form-control form-group"
                                    required= "true"
                                />
                                </td>
                            </tr>
                        </Col>
                        
                        <Col>
                            <tr>
                                <td>
                                <input
                                    type="text"
                                    placeholder="Destination Location"
                                    onChange={this.changeDestination}
                                    value={this.state.destination}
                                    className="form-control form-group"
                                    required= "true"
                                />
                                </td>
                            </tr>
                        </Col>
                        <Col>
                            <span>
                                <input
                                    type="submit"
                                    //placeholder="Start the ride"
                                    className="btn btn-danger btn-block"
                                    value="Start"
                                />
                            </span>
                        </Col>
                    </Row>
                    <Row>
                        <br></br>
                        
                        Vehicle on the way to Restaurant 

                        {this.state.status===0 && (<div style={{marginTop: "31px", marginLeft: "10px" , height: "10px", width: "10px", backgroundColor: "green"}}>
                        </div>)}
                        {this.state.status!==0 && (<div style={{marginTop: "31px", marginLeft: "10px" , height: "10px", width: "10px", backgroundColor: "red"}}>
                        </div>)}
                        
                    </Row>
                    <Row>
                        <br></br>
                        Food Pick Up 

                        {this.state.status===1 && (<div style={{marginTop: "31px", marginLeft: "10px" , height: "10px", width: "10px", backgroundColor: "green"}}>
                        </div>)}
                        {this.state.status!==1 && (<div style={{marginTop: "31px", marginLeft: "10px" , height: "10px", width: "10px", backgroundColor: "red"}}>
                        </div>)}
                        
                    </Row>
                    <Row>
                        <br></br>
                        Food on the Way to Delivery

                        {this.state.status===2 && (<div style={{marginTop: "31px", marginLeft: "10px" , height: "10px", width: "10px", backgroundColor: "green"}}>
                        </div>)}
                        {this.state.status!==2&& (<div style={{marginTop: "31px", marginLeft: "10px" , height: "10px", width: "10px", backgroundColor: "red"}}>
                        </div>)}
                        
                    </Row>
                    <Row>
                        <br></br>
                        Food Delivered

                        {this.state.status===3 && (<div style={{marginTop: "31px", marginLeft: "10px" , height: "10px", width: "10px", backgroundColor: "green"}}>
                        </div>)}
                        {this.state.status!==3&& (<div style={{marginTop: "31px", marginLeft: "10px" , height: "10px", width: "10px", backgroundColor: "red"}}>
                        </div>)}
                        
                    </Row>
                    
                </div>
                
            </form>
        </div>
        );
    }
}

export default OrderStatus;