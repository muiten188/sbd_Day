import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
    View,
    KeyboardAvoidingView,
    FlatList,
    TouchableOpacity,
    Alert,
    ScrollView
} from "react-native";
import {
    Container,
    Text,
    Button,
    Content,
    Body,
    Thumbnail,
    Form,
    Item,
    Input,
    H1,
    H2,
    H3,
    H6,
    Picker
} from "native-base";
import styles from "./styles";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import { InputField } from "../../components/Element/Form/index";
import Icon from "react-native-vector-icons/FontAwesome";
import * as NewsDetailAction from "../../store/actions/containers/newsDetail_action";
import Loading from "../../components/Loading";
import IconVector from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import EventSlider from '../../components/EventSlider';
import AutoHeightWebView from 'react-native-autoheight-webview';
import NewsSlider from '../../components/NewsSlider';
import * as helper from '../../helper';
const blockAction = false;
const blockLoadMoreAction = false;

class NewsDetail extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            languageSelect: 'vi'
        };
        this.loadSetting();
    }

    componentDidMount() {

    }

    async loadSetting() {
        var lang = await helper.getLangSetting();
        if (lang != null) {
            I18n.locale = lang;
            this.setState({
                languageSelect: lang
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        const locale = "vn";
        return (
            <Container style={styles.container}>
                <Grid>{/* marginBottom: 45 */}
                    <Row style={{ height: 100, borderBottomWidth: 1, borderBottomColor: '#cecece' }}>
                        <EventSlider listNews={[{}, {}, {}, {}]}></EventSlider>
                    </Row>
                    <Row>
                        <ScrollView>
                            <AutoHeightWebView source={{
                                html: `<html><div class="clearfix">
<div class="klw-body-top">


<div class="kbwc-header mb-20">


<h1 class="kbwc-title">Tuyệt Tình Cốc "đóng cửa" sau vụ Á hậu Thư Dung chụp ảnh khoe thân phản cảm</h1>

<div class="kbwc-meta" sourceid="0">
<span class="kbwcm-author">Linh Chi, </span>
<span class="kbwcm-source">Theo Lao động </span>
<span class="kbwcm-time" title="2018-08-17T10:55:00">10:55 17/08/2018</span>
</div>

<div class="kbwc-socials">

<a onclick="fbClient.shareClick('http://kenh14.vn/tuyet-tinh-coc-dong-cua-sau-vu-a-hau-thu-dung-chup-anh-khoe-than-phan-cam-20180817104138349.chn');" href="javascript:;" class="kbwcs-fb" rel="nofollow">Chia sẻ <span class="kbwcs-number fr item-fb item-fb-loaded" rel="/tuyet-tinh-coc-dong-cua-sau-vu-a-hau-thu-dung-chup-anh-khoe-than-phan-cam-20180817104138349.chn">2</span></a>


<div class="fb-like fb_iframe_widget" data-href="http://kenh14.vn/tuyet-tinh-coc-dong-cua-sau-vu-a-hau-thu-dung-chup-anh-khoe-than-phan-cam-20180817104138349.chn" data-layout="button_count" data-action="like" data-size="small" data-show-faces="false" data-share="false" fb-xfbml-state="rendered" fb-iframe-plugin-query="action=like&amp;app_id=1506977592847257&amp;container_width=0&amp;href=http%3A%2F%2Fkenh14.vn%2Ftuyet-tinh-coc-dong-cua-sau-vu-a-hau-thu-dung-chup-anh-khoe-than-phan-cam-20180817104138349.chn&amp;layout=button_count&amp;locale=vi_VN&amp;sdk=joey&amp;share=false&amp;show_faces=false&amp;size=small"><span style="vertical-align: bottom; width: 68px; height: 20px;"><iframe name="f3afafeae18a1bc" width="1000px" height="1000px" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" allow="encrypted-media" title="fb:like Facebook Social Plugin" src="https://www.facebook.com/v2.3/plugins/like.php?action=like&amp;app_id=1506977592847257&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2FQX17B8fU-Vm.js%3Fversion%3D42%23cb%3Df1e7fa2226c77fc%26domain%3Dkenh14.vn%26origin%3Dhttp%253A%252F%252Fkenh14.vn%252Ff36bfc1bf106d28%26relation%3Dparent.parent&amp;container_width=0&amp;href=http%3A%2F%2Fkenh14.vn%2Ftuyet-tinh-coc-dong-cua-sau-vu-a-hau-thu-dung-chup-anh-khoe-than-phan-cam-20180817104138349.chn&amp;layout=button_count&amp;locale=vi_VN&amp;sdk=joey&amp;share=false&amp;show_faces=false&amp;size=small" class="" style="border: none; visibility: visible; width: 68px; height: 20px;"></iframe></span></div>

<div class="fb-save fb_iframe_widget" data-uri="http://kenh14.vn/tuyet-tinh-coc-dong-cua-sau-vu-a-hau-thu-dung-chup-anh-khoe-than-phan-cam-20180817104138349.chn" data-size="small" fb-xfbml-state="rendered" fb-iframe-plugin-query="app_id=1506977592847257&amp;container_width=700&amp;locale=vi_VN&amp;sdk=joey&amp;size=small&amp;uri=http%3A%2F%2Fkenh14.vn%2Ftuyet-tinh-coc-dong-cua-sau-vu-a-hau-thu-dung-chup-anh-khoe-than-phan-cam-20180817104138349.chn"><span style="vertical-align: bottom; width: 126px; height: 20px;"><iframe name="fd038c353d0ffc" width="1000px" height="1000px" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" allow="encrypted-media" title="fb:save Facebook Social Plugin" src="https://www.facebook.com/v2.3/plugins/save.php?app_id=1506977592847257&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2FQX17B8fU-Vm.js%3Fversion%3D42%23cb%3Df1e0c4e00d8b8a8%26domain%3Dkenh14.vn%26origin%3Dhttp%253A%252F%252Fkenh14.vn%252Ff36bfc1bf106d28%26relation%3Dparent.parent&amp;container_width=700&amp;locale=vi_VN&amp;sdk=joey&amp;size=small&amp;uri=http%3A%2F%2Fkenh14.vn%2Ftuyet-tinh-coc-dong-cua-sau-vu-a-hau-thu-dung-chup-anh-khoe-than-phan-cam-20180817104138349.chn" style="border: none; visibility: visible; width: 126px; height: 20px;" class=""></iframe></span></div>


<div class="mailWrap fr">
<a title="Gửi email" href="mailto:?&amp;subject=[Kenh14.vn] Tuyệt Tình Cốc " đóng="" cửa"="" sau="" vụ="" Á="" hậu="" thư="" dung="" chụp="" ảnh="" khoe="" thân="" phản="" cảm&body="http://kenh14.vn/tuyet-tinh-coc-dong-cua-sau-vu-a-hau-thu-dung-chup-anh-khoe-than-phan-cam-20180817104138349.chn%0D%0ASau" l&#249;m="" x&#249;m="" d&#249;ng="" th&#226;n="" thể="" &quot;b&#244;i="" bẩn&quot;="" Đ&#224;="" lạt="" của="" &#193;="" dung,="" l&#227;nh="" đạo="" huyện="" lạc="" dương,="" tỉnh="" l&#226;m="" Đồng="" cho="" biết="" sẽ="" hạn="" chế="" du="" kh&#225;ch="" v&#224;o="" khu="" vực="" &quot;tuyệt="" t&#236;nh="" cốc&quot;="" bởi="" thực="" chất="" đ&#226;y="" chỉ="" l&#224;="" một="" điểm="" lịch="" tự="" ph&#225;t."="" rel="nofollow">
<div class="btn-mail"></div>
</a>
</div>
<div class="fbSendWrap fr mgr6">

<div class="fb-send" data-href="http://kenh14.vn/tuyet-tinh-coc-dong-cua-sau-vu-a-hau-thu-dung-chup-anh-khoe-than-phan-cam-20180817104138349.chn" data-colorscheme="light"></div>
</div>
</div>


</div>

<div class="klw-new-content">


<div class="knc-menu-nav">
<div class="kmn-wrapper" id="menuNav">
<div class="kmnw-content">
<div class="kc-item kc-comment no-comment">
<a href="#k14-detail-comment" rel="nofollow" title="Bình luận">
<span class="item-comment-not-async" rel="/tuyet-tinh-coc-dong-cua-sau-vu-a-hau-thu-dung-chup-anh-khoe-than-phan-cam-20180817104138349.chn">Bình<br>Luận</span>
</a>
</div>

<div class="kc-item kc-home">
<a href="/" class="icon-kch" title="Trang chủ"></a>
</div>

<div class="kc-item kc-facebook">
<a onclick="fbClient.shareClick('http://kenh14.vn/tuyet-tinh-coc-dong-cua-sau-vu-a-hau-thu-dung-chup-anh-khoe-than-phan-cam-20180817104138349.chn');" href="javascript:;" class="icon-kcf" title="Chia sẻ"></a>
</div>

<div class="kc-item kc-messenger">
<a onclick="fbClient.sendClick('http://kenh14.vn/tuyet-tinh-coc-dong-cua-sau-vu-a-hau-thu-dung-chup-anh-khoe-than-phan-cam-20180817104138349.chn');" href="javascript:;" class="icon-kcm" title="Gửi"></a>
</div>
</div>
</div>
</div>

<h2 class="knc-sapo">
Sau vụ lùm xùm dùng thân thể "bôi bẩn" Đà Lạt của Á hậu Thư Dung, lãnh đạo huyện Lạc Dương, tỉnh Lâm Đồng cho biết sẽ hạn chế du khách vào khu vực "Tuyệt Tình Cốc" bởi thực chất đây chỉ là một điểm du lịch tự phát.
</h2>






<div class="knc-relate-wrapper relationnews">
<ul class="krw-list">

<li class="krwli">
<a data-newsid="20180815142303554" href="/nam-nguoi-mau-trong-bo-anh-phan-cam-tai-tuyet-tinh-coc-da-lat-cung-a-hau-thu-dung-toi-khong-lo-lang-khi-cong-an-vao-cuoc-vi-do-la-nghe-thuat-20180815142303554.chn" title="Nam người mẫu chụp cùng Á hậu Thư Dung trong bộ ảnh phản cảm tại Tuyệt Tình Cốc Đà Lạt: &quot;Tôi không lo lắng khi công an vào cuộc, vì đó là nghệ thuật&quot;" data-popup-url="/nam-nguoi-mau-trong-bo-anh-phan-cam-tai-tuyet-tinh-coc-da-lat-cung-a-hau-thu-dung-toi-khong-lo-lang-khi-cong-an-vao-cuoc-vi-do-la-nghe-thuat-20180815142303554rf20180817104138349.chn" class="show-popup visit-popup">
Nam người mẫu chụp cùng Á hậu Thư Dung trong bộ ảnh phản cảm tại Tuyệt Tình Cốc Đà Lạt: "Tôi không lo lắng khi công an vào cuộc, vì đó là nghệ thuật"
<i class="icon-show-popup"></i>
</a>
</li>

<li class="krwli">
<a data-newsid="20180815120833929" href="/cong-an-vao-cuoc-vu-a-hau-thu-dung-khoe-than-phan-cam-o-tuyet-tinh-coc-da-lat-20180815120833929.chn" title="Công an vào cuộc vụ Á hậu Thư Dung khoe thân phản cảm ở Tuyệt Tình Cốc Đà Lạt" data-popup-url="/cong-an-vao-cuoc-vu-a-hau-thu-dung-khoe-than-phan-cam-o-tuyet-tinh-coc-da-lat-20180815120833929rf20180817104138349.chn" class="show-popup visit-popup">
Công an vào cuộc vụ Á hậu Thư Dung khoe thân phản cảm ở Tuyệt Tình Cốc Đà Lạt
<i class="icon-show-popup"></i>
</a>
</li>

<li class="krwli">
<a data-newsid="20180814153027781" href="/bat-chap-du-luan-chi-trich-kich-liet-a-hau-thu-dung-van-than-nhien-dang-tiep-loat-anh-khoe-than-phan-cam-o-tuyet-tinh-coc-da-lat-20180814153027781.chn" title="Bất chấp dư luận chỉ trích kịch liệt, Á hậu Thư Dung vẫn thản nhiên đăng tiếp loạt ảnh khoe thân phản cảm ở Tuyệt Tình Cốc Đà Lạt" data-popup-url="/bat-chap-du-luan-chi-trich-kich-liet-a-hau-thu-dung-van-than-nhien-dang-tiep-loat-anh-khoe-than-phan-cam-o-tuyet-tinh-coc-da-lat-20180814153027781rf20180817104138349.chn" class="show-popup visit-popup">
Bất chấp dư luận chỉ trích kịch liệt, Á hậu Thư Dung vẫn thản nhiên đăng tiếp loạt ảnh khoe thân phản cảm ở Tuyệt Tình Cốc Đà Lạt
<i class="icon-show-popup"></i>
</a>
</li>

</ul>
</div>

<div class="react-relate animated hiding-react-relate">
</div>

<div data-check-position="body_start"></div>
<div class="knc-content">

<!-- Kham pha -->


<div class="VCSortableInPreviewMode active" style="" type="Photo"><div><a href="https://kenh14cdn.com/2018/8/17/photo-1-15344771758341509221491.jpg" data-fancybox-group="img-lightbox" title="Bộ ảnh gây tranh cãi của Á hậu Thư Dung tại Tuyệt Tình Cốc, Đà Lạt." target="_blank" class="detail-img-lightbox"><img style="width:100%;max-width:100%;" src="https://kenh14cdn.com/2018/8/17/photo-1-15344771758341509221491.jpg" id="img_2bf7ea50-a1cf-11e8-bead-9fc262910c0c" w="888" h="592" alt="Tuyệt Tình Cốc đóng cửa sau vụ Á hậu Thư Dung chụp ảnh khoe thân phản cảm - Ảnh 1." title="Tuyệt Tình Cốc đóng cửa sau vụ Á hậu Thư Dung chụp ảnh khoe thân phản cảm - Ảnh 1." rel="lightbox" photoid="2bf7ea50-a1cf-11e8-bead-9fc262910c0c" type="photo" data-original="https://kenh14cdn.com/2018/8/17/photo-1-15344771758341509221491.jpg" width="" height="" class="lightbox-content"></a></div><div class="PhotoCMS_Caption"><p data-placeholder="[nhập chú thích]">Bộ ảnh gây tranh cãi của Á hậu Thư Dung tại Tuyệt Tình Cốc, Đà Lạt.</p></div></div><p>Những ngày qua, dư luận xôn xao bởi bộ ảnh Á hậu Thư Dung<strong> </strong> cùng hai người bạn thực hiện bộ ảnh bị cho là hở hang, phản cảm tại địa điểm có tên gọi "Tuyệt Tình Cốc" (thuộc huyện Lạc Dương, tỉnh Lâm Đồng).</p><p>Liên quan đến sự việc trên, trao đổi với Lao Động, ông Phạm Triều - Chủ tịch Uỷ ban nhân dân huyện Lạc Dương, cho biết huyện đã giao cho lực lượng công an và các đơn vị liên quan vào cuộc xử lý điểm du lịch "Tuyệt Tình Cốc" bởi thực chất đây là điểm du lịch tự phát và khá nguy hiểm.</p><p>"Tuyệt Tình Cốc thực chất không phải là một điểm du lịch, đây chỉ là một mỏm đá cũ do dân phượt kháo nhau và trở thành một điểm du lịch tự phát. Có nhiều khách đến theo kiểu dân đi phượt, đường vào địa điểm này cũng rất nguy hiểm nên bây giờ chúng tôi sẽ cấm không cho các xe vào", ông Triều cho biết.</p><p>Mặc dù vậy, ông Triều bày tỏ lo ngại đối với các khách du lịch theo kiểu phượt sẽ khiến việc cấm trở nên khó khăn. "Khách&nbsp;đi phượt nghe chừng cũng khó cấm nhưng chúng tôi cũng đã có những điểm cảnh báo nguy hiểm, cảnh báo mất an toàn. Xe chở người vào thì chúng tôi sẽ không cho vào nhất là mùa mưa này", ông Triều nhấn mạnh.</p><p>Chủ tịch Uỷ ban nhân dân huyện Lạc Dương cũng cho biết thêm việc đặt các biển cảnh báo nguy hiểm đã diễn ra từ lâu chứ không phải bây giờ mới tồn tại.</p> <div class="VCSortableInPreviewMode" style="" type="Photo"><div><a href="https://kenh14cdn.com/2018/8/17/photo-1-15344771480011617725374.jpg" data-fancybox-group="img-lightbox" title="Tuyệt Tình Cốc thực chất là địa điểm khá nguy hiểm." target="_blank" class="detail-img-lightbox"><img style="width:100%;max-width:100%;" src="https://kenh14cdn.com/2018/8/17/photo-1-15344771480011617725374.jpg" id="img_1bc83d10-a1cf-11e8-b75d-bb13c861de77" w="660" h="440" alt="Tuyệt Tình Cốc đóng cửa sau vụ Á hậu Thư Dung chụp ảnh khoe thân phản cảm - Ảnh 2." title="Tuyệt Tình Cốc đóng cửa sau vụ Á hậu Thư Dung chụp ảnh khoe thân phản cảm - Ảnh 2." rel="lightbox" photoid="1bc83d10-a1cf-11e8-b75d-bb13c861de77" type="photo" data-original="https://kenh14cdn.com/2018/8/17/photo-1-15344771480011617725374.jpg" width="" height="" class="lightbox-content"></a></div><div class="PhotoCMS_Caption"><p data-placeholder="[nhập chú thích]">Tuyệt Tình Cốc thực chất là địa điểm khá nguy hiểm.</p></div></div><p>Liên quan đến việc Á hậu Thư Dung chụp loạt ảnh với trang phục hở hang và tạo dáng phản cảm, đại diện&nbsp;Cục Nghệ thuật Biểu diễn, Bộ Văn hóa Thể thao và Du lịch cho biết: "Nội dung này thuộc thẩm quyền kiểm tra của Sở Văn hoá Thể Thao và Du lịch tỉnh Lâm Đồng. Chúng tôi đang nắm tình hình kiểm tra xử lý của Sở".</p><div id="admzone474524"></div><p>Về phía Sở Văn hoá Thể thao và Du lịch tỉnh Lâm Đồng, ông Trần Mạnh Linh - Chánh văn phòng Sở Văn hoá Thể thao và Du lịch tỉnh Lâm Đồng - khẳng định đã yêu cầu các đơn vị liên quan phối hợp cùng Công an thành phố Đà Lạt điều tra, làm rõ vụ việc.</p><p>Trước đó, trả lời báo chí, bà Nguyễn Thị Nguyên - Giám đốc Sở Văn hoá Thể thao và Du lịch tỉnh Lâm Đồng cho biết đã yêu cầu xác minh vụ việc và sẽ cung cấp thông tin cho báo chí khi có kết quả.</p><p>Hiện phía Á hậu Thư Dung<strong> </strong>vẫn chưa đưa ra câu trả lời chính thức về lùm xùm, tuy nhiên người bạn diễn nam của Thư Dung - người mẫu Danh Ngọc khẳng định anh cảm thấy bộ ảnh đẹp và ý nghĩa.</p>


</div>
<!-- LIVE -->


<div data-check-position="body_end"></div>

<div class="knc-rate-link">

<a href="/dan-nhiep-anh-noi-ve-bo-hinh-khoe-than-o-tuyet-tinh-coc-khong-ung-ho-viec-loi-dung-nhiep-anh-de-cho-ra-nhung-tac-pham-phan-cam-20180815231929773.chn" title="Dân nhiếp ảnh nói về bộ hình &quot;khoe thân&quot; ở Tuyệt Tình Cốc: Không ủng hộ việc lợi dụng nhiếp ảnh để cho ra những tác phẩm phản cảm" class="krl">
Dân nhiếp ảnh nói về bộ hình "khoe thân" ở Tuyệt Tình Cốc: Không ủng hộ việc lợi dụng nhiếp ảnh để cho ra những tác phẩm phản cảm
</a>

</div>
</div>
<div class="post_embed">
<div id="admzone38016"></div>
<script>
admicroAD.unit.push(function () { admicroAD.show('admzone38016') });
</script>
</div>
<div class="klw-nomargin">
<div class="klw-new-socials clearfix">
<div class="kns-social clearfix">
<a class="fl mgr6 mt-3" href="https://embed2.linkhay.com/actions/link/post/embed.php?source_url=http://kenh14.vn/tuyet-tinh-coc-dong-cua-sau-vu-a-hau-thu-dung-chup-anh-khoe-than-phan-cam-20180817104138349.chn" target="_blank" rel="nofollow">
<img class="btn-linkhay">
</a>
<div class="fl fbSendWrap mt-3 mgr6">

<div class="fb-send" data-href="http://kenh14.vn/tuyet-tinh-coc-dong-cua-sau-vu-a-hau-thu-dung-chup-anh-khoe-than-phan-cam-20180817104138349.chn" data-colorscheme="light"></div>
</div>
<a onclick="fbClient.shareClick('http://kenh14.vn/tuyet-tinh-coc-dong-cua-sau-vu-a-hau-thu-dung-chup-anh-khoe-than-phan-cam-20180817104138349.chn');" href="javascript:;" class="kbwcs-fb fl mgr6 mt-3" rel="nofollow">Chia sẻ <span class="kbwcs-number fr item-fb item-fb-loaded" rel="/tuyet-tinh-coc-dong-cua-sau-vu-a-hau-thu-dung-chup-anh-khoe-than-phan-cam-20180817104138349.chn">2</span></a>
<div class="fl fbLikeWrap mt-3">

<div class="fb-like fb_iframe_widget" data-href="http://kenh14.vn/tuyet-tinh-coc-dong-cua-sau-vu-a-hau-thu-dung-chup-anh-khoe-than-phan-cam-20180817104138349.chn" data-layout="button_count" data-action="like" data-size="small" data-show-faces="false" data-share="false" fb-xfbml-state="rendered" fb-iframe-plugin-query="action=like&amp;app_id=1506977592847257&amp;container_width=0&amp;href=http%3A%2F%2Fkenh14.vn%2Ftuyet-tinh-coc-dong-cua-sau-vu-a-hau-thu-dung-chup-anh-khoe-than-phan-cam-20180817104138349.chn&amp;layout=button_count&amp;locale=vi_VN&amp;sdk=joey&amp;share=false&amp;show_faces=false&amp;size=small"><span style="vertical-align: bottom; width: 68px; height: 20px;"><iframe name="f26ea62dfe4b09" width="1000px" height="1000px" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" allow="encrypted-media" title="fb:like Facebook Social Plugin" src="https://www.facebook.com/v2.3/plugins/like.php?action=like&amp;app_id=1506977592847257&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2FQX17B8fU-Vm.js%3Fversion%3D42%23cb%3Df22d187e7f2ca9c%26domain%3Dkenh14.vn%26origin%3Dhttp%253A%252F%252Fkenh14.vn%252Ff36bfc1bf106d28%26relation%3Dparent.parent&amp;container_width=0&amp;href=http%3A%2F%2Fkenh14.vn%2Ftuyet-tinh-coc-dong-cua-sau-vu-a-hau-thu-dung-chup-anh-khoe-than-phan-cam-20180817104138349.chn&amp;layout=button_count&amp;locale=vi_VN&amp;sdk=joey&amp;share=false&amp;show_faces=false&amp;size=small" class="" style="border: none; visibility: visible; width: 68px; height: 20px;"></iframe></span></div>

</div>
<div class="fr">
<div id="admViewtotal">
<div id="admzone40817"></div>
</div>
<script>
admicroAD.unit.push(function () { admicroAD.show('admzone40817') });
</script>

</div>
</div>
</div>
<div class="klw-new-tags clearfix">
<ul class="knt-list">

<li class="kli"><a href="/tin-nong-xa-hoi.html" title="tin nóng xã hội">tin nóng xã hội</a></li>

<li class="kli"><a href="/tuyet-tinh-coc-dong-cua.html" title="Tuyệt Tình Cốc &quot;đóng cửa">Tuyệt Tình Cốc "đóng cửa</a></li>

<li class="kli"><a href="/chup-anh-khoe-than-phan-cam-o-da-lat.html" title="chụp ảnh khoe thân phản cảm ở đà lạt">chụp ảnh khoe thân phản cảm ở đà lạt</a></li>

<li class="kli"><a href="/a-hau-thu-dung-chup-anh-khoe-than-phan-cam.html" title="Á hậu Thư Dung chụp ảnh khoe thân phản cảm">Á hậu Thư Dung chụp ảnh khoe thân phản cảm</a></li>

<li class="kli"><a href="/chup-anh-khoe-than-phan-cam.html" title="chụp ảnh khoe thân phản cảm">chụp ảnh khoe thân phản cảm</a></li>

<li class="kli"><a href="/a-hau-chup-anh-phan-cam-o-da-lat.html" title="Á hậu chụp ảnh phản cảm ở Đà Lạt">Á hậu chụp ảnh phản cảm ở Đà Lạt</a></li>

</ul>
</div>

</div>
</div>






<div class="detail-bottom-ads klw-nomargin">

<div id="admzone56"></div>
<script>
admicroAD.unit.push(function () { admicroAD.show('admzone56') });
</script>
</div>





<div class="ads-sponsor type-2 adm-hidden">
<div id="admsection5"></div>
</div>
<div class="ads-sponsor type-6 hidden">
<div id="admsection65"></div>
</div>
<div class="adm-commentsection klw-nomargin">
<div class="klw-body-bottom">
<div class="klw-new-comment" id="k14-detail-comment" style="margin-top: 30px;">
<h3 class="klwnc-title">Bình luận
</h3>

<div class="comment mgt20">
<div id="mingid_comments_content">
<div id="comment_loading" style="text-align: center; display: none;"><img style="height:15px;" src="https://mingid.mediacdn.vn/v4/images/comment/loading_head.gif"></div><iframe width="100%" height="0" border="medium none" overflow="hidden" scrolling="no" frameborder="0" id="mingid_comment_iframe" src="https://comment.vietid.net/comments?app_key=d9c694bd04eb35d96f1d71a84141d075&amp;content_url=http://kenh14.vn/news-20180817104138349.chn&amp;news_title=VHV54buHdCBUw6xuaCBD4buRYyAixJHDs25nIGPhu61hIiBzYXUgduG7pSDDgSBo4bqtdSBUaMawIER1bmcgY2jhu6VwIOG6o25oIGtob2UgdGjDom4gcGjhuqNuIGPhuqNt&amp;num_count=5&amp;debugcache=1&amp;min=0&amp;scroll=0&amp;http_referer=http://kenh14.vn/tuyet-tinh-coc-dong-cua-sau-vu-a-hau-thu-dung-chup-anh-khoe-than-phan-cam-20180817104138349.chn&amp;verify=1&amp;verify_flag=8109a8b139b6599d2805b1f9f44184fa&amp;funny_flag=0&amp;height=238&amp;iframe_comment_id=mingid_comment_iframe&amp;comment_flag=0&amp;news_url_short=xa-hoi&amp;real_time=undefined&amp;is_hidden_comment=0" style="height: 300px;"></iframe></div>

<div style="position: absolute; top: 0px; left: 720px;">
<div class="ads-full-width hidden">
<div id="admzone40833"></div>
</div>
<div class="ads-sponsor type-2 adm-hidden">
<div id="admsection6"></div>
</div>
</div>
</div>
<script type="text/javascript">

$(window).load(function() {
MINGID_IFRAME_FUNC.mingidGenIfram('100%', 238, 'd9c694bd04eb35d96f1d71a84141d075', 'http://kenh14.vn/news-20180817104138349.chn', 'VHV54buHdCBUw6xuaCBD4buRYyAixJHDs25nIGPhu61hIiBzYXUgduG7pSDDgSBo4bqtdSBUaMawIER1bmcgY2jhu6VwIOG6o25oIGtob2UgdGjDom4gcGjhuqNuIGPhuqNt', 5, 1, 0, 0, 'http://kenh14.vn/tuyet-tinh-coc-dong-cua-sau-vu-a-hau-thu-dung-chup-anh-khoe-than-phan-cam-20180817104138349.chn', 'mingid_comments_content', 'mingid_comment_iframe', '1', '8109a8b139b6599d2805b1f9f44184fa', '0','0','xa-hoi');
});

(runinit = window.runinit || []).push(function () {
if ($('.kenh14-wrapper').hasClass('size-l')) {
admicroAD.unit.push(function () { admicroAD.show('admzone40833') });
}
});
</script>

<div class="clearboth"></div>
</div>
</div>

<div class="clearboth"></div>
</div>

</div></html>` }}>

                            </AutoHeightWebView>
                        </ScrollView>
                    </Row>
                    <Row style={{ height: 70, borderTopWidth: 1, borderTopColor: '#cecece' }}>
                        <NewsSlider listNews={[{}, {}, {}]}></NewsSlider>
                    </Row>
                </Grid>
            </Container>
        );
    }

    renderFlatListItem(dataItem) {
        const item = dataItem.item;
        return (
            <View
                key={item.index}
                style={
                    styles.item_container_half
                }
                onPress={() => {
                    // if (!blockAction) {
                    //     blockAction = true;

                    // }
                }}
            >
                <ItemNewsDetailConfirm></ItemNewsDetailConfirm>
                <ItemNewsDetail></ItemNewsDetail>
            </View>
        );
    }

    _keyExtractor(item, index) {
        return index;
    }

    textEclipse(text) {
        return (((text).length > 125) ?
            (((text).substring(0, 125)) + '...') :
            text)
    }
}
function mapStateToProps(state, props) {
    return {
        NewsDetailReducer: state.NewsDetailReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        NewsDetailAction: bindActionCreators(NewsDetailAction, dispatch)
    };
}

NewsDetail = connect(mapStateToProps, mapToDispatch)(NewsDetail);
export default NewsDetail;
