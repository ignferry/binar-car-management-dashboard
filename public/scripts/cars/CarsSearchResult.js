class CarsSearchResult {
    constructor(searchResultDiv) {
        this.cars = [];
        this.searchResultDiv = searchResultDiv;
    }

    async load(dateTime, requiredCapacity) {
        // Retrieve car data
        const fetchResponse = await fetch("/api/v1/cars?" + new URLSearchParams(
            {
                pickup_time: dateTime.toISOString(),
                min_capacity: requiredCapacity,
                page: 1,
                limit: 999
            }
        ));
        const carJson = await fetchResponse.json();
        this.cars = carJson["data"];

        // Render cars
        this.searchResultDiv.innerHTML = "";
        this.cars.forEach((car) => {
            const carObject = new Car(car);
            const node = document.createElement("div");
            node.className = "col";
            node.innerHTML = carObject.render();
            this.searchResultDiv.appendChild(node);
        });
    }
}