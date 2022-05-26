import _ from 'lodash'

let translateServerErrors = (errors) => {
  let serializedErrors = {}
  const urlMessage = "must be a valid YouTube URL";

  Object.keys(errors).forEach((key) => {
    const messages = errors[key].map((error) => {
      const field = _.startCase(key)
      serializedErrors = {
        ...serializedErrors,
        [field]: error.message
      }
      if (key === "videoURL") {
        serializedErrors[field] = urlMessage;
      }
    })
  });

  return serializedErrors
};

export default translateServerErrors;
