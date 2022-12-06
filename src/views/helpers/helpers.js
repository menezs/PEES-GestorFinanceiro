function checked(currentValue, value) {
	if (currentValue === value) {
		return "checked";
	} else {
		return "";
	}
}

module.exports = { checked };
