export class ExerciseDayReport {
    rowNbr: number;
    email: string;
    weekNumber: number;
    exerciseDate: Date;
    activities: string;

    constructor(rowNbr: number, email: string, weekNumber: number, exerciseDate: Date, activities: string) {
        this.rowNbr = rowNbr;
        this.email = email;
        this.weekNumber = weekNumber;
        this.exerciseDate = exerciseDate;
        this.activities = activities;
    }
}