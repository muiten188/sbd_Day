import Icon from "react-native-vector-icons/FontAwesome";
export const list_Menu = [
    // {
    //     mName:'Checkin',
    //     IconName:'check',
    //     isIcon:true,
    //     mID:'checkIn',
    //     routerName:'profile'
    // },
    {
        mName: 'Schedule',
        IconName: require('../resources/assets/icon/LichSuKien.png'),
        mID: 'schedule',
        routerName: 'schedule'
    },
    {
        mName: '_presentation',
        IconName: 'user',
        isIcon: true,
        mID: 'presentation',
        routerName: 'presentation'
    },
    {
        mName: 'Product',
        IconName: require('../resources/assets/icon/SanPhamTrungBay.png'),
        mID: 'product',
        routerName: 'product'
    },
    {
        mName: 'Parties',
        IconName: 'group',
        isIcon: true,
        mID: 'parties',
        routerName: 'parties'
    },
    // {
    //     mName:'News',
    //     IconName:'newspaper-o',
    //     mID:'news',
    //     routerName:'news'
    // },
    // {
    //     mName:'Speech',
    //     IconName:'microphone',
    //     mID:'speech',
    //     routerName:'presentation'
    // },


    {
        mName: 'Survey',
        IconName: require('../resources/assets/icon/KhaoSat.png'),
        mID: 'survey',
        routerName: 'survey'
    }, {
        mName: 'Map',
        IconName: require('../resources/assets/icon/BanDo.png'),
        mID: 'location',
        routerName: 'location'
    },
]