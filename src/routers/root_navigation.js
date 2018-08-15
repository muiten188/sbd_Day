import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Platform, BackHandler, ToastAndroid } from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';
//list screen
import Login from '../authen/containers/Login';
import Register from '../authen/containers/Register';
import Home from '../containers/Home';
import Museumlist from '../containers/Museum_list';
import Profile from '../containers/Profile';
import Museum_detail from '../containers/Museum_detail';
import ProductList from '../containers/Product_list';
import Museum_product from '../containers/Museum_product';
import Search_history from '../containers/Search_history';
import Guider from '../containers/Guider';
import GuiderRating from '../containers/Guider_rating';
import QrCodeScanner from '../containers/QrScanner';
import NewsPreview from '../containers/NewsPreview';
import SearchMuseum from '../containers/Search_museum';
import MuseumMap from '../containers/Museum_map';
import PropTypes from 'prop-types';

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
                    <Scene key="museumDetail"
                        component={Museum_detail}
                        title="museum Detail"
                        initial={false}>
                    </Scene>
                    <Scene key="productList"
                        component={ProductList}
                        title="product list"
                        initial={false}>
                    </Scene>
                    <Scene key="museumProduct"
                        component={Museum_product}
                        title="museum product"
                        initial={false}>
                    </Scene>
                    <Scene key="searchHistory"
                        component={Search_history}
                        title="search History"
                        initial={false}>
                    </Scene>
                    <Scene key="newsPreview"
                        component={NewsPreview}
                        title="News History"
                        initial={false}>
                    </Scene>
                    <Scene key="guider"
                        component={Guider}
                        title="Guider"
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
                    <Scene key="searchMuseum"
                        component={SearchMuseum}
                        title="Search Museum"
                        initial={false}>
                    </Scene>
                    <Scene key="museumMap"
                        component={MuseumMap}
                        title="Museum Map"
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