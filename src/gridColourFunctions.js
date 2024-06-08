export function cloudPercentage() {
  return {
    fontWeight: "600",
    textAlign: "center",
    color: "#dedede",
    margin: 0,
  };
}

export function temperatureBackground(item) {
  if (item > 18 && item < 18) {
    return { backgroundColor: "#e6872e" };
  } else if (item >= 25) {
    return { backgroundColor: "#DB3B3B" };
  } else {
    return { backgroundColor: "#4FC863" };
  }
}

export function windSpeedBackground(item) {
  if (item > 10 && item < 18) {
    return { backgroundColor: "#e6872e" };
  } else if (item >= 18) {
    return { backgroundColor: "#DB3B3B" };
  } else {
    return { backgroundColor: "#4FC863" };
  }
}

export function windGustBackground(item) {
  if (item > 20 && item < 29) {
    return { backgroundColor: "#e6872e" };
  } else if (item >= 29) {
    return { backgroundColor: "#DB3B3B" };
  } else {
    return { backgroundColor: "#4FC863" };
  }
}

export function visibilityBackground(item) {
  if (item < 10 && item > 5) {
    return { backgroundColor: "#e6872e" };
  } else if (item <= 5) {
    return { backgroundColor: "#DB3B3B" };
  } else {
    return { backgroundColor: "#4FC863" };
  }
}

export function precipitationBackground(item) {
  if (item > 9 && item < 20) {
    return { backgroundColor: "#e6872e" };
  } else if (item >= 20) {
    return { backgroundColor: "#DB3B3B" };
  } else {
    return { backgroundColor: "#4FC863" };
  }
}

export function weatherConditionBackground(item) {
  if (item === 0) {
    return { backgroundColor: "#4FC863" };
  } else if (item === 1 || item === 2) {
    return { backgroundColor: "#e6872e" };
  } else {
    return { backgroundColor: "#DB3B3B" };
  }
}

export function dewPointBackground(dew, humidity) {
  const dewRounded = dew.toFixed(0);
  const humidityRounded = humidity.toFixed(0);

  if (dewRounded < 10) {
    return { backgroundColor: "#4FC863" };
  } else if (11 <= dewRounded && dewRounded < 15) {
    if (humidityRounded < 70) {
      return { backgroundColor: "#4FC863" };
    } else {
      return { backgroundColor: "#e6872e" };
    }
  } else if (15 <= dewRounded && dewRounded < 21) {
    if (humidityRounded < 60) {
      return { backgroundColor: "#4FC863" };
    } else if (60 <= humidityRounded && humidityRounded < 80) {
      return { backgroundColor: "#e6872e" };
    } else {
      return { backgroundColor: "#DB3B3B" };
    }
  } else {
    // dewRounded >= 21
    if (humidityRounded < 30) {
      return { backgroundColor: "#e6872e" };
    } else {
      return { backgroundColor: "#DB3B3B" };
    }
  }
}

export function humidityBackground(item) {
  if (item <= 80) {
    return { backgroundColor: "#4FC863" };
  } else if (item > 80 && item <= 90) {
    return { backgroundColor: "#e6872e" };
  } else {
    return { backgroundColor: "#DB3B3B" };
  }
}
