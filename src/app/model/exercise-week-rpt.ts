export class ExerciseWeekReport {
    email: string;
    weekNumber: number;
    count: number;

    constructor(email: string, weekNumber: number, count: number) {
        this.email = email;
        this.weekNumber = weekNumber;
        this.count = count;
    }
}