import React from "react";
const FBSDK = require('react-native-fbsdk');
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  View,
  TouchableOpacity,
  UIManager,
  findNodeHandle,
  AsyncStorage,
  Alert,
  FlatList
} from "react-native";
import { Button, Text, Thumbnail, Container, Badge, Input, H3 } from "native-base";
import IconVector from "react-native-vector-icons/FontAwesome";
import * as commentAction from "../../store/actions/component/comment_action";
import * as appAction from "../../store/actions/app_action";
import * as AppConfig from "../../config/app_config";
import styles from "./styles";
import { Actions } from "react-native-router-flux";
import { Grid, Col, Row } from "react-native-easy-grid";
const { LoginButton, LoginManager, ShareDialog, AccessToken, GraphRequestManager, GraphRequest } = FBSDK;
// const resolveAssetSource = require("resolveAssetSource");
// const userAvar = require("../../resources/assets/Comment.jpg");
// const ICON_SIZE = 24;


class Comment extends React.Component {
  handleShowPopupError = () => {
    // show error here
  };

  constructor(props) {
    super(props);

    this.state = {
      commentMessage: ''
    };
  }


  componentDidMount() {
    const { search_Comment } = this.props.commentAction;
    const { loginReducer } = this.props;
    if (this.props.objectId) {
      search_Comment({
        objectId: this.props.objectId,
        objectType: this.props.type
      }, 1, 1000, loginReducer.user);
    }
  }

  componentDidUpdate() {
    const { saveCommentSuccess } = this.props.commentReducer;
    const { clear_Save_CommentError } = this.props.commentAction;
    if (saveCommentSuccess == true) {
      Alert.alert("Thông báo", "Bình luận sẽ được hiện thị khi được admin duyệt.", [{
        text: 'Ok',
        onPress: (e) => {
          clear_Save_CommentError();
        }
      }],
        { cancelable: false });
    }
  }

  render() {
    const { loginReducer } = this.props;
    const { listComment, isLoading, searchListCommentError } = this.props.commentReducer;
    const { save_Comment } = this.props.commentAction;
    return (
      <View style={styles.viewContain}>
        <Grid>
          <Row style={{ height: 30, justifyContent: 'flex-start', alignItems: 'center' }}>
            <H3>Bình luận</H3>
          </Row>
          {(listComment && listComment.length > 0) ? <FlatList
            style={styles.listResult}
            data={listComment ? listComment : []}
            keyExtractor={this._keyExtractor}
            renderItem={this.renderItemComment.bind(this)}
            horizontal={false}
            numColumns={1}
          /> : null}
          {loginReducer.user != null ? <Row style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            borderBottomWidth: 0.5,
            borderBottomColor: '#cecece',
            paddingBottom: 6,
            minHeight: 50
          }}>
            <Col style={{ width: 50 }}>
              <Thumbnail style={{ width: 50, height: 50 }} square source={{ uri: 'https://cdn.washingtoncitypaper.com/files/base/scomm/wcp/image/2009/04/640w/__contexts.org_socimages_files_2009_04_d_silhouette.jpg' }} />
            </Col>
            <Col style={{ paddingLeft: 10, flex: 1, minHeight: 50 }}>
              <Row style={{ height: 20, width: '100%' }}>
                <Col>
                  <Text style={{ fontSize: 14, fontWeight: '500' }}>
                    {loginReducer.user.user.firstName + " " + loginReducer.user.user.lastName}
                  </Text>
                </Col>
              </Row>
              <Row style={{}}>
                <Col style={{ marginRight: 6 }}>
                  <Input value={this.state.commentMessage}
                    style={{ borderWidth: 0.5, borderColor: '#cecece' }}
                    onChangeText={(value) => {
                      this.setState({ commentMessage: value })
                    }}
                    placeholder={"Bình luận..."} />
                </Col>
                <Col style={{ width: 60 }}>
                  <Button disabled={this.state.commentMessage == ''} onPress={() => {
                    save_Comment({
                      objectId: this.props.objectId,
                      objectType: this.props.type,
                      content: this.state.commentMessage
                    }, loginReducer.user)
                    this.setState({
                      commentMessage: ''
                    })
                  }}>
                    <Text>
                      Gửi
                    </Text>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row> : <Row style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            borderBottomWidth: 0.5,
            borderBottomColor: '#cecece',
            height: 50
          }}>
              <Button onPress={()=>{Actions.login()}}>
                <Text>Đăng nhập để bình luận</Text>
              </Button>
            </Row>}
        </Grid>
      </View>
    );
  }
  _keyExtractor(item, index) {
    return index;
  }

  renderItemComment(dataItem) {
    var item = dataItem.item;
    var index = dataItem.index;
    const { listComment } = this.props.commentReducer;

    const { loginReducer } = this.props;
    return (
      <View style={{
        minHeight: 80,
        marginBottom: 10,
        width: '100%',
        paddingLeft: 10,
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}>
        <Grid>
          <Row style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            borderBottomWidth: 0.5,
            borderBottomColor: '#cecece',
            paddingBottom: 6
          }}>
            <Col style={{ width: 50 }}>
              <Thumbnail style={{ width: 50, height: 50 }} square source={{ uri: 'https://cdn.washingtoncitypaper.com/files/base/scomm/wcp/image/2009/04/640w/__contexts.org_socimages_files_2009_04_d_silhouette.jpg' }} />
            </Col>
            <Col style={{ paddingLeft: 10, flex: 1, minHeight: 50 }}>
              <Row style={{ height: 20, width: '100%' }}>
                <Col>
                  <Text style={{ fontSize: 14, fontWeight: '500' }}>
                    {item ? item.guestName : ''}
                  </Text>
                </Col>
                <Col style={{ alignItems: 'flex-end', paddingRight: 10 }}>
                  <Text style={{ fontSize: 12 }}>
                    {item ? item.createdDate : ''}
                  </Text>
                </Col>
              </Row>
              <Row>
                <Text style={{ fontSize: 13 }}>
                  {item ? item.content : ''}
                </Text>
              </Row>
            </Col>
          </Row>

        </Grid>
      </View>
    )
  }
}
function mapStateToProps(state, props) {
  return {
    commentReducer: state.commentReducer,
    loginReducer: state.loginReducer
  };
}
function mapToDispatch(dispatch) {
  return {
    commentAction: bindActionCreators(commentAction, dispatch)
  };
}

Comment = connect(mapStateToProps, mapToDispatch)(Comment);
export default Comment;
