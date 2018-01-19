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
                        message: "kræver både navn og nummer"
                    }
                }
            },
            update: {
                name: {
                    presence: true,
                    length: {
                        minimum: 6
                    }
                },
                street: {
                    format: {
                        pattern: /\w+ \s \d+/,
                        message: "^ kræver både navn og nummer"
                    }
                }

            }
        }
    };

    var setupErrorMessages = function (v) {
        v.validators.presence.options = {message: "må ikke være tomt"};
        v.validators.length.options = {tooShort: "skal være mindst %{count} karakterer langt"};
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