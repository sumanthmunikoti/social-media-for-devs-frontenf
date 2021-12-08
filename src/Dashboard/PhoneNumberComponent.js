import React from "react";
import { API_URL } from "../common/constants";
import { connect } from 'react-redux'

class phoneNumberComponent extends React.Component {

    state = {
        phoneNumber: '',
        dashboardToken: '',
        edit: false,
        p: ''
    }

    addPhoneNumber = () => {

        fetch(`${API_URL}/profile/phone`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    userId: this.props.userId,
                    phone: this.state.phoneNumber
                }
            )
        }).then(() => this.getPhoneNumber())

    }

    deletePhoneNumber = () => {
        fetch(`${API_URL}/profile/phone`, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    userId: this.props.userId
                }
            )
        }).then(() => {
            this.getPhoneNumber()
        })

    }

    componentDidMount = async () => {
        
    }

    changeEdit = () => {
        if (this.state.edit === false) {
            this.setState({
                edit: true
            })
        } else {
            this.setState({
                edit: false
            })
        }
    }

    render() {
        return (
            <div>
                {this.state.edit === false &&

                    <div className="list-group-item">
                        <div className="row">
                            {!this.state.phoneNumber &&
                                <div className="col-lg-6"><i>No Phone Number Given</i></div>
                            }
                            {this.state.phoneNumber &&

                                <div className="col-lg-6">
                                    <i>{this.state.p}</i>
                                </div>
                            }

                            <div className="col-lg-6">
                                {!this.state.phoneNumber &&
                                    <button
                                        onClick={() => {
                                            this.setState({
                                                edit: true
                                            })
                                        }
                                        }
                                        className="btn btn-danger">
                                        Add Phone Number
                                    </button>
                                }
                                {this.state.phoneNumber &&
                                    <button
                                        onClick={() => {
                                            this.setState({
                                                edit: true
                                            })
                                        }
                                        }
                                        className="btn btn-danger">
                                        Edit Phone Number
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                }
                {this.state.edit === true &&
                    <div className="list-group-item">
                        <div className="row">
                            <div className="col-lg-6">
                                <input onChange={async (e) =>
                                    await this.setState({
                                        phoneNumber: e.target.value,
                                    }
                                    )}
                                    value={this.state.phoneNumber}
                                />

                            </div>


                            <div className="col-lg-3">
                                <button
                                    onClick={async () => {
                                        await this.setState({
                                            edit: false
                                        })
                                        await this.addPhoneNumber()
                                    }
                                    }
                                    className="btn btn-danger">
                                    Save

                                </button>
                            </div>

                            <div className="col-lg-3">
                                <button
                                    onClick={async () => {
                                        await this.setState({
                                            edit: false
                                        })
                                        await this.deletePhoneNumber()
                                    }
                                    }
                                    className="btn btn-danger">
                                    Delete

                                </button>
                            </div>

                        </div>
                    </div>
                }
            </div>

        );
    }
}

//fetch userId from redux store
const mapStateToProps = (state) => {
    const { id } = state
    return {
        userId: id
    }
}

export default connect(mapStateToProps)(phoneNumberComponent)