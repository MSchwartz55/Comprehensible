const showCardInCollection = (collectionEntry) => {

  if (collectionEntry.timeOfLastClick === null) {
    return true;
  }

  const millisecondDelta = Math.abs(new Date().getMilliseconds() - collectionEntry.timeOfLastLick);
  const dayDelta = Math.ceil(millisecondDelta / (1000 * 60 * 60 * 24));

  return dayDelta >= collectionEntry.interval
}

export default showCardInCollection;