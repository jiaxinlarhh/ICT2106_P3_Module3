import React, { Component } from 'react';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userCount: props.userCount,
            isThresholdReached: false,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userCount !== this.props.userCount) {
            if (this.props.userCount <= this.props.threshold) {
                this.setState({ isThresholdReached: true });
            } else {
                this.setState({ isThresholdReached: false });
            }
        }
    }

    render() {
        const { isThresholdReached } = this.state;

        return (
            <div>
                {isThresholdReached && (
                    <div className="notification">
                        User count has dropped below the threshold value!
                    </div>
                )}
            </div>
        );
    }
}
export default Notification;