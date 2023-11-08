import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { scale } from "../../utils/screenUtility";

const Label = ({ text, ...restProps }) => {
  return (
    <View style={styles.root} {...restProps}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: scale(8),
    backgroundColor: "#00A0DA",
    borderRadius: 4,
  },
  text: {
    fontSize: scale(16),
    color: "#ffff",
  },
});

export default memo(Label);
