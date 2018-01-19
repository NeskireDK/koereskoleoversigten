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
                        minimum: 3
                    }
                }
            },
            update: {
                title: {
                    presence: true,
                    length: {
                        minimum: 3
                    }
                }
            }
        },
        courseModule: {
            insert: {
                title: {
                    presence: true,
                    length: {
                        minimum: 3
                    }
                },
                date: {
                    presence: true,
                    format: {
                        pattern: /^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9])(?:( [0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?$/,
                        message: "er ugyldig"
                    },
                    datetime: false
                }
            },
            update: {
                title: {
                    presence: true,
                    length: {
                        minimum: 6
                    }
                },
                date: {
                    presence: true,
                    format: {
                        pattern: /^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9])(?:( [0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?$/,
                        message: "er ugyldig"
                    },
                    datetime: false

                }
            }
        },
        school: {
            insert: {
                zip: {
                    presence: true,
                    numericality: {
                        onlyInteger: true,
                        lessThan: 10000,
                        greaterThan: 554
                    }
                },
                phone: {
                    presence: true,
                    numericality: {onlyInteger: true},
                    length: {
                        is: 8
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
                        message: "Adresse kræver både vejnavn og nummer"
                    }
                },
                email: {
                    presence: true,
                    format: {
                        pattern: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                        message: "er ikke gyldig"
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
                phone: {
                    presence: true,
                    numericality: {
                        onlyInteger: true,
                    },
                    length: {
                        is: 8
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
                        message: "Adresse kræver både vejnavn og nummer"
                    }
                },
                email: {
                    presence: true,
                    format: {
                        pattern: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                        message: "er ikke gyldig"
                    }
                }
            }
        }
    };
    var setupErrorMessages = function (v) {
        v.validators.presence.options = {message: "må ikke være tomt"}
        v.validators.length.notValid = "er forkert længde"
        v.validators.length.wrongLength = 'skal indeholde %{count} tegn'
        v.validators.length.tooShort = 'er for kort, skal indeholde %{count} tegn'
        v.validators.length.tooLong = 'er for langt, skal indeholde %{count} tegn'
        v.validators.numericality.onlyInteger = "er ikke et tal"
        v.validators.numericality.notValid = " værdien er ikke gyldig"
        v.validators.numericality.notGreaterThan = "værdien er for lav, tallet skal være over %{count}"
        v.validators.numericality.notLessThan = "værdien er for høj, tallet skal være under %{count}"
        // v.validators.datetime.notValid = "Datoen %{value} er ikke gyldig, den skal formatteres som: YYYY-MM-DD hh:mm:ss"
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