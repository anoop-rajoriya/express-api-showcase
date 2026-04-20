const parseToSeconds = (time) => {
  if (typeof time === 'number') return time;
  
  const unit = time.slice(-1);
  const value = parseInt(time);

  switch (unit) {
    case 's': return value;            // Seconds
    case 'm': return value * 60;       // Minutes
    case 'h': return value * 3600;     // Hours
    case 'd': return value * 86400;    // Days
    default: return value;
  }
};

export const getExpiryTimestamp = (duration) => {
  return Date.now() + (parseToSeconds(duration) * 1000);
};
