import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { scale } from "../../utils/screenUtility";

const Notch = (props) => {
  return <View style={styles.root} {...props} />;
};

export default memo(Notch);

const styles = StyleSheet.create({
  root: {
    width: scale(8),
    height: 4,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#00A0DA",
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
  },
});
