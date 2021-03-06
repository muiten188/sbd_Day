import { getStatusBarHeight } from 'react-native-status-bar-height';

export default {
  container: {
    height: "100%",
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: getStatusBarHeight(true)
  },
  colorHeader: {
    color: '#007db7'
  },
  gridHistory: {
    borderTopWidth: 2,
    borderTopColor: '#e8eff5'
  },
  headerHistory: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowSearch:{
    height:50,
    marginBottom:6
  },
  whileText:{
    color:'#fff'
  }
}