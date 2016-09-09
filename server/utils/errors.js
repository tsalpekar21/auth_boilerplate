function marshalErrors(errors) {
    let errorsArray = []
    for (var property in errors) {
      if (errors.hasOwnProperty(property)) {
        errorsArray.push({ id: property,
                           field: property, 
                           message: errors[property].message,
                           value: errors[property].value
        })
      }
    }
  return errorsArray
}

module.exports = {
  marshalErrors: marshalErrors
}
