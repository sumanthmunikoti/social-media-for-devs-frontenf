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
        inputDescription: '',
        current: false,

        updateCompany: '',
        updateTitle: '',
        updateDescription: '',
        updateTo: '',
        updateFrom: '',
        updateCurrent: ''
    }

    componentDidMount = async () => {
        this.getExperience()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.experienceId !== this.props.experienceId)
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
            .then(response =>
                // console.log("response:", response.json())
                response.json()
            )
            .then(results =>
                // console.log(results[0].experience)
                this.setState({
                    experiences: results[0].experience,
                    inputCompany: '',
                    inputTitle: '',
                    inputFrom: '',
                    inputDescription: '',
                    inputTo: ''
                })
            )
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

    deleteExperience = (id) => {
        fetch(`${API_URL}/profile/experience/${id}`, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                userId: this.props.userId
            })
        })
            .then(response => {
                this.getExperience()
            })
    }

    render() {
        return (
            <div>

                <div className="list-group-item">
                    <div className="row">
                        {/*<ul className="row experience-ul">*/}
                        <div className="col-lg-2">Company</div>
                        <div className="hide-sm col-lg-2">Title</div>
                        <div className="hide-sm col-lg-2">Description</div>
                        <div className="hide-sm col-lg-2">From</div>
                        <div className="hide-sm col-lg-2">To</div>
                        {/*</ul>*/}
                    </div>
                </div>

                {
                    this.state.experiences &&
                    this.state.experiences.map(experience => <div className="list-group-item">
                        <div className="row" key={experience._id}>
                            <div className="col-lg-2">

                                {experience.company}

                            </div>
                            <div className="hide-sm col-lg-2">

                                {experience.title}

                            </div>
                            <div className="hide-sm col-lg-2">

                                {experience.description}

                            </div>
                            <div className="hide-sm col-lg-2">

                                {experience.from}

                            </div>
                            <div className="hide-sm col-lg-2">

                                {experience.to}

                            </div>

                            <div className="hide-sm col-lg-2">
                                <button
                                    className="btn btn-danger edit-button"
                                    onClick={async () => {
                                        await this.setState({
                                            updateCompany: experience.company,
                                            updateTitle: experience.title,
                                            updateDescription: experience.description,
                                            updateTo: experience.to,
                                            updateFrom: experience.from,
                                            updateCurrent: experience.current
                                        })
                                    }}
                                >

                                    <i className="far fa-edit"
                                    > </i>
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => this.deleteExperience(experience._id)}
                                >
                                        {console.log("expid",  experience._id)}
                                    <i className="far fa-trash-alt"> </i>

                                </button>
                            </div>


                        </div>
                    </div>)
                }

                <div className="list-group-item">
                    <div className="row">
                        <div className="col-lg-2">
                            <input
                                placeholder="Input Company Here"
                                onChange={async (e) =>
                                    this.setState({
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
                                    this.setState({
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
                                    this.setState({
                                        inputDescription: e.target.value
                                    }
                                    )}
                                value={this.state.inputDescription}
                            />
                        </div>
                        <div className="col-lg-2">
                            <input
                                type="date"
                                // className="nav-item ml-auto form-control"
                                placeholder="From..."
                                onChange={async (e) =>
                                    this.setState({
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
                                value={this.state.current} />

                            <label htmlFor="vehicle1"> Present </label>
                        </div>

                        <div className="col-lg-1">
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    this.addExperience()
                                }}>
                                Add Experience
                            </button>
                        </div>

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