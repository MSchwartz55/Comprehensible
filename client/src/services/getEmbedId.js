const getEmbedId = (url) => {
  const linkRegex = /^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  const matches = url.match(linkRegex);
  if (matches) {
    return matches[1];
  }
  return false;
}

export default getEmbedId;