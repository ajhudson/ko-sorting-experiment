function Person(id, firstname, surname, city, country) {
    this.id = id;
    this.firstname = firstname;
    this.surname = surname;
    this.city = city;
    this.country = country;
}

function SortingExperimentViewModel() {

    var people = ko.observableArray([
        new Person(1, "Hasan", "Kasamali", "Mumbai", "India"),
        new Person(2, "James", "McCollom", "Bury", "UK"),
        new Person(3, "Ben", "Stokes", "Wellington", "New Zealand"),
        new Person(4, "Diego", "Simione", "Buenos Aires", "Argentina"),
        new Person(5, "Tom", "Brady", "Boston", "USA"),
        new Person(6, "Xi", "Yang", "Shanghai", "China")
    ]);

    var isSummaryOpen = ko.observable(false);

    return {
        people: people
    };
}

var vm = new SortingExperimentViewModel();
ko.applyBindings(vm);

