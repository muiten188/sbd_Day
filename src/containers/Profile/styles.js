import { Left } from "native-base";

export default {
  container: {
    height: "100%",
    backgroundColor: "#fff",
    flex: 1
  },
  gridTitleRow: {
    height: 40,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft:6,
    
  },
  Grid: {
    borderTopColor: '#e8eff5',
    borderTopWidth: 2.5
  },
  gridContent: {
    height: 200,
  },
  gridContentItem: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",

  },
  heightFull: {
    height: '100%',
    borderWidth: 0.5,
    borderColor: '#cecece'
  },
  textItem: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center'
  }
}