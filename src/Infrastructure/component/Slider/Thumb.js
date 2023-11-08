import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { scale } from "../../utils/screenUtility";

const THUMB_RADIUS = scale(8);

const Thumb = () => {
  return <View style={styles.root} />;
};

const styles = StyleSheet.create({
  root: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    borderWidth: 2,
    borderColor: "#00A0DA",
    backgroundColor: "#00A0DA",
  },
});

export default memo(Thumb);
