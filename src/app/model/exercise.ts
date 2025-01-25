import { Activity } from "./activity";
import { User } from "./user";
import { Week } from "./week";

export class Exercise {
    id: number;
    user: User;
    activity: Activity;
    week: Week;
    exerciseDate: Date;
    miles: number;
    ascent: number;
    caloriesBurned: number;
    elapsedTimeSeconds?: number;

    constructor(id: number = 0, user: User = new User(), activity: Activity = new Activity(),
                week: Week = new Week(), exerciseDate: Date = new Date(), miles: number = 0.0,
                ascent: number = 0, caloriesBurned: number = 0, elapsedTimeSeconds: number = 0) {
        this.id = id;
        this.user = user;
        this.activity = activity;
        this.week = week;
        this.exerciseDate = exerciseDate;
        this.miles = miles;
        this.ascent = ascent;
        this.caloriesBurned = caloriesBurned;
        this.elapsedTimeSeconds = elapsedTimeSeconds;
    }
}