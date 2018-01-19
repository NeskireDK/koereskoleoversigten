(function () {
    var validations = {
        course: {
            insert: {
                school_id: {
                    presence: true,
                    numericality: {
                        onlyInteger: true,
                        greaterThan: 0
                    }
                },
                title: {
                    presence: true,
                    length: {
                        minimum: 6
                    }
                }
            },
            update: {
                title: {
                    presence: true,
                    length: {
                        minimum: 6
                    }
                }
            }
        },
        school: {
            insert: {
                zip: {
                    presence: true,
                    numericality: {
                        digits: 4
                    }
                },
                name: {
                    presence: true,
                    length: {
                        minimum: 6
                    }
                },
                street: {
                    format: {
                        // Must be numbers followed by a name
                        pattern: /\w+ \s \d+/,
                        message: "^sdadkræver både navn og nummer"
                    }
                }
            },
            update: {
                zip: {
                    presence: true,
                    numericality: {
                        onlyInteger: true,
                        lessThan: 10000,
                        greaterThan: 554
                    }
                },
                name: {
                    presence: true,
                    length: {
                        minimum: 6
                    }
                },
                street: {
                    format: {
                        pattern: /^[A-zæøåÆØÅ]+\s\d+/,
                        message: "^ kræver både navn og nummer"
                    }
                }

            }
        }
    };
    var setupErrorMessages = function (v) {
        v.validators.presence.options = "må ikke være tomt";
        v.validators.length.options = "skal være mindst %{count} karakterer langt";
        v.validators.numericality.onlyInteger = "er ikke et tal"
        v.validators.numericality.notValid = " værdien er ikke gyldig"
        v.validators.numericality.notGreaterThan = "værdien er for lav, tallet skal være over %{count}"
        v.validators.numericality.notLessThan = "værdien er for høj, tallet skal være under %{count}"
    };

    if (typeof window !== "undefined") {
        window.validations = validations;
        window.setupValidationMessages = setupErrorMessages;
    }
    if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
        module.exports = {
            validations: validations,
            setupValidationMessages: setupErrorMessages
        }
    }
})();