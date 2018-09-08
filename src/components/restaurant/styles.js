const drawerWidth = 360;

const styles = theme => ({
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },

  appFrame: {
    height: "100hv",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },

  "content-left": {
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  "contentShift-left": {
    marginLeft: 0
  }

  //   appBar: {
  //     position: "absolute",
  //     transition: theme.transitions.create(["margin", "width"], {
  //       easing: theme.transitions.easing.sharp,
  //       duration: theme.transitions.duration.leavingScreen
  //     })
  //   },
  //   appBarShift: {
  //     width: `calc(100% - ${drawerWidth}px)`,
  //     transition: theme.transitions.create(["margin", "width"], {
  //       easing: theme.transitions.easing.easeOut,
  //       duration: theme.transitions.duration.enteringScreen
  //     })
  //   },
  //   "appBarShift-left": {
  //     marginLeft: drawerWidth
  //   },

  //   menuButton: {
  //     marginLeft: 12,
  //     marginRight: 20
  //   },
  //   hide: {
  //     display: "none"
  //   },
});

export default styles;
