
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((previous) => previous + 1);
      console.log("Timer ticking");
    }, 1000);

    return () => {
      clearInterval(interval);
      console.log("Timer stopped");
    };
  }, []);

  return (
    <View>
      <Text style={{ color: "white" }}>
        Timer: {seconds} seconds
      </Text>
    </View>
  );
}
