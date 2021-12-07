import { Component } from "react";
import { API_URL } from "../common/constants";
import { connect } from 'react-redux'

class ExperienceTableComponent extends Component {

    state = {
        experiences: [],
        inputCompany: '',
        inputTitle: '',
        inputFrom: '',
        inputTo: '',
        inputDescription: ''
    }

    componentDidMount = async () => {
        this.getExperience()
    }

    getExperience = () => {
        fetch(`${API_URL}/profile/me`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                userId: this.props.userId
            })
        })
            .then(response => response.json())
            .then(results => this.setState({
                experiences: results.experience,
                inputCompany: '',
                inputTitle: '',
                inputFrom: '',
                inputDescription: '',
                inputTo: ''
            }))
    }

    addExperience = () => {
        fetch(`${API_URL}/profile/experience`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    userId: this.props.userId,
                    company: this.state.inputCompany,
                    title: this.state.inputTitle,
                    from: this.state.inputFrom,
                    to: !this.state.current ? this.state.inputTo : 'Present',
                    current: this.state.current,
                    description: this.state.inputDescription
                }
            )
        }).then(res => res.json())
            .then(() => {
                this.getExperience()
            })
    }

    render() {
        return (
            <div className="list-group-item">
                <div className="row">
                    <div className="col-lg-2">
                        <input
                            placeholder="Input Company Here"
                            onChange={async (e) =>
                                await this.setState({
                                    inputCompany: e.target.value
                                }
                                )}
                            value={this.state.inputCompany}
                        />
                    </div>
                    <div className="col-lg-2">
                        <input
                            placeholder="Input Title Here"
                            onChange={async (e) =>
                                await this.setState({
                                    inputTitle: e.target.value
                                }
                                )}
                            value={this.state.inputTitle}
                        />
                    </div>
                    <div className="col-lg-2">
                        <textarea
                            placeholder="Input Description Here"
                            onChange={async (e) =>
                                await this.setState({
                                    inputDescription: e.target.value
                                }
                                )}
                            value={this.state.inputDescription}
                        />
                    </div>
                    <div className="col-lg-2">
                        <input
                            type="date"
                            className="nav-item ml-auto form-control"
                            placeholder="From..."
                            onChange={async (e) =>
                                await this.setState({
                                    inputFrom: e.target.value
                                }
                                )}
                            value={this.state.inputFrom}
                        />
                    </div>
                    <div>
                        {this.state.current &&
                            <input
                                value={"Present"}
                                readOnly={"true"}
                                disabled={"true"}
                            />
                        }
                        {!this.state.current &&
                            <input
                                type="date"
                                placeholder="To"
                                onChange={async (e) =>
                                    await this.setState({
                                        inputTo: e.target.value
                                    }
                                    )}
                                value={this.state.inputTo}
                            />
                        }
                    </div>
                    <div className="col-lg-1">

                        <input
                            type="checkbox"
                            onChange={async (e) =>
                                await this.setState({
                                    current: !this.state.current
                                })
                            }

                            id="vehicle1" name="vehicle1"
                            value={this.state.current} />

                        <label htmlFor="vehicle1"> Present </label>
                    </div>

                    <div className="col-lg-1">
                        <button
                            onClick={() => {
                                this.addExperience()
                            }
                            }
                            className="btn btn-danger">
                            <i className="fas fa-plus-circle fa-lg"> </i>

                        </button>
                    </div>

                </div>
            </div>

        )
    }

}

//fetch userId from redux store
const mapStateToProps = (state) => {
    const { id } = state
    return {
        userId: id
    }
}

export default connect(mapStateToProps)(ExperienceTableComponent)