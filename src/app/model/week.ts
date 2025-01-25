export class Week {
    id: number;
    year: number;
    weekNumber: number;
    startDate: Date;
    endDate: Date;

    constructor(id: number = 0, year: number = 0, weekNumber: number = 0,
                startDate: Date = new Date(), endDate: Date = new Date()) {
        this.id = id;
        this.year = year;
        this.weekNumber = weekNumber;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}