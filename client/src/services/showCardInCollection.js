const showCardInCollection = (collectionEntry) => {
  if (collectionEntry.timeOfLastClick === null) {
    return true;
  }

  const todayMilli = Date.parse(new Date().toISOString());
  const lastClickedMilli = Date.parse(collectionEntry.timeOfLastClick);

  const millisecondDelta = Math.abs(todayMilli - lastClickedMilli);
  const dayDelta = Math.ceil(millisecondDelta / (1000 * 60 * 60 * 24));

  console.log("delta: " + dayDelta);
  console.log("interval: " + collectionEntry.interval);

  return dayDelta >= collectionEntry.interval
}

export default showCardInCollection;