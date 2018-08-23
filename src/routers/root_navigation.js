import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Platform, BackHandler, ToastAndroid } from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';
//list screen
import Login from '../authen/containers/Login';
import Register from '../authen/containers/Register';
import Home from '../containers/Home';
import Eventlist from '../containers/Event_List';
import Profile from '../containers/Profile';
import Schedule from '../containers/Schedule';
import News from '../containers/News';
import Parties from '../containers/Parties';
import NewsDetail from '../containers/NewsDetail';
import Guider from '../containers/Guider';
import GuiderRating from '../containers/Guider_rating';
import QrCodeScanner from '../containers/QrScanner';
import PresentationDetail from '../containers/PresentationDetail';
import Presentation from '../containers/Presentation';
import MuseumMap from '../containers/Museum_map';
import ChangePassword from '../containers/ChangePassword';
import NotificationDetail from '../containers/Notification_Detail';
import Preview from '../components/Preview';
class RootNavigation extends React.Component {
    //Life cycle component
    constructor(props) {
        super(props);
        this._handleBackAction = this.handleBackAction.bind(this);
    }

    componentDidMount() {
        if (Platform.OS == "android") {
            BackHandler.addEventListener('backPress', this._handleBackAction);
        }
    }

    componentWillUnmount() {
        if (Platform.OS == "android") {
            BackHandler.removeEventListener('backPress', this._handleBackAction);
        }
    }
    //component function
    handleBackAction() {
        if (Platform.OS == "android") {
            ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        }
        //pop
    }

    render() {
        return (
            <Router>
                <Stack key="root_authen">
                    <Scene key="login"
                        component={Login}
                        title="Login"
                        initial={true}
                    />
                    <Scene
                        key="register"
                        component={Register}
                        title="Register"
                    />
                    <Scene key="home"
                        component={Home}
                        title="Home"
                        initial={false}
                    />
                    <Scene key="Schedule"
                        component={Schedule}
                        title="Schedule"
                        initial={false}>
                    </Scene>
                    <Scene key="News"
                        component={News}
                        title="product list"
                        initial={false}>
                    </Scene>
                    <Scene key="Parties"
                        component={Parties}
                        title="museum product"
                        initial={false}>
                    </Scene>
                    <Scene key="NewsDetail"
                        component={NewsDetail}
                        title="search History"
                        initial={false}>
                    </Scene>
                    <Scene key="PresentationDetail"
                        component={PresentationDetail}
                        title="News History"
                        initial={false}>
                    </Scene>
                    <Scene key="changePassword"
                        component={ChangePassword}
                        title="changePassword"
                        initial={false}>
                    </Scene>
                    <Scene key="guiderRating"
                        component={GuiderRating}
                        title="Guider Rating"
                        initial={false}>
                    </Scene>
                    <Scene key="qrScanner"
                        component={QrCodeScanner}
                        title="qrScanner"
                        initial={false}>
                    </Scene>
                    <Scene key="Presentation"
                        component={Presentation}
                        title="Search Museum"
                        initial={false}>
                    </Scene>
                    <Scene key="notificationDetail"
                        component={NotificationDetail}
                        title="NotificationDetail"
                        initial={false}>
                    </Scene>
                    <Scene key="preview"
                        component={Preview}
                        title="preview"
                        initial={false}>
                    </Scene>
                    
                </Stack>
            </Router>
        );
    }
}
RootNavigation.propTypes = {

}

function mapStateToProps(state, props) {
    return {
        //navigationReducer: state.navigationReducer,
    }
};
function mapToDispatch(dispatch) {
    return {
        //navigationAction: bindActionCreators(navigationAction, dispatch),
    }
}

export default connect(mapStateToProps, mapToDispatch)(RootNavigation);